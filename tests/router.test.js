const fs = require('fs');
const path = require('path');

// Load data files using Function constructor
const projectsData = (() => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'projects.js'), 'utf-8');
    const fn = new Function(code + '\nreturn projectsData;');
    return fn();
})();

const visualsData = (() => {
    const code = fs.readFileSync(path.join(__dirname, '..', 'visuals.js'), 'utf-8');
    const fn = new Function(code + '\nreturn visualsData;');
    return fn();
})();

function setupDOM() {
    document.body.innerHTML = fs.readFileSync(
        path.join(__dirname, '..', 'index.html'),
        'utf-8'
    );
}

function loadRouter() {
    // Make data available as globals (as the browser would)
    global.projectsData = projectsData;
    global.visualsData = visualsData;
    window.projectsData = projectsData;
    window.visualsData = visualsData;

    const routerCode = fs.readFileSync(path.join(__dirname, '..', 'router.js'), 'utf-8');
    // Wrap in a function that has access to the data via closure
    const wrappedCode = `
        var projectsData = global.projectsData;
        var visualsData = global.visualsData;
        ${routerCode}
    `;
    eval(wrappedCode);
}

describe('Router DOM rendering', () => {
    beforeEach(() => {
        setupDOM();
        // Simulate that intro has already played to skip animation
        const store = { introPlayed: '1' };
        Object.defineProperty(window, 'sessionStorage', {
            value: {
                getItem: (key) => store[key] || null,
                setItem: (key, val) => { store[key] = val; },
                removeItem: (key) => { delete store[key]; }
            },
            writable: true,
            configurable: true
        });
        window.location.hash = '#work';
    });

    afterEach(() => {
        delete global.projectsData;
        delete global.visualsData;
    });

    test('renders project grid with correct number of cards', () => {
        loadRouter();
        const cards = document.querySelectorAll('#project-grid .card');
        expect(cards.length).toBe(projectsData.length);
    });

    test('each project card has correct href', () => {
        loadRouter();
        const cards = document.querySelectorAll('#project-grid .card');
        cards.forEach((card, i) => {
            expect(card.getAttribute('href')).toBe(`#project/${projectsData[i].slug}`);
        });
    });

    test('each project card has data-category attribute', () => {
        loadRouter();
        const cards = document.querySelectorAll('#project-grid .card');
        cards.forEach((card, i) => {
            expect(card.dataset.category).toBe(projectsData[i].category);
        });
    });

    test('renders visuals grid with correct number of items', () => {
        loadRouter();
        const items = document.querySelectorAll('#visuals-grid .visual-item');
        expect(items.length).toBe(visualsData.length);
    });

    test('each visual item has correct data-category', () => {
        loadRouter();
        const items = document.querySelectorAll('#visuals-grid .visual-item');
        items.forEach((item, i) => {
            expect(item.dataset.category).toBe(visualsData[i].category);
        });
    });

    test('each visual item has correct data-size', () => {
        loadRouter();
        const items = document.querySelectorAll('#visuals-grid .visual-item');
        items.forEach((item, i) => {
            const expectedSize = visualsData[i].size || 'standard';
            expect(item.dataset.size).toBe(expectedSize);
        });
    });

    test('work view is active by default', () => {
        loadRouter();
        const workView = document.getElementById('view-work');
        expect(workView.classList.contains('active')).toBe(true);
    });

    test('visuals view is not active by default', () => {
        loadRouter();
        const visualsView = document.getElementById('view-visuals');
        expect(visualsView.classList.contains('active')).toBe(false);
    });

    test('nav links are present', () => {
        loadRouter();
        const navLinks = document.querySelectorAll('.nav-link');
        expect(navLinks.length).toBe(2);
    });

    test('work nav link is active when on work view', () => {
        loadRouter();
        const workLink = document.querySelector('.nav-link[data-view="work"]');
        expect(workLink.classList.contains('active')).toBe(true);
    });
});

describe('Router view switching', () => {
    beforeEach(() => {
        setupDOM();
        const store = { introPlayed: '1' };
        Object.defineProperty(window, 'sessionStorage', {
            value: {
                getItem: (key) => store[key] || null,
                setItem: (key, val) => { store[key] = val; },
                removeItem: (key) => { delete store[key]; }
            },
            writable: true,
            configurable: true
        });
        window.location.hash = '#work';
    });

    afterEach(() => {
        delete global.projectsData;
        delete global.visualsData;
        jest.useRealTimers();
    });

    test('switching to visuals view activates it after transition', () => {
        jest.useFakeTimers();
        loadRouter();

        window.location.hash = '#visuals';
        window.dispatchEvent(new Event('hashchange'));

        jest.advanceTimersByTime(300);

        const visualsView = document.getElementById('view-visuals');
        expect(visualsView.classList.contains('active')).toBe(true);
    });

    test('navigating to project route renders project detail', () => {
        jest.useFakeTimers();
        loadRouter();

        window.location.hash = '#project/pilleve-dispenser';
        window.dispatchEvent(new Event('hashchange'));

        jest.advanceTimersByTime(300);

        const projectDetail = document.getElementById('project-detail');
        expect(projectDetail.innerHTML).toContain('Pilleve Dispenser');
    });

    test('navigating to non-existent project redirects to work', () => {
        loadRouter();
        window.location.hash = '#project/non-existent-slug';
        window.dispatchEvent(new Event('hashchange'));

        expect(window.location.hash).toBe('#work');
    });
});

