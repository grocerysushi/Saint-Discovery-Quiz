/**
 * Static Saint Pages Generator
 * Generates individual HTML pages for all saints in the database
 *
 * Run with: node generate-saint-pages.js
 */

const fs = require('fs');
const path = require('path');

// Read the saints data file
const saintsDataPath = path.join(__dirname, 'public', 'saints-data-enriched.js');
const saintsDataContent = fs.readFileSync(saintsDataPath, 'utf8');

// Parse the file to extract saintsDatabase and traitCategories
// The file contains: const saintsDatabase = [...]; and const traitCategories = {...};
// We'll modify it to return these as an object and use Function constructor
const modifiedContent = saintsDataContent + '\n return { saintsDatabase, traitCategories };';
const dataFunction = new Function(modifiedContent);
const { saintsDatabase, traitCategories } = dataFunction();

const SITE_URL = 'https://saintdiscoveryquiz.com';
const OUTPUT_DIR = path.join(__dirname, 'public', 'saints');

/**
 * Convert saint name to URL-friendly slug
 * "St. Francis of Assisi" -> "st-francis-of-assisi"
 * "Bl. Carlo Acutis" -> "bl-carlo-acutis"
 */
function slugify(name) {
    return name
        .toLowerCase()
        .replace(/\./g, '')           // Remove periods
        .replace(/['']/g, '')         // Remove apostrophes
        .replace(/[^\w\s-]/g, '')     // Remove special characters
        .replace(/\s+/g, '-')         // Replace spaces with hyphens
        .replace(/-+/g, '-')          // Replace multiple hyphens with single
        .trim();
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Get primary trait category for a saint
 */
function getPrimaryCategory(saint) {
    const saintTraits = saint.traits || [];
    let bestMatch = { category: 'courageous', count: 0 };

    for (const [category, categoryTraits] of Object.entries(traitCategories)) {
        const matchCount = saintTraits.filter(trait =>
            categoryTraits.includes(trait.toLowerCase())
        ).length;
        if (matchCount > bestMatch.count) {
            bestMatch = { category, count: matchCount };
        }
    }
    return bestMatch.category;
}

/**
 * Find related saints (same primary category, excluding current)
 */
function getRelatedSaints(saint, count = 4) {
    const primaryCategory = getPrimaryCategory(saint);
    const categoryTraits = traitCategories[primaryCategory] || [];

    return saintsDatabase
        .filter(s => s.name !== saint.name)
        .map(s => ({
            saint: s,
            matchCount: (s.traits || []).filter(t =>
                categoryTraits.includes(t.toLowerCase())
            ).length
        }))
        .filter(item => item.matchCount > 0)
        .sort((a, b) => b.matchCount - a.matchCount)
        .slice(0, count)
        .map(item => item.saint);
}

/**
 * Format trait name for display
 */
function formatTrait(trait) {
    return trait
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Generate JSON-LD structured data for a saint (Person + BreadcrumbList + Article + FAQPage)
 */
function generateJsonLd(saint, slug) {
    const century = extractCentury(saint.dates);

    // Enhanced Person schema
    const personData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": saint.name,
        "alternateName": saint.name.replace('St.', 'Saint').replace('Bl.', 'Blessed'),
        "description": saint.knownFor,
        "jobTitle": saint.patronOf ? `Patron Saint of ${saint.patronOf}` : undefined,
        "url": `${SITE_URL}/saints/${slug}.html`,
        "sameAs": [],
        "nationality": {
            "@type": "Country",
            "name": saint.origin
        },
        "knowsAbout": saint.traits || [],
        "memberOf": {
            "@type": "Organization",
            "name": "Catholic Church"
        },
        "isPartOf": {
            "@type": "WebSite",
            "name": "Saint Discovery Quiz",
            "url": SITE_URL
        }
    };

    // Parse dates if available
    if (saint.dates) {
        const dateMatch = saint.dates.match(/(\d{1,4})(?:\s*[-–]\s*(\d{1,4}))?/);
        if (dateMatch) {
            if (dateMatch[2]) {
                personData.birthDate = dateMatch[1];
                personData.deathDate = dateMatch[2];
            } else if (saint.dates.toLowerCase().includes('d.')) {
                personData.deathDate = dateMatch[1];
            }
        }
    }

    // Remove undefined values
    Object.keys(personData).forEach(key => {
        if (personData[key] === undefined) delete personData[key];
    });

    // BreadcrumbList schema
    const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": SITE_URL
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "All Saints",
                "item": `${SITE_URL}/all-saints.html`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": saint.name,
                "item": `${SITE_URL}/saints/${slug}.html`
            }
        ]
    };

    // Article schema for better search appearance
    const articleData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": `${saint.name} - Life, Feast Day & Patronage`,
        "description": `${saint.knownFor}. Patron of ${saint.patronOf}. Feast day: ${saint.feastDay}.`,
        "author": {
            "@type": "Organization",
            "name": "Saint Discovery Quiz",
            "url": SITE_URL
        },
        "publisher": {
            "@type": "Organization",
            "name": "Saint Discovery Quiz",
            "url": SITE_URL,
            "logo": {
                "@type": "ImageObject",
                "url": `${SITE_URL}/favicon.svg`
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${SITE_URL}/saints/${slug}.html`
        },
        "image": `${SITE_URL}/favicon.svg`,
        "articleSection": "Catholic Saints",
        "keywords": [saint.name, "Catholic saint", "patron saint", saint.patronOf, ...(saint.traits || [])].filter(Boolean).join(", "),
        "about": {
            "@type": "Person",
            "name": saint.name
        }
    };

    // FAQPage schema for common questions about the saint
    const faqData = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `When is ${saint.name}'s feast day?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${saint.name}'s feast day is celebrated on ${saint.feastDay}.`
                }
            },
            {
                "@type": "Question",
                "name": `What is ${saint.name} the patron saint of?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${saint.name} is the patron saint of ${saint.patronOf}.`
                }
            },
            {
                "@type": "Question",
                "name": `What is ${saint.name} known for?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": saint.knownFor
                }
            },
            {
                "@type": "Question",
                "name": `Where was ${saint.name} from?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${saint.name} was from ${saint.origin}${saint.dates ? ` and lived during ${saint.dates}` : ''}.`
                }
            }
        ]
    };

    // Return array of all schemas
    return JSON.stringify([personData, breadcrumbData, articleData, faqData], null, 2);
}

