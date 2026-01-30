// Complete Saints Database from Catholic_Saints_Comprehensive.xlsx
const saintsDatabase = [
    {
        name: "St. Peter",
        feastDay: "June 29",
        knownFor: "First Pope, leader of the apostles, martyred in Rome",
        patronOf: "Fishermen, popes, net makers",
        dates: "d. c. 64 AD",
        origin: "Galilee/Rome",
        gender: "Male",
        traits: ["leadership", "faith", "courage", "perseverance", "humility"]
    },
    {
        name: "St. Paul",
        feastDay: "June 29",
        knownFor: "Apostle to the Gentiles, wrote much of the New Testament",
        patronOf: "Missionaries, writers, tentmakers",
        dates: "d. c. 67 AD",
        origin: "Tarsus/Rome",
        gender: "Male",
        traits: ["intellectual", "missionary", "writing", "transformation", "courage"]
    },
    {
        name: "St. Mary Magdalene",
        feastDay: "July 22",
        knownFor: "First witness to the Resurrection, devoted follower of Jesus",
        patronOf: "Penitent sinners, women, pharmacists",
        dates: "1st century",
        origin: "Magdala",
        gender: "Female",
        traits: ["devotion", "transformation", "faith", "perseverance", "love"]
    },
    {
        name: "St. Joseph",
        feastDay: "March 19",
        knownFor: "Foster father of Jesus, husband of Mary, patron of workers",
        patronOf: "Workers, fathers, dying, carpenters",
        dates: "1st century",
        origin: "Nazareth",
        gender: "Male",
        traits: ["humility", "service", "family", "work", "protection"]
    },
    {
        name: "St. Francis of Assisi",
        feastDay: "October 4",
        knownFor: "Founder of Franciscans, loved nature and animals, embraced poverty",
        patronOf: "Animals, environment, merchants, Italy",
        dates: "1181-1226",
        origin: "Italy",
        gender: "Male",
        traits: ["nature", "simplicity", "poverty", "peace", "animals"]
    },
    {
        name: "St. Clare of Assisi",
        feastDay: "August 11",
        knownFor: "Founder of Poor Clares, follower of St. Francis",
        patronOf: "Television, eye disease, good weather",
        dates: "1194-1253",
        origin: "Italy",
        gender: "Female",
        traits: ["contemplation", "poverty", "faith", "perseverance", "devotion"]
    },
    {
        name: "St. Anthony of Padua",
        feastDay: "June 13",
        knownFor: "Franciscan preacher, known for miracles and finding lost items",
        patronOf: "Lost items, poor people, travelers",
        dates: "1195-1231",
        origin: "Portugal/Italy",
        gender: "Male",
        traits: ["preaching", "miracles", "service", "intellectual", "compassion"]
    },
    {
        name: "St. Thomas Aquinas",
        feastDay: "January 28",
        knownFor: "Dominican theologian, philosopher, wrote Summa Theologica",
        patronOf: "Students, scholars, universities",
        dates: "1225-1274",
        origin: "Italy",
        gender: "Male",
        traits: ["intellectual", "contemplation", "teaching", "writing", "wisdom"]
    },
    {
        name: "St. Catherine of Siena",
        feastDay: "April 29",
        knownFor: "Doctor of the Church, mystic, influenced papal return to Rome",
        patronOf: "Europe, fire prevention, nurses",
        dates: "1347-1380",
        origin: "Italy",
        gender: "Female",
        traits: ["mysticism", "leadership", "courage", "activism", "contemplation"]
    },
    {
        name: "St. Joan of Arc",
        feastDay: "May 30",
        knownFor: "Led French army to victory, martyred at 19",
        patronOf: "France, soldiers, prisoners",
        dates: "1412-1431",
        origin: "France",
        gender: "Female",
        traits: ["courage", "leadership", "faith", "perseverance", "conviction"]
    },
    {
        name: "St. Teresa of Avila",
        feastDay: "October 15",
        knownFor: "Carmelite reformer, mystic, Doctor of the Church",
        patronOf: "Headache sufferers, Spain, lace makers",
        dates: "1515-1582",
        origin: "Spain",
        gender: "Female",
        traits: ["mysticism", "contemplation", "reform", "writing", "perseverance"]
    },
    {
        name: "St. Ignatius of Loyola",
        feastDay: "July 31",
        knownFor: "Founder of the Jesuits, wrote Spiritual Exercises",
        patronOf: "Soldiers, educators, retreats",
        dates: "1491-1556",
        origin: "Spain",
        gender: "Male",
        traits: ["leadership", "education", "transformation", "discipline", "service"]
    },
    {
        name: "St. Francis Xavier",
        feastDay: "December 3",
        knownFor: "Jesuit missionary to Asia, brought Christianity to India and Japan",
        patronOf: "Missionaries, navigators, foreign missions",
        dates: "1506-1552",
        origin: "Spain/Asia",
        gender: "Male",
        traits: ["missionary", "adventure", "courage", "perseverance", "cross-cultural"]
    },
    {
        name: "St. John of the Cross",
        feastDay: "December 14",
        knownFor: "Carmelite mystic, poet, wrote Dark Night of the Soul",
        patronOf: "Poets, mystics, contemplatives",
        dates: "1542-1591",
        origin: "Spain",
        gender: "Male",
        traits: ["mysticism", "contemplation", "poetry", "perseverance", "wisdom"]
    },
    {
        name: "St. Therese of Lisieux",
        feastDay: "October 1",
        knownFor: "Carmelite nun, 'Little Flower,' taught the Little Way",
        patronOf: "Missionaries, florists, tuberculosis",
        dates: "1873-1897",
        origin: "France",
        gender: "Female",
        traits: ["simplicity", "love", "humility", "faith", "joy"]
    },
    {
        name: "St. Patrick",
        feastDay: "March 17",
        knownFor: "Missionary to Ireland, used shamrock to explain Trinity",
        patronOf: "Ireland, engineers, excluded people",
        dates: "c. 385-461",
        origin: "Britain/Ireland",
        gender: "Male",
        traits: ["missionary", "perseverance", "teaching", "evangelization", "forgiveness"]
    },
    {
        name: "St. Augustine of Hippo",
        feastDay: "August 28",
        knownFor: "Bishop, philosopher, wrote Confessions and City of God",
        patronOf: "Theologians, printers, brewers",
        dates: "354-430",
        origin: "North Africa",
        gender: "Male",
        traits: ["philosophy", "transformation", "writing", "seeking", "introspection"]
    },
    {
        name: "St. Benedict",
        feastDay: "July 11",
        knownFor: "Founder of Benedictines, wrote the Rule of St. Benedict",
        patronOf: "Europe, monks, students, poison sufferers",
        dates: "c. 480-547",
        origin: "Italy",
        gender: "Male",
        traits: ["contemplation", "discipline", "community", "balance", "wisdom"]
    },
    {
        name: "St. Scholastica",
        feastDay: "February 10",
        knownFor: "Twin sister of St. Benedict, founded Benedictine nuns",
        patronOf: "Nuns, education, convulsive children",
        dates: "c. 480-543",
        origin: "Italy",
        gender: "Female",
        traits: ["contemplation", "devotion", "community", "prayer", "love"]
    },
    {
        name: "St. Nicholas",
        feastDay: "December 6",
        knownFor: "Bishop of Myra, known for generosity to the poor",
        patronOf: "Children, sailors, merchants, Russia",
        dates: "c. 270-343",
        origin: "Turkey",
        gender: "Male",
        traits: ["generosity", "compassion", "protection", "children", "service"]
    },
    {
        name: "St. George",
        feastDay: "April 23",
        knownFor: "Soldier and martyr, legendary dragon slayer",
        patronOf: "England, soldiers, knights, skin diseases",
        dates: "d. c. 303",
        origin: "Turkey",
        gender: "Male",
        traits: ["protection", "chivalry", "strength", "heroism", "justice"]
    },
    {
        name: "St. Cecilia",
        feastDay: "November 22",
        knownFor: "Virgin martyr, sang to God during martyrdom",
        patronOf: "Musicians, singers, poets",
        dates: "d. c. 230",
        origin: "Rome",
        gender: "Female",
        traits: ["arts", "music", "faith", "courage", "devotion"]
    },
    {
        name: "St. Elizabeth of Hungary",
        feastDay: "November 17",
        knownFor: "Princess who gave wealth to poor, founded hospital",
        patronOf: "Bakers, charities, homeless, nursing services",
        dates: "1207-1231",
        origin: "Hungary",
        gender: "Female",
        traits: ["charity", "compassion", "service", "humility", "generosity"]
    },
    {
        name: "St. Vincent de Paul",
        feastDay: "September 27",
        knownFor: "Founded Vincentians and Daughters of Charity, served poor",
        patronOf: "Charities, volunteers, hospitals",
        dates: "1581-1660",
        origin: "France",
        gender: "Male",
        traits: ["charity", "service", "leadership", "compassion", "organization"]
    },
    {
        name: "St. John Bosco",
        feastDay: "January 31",
        knownFor: "Founder of Salesians, educator of poor boys",
        patronOf: "Youth, students, editors, apprentices",
        dates: "1815-1888",
        origin: "Italy",
        gender: "Male",
        traits: ["youth", "education", "joy", "innovation", "mentorship"]
    },
    {
        name: "St. John Vianney",
        feastDay: "August 4",
        knownFor: "Cure of Ars, patron of parish priests, confessor",
        patronOf: "Priests, confessors",
        dates: "1786-1859",
        origin: "France",
        gender: "Male",
        traits: ["humility", "service", "prayer", "perseverance", "wisdom"]
    },
    {
        name: "St. Bernadette",
        feastDay: "April 16",
        knownFor: "Saw visions of Mary at Lourdes, simple peasant girl",
        patronOf: "Illness, poverty, shepherds",
        dates: "1844-1879",
        origin: "France",
        gender: "Female",
        traits: ["simplicity", "humility", "faith", "perseverance", "devotion"]
    },
    {
        name: "St. Teresa of Calcutta",
        feastDay: "September 5",
        knownFor: "Founded Missionaries of Charity, served poorest of poor",
        patronOf: "World Youth Day, Calcutta",
        dates: "1910-1997",
        origin: "Albania/India",
        gender: "Female",
        traits: ["service", "compassion", "humility", "perseverance", "love"]
    },
    {
        name: "St. Maximilian Kolbe",
        feastDay: "August 14",
        knownFor: "Franciscan martyred in Auschwitz, gave life for another",
        patronOf: "Drug addicts, journalists, prisoners",
        dates: "1894-1941",
        origin: "Poland",
        gender: "Male",
        traits: ["sacrifice", "courage", "love", "faith", "conviction"]
    },
    {
        name: "St. Edith Stein",
        feastDay: "August 9",
        knownFor: "Jewish philosopher who converted, Carmelite nun, died in Auschwitz",
        patronOf: "Europe, loss of parents, martyrs",
        dates: "1891-1942",
        origin: "Germany",
        gender: "Female",
        traits: ["intellectual", "contemplation", "transformation", "courage", "faith"]
    },
    {
        name: "St. John Paul II",
        feastDay: "October 22",
        knownFor: "Pope for 27 years, World Youth Days, helped end communism",
        patronOf: "World Youth Day, families, Poland",
        dates: "1920-2005",
        origin: "Poland",
        gender: "Male",
        traits: ["leadership", "youth", "courage", "forgiveness", "perseverance"]
    },
    {
        name: "St. Padre Pio",
        feastDay: "September 23",
        knownFor: "Capuchin friar with stigmata, gift of healing and bilocation",
        patronOf: "Civil defense volunteers, stress relief",
        dates: "1887-1968",
        origin: "Italy",
        gender: "Male",
        traits: ["mysticism", "healing", "prayer", "humility", "perseverance"]
    },
    {
        name: "St. Faustina Kowalska",
        feastDay: "October 5",
        knownFor: "Promoted Divine Mercy devotion through visions of Jesus",
        patronOf: "Mercy, World Mercy Sunday",
        dates: "1905-1938",
        origin: "Poland",
        gender: "Female",
        traits: ["mercy", "mysticism", "humility", "obedience", "love"]
    },
    {
        name: "St. Gianna Molla",
        feastDay: "April 28",
        knownFor: "Doctor who chose baby's life over her own",
        patronOf: "Mothers, physicians, unborn children",
        dates: "1922-1962",
        origin: "Italy",
        gender: "Female",
        traits: ["sacrifice", "family", "love", "courage", "faith"]
    },
    {
        name: "St. Rose of Lima",
        feastDay: "August 23",
        knownFor: "First saint of Americas, mystic, practiced severe penance",
        patronOf: "Latin America, florists, gardeners",
        dates: "1586-1617",
        origin: "Peru",
        gender: "Female",
        traits: ["contemplation", "mysticism", "humility", "nature", "devotion"]
    },
    {
        name: "St. Martin de Porres",
        feastDay: "November 3",
        knownFor: "Dominican lay brother, biracial, healer of sick and animals",
        patronOf: "Barbers, innkeepers, public health, racial harmony",
        dates: "1579-1639",
        origin: "Peru",
        gender: "Male",
        traits: ["humility", "service", "healing", "compassion", "justice"]
    },
    {
        name: "St. Thomas More",
        feastDay: "June 22",
        knownFor: "Lord Chancellor of England, martyred for refusing oath",
        patronOf: "Lawyers, politicians, statesmen, adopted children",
        dates: "1478-1535",
        origin: "England",
        gender: "Male",
        traits: ["intellectual", "conviction", "courage", "family", "integrity"]
    },
    {
        name: "St. Jude Thaddeus",
        feastDay: "October 28",
        knownFor: "Apostle, patron of hopeless cases",
        patronOf: "Desperate situations, lost causes, hospitals",
        dates: "1st century",
        origin: "Galilee",
        gender: "Male",
        traits: ["hope", "faith", "perseverance", "compassion", "intercession"]
    },
    {
        name: "St. Rita of Cascia",
        feastDay: "May 22",
        knownFor: "Widow, nun, received stigmata wound on forehead",
        patronOf: "Impossible causes, abuse victims, loneliness",
        dates: "1381-1457",
        origin: "Italy",
        gender: "Female",
        traits: ["perseverance", "forgiveness", "hope", "faith", "transformation"]
    },
    {
        name: "St. Raphael the Archangel",
        feastDay: "September 29",
        knownFor: "Healing angel in Book of Tobit",
        patronOf: "Travelers, blind, nurses, physicians",
        dates: "Biblical",
        origin: "Heaven",
        gender: "Male",
        traits: ["healing", "protection", "guidance", "compassion", "service"]
    },
    {
        name: "St. Michael the Archangel",
        feastDay: "September 29",
        knownFor: "Warrior angel who defeated Satan",
        patronOf: "Police, soldiers, paratroopers, Germany",
        dates: "Biblical",
        origin: "Heaven",
        gender: "Male",
        traits: ["protection", "warrior", "justice", "spiritual-warfare", "strength"]
    },
    {
        name: "St. Anne",
        feastDay: "July 26",
        knownFor: "Mother of Virgin Mary, grandmother of Jesus",
        patronOf: "Grandmothers, mothers, pregnant women, miners",
        dates: "1st century BC",
        origin: "Galilee",
        gender: "Female",
        traits: ["family", "motherhood", "patience", "faith", "nurturing"]
    },
    {
        name: "St. Monica",
        feastDay: "August 27",
        knownFor: "Mother of St. Augustine, prayed for his conversion for years",
        patronOf: "Mothers, widows, victims of abuse",
        dates: "331-387",
        origin: "North Africa",
        gender: "Female",
        traits: ["perseverance", "prayer", "faith", "patience", "motherhood"]
    },
    {
        name: "St. Dymphna",
        feastDay: "May 15",
        knownFor: "Irish princess martyred by father, patron of mental illness",
        patronOf: "Mental illness, anxiety, epilepsy",
        dates: "7th century",
        origin: "Ireland/Belgium",
        gender: "Female",
        traits: ["courage", "healing", "compassion", "faith", "protection"]
    },
    {
        name: "St. Louise de Marillac",
        feastDay: "March 15",
        knownFor: "Co-founder of Daughters of Charity with Vincent de Paul",
        patronOf: "Social workers, widows, sick people",
        dates: "1591-1660",
        origin: "France",
        gender: "Female",
        traits: ["service", "charity", "organization", "compassion", "perseverance"]
    },
    {
        name: "St. Bridget of Sweden",
        feastDay: "July 23",
        knownFor: "Mystic, founded Bridgettine Order, received revelations",
        patronOf: "Sweden, widows, pilgrims",
        dates: "c. 1303-1373",
        origin: "Sweden",
        gender: "Female",
        traits: ["mysticism", "leadership", "faith", "writing", "devotion"]
    },
    {
        name: "St. Margaret of Scotland",
        feastDay: "November 16",
        knownFor: "Queen who reformed Scottish church, devoted to the poor",
        patronOf: "Scotland, queens, large families",
        dates: "c. 1045-1093",
        origin: "Scotland",
        gender: "Female",
        traits: ["charity", "leadership", "family", "reform", "faith"]
    },
    {
        name: "St. Hildegard of Bingen",
        feastDay: "September 17",
        knownFor: "Benedictine abbess, mystic, composer, herbalist, Doctor of the Church",
        patronOf: "Writers, musicians, scientists",
        dates: "1098-1179",
        origin: "Germany",
        gender: "Female",
        traits: ["intellectual", "mysticism", "arts", "healing", "wisdom"]
    },
    {
        name: "St. Kateri Tekakwitha",
        feastDay: "July 14",
        knownFor: "First Native American saint, converted despite persecution",
        patronOf: "Ecology, Native Americans, exiles",
        dates: "1656-1680",
        origin: "USA/Canada",
        gender: "Female",
        traits: ["faith", "perseverance", "nature", "courage", "devotion"]
    },
    {
        name: "St. Josephine Bakhita",
        feastDay: "February 8",
        knownFor: "Former slave from Sudan, became nun in Italy",
        patronOf: "Sudan, human trafficking victims",
        dates: "c. 1869-1947",
        origin: "Sudan/Italy",
        gender: "Female",
        traits: ["forgiveness", "transformation", "faith", "humility", "hope"]
    },
    {
        name: "St. Lawrence",
        feastDay: "August 10",
        knownFor: "Deacon martyred on a gridiron, gave Church treasures to poor",
        patronOf: "Cooks, librarians, comedians",
        dates: "d. 258",
        origin: "Rome",
        gender: "Male",
        traits: ["service", "courage", "charity", "joy", "faith"]
    },
    {
        name: "St. Sebastian",
        feastDay: "January 20",
        knownFor: "Roman soldier, martyred by arrows",
        patronOf: "Athletes, soldiers, plague victims",
        dates: "d. c. 288",
        origin: "Rome",
        gender: "Male",
        traits: ["strength", "endurance", "sacrifice", "military", "protection"]
    },
    {
        name: "St. Dominic",
        feastDay: "August 8",
        knownFor: "Founder of Dominican Order, promoted the Rosary",
        patronOf: "Astronomers, scientists, Dominican Republic",
        dates: "1170-1221",
        origin: "Spain",
        gender: "Male",
        traits: ["preaching", "intellectual", "prayer", "leadership", "faith"]
    },
    {
        name: "St. Bernard of Clairvaux",
        feastDay: "August 20",
        knownFor: "Cistercian abbot, theologian, promoted Second Crusade",
        patronOf: "Beekeepers, candle makers, Gibraltar",
        dates: "1090-1153",
        origin: "France",
        gender: "Male",
        traits: ["contemplation", "leadership", "writing", "mysticism", "reform"]
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
