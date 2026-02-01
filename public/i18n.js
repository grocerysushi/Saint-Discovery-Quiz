// Internationalization (i18n) Utility for Saint Discovery Quiz
// Supports English (en) and Spanish (es)

const i18n = (function() {
    let currentLang = 'en';
    let translations = {};
    let saintTranslations = {};
    let isInitialized = false;

    // Detect language from URL path
    function detectLanguage() {
        const path = window.location.pathname;
        if (path.startsWith('/es/') || path === '/es') {
            return 'es';
        }
        return 'en';
    }

    // Get the base path for the current language
    function getBasePath() {
        return currentLang === 'en' ? '' : `/${currentLang}`;
    }

    // Load JSON file
    async function loadJSON(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                console.warn(`Failed to load translation: ${url}`);
                return {};
            }
            return await response.json();
        } catch (error) {
            console.warn(`Error loading translation: ${url}`, error);
            return {};
        }
    }

    // Initialize i18n system
    async function init(lang = null) {
        currentLang = lang || detectLanguage();

        // Load UI translations
        const uiUrl = `/locales/${currentLang}.json`;
        translations = await loadJSON(uiUrl);

        // Load saint translations (only for non-English)
        if (currentLang !== 'en') {
            const saintsUrl = `/locales/saints/${currentLang}.json`;
            saintTranslations = await loadJSON(saintsUrl);
        }

        isInitialized = true;

        // Set document lang attribute
        document.documentElement.lang = currentLang;

        return currentLang;
    }

    // Get translated string with optional variable substitution
    // Usage: t('quiz.question1') or t('results.matchedWith', { name: 'St. Francis' })
    function t(key, replacements = {}) {
        if (!isInitialized) {
            console.warn('i18n not initialized. Call i18n.init() first.');
            return key;
        }

        // Navigate nested keys like 'quiz.questions.q1'
        const keys = key.split('.');
        let value = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Key not found, return key itself as fallback
                return key;
            }
        }

        if (typeof value !== 'string') {
            return key;
        }

        // Replace variables like {name} with provided values
        return value.replace(/\{(\w+)\}/g, (match, varName) => {
            return replacements[varName] !== undefined ? replacements[varName] : match;
        });
    }

    // Get translated saint data
    // Returns object with translated fields or original saint data if no translation exists
    function getSaint(saintName) {
        if (currentLang === 'en' || !saintTranslations[saintName]) {
            return null; // Use original data
        }
        return saintTranslations[saintName];
    }

    // Get saint field with translation fallback
    function getSaintField(saint, field) {
        const translation = getSaint(saint.name);
        if (translation && translation[field]) {
            return translation[field];
        }
        return saint[field];
    }

    // Format date according to current locale
    function formatDate(date, options = {}) {
        const defaultOptions = {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        };
        const locale = currentLang === 'es' ? 'es-ES' : 'en-US';
        return new Date(date).toLocaleDateString(locale, { ...defaultOptions, ...options });
    }

    // Get current language
    function getLang() {
        return currentLang;
    }

    // Check if language is RTL (for future languages)
    function isRTL() {
        return false; // Neither English nor Spanish is RTL
    }

    // Get URL for a different language version of current page
    function getLanguageUrl(targetLang) {
        const path = window.location.pathname;
        const basePath = path.replace(/^\/(es|en)\//, '/').replace(/^\/(es|en)$/, '/');

        if (targetLang === 'en') {
            return basePath || '/';
        }
        return `/${targetLang}${basePath === '/' ? '/' : basePath}`;
    }

    // Update all elements with data-i18n attribute
    function translatePage() {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translated = t(key);
            if (translated !== key) {
                el.textContent = translated;
            }
        });

        // Update elements with data-i18n-placeholder
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            const translated = t(key);
            if (translated !== key) {
                el.placeholder = translated;
            }
        });

        // Update elements with data-i18n-title
        const titles = document.querySelectorAll('[data-i18n-title]');
        titles.forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            const translated = t(key);
            if (translated !== key) {
                el.title = translated;
            }
        });

        // Update elements with data-i18n-aria-label
        const ariaLabels = document.querySelectorAll('[data-i18n-aria-label]');
        ariaLabels.forEach(el => {
            const key = el.getAttribute('data-i18n-aria-label');
            const translated = t(key);
            if (translated !== key) {
                el.setAttribute('aria-label', translated);
            }
        });
    }

    return {
        init,
        t,
        getSaint,
        getSaintField,
        formatDate,
        getLang,
        isRTL,
        getBasePath,
        getLanguageUrl,
        translatePage,
        detectLanguage
    };
})();

// Export for use in modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = i18n;
}
