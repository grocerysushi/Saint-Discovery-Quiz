const fs = require('fs');
const path = require('path');

const TARGET_JSON = path.join(__dirname, '../public/saints-data-enriched.json');
const TRAITS_JSON = path.join(__dirname, '../public/trait-categories.json');

function fixDatabase() {
    console.log('Reading JSON database...');
    let saints;
    try {
        saints = JSON.parse(fs.readFileSync(TARGET_JSON, 'utf8'));
    } catch (e) {
        console.error('Could not parse JSON file:', e.message);
        return;
    }

    console.log(`Loaded ${saints.length} saints from JSON.`);

    // Filter out any invalid entries (no name or feastDay)
    const validSaints = saints.filter(s => s && s.name && s.feastDay);
    const removed = saints.length - validSaints.length;
    if (removed > 0) {
        console.log(`Removed ${removed} invalid entries.`);
    }

    // Save cleaned JSON
    fs.writeFileSync(TARGET_JSON, JSON.stringify(validSaints, null, 4), 'utf8');
    console.log(`Saved ${validSaints.length} saints to ${TARGET_JSON}`);

    // Regenerate JS wrapper
    const { execSync } = require('child_process');
    execSync('node scripts/build-js-from-json.js', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });

    // Verification
    const check = JSON.parse(fs.readFileSync(TARGET_JSON, 'utf8'));
    console.log(`Verification successful. ${check.length} saints in JSON.`);
}

fixDatabase();