/**
 * Extract century from dates string
 */
function extractCentury(dates) {
    if (!dates) return null;
    const match = dates.match(/(\d{1,4})/);
    if (match) {
        const year = parseInt(match[1]);
        if (year < 100) return '1st century';
        const century = Math.ceil(year / 100);
        const suffix = century === 1 ? 'st' : century === 2 ? 'nd' : century === 3 ? 'rd' : 'th';
        return `${century}${suffix} century`;
    }
    return null;
}

/**
 * Determine saint type from name prefix
 */
function getSaintType(name) {
    if (name.startsWith('Bl.')) return 'Blessed';
    if (name.startsWith('St.')) return 'Saint';
    if (name.startsWith('Sts.')) return 'Saints';
    return 'Saint';
}

/**
 * Generate the full HTML page for a saint
 */
function generateHTML(saint) {
    const slug = slugify(saint.name);
    const escapedName = escapeHtml(saint.name);
    const escapedKnownFor = escapeHtml(saint.knownFor);
    const escapedPatronOf = escapeHtml(saint.patronOf);
    const relatedSaints = getRelatedSaints(saint);
    const primaryCategory = getPrimaryCategory(saint);
    const century = extractCentury(saint.dates);
    const saintType = getSaintType(saint.name);

    // Create comprehensive meta description
    const metaDescription = `Discover ${saint.name}${century ? ` (${century})` : ''}: ${saint.knownFor}. Feast day: ${saint.feastDay}. Patron saint of ${saint.patronOf}. Learn about their life, virtues, quotes, and spiritual legacy.`;

    // Create expanded keywords with multiple variations
    const keywordsList = [
        saint.name,
        saint.name.replace('St.', 'Saint').replace('Bl.', 'Blessed'),
        `${saint.name} biography`,
        `${saint.name} feast day`,
        `${saint.name} patron saint`,
        `${saint.name} quotes`,
        `${saint.name} prayer`,
        'Catholic saint',
        'patron saint',
        `patron saint of ${saint.patronOf}`,
        saint.patronOf,
        ...(saint.traits || []).map(t => t),
        ...(saint.traits || []).map(t => `${t} saint`),
        saint.origin,
        `saints from ${saint.origin}`,
        century,
        `${century} saints`,
        `${saintType.toLowerCase()} ${saint.name.replace(/^(St\.|Bl\.|Sts\.)\s*/, '')}`,
        'Catholic Church',
        'Christian saints',
        'holy men and women',
        'inspirational saints',
        'saint biography',
        'feast day calendar',
        'patron saints list'
    ].filter(Boolean);

    const keywords = [...new Set(keywordsList)].join(', ');

    const traitsHtml = (saint.traits || [])
        .map(trait => `<span class="trait-tag">${formatTrait(trait)}</span>`)
        .join('\n                        ');

    const quotesHtml = (saint.quotes || [])
        .map(quote => `<blockquote class="saint-quote">"${escapeHtml(quote)}"</blockquote>`)
        .join('\n                    ');

    const relatedHtml = relatedSaints
        .map(s => {
            const relSlug = slugify(s.name);
            return `
                    <a href="/saints/${relSlug}.html" class="related-saint-card">
                        <h4>${escapeHtml(s.name)}</h4>
                        <span class="feast-day">${s.feastDay}</span>
                        <p>${escapeHtml(s.knownFor)}</p>
                    </a>`;
        })
        .join('');

    return `<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-C75CMC27YN"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-C75CMC27YN');
    </script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Primary Meta Tags -->
    <title>${escapedName} - Life, Feast Day & Patronage | Saint Discovery Quiz</title>
    <meta name="title" content="${escapedName} - Life, Feast Day & Patronage | Saint Discovery Quiz">
    <meta name="description" content="${escapeHtml(metaDescription)}">
    <meta name="keywords" content="${escapeHtml(keywords)}">
    <meta name="author" content="Saint Discovery Quiz">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="bingbot" content="index, follow">
    <meta name="revisit-after" content="7 days">
    <meta name="rating" content="General">
    <meta name="distribution" content="global">
    <meta name="language" content="English">
    <meta name="coverage" content="Worldwide">
    <meta name="classification" content="Religion, Catholic Saints, Christianity">
    <meta name="subject" content="${escapedName} - Catholic Saint Biography and Patronage">
    <meta name="abstract" content="Complete guide to ${escapedName}: biography, feast day (${saint.feastDay}), patronage, virtues, and inspirational quotes.">
    <meta name="topic" content="Catholic Saints, ${escapedName}, Christian History">
    <meta name="summary" content="${escapeHtml(saint.knownFor)}. Patron of ${escapeHtml(saint.patronOf)}.">

    <!-- Geographic Meta Tags -->
    <meta name="geo.region" content="${escapeHtml(saint.origin)}">
    <meta name="geo.placename" content="${escapeHtml(saint.origin)}">

    <!-- Canonical URL -->
    <link rel="canonical" href="${SITE_URL}/saints/${slug}.html">
    <link rel="alternate" hreflang="en" href="${SITE_URL}/saints/${slug}.html">
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/saints/${slug}.html">

    <!-- Favicon & PWA -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="apple-touch-icon" href="/favicon.svg">
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="#8B4513">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="brown-translucent">
    <meta name="apple-mobile-web-app-title" content="${escapedName}">
    <meta name="application-name" content="Saint Discovery Quiz">
    <meta name="msapplication-TileColor" content="#8B4513">
    <meta name="msapplication-config" content="/browserconfig.xml">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="profile">
    <meta property="og:url" content="${SITE_URL}/saints/${slug}.html">
    <meta property="og:title" content="${escapedName} - Life, Feast Day & Patronage">
    <meta property="og:description" content="${escapeHtml(metaDescription)}">
    <meta property="og:image" content="${SITE_URL}/favicon.svg">
    <meta property="og:image:alt" content="${escapedName} - Catholic Saint">
    <meta property="og:site_name" content="Saint Discovery Quiz">
    <meta property="og:locale" content="en_US">
    <meta property="profile:first_name" content="${escapeHtml(saint.name.replace(/^(St\.|Bl\.|Sts\.)\s*/, '').split(' ')[0])}">
    <meta property="article:author" content="Saint Discovery Quiz">
    <meta property="article:section" content="Catholic Saints">
    <meta property="article:tag" content="${escapedName}">
    <meta property="article:tag" content="Catholic Saint">
    <meta property="article:tag" content="${escapeHtml(saint.patronOf)}">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@SaintDiscovery">
    <meta name="twitter:creator" content="@SaintDiscovery">
    <meta name="twitter:title" content="${escapedName} - Catholic Saint Biography">
    <meta name="twitter:description" content="${escapeHtml(metaDescription)}">
    <meta name="twitter:image" content="${SITE_URL}/favicon.svg">
    <meta name="twitter:image:alt" content="${escapedName}">

    <!-- Pinterest -->
    <meta property="pin:description" content="${escapedName}: ${escapeHtml(saint.knownFor)}. Feast day: ${saint.feastDay}. Patron of ${escapeHtml(saint.patronOf)}.">
    <meta property="pin:media" content="${SITE_URL}/favicon.svg">

    <!-- Dublin Core Metadata -->
    <meta name="DC.title" content="${escapedName}">
    <meta name="DC.creator" content="Saint Discovery Quiz">
    <meta name="DC.subject" content="Catholic Saints, ${escapedName}, Christian Biography">
    <meta name="DC.description" content="${escapeHtml(metaDescription)}">
    <meta name="DC.type" content="Text">
    <meta name="DC.format" content="text/html">
    <meta name="DC.language" content="en">

    <!-- Structured Data -->
    <script type="application/ld+json">
    ${generateJsonLd(saint, slug)}
    </script>

    <!-- Fonts & Styles -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Open+Sans:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/styles.css">
    <style>
        .saint-page-header {
            text-align: center;
            background: linear-gradient(135deg, var(--primary-navy) 0%, var(--primary-navy-light) 100%);
            border-radius: 16px;
            padding: 50px 40px;
            margin-bottom: 30px;
            color: white;
        }

        .saint-page-header .decorative-cross {
            color: var(--gold);
            margin-bottom: 15px;
        }

        .saint-page-header h1 {
            font-size: 2.8rem;
            margin-bottom: 20px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .feast-day-badge {
            display: inline-block;
            background: var(--gold);
            color: var(--primary-navy);
            padding: 10px 25px;
            border-radius: 25px;
            font-weight: 600;
            font-size: 1rem;
        }

        .nav-links {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 25px;
            flex-wrap: wrap;
        }

        .nav-links a {
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            padding: 8px 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 20px;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }

        .nav-links a:hover {
            background: rgba(255, 255, 255, 0.15);
            border-color: rgba(255, 255, 255, 0.5);
        }

        .saint-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
            margin-bottom: 30px;
        }

        .info-card {
            background: white;
            border-radius: 12px;
            padding: 25px;
            box-shadow: var(--shadow);
            border-left: 4px solid var(--gold);
        }

        .info-card.full-width {
            grid-column: 1 / -1;
        }

        .info-card h2 {
            font-size: 0.85rem;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--primary-navy);
            margin-bottom: 12px;
            font-weight: 600;
            font-family: 'Open Sans', sans-serif;
        }

        .info-card p {
            color: var(--text-medium);
            line-height: 1.7;
            font-size: 1.05rem;
        }

        .traits-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .trait-tag {
            background: var(--cream);
            color: var(--primary-navy);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 500;
        }

        .quotes-section {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: var(--shadow);
            margin-bottom: 30px;
        }

        .quotes-section h2 {
            font-size: 1.5rem;
            color: var(--primary-navy);
            margin-bottom: 20px;
            text-align: center;
        }

        .saint-quote {
            background: var(--cream-light);
            border-left: 4px solid var(--gold);
            padding: 20px 25px;
            margin: 15px 0;
            border-radius: 0 12px 12px 0;
            font-family: 'Cormorant Garamond', serif;
            font-style: italic;
            font-size: 1.15rem;
            color: var(--primary-navy);
            line-height: 1.6;
        }

        .related-saints {
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: var(--shadow);
            margin-bottom: 30px;
        }

        .related-saints h2 {
            font-size: 1.5rem;
            color: var(--primary-navy);
            margin-bottom: 20px;
            text-align: center;
        }

        .related-saints-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .related-saint-card {
            background: var(--cream-light);
            padding: 20px;
            border-radius: 12px;
            text-decoration: none;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }

        .related-saint-card:hover {
            transform: translateY(-3px);
            box-shadow: var(--shadow);
            border-color: var(--gold);
        }

        .related-saint-card h4 {
            color: var(--primary-navy);
            font-size: 1.1rem;
            margin-bottom: 8px;
        }

        .related-saint-card .feast-day {
            display: inline-block;
            background: var(--gold);
            color: var(--primary-navy);
            padding: 3px 10px;
            border-radius: 12px;
            font-size: 0.75rem;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .related-saint-card p {
            color: var(--text-medium);
            font-size: 0.9rem;
            line-height: 1.5;
        }

        .action-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
            margin-bottom: 30px;
        }

        .btn-primary, .btn-secondary {
            display: inline-block;
            text-decoration: none;
            text-align: center;
        }

        /* Home Button */
        .home-btn {
            position: fixed;
            top: 20px;
            left: 20px;
            width: 50px;
            height: 50px;
            background: var(--primary-navy);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-lg);
            transition: all 0.3s ease;
            z-index: 1000;
            text-decoration: none;
        }

        .home-btn:hover {
            background: var(--primary-navy-light);
            transform: scale(1.1);
        }

        .home-btn svg {
            width: 24px;
            height: 24px;
            fill: white;
        }

        @media (max-width: 768px) {
            .saint-content {
                grid-template-columns: 1fr;
            }

            .saint-page-header {
                padding: 35px 25px;
            }

            .saint-page-header h1 {
                font-size: 2rem;
            }

            .nav-links {
                gap: 10px;
            }

            .nav-links a {
                padding: 6px 12px;
                font-size: 0.8rem;
            }

            .action-buttons {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>
</head>

<body>
    <!-- Home Button -->
    <a href="/" class="home-btn" title="Back to Quiz" aria-label="Back to Quiz">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
    </a>

    <main role="main" class="container" style="max-width: 900px;">
        <header class="saint-page-header">
            <div class="decorative-cross">&#10013;</div>
            <h1>${escapedName}</h1>
            <span class="feast-day-badge">Feast Day: ${saint.feastDay}</span>
            <nav class="nav-links" aria-label="Site navigation">
                <a href="/">Home</a>
                <a href="/">Take Quiz</a>
                <a href="/all-saints.html">All Saints</a>
                <a href="/saints-by-virtue.html">By Virtue</a>
                <a href="/saints-by-century.html">By Century</a>
                <a href="/feast-day-calendar.html">Feast Calendar</a>
            </nav>
        </header>

        <section class="saint-content">
            <article class="info-card full-width">
                <h2>Biography</h2>
                <p>${escapeHtml(saint.bio || saint.knownFor)}</p>
                ${saint.funFact ? `
                <div style="margin-top: 15px; padding: 15px; background: var(--cream-light); border-radius: 8px; border-left: 3px solid var(--gold);">
                    <strong>Did you know?</strong> ${escapeHtml(saint.funFact)}
                </div>` : ''}
            </article>

            <article class="info-card">
                <h2>Patron Saint Of</h2>
                <p>${escapedPatronOf}</p>
            </article>

            <article class="info-card">
                <h2>Life & Origin</h2>
                <p><strong>Feast Day:</strong> ${escapeHtml(saint.feastDay)}</p>
                <p><strong>Lived:</strong> ${escapeHtml(saint.lived || saint.dates)}</p>
                <p><strong>Origin:</strong> ${escapeHtml(saint.origin)}</p>
            </article>

            <article class="info-card">
                <h2>Virtues & Traits</h2>
                <div class="traits-container">
                    ${traitsHtml}
                </div>
            </article>
        </section>

        ${quotesHtml ? `
        <section class="quotes-section">
            <h2>Inspirational Quotes</h2>
            ${quotesHtml}
        </section>
        ` : ''}

        ${relatedSaints.length > 0 ? `
        <section class="related-saints">
            <h2>Related Saints</h2>
            <p style="text-align: center; color: var(--text-medium); margin-bottom: 20px;">Saints who share similar virtues in the <strong>${formatTrait(primaryCategory)}</strong> category</p>
            <div class="related-saints-grid">
                ${relatedHtml}
            </div>
        </section>
        ` : ''}

        <div class="action-buttons">
            <a href="/all-saints.html" class="btn-secondary">Browse All Saints</a>
            <a href="/" class="btn-primary">Take the Quiz</a>
        </div>
    </main>
</body>

</html>`;
}

