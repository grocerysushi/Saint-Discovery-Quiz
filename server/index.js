require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

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

// Serve the main page for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
