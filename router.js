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
        initLightbox();

        window.addEventListener('hashchange', handleRoute);
        handleRoute();
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

        grid.innerHTML = visualsData.map(v => `
            <div class="visual-item" data-category="${v.category}" data-size="${v.size || 'standard'}" data-highres="${v.highRes || ''}" data-video="${v.videoUrl || ''}">
                <img src="${v.image}" alt="${v.title}" loading="lazy">
                <div class="visual-overlay">
                    <span class="visual-title">${v.title}</span>
                </div>
            </div>
        `).join('');

        // Click → lightbox
        grid.querySelectorAll('.visual-item').forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const highResUrl = item.dataset.highres;
                const videoUrl = item.dataset.video;
                openLightbox(highResUrl || img.src, img.alt, videoUrl);
            });
        });
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
                    case 'video':
                        sections += `<div class="detail-section detail-video reveal" ${delay}>
                            <iframe src="${s.src}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>`;
                        break;
                    case 'embed':
                        const height = s.height || '500px';
                        sections += `<div class="detail-section detail-embed reveal" ${delay}>
                            <iframe src="${s.src}" style="width: 100%; height: ${height}; border: 1px solid var(--surface); border-radius: 4px;" allowfullscreen></iframe>
                        </div>`;
                        break;
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

    // ─── Lightbox ───────────────────────────────────────────
    function initLightbox() {
        const lb = document.getElementById('lightbox');
        if (!lb) return;

        document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
        lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
    }

    function openLightbox(src, alt, videoUrl) {
        const lb = document.getElementById('lightbox');
        const img = document.getElementById('lightbox-img');
        const video = document.getElementById('lightbox-video');
        
        if (videoUrl) {
            lb.classList.add('video-mode');
            video.src = videoUrl + "?autoplay=1";
            img.src = "";
        } else {
            lb.classList.remove('video-mode');
            img.src = src;
            img.alt = alt || '';
            video.src = "";
        }
        
        lb.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        document.getElementById('lightbox').classList.remove('active');
        document.getElementById('lightbox-img').src = "";
        document.getElementById('lightbox-video').src = "";
        document.body.style.overflow = '';
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
