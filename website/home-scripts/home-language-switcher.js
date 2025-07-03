const TRANSLATIONS_PATH = '../lang/home-';
let currentLanguage = 'en';

// Language configuration
const languages = {
    en: 'English',
    de: 'Deutsch',
    fr: 'Français',
    ja: '日本語',
    ko: '한국어',
    ru: 'Русский',
    ar: 'العربية',
    zh: '中文'
};

// Initialize language switcher
export function initLanguageSwitcher() {
    const savedLang = localStorage.getItem('selectedLanguage');
    const browserLang = navigator.language.slice(0, 2);
    
    // Set initial language
    currentLanguage = savedLang || (languages[browserLang] ? browserLang : 'en');
    
    // Setup dropdown
    const selector = document.getElementById('language-select');
    selector.value = currentLanguage;
    
    selector.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        localStorage.setItem('selectedLanguage', currentLanguage);
        loadTranslations();
    });
    
    loadTranslations();
}

// Load translations and update DOM
async function loadTranslations() {
    try {
        const response = await fetch(`${TRANSLATIONS_PATH}${currentLanguage}.json`);
        const translations = await response.json();
        
        // Update DOM elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = key.split('.').reduce((obj, k) => (obj || {})[k], translations);
            if (text) el.textContent = text;
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = currentLanguage;
        
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}