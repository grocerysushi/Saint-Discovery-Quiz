const fs = require('fs');
const path = require('path');

// Read the saints data file
const saintsDataPath = path.join(__dirname, '../public', 'saints-data-enriched.js');
const saintsDataContent = fs.readFileSync(saintsDataPath, 'utf8');

// Parse the file similarly to generate-saint-pages.js
const modifiedContent = saintsDataContent + '\n return { saintsDatabase };';
const dataFunction = new Function(modifiedContent);
const { saintsDatabase } = dataFunction();

// Helper to normalized date string "Month Day"
function normalizeDate(dateStr) {
    if (!dateStr) return null;
    return dateStr.trim();
}

// Generate all days of the year
function getAllDays() {
    const days = [];
    const months = [
        { name: 'January', days: 31 },
        { name: 'February', days: 29 }, // Leap year support
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

const allDays = getAllDays();
const coveredDays = new Set();
const saintCountByDay = {};

saintsDatabase.forEach(saint => {
    const date = normalizeDate(saint.feastDay);
    if (date && allDays.includes(date)) {
        coveredDays.add(date);
        saintCountByDay[date] = (saintCountByDay[date] || 0) + 1;
    }
});

const missingDays = allDays.filter(day => !coveredDays.has(day));

console.log(`Total Saints: ${saintsDatabase.length}`);
console.log(`Total Days Covered: ${coveredDays.size} / 366`);
console.log(`Missing Days: ${missingDays.length}`);
console.log('--- Sample Missing Days ---');
console.log(missingDays.slice(0, 10));
