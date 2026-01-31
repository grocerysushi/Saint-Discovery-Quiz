// Complete Saints Database from Catholic_Saints_Comprehensive.xlsx
// Total: 137 saints

const saintsDatabase = [
    {
        "name": "St. Peter",
        "feastDay": "June 29",
        "knownFor": "First Pope, leader of the apostles, martyred in Rome",
        "patronOf": "Fishermen, popes, net makers",
        "dates": "d. c. 64 AD",
        "origin": "Galilee/Rome",
        "gender": "Male",
        "traits": [
            "leadership",
            "conviction",
            "missionary",
            "courage",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Paul",
        "feastDay": "June 29",
        "knownFor": "Apostle to the Gentiles, wrote much of the New Testament",
        "patronOf": "Missionaries, writers, tentmakers",
        "dates": "d. c. 67 AD",
        "origin": "Tarsus/Rome",
        "gender": "Male",
        "traits": [
            "intellectual",
            "writing",
            "missionary",
            "poetry"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Mary Magdalene",
        "feastDay": "July 22",
        "knownFor": "First witness to the Resurrection, devoted follower of Jesus",
        "patronOf": "Penitent sinners, women, pharmacists",
        "dates": "1st century",
        "origin": "Magdala",
        "gender": "Female",
        "traits": [
            "devotion",
            "forgiveness",
            "faith",
            "perseverance",
            "love"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Joseph",
        "feastDay": "March 19",
        "knownFor": "Foster father of Jesus, husband of Mary, patron of workers",
        "patronOf": "Workers, fathers, dying, carpenters",
        "dates": "1st century",
        "origin": "Nazareth",
        "gender": "Male",
        "traits": [
            "family",
            "intercession",
            "work"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Francis of Assisi",
        "feastDay": "October 4",
        "knownFor": "Founder of Franciscans, loved nature and animals, embraced poverty",
        "patronOf": "Animals, environment, merchants, Italy",
        "dates": "1181-1226",
        "origin": "Italy",
        "gender": "Male",
        "traits": [
            "poverty",
            "nature",
            "animals",
            "love"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Clare of Assisi",
        "feastDay": "August 11",
        "knownFor": "Founder of Poor Clares, follower of St. Francis",
        "patronOf": "Television, eye disease, good weather",
        "dates": "1194-1253",
        "origin": "Italy",
        "gender": "Female",
        "traits": [
            "devotion",
            "service",
            "charity",
            "compassion",
            "generosity"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Anthony of Padua",
        "feastDay": "June 13",
        "knownFor": "Franciscan preacher, known for miracles and finding lost items",
        "patronOf": "Lost items, poor people, travelers",
        "dates": "1195-1231",
        "origin": "Portugal/Italy",
        "gender": "Male",
        "traits": [
            "service",
            "charity",
            "compassion",
            "generosity",
            "preaching"
        ],
        "quotes": [
            "What you do for the least of these, you do for me.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Thomas Aquinas",
        "feastDay": "January 28",
        "knownFor": "Dominican theologian, philosopher, wrote Summa Theologica",
        "patronOf": "Students, scholars, universities",
        "dates": "1225-1274",
        "origin": "Italy",
        "gender": "Male",
        "traits": [
            "intellectual",
            "teaching",
            "writing",
            "wisdom",
            "youth"
        ],
        "quotes": [
            "The truth will set you free.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Catherine of Siena",
        "feastDay": "April 29",
        "knownFor": "Doctor of the Church, mystic, influenced papal return to Rome",
        "patronOf": "Europe, fire prevention, nurses",
        "dates": "1347-1380",
        "origin": "Italy",
        "gender": "Female",
        "traits": [
            "intellectual",
            "wisdom",
            "contemplation",
            "mysticism",
            "healing"
        ],
        "quotes": [
            "Prayer is the raising of one's mind and heart to God.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Joan of Arc",
        "feastDay": "May 30",
        "knownFor": "Led French army to victory, martyred at 19",
        "patronOf": "France, soldiers, prisoners",
        "dates": "1412-1431",
        "origin": "France",
        "gender": "Female",
        "traits": [
            "leadership",
            "activism",
            "conviction",
            "courage",
            "strength"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Teresa of Ávila",
        "feastDay": "October 15",
        "knownFor": "Carmelite reformer, mystic, Doctor of the Church",
        "patronOf": "Headache sufferers, Spain, lace makers",
        "dates": "1515-1582",
        "origin": "Spain",
        "gender": "Female",
        "traits": [
            "intellectual",
            "wisdom",
            "contemplation",
            "mysticism",
            "reform"
        ],
        "quotes": [
            "Prayer is the raising of one's mind and heart to God.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Ignatius of Loyola",
        "feastDay": "July 31",
        "knownFor": "Founder of the Jesuits, wrote Spiritual Exercises",
        "patronOf": "Soldiers, educators, retreats",
        "dates": "1491-1556",
        "origin": "Spain",
        "gender": "Male",
        "traits": [
            "intellectual",
            "teaching",
            "writing",
            "strength",
            "poetry"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Francis Xavier",
        "feastDay": "December 3",
        "knownFor": "Jesuit missionary to Asia, brought Christianity to India and Japan",
        "patronOf": "Missionaries, navigators, foreign missions",
        "dates": "1506-1552",
        "origin": "Spain/Asia",
        "gender": "Male",
        "traits": [
            "missionary",
            "adventure",
            "cross-cultural",
            "evangelization"
        ],
        "quotes": [
            "Go and make disciples of all nations.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. John of the Cross",
        "feastDay": "December 14",
        "knownFor": "Carmelite mystic, poet, wrote Dark Night of the Soul",
        "patronOf": "Poets, mystics, contemplatives",
        "dates": "1542-1591",
        "origin": "Spain",
        "gender": "Male",
        "traits": [
            "intellectual",
            "writing",
            "contemplation",
            "mysticism",
            "arts"
        ],
        "quotes": [
            "Prayer is the raising of one's mind and heart to God.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Thérèse of Lisieux",
        "feastDay": "October 1",
        "knownFor": "Carmelite nun, \"Little Flower,\" taught the Little Way",
        "patronOf": "Missionaries, florists, tuberculosis",
        "dates": "1873-1897",
        "origin": "France",
        "gender": "Female",
        "traits": [
            "contemplation",
            "simplicity",
            "faith",
            "devotion",
            "perseverance"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Patrick",
        "feastDay": "March 17",
        "knownFor": "Missionary to Ireland, used shamrock to explain Trinity",
        "patronOf": "Ireland, engineers, excluded people",
        "dates": "c. 385-461",
        "origin": "Britain/Ireland",
        "gender": "Male",
        "traits": [
            "missionary",
            "faith",
            "devotion",
            "perseverance",
            "love"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Augustine of Hippo",
        "feastDay": "August 28",
        "knownFor": "Bishop, philosopher, wrote Confessions and City of God",
        "patronOf": "Theologians, printers, brewers",
        "dates": "354-430",
        "origin": "North Africa",
        "gender": "Male",
        "traits": [
            "intellectual",
            "writing",
            "wisdom",
            "leadership",
            "poetry"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Benedict",
        "feastDay": "July 11",
        "knownFor": "Founder of Benedictines, wrote the Rule of St. Benedict",
        "patronOf": "Europe, monks, students, poison sufferers",
        "dates": "c. 480-547",
        "origin": "Italy",
        "gender": "Male",
        "traits": [
            "intellectual",
            "teaching",
            "writing",
            "contemplation",
            "discipline"
        ],
        "quotes": [
            "The truth will set you free.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Scholastica",
        "feastDay": "February 10",
        "knownFor": "Twin sister of St. Benedict, founded Benedictine nuns",
        "patronOf": "Nuns, education, convulsive children",
        "dates": "c. 480-543",
        "origin": "Italy",
        "gender": "Female",
        "traits": [
            "teaching",
            "contemplation",
            "service",
            "leadership",
            "family"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Gregory the Great",
        "feastDay": "September 3",
        "knownFor": "Pope, Doctor of the Church, reformed liturgy, sent missionaries",
        "patronOf": "Musicians, teachers, popes",
        "dates": "c. 540-604",
        "origin": "Rome",
        "gender": "Male",
        "traits": [
            "intellectual",
            "teaching",
            "wisdom",
            "leadership",
            "reform"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Boniface",
        "feastDay": "June 5",
        "knownFor": "Apostle to the Germans, martyred while on mission",
        "patronOf": "Germany, brewers, tailors",
        "dates": "c. 675-754",
        "origin": "England/Germany",
        "gender": "Male",
        "traits": [
            "conviction",
            "missionary",
            "courage",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Nicholas",
        "feastDay": "December 6",
        "knownFor": "Bishop of Myra, known for generosity to the poor",
        "patronOf": "Children, sailors, merchants, Russia",
        "dates": "c. 270-343",
        "origin": "Turkey",
        "gender": "Male",
        "traits": [
            "service",
            "charity",
            "compassion",
            "generosity",
            "leadership"
        ],
        "quotes": [
            "What you do for the least of these, you do for me.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. George",
        "feastDay": "April 23",
        "knownFor": "Soldier and martyr, legendary dragon slayer",
        "patronOf": "England, soldiers, knights, skin diseases",
        "dates": "d. c. 303",
        "origin": "Turkey",
        "gender": "Male",
        "traits": [
            "courage",
            "strength",
            "warrior",
            "military"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Lucy",
        "feastDay": "December 13",
        "knownFor": "Virgin martyr, name means \"light\"",
        "patronOf": "Blind, eye disorders, writers",
        "dates": "d. 304",
        "origin": "Sicily",
        "gender": "Female",
        "traits": [
            "writing",
            "discipline",
            "courage",
            "community"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Sebastian",
        "feastDay": "January 20",
        "knownFor": "Roman soldier, martyred by arrows",
        "patronOf": "Athletes, soldiers, plague victims",
        "dates": "d. c. 288",
        "origin": "Rome",
        "gender": "Male",
        "traits": [
            "healing",
            "conviction",
            "courage",
            "strength",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Cecilia",
        "feastDay": "November 22",
        "knownFor": "Virgin martyr, sang to God during martyrdom",
        "patronOf": "Musicians, singers, poets",
        "dates": "d. c. 230",
        "origin": "Rome",
        "gender": "Female",
        "traits": [
            "courage",
            "arts",
            "music",
            "poetry"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Lawrence",
        "feastDay": "August 10",
        "knownFor": "Deacon martyred on a gridiron, gave Church treasures to poor",
        "patronOf": "Cooks, librarians, comedians",
        "dates": "d. 258",
        "origin": "Rome",
        "gender": "Male",
        "traits": [
            "service",
            "charity",
            "compassion",
            "generosity",
            "conviction"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "What you do for the least of these, you do for me."
        ]
    },
    {
        "name": "St. Stephen",
        "feastDay": "December 26",
        "knownFor": "First Christian martyr, deacon stoned to death",
        "patronOf": "Deacons, stonemasons, headaches",
        "dates": "d. c. 34",
        "origin": "Jerusalem",
        "gender": "Male",
        "traits": [
            "courage",
            "faith",
            "devotion",
            "perseverance",
            "love"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Dominic",
        "feastDay": "August 8",
        "knownFor": "Founder of Dominican Order, promoted the Rosary",
        "patronOf": "Astronomers, scientists, Dominican Republic",
        "dates": "1170-1221",
        "origin": "Spain",
        "gender": "Male",
        "traits": [
            "prayer",
            "discipline",
            "community"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Bernard of Clairvaux",
        "feastDay": "August 20",
        "knownFor": "Cistercian abbot, theologian, promoted Second Crusade",
        "patronOf": "Beekeepers, candle makers, Gibraltar",
        "dates": "1090-1153",
        "origin": "France",
        "gender": "Male",
        "traits": [
            "intellectual",
            "wisdom",
            "contemplation"
        ],
        "quotes": [
            "The truth will set you free.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Bonaventure",
        "feastDay": "July 15",
        "knownFor": "Franciscan theologian, Doctor of the Church, Cardinal",
        "patronOf": "Bowel disorders, theologians",
        "dates": "1221-1274",
        "origin": "Italy",
        "gender": "Male",
        "traits": [
            "intellectual",
            "wisdom",
            "leadership",
            "discipline",
            "poverty"
        ],
        "quotes": [
            "The truth will set you free.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Albertus Magnus",
        "feastDay": "November 15",
        "knownFor": "Dominican scientist, philosopher, teacher of Aquinas",
        "patronOf": "Scientists, philosophers, medical technicians",
        "dates": "c. 1200-1280",
        "origin": "Germany",
        "gender": "Male",
        "traits": [
            "intellectual",
            "teaching",
            "wisdom"
        ],
        "quotes": [
            "The truth will set you free.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Louis IX",
        "feastDay": "August 25",
        "knownFor": "King of France, led crusades, known for justice and charity",
        "patronOf": "France, tertiary Franciscans, barbers",
        "dates": "1214-1270",
        "origin": "France",
        "gender": "Male",
        "traits": [
            "service",
            "charity",
            "generosity",
            "leadership",
            "activism"
        ],
        "quotes": [
            "What you do for the least of these, you do for me.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Elizabeth of Hungary",
        "feastDay": "November 17",
        "knownFor": "Princess who gave wealth to poor, founded hospital",
        "patronOf": "Bakers, charities, homeless, nursing services",
        "dates": "1207-1231",
        "origin": "Hungary",
        "gender": "Female",
        "traits": [
            "service",
            "charity",
            "compassion",
            "healing",
            "generosity"
        ],
        "quotes": [
            "What you do for the least of these, you do for me.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Margaret of Scotland",
        "feastDay": "November 16",
        "knownFor": "Queen who reformed Scottish church, devoted to the poor",
        "patronOf": "Scotland, queens, large families",
        "dates": "c. 1045-1093",
        "origin": "Scotland",
        "gender": "Female",
        "traits": [
            "devotion",
            "service",
            "charity",
            "compassion",
            "generosity"
        ],
        "quotes": [
            "What you do for the least of these, you do for me.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Bridget of Sweden",
        "feastDay": "July 23",
        "knownFor": "Mystic, founded Bridgettine Order, received revelations",
        "patronOf": "Sweden, widows, pilgrims",
        "dates": "c. 1303-1373",
        "origin": "Sweden",
        "gender": "Female",
        "traits": [
            "contemplation",
            "mysticism",
            "service",
            "leadership",
            "discipline"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Catherine of Alexandria",
        "feastDay": "November 25",
        "knownFor": "Martyr, debated pagan philosophers, martyred on wheel",
        "patronOf": "Philosophers, students, wheel makers",
        "dates": "d. c. 305",
        "origin": "Egypt",
        "gender": "Female",
        "traits": [
            "intellectual",
            "teaching",
            "wisdom",
            "conviction",
            "courage"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "The truth will set you free."
        ]
    },
    {
        "name": "St. Christopher",
        "feastDay": "July 25",
        "knownFor": "Legendary giant who carried Christ child across river",
        "patronOf": "Travelers, drivers, bachelors",
        "dates": "3rd century",
        "origin": "Canaan",
        "gender": "Male",
        "traits": [
            "faith",
            "devotion",
            "perseverance",
            "love",
            "service"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Martin of Tours",
        "feastDay": "November 11",
        "knownFor": "Soldier who shared cloak with beggar, bishop",
        "patronOf": "Soldiers, France, equestrians",
        "dates": "c. 316-397",
        "origin": "France",
        "gender": "Male",
        "traits": [
            "leadership",
            "strength",
            "warrior",
            "military"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Ambrose",
        "feastDay": "December 7",
        "knownFor": "Bishop of Milan, Doctor of the Church, baptized Augustine",
        "patronOf": "Milan, beekeepers, learning",
        "dates": "c. 340-397",
        "origin": "Italy",
        "gender": "Male",
        "traits": [
            "intellectual",
            "wisdom",
            "leadership",
            "evangelization"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Jerome",
        "feastDay": "September 30",
        "knownFor": "Translated Bible into Latin (Vulgate), Doctor of the Church",
        "patronOf": "Librarians, translators, students",
        "dates": "c. 347-420",
        "origin": "Croatia/Palestine",
        "gender": "Male",
        "traits": [
            "intellectual",
            "teaching",
            "wisdom",
            "youth"
        ],
        "quotes": [
            "The truth will set you free.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Monica",
        "feastDay": "August 27",
        "knownFor": "Mother of St. Augustine, prayed for his conversion for years",
        "patronOf": "Mothers, widows, victims of abuse",
        "dates": "331-387",
        "origin": "North Africa",
        "gender": "Female",
        "traits": [
            "family",
            "motherhood",
            "transformation",
            "perseverance"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. John Chrysostom",
        "feastDay": "September 13",
        "knownFor": "Archbishop, greatest preacher, Doctor of the Church",
        "patronOf": "Preachers, Constantinople, epilepsy",
        "dates": "c. 347-407",
        "origin": "Syria/Turkey",
        "gender": "Male",
        "traits": [
            "intellectual",
            "wisdom",
            "leadership",
            "preaching"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Athanasius",
        "feastDay": "May 2",
        "knownFor": "Bishop, defended Trinity against Arianism, Doctor of the Church",
        "patronOf": "Theologians, Alexandria",
        "dates": "c. 296-373",
        "origin": "Egypt",
        "gender": "Male",
        "traits": [
            "intellectual",
            "wisdom",
            "leadership",
            "activism",
            "conviction"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Cyril and Methodius",
        "feastDay": "February 14",
        "knownFor": "Brothers who evangelized Slavs, created Cyrillic alphabet",
        "patronOf": "Europe, ecumenism, missionaries",
        "dates": "9th century",
        "origin": "Greece/Moravia",
        "gender": "Male",
        "traits": [
            "missionary",
            "evangelization",
            "faith",
            "devotion",
            "perseverance"
        ],
        "quotes": [
            "Go and make disciples of all nations.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. John Vianney",
        "feastDay": "August 4",
        "knownFor": "Curé of Ars, patron of parish priests, confessor",
        "patronOf": "Priests, confessors",
        "dates": "1786-1859",
        "origin": "France",
        "gender": "Male",
        "traits": [
            "intercession",
            "faith",
            "devotion",
            "perseverance",
            "love"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Bernadette",
        "feastDay": "April 16",
        "knownFor": "Saw visions of Mary at Lourdes, simple peasant girl",
        "patronOf": "Illness, poverty, shepherds",
        "dates": "1844-1879",
        "origin": "France",
        "gender": "Female",
        "traits": [
            "mysticism",
            "humility",
            "simplicity",
            "poverty"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. John Bosco",
        "feastDay": "January 31",
        "knownFor": "Founder of Salesians, educator of poor boys",
        "patronOf": "Youth, students, editors, apprentices",
        "dates": "1815-1888",
        "origin": "Italy",
        "gender": "Male",
        "traits": [
            "teaching",
            "service",
            "charity",
            "compassion",
            "generosity"
        ],
        "quotes": [
            "What you do for the least of these, you do for me.",
            "The truth will set you free."
        ]
    },
    {
        "name": "St. Vincent de Paul",
        "feastDay": "September 27",
        "knownFor": "Founded Vincentians and Daughters of Charity, served poor",
        "patronOf": "Charities, volunteers, hospitals",
        "dates": "1581-1660",
        "origin": "France",
        "gender": "Male",
        "traits": [
            "service",
            "charity",
            "compassion",
            "healing",
            "generosity"
        ],
        "quotes": [
            "What you do for the least of these, you do for me.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Louise de Marillac",
        "feastDay": "March 15",
        "knownFor": "Co-founder of Daughters of Charity with Vincent de Paul",
        "patronOf": "Social workers, widows, sick people",
        "dates": "1591-1660",
        "origin": "France",
        "gender": "Female",
        "traits": [
            "service",
            "charity",
            "compassion",
            "healing",
            "generosity"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Margaret Mary Alacoque",
        "feastDay": "October 16",
        "knownFor": "Promoted devotion to Sacred Heart of Jesus",
        "patronOf": "Devotees of Sacred Heart, polio",
        "dates": "1647-1690",
        "origin": "France",
        "gender": "Female",
        "traits": [
            "prayer",
            "devotion",
            "faith",
            "love"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. John of God",
        "feastDay": "March 8",
        "knownFor": "Founded hospital order, patron of nurses and sick",
        "patronOf": "Hospitals, nurses, sick people, heart patients",
        "dates": "1495-1550",
        "origin": "Portugal/Spain",
        "gender": "Male",
        "traits": [
            "service",
            "compassion",
            "healing",
            "leadership",
            "discipline"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Camillus de Lellis",
        "feastDay": "July 14",
        "knownFor": "Founded nursing order, reformed hospital care",
        "patronOf": "Nurses, hospitals, sick people",
        "dates": "1550-1614",
        "origin": "Italy",
        "gender": "Male",
        "traits": [
            "service",
            "compassion",
            "healing",
            "leadership",
            "reform"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Alphonsus Liguori",
        "feastDay": "August 1",
        "knownFor": "Founded Redemptorists, moral theologian, Doctor of the Church",
        "patronOf": "Confessors, moral theologians, arthritis",
        "dates": "1696-1787",
        "origin": "Italy",
        "gender": "Male",
        "traits": [
            "intellectual",
            "wisdom",
            "service",
            "leadership",
            "community"
        ],
        "quotes": [
            "The truth will set you free.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. John Neumann",
        "feastDay": "January 5",
        "knownFor": "Bishop of Philadelphia, built schools and churches",
        "patronOf": "Catholic education, immigrants",
        "dates": "1811-1860",
        "origin": "USA",
        "gender": "Male",
        "traits": [
            "teaching",
            "leadership",
            "faith",
            "devotion",
            "perseverance"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Frances Xavier Cabrini",
        "feastDay": "November 13",
        "knownFor": "Founded Missionary Sisters, first US citizen saint",
        "patronOf": "Immigrants, hospital administrators",
        "dates": "1850-1917",
        "origin": "Italy/USA",
        "gender": "Female",
        "traits": [
            "service",
            "healing",
            "leadership",
            "missionary",
            "community"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Elizabeth Ann Seton",
        "feastDay": "January 4",
        "knownFor": "Founded Sisters of Charity, first native-born US saint",
        "patronOf": "Catholic schools, widows, seafarers",
        "dates": "1774-1821",
        "origin": "USA",
        "gender": "Female",
        "traits": [
            "teaching",
            "service",
            "charity",
            "generosity",
            "leadership"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Katharine Drexel",
        "feastDay": "March 3",
        "knownFor": "Founded Sisters of Blessed Sacrament, served Native Americans",
        "patronOf": "Racial justice, philanthropists",
        "dates": "1858-1955",
        "origin": "USA",
        "gender": "Female",
        "traits": [
            "service",
            "compassion",
            "leadership",
            "community",
            "justice"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Damien of Molokai",
        "feastDay": "May 10",
        "knownFor": "Served lepers in Hawaii, contracted leprosy himself",
        "patronOf": "Lepers, outcasts, HIV/AIDS patients",
        "dates": "1840-1889",
        "origin": "Belgium/Hawaii",
        "gender": "Male",
        "traits": [
            "service",
            "compassion",
            "healing",
            "patience"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Teresa of Calcutta",
        "feastDay": "September 5",
        "knownFor": "Founded Missionaries of Charity, served poorest of poor",
        "patronOf": "World Youth Day, Calcutta",
        "dates": "1910-1997",
        "origin": "Albania/India",
        "gender": "Female",
        "traits": [
            "service",
            "charity",
            "compassion",
            "generosity",
            "leadership"
        ],
        "quotes": [
            "What you do for the least of these, you do for me.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Maximilian Kolbe",
        "feastDay": "August 14",
        "knownFor": "Franciscan martyred in Auschwitz, gave life for another",
        "patronOf": "Drug addicts, journalists, prisoners",
        "dates": "1894-1941",
        "origin": "Poland",
        "gender": "Male",
        "traits": [
            "charity",
            "generosity",
            "conviction",
            "courage",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Edith Stein",
        "feastDay": "August 9",
        "knownFor": "Jewish philosopher who converted, Carmelite nun, died in Auschwitz",
        "patronOf": "Europe, loss of parents, martyrs",
        "dates": "1891-1942",
        "origin": "Germany",
        "gender": "Female",
        "traits": [
            "intellectual",
            "wisdom",
            "contemplation",
            "evangelization",
            "courage"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. John Paul II",
        "feastDay": "October 22",
        "knownFor": "Pope for 27 years, World Youth Days, helped end communism",
        "patronOf": "World Youth Day, families, Poland",
        "dates": "1920-2005",
        "origin": "Poland",
        "gender": "Male",
        "traits": [
            "service",
            "leadership",
            "children",
            "youth",
            "perseverance"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Padre Pio",
        "feastDay": "September 23",
        "knownFor": "Capuchin friar with stigmata, gift of healing and bilocation",
        "patronOf": "Civil defense volunteers, stress relief",
        "dates": "1887-1968",
        "origin": "Italy",
        "gender": "Male",
        "traits": [
            "mysticism",
            "healing",
            "faith",
            "devotion",
            "perseverance"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Faustina Kowalska",
        "feastDay": "October 5",
        "knownFor": "Promoted Divine Mercy devotion through visions of Jesus",
        "patronOf": "Mercy, World Mercy Sunday",
        "dates": "1905-1938",
        "origin": "Poland",
        "gender": "Female",
        "traits": [
            "mysticism",
            "prayer",
            "devotion",
            "faith",
            "forgiveness"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Josemaría Escrivá",
        "feastDay": "June 26",
        "knownFor": "Founded Opus Dei, promoted sanctification in ordinary life",
        "patronOf": "Diabetes patients, work",
        "dates": "1902-1975",
        "origin": "Spain",
        "gender": "Male",
        "traits": [
            "service",
            "leadership",
            "simplicity",
            "patience",
            "community"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Gianna Molla",
        "feastDay": "April 28",
        "knownFor": "Doctor who chose baby's life over her own",
        "patronOf": "Mothers, physicians, unborn children",
        "dates": "1922-1962",
        "origin": "Italy",
        "gender": "Female",
        "traits": [
            "wisdom",
            "healing",
            "family",
            "motherhood",
            "nurturing"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Teresa Benedicta",
        "feastDay": "August 9",
        "knownFor": "Carmelite philosopher, Jewish convert, martyred at Auschwitz",
        "patronOf": "Europe, loss of parents",
        "dates": "1891-1942",
        "origin": "Germany",
        "gender": "Female",
        "traits": [
            "intellectual",
            "wisdom",
            "conviction",
            "courage",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Rose of Lima",
        "feastDay": "August 23",
        "knownFor": "First saint of Americas, mystic, practiced severe penance",
        "patronOf": "Latin America, florists, gardeners",
        "dates": "1586-1617",
        "origin": "Peru",
        "gender": "Female",
        "traits": [
            "contemplation",
            "mysticism",
            "cross-cultural",
            "nature"
        ],
        "quotes": [
            "Prayer is the raising of one's mind and heart to God.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Martin de Porres",
        "feastDay": "November 3",
        "knownFor": "Dominican lay brother, biracial, healer of sick and animals",
        "patronOf": "Barbers, innkeepers, public health, racial harmony",
        "dates": "1579-1639",
        "origin": "Peru",
        "gender": "Male",
        "traits": [
            "service",
            "compassion",
            "healing",
            "nature",
            "animals"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Juan Diego",
        "feastDay": "December 9",
        "knownFor": "Saw vision of Our Lady of Guadalupe, simple indigenous man",
        "patronOf": "Indigenous peoples, Mexico",
        "dates": "1474-1548",
        "origin": "Mexico",
        "gender": "Male",
        "traits": [
            "humility",
            "simplicity",
            "faith",
            "devotion",
            "perseverance"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Kateri Tekakwitha",
        "feastDay": "July 14",
        "knownFor": "First Native American saint, converted despite persecution",
        "patronOf": "Ecology, Native Americans, exiles",
        "dates": "1656-1680",
        "origin": "USA/Canada",
        "gender": "Female",
        "traits": [
            "evangelization",
            "transformation",
            "perseverance",
            "nature"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Augustine of Canterbury",
        "feastDay": "May 27",
        "knownFor": "First Archbishop of Canterbury, brought Christianity to England",
        "patronOf": "England, bishops",
        "dates": "d. c. 604",
        "origin": "Italy/England",
        "gender": "Male",
        "traits": [
            "leadership",
            "missionary",
            "evangelization"
        ],
        "quotes": [
            "Go and make disciples of all nations.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Columba",
        "feastDay": "June 9",
        "knownFor": "Irish missionary who evangelized Scotland",
        "patronOf": "Scotland, Ireland, poets",
        "dates": "521-597",
        "origin": "Ireland/Scotland",
        "gender": "Male",
        "traits": [
            "missionary",
            "evangelization",
            "arts",
            "poetry"
        ],
        "quotes": [
            "Go and make disciples of all nations.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Hilda of Whitby",
        "feastDay": "November 17",
        "knownFor": "Abbess, hosted important church synod at Whitby",
        "patronOf": "Learning, culture, Whitby",
        "dates": "614-680",
        "origin": "England",
        "gender": "Female",
        "traits": [
            "intellectual",
            "contemplation",
            "faith",
            "devotion",
            "perseverance"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Bede the Venerable",
        "feastDay": "May 25",
        "knownFor": "Monk, scholar, wrote history of English church",
        "patronOf": "Historians, scholars, England",
        "dates": "c. 673-735",
        "origin": "England",
        "gender": "Male",
        "traits": [
            "intellectual",
            "writing",
            "contemplation",
            "poetry"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Ansgar",
        "feastDay": "February 3",
        "knownFor": "Apostle of the North, missionary to Scandinavia",
        "patronOf": "Denmark, Scandinavia",
        "dates": "801-865",
        "origin": "France/Scandinavia",
        "gender": "Male",
        "traits": [
            "missionary",
            "faith",
            "devotion",
            "perseverance",
            "love"
        ],
        "quotes": [
            "Go and make disciples of all nations.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Olaf",
        "feastDay": "July 29",
        "knownFor": "King of Norway, promoted Christianity in Norway",
        "patronOf": "Norway, kings",
        "dates": "995-1030",
        "origin": "Norway",
        "gender": "Male",
        "traits": [
            "leadership",
            "evangelization",
            "faith",
            "devotion",
            "perseverance"
        ],
        "quotes": [
            "Go and make disciples of all nations.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Stanislaus",
        "feastDay": "April 11",
        "knownFor": "Bishop martyred by King of Poland for defending Church",
        "patronOf": "Poland, Krakow",
        "dates": "1030-1079",
        "origin": "Poland",
        "gender": "Male",
        "traits": [
            "leadership",
            "conviction",
            "courage",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Wenceslaus",
        "feastDay": "September 28",
        "knownFor": "Duke of Bohemia, martyred by brother",
        "patronOf": "Czech Republic, Bohemia, brewers",
        "dates": "c. 907-935",
        "origin": "Czech Republic",
        "gender": "Male",
        "traits": [
            "conviction",
            "courage",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Vladimir",
        "feastDay": "July 15",
        "knownFor": "Prince who brought Christianity to Kievan Rus",
        "patronOf": "Russia, Ukraine, converts",
        "dates": "c. 958-1015",
        "origin": "Ukraine/Russia",
        "gender": "Male",
        "traits": [
            "leadership",
            "missionary",
            "evangelization"
        ],
        "quotes": [
            "Go and make disciples of all nations.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Casimir",
        "feastDay": "March 4",
        "knownFor": "Polish prince known for chastity and devotion",
        "patronOf": "Poland, Lithuania, youth",
        "dates": "1458-1484",
        "origin": "Poland",
        "gender": "Male",
        "traits": [
            "prayer",
            "devotion",
            "leadership",
            "faith",
            "children"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Rose Philippine Duchesne",
        "feastDay": "November 18",
        "knownFor": "Missionary to America, educated Native Americans",
        "patronOf": "Against poverty, opposition of Church authorities",
        "dates": "1769-1852",
        "origin": "France/USA",
        "gender": "Female",
        "traits": [
            "writing",
            "missionary",
            "poverty",
            "nurturing"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. John de Brébeuf",
        "feastDay": "October 19",
        "knownFor": "Jesuit martyred by Iroquois in Canada",
        "patronOf": "Canada, North American martyrs",
        "dates": "1593-1649",
        "origin": "France/Canada",
        "gender": "Male",
        "traits": [
            "conviction",
            "courage",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Isaac Jogues",
        "feastDay": "October 19",
        "knownFor": "Jesuit missionary martyred in New York",
        "patronOf": "Americas, North American martyrs",
        "dates": "1607-1646",
        "origin": "France/USA",
        "gender": "Male",
        "traits": [
            "conviction",
            "missionary",
            "cross-cultural",
            "courage",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Go and make disciples of all nations."
        ]
    },
    {
        "name": "St. Andrew Kim Taegon",
        "feastDay": "September 20",
        "knownFor": "First Korean priest, martyred",
        "patronOf": "Korea, Korean clergy",
        "dates": "1821-1846",
        "origin": "Korea",
        "gender": "Male",
        "traits": [
            "conviction",
            "courage",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Paul Miki",
        "feastDay": "February 6",
        "knownFor": "Japanese Jesuit, one of 26 martyrs of Japan",
        "patronOf": "Japan, Japanese martyrs",
        "dates": "c. 1564-1597",
        "origin": "Japan",
        "gender": "Male",
        "traits": [
            "cross-cultural",
            "courage",
            "faith",
            "devotion",
            "perseverance"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Lorenzo Ruiz",
        "feastDay": "September 28",
        "knownFor": "Filipino martyr, first Filipino saint",
        "patronOf": "Philippines, Filipino youth, altar servers",
        "dates": "c. 1600-1637",
        "origin": "Philippines",
        "gender": "Male",
        "traits": [
            "courage",
            "children",
            "youth"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Peter Chanel",
        "feastDay": "April 28",
        "knownFor": "Marist missionary martyred in Oceania",
        "patronOf": "Oceania, Marist priests",
        "dates": "1803-1841",
        "origin": "France/Oceania",
        "gender": "Male",
        "traits": [
            "conviction",
            "missionary",
            "courage",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Go and make disciples of all nations."
        ]
    },
    {
        "name": "St. Charles Lwanga",
        "feastDay": "June 3",
        "knownFor": "Ugandan martyr, leader of group killed for faith",
        "patronOf": "African youth, converts",
        "dates": "c. 1860-1886",
        "origin": "Uganda",
        "gender": "Male",
        "traits": [
            "leadership",
            "activism",
            "cross-cultural",
            "courage",
            "faith"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Josephine Bakhita",
        "feastDay": "February 8",
        "knownFor": "Former slave from Sudan, became nun in Italy",
        "patronOf": "Sudan, human trafficking victims",
        "dates": "c. 1869-1947",
        "origin": "Sudan/Italy",
        "gender": "Female",
        "traits": [
            "contemplation",
            "leadership",
            "faith",
            "devotion",
            "perseverance"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. John XXIII",
        "feastDay": "October 11",
        "knownFor": "Pope who called Vatican Council II, known for pastoral care",
        "patronOf": "Papal delegates, Venice",
        "dates": "1881-1963",
        "origin": "Italy",
        "gender": "Male",
        "traits": [
            "leadership",
            "reform",
            "activism"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Oscar Romero",
        "feastDay": "March 24",
        "knownFor": "Archbishop martyred for defending poor in El Salvador",
        "patronOf": "Americas, El Salvador, persecuted Christians",
        "dates": "1917-1980",
        "origin": "El Salvador",
        "gender": "Male",
        "traits": [
            "service",
            "charity",
            "compassion",
            "generosity",
            "leadership"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "What you do for the least of these, you do for me."
        ]
    },
    {
        "name": "St. Thomas More",
        "feastDay": "June 22",
        "knownFor": "Lord Chancellor of England, martyred for refusing oath",
        "patronOf": "Lawyers, politicians, statesmen, adopted children",
        "dates": "1478-1535",
        "origin": "England",
        "gender": "Male",
        "traits": [
            "conviction",
            "courage",
            "sacrifice",
            "family",
            "nurturing"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. John Fisher",
        "feastDay": "June 22",
        "knownFor": "Bishop martyred with Thomas More for opposing Henry VIII",
        "patronOf": "Bishops, theologians, priests",
        "dates": "1469-1535",
        "origin": "England",
        "gender": "Male",
        "traits": [
            "intellectual",
            "wisdom",
            "leadership",
            "conviction",
            "courage"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Edmund Campion",
        "feastDay": "December 1",
        "knownFor": "Jesuit priest martyred in England during persecution",
        "patronOf": "England, Jesuits, scholars",
        "dates": "1540-1581",
        "origin": "England",
        "gender": "Male",
        "traits": [
            "intellectual",
            "conviction",
            "courage",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Margaret Clitherow",
        "feastDay": "March 25",
        "knownFor": "Laywoman martyred for hiding priests in England",
        "patronOf": "Converts, businesswomen, martyrs",
        "dates": "1556-1586",
        "origin": "England",
        "gender": "Female",
        "traits": [
            "conviction",
            "courage",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Oliver Plunkett",
        "feastDay": "July 1",
        "knownFor": "Archbishop martyred in Ireland during persecution",
        "patronOf": "Ireland, peace, reconciliation",
        "dates": "1625-1681",
        "origin": "Ireland",
        "gender": "Male",
        "traits": [
            "leadership",
            "conviction",
            "courage",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Brigid of Ireland",
        "feastDay": "February 1",
        "knownFor": "Founded monasteries, one of patron saints of Ireland",
        "patronOf": "Ireland, dairymaids, midwives, scholars",
        "dates": "c. 451-525",
        "origin": "Ireland",
        "gender": "Female",
        "traits": [
            "intellectual",
            "service",
            "leadership",
            "community",
            "intercession"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Brendan the Navigator",
        "feastDay": "May 16",
        "knownFor": "Irish monk who voyaged across Atlantic",
        "patronOf": "Sailors, travelers, whales",
        "dates": "c. 484-577",
        "origin": "Ireland",
        "gender": "Male",
        "traits": [
            "contemplation",
            "adventure",
            "faith",
            "devotion",
            "perseverance"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Kevin",
        "feastDay": "June 3",
        "knownFor": "Founded monastery at Glendalough, Ireland",
        "patronOf": "Dublin, blackbirds",
        "dates": "d. 618",
        "origin": "Ireland",
        "gender": "Male",
        "traits": [
            "contemplation",
            "service",
            "leadership",
            "community",
            "animals"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Malachy",
        "feastDay": "November 3",
        "knownFor": "Archbishop of Armagh, reformed Irish Church",
        "patronOf": "Ireland, peace",
        "dates": "1094-1148",
        "origin": "Ireland",
        "gender": "Male",
        "traits": [
            "leadership",
            "reform",
            "faith",
            "devotion",
            "perseverance"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. David",
        "feastDay": "March 1",
        "knownFor": "Patron saint of Wales, founded monasteries",
        "patronOf": "Wales, poets",
        "dates": "c. 500-589",
        "origin": "Wales",
        "gender": "Male",
        "traits": [
            "service",
            "leadership",
            "community",
            "arts",
            "poetry"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Andrew",
        "feastDay": "November 30",
        "knownFor": "Apostle, brother of Peter, martyred on X-shaped cross",
        "patronOf": "Scotland, Russia, fishermen",
        "dates": "1st century",
        "origin": "Galilee",
        "gender": "Male",
        "traits": [
            "conviction",
            "missionary",
            "courage",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. James the Greater",
        "feastDay": "July 25",
        "knownFor": "Apostle, first to be martyred, shrine at Compostela",
        "patronOf": "Spain, pilgrims, laborers",
        "dates": "d. 44 AD",
        "origin": "Galilee/Spain",
        "gender": "Male",
        "traits": [
            "conviction",
            "missionary",
            "courage",
            "sacrifice",
            "work"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. John the Apostle",
        "feastDay": "December 27",
        "knownFor": "Beloved disciple, wrote Gospel and Revelation",
        "patronOf": "Writers, theologians, Asia Minor",
        "dates": "d. c. 100",
        "origin": "Galilee",
        "gender": "Male",
        "traits": [
            "intellectual",
            "writing",
            "wisdom",
            "cross-cultural",
            "preaching"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Thomas the Apostle",
        "feastDay": "July 3",
        "knownFor": "Apostle who doubted, brought Christianity to India",
        "patronOf": "India, architects, doubt",
        "dates": "1st century",
        "origin": "Galilee/India",
        "gender": "Male",
        "traits": [
            "missionary",
            "cross-cultural",
            "evangelization"
        ],
        "quotes": [
            "Go and make disciples of all nations.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Matthew",
        "feastDay": "September 21",
        "knownFor": "Apostle, tax collector, wrote Gospel",
        "patronOf": "Tax collectors, accountants, bankers",
        "dates": "1st century",
        "origin": "Galilee",
        "gender": "Male",
        "traits": [
            "intellectual",
            "writing",
            "missionary",
            "preaching",
            "poetry"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Mark the Evangelist",
        "feastDay": "April 25",
        "knownFor": "Wrote Gospel of Mark, companion of Peter",
        "patronOf": "Venice, notaries, lawyers",
        "dates": "1st century",
        "origin": "Jerusalem/Egypt",
        "gender": "Male",
        "traits": [
            "intellectual",
            "writing",
            "preaching",
            "poetry",
            "justice"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Luke the Evangelist",
        "feastDay": "October 18",
        "knownFor": "Wrote Gospel and Acts, physician",
        "patronOf": "Doctors, artists, surgeons, butchers",
        "dates": "1st century",
        "origin": "Syria",
        "gender": "Male",
        "traits": [
            "intellectual",
            "writing",
            "wisdom",
            "preaching",
            "arts"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Barnabas",
        "feastDay": "June 11",
        "knownFor": "Apostle, companion of Paul, sold property for Church",
        "patronOf": "Cyprus, against hailstorms",
        "dates": "1st century",
        "origin": "Cyprus",
        "gender": "Male",
        "traits": [
            "missionary",
            "faith",
            "devotion",
            "perseverance",
            "love"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Timothy",
        "feastDay": "January 26",
        "knownFor": "Bishop, disciple of Paul, received epistles",
        "patronOf": "Stomach disorders, bishops",
        "dates": "1st century",
        "origin": "Asia Minor",
        "gender": "Male",
        "traits": [
            "writing",
            "leadership",
            "discipline",
            "community"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Titus",
        "feastDay": "January 26",
        "knownFor": "Bishop of Crete, companion of Paul",
        "patronOf": "Crete, bishops",
        "dates": "1st century",
        "origin": "Crete",
        "gender": "Male",
        "traits": [
            "leadership",
            "faith",
            "devotion",
            "perseverance",
            "love"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Apollonia",
        "feastDay": "February 9",
        "knownFor": "Virgin martyr, teeth pulled out during persecution",
        "patronOf": "Dentists, toothache",
        "dates": "d. 249",
        "origin": "Egypt",
        "gender": "Female",
        "traits": [
            "leadership",
            "activism",
            "courage"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Blaise",
        "feastDay": "February 3",
        "knownFor": "Bishop, healed boy choking on fishbone",
        "patronOf": "Throat illnesses, animals, wool combers",
        "dates": "d. c. 316",
        "origin": "Armenia",
        "gender": "Male",
        "traits": [
            "healing",
            "leadership",
            "activism",
            "nature",
            "animals"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Agatha",
        "feastDay": "February 5",
        "knownFor": "Virgin martyr, breasts cut off during torture",
        "patronOf": "Breast cancer, nurses, bellfounders",
        "dates": "d. c. 251",
        "origin": "Sicily",
        "gender": "Female",
        "traits": [
            "healing",
            "courage",
            "faith",
            "devotion",
            "perseverance"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Agnes",
        "feastDay": "January 21",
        "knownFor": "Virgin martyr at age 12 or 13",
        "patronOf": "Young girls, chastity, gardeners",
        "dates": "d. c. 304",
        "origin": "Rome",
        "gender": "Female",
        "traits": [
            "courage",
            "children",
            "youth",
            "nature"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Barbara",
        "feastDay": "December 4",
        "knownFor": "Virgin martyr, killed by father for converting",
        "patronOf": "Miners, artillerymen, architects, sudden death",
        "dates": "d. c. 200",
        "origin": "Lebanon/Egypt",
        "gender": "Female",
        "traits": [
            "leadership",
            "activism",
            "courage",
            "family"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Christopher",
        "feastDay": "July 25",
        "knownFor": "Carried Christ child, martyred",
        "patronOf": "Travelers, motorists, storms",
        "dates": "3rd century",
        "origin": "Canaan",
        "gender": "Male",
        "traits": [
            "conviction",
            "courage",
            "sacrifice"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Valentine",
        "feastDay": "February 14",
        "knownFor": "Priest who married couples secretly, martyred",
        "patronOf": "Lovers, epilepsy, beekeepers",
        "dates": "d. c. 269",
        "origin": "Rome",
        "gender": "Male",
        "traits": [
            "conviction",
            "courage",
            "sacrifice",
            "love"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Jude Thaddeus",
        "feastDay": "October 28",
        "knownFor": "Apostle, patron of hopeless cases",
        "patronOf": "Desperate situations, lost causes, hospitals",
        "dates": "1st century",
        "origin": "Galilee",
        "gender": "Male",
        "traits": [
            "service",
            "healing",
            "missionary",
            "hope",
            "intercession"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Rita of Cascia",
        "feastDay": "May 22",
        "knownFor": "Widow, nun, received stigmata wound on forehead",
        "patronOf": "Impossible causes, abuse victims, loneliness",
        "dates": "1381-1457",
        "origin": "Italy",
        "gender": "Female",
        "traits": [
            "contemplation",
            "mysticism",
            "hope"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Peregrine Laziosi",
        "feastDay": "May 1",
        "knownFor": "Healed of cancer miraculously",
        "patronOf": "Cancer patients, AIDS patients",
        "dates": "1260-1345",
        "origin": "Italy",
        "gender": "Male",
        "traits": [
            "healing",
            "leadership",
            "activism",
            "patience",
            "miracles"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Dymphna",
        "feastDay": "May 15",
        "knownFor": "Irish princess martyred by father, patron of mental illness",
        "patronOf": "Mental illness, anxiety, epilepsy",
        "dates": "7th century",
        "origin": "Ireland/Belgium",
        "gender": "Female",
        "traits": [
            "leadership",
            "conviction",
            "courage",
            "sacrifice",
            "family"
        ],
        "quotes": [
            "For to me, to live is Christ and to die is gain.",
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Roch",
        "feastDay": "August 16",
        "knownFor": "Cared for plague victims, contracted plague himself",
        "patronOf": "Dogs, plague, epidemics",
        "dates": "c. 1348-1376",
        "origin": "France",
        "gender": "Male",
        "traits": [
            "compassion",
            "healing",
            "nurturing",
            "animals"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Raphael the Archangel",
        "feastDay": "September 29",
        "knownFor": "Healing angel in Book of Tobit",
        "patronOf": "Travelers, blind, nurses, physicians",
        "dates": "Biblical",
        "origin": "Heaven",
        "gender": "Male",
        "traits": [
            "healing",
            "faith",
            "devotion",
            "perseverance",
            "love"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Michael the Archangel",
        "feastDay": "September 29",
        "knownFor": "Warrior angel who defeated Satan",
        "patronOf": "Police, soldiers, paratroopers, Germany",
        "dates": "Biblical",
        "origin": "Heaven",
        "gender": "Male",
        "traits": [
            "strength",
            "warrior",
            "military",
            "spiritual-warfare"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Gabriel the Archangel",
        "feastDay": "September 29",
        "knownFor": "Angel of Annunciation to Mary",
        "patronOf": "Messengers, postal workers, telecommunications",
        "dates": "Biblical",
        "origin": "Heaven",
        "gender": "Male",
        "traits": [
            "contemplation",
            "work",
            "faith",
            "devotion",
            "perseverance"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Guardian Angels",
        "feastDay": "October 2",
        "knownFor": "Angels assigned to protect each person",
        "patronOf": "Personal protection, safety",
        "dates": "Biblical",
        "origin": "Heaven",
        "gender": "Male",
        "traits": [
            "protection",
            "faith",
            "devotion",
            "perseverance",
            "love"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Anne",
        "feastDay": "July 26",
        "knownFor": "Mother of Virgin Mary, grandmother of Jesus",
        "patronOf": "Grandmothers, mothers, pregnant women, miners",
        "dates": "1st century BC",
        "origin": "Galilee",
        "gender": "Female",
        "traits": [
            "family",
            "motherhood",
            "faith",
            "devotion",
            "perseverance"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Joachim",
        "feastDay": "July 26",
        "knownFor": "Father of Virgin Mary, grandfather of Jesus",
        "patronOf": "Grandfathers, fathers, cabinet makers",
        "dates": "1st century BC",
        "origin": "Galilee",
        "gender": "Female",
        "traits": [
            "family",
            "faith",
            "devotion",
            "perseverance",
            "love"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Elizabeth (mother of John Baptist)",
        "feastDay": "November 5",
        "knownFor": "Mother of John the Baptist, cousin of Mary",
        "patronOf": "Expectant mothers, pregnancy",
        "dates": "1st century",
        "origin": "Judea",
        "gender": "Female",
        "traits": [
            "family",
            "motherhood",
            "faith",
            "devotion",
            "perseverance"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. John the Baptist",
        "feastDay": "June 24",
        "knownFor": "Forerunner of Christ, baptized Jesus",
        "patronOf": "Baptism, tailors, farriers",
        "dates": "d. c. 30 AD",
        "origin": "Judea",
        "gender": "Male",
        "traits": [
            "evangelization",
            "faith",
            "devotion",
            "perseverance",
            "love"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Joseph of Arimathea",
        "feastDay": "March 17",
        "knownFor": "Donated tomb for Jesus, buried Jesus",
        "patronOf": "Funeral directors, pallbearers",
        "dates": "1st century",
        "origin": "Judea",
        "gender": "Male",
        "traits": [
            "generosity",
            "faith",
            "devotion",
            "perseverance",
            "love"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Dismas",
        "feastDay": "March 25",
        "knownFor": "Good thief crucified with Jesus",
        "patronOf": "Prisoners, thieves, funeral directors, death row",
        "dates": "1st century",
        "origin": "Judea",
        "gender": "Male",
        "traits": [
            "faith",
            "devotion",
            "perseverance",
            "love",
            "service"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Longinus",
        "feastDay": "March 15",
        "knownFor": "Roman soldier who pierced Jesus' side",
        "patronOf": "Soldiers, cavalry, Mantua",
        "dates": "1st century",
        "origin": "Rome",
        "gender": "Male",
        "traits": [
            "strength",
            "warrior",
            "military"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    },
    {
        "name": "St. Veronica",
        "feastDay": "July 12",
        "knownFor": "Wiped Jesus' face on way to Calvary",
        "patronOf": "Photographers, laundry workers",
        "dates": "1st century",
        "origin": "Jerusalem",
        "gender": "Female",
        "traits": [
            "work",
            "faith",
            "devotion",
            "perseverance",
            "love"
        ],
        "quotes": [
            "Lord, make me an instrument of your peace.",
            "All for the greater glory of God."
        ]
    }
];

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
