/**
 * Stamp cacheable assets with content-hash query strings.
 *
 * Scans all HTML files under public/ and replaces references to
 * styles.css, quiz.min.js, and saints-data-enriched.min.js with
 * versioned URLs like styles.css?v=abc123. The hash is derived from
 * the file contents so it only changes when the file actually changes.
 *
 * Usage: node scripts/version-assets.js
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Assets to version — paths relative to public/
const ASSETS = [
    'styles.css',
    'quiz.min.js',
    'saints-data-enriched.min.js',
];

// Compute short content hash for each asset
const hashes = {};
for (const asset of ASSETS) {
    const filePath = path.join(PUBLIC_DIR, asset);
    if (!fs.existsSync(filePath)) {
        console.warn(`Warning: ${asset} not found, skipping`);
        continue;
    }
    const content = fs.readFileSync(filePath);
    hashes[asset] = crypto.createHash('md5').update(content).digest('hex').slice(0, 8);
}

// Build regex that matches each asset filename with an optional existing ?v= query
// Handles both href="styles.css" and href="/styles.css" and src="..." variants
const assetNames = ASSETS.filter(a => hashes[a]);
const pattern = new RegExp(
    `((?:href|src)=["'])(/?)(${ assetNames.map(a => a.replace('.', '\\.')).join('|') })(\\?v=[a-f0-9]+)?(["'])`,
    'g'
);

function processHtml(filePath) {
    let html = fs.readFileSync(filePath, 'utf8');
    let count = 0;
    const updated = html.replace(pattern, (match, prefix, slash, filename, _oldVersion, suffix) => {
        const hash = hashes[filename];
        if (!hash) return match;
        count++;
        return `${prefix}${slash}${filename}?v=${hash}${suffix}`;
    });
    if (count > 0) {
        fs.writeFileSync(filePath, updated, 'utf8');
    }
    return count;
}

// Find all HTML files under public/
function findHtmlFiles(dir) {
    const results = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...findHtmlFiles(full));
        } else if (entry.name.endsWith('.html')) {
            results.push(full);
        }
    }
    return results;
}

const htmlFiles = findHtmlFiles(PUBLIC_DIR);
let totalReplacements = 0;
for (const file of htmlFiles) {
    totalReplacements += processHtml(file);
}

console.log(`Asset hashes: ${Object.entries(hashes).map(([k, v]) => `${k}=${v}`).join(', ')}`);
console.log(`Stamped ${totalReplacements} references across ${htmlFiles.length} HTML files`);
