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
        traits: ["leadership", "faith", "courage", "perseverance", "humility"],
        quotes: [
            "Lord, you know all things; you know that I love you.",
            "Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have.",
            "Cast all your anxiety on him because he cares for you."
        ]
    },
    {
        name: "St. Paul",
        feastDay: "June 29",
        knownFor: "Apostle to the Gentiles, wrote much of the New Testament",
        patronOf: "Missionaries, writers, tentmakers",
        dates: "d. c. 67 AD",
        origin: "Tarsus/Rome",
        gender: "Male",
        traits: ["intellectual", "missionary", "writing", "transformation", "courage"],
        quotes: [
            "I can do all things through Christ who strengthens me.",
            "Faith, hope, and love remain, but the greatest of these is love.",
            "For to me, to live is Christ and to die is gain."
        ]
    },
    {
        name: "St. Mary Magdalene",
        feastDay: "July 22",
        knownFor: "First witness to the Resurrection, devoted follower of Jesus",
        patronOf: "Penitent sinners, women, pharmacists",
        dates: "1st century",
        origin: "Magdala",
        gender: "Female",
        traits: ["devotion", "transformation", "faith", "perseverance", "love"],
        quotes: [
            "I have seen the Lord!",
            "Love is the greatest gift we can give and receive.",
            "In seeking Christ, we find ourselves transformed."
        ]
    },
    {
        name: "St. Joseph",
        feastDay: "March 19",
        knownFor: "Foster father of Jesus, husband of Mary, patron of workers",
        patronOf: "Workers, fathers, dying, carpenters",
        dates: "1st century",
        origin: "Nazareth",
        gender: "Male",
        traits: ["humility", "service", "family", "work", "protection"],
        quotes: [
            "Do whatever He tells you.",
            "In silence and humble work, we find our greatest purpose.",
            "A father's love is shown through faithful presence and quiet sacrifice."
        ]
    },
    {
        name: "St. Francis of Assisi",
        feastDay: "October 4",
        knownFor: "Founder of Franciscans, loved nature and animals, embraced poverty",
        patronOf: "Animals, environment, merchants, Italy",
        dates: "1181-1226",
        origin: "Italy",
        gender: "Male",
        traits: ["nature", "simplicity", "poverty", "peace", "animals"],
        quotes: [
            "Start by doing what is necessary, then do what is possible, and suddenly you are doing the impossible.",
            "Preach the Gospel at all times. When necessary, use words.",
            "Lord, make me an instrument of your peace.",
            "It is in giving that we receive."
        ]
    },
    {
        name: "St. Clare of Assisi",
        feastDay: "August 11",
        knownFor: "Founder of Poor Clares, follower of St. Francis",
        patronOf: "Television, eye disease, good weather",
        dates: "1194-1253",
        origin: "Italy",
        gender: "Female",
        traits: ["contemplation", "poverty", "faith", "perseverance", "devotion"],
        quotes: [
            "We become what we love and who we love shapes what we become.",
            "Love Him totally who gave Himself totally for your love.",
            "Place your mind before the mirror of eternity."
        ]
    },
    {
        name: "St. Anthony of Padua",
        feastDay: "June 13",
        knownFor: "Franciscan preacher, known for miracles and finding lost items",
        patronOf: "Lost items, poor people, travelers",
        dates: "1195-1231",
        origin: "Portugal/Italy",
        gender: "Male",
        traits: ["preaching", "miracles", "service", "intellectual", "compassion"],
        quotes: [
            "Actions speak louder than words; let your words teach and your actions speak.",
            "The spirit of humility is sweeter than honey.",
            "Earthly riches are like the reed. Its roots are sunk in the swamp, and its exterior is fair to behold; but inside it is hollow."
        ]
    },
    {
        name: "St. Thomas Aquinas",
        feastDay: "January 28",
        knownFor: "Dominican theologian, philosopher, wrote Summa Theologica",
        patronOf: "Students, scholars, universities",
        dates: "1225-1274",
        origin: "Italy",
        gender: "Male",
        traits: ["intellectual", "contemplation", "teaching", "writing", "wisdom"],
        quotes: [
            "To one who has faith, no explanation is necessary. To one without faith, no explanation is possible.",
            "The things that we love tell us what we are.",
            "There is nothing on this earth more to be prized than true friendship.",
            "Wonder is the desire for knowledge."
        ]
    },
    {
        name: "St. Catherine of Siena",
        feastDay: "April 29",
        knownFor: "Doctor of the Church, mystic, influenced papal return to Rome",
        patronOf: "Europe, fire prevention, nurses",
        dates: "1347-1380",
        origin: "Italy",
        gender: "Female",
        traits: ["mysticism", "leadership", "courage", "activism", "contemplation"],
        quotes: [
            "Be who God meant you to be and you will set the world on fire.",
            "Nothing great is ever achieved without much enduring.",
            "Proclaim the truth and do not be silent through fear."
        ]
    },
    {
        name: "St. Joan of Arc",
        feastDay: "May 30",
        knownFor: "Led French army to victory, martyred at 19",
        patronOf: "France, soldiers, prisoners",
        dates: "1412-1431",
        origin: "France",
        gender: "Female",
        traits: ["courage", "leadership", "faith", "perseverance", "conviction"],
        quotes: [
            "I am not afraid; I was born to do this.",
            "Act, and God will act.",
            "One life is all we have and we live it as we believe in living it."
        ]
    },
    {
        name: "St. Teresa of Avila",
        feastDay: "October 15",
        knownFor: "Carmelite reformer, mystic, Doctor of the Church",
        patronOf: "Headache sufferers, Spain, lace makers",
        dates: "1515-1582",
        origin: "Spain",
        gender: "Female",
        traits: ["mysticism", "contemplation", "reform", "writing", "perseverance"],
        quotes: [
            "Let nothing disturb you, let nothing frighten you. All things pass away: God never changes.",
            "Prayer is an act of love; words are not needed.",
            "God alone suffices."
        ]
    },
    {
        name: "St. Ignatius of Loyola",
        feastDay: "July 31",
        knownFor: "Founder of the Jesuits, wrote Spiritual Exercises",
        patronOf: "Soldiers, educators, retreats",
        dates: "1491-1556",
        origin: "Spain",
        gender: "Male",
        traits: ["leadership", "education", "transformation", "discipline", "service"],
        quotes: [
            "Go forth and set the world on fire.",
            "Teach us to give and not to count the cost.",
            "In all things, seek to find God."
        ]
    },
    {
        name: "St. Francis Xavier",
        feastDay: "December 3",
        knownFor: "Jesuit missionary to Asia, brought Christianity to India and Japan",
        patronOf: "Missionaries, navigators, foreign missions",
        dates: "1506-1552",
        origin: "Spain/Asia",
        gender: "Male",
        traits: ["missionary", "adventure", "courage", "perseverance", "cross-cultural"],
        quotes: [
            "It is not the actual physical exertion that counts towards one's progress, nor the nature of the task, but by the spirit of faith with which it is undertaken.",
            "Give me the grace to do as you command, and command me to do what you will!",
            "Tell the students to give up their small ambitions and come eastward to preach the Gospel of Christ."
        ]
    },
    {
        name: "St. John of the Cross",
        feastDay: "December 14",
        knownFor: "Carmelite mystic, poet, wrote Dark Night of the Soul",
        patronOf: "Poets, mystics, contemplatives",
        dates: "1542-1591",
        origin: "Spain",
        gender: "Male",
        traits: ["mysticism", "contemplation", "poetry", "perseverance", "wisdom"],
        quotes: [
            "In the evening of life, we will be judged on love alone.",
            "Where there is no love, put love, and you will find love.",
            "The soul that is attached to anything, however much good there may be in it, will not arrive at the liberty of divine union."
        ]
    },
    {
        name: "St. Therese of Lisieux",
        feastDay: "October 1",
        knownFor: "Carmelite nun, 'Little Flower,' taught the Little Way",
        patronOf: "Missionaries, florists, tuberculosis",
        dates: "1873-1897",
        origin: "France",
        gender: "Female",
        traits: ["simplicity", "love", "humility", "faith", "joy"],
        quotes: [
            "Miss no single opportunity of making some small sacrifice, here by a smiling look, there by a kindly word.",
            "I will spend my heaven doing good on earth.",
            "The splendor of the rose and the whiteness of the lily do not rob the little violet of its scent nor the daisy of its simple charm."
        ]
    },
    {
        name: "St. Patrick",
        feastDay: "March 17",
        knownFor: "Missionary to Ireland, used shamrock to explain Trinity",
        patronOf: "Ireland, engineers, excluded people",
        dates: "c. 385-461",
        origin: "Britain/Ireland",
        gender: "Male",
        traits: ["missionary", "perseverance", "teaching", "evangelization", "forgiveness"],
        quotes: [
            "Christ beside me, Christ before me, Christ behind me, Christ within me.",
            "I arise today through the strength of heaven.",
            "If I be worthy, I live for my God to teach the heathen, even though they may despise me."
        ]
    },
    {
        name: "St. Augustine of Hippo",
        feastDay: "August 28",
        knownFor: "Bishop, philosopher, wrote Confessions and City of God",
        patronOf: "Theologians, printers, brewers",
        dates: "354-430",
        origin: "North Africa",
        gender: "Male",
        traits: ["philosophy", "transformation", "writing", "seeking", "introspection"],
        quotes: [
            "Our hearts are restless until they rest in you.",
            "The world is a book and those who do not travel read only one page.",
            "Late have I loved you, O Beauty ever ancient, ever new, late have I loved you!"
        ]
    },
    {
        name: "St. Benedict",
        feastDay: "July 11",
        knownFor: "Founder of Benedictines, wrote the Rule of St. Benedict",
        patronOf: "Europe, monks, students, poison sufferers",
        dates: "c. 480-547",
        origin: "Italy",
        gender: "Male",
        traits: ["contemplation", "discipline", "community", "balance", "wisdom"],
        quotes: [
            "Ora et labora - Pray and work.",
            "Listen with the ear of your heart.",
            "Idleness is the enemy of the soul."
        ]
    },
    {
        name: "St. Scholastica",
        feastDay: "February 10",
        knownFor: "Twin sister of St. Benedict, founded Benedictine nuns",
        patronOf: "Nuns, education, convulsive children",
        dates: "c. 480-543",
        origin: "Italy",
        gender: "Female",
        traits: ["contemplation", "devotion", "community", "prayer", "love"],
        quotes: [
            "You see, I asked you and you would not listen; so I asked my God and He did listen.",
            "Love prevails where reason cannot reach.",
            "The heart that loves is always young in the eyes of God."
        ]
    },
    {
        name: "St. Nicholas",
        feastDay: "December 6",
        knownFor: "Bishop of Myra, known for generosity to the poor",
        patronOf: "Children, sailors, merchants, Russia",
        dates: "c. 270-343",
        origin: "Turkey",
        gender: "Male",
        traits: ["generosity", "compassion", "protection", "children", "service"],
        quotes: [
            "The giver of every good and perfect gift has called upon us to mimic His giving, by grace, through faith.",
            "True generosity flows from a heart transformed by love.",
            "What we do for others in secret, God rewards openly."
        ]
    },
    {
        name: "St. George",
        feastDay: "April 23",
        knownFor: "Soldier and martyr, legendary dragon slayer",
        patronOf: "England, soldiers, knights, skin diseases",
        dates: "d. c. 303",
        origin: "Turkey",
        gender: "Male",
        traits: ["protection", "chivalry", "strength", "heroism", "justice"],
        quotes: [
            "A true knight fights not for glory, but for those who cannot fight for themselves.",
            "Courage is not the absence of fear, but action in the face of it.",
            "Stand firm in faith, for God is your shield."
        ]
    },
    {
        name: "St. Cecilia",
        feastDay: "November 22",
        knownFor: "Virgin martyr, sang to God during martyrdom",
        patronOf: "Musicians, singers, poets",
        dates: "d. c. 230",
        origin: "Rome",
        gender: "Female",
        traits: ["arts", "music", "faith", "courage", "devotion"],
        quotes: [
            "I sang in my heart a hymn of love to my true Spouse.",
            "Let music be the language of your soul's devotion.",
            "In every note, let there be a prayer; in every song, a sacrifice of praise."
        ]
    },
    {
        name: "St. Elizabeth of Hungary",
        feastDay: "November 17",
        knownFor: "Princess who gave wealth to poor, founded hospital",
        patronOf: "Bakers, charities, homeless, nursing services",
        dates: "1207-1231",
        origin: "Hungary",
        gender: "Female",
        traits: ["charity", "compassion", "service", "humility", "generosity"],
        quotes: [
            "How can I wear a crown of gold when the Lord wears a crown of thorns?",
            "We must give freely what we have freely received.",
            "In serving the poor, we serve Christ himself."
        ]
    },
    {
        name: "St. Vincent de Paul",
        feastDay: "September 27",
        knownFor: "Founded Vincentians and Daughters of Charity, served poor",
        patronOf: "Charities, volunteers, hospitals",
        dates: "1581-1660",
        origin: "France",
        gender: "Male",
        traits: ["charity", "service", "leadership", "compassion", "organization"],
        quotes: [
            "Go to the poor: you will find God.",
            "Charity is the cement which binds communities to God and persons to one another.",
            "We should strive to keep our hearts open to the sufferings and wretchedness of other people."
        ]
    },
    {
        name: "St. John Bosco",
        feastDay: "January 31",
        knownFor: "Founder of Salesians, educator of poor boys",
        patronOf: "Youth, students, editors, apprentices",
        dates: "1815-1888",
        origin: "Italy",
        gender: "Male",
        traits: ["youth", "education", "joy", "innovation", "mentorship"],
        quotes: [
            "It is not enough to love the young; they must know they are loved.",
            "Do not put off till tomorrow the good you can do today.",
            "Without confidence and love, there can be no true education."
        ]
    },
    {
        name: "St. John Vianney",
        feastDay: "August 4",
        knownFor: "Cure of Ars, patron of parish priests, confessor",
        patronOf: "Priests, confessors",
        dates: "1786-1859",
        origin: "France",
        gender: "Male",
        traits: ["humility", "service", "prayer", "perseverance", "wisdom"],
        quotes: [
            "Private prayer is like straw scattered here and there: If you set it on fire, it makes a lot of little flames. But gather these straws into a bundle and light them, and you get a mighty fire.",
            "The good God does not need years to accomplish His work of love in a soul.",
            "A priest goes to heaven or to hell with a crowd of others."
        ]
    },
    {
        name: "St. Bernadette",
        feastDay: "April 16",
        knownFor: "Saw visions of Mary at Lourdes, simple peasant girl",
        patronOf: "Illness, poverty, shepherds",
        dates: "1844-1879",
        origin: "France",
        gender: "Female",
        traits: ["simplicity", "humility", "faith", "perseverance", "devotion"],
        quotes: [
            "I do not promise to make you happy in this world, but in the next.",
            "My job is to inform, not to convince.",
            "The Virgin used me as a broom to remove dust. When the work is done, the broom is put behind the door and forgotten."
        ]
    },
    {
        name: "St. Teresa of Calcutta",
        feastDay: "September 5",
        knownFor: "Founded Missionaries of Charity, served poorest of poor",
        patronOf: "World Youth Day, Calcutta",
        dates: "1910-1997",
        origin: "Albania/India",
        gender: "Female",
        traits: ["service", "compassion", "humility", "perseverance", "love"],
        quotes: [
            "Not all of us can do great things. But we can do small things with great love.",
            "If you judge people, you have no time to love them.",
            "Spread love everywhere you go. Let no one ever come to you without leaving happier."
        ]
    },
    {
        name: "St. Maximilian Kolbe",
        feastDay: "August 14",
        knownFor: "Franciscan martyred in Auschwitz, gave life for another",
        patronOf: "Drug addicts, journalists, prisoners",
        dates: "1894-1941",
        origin: "Poland",
        gender: "Male",
        traits: ["sacrifice", "courage", "love", "faith", "conviction"],
        quotes: [
            "The most deadly poison of our time is indifference.",
            "No one in the world can change truth. What we can do and should do is to seek truth and to serve it when we have found it.",
            "I am a Catholic priest. Let me take his place. I am old. He has a wife and children."
        ]
    },
    {
        name: "St. Edith Stein",
        feastDay: "August 9",
        knownFor: "Jewish philosopher who converted, Carmelite nun, died in Auschwitz",
        patronOf: "Europe, loss of parents, martyrs",
        dates: "1891-1942",
        origin: "Germany",
        gender: "Female",
        traits: ["intellectual", "contemplation", "transformation", "courage", "faith"],
        quotes: [
            "The deeper one is drawn into God, the more one must go out of oneself into the world.",
            "Do not accept anything as truth if it lacks love. And do not accept anything as love which lacks truth.",
            "Whoever seeks truth seeks God, whether or not he realizes it."
        ]
    },
    {
        name: "St. John Paul II",
        feastDay: "October 22",
        knownFor: "Pope for 27 years, World Youth Days, helped end communism",
        patronOf: "World Youth Day, families, Poland",
        dates: "1920-2005",
        origin: "Poland",
        gender: "Male",
        traits: ["leadership", "youth", "courage", "forgiveness", "perseverance"],
        quotes: [
            "Be not afraid!",
            "The future starts today, not tomorrow.",
            "Freedom consists not in doing what we like, but in having the right to do what we ought."
        ]
    },
    {
        name: "St. Padre Pio",
        feastDay: "September 23",
        knownFor: "Capuchin friar with stigmata, gift of healing and bilocation",
        patronOf: "Civil defense volunteers, stress relief",
        dates: "1887-1968",
        origin: "Italy",
        gender: "Male",
        traits: ["mysticism", "healing", "prayer", "humility", "perseverance"],
        quotes: [
            "Pray, hope, and don't worry. Worry is useless. God is merciful and will hear your prayer.",
            "The life of a Christian is nothing but a perpetual struggle against self.",
            "Prayer is the best weapon we possess. It is the key that opens the heart of God."
        ]
    },
    {
        name: "St. Faustina Kowalska",
        feastDay: "October 5",
        knownFor: "Promoted Divine Mercy devotion through visions of Jesus",
        patronOf: "Mercy, World Mercy Sunday",
        dates: "1905-1938",
        origin: "Poland",
        gender: "Female",
        traits: ["mercy", "mysticism", "humility", "obedience", "love"],
        quotes: [
            "Jesus, I trust in You.",
            "From today on, my own will does not exist.",
            "The mercy of God, hidden in the Blessed Sacrament, the voice of the Lord who speaks to us from the throne of mercy: Come to Me, all of you."
        ]
    },
    {
        name: "St. Gianna Molla",
        feastDay: "April 28",
        knownFor: "Doctor who chose baby's life over her own",
        patronOf: "Mothers, physicians, unborn children",
        dates: "1922-1962",
        origin: "Italy",
        gender: "Female",
        traits: ["sacrifice", "family", "love", "courage", "faith"],
        quotes: [
            "If you must decide between me and the child, do not hesitate: choose the child.",
            "Love and sacrifice are closely linked, like the sun and the light.",
            "The secret of happiness is to live moment by moment and to thank God for all that He, in His goodness, sends to us day after day."
        ]
    },
    {
        name: "St. Rose of Lima",
        feastDay: "August 23",
        knownFor: "First saint of Americas, mystic, practiced severe penance",
        patronOf: "Latin America, florists, gardeners",
        dates: "1586-1617",
        origin: "Peru",
        gender: "Female",
        traits: ["contemplation", "mysticism", "humility", "nature", "devotion"],
        quotes: [
            "Apart from the cross, there is no other ladder by which we may get to heaven.",
            "Our Lord and Savior lifted up his voice and said with incomparable majesty: Let all know that grace comes after tribulation.",
            "When we serve the poor and the sick, we serve Jesus."
        ]
    },
    {
        name: "St. Martin de Porres",
        feastDay: "November 3",
        knownFor: "Dominican lay brother, biracial, healer of sick and animals",
        patronOf: "Barbers, innkeepers, public health, racial harmony",
        dates: "1579-1639",
        origin: "Peru",
        gender: "Male",
        traits: ["humility", "service", "healing", "compassion", "justice"],
        quotes: [
            "Everything, even sweeping, scraping vegetables, weeding a garden and waiting on the sick could be a prayer, if it were offered to God.",
            "Compassion, my dear, is preferable to cleanliness.",
            "I wish I could heal every ill, but since I cannot, I offer my prayers and my small services."
        ]
    },
    {
        name: "St. Thomas More",
        feastDay: "June 22",
        knownFor: "Lord Chancellor of England, martyred for refusing oath",
        patronOf: "Lawyers, politicians, statesmen, adopted children",
        dates: "1478-1535",
        origin: "England",
        gender: "Male",
        traits: ["intellectual", "conviction", "courage", "family", "integrity"],
        quotes: [
            "I die the king's faithful servant, but God's first.",
            "The devil... the prowde spirite... cannot endure to be mocked.",
            "Earth has no sorrow that heaven cannot heal."
        ]
    },
    {
        name: "St. Jude Thaddeus",
        feastDay: "October 28",
        knownFor: "Apostle, patron of hopeless cases",
        patronOf: "Desperate situations, lost causes, hospitals",
        dates: "1st century",
        origin: "Galilee",
        gender: "Male",
        traits: ["hope", "faith", "perseverance", "compassion", "intercession"],
        quotes: [
            "Keep yourselves in the love of God, looking for the mercy of our Lord Jesus Christ unto eternal life.",
            "Hope is not lost, for those who trust in God.",
            "When all seems impossible, God's grace is most powerful."
        ]
    },
    {
        name: "St. Rita of Cascia",
        feastDay: "May 22",
        knownFor: "Widow, nun, received stigmata wound on forehead",
        patronOf: "Impossible causes, abuse victims, loneliness",
        dates: "1381-1457",
        origin: "Italy",
        gender: "Female",
        traits: ["perseverance", "forgiveness", "hope", "faith", "transformation"],
        quotes: [
            "God does not always grant what we wish, but what we need.",
            "Forgiveness is the key that unlocks the door of resentment and the handcuffs of hatred.",
            "Nothing is impossible when we place our trust in God."
        ]
    },
    {
        name: "St. Raphael the Archangel",
        feastDay: "September 29",
        knownFor: "Healing angel in Book of Tobit",
        patronOf: "Travelers, blind, nurses, physicians",
        dates: "Biblical",
        origin: "Heaven",
        gender: "Male",
        traits: ["healing", "protection", "guidance", "compassion", "service"],
        quotes: [
            "I am Raphael, one of the seven angels who stand and serve before the Glory of the Lord.",
            "Do not be afraid; peace be with you. Bless God now and forever.",
            "God sent me to heal you and to deliver you."
        ]
    },
    {
        name: "St. Michael the Archangel",
        feastDay: "September 29",
        knownFor: "Warrior angel who defeated Satan",
        patronOf: "Police, soldiers, paratroopers, Germany",
        dates: "Biblical",
        origin: "Heaven",
        gender: "Male",
        traits: ["protection", "warrior", "justice", "spiritual-warfare", "strength"],
        quotes: [
            "Who is like God?",
            "Be sober, be vigilant; because your adversary the devil, as a roaring lion, walketh about, seeking whom he may devour.",
            "Defend us in battle; be our protection against the wickedness and snares of the devil."
        ]
    },
    {
        name: "St. Anne",
        feastDay: "July 26",
        knownFor: "Mother of Virgin Mary, grandmother of Jesus",
        patronOf: "Grandmothers, mothers, pregnant women, miners",
        dates: "1st century BC",
        origin: "Galilee",
        gender: "Female",
        traits: ["family", "motherhood", "patience", "faith", "nurturing"],
        quotes: [
            "A mother's prayer for her children is heard in heaven.",
            "Patience and faith are the foundation of a holy family.",
            "In teaching our children to love God, we give them the greatest gift."
        ]
    },
    {
        name: "St. Monica",
        feastDay: "August 27",
        knownFor: "Mother of St. Augustine, prayed for his conversion for years",
        patronOf: "Mothers, widows, victims of abuse",
        dates: "331-387",
        origin: "North Africa",
        gender: "Female",
        traits: ["perseverance", "prayer", "faith", "patience", "motherhood"],
        quotes: [
            "Nothing is far from God.",
            "A mother's tears cannot be lost; they will surely be heard.",
            "I do not despair, because I know who holds tomorrow."
        ]
    },
    {
        name: "St. Dymphna",
        feastDay: "May 15",
        knownFor: "Irish princess martyred by father, patron of mental illness",
        patronOf: "Mental illness, anxiety, epilepsy",
        dates: "7th century",
        origin: "Ireland/Belgium",
        gender: "Female",
        traits: ["courage", "healing", "compassion", "faith", "protection"],
        quotes: [
            "In my weakness, God's strength is made perfect.",
            "The wounds of the mind require as much compassion as the wounds of the body.",
            "God sees the suffering of the heart and draws near to comfort."
        ]
    },
    {
        name: "St. Louise de Marillac",
        feastDay: "March 15",
        knownFor: "Co-founder of Daughters of Charity with Vincent de Paul",
        patronOf: "Social workers, widows, sick people",
        dates: "1591-1660",
        origin: "France",
        gender: "Female",
        traits: ["service", "charity", "organization", "compassion", "perseverance"],
        quotes: [
            "The love of Christ impels us to serve the poor.",
            "Be diligent in serving the poor. Love the poor, honor them, as you would honor Christ himself.",
            "True charity is shown in deeds, not just in words."
        ]
    },
    {
        name: "St. Bridget of Sweden",
        feastDay: "July 23",
        knownFor: "Mystic, founded Bridgettine Order, received revelations",
        patronOf: "Sweden, widows, pilgrims",
        dates: "c. 1303-1373",
        origin: "Sweden",
        gender: "Female",
        traits: ["mysticism", "leadership", "faith", "writing", "devotion"],
        quotes: [
            "The world would have peace if only men of politics would follow the Gospels.",
            "I saw Him and sought Him; I had Him and wanted Him.",
            "Let your heart be open to God, and He will speak to you in the silence."
        ]
    },
    {
        name: "St. Margaret of Scotland",
        feastDay: "November 16",
        knownFor: "Queen who reformed Scottish church, devoted to the poor",
        patronOf: "Scotland, queens, large families",
        dates: "c. 1045-1093",
        origin: "Scotland",
        gender: "Female",
        traits: ["charity", "leadership", "family", "reform", "faith"],
        quotes: [
            "A queen's greatest crown is found in serving her people.",
            "The dignity of the poor reflects the dignity of Christ.",
            "Let your position be a means of doing good, not of gaining honor."
        ]
    },
    {
        name: "St. Hildegard of Bingen",
        feastDay: "September 17",
        knownFor: "Benedictine abbess, mystic, composer, herbalist, Doctor of the Church",
        patronOf: "Writers, musicians, scientists",
        dates: "1098-1179",
        origin: "Germany",
        gender: "Female",
        traits: ["intellectual", "mysticism", "arts", "healing", "wisdom"],
        quotes: [
            "Humanity, take a good look at yourself. Inside, you've got heaven and earth, and all of creation.",
            "The soul is a breath of living spirit, that with excellent sensitivity, permeates the entire body to give it life.",
            "Dare to declare who you are. It is not far from the shores of silence to the boundaries of speech."
        ]
    },
    {
        name: "St. Kateri Tekakwitha",
        feastDay: "July 14",
        knownFor: "First Native American saint, converted despite persecution",
        patronOf: "Ecology, Native Americans, exiles",
        dates: "1656-1680",
        origin: "USA/Canada",
        gender: "Female",
        traits: ["faith", "perseverance", "nature", "courage", "devotion"],
        quotes: [
            "Who can tell me what is most pleasing to God, that I may do it?",
            "I am not my own; I have given myself to Jesus.",
            "In nature, I see the hand of the Creator everywhere."
        ]
    },
    {
        name: "St. Josephine Bakhita",
        feastDay: "February 8",
        knownFor: "Former slave from Sudan, became nun in Italy",
        patronOf: "Sudan, human trafficking victims",
        dates: "c. 1869-1947",
        origin: "Sudan/Italy",
        gender: "Female",
        traits: ["forgiveness", "transformation", "faith", "humility", "hope"],
        quotes: [
            "If I were to meet those who kidnapped me, and even those who tortured me, I would kneel and kiss their hands.",
            "I am definitively loved and whatever happens to me, I am awaited by this Love.",
            "Seeing the sun, the moon and the stars, I said to myself: Who could be the Master of these beautiful things?"
        ]
    },
    {
        name: "St. Lawrence",
        feastDay: "August 10",
        knownFor: "Deacon martyred on a gridiron, gave Church treasures to poor",
        patronOf: "Cooks, librarians, comedians",
        dates: "d. 258",
        origin: "Rome",
        gender: "Male",
        traits: ["service", "courage", "charity", "joy", "faith"],
        quotes: [
            "The poor are the treasure of the Church.",
            "Turn me over, I'm done on this side!",
            "He who serves the poor serves Christ himself."
        ]
    },
    {
        name: "St. Sebastian",
        feastDay: "January 20",
        knownFor: "Roman soldier, martyred by arrows",
        patronOf: "Athletes, soldiers, plague victims",
        dates: "d. c. 288",
        origin: "Rome",
        gender: "Male",
        traits: ["strength", "endurance", "sacrifice", "military", "protection"],
        quotes: [
            "The pain of endurance is momentary, but the glory of perseverance is eternal.",
            "A soldier of Christ fears nothing but sin.",
            "In suffering for the faith, we share in Christ's victory."
        ]
    },
    {
        name: "St. Dominic",
        feastDay: "August 8",
        knownFor: "Founder of Dominican Order, promoted the Rosary",
        patronOf: "Astronomers, scientists, Dominican Republic",
        dates: "1170-1221",
        origin: "Spain",
        gender: "Male",
        traits: ["preaching", "intellectual", "prayer", "leadership", "faith"],
        quotes: [
            "A man who governs his passions is master of his world.",
            "Arm yourself with prayer rather than a sword; wear humility rather than fine clothes.",
            "We must sow the seed, not hoard it."
        ]
    },
    {
        name: "St. Bernard of Clairvaux",
        feastDay: "August 20",
        knownFor: "Cistercian abbot, theologian, promoted Second Crusade",
        patronOf: "Beekeepers, candle makers, Gibraltar",
        dates: "1090-1153",
        origin: "France",
        gender: "Male",
        traits: ["contemplation", "leadership", "writing", "mysticism", "reform"],
        quotes: [
            "You wish to see; listen. Hearing is a step toward vision.",
            "Hell is full of good wishes and desires.",
            "Many who are last will be first, and the first will be last."
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
