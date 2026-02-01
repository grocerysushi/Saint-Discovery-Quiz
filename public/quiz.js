// Quiz Questions with trait mappings
const questions = [
    {
        id: 1,
        question: "When facing a difficult problem, what is your first instinct?",
        answers: [
            { text: "Study and research until I fully understand every aspect", traits: ["intellectual", "wisdom", "contemplation"] },
            { text: "Take immediate action to address the situation", traits: ["leadership", "courage", "activism"] },
            { text: "Pray and reflect, trusting that guidance will come", traits: ["faith", "contemplation", "mysticism"] },
            { text: "Reach out to help others who may be affected", traits: ["service", "compassion", "charity"] }
        ]
    },
    {
        id: 2,
        question: "How do you find the most meaning in your daily life?",
        answers: [
            { text: "Through quiet moments of prayer and reflection", traits: ["contemplation", "prayer", "mysticism"] },
            { text: "By serving others and meeting their needs", traits: ["service", "charity", "compassion"] },
            { text: "Through learning, reading, and expanding my understanding", traits: ["intellectual", "wisdom", "teaching"] },
            { text: "By creating beauty in the world through art, music, or nature", traits: ["arts", "nature", "poetry"] }
        ]
    },
    {
        id: 3,
        question: "When you see someone being treated unfairly, how do you respond?",
        answers: [
            { text: "Speak up immediately, even if it's uncomfortable", traits: ["courage", "conviction", "justice"] },
            { text: "Quietly support the person and offer help privately", traits: ["compassion", "humility", "service"] },
            { text: "Work to change systems and structures that cause injustice", traits: ["leadership", "reform", "activism"] },
            { text: "Pray for the situation and all involved", traits: ["faith", "prayer", "intercession"] }
        ]
    },
    {
        id: 4,
        question: "What type of environment helps you feel closest to God?",
        answers: [
            { text: "In nature - forests, mountains, or near water", traits: ["nature", "simplicity", "animals"] },
            { text: "In a quiet chapel or during adoration", traits: ["contemplation", "prayer", "mysticism"] },
            { text: "While actively serving others in need", traits: ["service", "charity", "healing"] },
            { text: "In community with others, sharing faith together", traits: ["community", "preaching", "evangelization"] }
        ]
    },
    {
        id: 5,
        question: "How would you describe your approach to personal challenges?",
        answers: [
            { text: "I persevere steadily, trusting it will work out in time", traits: ["perseverance", "patience", "hope"] },
            { text: "I face them head-on with determination and courage", traits: ["endurance", "strength", "heroism"] },
            { text: "I look for lessons and growth opportunities in every trial", traits: ["transformation", "seeking", "introspection"] },
            { text: "I offer up my suffering and unite it with Christ's", traits: ["sacrifice", "mysticism", "devotion"] }
        ]
    },
    {
        id: 6,
        question: "What role do you naturally take in a group setting?",
        answers: [
            { text: "The leader who organizes and guides others", traits: ["leadership", "organization", "discipline"] },
            { text: "The quiet supporter who ensures everyone's needs are met", traits: ["service", "humility", "generosity"] },
            { text: "The teacher or mentor who shares knowledge", traits: ["teaching", "mentorship", "wisdom"] },
            { text: "The encourager who brings joy and peace", traits: ["joy", "peace", "community"] }
        ]
    },
    {
        id: 7,
        question: "What draws you most when learning about a saint's life?",
        answers: [
            { text: "Their intellectual contributions and writings", traits: ["intellectual", "writing", "philosophy"] },
            { text: "Their courage in the face of persecution", traits: ["courage", "faith", "conviction"] },
            { text: "Their humble service to the poor and suffering", traits: ["service", "charity", "humility"] },
            { text: "Their deep mystical prayer life and visions", traits: ["mysticism", "contemplation", "prayer"] }
        ]
    },
    {
        id: 8,
        question: "How do you prefer to express your faith?",
        answers: [
            { text: "Through studying Scripture and Church teachings", traits: ["intellectual", "wisdom", "teaching"] },
            { text: "Through works of mercy and charitable actions", traits: ["charity", "service", "compassion"] },
            { text: "Through contemplative prayer and silence", traits: ["contemplation", "mysticism", "prayer"] },
            { text: "Through sharing my faith with others openly", traits: ["missionary", "preaching", "courage"] }
        ]
    },
    {
        id: 9,
        question: "What is your greatest strength?",
        answers: [
            { text: "My ability to understand complex ideas and explain them clearly", traits: ["intellectual", "teaching", "wisdom"] },
            { text: "My compassion and desire to help those who are suffering", traits: ["compassion", "service", "healing"] },
            { text: "My courage to stand firm in my beliefs no matter the cost", traits: ["courage", "conviction", "faith"] },
            { text: "My patience and ability to trust in God's timing", traits: ["patience", "perseverance", "hope"] }
        ]
    },
    {
        id: 10,
        question: "Which of these callings resonates most with you?",
        answers: [
            { text: "Bringing the Gospel to people who haven't heard it", traits: ["missionary", "evangelization", "adventure"] },
            { text: "Creating a haven of peace and prayer", traits: ["contemplation", "peace", "balance"] },
            { text: "Standing up for truth in public life", traits: ["conviction", "justice", "activism"] },
            { text: "Caring for the sick, poor, or marginalized", traits: ["service", "healing", "charity"] }
        ]
    },
    {
        id: 11,
        question: "How do you handle times when your faith is tested?",
        answers: [
            { text: "I dig deeper into study and seek understanding", traits: ["intellectual", "wisdom", "faith"] },
            { text: "I increase my prayer and time in silence with God", traits: ["contemplation", "prayer", "perseverance"] },
            { text: "I reach out to serve others, finding purpose in giving", traits: ["service", "charity", "love"] },
            { text: "I hold fast to what I believe, trusting through darkness", traits: ["faith", "courage", "hope"] }
        ]
    },
    {
        id: 12,
        question: "What legacy would you most want to leave behind?",
        answers: [
            { text: "Writings or teachings that help others understand the faith", traits: ["intellectual", "writing", "teaching"] },
            { text: "A community or organization that serves those in need", traits: ["service", "charity", "leadership"] },
            { text: "The example of a life lived with courage and conviction", traits: ["courage", "faith", "conviction"] },
            { text: "Having inspired others through simple acts of love", traits: ["love", "humility", "simplicity"] }
        ]
    }
];

