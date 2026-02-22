const fs = require('fs');
const path = require('path');

const saintsDataPath = path.join(__dirname, '../public/saints-data-enriched.js');

const newSaints = [
    {
        "name": "St. Martin de Porres",
        "feastDay": "November 3",
        "knownFor": "A lay brother of the Dominican Order known for his humility, his care for the poor, and his miraculous healing abilities.",
        "patronOf": "mixed-race people, innkeepers, barbers, social justice, public health workers",
        "dates": "1579-1639",
        "origin": "Peru",
        "gender": "Male",
        "traits": ["humility", "charity", "healing", "compassion", "service"],
        "quotes": ["Everything, even sweeping, scraping vegetables, weeding a garden and waiting on the sick could be a prayer, if it were offered to God."],
        "title": "St. Martin de Porres",
        "lived": "1579-1639",
        "bio": "Martin was the daughter of a Spanish nobleman and a formerly enslaved woman from Panama. Despite facing racial discrimination, he became a Dominican lay brother and dedicated his life to serving the poor and the sick in Lima. He founded an orphanage and a children's hospital.",
        "funFact": "He was famously known as 'Martin of the Broom' for his willingness to do the most menial tasks with great love, and legend says he could bilocate and even communicate with animals.",
        "enriched": true
    },
    {
        "name": "St. Rose of Lima",
        "feastDay": "August 23",
        "knownFor": "The first person born in the Americas to be canonized as a saint, known for her severe penances and care for the needy.",
        "patronOf": "Latin America, Peru, Philippines, florists, gardeners",
        "dates": "1586-1617",
        "origin": "Peru",
        "gender": "Female",
        "traits": ["piety", "fortitude", "sacrifice", "charity", "mysticism"],
        "quotes": ["Apart from the cross, there is no other ladder by which we may get to heaven."],
        "title": "St. Rose of Lima",
        "lived": "1586-1617",
        "bio": "Rose was a Dominican tertiary who lived a life of intense prayer and asceticism in her parents' garden. She was known for her beauty but chose to dedicate her life solely to God, refusing all marriage proposals. She cared for the sick and the poor of Lima, often bringing them into her own home.",
        "funFact": "Her real name was Isabel, but she was called 'Rosa' because as an infant, a servant claimed to have seen her face transform into a rose.",
        "enriched": true
    },
    {
        "name": "St. Peter Claver",
        "feastDay": "September 9",
        "knownFor": "A Jesuit missionary who dedicated his life to serving enslaved people in South America, calling himself the 'slave of the slaves forever'.",
        "patronOf": "slaves, Colombia, racial justice",
        "dates": "1580-1654",
        "origin": "Spain/Colombia",
        "gender": "Male",
        "traits": ["justice", "charity", "courage", "service", "faithfulness"],
        "quotes": ["We must speak to them with our hands by giving, before we try to speak to them with our lips."],
        "title": "St. Peter Claver",
        "lived": "1580-1654",
        "bio": "Peter Claver spent 44 years in Cartagena, Colombia, meeting the slave ships as they arrived. He provided food, medicine, and spiritual comfort to the terrified captives, baptizing over 300,000 people. He lived among them and fought for their human dignity against the slave traders.",
        "funFact": "He was so dedicated that he would often spend all night in the stifling, disease-ridden holds of the ships to be with the dying.",
        "enriched": true
    },
    {
        "name": "St. Oscar Romero",
        "feastDay": "March 24",
        "knownFor": "Archbishop of San Salvador who was martyred for his vocal defense of the poor and victims of social injustice.",
        "patronOf": "El Salvador, Americas, persecuted Christians",
        "dates": "1917-1980",
        "origin": "El Salvador",
        "gender": "Male",
        "traits": ["justice", "courage", "charity", "leadership", "sacrifice"],
        "quotes": ["I do not believe in death without resurrection. If they kill me, I will rise again in the Salvadoran people.", "Aspire not to have more, but to be more."],
        "title": "St. Oscar Romero",
        "lived": "1917-1980",
        "bio": "Romero was initially a conservative bishop, but the increasing violence against the poor and the murder of his friend, Fr. Rutilio Grande, transformed him into a 'voice for the voiceless'. He used his weekly radio sermons to denounce the military government's human rights abuses. He was shot while celebrating Mass in 1980.",
        "funFact": "He was canonized by Pope Francis in 2018 alongside Pope Paul VI.",
        "enriched": true
    },
    {
        "name": "St. José Sánchez del Río",
        "feastDay": "February 10",
        "knownFor": "A 14-year-old Cristero martyr who refused to renounce his faith despite horrific torture.",
        "patronOf": "persecuted Christians, children, adolescents",
        "dates": "1913-1928",
        "origin": "Mexico",
        "gender": "Male",
        "traits": ["courage", "loyalty", "sacrifice", "faithfulness", "bravery"],
        "quotes": ["¡Viva Cristo Rey! (Long live Christ the King!)", "I will never give up my faith, even if I have to die."],
        "title": "St. José Sánchez del Río",
        "lived": "1913-1928",
        "bio": "José was a young boy who joined the Cristeros during the religious persecution in Mexico. After he was captured, he was told his life would be spared if he shouted 'Death to Christ the King'. He refused, even after the soles of his feet were cut and he was forced to walk to his grave. His final cry was once again '¡Viva Cristo Rey!'.",
        "funFact": "He was featured as a central character in the 2012 film 'For Greater Glory: The True Story of Cristiada'.",
        "enriched": true
    },
    {
        "name": "St. Miguel Pro",
        "feastDay": "November 23",
        "knownFor": "A Jesuit priest and martyr who used disguises to secretly minister to Catholics during the Mexican persecution.",
        "patronOf": "Mexico",
        "dates": "1891-1927",
        "origin": "Mexico",
        "gender": "Male",
        "traits": ["courage", "humor", "zeal", "sacrifice", "creativity"],
        "quotes": ["¡Viva Cristo Rey!", "May God have mercy on you."],
        "title": "St. Miguel Pro",
        "lived": "1891-1927",
        "bio": "Fr. Pro was a joyful and witty priest who returned to Mexico when the Church was underground. He used various disguises—mechanic, dandy, laborer—to evade the police while bringing the Sacraments to the people. He was falsely accused of an assassination attempt and executed by firing squad without a trial.",
        "funFact": "The government invited photographers to his execution to mock him, but the resulting photos of him dying with his arms outstretched like a cross became a powerful symbol of the resistance.",
        "enriched": true
    },
    {
        "name": "St. Matrona of Moscow",
        "feastDay": "May 2",
        "knownFor": "A blind and crippled Russian wonderworker who was one of the most beloved saints of the 20th century.",
        "patronOf": "Moscow, sick people",
        "dates": "1881-1952",
        "origin": "Russia",
        "gender": "Female",
        "traits": ["patience", "clairvoyance", "kindness", "piety", "resilience"],
        "quotes": ["Come to me and tell me as if I were alive, and I will see you and hear you, and help you."],
        "title": "St. Matrona of Moscow",
        "lived": "1881-1952",
        "bio": "Born blind in a peasant family, Matrona spent her life in prayer and counseling thousands who sought her help during the difficult years of Soviet rule. Despite her physical disabilities and the constant threat of arrest, she was a source of spiritual light and healing for any who came to her.",
        "funFact": "She reportedly predicted her own death three days in advance and told people to continue visiting her grave for help.",
        "enriched": true
    },
    {
        "name": "St. Luke of Simferopol",
        "feastDay": "June 11",
        "knownFor": "A brilliant surgeon, professor, and archbishop who continued to serve the sick even while in Soviet exile.",
        "patronOf": "surgeons, physicians",
        "dates": "1877-1961",
        "origin": "Russia/Ukraine",
        "gender": "Male",
        "traits": ["intellect", "courage", "professionalism", "faithfulness", "service"],
        "quotes": ["I have loved medicine, but I loved my God more."],
        "title": "St. Luke of Simferopol",
        "lived": "1877-1961",
        "bio": "Dr. Valentin Voyno-Yasenetsky was a world-class surgeon who wrote 'Essays on Purulent Surgery', a textbook used for decades. He became a priest and then a bishop during the height of Stalin's purges. He spent 11 years in various prisons and exiles, often performing surgeries with limited tools to save the lives of fellow prisoners.",
        "funFact": "He was the only bishop to win the Stalin Prize for his scientific work while simultaneously being a political prisoner.",
        "enriched": true
    },
    {
        "name": "St. Seraphim of Vyritsa",
        "feastDay": "April 3",
        "knownFor": "A wealthy merchant who gave away his fortune after the Revolution to become a monk and a spiritual elder.",
        "patronOf": "business people",
        "dates": "1866-1949",
        "origin": "Russia",
        "gender": "Male",
        "traits": ["sacrifice", "piety", "wisdom", "charity", "humility"],
        "quotes": ["The most important thing is to love God and your neighbor."],
        "title": "St. Seraphim of Vyritsa",
        "lived": "1866-1949",
        "bio": "Vasily Muravyov was a successful businessman/milionaire who entered a monastery with his wife (who became a nun). During WWII, he prayed for 1,000 nights on a rock for the salvation of Russia, mirroring his namesake St. Seraphim of Sarov. He became a beloved elder to whom thousands of people from Leningrad flocked for comfort.",
        "funFact": "Before the Revolution, he was one of the richest men in Russia, but he lived his final years in a tiny room on a simple wooden bed.",
        "enriched": true
    },
    {
        "name": "St. Maria of Gatchina",
        "feastDay": "February 8",
        "knownFor": "A bedridden nun and martyr who was a source of spiritual strength for thousands during the Soviet era.",
        "patronOf": "depressed people, sick people",
        "dates": "1874-1932",
        "origin": "Russia",
        "gender": "Female",
        "traits": ["patience", "joy", "strength", "piety", "endurance"],
        "quotes": ["God is our strength; don't be afraid."],
        "title": "St. Maria of Gatchina",
        "lived": "1874-1932",
        "bio": "Maria suffered from Parkinson's disease which left her completely paralyzed and in constant pain. Despite this, she was transformed into a spiritual elder who could read souls. People lined up outside her house in Gatchina to receive her counsel. She was finally arrested and died in a prison hospital.",
        "funFact": "She was known for her incredible gift of 'joyous sorrow'—a deep inner peace that could heal the depression of those who visited her.",
        "enriched": true
    },
    {
        "name": "St. Elizabeth the New Martyr",
        "feastDay": "July 18",
        "knownFor": "A Grand Duchess of Russia who became a nun after her husband's murder and founded a convent for the poor.",
        "patronOf": "nurses, converts",
        "dates": "1864-1918",
        "origin": "Germany/Russia",
        "gender": "Female",
        "traits": ["charity", "forgiveness", "sacrifice", "dignity", "piety"],
        "quotes": ["Lord, forgive them, for they know not what they do."],
        "title": "St. Elizabeth the New Martyr",
        "lived": "1864-1918",
        "bio": "Princess Elizabeth of Hesse was the granddaughter of Queen Victoria and sister to the last Tsarina. After her husband was killed by a bomb, she visited his assassin to forgive him. She became a nun and founded the Martha and Mary Convent in Moscow, serving the city's poorest. She was thrown down a mine shaft alive by the Bolsheviks.",
        "funFact": "As she lay dying at the bottom of the mine shaft, she was reportedly heard singing hymns and was found to have used her own veil to bandage the wounds of a fellow prisoner.",
        "enriched": true
    },
    {
        "name": "St. Barbara the New Martyr",
        "feastDay": "July 18",
        "knownFor": "The faithful companion and fellow martyr of St. Elizabeth the New Martyr.",
        "patronOf": "loyalty",
        "dates": "d. 1918",
        "origin": "Russia",
        "gender": "Female",
        "traits": ["loyalty", "courage", "faithfulness", "sacrifice", "humility"],
        "quotes": ["I will not leave you, no matter what happens."],
        "title": "St. Barbara the New Martyr",
        "lived": "d. 1918",
        "bio": "Barbara Yakovleva was a novice at the Martha and Mary Convent and a devoted friend of St. Elizabeth. When the secret police came to deport Elizabeth, they offered Barbara her freedom, but she refused to abandon her mentor. She shared in the same horrific death in the Alapaevsk mine shaft.",
        "funFact": "She is a symbol of the profound holiness that can be found in simple, quiet loyalty.",
        "enriched": true
    },
    {
        "name": "St. Vladimir of Kiev",
        "feastDay": "July 15",
        "knownFor": "The Grand Prince of Kiev who converted to Christianity and baptized the entire nation of Kievan Rus'.",
        "patronOf": "Russia, Ukraine",
        "dates": "c. 958-1015",
        "origin": "Kyivan Rus'",
        "gender": "Male",
        "traits": ["leadership", "transformation", "zeal", "piety", "nationalism"],
        "quotes": ["I have found the true faith."],
        "title": "St. Vladimir of Kiev",
        "lived": "c. 958-1015",
        "bio": "Vladimir was a fierce pagan ruler who sent envoys to research different religions. They were so moved by the beauty of the liturgy in Constantinople that he chose Orthodoxy. After his conversion, he radically changed his life, dismissing his many wives and building churches and hospitals.",
        "funFact": "He is often called 'Vladimir the Great' or 'Equal-to-the-Apostles' for his role in bringing Christianity to the Slavic peoples.",
        "enriched": true
    },
    {
        "name": "St. Olga of Kiev",
        "feastDay": "July 11",
        "knownFor": "The first Christian ruler of Kievan Rus', known for her wisdom and her role in paving the way for her grandson St. Vladimir.",
        "patronOf": "widows, converts",
        "dates": "c. 890-969",
        "origin": "Kyivan Rus'",
        "gender": "Female",
        "traits": ["wisdom", "determination", "leadership", "patriotism", "piety"],
        "quotes": ["Let my people see the light of Christ."],
        "title": "St. Olga of Kiev",
        "lived": "c. 890-969",
        "bio": "Olga was a regent who ruled Kyivan Rus' with great skill. She was baptized in Constantinople and attempted to bring Christianity to her people, though her own son refused to convert. She is remembered as the first saint of the Russian Orthodox Church.",
        "funFact": "Before her conversion, she was famous for her extremely clever and ruthless revenge on the tribe that had murdered her husband.",
        "enriched": true
    },
    {
        "name": "St. Boris",
        "feastDay": "May 2",
        "knownFor": "Prince of Kiev and martyr who refused to fight his brother for the throne, becoming a 'Passion-bearer'.",
        "patronOf": "Russia, peacemakers",
        "dates": "d. 1015",
        "origin": "Kyivan Rus'",
        "gender": "Male",
        "traits": ["peacemaking", "loyalty", "sacrifice", "humility", "patriotism"],
        "quotes": ["I will not lift a hand against my brother."],
        "title": "St. Boris",
        "lived": "d. 1015",
        "bio": "Boris was a son of St. Vladimir. When his elder brother Sviatopolk plotted to seize the throne, Boris's troops urged him to fight back. Instead, Boris chose to model Christ by non-resistance, sending his army home and waiting for his assassins while singing psalms.",
        "funFact": "He and his brother Gleb were the first saints canonized in Russia and are the founders of the unique Russian tradition of 'Passion-bearing'.",
        "enriched": true
    },
    {
        "name": "St. Gleb",
        "feastDay": "May 2",
        "knownFor": "Prince of Kiev and fellow martyr with his brother St. Boris.",
        "patronOf": "Russia, siblings",
        "dates": "d. 1015",
        "origin": "Kyivan Rus'",
        "gender": "Male",
        "traits": ["loyalty", "sacrifice", "faithfulness", "innocence", "peacemaking"],
        "quotes": ["Blessed are the peacemakers."],
        "title": "St. Gleb",
        "lived": "d. 1015",
        "bio": "Gleb was the younger brother of Boris. Like his brother, he refused to take up arms against Sviatopolk, choosing instead to follow the example of Christ's voluntary suffering. He was murdered shortly after Boris.",
        "funFact": "Boris and Gleb are almost always depicted together in icons, usually holding crosses and wearing princely robes.",
        "enriched": true
    },
    {
        "name": "St. Alexander Nevsky",
        "feastDay": "November 23",
        "knownFor": "Grand Prince of Russia and legendary military leader who protected the Orthodox faith from foreign invaders.",
        "patronOf": "Russia, soldiers, St. Petersburg",
        "dates": "c. 1220-1263",
        "origin": "Russia",
        "gender": "Male",
        "traits": ["leadership", "courage", "patriotism", "diplomacy", "piety"],
        "quotes": ["God is not in power, but in truth."],
        "title": "St. Alexander Nevsky",
        "lived": "c. 1220-1263",
        "bio": "Alexander was a brilliant general who defeated the Swedes on the Neva River and the Teutonic Knights on Lake Peipus. He used his diplomatic skills to manage the relationship with the Golden Horde, saving Russia from complete destruction. He took monastic vows on his deathbed.",
        "funFact": "He was voted the 'Greatest Russian' in a nationwide 2008 TV poll.",
        "enriched": true
    },
    {
        "name": "St. Savva of Serbia",
        "feastDay": "January 14",
        "knownFor": "The first Archbishop of the autocephalous Serbian Orthodox Church and national hero of Serbia.",
        "patronOf": "Serbia, students, education",
        "dates": "c. 1174-1236",
        "origin": "Serbia",
        "gender": "Male",
        "traits": ["leadership", "diplomacy", "education", "piety", "wisdom"],
        "quotes": ["The soul is more precious than the body."],
        "title": "St. Savva of Serbia",
        "lived": "c. 1174-1236",
        "bio": "Savva was a prince who secretly fled to Mount Athos to become a monk. He later returned to Serbia to establish its independent church, founded schools and hospitals, and negotiated peace between his brothers. He is considered the father of Serbian culture and identity.",
        "funFact": "He is credited with bringing 'European' education and law to medieval Serbia.",
        "enriched": true
    },
    {
        "name": "St. Nino of Georgia",
        "feastDay": "January 14",
        "knownFor": "The 'Equal-to-the-Apostles' and 'Enlightener of Georgia' who brought Christianity to the Iberian kingdom.",
        "patronOf": "Georgia",
        "dates": "c. 296-338",
        "origin": "Turkey/Georgia",
        "gender": "Female",
        "traits": ["zeal", "leadership", "courage", "faithfulness", "determination"],
        "quotes": ["Through this cross, you will be saved."],
        "title": "St. Nino of Georgia",
        "lived": "c. 296-338",
        "bio": "Nino was a young woman from Cappadocia who traveled to Georgia (Iberia) to preach the Gospel. She converted the Queen and then the King through her miracles and her preaching. She is revered as the primary patron of Georgia.",
        "funFact": "She is famous for the 'Grapevine Cross' which she made from vine branches bound with her own hair; it remains a symbol of Georgian Christianity today.",
        "enriched": true
    },
    {
        "name": "St. David of Wales",
        "feastDay": "March 1",
        "knownFor": "The patron saint of Wales and a bishop who founded many monasteries known for their extreme austerity.",
        "patronOf": "Wales, vegetarians, poets",
        "dates": "c. 500-589",
        "origin": "Wales",
        "gender": "Male",
        "traits": ["piety", "leadership", "simplicity", "eloquence", "discipline"],
        "quotes": ["Be joyful, keep the faith, and do the little things."],
        "title": "St. David of Wales",
        "lived": "c. 500-589",
        "bio": "David (Dewi Sant) was a prominent figure in the Celtic Church. He was known as 'The Waterman' (Aquaticus) because he and his monks drank only water and ate only bread and herbs. His final words to his followers, 'Do the little things', is a beloved Welsh proverb.",
        "funFact": "Legend says that while he was preaching to a large crowd, the ground he was standing on rose up to form a hill so everyone could see and hear him, and a white dove settled on his shoulder.",
        "enriched": true
    },
    {
        "name": "St. Columba of Iona",
        "feastDay": "June 9",
        "knownFor": "The 'Apostle to the Picts', a powerful Irish abbot who founded the monastery of Iona and converted much of Scotland.",
        "patronOf": "Scotland, Ireland, bookbinders, poets",
        "dates": "521-597",
        "origin": "Ireland/Scotland",
        "gender": "Male",
        "traits": ["leadership", "intellect", "courage", "missionary", "artistic"],
        "quotes": ["I follow the King of Kings."],
        "title": "St. Columba of Iona",
        "lived": "521-597",
        "bio": "Columba (Colum Cille) was a prince and a gifted scholar. After a conflict over a copied book led to a battle, he went into exile on the island of Iona. From there, he became a major cultural and religious force, establishing a network of monasteries and spreading the faith throughout the British Isles.",
        "funFact": "The first written account of a 'monster' in the River Ness (Loch Ness) comes from the life of St. Columba, who reportedly commanded the beast to stop and go back.",
        "enriched": true
    },
    {
        "name": "St. Aidan of Lindisfarne",
        "feastDay": "August 31",
        "knownFor": "The 'Apostle of Northumbria', known for his gentleness and his practice of traveling on foot to talk to everyone he met.",
        "patronOf": "Northumbria, firemen",
        "dates": "d. 651",
        "origin": "Ireland/England",
        "gender": "Male",
        "traits": ["gentleness", "charity", "simplicity", "leadership", "kindness"],
        "quotes": ["Let our lives be a sermon."],
        "title": "St. Aidan of Lindisfarne",
        "lived": "d. 651",
        "bio": "Aidan was an Irish monk from Iona who was sent to convert the Anglo-Saxons. He founded the monastery on Holy Island (Lindisfarne). He was famous for giving away any gifts he received to the poor and for his deep friendship with King Oswald of Northumbria.",
        "funFact": "He was once given a fine horse by the King, but he immediately gave it to a beggar he met on the road.",
        "enriched": true
    },
    {
        "name": "St. Hilda of Whitby",
        "feastDay": "November 17",
        "knownFor": "A legendary abbess and advisor to kings who led the double monastery of Whitby (men and women).",
        "patronOf": "learning, poets",
        "dates": "c. 614-680",
        "origin": "England",
        "gender": "Female",
        "traits": ["leadership", "wisdom", "education", "justice", "diplomacy"],
        "quotes": ["Peace and charity are the highest virtues."],
        "title": "St. Hilda of Whitby",
        "lived": "c. 614-680",
        "bio": "Hilda was a noblewoman of the kingdom of Deira. She was a powerful and wise administrator who trained five future bishops at her monastery. She hosted the historic Synod of Whitby, which decided how the English Church would calculate the date of Easter.",
        "funFact": "She is the patroness of Caedmon, the first known English poet, whom she encouraged to write after hearing of his miraculous gift from an angel.",
        "enriched": true
    },
    {
        "name": "St. Dunstan",
        "feastDay": "May 19",
        "knownFor": "Archbishop of Canterbury who revitalized English monasticism and served as a statesman under several kings.",
        "patronOf": "goldsmiths, blacksmiths, locksmiths, musicians",
        "dates": "c. 909-988",
        "origin": "England",
        "gender": "Male",
        "traits": ["leadership", "artistic", "discipline", "justice", "reform"],
        "quotes": ["The measure of love is to love without measure."],
        "title": "St. Dunstan",
        "lived": "c. 909-988",
        "bio": "Dunstan was an artist, a musician, and a skilled metalworker before becoming a monk. He rose to become the most powerful religious leader in England, reforming the clergy and using his influence to bring stability to the country. He was also a noted bell-caster.",
        "funFact": "A famous legend says that Dunstan, while working at his forge, was tempted by the devil; Dunstan reportedly grabbed the devil's nose with his red-hot tongs.",
        "enriched": true
    },
    {
        "name": "St. Edward the Confessor",
        "feastDay": "October 13",
        "knownFor": "One of the last Anglo-Saxon kings of England, known for his piety and for rebuilding Westminster Abbey.",
        "patronOf": "kings, difficult marriages, separate spouses",
        "dates": "c. 1003-1066",
        "origin": "England",
        "gender": "Male",
        "traits": ["piety", "justice", "simplicity", "peace", "loyalty"],
        "quotes": ["May God's peace be upon my people."],
        "title": "St. Edward the Confessor",
        "lived": "c. 1003-1066",
        "bio": "Edward was a quiet and devout king who was more interested in prayer than in power. He was beloved by his subjects for his kindness and his abolition of heavy taxes. He died shortly before the Norman Conquest, and his shrine in Westminster Abbey remains a major site of pilgrimage.",
        "funFact": "He was the first English king to be depicted with a crown of light (halo) on the Bayeux Tapestry.",
        "enriched": true
    }
];

