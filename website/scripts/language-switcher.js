document.addEventListener('DOMContentLoaded', () => {
    const loadLanguage = async (lang = 'en') => {
        try {
            const response = await fetch(`lang/${lang}.json?t=${Date.now()}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const translations = await response.json();
            
            // Update all translatable elements
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.dataset.translate;
                if(translations[key]) {
                    if(element.tagName === 'INPUT') {
                        element.placeholder = translations[key];
                    } else {
                        element.innerHTML = translations[key]; // Preserve HTML
                    }
                }
            });
            
            // Update selected language
            document.getElementById('languageSelect').value = lang;
            
        } catch (error) {
            console.error('Language load error:', error);
        }
    };

    // Initialize with default language
    loadLanguage();

    // Event listener for language selector
    document.getElementById('languageSelect').addEventListener('change', (e) => {
        loadLanguage(e.target.value);
    });
});