// State
let currentQuestion = 0;
let userAnswers = [];
let matchedSaint = null;
let matchExplanation = "";
let currentLang = 'en';

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    // Initialize i18n if available
    if (typeof i18n !== 'undefined') {
        currentLang = await i18n.init();
        updateLanguageSwitcher();
        i18n.translatePage();
    }

    // Initialize Saint of the Day widget
    initSaintOfTheDay();

    // Initialize Saint of the Week widget
    initSaintOfTheWeek();
});

// Update language switcher active state
function updateLanguageSwitcher() {
    const switcher = document.getElementById('langSwitcher');
    if (!switcher) return;

    const links = switcher.querySelectorAll('.lang-btn');
    links.forEach(link => {
        const linkLang = link.getAttribute('hreflang');
        link.classList.toggle('active', linkLang === currentLang);
    });
}

// Get translated text helper
function t(key, replacements = {}) {
    if (typeof i18n !== 'undefined') {
        return i18n.t(key, replacements);
    }
    return key;
}

// Get translated saint field
function getSaintField(saint, field) {
    if (typeof i18n !== 'undefined') {
        return i18n.getSaintField(saint, field);
    }
    return saint[field];
}

// Saint of the Day - deterministic selection based on date
function initSaintOfTheDay() {
    const saintOfDayWidget = document.getElementById('saintOfDay');
    if (!saintOfDayWidget || typeof saintsDatabase === 'undefined') return;

    // Get today's date components for deterministic selection
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));

    // Use day of year to pick a saint (same saint for everyone on the same day)
    const saintIndex = dayOfYear % saintsDatabase.length;
    const saint = saintsDatabase[saintIndex];

    // Format today's date based on language
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const locale = currentLang === 'es' ? 'es-ES' : 'en-US';
    const formattedDate = today.toLocaleDateString(locale, dateOptions);

    // Get translated saint fields
    const knownFor = getSaintField(saint, 'knownFor');
    const feastDayLabel = currentLang === 'es' ? 'Día de Fiesta' : 'Feast Day';

    // Populate the widget
    document.getElementById('sotdDate').textContent = formattedDate;
    document.getElementById('sotdName').textContent = saint.name;
    document.getElementById('sotdFeast').textContent = `${feastDayLabel}: ${saint.feastDay}`;
    document.getElementById('sotdKnown').textContent = knownFor;

    // Add quote if available
    const quoteEl = document.getElementById('sotdQuote');
    if (saint.quote && saint.quote.trim()) {
        quoteEl.textContent = `"${saint.quote}"`;
    } else {
        quoteEl.textContent = '';
    }
}

