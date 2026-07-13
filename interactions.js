// interactions.js
// Listens for design system messages from the tdop-embed.html iframe
// and applies them to the parent site's CSS custom properties.

(function () {
    'use strict';

    // ── Helpers ────────────────────────────────────────────────────

    /** Convert a 6-digit hex color to "R, G, B" (for use in rgba()) */
    function hexToRgb(hex) {
        if (!hex || typeof hex !== 'string') return '248, 248, 248';
        const clean = hex.replace('#', '');
        const full = clean.length === 3
            ? clean.split('').map(c => c + c).join('')
            : clean;
        const n = parseInt(full, 16);
        return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(', ');
    }

    /**
     * Dynamically inject a Google Font <link> tag into <head>.
     * De-duped by a data-gf attribute on the link element.
     * Returns a Promise that resolves when document.fonts is ready.
     */
    function loadGoogleFont(family) {
        if (!family || typeof family !== 'string') return Promise.resolve();
        const id = 'gf-' + family.toLowerCase().replace(/\s+/g, '-');
        if (document.getElementById(id)) return Promise.resolve();

        const link = document.createElement('link');
        link.id   = id;
        link.rel  = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family='
            + encodeURIComponent(family)
            + ':wght@300;400;500;700&display=swap';
        document.head.appendChild(link);

        return (document.fonts && document.fonts.ready)
            ? document.fonts.ready
            : new Promise(resolve => setTimeout(resolve, 400));
    }

    // ── Nav scroll frosting ────────────────────────────────────────
    // Adds/removes .scrolled on the nav so the border fades in on scroll.

    (function initNavScroll() {
        const nav = document.getElementById('site-nav');
        if (!nav) return;
        const onScroll = () => {
            nav.classList.toggle('scrolled', window.scrollY > 8);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll(); // run once on load in case page is already scrolled
    })();

    // ── Core theme applier ─────────────────────────────────────────

    async function applyDesignSystem(ds) {
        if (!ds || !ds.colors) return;

        const c = ds.colors;
        const typo = (ds.typography && ds.typography.suggestedFonts) || {};
        const hFont = typo.heading || 'Newsreader';
        const bFont = typo.body    || 'Albert Sans';

        // 1. Pre-load both fonts before touching the DOM
        await Promise.all([
            loadGoogleFont(hFont),
            loadGoogleFont(bFont)
        ]);

        // 2. Trigger smooth cross-fade transition
        document.body.classList.add('theme-transitioning');

        // 3. Update CSS custom properties on :root
        const root = document.documentElement.style;

        if (c.background)   { root.setProperty('--bg',             c.background);          root.setProperty('--bg-rgb', hexToRgb(c.background)); }
        if (c.text)           root.setProperty('--text',            c.text);
        if (c.textSecondary)  root.setProperty('--text-secondary',  c.textSecondary);
        if (c.surface)        root.setProperty('--surface',         c.surface);
        // Use primary color as the accent/border tone
        if (c.primary)        root.setProperty('--border',          c.primary);
        // Secondary color powers section labels (Select Work, Side Projects, etc.)
        if (c.secondary)      root.setProperty('--secondary',       c.secondary);

        root.setProperty('--font-serif', '"' + hFont + '", serif');
        root.setProperty('--font-sans',  '"' + bFont + '", sans-serif');

        // 4. Clean up transition class after animation completes
        setTimeout(function () {
            document.body.classList.remove('theme-transitioning');
        }, 500);

        // 5. Forward the design system back into the embed iframe
        //    so the embed's own UI (fonts, colors) also reflects the theme.
        const iframe = document.querySelector('iframe[src="tdop-embed.html"]');
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(
                { type: 'tdop-theme', designSystem: ds },
                '*'
            );
        }
    }

    // ── postMessage listener ───────────────────────────────────────
    // The tdop-embed.html iframe sends:
    //   { type: 'tdop-apply',  designSystem: {...} }  — apply theme
    //   { type: 'tdop-resize', height: N }             — resize the iframe

    window.addEventListener('message', function (e) {
        if (!e.data) return;

        if (e.data.type === 'tdop-apply' && e.data.designSystem) {
            applyDesignSystem(e.data.designSystem);
        }
    });

})();
