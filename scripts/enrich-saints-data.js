require('dotenv').config();
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const TARGET_FILE = path.join(__dirname, '../public/saints-data-enriched.js');
const SOURCE_FILE = path.join(__dirname, '../public/saints-data.js');

// Load saints database
function loadSaintsDatabase() {
    // If enriched file exists, load it to resume
    if (fs.existsSync(TARGET_FILE)) {
        try {
            const content = fs.readFileSync(TARGET_FILE, 'utf8');
            const match = content.match(/const saintsDatabase = (\[[\s\S]*?\]);/);
            if (match) {
                console.log('Resuming from existing enriched database...');
                return JSON.parse(match[1]);
            }
        } catch (e) {
            console.log('Error reading existing enriched file, starting fresh from source.');
        }
    }

    // Otherwise load source
    const content = fs.readFileSync(SOURCE_FILE, 'utf8');
    const match = content.match(/const saintsDatabase = (\[[\s\S]*?\]);/);
    if (match) {
        return JSON.parse(match[1]);
    }
    throw new Error('Could not parse source database');
}

// Generate all days of the year
function getAllDays() {
    const days = [];
    const months = [
        { name: 'January', days: 31 },
        { name: 'February', days: 29 },
        { name: 'March', days: 31 },
        { name: 'April', days: 30 },
        { name: 'May', days: 31 },
        { name: 'June', days: 30 },
        { name: 'July', days: 31 },
        { name: 'August', days: 31 },
        { name: 'September', days: 30 },
        { name: 'October', days: 31 },
        { name: 'November', days: 30 },
        { name: 'December', days: 31 }
    ];

    for (const month of months) {
        for (let i = 1; i <= month.days; i++) {
            days.push(`${month.name} ${i}`);
        }
    }
    return days;
}

async function enrichSaint(saint) {
    if (saint.enriched) {
        console.log(`Skipping already enriched: ${saint.name}`);
        return saint;
    }

    console.log(`Enriching: ${saint.name}...`);

    const prompt = `
    Enrich data for Catholic Saint: ${saint.name}.
    Current Data: ${JSON.stringify(saint)}

    Provide a JSON response with:
    1. "title": Name with title (e.g., "St. Peter").
    2. "feastDay": Verify and correct if needed (Format: "Month Day").
    3. "associatedDates": Dates associated with them if feast day is unsure.
    4. "lived": "YYYY-YYYY" or "d. YYYY" or "Century".
    5. "knownFor": Concise 1-sentence summary.
    6. "patronOf": Comma-separated list of patronages.
    7. "bio": Engaging 3-sentence biography.
    8. "funFact": A unique, surprising fact (1 sentence).
    9. "quotes": Array of 3 AUTHENTIC, distinct quotes.
    10. "traits": Array of 5 visual/personality traits (lowercase).
    11. "gender": "Male" or "Female".
    12. "origin": Region/Country.
    
    Ensure quotes are not generic. Ensure bio is strictly 3 sentences.
    Return ONLY valid JSON.
    `;

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-4o-mini", // Cost effective
            response_format: { type: "json_object" }
        });

        const data = JSON.parse(completion.choices[0].message.content);
        return { ...saint, ...data, enriched: true };
    } catch (error) {
        console.error(`Error enriching ${saint.name}:`, error.message);
        return saint; // Return original if fail, try again next time?
    }
}

async function generateGapSaint(date) {
    console.log(`Generating saint for gap: ${date}...`);

    const prompt = `
    Suggest a LESSER KNOWN or OBSCURE Catholic Saint whose feast day is ${date}.
    Do NOT suggest popular saints like Peter, Paul, Mary, Francis, etc.
    We need to fill gaps in the calendar, so avoid common duplicates.
    
    Provide a JSON response with:
    1. "name": Name with title (e.g., "St. Peter").
    2. "feastDay": "${date}".
    3. "lived": "YYYY-YYYY" or "d. YYYY" or "Century".
    4. "knownFor": Concise 1-sentence summary.
    5. "patronOf": Comma-separated list of patronages.
    6. "bio": Engaging 3-sentence biography.
    7. "funFact": A unique, surprising fact (1 sentence).
    8. "quotes": Array of 3 AUTHENTIC, distinct quotes.
    9. "traits": Array of 5 visual/personality traits (lowercase).
    10. "gender": "Male" or "Female".
    11. "origin": Region/Country.
    
    Return ONLY valid JSON.
    `;

    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "gpt-4o-mini",
            response_format: { type: "json_object" }
        });

        const data = JSON.parse(completion.choices[0].message.content);
        return { ...data, enriched: true, generatedForGap: true };
    } catch (error) {
        console.error(`Error generating for ${date}:`, error.message);
        return null;
    }
}

