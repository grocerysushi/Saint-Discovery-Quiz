require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');

// Load saints database from the canonical JSON file
function loadSaintsDatabase() {
    const jsonPath = path.join(__dirname, '../public/saints-data.json');
    return JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
}

let saintsDatabase;
try {
    saintsDatabase = loadSaintsDatabase();
    console.log(`Loaded ${saintsDatabase.length} saints from database`);
} catch (error) {
    console.error('Failed to load saints database:', error);
    saintsDatabase = [];
}

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression for all responses (improves Core Web Vitals)
app.use(compression({
    level: 6, // Balanced compression level
    threshold: 1024, // Only compress responses > 1KB
    filter: (req, res) => {
        // Don't compress if client doesn't accept it
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
}));

// Security headers via helmet
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com", "https://cdn.vercel-insights.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://vitals.vercel-insights.com"],
        }
    },
    crossOriginEmbedderPolicy: false, // allow cross-origin fonts/images
}));

// SEO header
app.use((req, res, next) => {
    res.setHeader('X-Robots-Tag', 'index, follow');
    next();
});

// Rate limiting
const apiLimiter = rateLimit({ windowMs: 60 * 1000, max: 60, message: { error: 'Too many requests, please try again later' } });
const aiLimiter = rateLimit({ windowMs: 60 * 1000, max: 5, message: { error: 'Too many AI matching requests, please try again later' } });
app.use('/api/', apiLimiter);

// Middleware
// Restrict CORS to known origins in production
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
    : null;

app.use(cors(ALLOWED_ORIGINS ? {
    origin(origin, cb) {
        // Allow requests with no origin (same-origin, curl, server-to-server)
        if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
        cb(new Error('Not allowed by CORS'));
    }
} : undefined));
app.use(express.json());

// Static file serving with caching headers for better Core Web Vitals
app.use(express.static(path.join(__dirname, '../public'), {
    maxAge: '1d', // Cache static assets for 1 day
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
        // Longer cache for fonts and images
        if (filePath.endsWith('.woff2') || filePath.endsWith('.woff') ||
            filePath.endsWith('.png') || filePath.endsWith('.jpg') ||
            filePath.endsWith('.ico') || filePath.endsWith('.svg')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
        }
        // CSS and JS use long immutable cache when served with ?v= hash;
        // the version-assets.js build step stamps content hashes on all
        // HTML references, so browsers fetch new URLs when files change.
        else if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 year
        }
        // Short cache for HTML (to allow updates)
        else if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
        }
    }
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok'
    });
});

// AI-enhanced saint matching endpoint
const { getAIEnhancedMatch, isAvailable: isAIAvailable } = require('./ai-matcher');

app.post('/api/ai-match', aiLimiter, async (req, res) => {
    if (!isAIAvailable()) {
        return res.status(503).json({ success: false, error: 'AI matching is not configured (missing OPENAI_API_KEY)' });
    }
    try {
        const { userAnswers, topCandidates, userGender } = req.body;

        // Validate required fields and types
        if (!Array.isArray(userAnswers) || userAnswers.length === 0) {
            return res.status(400).json({ success: false, error: 'userAnswers must be a non-empty array' });
        }
        if (!Array.isArray(topCandidates) || topCandidates.length === 0) {
            return res.status(400).json({ success: false, error: 'topCandidates must be a non-empty array' });
        }
        if (typeof userGender !== 'string' || !userGender.trim()) {
            return res.status(400).json({ success: false, error: 'userGender must be a non-empty string' });
        }

        // Validate each answer has a traits array of strings
        for (let i = 0; i < userAnswers.length; i++) {
            const a = userAnswers[i];
            if (!a || !Array.isArray(a.traits) || !a.traits.every(t => typeof t === 'string')) {
                return res.status(400).json({ success: false, error: `userAnswers[${i}].traits must be an array of strings` });
            }
        }

        // Validate each candidate has required saint fields and a numeric score
        for (let i = 0; i < topCandidates.length; i++) {
            const c = topCandidates[i];
            if (!c || typeof c.score !== 'number' || !c.saint) {
                return res.status(400).json({ success: false, error: `topCandidates[${i}] must have a saint object and numeric score` });
            }
            const { name, knownFor, patronOf, dates } = c.saint;
            if ([name, knownFor, patronOf, dates].some(f => typeof f !== 'string')) {
                return res.status(400).json({ success: false, error: `topCandidates[${i}].saint must have name, knownFor, patronOf, and dates as strings` });
            }
        }

        const aiResult = await getAIEnhancedMatch(userAnswers, topCandidates, userGender);
        res.json({ success: true, ...aiResult });
    } catch (error) {
        console.error('AI matching error:', error);
        res.status(500).json({
            success: false,
            error: 'AI analysis failed'
        });
    }
});

