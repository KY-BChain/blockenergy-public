document.addEventListener('DOMContentLoaded', () => {
    const loadLanguage = async (lang = 'en') => {
        try {
            // Detect contact page
            const isContactPage = window.location.href.includes('ACR-contact.html');
            const translationFile = isContactPage 
                ? `lang/contact-${lang}.json` 
                : `lang/${lang}.json`;
            
            const response = await fetch(translationFile);
            if (!response.ok) {
                // Fallback to English if specific language not found
                if (lang !== 'en') {
                    return loadLanguage('en');
                }
                throw new Error('Language file not found');
            }
            
            const translations = await response.json();
            
            // Apply translations to elements
            document.querySelectorAll('[data-translate]').forEach(el => {
                const key = el.dataset.translate;
                if (translations[key]) {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.value = translations[key];
                    } else {
                        el.textContent = translations[key];
                    }
                }
            });
            
            // Translate placeholders
            document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
                const key = el.dataset.translatePlaceholder;
                if (translations[key]) el.placeholder = translations[key];
            });
            
            // Translate image alt texts
            document.querySelectorAll('[data-translate-alt]').forEach(el => {
                const key = el.dataset.translateAlt;
                if (translations[key]) el.alt = translations[key];
            });
            
            // Set RTL direction for Arabic
            document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.lang = lang;
            
        } catch (error) {
            console.error('Language load error:', error);
            // Final fallback to English
            if (lang !== 'en') loadLanguage('en');
        }
    };

    // Initialize language
    const savedLang = localStorage.getItem('selectedLanguage') || 'en';
    const languageSelect = document.getElementById('languageSelect');
    
    if (languageSelect) {
        languageSelect.value = savedLang;
        loadLanguage(savedLang);
        
        languageSelect.addEventListener('change', (e) => {
            const lang = e.target.value;
            localStorage.setItem('selectedLanguage', lang);
            loadLanguage(lang);
        });
    }
});