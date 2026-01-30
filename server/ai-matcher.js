const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function getAIEnhancedMatch(userAnswers, topCandidates, userGender) {
    try {
        // Format user answers for AI analysis
        const answersText = userAnswers.map((a, i) =>
            `Q${i + 1}: Selected traits - ${a.traits.join(', ')}`
        ).join('\n');

        const candidatesText = topCandidates.map((c, i) =>
            `${i + 1}. ${c.saint.name} (${c.saint.dates}) - ${c.saint.knownFor}\n   Patron of: ${c.saint.patronOf}\n   Score: ${c.score.toFixed(1)}`
        ).join('\n\n');

        const prompt = `You are a Catholic saint matching expert helping someone discover their patron saint. Analyze this person's quiz responses and select the most appropriate saint from the candidates.

User's Quiz Responses (showing their selected traits):
${answersText}

Top Candidate Saints:
${candidatesText}

Based on the user's answers, select ONE saint from the candidates list above and explain why they are the best match.

Provide your response in this EXACT format:
SAINT: [exact name from candidates list]
EXPLANATION: [2-3 warm, encouraging sentences explaining why this saint matches their personality and spiritual journey, focusing on the specific traits they selected]
INSPIRATION: [1 specific sentence about how this saint's life can inspire them in their daily walk with God]

Keep the tone warm, personal, and spiritually uplifting. Make it feel like a meaningful connection, not just a match.`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.7,
            max_tokens: 400
        });

        const aiResponse = response.choices[0].message.content;

        // Parse the AI response
        const saintMatch = aiResponse.match(/SAINT:\s*(.+)/);
        const explanationMatch = aiResponse.match(/EXPLANATION:\s*(.+?)(?=INSPIRATION:|$)/s);
        const inspirationMatch = aiResponse.match(/INSPIRATION:\s*(.+)/s);

        return {
            saintName: saintMatch ? saintMatch[1].trim() : null,
            explanation: explanationMatch ? explanationMatch[1].trim() : null,
            inspiration: inspirationMatch ? inspirationMatch[1].trim() : null,
            fullResponse: aiResponse
        };
    } catch (error) {
        console.error('AI matching error:', error);
        throw error;
    }
}

module.exports = { getAIEnhancedMatch };
