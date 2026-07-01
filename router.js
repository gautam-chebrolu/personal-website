// router.js — Main application controller
// Routing · Rendering · Filtering · Lightbox · Animations

(function () {
    'use strict';

    // ─── State ──────────────────────────────────────────────
    let currentView = null;
    let transitionTimer = null;
    let workFilter = null;
    let visualsFilter = null;
    let visualsStaggerDone = false;

    const TRANSITION_MS = 280;

    // ─── Initialize ─────────────────────────────────────────
    function init() {
        renderProjectGrid();
        renderVisualsGrid();
        initFilters('#work-filter-menu', '#project-grid .card',
            () => workFilter, v => { workFilter = v; });
        initFilters('#visuals-filter-menu', '#visuals-grid .visual-item',
            () => visualsFilter, v => { visualsFilter = v; });

        window.addEventListener('hashchange', handleRoute);

        // Only animate on first visit per session
        if (!sessionStorage.getItem('introPlayed')) {
            runIntroAnimation();
        } else {
            // Skip animation — show everything immediately
            skipIntroAnimation();
            handleRoute();
        }
    }

    // ─── Routing ────────────────────────────────────────────
    function handleRoute() {
        const hash = location.hash.slice(1) || 'work';

        if (hash.startsWith('project/')) {
            const slug = hash.split('/').slice(1).join('/');
            const project = projectsData.find(p => p.slug === slug);
            if (project) {
                renderProjectDetail(project);
                switchView('project');
                updateNav(null);
            } else {
                location.hash = '#work';
            }
        } else {
            switchView(hash);
            updateNav(hash);
        }
    }

    function switchView(viewId) {
        const target = document.getElementById('view-' + viewId);
        if (!target) return;
        if (currentView === viewId && viewId !== 'project') return;

        if (transitionTimer) clearTimeout(transitionTimer);
        const allViews = document.querySelectorAll('.view');

        // First load — no exit animation
        if (!currentView) {
            target.classList.add('active');
            currentView = viewId;
            if (viewId === 'visuals') staggerVisualsItems();
            if (viewId === 'project') initScrollReveals();
            return;
        }

        // Exit current view
        const outgoing = document.getElementById('view-' + currentView);
        if (outgoing) {
            outgoing.classList.add('exiting');
            outgoing.classList.remove('active');
        }

        transitionTimer = setTimeout(() => {
            allViews.forEach(v => v.classList.remove('active', 'exiting'));
            target.classList.add('active');
            window.scrollTo(0, 0);
            currentView = viewId;
            transitionTimer = null;

            if (viewId === 'visuals') staggerVisualsItems();
            if (viewId === 'project') initScrollReveals();
        }, TRANSITION_MS);
    }

    function updateNav(activeView) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.view === activeView);
        });
    }

    function getYouTubeEmbedUrl(url) {
        // Delegate to shared utility if available (see utils.js)
        if (typeof window !== 'undefined' && window.__utils && window.__utils.getYouTubeEmbedUrl) {
            return window.__utils.getYouTubeEmbedUrl(url);
        }
        if (!url) return '';
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}`;
        }
        return url;
    }

    // ─── Render: Project Grid ───────────────────────────────
    function renderProjectGrid() {
        const grid = document.getElementById('project-grid');
        if (!grid) return;

        grid.innerHTML = projectsData.map(p => `
            <a href="#project/${p.slug}" class="card" data-category="${p.category}">
                <div class="card-image">
                    <img src="${p.image}" alt="${p.title}" loading="lazy">
                </div>
                <div class="card-info">
                    <h3>${p.title}</h3>
                    <p class="role">${p.role} / ${p.year}</p>
                </div>
            </a>
        `).join('');
    }

    // ─── Render: Visuals Grid ───────────────────────────────
    function renderVisualsGrid() {
        const grid = document.getElementById('visuals-grid');
        if (!grid) return;

        const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char]));

        const metaFields = meta => [
            ['Camera', meta?.camera],
            ['Aperture', meta?.aperture],
            ['Focal Length', meta?.focalLength],
            ['Location', meta?.location],
            ['Date', meta?.date],
        ]
            .filter(([, val]) => val)
            .map(([label, val]) => `<dt>${escapeHTML(label)}</dt><dd>${escapeHTML(val)}</dd>`)
            .join('');

        grid.innerHTML = visualsData.map((v, index) => {
            const title = escapeHTML(v.title);
            const image = escapeHTML(v.image);
            const highRes = escapeHTML(v.highRes || v.image);
            const category = escapeHTML(v.category);
            const size = escapeHTML(v.size || 'standard');
            const videoUrl = escapeHTML(v.videoUrl || '');
            const rows = metaFields(v.meta || {});
            const embedUrl = v.videoUrl ? getYouTubeEmbedUrl(v.videoUrl) : '';
            const videoLink = v.videoUrl
                ? `<a class="expand-video-link" href="${videoUrl}" target="_blank" rel="noopener">Watch on YouTube ↗</a>`
                : '';

            const mediaContent = v.videoUrl
                ? `<div class="expand-image-wrap expand-video-wrap">
                       <div class="expand-video-container" data-src="${embedUrl}"></div>
                   </div>`
                : `<div class="expand-image-wrap">
                       <img src="${highRes}" alt="${title}" loading="lazy">
                   </div>`;

            return `
                <article class="visual-item" role="button" tabindex="0" aria-expanded="false" aria-label="Expand ${title}" data-index="${index}" data-category="${category}" data-size="${size}" data-highres="${highRes}" data-video="${videoUrl}">
                    <div class="visual-thumb">
                        <img src="${image}" alt="${title}" loading="lazy">
                        <div class="visual-overlay">
                            <span class="visual-title">${title}</span>
                        </div>
                    </div>
                    <div class="visual-expanded-panel" aria-hidden="true">
                        ${mediaContent}
                        <div class="expand-meta">
                            <h2>${title}</h2>
                            ${rows ? `<dl>${rows}</dl>` : '<p class="expand-empty-meta">Selected visual work.</p>'}
                            ${videoLink}
                            <button type="button" class="expand-close" aria-label="Close expanded visual">Close ✕</button>
                        </div>
                    </div>
                </article>
            `;
        }).join('');

        let expandedItem = null;

        function closeExpanded() {
            if (!expandedItem) return;

            const videoContainer = expandedItem.querySelector('.expand-video-container');
            if (videoContainer) {
                videoContainer.innerHTML = '';
            }

            expandedItem.classList.remove('expanded');
            expandedItem.setAttribute('aria-expanded', 'false');
            expandedItem.querySelector('.visual-expanded-panel')?.setAttribute('aria-hidden', 'true');
            expandedItem = null;
            grid.classList.remove('has-expanded');
        }

        function openItem(item) {
            if (!item || item === expandedItem) return;

            closeExpanded();
            item.classList.add('expanded');
            item.setAttribute('aria-expanded', 'true');
            item.querySelector('.visual-expanded-panel')?.setAttribute('aria-hidden', 'false');

            const videoContainer = item.querySelector('.expand-video-container');
            if (videoContainer) {
                const src = videoContainer.getAttribute('data-src');
                videoContainer.innerHTML = `<iframe src="${src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            }

            expandedItem = item;
            grid.classList.add('has-expanded');

            requestAnimationFrame(() => {
                item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        }

        function toggleItem(item) {
            if (item === expandedItem) {
                closeExpanded();
            } else {
                openItem(item);
            }
        }

        grid.addEventListener('click', e => {
            if (e.target.closest('.expand-close')) {
                e.stopPropagation();
                closeExpanded();
                return;
            }

            if (e.target.closest('a')) return;

            const item = e.target.closest('.visual-item');
            if (!item || !grid.contains(item)) return;
            toggleItem(item);
        });

        grid.addEventListener('keydown', e => {
            const item = e.target.closest('.visual-item');
            if (!item || !grid.contains(item)) return;

            if (e.target.closest('button, a') && e.key !== 'Escape') return;

            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleItem(item);
            }

            if (e.key === 'Escape') {
                closeExpanded();
                item.focus({ preventScroll: true });
            }
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeExpanded();
        });

        grid.addEventListener('visuals:closeExpanded', closeExpanded);
    }

    // ─── Render: Project Detail ─────────────────────────────
    function renderProjectDetail(project) {
        const container = document.getElementById('project-detail');
        const d = project.detail || {};

        let sections = '';
        if (d.sections) {
            d.sections.forEach((s, i) => {
                const delay = `style="transition-delay: ${(i + 2) * 0.08}s"`;
                switch (s.type) {
                    case 'text':
                        sections += `<div class="detail-section detail-text reveal" ${delay}><p>${s.content}</p></div>`;
                        break;
                    case 'image':
                        sections += `<div class="detail-section detail-image reveal" ${delay}>
                            <img src="${s.src}" alt="${s.caption || ''}" loading="lazy">
                            ${s.caption ? `<p class="detail-caption">${s.caption}</p>` : ''}
                        </div>`;
                        break;
                    case 'image-pair':
                        sections += `<div class="detail-section detail-image-pair reveal" ${delay}>
                            ${s.images.map(img => `<img src="${img}" alt="" loading="lazy">`).join('')}
                            ${s.caption ? `<p class="detail-caption">${s.caption}</p>` : ''}
                        </div>`;
                        break;
                    case 'video': {
                        const embedUrl = getYouTubeEmbedUrl(s.src);
                        sections += `<div class="detail-section detail-video reveal" ${delay}>
                            <iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>`;
                        break;
                    }
                    case 'embed': {
                        const height = s.height || '500px';
                        sections += `<div class="detail-section detail-embed reveal" ${delay}>
                            <iframe src="${s.src}" style="width: 100%; height: ${height}; border: 1px solid var(--surface); border-radius: 4px;" allowfullscreen></iframe>
                        </div>`;
                        break;
                    }
                    case 'link':
                        sections += `<div class="detail-section detail-link reveal" ${delay}>
                            <a href="${s.url}" class="project-ext-link" target="_blank" rel="noopener">${s.text} ↗</a>
                        </div>`;
                        break;
                }
            });
        }

        const extLink = project.link
            ? `<div class="reveal" style="transition-delay: 0.4s">
                   <a href="${project.link}" class="project-ext-link" target="_blank" rel="noopener">View Project ↗</a>
               </div>`
            : '';

        container.innerHTML = `
            <a href="#work" class="back-link"><span class="back-arrow">←</span> Work</a>
            <div class="project-hero reveal">
                <img src="${d.heroImage || project.image}" alt="${project.title}">
            </div>
            <div class="project-header reveal" style="transition-delay: 0.08s">
                <h1 class="project-title">${project.title}</h1>
                <div class="project-meta">
                    <span>${project.role}</span>
                    <span class="meta-sep">/</span>
                    <span>${project.year}</span>
                    ${d.metadata?.tools ? `<span class="meta-sep">/</span><span>${d.metadata.tools}</span>` : ''}
                </div>
            </div>
            ${d.summary ? `<p class="project-summary reveal" style="transition-delay: 0.14s">${d.summary}</p>` : ''}
            ${sections}
            ${extLink}
        `;
    }

    // ─── Filtering (shared logic) ───────────────────────────
    function initFilters(menuSelector, itemSelector, getState, setState) {
        const btns = document.querySelectorAll(menuSelector + ' .filter-btn');

        btns.forEach(btn => {
            const val = btn.dataset.filter;

            // Hover — dim non-matching
            btn.addEventListener('mouseenter', () => {
                if (!getState()) {
                    document.querySelectorAll(itemSelector).forEach(item => {
                        if (!item.dataset.category.includes(val)) {
                            item.classList.add('dimmed');
                        }
                    });
                }
            });

            btn.addEventListener('mouseleave', () => {
                if (!getState()) {
                    document.querySelectorAll(itemSelector).forEach(item => {
                        item.classList.remove('dimmed');
                    });
                }
            });

            // Click — toggle filter
            btn.addEventListener('click', () => {
                if (menuSelector === '#visuals-filter-menu') {
                    document.getElementById('visuals-grid')?.dispatchEvent(new CustomEvent('visuals:closeExpanded'));
                }

                if (getState() === val) {
                    setState(null);
                    btns.forEach(b => b.classList.remove('active'));
                    document.querySelectorAll(itemSelector).forEach(item => {
                        item.classList.remove('hidden', 'dimmed');
                    });
                } else {
                    setState(val);
                    btns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    document.querySelectorAll(itemSelector).forEach(item => {
                        item.classList.remove('dimmed');
                        if (item.dataset.category.includes(val)) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    });
                }
            });
        });
    }

    // ─── Intro Animation ────────────────────────────────────────
    function runIntroAnimation() {
        const logo      = document.getElementById('nav-logo');
        const workLink  = document.querySelector('.nav-link[data-view="work"]');
        const visualsLink = document.querySelector('.nav-link[data-view="visuals"]');
        const contentItems = document.querySelectorAll('#view-work .intro-content-item');

        // Lock scroll briefly
        document.body.classList.add('intro-animating');

        // === Phase 1: Logo writes in in-place ===
        const LOGO_START = 100;
        setTimeout(() => {
            logo.classList.remove('intro-hidden');
            logo.classList.add('intro-reveal');
        }, LOGO_START);

        // === Phase 2: "Work" nav link animates in ===
        // Start towards the end of the logo drawing
        const WORK_START = LOGO_START + 600;
        setTimeout(() => {
            workLink.classList.remove('intro-hidden');
            workLink.classList.add('intro-reveal');
        }, WORK_START);

        // === Phase 3: Work view content staggers in ===
        // Start route so the view becomes active first
        handleRoute();

        const CONTENT_START = WORK_START + 80;
        const STAGGER_STEP  = 60; // ms between each content block

        contentItems.forEach((item, i) => {
            setTimeout(() => {
                item.classList.add('intro-reveal');
            }, CONTENT_START + i * STAGGER_STEP);
        });

        // === Phase 4: "Visuals" nav link fades in last (with a longer pause) ===
        const CONTENT_TOTAL = CONTENT_START + contentItems.length * STAGGER_STEP;
        const VISUALS_DELAY = Math.max(CONTENT_TOTAL, WORK_START + 1200);

        setTimeout(() => {
            visualsLink.classList.remove('intro-hidden');
            visualsLink.classList.add('intro-reveal');
        }, VISUALS_DELAY);

        // === Phase 5: Grid expands and cards stagger in ===
        const GRID_EXPAND_DELAY = VISUALS_DELAY + 400; // Pause after 'Visuals'

        setTimeout(() => {
            const gridWrapper = document.getElementById('project-grid-wrapper');
            if (gridWrapper) {
                gridWrapper.classList.remove('intro-collapsed');
            }

            // Stagger the project cards fading in
            const grid = document.getElementById('project-grid');
            const cards = document.querySelectorAll('#project-grid .card');
            cards.forEach((card, i) => {
                setTimeout(() => {
                    card.classList.add('intro-reveal');
                }, i * 60 + 300); // 300ms delay to let it start expanding first
            });

            // Unlock scroll and remove animation classes so hover effects work
            setTimeout(() => {
                document.body.classList.remove('intro-animating');
                if (grid) grid.classList.remove('intro-cards-hidden');
                cards.forEach(card => card.classList.remove('intro-reveal'));
            }, 2000);
        }, GRID_EXPAND_DELAY);

        // Mark as played for this session
        sessionStorage.setItem('introPlayed', '1');
    }

    function skipIntroAnimation() {
        document.getElementById('nav-logo')?.classList.remove('intro-hidden');
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('intro-hidden'));
        document.querySelectorAll('.intro-content-item').forEach(el => {
            el.classList.add('intro-reveal');
        });

        // Skip grid animation
        const gridWrapper = document.getElementById('project-grid-wrapper');
        const grid = document.getElementById('project-grid');
        if (gridWrapper) gridWrapper.classList.remove('intro-collapsed');
        if (grid) grid.classList.remove('intro-cards-hidden');
        
        // No need to add intro-reveal to cards if intro-cards-hidden is removed
        document.querySelectorAll('#project-grid .card').forEach(card => {
            card.classList.remove('intro-reveal');
        });
    }

    // ─── Animations ─────────────────────────────────────────
    function staggerVisualsItems() {
        if (visualsStaggerDone) return;

        const items = document.querySelectorAll('.visual-item');

        // Double rAF ensures the browser has rendered opacity:0 before transitioning
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                items.forEach((item, i) => {
                    item.style.transitionDelay = `${i * 0.045}s`;
                    item.classList.add('show');
                });

                // Clean up delays after stagger completes
                setTimeout(() => {
                    items.forEach(item => { item.style.transitionDelay = ''; });
                }, items.length * 45 + 600);
            });
        });

        visualsStaggerDone = true;
    }

    function initScrollReveals() {
        // Small delay to ensure DOM is rendered
        requestAnimationFrame(() => {
            const els = document.querySelectorAll('#view-project .reveal');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

            els.forEach(el => observer.observe(el));
        });
    }

    // ─── Boot ───────────────────────────────────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