// Saint of the Week - deterministic selection based on week number
function initSaintOfTheWeek() {
    const saintOfWeekWidget = document.getElementById('saintOfWeek');
    if (!saintOfWeekWidget || typeof saintsDatabase === 'undefined') return;

    // Get current date
    const today = new Date();

    // Calculate week of year (ISO week number)
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24));
    const weekOfYear = Math.ceil((dayOfYear + startOfYear.getDay() + 1) / 7);

    // Use offset of 50 to avoid same saint as daily widget
    const saintIndex = (weekOfYear + 50) % saintsDatabase.length;
    const saint = saintsDatabase[saintIndex];

    // Calculate week date range (Sunday to Saturday)
    const currentDay = today.getDay();
    const sundayOffset = currentDay === 0 ? 0 : -currentDay;
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + sundayOffset);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    // Format date range based on language
    const dateOptions = { month: 'short', day: 'numeric' };
    const locale = currentLang === 'es' ? 'es-ES' : 'en-US';
    const startStr = weekStart.toLocaleDateString(locale, dateOptions);
    const endStr = weekEnd.toLocaleDateString(locale, dateOptions);

    // Get translated saint fields
    const knownFor = getSaintField(saint, 'knownFor');
    const patronOf = getSaintField(saint, 'patronOf');
    const feastDayLabel = currentLang === 'es' ? 'Día de Fiesta' : 'Feast Day';

    // Populate the widget
    document.getElementById('sotwDates').textContent = `${startStr} - ${endStr}`;
    document.getElementById('sotwName').textContent = saint.name;
    document.getElementById('sotwFeast').textContent = `${feastDayLabel}: ${saint.feastDay}`;
    document.getElementById('sotwKnown').textContent = knownFor;
    document.getElementById('sotwPatron').textContent = patronOf;
    document.getElementById('sotwLife').textContent = `${saint.dates} | ${saint.origin}`;

    // Add quote if available
    const quoteEl = document.getElementById('sotwQuote');
    if (saint.quote && saint.quote.trim()) {
        quoteEl.textContent = `"${saint.quote}"`;
    } else if (saint.quotes && saint.quotes.length > 0 && saint.quotes[0].trim()) {
        quoteEl.textContent = `"${saint.quotes[0]}"`;
    } else {
        quoteEl.textContent = '';
    }
}

// Start Quiz
function startQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    showScreen('quiz');
    renderQuestion();
}

// Get translated question text
function getQuestionText(questionId) {
    const key = `quiz.questions.q${questionId}.question`;
    const translated = t(key);
    // If translation not found, return from questions array
    if (translated === key) {
        return questions[questionId - 1].question;
    }
    return translated;
}

// Get translated answer text
function getAnswerText(questionId, answerIndex) {
    const key = `quiz.questions.q${questionId}.a${answerIndex + 1}`;
    const translated = t(key);
    // If translation not found, return from questions array
    if (translated === key) {
        return questions[questionId - 1].answers[answerIndex].text;
    }
    return translated;
}