describe('Project detail rendering', () => {
    beforeEach(() => {
        setupDOM();
        const store = { introPlayed: '1' };
        Object.defineProperty(window, 'sessionStorage', {
            value: {
                getItem: (key) => store[key] || null,
                setItem: (key, val) => { store[key] = val; },
                removeItem: (key) => { delete store[key]; }
            },
            writable: true,
            configurable: true
        });
    });

    afterEach(() => {
        delete global.projectsData;
        delete global.visualsData;
    });

    test('renders project title in detail view', () => {
        window.location.hash = '#project/pilleve-dispenser';
        loadRouter();

        const detail = document.getElementById('project-detail');
        expect(detail.innerHTML).toContain('Pilleve Dispenser');
    });

    test('renders project role and year', () => {
        window.location.hash = '#project/pilleve-dispenser';
        loadRouter();

        const detail = document.getElementById('project-detail');
        expect(detail.innerHTML).toContain('CTO');
        expect(detail.innerHTML).toContain('2017–2023');
    });

    test('renders project summary', () => {
        window.location.hash = '#project/pilleve-dispenser';
        loadRouter();

        const detail = document.getElementById('project-detail');
        expect(detail.innerHTML).toContain('smart pill dispenser');
    });

    test('renders text sections', () => {
        window.location.hash = '#project/pilleve-dispenser';
        loadRouter();

        const textSections = document.querySelectorAll('.detail-text');
        expect(textSections.length).toBe(3);
    });

    test('renders back link to work view', () => {
        window.location.hash = '#project/pilleve-dispenser';
        loadRouter();

        const backLink = document.querySelector('.back-link');
        expect(backLink).not.toBeNull();
        expect(backLink.getAttribute('href')).toBe('#work');
    });

    test('renders tools metadata when present', () => {
        window.location.hash = '#project/pilleve-dispenser';
        loadRouter();

        const detail = document.getElementById('project-detail');
        expect(detail.innerHTML).toContain('Bluetooth');
    });

    test('renders video section as iframe', () => {
        window.location.hash = '#project/design-of-pablo';
        loadRouter();

        const videoSections = document.querySelectorAll('.detail-video iframe');
        expect(videoSections.length).toBeGreaterThan(0);
    });

    test('renders embed section as iframe', () => {
        window.location.hash = '#project/kellogg-mini-games';
        loadRouter();

        const embedSections = document.querySelectorAll('.detail-embed iframe');
        expect(embedSections.length).toBeGreaterThan(0);
    });

    test('renders external link when project has link', () => {
        window.location.hash = '#project/pilleve-dispenser';
        loadRouter();

        const extLink = document.querySelector('.project-ext-link');
        expect(extLink).not.toBeNull();
        expect(extLink.textContent).toContain('View Project');
    });
});

describe('Filter initialization', () => {
    beforeEach(() => {
        setupDOM();
        const store = { introPlayed: '1' };
        Object.defineProperty(window, 'sessionStorage', {
            value: {
                getItem: (key) => store[key] || null,
                setItem: (key, val) => { store[key] = val; },
                removeItem: (key) => { delete store[key]; }
            },
            writable: true,
            configurable: true
        });
        window.location.hash = '#work';
    });

    afterEach(() => {
        delete global.projectsData;
        delete global.visualsData;
    });

    test('work filter buttons are rendered', () => {
        loadRouter();
        const filterBtns = document.querySelectorAll('#work-filter-menu .filter-btn');
        expect(filterBtns.length).toBeGreaterThan(0);
    });

    test('clicking a filter button adds active class', () => {
        loadRouter();
        const btn = document.querySelector('#work-filter-menu .filter-btn[data-filter="design"]');
        btn.click();
        expect(btn.classList.contains('active')).toBe(true);
    });

    test('clicking a filter hides non-matching cards', () => {
        loadRouter();
        const btn = document.querySelector('#work-filter-menu .filter-btn[data-filter="games"]');
        btn.click();

        const cards = document.querySelectorAll('#project-grid .card');
        let hiddenCount = 0;
        cards.forEach(card => {
            if (!card.dataset.category.includes('games')) {
                expect(card.classList.contains('hidden')).toBe(true);
                hiddenCount++;
            } else {
                expect(card.classList.contains('hidden')).toBe(false);
            }
        });
        expect(hiddenCount).toBeGreaterThan(0);
    });

    test('clicking same filter again removes filter (toggle)', () => {
        loadRouter();
        const btn = document.querySelector('#work-filter-menu .filter-btn[data-filter="design"]');

        btn.click();
        expect(btn.classList.contains('active')).toBe(true);

        btn.click();
        expect(btn.classList.contains('active')).toBe(false);

        const cards = document.querySelectorAll('#project-grid .card');
        cards.forEach(card => {
            expect(card.classList.contains('hidden')).toBe(false);
        });
    });

    test('visuals filter buttons are rendered', () => {
        loadRouter();
        const filterBtns = document.querySelectorAll('#visuals-filter-menu .filter-btn');
        expect(filterBtns.length).toBeGreaterThan(0);
    });
});