// Logic to append to the file
let content = fs.readFileSync(saintsDataPath, 'utf8');

const splitMarker = 'const traitCategories';
const parts = content.split(splitMarker);
let saintsPart = parts[0];

const lastBracketIndex = saintsPart.lastIndexOf(']');

if (lastBracketIndex === -1) {
    console.error("Could not find end of saintsDatabase array");
    process.exit(1);
}

const newSaintsString = ',\n' + newSaints.map(s => JSON.stringify(s, null, 4)).join(',\n');

const updatedSaintsPart = saintsPart.substring(0, lastBracketIndex) + newSaintsString + '\n' + saintsPart.substring(lastBracketIndex);

const finalContent = updatedSaintsPart + splitMarker + parts[1];

const totalRegex = /\/\/ Total: (\d+)/;
const currentTotalMatch = finalContent.match(totalRegex);
if (currentTotalMatch) {
    const currentTotal = parseInt(currentTotalMatch[1]);
    const newTotal = currentTotal + newSaints.length;
    fs.writeFileSync(saintsDataPath, finalContent.replace(totalRegex, `// Total: ${newTotal}`), 'utf8');
} else {
    fs.writeFileSync(saintsDataPath, finalContent, 'utf8');
}

console.log(`Successfully appended ${newSaints.length} saints.`);
