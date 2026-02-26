#!/usr/bin/env node
/**
 * Generate styled SVG og:image cards for all saint pages,
 * then update og:image and twitter:image meta tags in each HTML file.
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, '../public');
const SAINTS_DIR = path.join(PUBLIC_DIR, 'saints');
const OG_DIR = path.join(PUBLIC_DIR, 'og-images');
const SAINTS_OG_DIR = path.join(OG_DIR, 'saints');
const BASE_URL = 'https://saintdiscoveryquiz.com';

// Colors from the site
const BG = '#FAF7F2';
const GOLD = '#D4AF37';
const BROWN = '#8B4513';
const DARK = '#2C1810';
const LIGHT_BROWN = '#C4956A';

// Wrap text into lines that fit within maxWidth characters
function wrapText(text, maxChars) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if ((current + ' ' + word).trim().length <= maxChars) {
      current = (current + ' ' + word).trim();
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

// Escape XML special characters
function escXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Truncate text with ellipsis
function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}

function generateSaintSVG({ name, feastDay, patronage }) {
  const nameLines = wrapText(name, 28);
  const patronageShort = truncate(patronage, 60);
  const patronageLines = wrapText(patronageShort, 38);

  // Name text Y positions
  const nameStartY = feastDay ? 240 : 270;
  const nameLineHeight = 58;
  const nameBlockHeight = nameLines.length * nameLineHeight;

  // Feast day Y
  const feastY = nameStartY + nameBlockHeight + 20;

  // Patronage Y
  const patronageStartY = feastY + (feastDay ? 50 : 0) + 10;

  const nameSvg = nameLines.map((line, i) =>
    `<text x="600" y="${nameStartY + i * nameLineHeight}" text-anchor="middle" font-family="Georgia, serif" font-size="52" font-weight="bold" fill="${DARK}">${escXml(line)}</text>`
  ).join('\n    ');

  const feastSvg = feastDay
    ? `<text x="600" y="${feastY}" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="${BROWN}" font-style="italic">Feast Day: ${escXml(feastDay)}</text>`
    : '';

  const patronageSvg = patronageLines.map((line, i) =>
    `<text x="600" y="${patronageStartY + i * 34}" text-anchor="middle" font-family="Arial, sans-serif" font-size="26" fill="${LIGHT_BROWN}">${escXml(line)}</text>`
  ).join('\n    ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- Background -->
  <rect width="1200" height="630" fill="${BG}"/>

  <!-- Decorative border -->
  <rect x="20" y="20" width="1160" height="590" fill="none" stroke="${GOLD}" stroke-width="3" rx="8"/>
  <rect x="30" y="30" width="1140" height="570" fill="none" stroke="${GOLD}" stroke-width="1" stroke-dasharray="6,4" rx="6"/>

  <!-- Corner ornaments -->
  <text x="50" y="75" font-family="serif" font-size="36" fill="${GOLD}" opacity="0.6">✦</text>
  <text x="1110" y="75" font-family="serif" font-size="36" fill="${GOLD}" opacity="0.6">✦</text>
  <text x="50" y="600" font-family="serif" font-size="36" fill="${GOLD}" opacity="0.6">✦</text>
  <text x="1110" y="600" font-family="serif" font-size="36" fill="${GOLD}" opacity="0.6">✦</text>

  <!-- Cross icon -->
  <rect x="588" y="60" width="24" height="90" rx="5" fill="${GOLD}"/>
  <rect x="555" y="95" width="90" height="20" rx="5" fill="${GOLD}"/>

  <!-- Horizontal divider -->
  <line x1="200" y1="175" x2="1000" y2="175" stroke="${GOLD}" stroke-width="1.5" opacity="0.5"/>

  <!-- Saint name -->
  ${nameSvg}

  <!-- Feast day -->
  ${feastSvg}

  <!-- Patronage -->
  ${patronageSvg}

  <!-- Bottom divider -->
  <line x1="200" y1="560" x2="1000" y2="560" stroke="${GOLD}" stroke-width="1.5" opacity="0.5"/>

  <!-- Branding -->
  <text x="600" y="595" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="${BROWN}" letter-spacing="2">SAINT DISCOVERY QUIZ</text>
</svg>`;
}

function generateSiteSVG({ title, subtitle }) {
  const titleLines = wrapText(title, 30);

  const titleSvg = titleLines.map((line, i) =>
    `<text x="600" y="${230 + i * 62}" text-anchor="middle" font-family="Georgia, serif" font-size="58" font-weight="bold" fill="${DARK}">${escXml(line)}</text>`
  ).join('\n    ');

  const subtitleY = 230 + titleLines.length * 62 + 30;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BG}"/>
  <rect x="20" y="20" width="1160" height="590" fill="none" stroke="${GOLD}" stroke-width="3" rx="8"/>
  <rect x="30" y="30" width="1140" height="570" fill="none" stroke="${GOLD}" stroke-width="1" stroke-dasharray="6,4" rx="6"/>
  <text x="50" y="75" font-family="serif" font-size="36" fill="${GOLD}" opacity="0.6">✦</text>
  <text x="1110" y="75" font-family="serif" font-size="36" fill="${GOLD}" opacity="0.6">✦</text>
  <text x="50" y="600" font-family="serif" font-size="36" fill="${GOLD}" opacity="0.6">✦</text>
  <text x="1110" y="600" font-family="serif" font-size="36" fill="${GOLD}" opacity="0.6">✦</text>
  <rect x="588" y="60" width="24" height="90" rx="5" fill="${GOLD}"/>
  <rect x="555" y="95" width="90" height="20" rx="5" fill="${GOLD}"/>
  <line x1="200" y1="175" x2="1000" y2="175" stroke="${GOLD}" stroke-width="1.5" opacity="0.5"/>
  ${titleSvg}
  <text x="600" y="${subtitleY}" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="${LIGHT_BROWN}">${escXml(subtitle)}</text>
  <line x1="200" y1="560" x2="1000" y2="560" stroke="${GOLD}" stroke-width="1.5" opacity="0.5"/>
  <text x="600" y="595" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="${BROWN}" letter-spacing="2">SAINT DISCOVERY QUIZ</text>
</svg>`;
}

function extractMeta(html, property) {
  const match = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'))
    || html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`, 'i'));
  return match ? match[1] : null;
}

function extractFeastDay(html) {
  // Try JSON-LD first
  const faqMatch = html.match(/feast day[^"]*?(?:is celebrated on|is)\s+([A-Z][a-z]+ \d+)/i);
  if (faqMatch) return faqMatch[1];
  // Try feast-day-badge in content
  const badgeMatch = html.match(/Feast Day:\s*([A-Z][a-z]+ \d+)/);
  if (badgeMatch) return badgeMatch[1];
  // Try meta description
  const descMatch = html.match(/[Ff]east day:\s*([A-Z][a-z]+ \d+)/);
  if (descMatch) return descMatch[1];
  return null;
}

function extractPatronage(html) {
  // Try jobTitle from JSON-LD
  const jobMatch = html.match(/"jobTitle":\s*"Patron Saint of ([^"]+)"/i);
  if (jobMatch) return 'Patron of ' + jobMatch[1];
  // Try meta description patronage
  const patronMatch = html.match(/[Pp]atron saint of ([^.]+)\./);
  if (patronMatch) return 'Patron of ' + patronMatch[1].trim();
  return '';
}

function updateOgImage(html, ogImageUrl, name) {
  // Update og:image
  html = html.replace(
    /(<meta property="og:image" content=")[^"]+(")/,
    `$1${ogImageUrl}$2`
  );
  // Update og:image:width and og:image:height if present, else add after og:image
  if (html.includes('og:image:width')) {
    html = html.replace(/(<meta property="og:image:width" content=")[^"]+(")/,  '$11200$2');
    html = html.replace(/(<meta property="og:image:height" content=")[^"]+(")/,  '$1630$2');
  } else {
    html = html.replace(
      /(<meta property="og:image"[^>]+>)/,
      `$1\n  <meta property="og:image:width" content="1200">\n  <meta property="og:image:height" content="630">`
    );
  }
  // Update twitter:image
  html = html.replace(
    /(<meta name="twitter:image" content=")[^"]+(")/,
    `$1${ogImageUrl}$2`
  );
  // Upgrade twitter:card to summary_large_image
  html = html.replace(
    /(<meta name="twitter:card" content=")[^"]+(")/,
    `$1summary_large_image$2`
  );
  return html;
}

// Ensure output dirs exist
fs.mkdirSync(OG_DIR, { recursive: true });
fs.mkdirSync(SAINTS_OG_DIR, { recursive: true });

let updated = 0;
let skipped = 0;

// --- Process all saint pages ---
const saintFiles = fs.readdirSync(SAINTS_DIR).filter(f => f.endsWith('.html'));

for (const file of saintFiles) {
  const htmlPath = path.join(SAINTS_DIR, file);
  let html = fs.readFileSync(htmlPath, 'utf8');

  const ogTitle = extractMeta(html, 'og:title') || '';
  // Saint name is the part before " - "
  const name = ogTitle.split(' - ')[0].trim() || file.replace('.html', '');
  const feastDay = extractFeastDay(html);
  const patronage = extractPatronage(html);

  if (!name) { skipped++; continue; }

  const svgFilename = file.replace('.html', '.svg');
  const svgPath = path.join(SAINTS_OG_DIR, svgFilename);
  const ogImageUrl = `${BASE_URL}/og-images/saints/${svgFilename}`;

  const svg = generateSaintSVG({ name, feastDay, patronage });
  fs.writeFileSync(svgPath, svg);

  const updatedHtml = updateOgImage(html, ogImageUrl, name);
  fs.writeFileSync(htmlPath, updatedHtml);

  updated++;
}

// --- Homepage ---
const indexPath = path.join(PUBLIC_DIR, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');
const indexSvg = generateSiteSVG({
  title: 'Saint Discovery Quiz',
  subtitle: 'Find Your Catholic Patron Saint'
});
fs.writeFileSync(path.join(OG_DIR, 'home.svg'), indexSvg);
indexHtml = updateOgImage(indexHtml, `${BASE_URL}/og-images/home.svg`, 'homepage');
fs.writeFileSync(indexPath, indexHtml);

// --- All Saints page ---
const allSaintsPath = path.join(PUBLIC_DIR, 'all-saints.html');
let allSaintsHtml = fs.readFileSync(allSaintsPath, 'utf8');
const allSaintsSvg = generateSiteSVG({
  title: '608 Catholic Saints',
  subtitle: 'Browse Patron Saints by Feast Day, Virtue & Region'
});
fs.writeFileSync(path.join(OG_DIR, 'all-saints.svg'), allSaintsSvg);
allSaintsHtml = updateOgImage(allSaintsHtml, `${BASE_URL}/og-images/all-saints.svg`, 'all-saints');
fs.writeFileSync(allSaintsPath, allSaintsHtml);

console.log(`Done. Updated ${updated} saint pages, skipped ${skipped}.`);
console.log(`SVGs written to: public/og-images/`);
