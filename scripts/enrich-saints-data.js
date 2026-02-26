require('dotenv').config();
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const TARGET_JSON = path.join(__dirname, '../public/saints-data-enriched.json');
const TRAITS_JSON = path.join(__dirname, '../public/trait-categories.json');
const TARGET_FILE = path.join(__dirname, '../public/saints-data-enriched.js');
const SOURCE_JSON = path.join(__dirname, '../public/saints-data.json');

// Load saints database from canonical JSON
function loadSaintsDatabase() {
    // If enriched JSON exists, load it to resume
    if (fs.existsSync(TARGET_JSON)) {
        console.log('Resuming from existing enriched JSON database...');
        return JSON.parse(fs.readFileSync(TARGET_JSON, 'utf8'));
    }

    // Otherwise load source JSON
    return JSON.parse(fs.readFileSync(SOURCE_JSON, 'utf8'));
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
    // Write canonical JSON
    fs.writeFileSync(TARGET_JSON, JSON.stringify(saints, null, 4), 'utf8');
    console.log(`Saved ${saints.length} saints to ${TARGET_JSON}`);

    // Read trait categories
    const traitCategories = JSON.parse(fs.readFileSync(TRAITS_JSON, 'utf8'));

    // Regenerate JS wrapper
    const jsContent = `// Enriched Saints Database
// Total: ${saints.length}
// Auto-generated from saints-data-enriched.json — do not edit directly
// Generated: ${new Date().toISOString()}

const saintsDatabase = ${JSON.stringify(saints, null, 4)};

// Trait Categories
const traitCategories = ${JSON.stringify(traitCategories, null, 4)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { saintsDatabase, traitCategories };
}
`;

    fs.writeFileSync(TARGET_FILE, jsContent, 'utf8');
    console.log(`Regenerated JS wrapper: ${TARGET_FILE}`);
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
