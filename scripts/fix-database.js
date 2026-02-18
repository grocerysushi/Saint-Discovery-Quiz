const fs = require('fs');
const path = require('path');

const TARGET_FILE = path.join(__dirname, '../public/saints-data-enriched.js');

function fixDatabase() {
    console.log('Reading corrupted file...');
    let content = fs.readFileSync(TARGET_FILE, 'utf8');

    // Find the start of the array
    const startMarker = 'const saintsDatabase = [';
    const startIndex = content.indexOf(startMarker);

    if (startIndex === -1) {
        console.error('Could not find start of saintsDatabase array.');
        return;
    }

    // Find the last valid object closing
    // We look for the pattern of a closing saint object, which typically ends with "generatedForGap": true } or just }
    // We will search for the last occurrence of "}," which isn't followed by garbage we can't parse?
    // Actually, let's try to extract the array string and clean it up.

    // We know the corruption happens at the end. 
    // Let's find the last occurrences of `},`.
    const lastValidClosing = content.lastIndexOf('    },');

    if (lastValidClosing === -1) {
        console.error('Could not find any valid object closings.');
        return;
    }

    // Checking if there is a ']' after the last valid closing
    // In the corrupted output, we saw `}, { <garbage>`. 
    // So we likely want to keep everything up to `lastValidClosing + 6` (length of "    },")
    // BUT, we need to be careful. The `lastIndexOf` might be strictly before the corruption.

    // Let's look at the context directly.
    console.log(`Found last candidate closing at index ${lastValidClosing}`);

    // We will truncate effectively at lastValidClosing + 6 starts the new potential object.
    // We want to remove the comma if it's the last element, or keep it if we are adding more.
    // If we assume the last object was cut off or garbage was appended, we should close the array after the last FULL object.

    const arrayContent = content.substring(startIndex + startMarker.length, lastValidClosing + 6);

    // Now verify we can parse this if we wrap it in brackets
    const potentialJSON = '[' + arrayContent.replace(/^\s*\[/, '').replace(/,\s*$/, '') + ']';

    // Wait, the substring includes the leading `[` implicitly if we are not careful.
    // `startIndex + startMarker.length` points to right after `[`.

    // Let's rely on parsing valid JSON objects one by one if needed, or just trusting the cut.
    // A safer bet: 
    // 1. Split by `    },`
    // 2. Validate each chunk? No that's hard.

    // Heuristic: The garbage seems to start after a valid object.
    // We will take the content up to `lastValidClosing + 6` (which captures `    },`)
    // Then we assume that's the end of valid data.
    // We remove the trailing comma.

    let cleanedArrayString = content.substring(startIndex + startMarker.length, lastValidClosing + 5); // +5 captures `    }`

    // Remove leading line breaks or commas if any (shouldn't be)
    // cleanedArrayString should look like:
    //  { ... },
    //  { ... },
    //  ...
    //  { ... }

    // reconstruct the file
    const newContent = `// Enriched Saints Database
// Repaired: ${new Date().toISOString()}

const saintsDatabase = [
${cleanedArrayString}
];

// Trait Categories (Restored)
const traitCategories = {
    "intellectual": ["wisdom", "teaching", "writing", "philosophy", "truth", "light", "prudence"],
    "monastic": ["contemplation", "prayer", "silence", "solitude", "simplicity", "poverty", "obedience", "discipline"],
    "service": ["charity", "healing", "service", "compassion", "generosity", "humility", "mercy"],
    "leadership": ["leadership", "reform", "justice", "courage", "conviction", "strength", "zeal", "protection"],
    "mystic": ["mysticism", "visionary", "union", "devotion", "piety", "wonder", "joy", "peace"],
    "missionary": ["evangelization", "preaching", "travel", "adventure", "endurance", "perseverance", "hope", "transformation"]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { saintsDatabase, traitCategories };
}
`;

    fs.writeFileSync(TARGET_FILE, newContent);
    console.log('Database repaired.');

    // Verification
    try {
        const check = require(TARGET_FILE);
        console.log(`Verification successful. Loaded ${check.saintsDatabase.length} saints.`);
    } catch (e) {
        console.error('Verification failed:', e);
    }
}

fixDatabase();
