const {
    getYouTubeEmbedUrl,
    escapeHTML,
    buildMetaFields,
    validateProject,
    validateVisualItem,
    findProjectBySlug,
    parseRoute
} = require('../utils');

describe('getYouTubeEmbedUrl', () => {
    test('returns empty string for falsy input', () => {
        expect(getYouTubeEmbedUrl(null)).toBe('');
        expect(getYouTubeEmbedUrl(undefined)).toBe('');
        expect(getYouTubeEmbedUrl('')).toBe('');
    });

    test('converts standard watch URL', () => {
        expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ'))
            .toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
    });

    test('converts short youtu.be URL', () => {
        expect(getYouTubeEmbedUrl('https://youtu.be/dQw4w9WgXcQ'))
            .toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
    });

    test('normalizes existing embed URL', () => {
        expect(getYouTubeEmbedUrl('https://www.youtube.com/embed/dQw4w9WgXcQ'))
            .toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
    });

    test('handles URL with extra parameters', () => {
        expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=120'))
            .toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
    });

    test('handles URL with hash fragment', () => {
        expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ#t=60'))
            .toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
    });

    test('returns original URL for non-YouTube links', () => {
        expect(getYouTubeEmbedUrl('https://vimeo.com/123456'))
            .toBe('https://vimeo.com/123456');
    });

    test('returns original URL for invalid video ID length', () => {
        expect(getYouTubeEmbedUrl('https://www.youtube.com/watch?v=short'))
            .toBe('https://www.youtube.com/watch?v=short');
    });

    test('handles /v/ format', () => {
        expect(getYouTubeEmbedUrl('https://www.youtube.com/v/dQw4w9WgXcQ'))
            .toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
    });

    test('handles &v= format (playlist context)', () => {
        expect(getYouTubeEmbedUrl('https://www.youtube.com/playlist?list=PLx&v=dQw4w9WgXcQ'))
            .toBe('https://www.youtube.com/embed/dQw4w9WgXcQ');
    });
});

describe('escapeHTML', () => {
    test('escapes ampersand', () => {
        expect(escapeHTML('a & b')).toBe('a &amp; b');
    });

    test('escapes less-than', () => {
        expect(escapeHTML('<script>')).toBe('&lt;script&gt;');
    });

    test('escapes greater-than', () => {
        expect(escapeHTML('a > b')).toBe('a &gt; b');
    });

    test('escapes double quotes', () => {
        expect(escapeHTML('"hello"')).toBe('&quot;hello&quot;');
    });

    test('escapes single quotes', () => {
        expect(escapeHTML("it's")).toBe("it&#39;s");
    });

    test('handles null/undefined gracefully', () => {
        expect(escapeHTML(null)).toBe('');
        expect(escapeHTML(undefined)).toBe('');
    });

    test('handles numbers by converting to string', () => {
        expect(escapeHTML(42)).toBe('42');
    });

    test('returns empty string for empty input', () => {
        expect(escapeHTML('')).toBe('');
    });

    test('leaves safe strings unchanged', () => {
        expect(escapeHTML('Hello World')).toBe('Hello World');
    });

    test('escapes multiple special characters in one string', () => {
        expect(escapeHTML('<a href="x">R&D</a>'))
            .toBe('&lt;a href=&quot;x&quot;&gt;R&amp;D&lt;/a&gt;');
    });
});

describe('buildMetaFields', () => {
    test('returns empty string when all fields are empty', () => {
        expect(buildMetaFields({ camera: '', aperture: '', focalLength: '', location: '', date: '' }))
            .toBe('');
    });

    test('returns empty string for null/undefined meta', () => {
        expect(buildMetaFields(null)).toBe('');
        expect(buildMetaFields(undefined)).toBe('');
    });

    test('renders only non-empty fields', () => {
        const result = buildMetaFields({ camera: 'Nikon Z6', location: 'Chicago' });
        expect(result).toContain('<dt>Camera</dt><dd>Nikon Z6</dd>');
        expect(result).toContain('<dt>Location</dt><dd>Chicago</dd>');
        expect(result).not.toContain('Aperture');
        expect(result).not.toContain('Focal Length');
        expect(result).not.toContain('Date');
    });

    test('escapes HTML in values', () => {
        const result = buildMetaFields({ camera: '<script>alert("xss")</script>' });
        expect(result).toContain('&lt;script&gt;');
        expect(result).not.toContain('<script>');
    });

    test('renders all fields when all are present', () => {
        const meta = {
            camera: 'Canon R5',
            aperture: 'f/2.8',
            focalLength: '70mm',
            location: 'NYC',
            date: '2024-01-15'
        };
        const result = buildMetaFields(meta);
        expect(result).toContain('<dt>Camera</dt><dd>Canon R5</dd>');
        expect(result).toContain('<dt>Aperture</dt><dd>f/2.8</dd>');
        expect(result).toContain('<dt>Focal Length</dt><dd>70mm</dd>');
        expect(result).toContain('<dt>Location</dt><dd>NYC</dd>');
        expect(result).toContain('<dt>Date</dt><dd>2024-01-15</dd>');
    });
});

