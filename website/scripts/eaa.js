document.addEventListener('DOMContentLoaded', () => {
    // Initialize accessibility controls
    const contrastToggle = document.getElementById('contrastToggle');
    const textSizeToggle = document.getElementById('textSizeToggle');
    
    if (contrastToggle) {
        contrastToggle.setAttribute('aria-pressed', 'false');
        contrastToggle.addEventListener('click', () => {
            document.body.classList.toggle('high-contrast');
            const isActive = document.body.classList.contains('high-contrast');
            contrastToggle.setAttribute('aria-pressed', isActive.toString());
        });
    }
    
    if (textSizeToggle) {
        textSizeToggle.setAttribute('aria-pressed', 'false');
        textSizeToggle.addEventListener('click', () => {
            document.body.classList.toggle('large-text');
            const isActive = document.body.classList.contains('large-text');
            textSizeToggle.setAttribute('aria-pressed', isActive.toString());
        });
    }
    
    // Keyboard navigation support
    document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('user-is-tabbing');
        }
    });
    
    // Focus styles for all interactive elements
    const focusables = 'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])';
    document.querySelectorAll(focusables).forEach(el => {
        el.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--focus)';
            this.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });
});