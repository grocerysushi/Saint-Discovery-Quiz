const fs = require('fs');
const path = require('path');

// Read test data
const testDataPath = path.join(__dirname, '../public', 'saints-data-test.js');
const testDataContent = fs.readFileSync(testDataPath, 'utf8');

// Mock data loading
const saintsDatabase = [
    {
        "name": "St. Test Saint",
        "feastDay": "January 1",
        "knownFor": "Testing the system",
        "patronOf": "Software Testing",
        "dates": "2024",
        "lived": "21st Century",
        "origin": "Digital Realm",
        "gender": "Male",
        "bio": "St. Test Saint was created to verify the integrity of the data pipeline. He ensures that all fields are displayed correctly. His legacy is one of bug-free code.",
        "funFact": "He was compiled in under 100 milliseconds.",
        "quotes": [
            "Hello World!",
            "It works on my machine.",
            "Console.log is my prayer."
        ],
        "traits": ["wisdom", "patience", "precision", "logic", "clarity"],
        "enriched": true
    }
];

const traitCategories = {
    intellectual: ["wisdom", "logic", "clarity"]
};

// Copy basic helper functions from generate-saint-pages.js
function slugify(name) {
    return name.toLowerCase().replace(/\./g, '').replace(/\s+/g, '-');
}
function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function formatTrait(trait) { return trait; }
function getPrimaryCategory(saint) { return 'intellectual'; }
function getRelatedSaints(saint) { return []; }
function generateJsonLd(saint, slug) { return '{}'; }

// The updated generateHTML function from generate-saint-pages.js
function generateHTML(saint) {
    const slug = slugify(saint.name);
    const escapedName = escapeHtml(saint.name);
    const escapedKnownFor = escapeHtml(saint.knownFor);
    const escapedPatronOf = escapeHtml(saint.patronOf);
    const relatedSaints = getRelatedSaints(saint);
    const primaryCategory = getPrimaryCategory(saint);

    // NEW LOGIC START
    const traitsHtml = (saint.traits || [])
        .map(trait => `<span class="trait-tag">${formatTrait(trait)}</span>`)
        .join('\n                        ');

    const quotesHtml = (saint.quotes || [])
        .map(quote => `<blockquote class="saint-quote">"${escapeHtml(quote)}"</blockquote>`)
        .join('\n                    ');

    return `
        <section class="saint-content">
            <article class="info-card full-width">
                <h2>Biography</h2>
                <p>${escapeHtml(saint.bio || saint.knownFor)}</p>
                ${saint.funFact ? `
                <div style="margin-top: 15px; padding: 15px; background: var(--cream-light); border-radius: 8px; border-left: 3px solid var(--gold);">
                    <strong>Did you know?</strong> ${escapeHtml(saint.funFact)}
                </div>` : ''}
            </article>

            <article class="info-card">
                <h2>Patron Saint Of</h2>
                <p>${escapedPatronOf}</p>
            </article>

            <article class="info-card">
                <h2>Life & Origin</h2>
                <p><strong>Feast Day:</strong> ${escapeHtml(saint.feastDay)}</p>
                <p><strong>Lived:</strong> ${escapeHtml(saint.lived || saint.dates)}</p>
                <p><strong>Origin:</strong> ${escapeHtml(saint.origin)}</p>
            </article>

            <article class="info-card">
                <h2>Virtues & Traits</h2>
                <div class="traits-container">
                    ${traitsHtml}
                </div>
            </article>
        </section>

        ${quotesHtml ? `
        <section class="quotes-section">
            <h2>Inspirational Quotes</h2>
            ${quotesHtml}
        </section>
        ` : ''}
    `;
}

// Generate and log
const html = generateHTML(saintsDatabase[0]);
console.log(html);
