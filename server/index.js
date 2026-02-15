require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const fs = require('fs');

// Load saints database from the public JS file
function loadSaintsDatabase() {
    const saintsFile = fs.readFileSync(path.join(__dirname, '../public/saints-data.js'), 'utf8');
    // Extract the array from the JS file (it's assigned to const saintsDatabase = [...])
    const match = saintsFile.match(/const saintsDatabase = (\[[\s\S]*?\]);/);
    if (match) {
        return JSON.parse(match[1]);
    }
    throw new Error('Could not parse saints database');
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

// Security and SEO headers middleware
app.use((req, res, next) => {
    // Security headers
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    // SEO-friendly headers
    res.setHeader('X-Robots-Tag', 'index, follow');

    next();
});

// Middleware
app.use(cors());
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
        // Medium cache for CSS and JS (1 week)
        else if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=604800'); // 1 week
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
const { getAIEnhancedMatch } = require('./ai-matcher');

app.post('/api/ai-match', async (req, res) => {
    try {
        const { userAnswers, topCandidates, userGender } = req.body;

        if (!userAnswers || !topCandidates || !userGender) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        const aiResult = await getAIEnhancedMatch(userAnswers, topCandidates, userGender);
        res.json({ success: true, ...aiResult });
    } catch (error) {
        console.error('AI matching error:', error);
        res.status(500).json({
            success: false,
            error: 'AI analysis failed',
            message: error.message
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

    let saint;
    if (matchingSaints.length > 0) {
        saint = matchingSaints[today.getFullYear() % matchingSaints.length];
    } else {
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
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
        targetDate = new Date(req.query.date);
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

    res.json({
        count: results.length,
        saints: results.map(s => ({
            name: s.name,
            feastDay: s.feastDay,
            knownFor: s.knownFor,
            patronOf: s.patronOf,
            dates: s.dates,
            origin: s.origin,
            gender: s.gender,
            traits: s.traits
        }))
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