/**
 * Generate the saints directory index page
 */
function generateIndexPage() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="refresh" content="0; url=/all-saints.html">
    <link rel="canonical" href="${SITE_URL}/all-saints.html">
    <title>Saints Directory - Saint Discovery Quiz</title>
</head>
<body>
    <p>Redirecting to <a href="/all-saints.html">All Saints</a>...</p>
</body>
</html>`;
}

/**
 * Generate sitemap entries for all saints
 */
function generateSitemapEntries() {
    const today = new Date().toISOString().split('T')[0];

    return saintsDatabase.map(saint => {
        const slug = slugify(saint.name);
        return `  <url>
    <loc>${SITE_URL}/saints/${slug}.html</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    }).join('\n');
}

/**
 * Update the sitemap.xml file
 */
function updateSitemap() {
    const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
    let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

    // Check if saints entries already exist
    if (sitemapContent.includes('/saints/st-')) {
        console.log('Sitemap already contains saint pages, removing old entries...');
        // Remove existing saint page entries
        sitemapContent = sitemapContent.replace(/\s*<url>\s*<loc>https:\/\/saintdiscoveryquiz\.com\/saints\/[^<]+<\/loc>[\s\S]*?<\/url>/g, '');
    }

    // Add new entries before closing </urlset>
    const entries = generateSitemapEntries();
    sitemapContent = sitemapContent.replace(
        '</urlset>',
        `  <!-- Individual Saint Pages -->\n${entries}\n</urlset>`
    );

    fs.writeFileSync(sitemapPath, sitemapContent);
    console.log('Updated sitemap.xml with saint page URLs');
}