function saveDatabase(saints) {
    const content = `// Enriched Saints Database
// Total: ${saints.length}
// Generated: ${new Date().toISOString()}

const saintsDatabase = ${JSON.stringify(saints, null, 4)};

// Trait categories (preserved from original)
const traitCategories = {
    intellectual: ["intellectual", "teaching", "writing", "wisdom", "philosophy", "seeking", "introspection", "mentorship"],
    contemplative: ["contemplation", "mysticism", "prayer", "meditation", "devotion", "peace", "balance"],
    service: ["service", "charity", "compassion", "healing", "generosity", "organization"],
    leadership: ["leadership", "reform", "activism", "conviction", "discipline", "justice"],
    missionary: ["missionary", "adventure", "cross-cultural", "preaching", "evangelization"],
    creative: ["arts", "music", "poetry", "nature", "beauty", "animals"],
    humble: ["humility", "simplicity", "obedience", "poverty", "patience"],
    family: ["family", "motherhood", "nurturing", "protection", "children", "youth", "community"],
    transformative: ["transformation", "forgiveness", "hope", "perseverance", "conversion"],
    courageous: ["courage", "faith", "strength", "sacrifice", "endurance", "heroism"],
    warrior: ["warrior", "military", "protection", "justice", "chivalry", "spiritual-warfare"],
    joyful: ["joy", "innovation", "youth", "education", "love"]
};
`;

    fs.writeFileSync(TARGET_FILE, content);
    console.log(`Saved ${saints.length} saints to ${TARGET_FILE}`);
}

async function main() {
    let saints = loadSaintsDatabase();

    // Phase 1: Enriching existing (Skipped for Gap Cleanup)
    console.log('Phase 1: Skipped for Gap Cleanup...');
    /*
    const BATCH_SIZE = 5;
    for (let i = 0; i < saints.length; i += BATCH_SIZE) {
        const batch = saints.slice(i, i + BATCH_SIZE);
        const promises = batch.map(saint => {
            if (!saint.funFact) {
                return enrichSaint(saint);
            } else {
                return Promise.resolve(saint);
            }
        });
        
        const results = await Promise.all(promises);
        
        // Update saints array with results
        results.forEach((result, index) => {
            saints[i + index] = result;
        });

        saveDatabase(saints);
    }
    saveDatabase(saints);
    */
    const BATCH_SIZE = 5;

    // Phase 2: Gap analysis and filling
    console.log('Phase 2: Filling calendar gaps...');
    const allDays = getAllDays();

    // We loop until we have coverage or run out of attempts
    // Identify gaps fresh each time
    const coveredDays = new Set(saints.map(s => s.feastDay.trim()));
    const missingDays = allDays.filter(day => !coveredDays.has(day));

    console.log(`Found ${missingDays.length} missing days.`);

    // Process gaps in batches too
    for (let i = 0; i < missingDays.length; i += BATCH_SIZE) {
        const batchDays = missingDays.slice(i, i + BATCH_SIZE);
        console.log(`Processing gap batch: ${batchDays.join(', ')}`);

        const promises = batchDays.map(date => generateGapSaint(date));
        const results = await Promise.all(promises);

        for (const newSaint of results) {
            if (newSaint) {
                // Check if this saint name already exists to avoid duplicates
                if (!saints.find(s => s.name === newSaint.name)) {
                    saints.push(newSaint);
                    coveredDays.add(newSaint.feastDay);
                } else {
                    console.log(`Generated duplicate ${newSaint.name}, skipping.`);
                }
            }
        }
        saveDatabase(saints);
    }

    console.log('Done!');
}

main().catch(console.error);
