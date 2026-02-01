const XLSX = require('xlsx');
const fs = require('fs');

// Read Excel file
const workbook = XLSX.readFile('Catholic_Saints_Comprehensive.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

// Female name indicators
const femaleIndicators = ['Mary', 'Anne', 'Joan', 'Teresa', 'Catherine', 'Clare', 'Elizabeth', 'Margaret',
    'Bridget', 'Rose', 'Monica', 'Lucy', 'Cecilia', 'Agnes', 'Agatha', 'Barbara', 'Rita', 'Bernadette',
    'Therese', 'Thérèse', 'Faustina', 'Gianna', 'Josephine', 'Frances', 'Louise', 'Scholastica',
    'Hildegard', 'Kateri', 'Edith', 'Dymphna', 'Hilda', 'Brigid', 'Apollonia', 'Veronica'];

// Trait mapping based on keywords
const traitKeywords = {
    // Intellectual traits
    intellectual: ['theologian', 'philosopher', 'wrote', 'scholar', 'teacher', 'Doctor of the Church', 'university', 'learning'],
    teaching: ['teacher', 'educator', 'education', 'schools', 'university', 'students'],
    writing: ['wrote', 'Gospel', 'epistles', 'author', 'writers', 'historian'],
    wisdom: ['philosopher', 'theologian', 'Doctor', 'wise'],

    // Contemplative traits
    contemplation: ['mystic', 'contemplative', 'prayer', 'monastery', 'monk', 'nun', 'abbey', 'abbot', 'abbess'],
    mysticism: ['mystic', 'visions', 'stigmata', 'revelations', 'apparitions'],
    prayer: ['prayer', 'devotion', 'Rosary', 'Divine Mercy'],
    devotion: ['devoted', 'devotion', 'follower'],

    // Service traits
    service: ['served', 'founded', 'charity', 'hospital', 'poor', 'sick', 'helped'],
    charity: ['charity', 'poor', 'gave', 'generosity', 'homeless'],
    compassion: ['poor', 'sick', 'suffering', 'served', 'cared'],
    healing: ['healing', 'healed', 'nurses', 'physicians', 'hospital', 'sick', 'leprosy', 'plague'],
    generosity: ['gave', 'donated', 'wealth', 'charity', 'poor'],

    // Leadership traits
    leadership: ['Pope', 'Bishop', 'Archbishop', 'Cardinal', 'King', 'Queen', 'Prince', 'founded', 'leader', 'led'],
    reform: ['reform', 'reformed', 'Council'],
    activism: ['defended', 'fought', 'led', 'opposed'],
    conviction: ['martyred', 'refused', 'defended', 'stood'],
    discipline: ['Rule', 'Order', 'strict'],

    // Missionary traits
    missionary: ['missionary', 'missions', 'evangelized', 'brought Christianity', 'Apostle'],
    adventure: ['traveled', 'voyaged', 'sailed', 'navigator'],
    'cross-cultural': ['foreign', 'Asia', 'Africa', 'Americas', 'India', 'Japan', 'China'],
    preaching: ['preacher', 'preaching', 'sermon', 'Gospel'],
    evangelization: ['converted', 'Christianity', 'baptized', 'evangelized'],

    // Courage traits
    courage: ['martyred', 'martyr', 'died for', 'persecuted', 'tortured', 'killed'],
    faith: ['faith', 'believed', 'trust', 'devotion'],
    strength: ['strong', 'soldier', 'warrior', 'fought'],
    sacrifice: ['gave life', 'died', 'sacrificed', 'martyred'],
    endurance: ['suffered', 'endured', 'persecuted', 'tortured'],
    heroism: ['saved', 'protected', 'defended', 'hero'],

    // Humble traits
    humility: ['humble', 'simple', 'peasant', 'poor', 'lowly'],
    simplicity: ['simple', 'Little', 'ordinary'],
    obedience: ['obedient', 'followed', 'Rule'],
    poverty: ['poverty', 'poor', 'Franciscan'],
    patience: ['patience', 'patient', 'waited', 'prayed for years'],

    // Family traits
    family: ['mother', 'father', 'wife', 'husband', 'family', 'children', 'parents'],
    motherhood: ['mother', 'mothers', 'pregnant'],
    nurturing: ['cared', 'raised', 'educated', 'children'],
    protection: ['protected', 'guardian', 'safety', 'protection'],
    children: ['children', 'youth', 'boys', 'girls', 'young'],
    youth: ['youth', 'young', 'boys', 'girls', 'students'],
    community: ['community', 'Order', 'founded', 'monastery'],

    // Transformation traits
    transformation: ['converted', 'conversion', 'transformed', 'changed'],
    forgiveness: ['forgiveness', 'forgave', 'mercy', 'penitent'],
    hope: ['hope', 'hopeless', 'desperate', 'impossible'],
    perseverance: ['persevered', 'years', 'continued', 'despite'],

    // Creative traits
    arts: ['music', 'sang', 'poet', 'artist', 'painting'],
    music: ['music', 'musicians', 'sang', 'singers', 'composers'],
    poetry: ['poet', 'poets', 'poetry', 'wrote'],
    nature: ['nature', 'animals', 'environment', 'ecology', 'garden'],
    animals: ['animals', 'dogs', 'birds', 'creatures'],

    // Warrior/Protection traits
    warrior: ['soldier', 'warrior', 'army', 'military', 'battle', 'fought'],
    military: ['soldier', 'military', 'army', 'troops'],
    justice: ['justice', 'defended', 'rights', 'law', 'lawyers'],
    'spiritual-warfare': ['Satan', 'devil', 'demons', 'spiritual warfare'],

    // Mercy/Love traits
    mercy: ['mercy', 'merciful', 'Divine Mercy', 'compassion'],
    love: ['love', 'loved', 'beloved', 'heart'],
    joy: ['joy', 'joyful', 'happy', 'cheerful'],

    // Special traits
    intercession: ['patron', 'intercession', 'prayers'],
    miracles: ['miracles', 'miraculous', 'healed', 'wonder'],
    work: ['workers', 'work', 'labor', 'carpenters', 'craftsmen']
};

// Function to determine gender
function getGender(name, knownFor, patronOf) {
    // Check for archangels and angels
    if (name.includes('Archangel') || name.includes('Guardian Angels')) {
        return 'Male'; // Traditionally depicted as male
    }

    // Check for female indicators
    for (const indicator of femaleIndicators) {
        if (name.includes(indicator)) {
            return 'Female';
        }
    }

    // Check known for and patron of for gender hints
    const combined = (knownFor + ' ' + patronOf).toLowerCase();
    if (combined.includes('virgin') || combined.includes('nun') || combined.includes('abbess') ||
        combined.includes('sister') || combined.includes('mother of') || combined.includes('wife')) {
        return 'Female';
    }

    // Default to Male for priests, bishops, popes, monks, etc.
    return 'Male';
}

// Function to assign traits based on keywords
function getTraits(knownFor, patronOf) {
    const combined = (knownFor + ' ' + patronOf).toLowerCase();
    const traits = new Set();

    for (const [trait, keywords] of Object.entries(traitKeywords)) {
        for (const keyword of keywords) {
            if (combined.includes(keyword.toLowerCase())) {
                traits.add(trait);
                break;
            }
        }
    }

    // Ensure at least 3 traits
    const traitArray = Array.from(traits);
    if (traitArray.length < 3) {
        const defaultTraits = ['faith', 'devotion', 'perseverance', 'love', 'service'];
        for (const t of defaultTraits) {
            if (!traits.has(t) && traitArray.length < 5) {
                traitArray.push(t);
            }
        }
    }

    return traitArray.slice(0, 5);
}

// Function to generate quotes based on saint's characteristics
function getQuotes(name, knownFor, patronOf) {
    const quotes = [];

    // Generate contextual quotes based on saint's role
    if (knownFor.includes('martyr') || knownFor.includes('martyred')) {
        quotes.push("For to me, to live is Christ and to die is gain.");
    }
    if (knownFor.includes('missionary') || knownFor.includes('evangelized') || knownFor.includes('Christianity')) {
        quotes.push("Go and make disciples of all nations.");
    }
    if (knownFor.includes('poor') || knownFor.includes('charity') || patronOf.includes('poor')) {
        quotes.push("What you do for the least of these, you do for me.");
    }
    if (knownFor.includes('prayer') || knownFor.includes('mystic') || knownFor.includes('contemplative')) {
        quotes.push("Prayer is the raising of one's mind and heart to God.");
    }
    if (knownFor.includes('teacher') || knownFor.includes('theologian') || patronOf.includes('students')) {
        quotes.push("The truth will set you free.");
    }

    // Add a universal quote if needed
    if (quotes.length < 2) {
        quotes.push("Lord, make me an instrument of your peace.");
        quotes.push("All for the greater glory of God.");
    }

    return quotes.slice(0, 3);
}

// Process all saints
const saints = data.map(saint => {
    const name = saint['Saint Name'] || '';
    const knownFor = saint['Known For'] || '';
    const patronOf = saint['Patron Saint Of'] || '';

    return {
        name: name,
        feastDay: saint['Feast Day'] || '',
        knownFor: knownFor,
        patronOf: patronOf,
        dates: saint['Dates Lived'] || '',
        origin: saint['Region/Origin'] || '',
        gender: getGender(name, knownFor, patronOf),
        traits: getTraits(knownFor, patronOf),
        quotes: getQuotes(name, knownFor, patronOf)
    };
});

// Generate JavaScript file content
const jsContent = `// Complete Saints Database from Catholic_Saints_Comprehensive.xlsx
// Total: ${saints.length} saints

const saintsDatabase = ${JSON.stringify(saints, null, 4)};

// Trait categories for matching
const traitCategories = {
    intellectual: ["intellectual", "teaching", "writing", "wisdom", "philosophy", "seeking", "introspection", "mentorship"],
    contemplative: ["contemplation", "mysticism", "prayer", "meditation", "devotion", "peace", "balance"],
    service: ["service", "charity", "compassion", "healing", "generosity", "organization"],
    leadership: ["leadership", "reform", "activism", "conviction", "discipline", "justice"],
    missionary: ["missionary", "adventure", "cross-cultural", "preaching", "evangelization"],
    creative: ["arts", "music", "poetry", "nature", "beauty", "animals"],
    humble: ["humility", "simplicity", "obedience", "poverty", "patience"],
    family: ["family", "motherhood", "nurturing", "protection", "children", "youth", "community"],
    transformative: ["transformation", "forgiveness", "hope", "perseverance", "conversion"],
    courageous: ["courage", "faith", "strength", "sacrifice", "endurance", "heroism"],
    warrior: ["warrior", "military", "protection", "justice", "chivalry", "spiritual-warfare"],
    joyful: ["joy", "innovation", "youth", "education", "love"]
};
`;

// Write to file
fs.writeFileSync('public/saints-data.js', jsContent);
console.log(`Generated saints-data.js with ${saints.length} saints`);

// Print gender distribution
const males = saints.filter(s => s.gender === 'Male').length;
const females = saints.filter(s => s.gender === 'Female').length;
console.log(`Gender distribution: ${males} Male, ${females} Female`);