// Render Current Question
function renderQuestion() {
    const question = questions[currentQuestion];
    const container = document.getElementById('questionContainer');

    // Update progress
    const progress = ((currentQuestion) / questions.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;

    // Get translated progress text
    const progressText = currentLang === 'es'
        ? `Pregunta ${currentQuestion + 1} de ${questions.length}`
        : `Question ${currentQuestion + 1} of ${questions.length}`;
    document.getElementById('progressText').textContent = progressText;

    // Get translated question and answers
    const questionText = getQuestionText(question.id);

    // Render question
    container.innerHTML = `
        <div class="question" key="${question.id}">
            <h2>${questionText}</h2>
            <div class="answers">
                ${question.answers.map((answer, index) => `
                    <button class="answer-btn" onclick="selectAnswer(${index})">
                        ${getAnswerText(question.id, index)}
                    </button>
                `).join('')}
            </div>
        </div>
    `;

    // Trigger animation
    container.style.animation = 'none';
    container.offsetHeight; // Trigger reflow
    container.style.animation = 'slideIn 0.4s ease';
}

// Handle Answer Selection
function selectAnswer(answerIndex) {
    const question = questions[currentQuestion];
    userAnswers.push({
        questionId: question.id,
        answerIndex: answerIndex,
        traits: question.answers[answerIndex].traits
    });

    currentQuestion++;

    if (currentQuestion < questions.length) {
        renderQuestion();
    } else {
        // Quiz complete - show user form (match will be calculated after gender is selected)
        showScreen('userInfo');
    }
}

// Calculate Saint Match - filters by user's gender
function calculateMatch(userGender) {
    // Collect all traits from user answers
    const userTraits = [];
    userAnswers.forEach(answer => {
        userTraits.push(...answer.traits);
    });

    // Count trait frequencies in user's answers
    const traitCounts = {};
    userTraits.forEach(trait => {
        traitCounts[trait] = (traitCounts[trait] || 0) + 1;
    });

    // Calculate trait rarity across all saints (for weighting)
    const traitFrequency = {};
    const genderFilteredSaints = saintsDatabase.filter(saint => saint.gender === userGender);

    genderFilteredSaints.forEach(saint => {
        saint.traits.forEach(trait => {
            traitFrequency[trait] = (traitFrequency[trait] || 0) + 1;
        });
    });

    // Identify common traits (appear in more than 40% of saints)
    const commonTraitThreshold = genderFilteredSaints.length * 0.4;
    const commonTraits = Object.keys(traitFrequency).filter(
        trait => traitFrequency[trait] > commonTraitThreshold
    );

    // Get user's top traits (sorted by frequency)
    const sortedTraits = Object.entries(traitCounts)
        .sort((a, b) => b[1] - a[1]);

    // Identify the user's dominant trait categories
    const userCategories = {};
    sortedTraits.forEach(([trait, count]) => {
        Object.keys(traitCategories).forEach(category => {
            if (traitCategories[category].includes(trait)) {
                userCategories[category] = (userCategories[category] || 0) + count;
            }
        });
    });

    // Get user's top 3 categories
    const topCategories = Object.entries(userCategories)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([cat]) => cat);

    console.log('User Top Traits:', sortedTraits.slice(0, 5).map(([t, c]) => `${t}(${c})`));
    console.log('User Top Categories:', topCategories);

    // Score each saint with improved algorithm
    const saintScores = genderFilteredSaints.map(saint => {
        let score = 0;
        let directMatches = 0;
        let categoryMatches = 0;
        let rareMatches = 0;

        // 1. Direct trait matches with rarity weighting
        saint.traits.forEach(trait => {
            if (traitCounts[trait]) {
                const userTraitFreq = traitCounts[trait];
                const isCommon = commonTraits.includes(trait);

                // Rare traits get higher weight
                const rarityBonus = isCommon ? 1 : 2;
                const baseScore = userTraitFreq * 2 * rarityBonus;

                score += baseScore;
                directMatches++;

                if (!isCommon) {
                    rareMatches++;
                }
            }
        });

        // 2. Bonus for matching user's top categories
        saint.traits.forEach(trait => {
            Object.keys(traitCategories).forEach(category => {
                if (traitCategories[category].includes(trait) && topCategories.includes(category)) {
                    const categoryRank = 3 - topCategories.indexOf(category);
                    score += categoryRank * 1.5;
                    categoryMatches++;
                }
            });
        });

        // 3. Bonus for having multiple direct matches
        if (directMatches >= 3) {
            score += directMatches * 1.5;
        }

        // 4. Rare trait bonus - reward saints who match rare user traits
        if (rareMatches > 0) {
            score += rareMatches * 3;
        }

        // 5. Specificity bonus - reward exact trait combinations
        const matchPercentage = directMatches / saint.traits.length;
        if (matchPercentage > 0.5) {
            score += matchPercentage * 5;
        }

        return { saint, score, directMatches, categoryMatches, rareMatches };
    });

    // Sort by score
    saintScores.sort((a, b) => b.score - a.score);

    // Debug: Show top 5 candidates
    console.log('Top 5 Candidates:');
    saintScores.slice(0, 5).forEach((s, i) => {
        console.log(`${i + 1}. ${s.saint.name} - Score: ${s.score.toFixed(1)} (Direct: ${s.directMatches}, Rare: ${s.rareMatches})`);
    });

    // Enhanced tie-breaking: consider top candidates within 20% of top score
    const topScore = saintScores[0].score;
    const closeMatches = saintScores.filter(s => s.score >= topScore * 0.8);

    let selectedMatch;
    if (closeMatches.length > 1) {
        // Among close matches, add meaningful randomization
        closeMatches.sort((a, b) => {
            // Combine direct matches, rare matches, and random factor
            const aScore = (a.directMatches * 5) + (a.rareMatches * 3) + (Math.random() * 10);
            const bScore = (b.directMatches * 5) + (b.rareMatches * 3) + (Math.random() * 10);
            return bScore - aScore;
        });
        selectedMatch = closeMatches[0];
    } else {
        selectedMatch = saintScores[0];
    }

    console.log('Selected Saint:', selectedMatch.saint.name);

    matchedSaint = selectedMatch.saint;
    matchExplanation = generateExplanation(traitCounts, matchedSaint);
}

