/**
 * Build JS wrapper files from canonical JSON data sources.
 * 
 * This script reads the JSON data files and generates the JS files
 * that the client-side <script> tags load. This replaces the old pattern
 * of storing data directly in JS files and parsing them with regex.
 * 
 * Usage: node scripts/build-js-from-json.js
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

function buildEnrichedJs() {
    const saints = JSON.parse(fs.readFileSync(path.join(PUBLIC_DIR, 'saints-data-enriched.json'), 'utf8'));
    const traitCategories = JSON.parse(fs.readFileSync(path.join(PUBLIC_DIR, 'trait-categories.json'), 'utf8'));

    const content = `// Enriched Saints Database
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

    fs.writeFileSync(path.join(PUBLIC_DIR, 'saints-data-enriched.js'), content, 'utf8');
    console.log(`Built saints-data-enriched.js (${saints.length} saints)`);
}

function buildBaseJs() {
    const saints = JSON.parse(fs.readFileSync(path.join(PUBLIC_DIR, 'saints-data.json'), 'utf8'));

    // Use the same trait categories from the enriched data
    const traitCategoriesPath = path.join(PUBLIC_DIR, 'trait-categories.json');
    let traitCategories;
    if (fs.existsSync(traitCategoriesPath)) {
        traitCategories = JSON.parse(fs.readFileSync(traitCategoriesPath, 'utf8'));
    }

    let content = `// Complete Saints Database from Catholic_Saints_Comprehensive.xlsx
// Total: ${saints.length} saints (including beatified)
// Auto-generated from saints-data.json — do not edit directly

const saintsDatabase = ${JSON.stringify(saints, null, 4)};
`;

    if (traitCategories) {
        content += `
// Trait categories for matching
const traitCategories = ${JSON.stringify(traitCategories, null, 4)};
`;
    }

    fs.writeFileSync(path.join(PUBLIC_DIR, 'saints-data.js'), content, 'utf8');
    console.log(`Built saints-data.js (${saints.length} saints)`);
}

function buildQuizJs() {
    const saints = JSON.parse(fs.readFileSync(path.join(PUBLIC_DIR, 'saints-data-enriched.json'), 'utf8'));
    const traitCategories = JSON.parse(fs.readFileSync(path.join(PUBLIC_DIR, 'trait-categories.json'), 'utf8'));

    // Keep only the fields the quiz needs for scoring and display
    const quizFields = ['name', 'feastDay', 'knownFor', 'patronOf', 'dates', 'origin', 'gender', 'traits', 'quote'];
    const slim = saints.map(saint => {
        const obj = {};
        for (const field of quizFields) {
            if (saint[field] !== undefined) obj[field] = saint[field];
        }
        return obj;
    });

    const content = `// Quiz-only Saints Database (slim bundle)
// Total: ${slim.length}
// Fields: ${quizFields.join(', ')}
// Auto-generated from saints-data-enriched.json — do not edit directly
// Generated: ${new Date().toISOString()}

const saintsDatabase = ${JSON.stringify(slim, null, 4)};

// Trait Categories
const traitCategories = ${JSON.stringify(traitCategories, null, 4)};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { saintsDatabase, traitCategories };
}
`;

    fs.writeFileSync(path.join(PUBLIC_DIR, 'saints-data-quiz.js'), content, 'utf8');
    console.log(`Built saints-data-quiz.js (${slim.length} saints, ${quizFields.length} fields each)`);
}

buildEnrichedJs();
buildQuizJs();
buildBaseJs();
console.log('Done.');
