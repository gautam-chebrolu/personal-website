// interactions.js

(function () {
    'use strict';

    // Helper to convert hex to rgb
    function hexToRgb(hex) {
        if (!hex) return '248, 248, 248';
        let c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(', ');
    }

    // Dynamically load Google Font
    function loadGoogleFont(family) {
        if (!family) return Promise.resolve();
        const id = 'gf-' + family.replace(/\s+/g, '-').toLowerCase();
        if (document.getElementById(id)) return Promise.resolve();
        
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@300;400;500;700&display=swap`;
        document.head.appendChild(link);
        
        // Return a promise that resolves when fonts are ready
        if (document.fonts && document.fonts.ready) {
            return document.fonts.ready;
        }
        return new Promise(resolve => setTimeout(resolve, 500));
    }

    // Apply design system from iframe
    async function applyDesignSystem(ds) {
        // 1. Load fonts
        const hFont = ds.typography?.suggestedFonts?.heading || 'Newsreader';
        const bFont = ds.typography?.suggestedFonts?.body || 'Albert Sans';
        
        await Promise.all([
            loadGoogleFont(hFont),
            loadGoogleFont(bFont)
        ]);

        // 2. Trigger CSS transition
        document.body.classList.add('theme-transitioning');

        // 3. Update all CSS custom properties
        const root = document.documentElement.style;
        const c = ds.colors || {};
        
        if (c.background) {
            root.setProperty('--bg', c.background);
            root.setProperty('--bg-rgb', hexToRgb(c.background));
        }
        if (c.text) root.setProperty('--text', c.text);
        if (c.textSecondary) root.setProperty('--text-secondary', c.textSecondary);
        if (c.surface) root.setProperty('--surface', c.surface);
        if (c.primary) root.setProperty('--border', c.primary); // use primary for borders/accents
        
        root.setProperty('--font-serif', `"${hFont}", serif`);
        root.setProperty('--font-sans', `"${bFont}", sans-serif`);

        // Remove transition class after animation completes
        setTimeout(() => document.body.classList.remove('theme-transitioning'), 500);
    }

    // Listen for design system from the embedded iframe
    window.addEventListener('message', (e) => {
        if (e.data?.type === 'tdop-apply' && e.data.designSystem) {
            applyDesignSystem(e.data.designSystem);
        }
    });

})();
