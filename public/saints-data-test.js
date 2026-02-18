// Test Enriched Saints Data
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

module.exports = { saintsDatabase, traitCategories };