describe('validateProject', () => {
    const validProject = {
        title: 'Test Project',
        slug: 'test-project',
        category: 'design',
        image: 'test.png',
        role: 'Developer',
        year: '2024'
    };

    test('returns valid for a complete project', () => {
        expect(validateProject(validProject)).toEqual({ valid: true, errors: [] });
    });

    test('reports missing title', () => {
        const result = validateProject({ ...validProject, title: '' });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('missing title');
    });

    test('reports missing slug', () => {
        const result = validateProject({ ...validProject, slug: '' });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('missing slug');
    });

    test('reports missing category', () => {
        const result = validateProject({ ...validProject, category: '' });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('missing category');
    });

    test('reports missing image', () => {
        const result = validateProject({ ...validProject, image: '' });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('missing image');
    });

    test('reports multiple missing fields', () => {
        const result = validateProject({ title: '', slug: '', category: 'x', image: 'x', role: 'x', year: 'x' });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('missing title');
        expect(result.errors).toContain('missing slug');
    });
});

describe('validateVisualItem', () => {
    const validItem = {
        title: 'Test Image',
        category: 'concert',
        image: 'test.jpg',
        size: 'standard'
    };

    test('returns valid for a complete visual item', () => {
        expect(validateVisualItem(validItem)).toEqual({ valid: true, errors: [] });
    });

    test('reports missing title', () => {
        const result = validateVisualItem({ ...validItem, title: '' });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('missing title');
    });

    test('reports missing category', () => {
        const result = validateVisualItem({ ...validItem, category: '' });
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('missing category');
    });

    test('reports invalid category', () => {
        const result = validateVisualItem({ ...validItem, category: 'invalid' });
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toContain('invalid category');
    });

    test('reports invalid size', () => {
        const result = validateVisualItem({ ...validItem, size: 'huge' });
        expect(result.valid).toBe(false);
        expect(result.errors[0]).toContain('invalid size');
    });

    test('accepts all valid categories', () => {
        const categories = ['concert', 'people', 'event', 'travel', 'product', 'graphic-design', 'video'];
        categories.forEach(category => {
            const result = validateVisualItem({ ...validItem, category });
            expect(result.valid).toBe(true);
        });
    });

    test('accepts all valid sizes', () => {
        ['standard', 'wide', 'tall'].forEach(size => {
            const result = validateVisualItem({ ...validItem, size });
            expect(result.valid).toBe(true);
        });
    });
});

describe('findProjectBySlug', () => {
    const projects = [
        { slug: 'alpha', title: 'Alpha' },
        { slug: 'beta', title: 'Beta' },
        { slug: 'gamma', title: 'Gamma' }
    ];

    test('finds existing project', () => {
        expect(findProjectBySlug(projects, 'beta')).toEqual({ slug: 'beta', title: 'Beta' });
    });

    test('returns null for non-existent slug', () => {
        expect(findProjectBySlug(projects, 'delta')).toBeNull();
    });

    test('returns null for empty slug', () => {
        expect(findProjectBySlug(projects, '')).toBeNull();
    });

    test('handles empty projects array', () => {
        expect(findProjectBySlug([], 'alpha')).toBeNull();
    });
});

describe('parseRoute', () => {
    test('defaults to work view for empty hash', () => {
        expect(parseRoute('')).toEqual({ type: 'view', value: 'work' });
    });

    test('defaults to work view for null', () => {
        expect(parseRoute(null)).toEqual({ type: 'view', value: 'work' });
    });

    test('strips leading # and returns view', () => {
        expect(parseRoute('#visuals')).toEqual({ type: 'view', value: 'visuals' });
    });

    test('parses project route', () => {
        expect(parseRoute('#project/pilleve-dispenser')).toEqual({
            type: 'project',
            value: 'pilleve-dispenser'
        });
    });

    test('handles project route without #', () => {
        expect(parseRoute('project/my-slug')).toEqual({
            type: 'project',
            value: 'my-slug'
        });
    });

    test('handles project route with nested slashes', () => {
        expect(parseRoute('#project/a/b/c')).toEqual({
            type: 'project',
            value: 'a/b/c'
        });
    });

    test('returns work view for just #', () => {
        expect(parseRoute('#')).toEqual({ type: 'view', value: 'work' });
    });
});