// Generate Match Explanation
function generateExplanation(traitCounts, saint) {
    // Find top traits
    const sortedTraits = Object.entries(traitCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([trait]) => trait);

    const traitNames = {
        intellectual: "intellectual curiosity",
        contemplation: "contemplative nature",
        service: "heart for service",
        leadership: "leadership qualities",
        courage: "courage and conviction",
        faith: "deep faith",
        compassion: "compassionate spirit",
        humility: "humble approach",
        wisdom: "pursuit of wisdom",
        mysticism: "mystical spirituality",
        prayer: "devotion to prayer",
        charity: "charitable heart",
        teaching: "gift for teaching",
        perseverance: "perseverance through trials",
        love: "capacity for love",
        transformation: "openness to transformation",
        hope: "spirit of hope",
        missionary: "missionary zeal",
        nature: "love of nature",
        justice: "passion for justice"
    };

    const topTraitNames = sortedTraits
        .filter(t => traitNames[t])
        .map(t => traitNames[t])
        .slice(0, 3);

    let explanation = `Your responses reveal a beautiful combination of ${topTraitNames.join(', ')}.`;

    // Match to saint
    const saintConnections = {
        // Male Saints
        "St. Francis of Assisi": "Like St. Francis, you find God in simplicity and nature, and your compassion extends to all of creation.",
        "St. Thomas Aquinas": "Like St. Thomas Aquinas, you seek to understand faith through reason and share that understanding with others.",
        "St. John of the Cross": "Like St. John of the Cross, you seek deep union with God through contemplative prayer and are not afraid of spiritual darkness.",
        "St. Ignatius of Loyola": "Like St. Ignatius, you approach faith with discipline and discernment, seeking to find God in all things.",
        "St. Vincent de Paul": "Like St. Vincent, you see Christ in the poor and organize practical ways to serve them.",
        "St. Augustine of Hippo": "Like St. Augustine, your journey has been one of searching, transformation, and ultimately finding rest in God.",
        "St. Maximilian Kolbe": "Like St. Maximilian, you understand that true love means sacrifice, even to the point of giving everything.",
        "St. John Paul II": "Like St. John Paul II, you combine intellectual depth with pastoral warmth and a heart for youth.",
        "St. Padre Pio": "Like Padre Pio, your faith is marked by deep prayer and the gift of accompanying others in their spiritual struggles.",
        "St. Thomas More": "Like St. Thomas More, you understand that faith and integrity must guide all aspects of life, even public service.",
        "St. Martin de Porres": "Like St. Martin, you serve with humble joy, seeing no task as beneath you when it helps others.",
        "St. Peter": "Like St. Peter, you have the heart of a leader who, despite human weakness, remains steadfast in faith.",
        "St. Paul": "Like St. Paul, you have a missionary heart and the gift of communicating the faith to others.",
        "St. Joseph": "Like St. Joseph, you find holiness in quiet faithfulness, hard work, and protecting those you love.",
        "St. Patrick": "Like St. Patrick, you have the courage to bring light to dark places and persevere through hardship.",
        "St. Benedict": "Like St. Benedict, you understand the importance of balance, discipline, and community in the spiritual life.",
        "St. Francis Xavier": "Like St. Francis Xavier, you have an adventurous spirit and desire to share the Gospel across boundaries.",
        "St. Anthony of Padua": "Like St. Anthony, you have gifts for teaching and helping others find what they have lost.",
        "St. John Bosco": "Like St. John Bosco, you have a joyful heart for young people and creative approaches to education.",
        "St. Nicholas": "Like St. Nicholas, your generous heart delights in giving secretly and caring for those in need.",
        "St. George": "Like St. George, you face challenges with courage and stand as a protector of the vulnerable.",
        "St. Sebastian": "Like St. Sebastian, you have the strength to endure trials and remain faithful through persecution.",
        "St. Dominic": "Like St. Dominic, you combine intellectual pursuit with deep prayer and a love for preaching truth.",
        "St. Bernard of Clairvaux": "Like St. Bernard, you blend contemplative depth with influential leadership and reform.",
        "St. Lawrence": "Like St. Lawrence, you serve with joy and courage, seeing the poor as the true treasures of the Church.",
        "St. Jude Thaddeus": "Like St. Jude, you bring hope to hopeless situations and persist in faithful intercession.",
        "St. John Vianney": "Like the Cure of Ars, you find holiness in humble service and tireless dedication to souls.",
        "St. Michael the Archangel": "Like St. Michael, you stand firm against evil and fight for justice and truth.",
        "St. Raphael the Archangel": "Like St. Raphael, you are a healer and guide, bringing God's comfort to those who journey.",

        // Female Saints
        "St. Teresa of Calcutta": "Like Mother Teresa, your heart aches for those who suffer, and you find Christ in serving the poorest of the poor.",
        "St. Joan of Arc": "Like St. Joan, you have the courage to stand firm in your convictions, even when facing opposition.",
        "St. Therese of Lisieux": "Like the Little Flower, you understand that small acts of love can transform the world.",
        "St. Teresa of Avila": "Like St. Teresa, you combine deep mystical prayer with practical action and reform.",
        "St. Catherine of Siena": "Like St. Catherine, you combine contemplative prayer with bold action for the good of the Church.",
        "St. Elizabeth of Hungary": "Like St. Elizabeth, your noble spirit is expressed through radical generosity to the poor.",
        "St. Mary Magdalene": "Like St. Mary Magdalene, you are a devoted follower who has experienced the transforming power of Christ's love.",
        "St. Clare of Assisi": "Like St. Clare, you embrace simplicity and poverty while remaining steadfast in contemplative prayer.",
        "St. Scholastica": "Like St. Scholastica, you value deep spiritual friendship and devoted community life.",
        "St. Cecilia": "Like St. Cecilia, you use your gifts to glorify God and remain faithful even unto death.",
        "St. Bernadette": "Like St. Bernadette, you approach God with childlike simplicity and humble obedience.",
        "St. Edith Stein": "Like St. Edith Stein, you combine intellectual depth with contemplative spirituality and courageous witness.",
        "St. Faustina Kowalska": "Like St. Faustina, you are a vessel of God's mercy, called to spread trust in His divine love.",
        "St. Gianna Molla": "Like St. Gianna, you understand that love sometimes requires the ultimate sacrifice for those we cherish.",
        "St. Rose of Lima": "Like St. Rose, you find beauty in hidden devotion and mystical union with God.",
        "St. Rita of Cascia": "Like St. Rita, you persevere through impossible situations and find hope in forgiveness.",
        "St. Monica": "Like St. Monica, your persistent prayer and patient faith can move mountains.",
        "St. Anne": "Like St. Anne, you nurture faith in those entrusted to your care with patient, steadfast love.",
        "St. Dymphna": "Like St. Dymphna, you bring comfort and healing to those who suffer in mind and spirit.",
        "St. Louise de Marillac": "Like St. Louise, you combine organizational skill with compassionate service to those in need.",
        "St. Bridget of Sweden": "Like St. Bridget, you receive divine insights and courageously share them for the good of the Church.",
        "St. Margaret of Scotland": "Like St. Margaret, you use your position to serve the poor and reform society with charity.",
        "St. Hildegard of Bingen": "Like St. Hildegard, you are a renaissance soul - combining mysticism, music, healing, and wisdom.",
        "St. Kateri Tekakwitha": "Like St. Kateri, your faith blossoms beautifully despite persecution and hardship.",
        "St. Josephine Bakhita": "Like St. Josephine, you have found freedom in Christ and live as a witness to His transforming grace."
    };

    if (saintConnections[saint.name]) {
        explanation += " " + saintConnections[saint.name];
    } else {
        // Generic explanation based on saint's known for
        explanation += ` ${saint.name} exemplifies these same qualities through their life of ${saint.knownFor.toLowerCase()}. Their example can guide and inspire your own spiritual journey.`;
    }

    return explanation;
}

