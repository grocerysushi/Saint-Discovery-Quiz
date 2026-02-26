const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Target Gaps
const manualGaps = [
    { date: "February 28", name: "St. Romanus of Condat" }, // Avoid St. Oswald
    { date: "June 8", name: "St. Medard" },
    { date: "June 30", name: "St. Martial" }, // Avoid First Martyrs if complex
    { date: "July 18", name: "St. Frederick" }, // Avoid St. Camillus duplicate
    { date: "August 5", name: "St. Afra" }, // Avoid St. Mary Major
    { date: "August 22", name: "St. Symphorian" }, // Avoid Queenship of Mary
    { date: "August 29", name: "St. Sabina" }, // Avoid St. John Baptist
    { date: "August 30", name: "St. Pammachius" }, // Avoid St. Fiacre
    { date: "September 8", name: "St. Adrian" }, // Avoid Nativity of Mary
    { date: "November 21", name: "St. Gelasius I" }, // Avoid Presentation of Mary
    { date: "December 8", name: "St. Eutychian" }, // Avoid Immaculate Conception (duplicate)
    { date: "December 29", name: "St. Trophimus" }, // Avoid St. Thomas Becket duplicate
    { date: "December 30", name: "St. Egwin" } // Avoid Holy Family moving date
];

const TARGET_JSON = path.join(__dirname, '../public/saints-data-enriched.json');

function loadSaintsDatabase() {
    try {
        return JSON.parse(fs.readFileSync(TARGET_JSON, 'utf8'));
    } catch (error) {
        console.error("Error loading database:", error);
        return [];
    }
}

function saveDatabase(saints) {
    // Write canonical JSON
    fs.writeFileSync(TARGET_JSON, JSON.stringify(saints, null, 4), 'utf8');
    console.log(`Saved ${saints.length} saints to ${TARGET_JSON}`);

    // Regenerate JS wrapper
    const { execSync } = require('child_process');
    execSync('node scripts/build-js-from-json.js', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
}

async function enrichSaint(name, date) {
    console.log(`Enriching: ${name} (${date})...`);

    const prompt = `
    Generate a detailed JSON profile for the Catholic Saint: ${name} (Feast Day: ${date}).
    
    Provide a JSON response with:
    1. "name": "${name}"
    2. "feastDay": "${date}"
    3. "patronOf": Comma-separated list of patronage.
    4. "titles": Array of titles (e.g., ["Hermit", "Abbot"]).
    5. "bio": A detailed 3-sentence biography highlighting their life and virtues.
    6. "funFact": A unique, interesting fact about them (start with "Did you know?").
    7. "quotes": Array of 3 authentic or attributed quotes.
    8. "traits": Array of 3-5 personality traits (lowercase, e.g., ["humility", "faith"]).
    9. "lived": Timeline strings (e.g., "d. 460 AD").
    10. "knownFor": Concise 1-sentence summary of what they are known for.
    
    Ensure the JSON is valid and only the JSON is returned.
    `;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are a helpful Catholic assistant generating saint profiles in JSON format." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" }
        });

        const data = JSON.parse(completion.choices[0].message.content);
        return {
            id: slugify(name),
            ...data
        };
    } catch (error) {
        console.error(`Error enriching ${name}:`, error);
        return null;
    }
}

function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

async function main() {
    let saints = loadSaintsDatabase();
    console.log(`Loaded ${saints.length} saints.`);

    for (const gap of manualGaps) {
        // Double check it's still missing
        if (!saints.find(s => s.feastDay === gap.date)) {
            const newSaint = await enrichSaint(gap.name, gap.date);
            if (newSaint) {
                if (!saints.find(s => s.name === newSaint.name)) {
                    saints.push(newSaint);
                    console.log(`Added ${newSaint.name}`);
                }
            }
        } else {
            console.log(`Date ${gap.date} already covered.`);
        }
    }

    saveDatabase(saints);
    console.log('Manual fill complete.');
}

main();
