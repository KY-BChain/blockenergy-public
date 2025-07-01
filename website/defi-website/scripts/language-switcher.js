document.addEventListener('DOMContentLoaded', () => {
    const loadLanguage = async (lang = 'en') => {
        try {
            const response = await fetch(`lang/${lang}.json`);
            const translations = await response.json();
            
            // Update all translatable elements
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.dataset.translate;
                element.innerHTML = translations[key] || element.innerHTML;
            });

            // Update placeholders
            document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
                const key = element.dataset.translatePlaceholder;
                element.placeholder = translations[key] || element.placeholder;
            });

            // Update RTL direction
            document.documentElement.lang = lang;
            document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
            
        } catch (error) {
            console.error('Language load error:', error);
        }
    };

    // Initialize
    loadLanguage();

    // Event listener
    document.getElementById('languageSelect').addEventListener('change', (e) => {
        loadLanguage(e.target.value);
    });
});