// Reveal Result - called when user selects gender
async function revealResult(gender) {
    // Show loading state
    showScreen('userInfo');
    const userInfoScreen = document.getElementById('userInfo');

    // Get translated loading text
    const analyzingText = currentLang === 'es'
        ? 'Analizando tu camino espiritual con IA...'
        : 'Analyzing your spiritual journey with AI...';
    const waitText = currentLang === 'es'
        ? 'Esto puede tomar unos momentos'
        : 'This may take a few moments';

    userInfoScreen.innerHTML = `
        <div class="ai-loading">
            <div class="spinner"></div>
            <p>${analyzingText}</p>
            <p style="font-size: 0.9em; color: #999; margin-top: 10px;">${waitText}</p>
        </div>
    `;

    try {
        // Calculate match based on user's gender (matches with saint of same gender)
        calculateMatch(gender);

        // Get top 5 candidates for AI analysis
        const userTraits = [];
        userAnswers.forEach(answer => {
            userTraits.push(...answer.traits);
        });

        const traitCounts = {};
        userTraits.forEach(trait => {
            traitCounts[trait] = (traitCounts[trait] || 0) + 1;
        });

        const traitFrequency = {};
        const genderFilteredSaints = saintsDatabase.filter(saint => saint.gender === gender);

        genderFilteredSaints.forEach(saint => {
            saint.traits.forEach(trait => {
                traitFrequency[trait] = (traitFrequency[trait] || 0) + 1;
            });
        });

        const commonTraitThreshold = genderFilteredSaints.length * 0.4;
        const commonTraits = Object.keys(traitFrequency).filter(
            trait => traitFrequency[trait] > commonTraitThreshold
        );

        const sortedTraits = Object.entries(traitCounts)
            .sort((a, b) => b[1] - a[1]);

        const userCategories = {};
        sortedTraits.forEach(([trait, count]) => {
            Object.keys(traitCategories).forEach(category => {
                if (traitCategories[category].includes(trait)) {
                    userCategories[category] = (userCategories[category] || 0) + count;
                }
            });
        });

        const topCategories = Object.entries(userCategories)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([cat]) => cat);

        const saintScores = genderFilteredSaints.map(saint => {
            let score = 0;
            let directMatches = 0;
            let rareMatches = 0;

            saint.traits.forEach(trait => {
                if (traitCounts[trait]) {
                    const userTraitFreq = traitCounts[trait];
                    const isCommon = commonTraits.includes(trait);
                    const rarityBonus = isCommon ? 1 : 2;
                    const baseScore = userTraitFreq * 2 * rarityBonus;
                    score += baseScore;
                    directMatches++;
                    if (!isCommon) {
                        rareMatches++;
                    }
                }
            });

            saint.traits.forEach(trait => {
                Object.keys(traitCategories).forEach(category => {
                    if (traitCategories[category].includes(trait) && topCategories.includes(category)) {
                        const categoryRank = 3 - topCategories.indexOf(category);
                        score += categoryRank * 1.5;
                    }
                });
            });

            if (directMatches >= 3) {
                score += directMatches * 1.5;
            }

            if (rareMatches > 0) {
                score += rareMatches * 3;
            }

            const matchPercentage = directMatches / saint.traits.length;
            if (matchPercentage > 0.5) {
                score += matchPercentage * 5;
            }

            return { saint, score, directMatches, rareMatches };
        });

        saintScores.sort((a, b) => b.score - a.score);
        const topCandidates = saintScores.slice(0, 5);

        // Call AI endpoint with timeout
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

            const response = await fetch('/api/ai-match', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userAnswers,
                    topCandidates: topCandidates.map(c => ({
                        saint: {
                            name: c.saint.name,
                            knownFor: c.saint.knownFor,
                            patronOf: c.saint.patronOf,
                            dates: c.saint.dates
                        },
                        score: c.score
                    })),
                    userGender: gender
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const aiResult = await response.json();

            if (aiResult.success && aiResult.saintName) {
                // Find the matched saint from our database
                const aiMatchedSaint = saintsDatabase.find(s =>
                    s.name.toLowerCase().includes(aiResult.saintName.toLowerCase()) ||
                    aiResult.saintName.toLowerCase().includes(s.name.toLowerCase())
                );

                if (aiMatchedSaint) {
                    matchedSaint = aiMatchedSaint;
                    // Use AI-generated explanation
                    matchExplanation = aiResult.explanation || generateExplanation(traitCounts, matchedSaint);
                    if (aiResult.inspiration) {
                        matchExplanation += ' ' + aiResult.inspiration;
                    }
                    console.log('✅ AI match successful:', matchedSaint.name);
                } else {
                    // Fallback to original match if AI saint not found
                    console.warn('AI matched saint not found in database, using original match');
                }
            } else {
                console.warn('AI matching failed, using original algorithm');
            }
        } catch (aiError) {
            if (aiError.name === 'AbortError') {
                console.warn('⏱️ AI request timed out after 10 seconds, using original algorithm');
            } else {
                console.error('AI matching error:', aiError);
            }
            // Fallback to original algorithm already calculated by calculateMatch()
        }
    } catch (error) {
        console.error('Error in matching process:', error);
        // Ensure we have a fallback match
        if (!matchedSaint) {
            console.warn('No match found, recalculating...');
            calculateMatch(gender);
        }
    }

    // Display results
    displayResults();
}

// Display Results
function displayResults() {
    // Get translated saint fields
    const knownFor = getSaintField(matchedSaint, 'knownFor');
    const patronOf = getSaintField(matchedSaint, 'patronOf');
    const feastDayLabel = currentLang === 'es' ? 'Día de Fiesta' : 'Feast Day';

    document.getElementById('resultSaintName').textContent = matchedSaint.name;
    document.getElementById('resultFeastDay').textContent = `${feastDayLabel}: ${matchedSaint.feastDay}`;
    document.getElementById('resultKnownFor').textContent = knownFor;
    document.getElementById('resultPatronOf').textContent = patronOf;
    document.getElementById('resultDates').textContent = matchedSaint.dates;
    document.getElementById('resultOrigin').textContent = matchedSaint.origin;
    document.getElementById('resultExplanation').textContent = matchExplanation;

    showScreen('results');
}

// Retake Quiz
function retakeQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    matchedSaint = null;
    matchExplanation = "";
    showScreen('landing');
}

// Show Screen Helper
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0);
}
