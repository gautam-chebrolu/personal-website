// utils.js — Shared utility functions
// Extracted for testability; used by router.js and available for other modules.

/**
 * Convert any YouTube URL format into a standard embed URL.
 * Returns the original string if it doesn't match a known YouTube pattern.
 */
function getYouTubeEmbedUrl(url) {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url;
}

/**
 * Escape HTML special characters to prevent XSS when injecting into the DOM.
 */
function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

/**
 * Build metadata field markup from a visual item's meta object.
 * Returns an HTML string of <dt>/<dd> pairs for non-empty fields.
 */
function buildMetaFields(meta) {
    return [
        ['Camera', meta?.camera],
        ['Aperture', meta?.aperture],
        ['Focal Length', meta?.focalLength],
        ['Location', meta?.location],
        ['Date', meta?.date],
    ]
        .filter(([, val]) => val)
        .map(([label, val]) => `<dt>${escapeHTML(label)}</dt><dd>${escapeHTML(val)}</dd>`)
        .join('');
}

/**
 * Validate that a project object has the required fields.
 */
function validateProject(project) {
    const errors = [];
    if (!project.title) errors.push('missing title');
    if (!project.slug) errors.push('missing slug');
    if (!project.category) errors.push('missing category');
    if (!project.image) errors.push('missing image');
    if (!project.role) errors.push('missing role');
    if (!project.year) errors.push('missing year');
    return { valid: errors.length === 0, errors };
}

/**
 * Validate that a visual item has the required fields.
 */
function validateVisualItem(item) {
    const errors = [];
    if (!item.title) errors.push('missing title');
    if (!item.category) errors.push('missing category');
    if (!item.image) errors.push('missing image');
    const validCategories = ['concert', 'people', 'event', 'travel', 'product', 'graphic-design', 'video'];
    if (item.category && !validCategories.includes(item.category)) {
        errors.push(`invalid category: ${item.category}`);
    }
    const validSizes = ['standard', 'wide', 'tall'];
    if (item.size && !validSizes.includes(item.size)) {
        errors.push(`invalid size: ${item.size}`);
    }
    return { valid: errors.length === 0, errors };
}

/**
 * Find a project by slug from a projects array.
 */
function findProjectBySlug(projects, slug) {
    return projects.find(p => p.slug === slug) || null;
}

/**
 * Parse a hash route into its component parts.
 * Returns { type: 'view'|'project', value: string }
 */
function parseRoute(hash) {
    const cleaned = (hash || '').replace(/^#/, '') || 'work';
    if (cleaned.startsWith('project/')) {
        return { type: 'project', value: cleaned.split('/').slice(1).join('/') };
    }
    return { type: 'view', value: cleaned };
}

// Export for testing (Node.js / Jest)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getYouTubeEmbedUrl,
        escapeHTML,
        buildMetaFields,
        validateProject,
        validateVisualItem,
        findProjectBySlug,
        parseRoute
    };
}