/**
 * Main function to generate all pages
 */
function generateAllPages() {
    console.log('Starting saint pages generation...');
    console.log(`Found ${saintsDatabase.length} saints in database`);

    // Create output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
        console.log(`Created directory: ${OUTPUT_DIR}`);
    }

    // Generate individual saint pages
    let successCount = 0;
    const slugs = [];

    for (const saint of saintsDatabase) {
        try {
            const slug = slugify(saint.name);
            const html = generateHTML(saint);
            const filePath = path.join(OUTPUT_DIR, `${slug}.html`);

            fs.writeFileSync(filePath, html);
            slugs.push({ name: saint.name, slug });
            successCount++;
        } catch (error) {
            console.error(`Error generating page for ${saint.name}:`, error.message);
        }
    }

    // Generate index page for /saints/
    const indexPath = path.join(OUTPUT_DIR, 'index.html');
    fs.writeFileSync(indexPath, generateIndexPage());
    console.log('Created saints/index.html redirect page');

    // Update sitemap
    updateSitemap();

    console.log(`\nGeneration complete!`);
    console.log(`Successfully created ${successCount} saint pages in public/saints/`);
    console.log(`\nSample pages created:`);
    slugs.slice(0, 5).forEach(({ name, slug }) => {
        console.log(`  - ${name} -> /saints/${slug}.html`);
    });
    console.log(`  ... and ${slugs.length - 5} more`);

    return slugs;
}

// Run the generator
generateAllPages();
