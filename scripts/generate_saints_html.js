const fs = require('fs');
const path = require('path');

// Paths
const saintsDataPath = path.join(__dirname, '../public/saints-data-enriched.json');
const allSaintsPath = path.join(__dirname, '../public/all-saints.html');

// 1. Read and Parse Data from canonical JSON
const saintsDatabase = JSON.parse(fs.readFileSync(saintsDataPath, 'utf8'));

// 2. Sort and Generate HTML
function slugify(name) {
    return name.toLowerCase().replace(/\./g, '').replace(/['']/g, '').replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

saintsDatabase.sort((a, b) => a.name.replace('St. ', '').localeCompare(b.name.replace('St. ', '')));

const saintsHtml = saintsDatabase.map(saint => `
            <a href="/saints/${slugify(saint.name)}.html" class="saint-card">
                <h2>${saint.name}</h2>
                <span class="feast-day">Feast Day: ${saint.feastDay}</span>
                <p class="known-for">${saint.knownFor}</p>
                <p class="patron-of"><strong>Patron of:</strong> ${saint.patronOf}</p>
                <p class="dates-origin">${saint.dates || saint.lived} | ${saint.origin}</p>
            </a>`).join('');

// 3. Inject into all-saints.html
let htmlContent = fs.readFileSync(allSaintsPath, 'utf8');

const startMarker = '<section class="saints-grid" id="saintsGrid" aria-label="List of Catholic Saints">';
const endMarker = '</section>';

const startIndex = htmlContent.indexOf(startMarker);
const endIndex = htmlContent.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find saints-grid section in HTML file");
    process.exit(1);
}

const newContent = htmlContent.substring(0, startIndex + startMarker.length) +
    '\n' + saintsHtml + '\n        ' +
    htmlContent.substring(endIndex);

fs.writeFileSync(allSaintsPath, newContent, 'utf8');
console.log(`Successfully injected ${saintsDatabase.length} saints into all-saints.html`);
