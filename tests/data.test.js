const fs = require('fs');
const path = require('path');
const { validateProject, validateVisualItem } = require('../utils');

// Load the data files by evaluating them (they declare `const` globals in browser)
function loadDataFile(filename) {
    const code = fs.readFileSync(path.join(__dirname, '..', filename), 'utf-8');
    // Replace `const` with `var` so the variable leaks into the eval scope
    const modified = code.replace(/^const\s+/gm, 'var ');
    return eval(modified);
}

const projectsData = (() => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'projects.js'), 'utf-8');
    // Use Function constructor to get the value
    const fn = new Function(code + '\nreturn projectsData;');
    return fn();
})();

const visualsData = (() => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'visuals.js'), 'utf-8');
    const fn = new Function(code + '\nreturn visualsData;');
    return fn();
})();

describe('projectsData integrity', () => {
    test('is a non-empty array', () => {
        expect(Array.isArray(projectsData)).toBe(true);
        expect(projectsData.length).toBeGreaterThan(0);
    });

    test('all projects have required fields', () => {
        projectsData.forEach((project, i) => {
            const { valid, errors } = validateProject(project);
            expect({ index: i, title: project.title, valid, errors }).toEqual(
                expect.objectContaining({ valid: true, errors: [] })
            );
        });
    });

    test('all slugs are unique', () => {
        const slugs = projectsData.map(p => p.slug);
        const unique = new Set(slugs);
        expect(unique.size).toBe(slugs.length);
    });

    test('all slugs are URL-safe', () => {
        projectsData.forEach(project => {
            expect(project.slug).toMatch(/^[a-z0-9\-]+$/);
        });
    });

    test('all projects have a detail object', () => {
        projectsData.forEach(project => {
            expect(project.detail).toBeDefined();
            expect(typeof project.detail).toBe('object');
        });
    });

    test('detail.sections is an array when present', () => {
        projectsData.forEach(project => {
            if (project.detail && project.detail.sections) {
                expect(Array.isArray(project.detail.sections)).toBe(true);
            }
        });
    });

    test('all detail sections have a valid type', () => {
        const validTypes = ['text', 'image', 'image-pair', 'video', 'embed', 'link'];
        projectsData.forEach(project => {
            if (project.detail?.sections) {
                project.detail.sections.forEach((section, i) => {
                    expect(validTypes).toContain(section.type);
                });
            }
        });
    });

    test('text sections have content', () => {
        projectsData.forEach(project => {
            if (project.detail?.sections) {
                project.detail.sections
                    .filter(s => s.type === 'text')
                    .forEach(section => {
                        expect(section.content).toBeTruthy();
                    });
            }
        });
    });

    test('video sections have src', () => {
        projectsData.forEach(project => {
            if (project.detail?.sections) {
                project.detail.sections
                    .filter(s => s.type === 'video')
                    .forEach(section => {
                        expect(section.src).toBeTruthy();
                    });
            }
        });
    });

    test('embed sections have src', () => {
        projectsData.forEach(project => {
            if (project.detail?.sections) {
                project.detail.sections
                    .filter(s => s.type === 'embed')
                    .forEach(section => {
                        expect(section.src).toBeTruthy();
                    });
            }
        });
    });

    test('image sections have src', () => {
        projectsData.forEach(project => {
            if (project.detail?.sections) {
                project.detail.sections
                    .filter(s => s.type === 'image')
                    .forEach(section => {
                        expect(section.src).toBeTruthy();
                    });
            }
        });
    });
});

describe('visualsData integrity', () => {
    test('is a non-empty array', () => {
        expect(Array.isArray(visualsData)).toBe(true);
        expect(visualsData.length).toBeGreaterThan(0);
    });

    test('all visual items have required fields', () => {
        visualsData.forEach((item, i) => {
            const { valid, errors } = validateVisualItem(item);
            expect({ index: i, title: item.title, valid, errors }).toEqual(
                expect.objectContaining({ valid: true, errors: [] })
            );
        });
    });

    test('all items have a meta object', () => {
        visualsData.forEach(item => {
            expect(item.meta).toBeDefined();
            expect(typeof item.meta).toBe('object');
        });
    });

    test('all image URLs are valid URLs', () => {
        visualsData.forEach(item => {
            expect(item.image).toMatch(/^https?:\/\//);
        });
    });

    test('items with highRes have valid URLs', () => {
        visualsData.forEach(item => {
            if (item.highRes) {
                expect(item.highRes).toMatch(/^https?:\/\//);
            }
        });
    });

    test('items with videoUrl have valid YouTube embed URLs', () => {
        visualsData.forEach(item => {
            if (item.videoUrl) {
                expect(item.videoUrl).toMatch(/youtube\.com\/embed\//);
            }
        });
    });

    test('all sizes are valid', () => {
        const validSizes = ['standard', 'wide', 'tall'];
        visualsData.forEach(item => {
            if (item.size) {
                expect(validSizes).toContain(item.size);
            }
        });
    });

    test('all categories are valid', () => {
        const validCategories = ['concert', 'people', 'event', 'travel', 'product', 'graphic-design', 'video'];
        visualsData.forEach(item => {
            expect(validCategories).toContain(item.category);
        });
    });
});