// Saint of the Day endpoint (matches actual feast day when possible)
app.get('/api/saint-of-the-day', (req, res) => {
    if (!saintsDatabase.length) {
        return res.status(500).json({ error: 'Saints database not loaded' });
    }

    const today = new Date();
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const todayFeastDay = monthNames[today.getMonth()] + ' ' + today.getDate();

    // Find saints whose feast day matches today
    const matchingSaints = saintsDatabase.filter(s => s.feastDay === todayFeastDay);

    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

    let saint;
    if (matchingSaints.length > 0) {
        saint = matchingSaints[today.getFullYear() % matchingSaints.length];
    } else {
        const saintIndex = dayOfYear % saintsDatabase.length;
        saint = saintsDatabase[saintIndex];
    }

    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', dateOptions);

    res.json({
        date: formattedDate,
        dayOfYear,
        saint: {
            name: saint.name,
            feastDay: saint.feastDay,
            knownFor: saint.knownFor,
            patronOf: saint.patronOf,
            dates: saint.dates,
            origin: saint.origin,
            gender: saint.gender,
            quote: saint.quotes && saint.quotes.length > 0 ? saint.quotes[0] : null
        }
    });
});

// Saints by feast day endpoint (returns saints whose actual feast day matches)
app.get('/api/feast-day', (req, res) => {
    if (!saintsDatabase.length) {
        return res.status(500).json({ error: 'Saints database not loaded' });
    }

    // Use provided date or default to today
    let targetDate;
    if (req.query.date) {
        // Parse as local date to avoid timezone offset shifting the day
        const parts = req.query.date.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
        if (parts) {
            targetDate = new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]));
        } else {
            targetDate = new Date(req.query.date);
        }
        if (isNaN(targetDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD or MM-DD' });
        }
    } else {
        targetDate = new Date();
    }

    // Format date to match feast day format (e.g., "February 4")
    const month = targetDate.toLocaleDateString('en-US', { month: 'long' });
    const day = targetDate.getDate();
    const feastDayString = `${month} ${day}`;

    // Find all saints with matching feast day
    const matchingSaints = saintsDatabase.filter(s => s.feastDay === feastDayString);

    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = targetDate.toLocaleDateString('en-US', dateOptions);

    res.json({
        date: formattedDate,
        feastDay: feastDayString,
        count: matchingSaints.length,
        saints: matchingSaints.map(s => ({
            name: s.name,
            feastDay: s.feastDay,
            knownFor: s.knownFor,
            patronOf: s.patronOf,
            dates: s.dates,
            origin: s.origin,
            gender: s.gender,
            quote: s.quotes && s.quotes.length > 0 ? s.quotes[0] : null
        }))
    });
});

// All saints data endpoint
app.get('/api/saints', (req, res) => {
    if (!saintsDatabase.length) {
        return res.status(500).json({ error: 'Saints database not loaded' });
    }

    // Support optional query params for filtering
    let results = saintsDatabase;

    if (req.query.gender) {
        results = results.filter(s => s.gender.toLowerCase() === req.query.gender.toLowerCase());
    }

    if (req.query.trait) {
        results = results.filter(s => s.traits && s.traits.includes(req.query.trait.toLowerCase()));
    }

    if (req.query.search) {
        const search = req.query.search.toLowerCase();
        results = results.filter(s =>
            s.name.toLowerCase().includes(search) ||
            s.knownFor.toLowerCase().includes(search) ||
            s.patronOf.toLowerCase().includes(search)
        );
    }

    const total = results.length;

    // Pagination
    const rawLimit = parseInt(req.query.limit);
    const limit = rawLimit > 0 ? Math.min(rawLimit, 200) : total;
    const offset = Math.max(parseInt(req.query.offset) || 0, 0);
    results = results.slice(offset, offset + limit);

    // Field projection — ?fields=name,feastDay,gender
    const ALL_FIELDS = ['name', 'feastDay', 'knownFor', 'patronOf', 'dates', 'origin', 'gender', 'traits'];
    let fields = ALL_FIELDS;
    if (req.query.fields) {
        fields = req.query.fields.split(',').filter(f => ALL_FIELDS.includes(f));
        if (fields.length === 0) fields = ALL_FIELDS;
    }

    const project = (s) => {
        const out = {};
        for (const f of fields) out[f] = s[f];
        return out;
    };

    res.json({
        total,
        limit,
        offset,
        count: results.length,
        saints: results.map(project)
    });
});

// Single saint by name endpoint
app.get('/api/saints/:name', (req, res) => {
    if (!saintsDatabase.length) {
        return res.status(500).json({ error: 'Saints database not loaded' });
    }

    const searchName = req.params.name.toLowerCase().replace(/-/g, ' ');
    const saint = saintsDatabase.find(s =>
        s.name.toLowerCase() === searchName ||
        s.name.toLowerCase().replace(/st\.\s*/i, '').trim() === searchName.replace(/st\.\s*/i, '').trim()
    );

    if (!saint) {
        return res.status(404).json({ error: 'Saint not found' });
    }

    res.json({
        name: saint.name,
        feastDay: saint.feastDay,
        knownFor: saint.knownFor,
        patronOf: saint.patronOf,
        dates: saint.dates,
        origin: saint.origin,
        gender: saint.gender,
        traits: saint.traits,
        quotes: saint.quotes
    });
});

// Serve the main page for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
