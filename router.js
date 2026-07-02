// router.js — Main application controller
// Routing · Rendering · Filtering · Modal · Animations

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

        // Close modal if switching away from visuals
        closeVisualsModal();

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

    // ─── Shuffle (Fisher-Yates) with session seed ────────────
    function seededShuffle(arr) {
        // Get or create a stable session seed
        let seed = parseInt(sessionStorage.getItem('visualsSeed') || '0', 10);
        if (!seed) {
            seed = Math.floor(Math.random() * 1e9) + 1;
            sessionStorage.setItem('visualsSeed', seed);
        }

        // Simple seeded pseudo-random using mulberry32
        function mulberry32(s) {
            return function () {
                s |= 0; s = s + 0x6D2B79F5 | 0;
                let t = Math.imul(s ^ s >>> 15, 1 | s);
                t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
                return ((t ^ t >>> 14) >>> 0) / 4294967296;
            };
        }
        const rand = mulberry32(seed);

        const result = arr.slice();
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(rand() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
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

        // Build compact meta values string (no labels)
        const metaValues = meta => {
            if (!meta) return '';
            return [meta.aperture, meta.focalLength, meta.camera, meta.location, meta.date]
                .filter(Boolean)
                .join(' · ');
        };

        // Separate featured from non-featured, then shuffle non-featured
        const featured = visualsData.filter(v => v.featured);
        const rest = seededShuffle(visualsData.filter(v => !v.featured));
        const ordered = [...featured, ...rest];

        grid.innerHTML = ordered.map((v, index) => {
            const title = escapeHTML(v.title);
            const image = escapeHTML(v.image);
            const category = escapeHTML(v.category);
            const size = escapeHTML(v.size || 'standard');
            const type = v.type || 'single';

            // Badge for collection or deck
            let badge = '';
            if (type === 'collection') {
                badge = `<span class="visual-collection-badge">Collection</span>`;
            } else if (type === 'deck') {
                badge = `<span class="visual-deck-badge">Deck · ${(v.slides || []).length} slides</span>`;
            }

            return `
                <article class="visual-item" role="button" tabindex="0"
                    aria-expanded="false" aria-label="Expand ${title}"
                    data-index="${index}" data-category="${category}" data-size="${size}">
                    <div class="visual-thumb">
                        <img src="${image}" alt="${title}" loading="lazy">
                        <div class="visual-overlay">
                            <span class="visual-title">${title}</span>
                        </div>
                        ${badge}
                    </div>
                </article>
            `;
        }).join('');

        // Store ordered data on grid for modal access
        grid._orderedData = ordered;

        // ── Modal wiring ────────────────────────────────────
        initVisualsModal(grid);
    }

    // ─── Visuals Modal ───────────────────────────────────────
    let activeModalIndex = null;

    function initVisualsModal(grid) {
        const modal = document.getElementById('visuals-modal');
        const backdrop = document.getElementById('visuals-modal-backdrop');
        const closeBtn = document.getElementById('visuals-modal-close');
        const body = document.getElementById('visuals-modal-body');
        if (!modal) return;

        // Open on grid item click
        grid.addEventListener('click', e => {
            if (e.target.closest('a')) return;
            const item = e.target.closest('.visual-item');
            if (!item) return;
            const index = parseInt(item.dataset.index, 10);
            openVisualsModal(index, grid._orderedData, item);
        });

        grid.addEventListener('keydown', e => {
            const item = e.target.closest('.visual-item');
            if (!item) return;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const index = parseInt(item.dataset.index, 10);
                openVisualsModal(index, grid._orderedData, item);
            }
        });

        // Close handlers
        backdrop.addEventListener('click', closeVisualsModal);
        closeBtn.addEventListener('click', closeVisualsModal);
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeVisualsModal();
        });

        // Filter close
        grid.addEventListener('visuals:closeExpanded', closeVisualsModal);
    }

    function openVisualsModal(index, data, sourceEl) {
        const modal = document.getElementById('visuals-modal');
        const panel = document.getElementById('visuals-modal-panel');
        const body = document.getElementById('visuals-modal-body');
        if (!modal || !body || !panel) return;

        const item = data[index];
        if (!item) return;
        activeModalIndex = index;

        body.innerHTML = buildModalContent(item);

        // Wire up carousel / deck nav if needed
        const type = item.type || 'single';
        if (type === 'collection') {
            initCarousel(body, item);
        } else if (type === 'deck') {
            initDeck(body, item);
        } else if (item.videoUrl) {
            const vc = body.querySelector('.modal-video-container');
            if (vc) {
                const embedUrl = getYouTubeEmbedUrl(item.videoUrl);
                vc.innerHTML = `<iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
            }
        }

        // ── Calculate transform-origin from the thumbnail's position ──
        // The panel is centered on screen. We compute where the thumbnail's
        // center falls in panel-local coordinates so the scale animation
        // appears to "grow" from the thumbnail's location.
        if (sourceEl) {
            const thumb = sourceEl.querySelector('.visual-thumb') || sourceEl;
            const thumbRect = thumb.getBoundingClientRect();
            const thumbCX = thumbRect.left + thumbRect.width / 2;
            const thumbCY = thumbRect.top + thumbRect.height / 2;

            // Panel sits centered: top = (vh - panelH) / 2, left = (vw - panelW) / 2
            const panelW = panel.offsetWidth;
            const panelH = panel.offsetHeight;
            const panelLeft = (window.innerWidth  - panelW) / 2;
            const panelTop  = (window.innerHeight - panelH) / 2;

            // Clamp origin within the panel so it never looks odd
            const ox = Math.max(0, Math.min(panelW, thumbCX - panelLeft));
            const oy = Math.max(0, Math.min(panelH, thumbCY - panelTop));

            // Reset transition temporarily to snap origin without animating it
            panel.style.transition = 'none';
            panel.style.transformOrigin = `${ox}px ${oy}px`;
            // Force reflow so the origin update takes effect before transition starts
            panel.offsetHeight; // eslint-disable-line no-unused-expressions
            panel.style.transition = '';
        }

        // Prevent body scroll behind modal
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
        });
    }

    function closeVisualsModal() {
        const modal = document.getElementById('visuals-modal');
        const panel = document.getElementById('visuals-modal-panel');
        const body = document.getElementById('visuals-modal-body');
        if (!modal || !modal.classList.contains('open')) return;

        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        activeModalIndex = null;

        // Clear content and reset origin after transition completes
        setTimeout(() => {
            if (body) body.innerHTML = '';
            if (panel) panel.style.transformOrigin = 'center center';
        }, 400);
    }

    // ─── Build Modal Content HTML ────────────────────────────
    function buildModalContent(item) {
        const type = item.type || 'single';
        const escapeHTML = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

        const metaValues = meta => {
            if (!meta) return '';
            return [meta.aperture, meta.focalLength, meta.camera, meta.location, meta.date]
                .filter(Boolean)
                .join(' · ');
        };

        // ── Media column ──────────────────────────────────
        let mediaHTML = '';
        if (type === 'collection') {
            const firstImg = item.images[0];
            mediaHTML = `
                <div class="modal-media modal-carousel">
                    <img class="modal-carousel-img"
                         src="${escapeHTML(firstImg.highRes || firstImg.image)}"
                         alt="${escapeHTML(firstImg.title || item.title)}"
                         loading="eager">
                    <div class="modal-carousel-nav">
                        <button class="modal-carousel-btn" id="modal-prev" aria-label="Previous" disabled>&#8592;</button>
                        <span class="modal-carousel-counter" id="modal-counter">1 / ${item.images.length}</span>
                        <button class="modal-carousel-btn" id="modal-next" aria-label="Next" ${item.images.length <= 1 ? 'disabled' : ''}>&#8594;</button>
                    </div>
                </div>`;
        } else if (type === 'deck') {
            const slides = item.slides || [];
            const firstSlide = slides[0] || item.image;
            mediaHTML = `
                <div class="modal-media modal-deck">
                    <img class="modal-deck-img"
                         src="${escapeHTML(firstSlide)}"
                         alt="${escapeHTML(item.title)} — Slide 1"
                         loading="eager">
                    <div class="modal-deck-nav">
                        <button class="modal-deck-btn" id="modal-deck-prev" aria-label="Previous slide" disabled>&#8592;</button>
                        <span class="modal-deck-counter" id="modal-deck-counter">Slide 1 / ${slides.length}</span>
                        <button class="modal-deck-btn" id="modal-deck-next" aria-label="Next slide" ${slides.length <= 1 ? 'disabled' : ''}>&#8594;</button>
                    </div>
                </div>`;
        } else if (item.videoUrl) {
            mediaHTML = `
                <div class="modal-media">
                    <div class="modal-video-container"></div>
                </div>`;
        } else {
            const highRes = item.highRes || item.image;
            mediaHTML = `
                <div class="modal-media">
                    <img class="modal-single-img"
                         src="${escapeHTML(highRes)}"
                         alt="${escapeHTML(item.title)}"
                         loading="eager">
                </div>`;
        }

        // ── Sidebar/meta column ───────────────────────────
        const baseTitle = type === 'collection' ? item.collectionTitle || item.title : item.title;
        const values = metaValues(item.meta);

        let albumLink = '';
        if (item.albumUrl) {
            albumLink = `<a class="modal-meta-link" href="${escapeHTML(item.albumUrl)}" target="_blank" rel="noopener">View full album ↗</a>`;
        } else if (item.videoUrl) {
            const yt = getYouTubeEmbedUrl(item.videoUrl).replace('/embed/', '/watch?v=');
            albumLink = `<a class="modal-meta-link" href="${escapeHTML(yt)}" target="_blank" rel="noopener">Watch on YouTube ↗</a>`;
        }

        const metaHTML = `
            <div class="modal-meta">
                <div class="modal-meta-title">${escapeHTML(baseTitle)}</div>
                ${values ? `<div class="modal-meta-values">${escapeHTML(values)}</div>` : ''}
                ${albumLink}
            </div>`;

        return `${mediaHTML}${metaHTML}`;
    }

    // ─── Carousel logic ──────────────────────────────────────
    function initCarousel(body, item) {
        const images = item.images || [];
        let current = 0;

        const img = body.querySelector('.modal-carousel-img');
        const counter = body.querySelector('#modal-counter');
        const prevBtn = body.querySelector('#modal-prev');
        const nextBtn = body.querySelector('#modal-next');
        const metaTitle = body.querySelector('.modal-meta-title');
        const metaValues = body.querySelector('.modal-meta-values');

        function updateCarousel(newIndex) {
            if (newIndex < 0 || newIndex >= images.length) return;

            img.classList.add('fading');
            setTimeout(() => {
                current = newIndex;
                const pic = images[current];
                img.src = pic.highRes || pic.image;
                img.alt = pic.title || item.title;
                img.classList.remove('fading');

                counter.textContent = `${current + 1} / ${images.length}`;
                prevBtn.disabled = current === 0;
                nextBtn.disabled = current === images.length - 1;

                // Update sidebar meta to match current image
                if (metaTitle) metaTitle.textContent = pic.title || item.collectionTitle || item.title;
                if (metaValues && pic.meta) {
                    const vals = [pic.meta.aperture, pic.meta.focalLength, pic.meta.camera, pic.meta.location, pic.meta.date]
                        .filter(Boolean).join(' · ');
                    metaValues.textContent = vals;
                }
            }, 220);
        }

        prevBtn.addEventListener('click', () => updateCarousel(current - 1));
        nextBtn.addEventListener('click', () => updateCarousel(current + 1));

        // Keyboard left/right while modal is open
        body._carouselKeyHandler = (e) => {
            if (e.key === 'ArrowLeft') updateCarousel(current - 1);
            if (e.key === 'ArrowRight') updateCarousel(current + 1);
        };
        document.addEventListener('keydown', body._carouselKeyHandler);
    }

    // ─── Deck viewer logic ───────────────────────────────────
    function initDeck(body, item) {
        const slides = item.slides || [];
        if (slides.length === 0) return;
        let current = 0;

        const img = body.querySelector('.modal-deck-img');
        const counter = body.querySelector('#modal-deck-counter');
        const prevBtn = body.querySelector('#modal-deck-prev');
        const nextBtn = body.querySelector('#modal-deck-next');

        function updateDeck(newIndex) {
            if (newIndex < 0 || newIndex >= slides.length) return;
            img.classList.add('fading');
            setTimeout(() => {
                current = newIndex;
                img.src = slides[current];
                img.alt = `${item.title} — Slide ${current + 1}`;
                img.classList.remove('fading');
                counter.textContent = `Slide ${current + 1} / ${slides.length}`;
                prevBtn.disabled = current === 0;
                nextBtn.disabled = current === slides.length - 1;
            }, 220);
        }

        prevBtn.addEventListener('click', () => updateDeck(current - 1));
        nextBtn.addEventListener('click', () => updateDeck(current + 1));

        body._deckKeyHandler = (e) => {
            if (e.key === 'ArrowLeft') updateDeck(current - 1);
            if (e.key === 'ArrowRight') updateDeck(current + 1);
        };
        document.addEventListener('keydown', body._deckKeyHandler);
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

            // Hover — dim non-matching + color-code the button and matching cards
            const viewEl = document.querySelector(menuSelector)?.closest('.view');

            btn.addEventListener('mouseenter', () => {
                if (!getState()) {
                    document.querySelectorAll(itemSelector).forEach(item => {
                        if (!item.dataset.category.includes(val)) {
                            item.classList.add('dimmed');
                        }
                    });
                    if (viewEl) viewEl.classList.add(`hovering-${val}`);
                }
            });

            btn.addEventListener('mouseleave', () => {
                if (!getState()) {
                    document.querySelectorAll(itemSelector).forEach(item => {
                        item.classList.remove('dimmed');
                    });
                    if (viewEl) viewEl.className = viewEl.className.replace(/\bhovering-\S+/g, '').trim();
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
        const WORK_START = LOGO_START + 600;
        setTimeout(() => {
            workLink.classList.remove('intro-hidden');
            workLink.classList.add('intro-reveal');
        }, WORK_START);

        // === Phase 3: Work view content staggers in ===
        handleRoute();

        const CONTENT_START = WORK_START + 80;
        const STAGGER_STEP  = 60;

        contentItems.forEach((item, i) => {
            setTimeout(() => {
                item.classList.add('intro-reveal');
            }, CONTENT_START + i * STAGGER_STEP);
        });

        // === Phase 4: "Visuals" nav link fades in last ===
        const CONTENT_TOTAL = CONTENT_START + contentItems.length * STAGGER_STEP;
        const VISUALS_DELAY = Math.max(CONTENT_TOTAL, WORK_START + 1200);

        setTimeout(() => {
            visualsLink.classList.remove('intro-hidden');
            visualsLink.classList.add('intro-reveal');
        }, VISUALS_DELAY);

        // === Phase 5: Grid expands and cards stagger in ===
        const GRID_EXPAND_DELAY = VISUALS_DELAY + 400;

        setTimeout(() => {
            const gridWrapper = document.getElementById('project-grid-wrapper');
            if (gridWrapper) gridWrapper.classList.remove('intro-collapsed');

            const grid = document.getElementById('project-grid');
            const cards = document.querySelectorAll('#project-grid .card');
            cards.forEach((card, i) => {
                setTimeout(() => {
                    card.classList.add('intro-reveal');
                }, i * 60 + 300);
            });

            const TEXT_SECTIONS = [
                'work-takes-wrapper',
                'work-pubs-wrapper',
                'work-roles-wrapper',
                'work-recog-wrapper',
            ];
            const SECTION_GAP = 400;

            TEXT_SECTIONS.forEach((wrapperId, si) => {
                const sectionDelay = cards.length * 60 + 500 + si * SECTION_GAP;

                setTimeout(() => {
                    const wrapper = document.getElementById(wrapperId);
                    if (wrapper) wrapper.classList.remove('intro-collapsed');

                    const lines = wrapper ? wrapper.querySelectorAll('.text-line') : [];
                    lines.forEach((line, li) => {
                        setTimeout(() => {
                            line.classList.add('line-revealed');
                        }, 200 + li * 80);
                    });
                }, sectionDelay);
            });

            const totalTextDelay = cards.length * 60 + 500 + TEXT_SECTIONS.length * SECTION_GAP + 800;
            setTimeout(() => {
                document.body.classList.remove('intro-animating');
                if (grid) grid.classList.remove('intro-cards-hidden');
                cards.forEach(card => card.classList.remove('intro-reveal'));
            }, totalTextDelay);
        }, GRID_EXPAND_DELAY);

        sessionStorage.setItem('introPlayed', '1');
    }

    function skipIntroAnimation() {
        document.getElementById('nav-logo')?.classList.remove('intro-hidden');
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('intro-hidden'));
        document.querySelectorAll('.intro-content-item').forEach(el => {
            el.classList.add('intro-reveal');
        });

        const gridWrapper = document.getElementById('project-grid-wrapper');
        const grid = document.getElementById('project-grid');
        if (gridWrapper) gridWrapper.classList.remove('intro-collapsed');
        if (grid) grid.classList.remove('intro-cards-hidden');

        document.querySelectorAll('#project-grid .card').forEach(card => {
            card.classList.remove('intro-reveal');
        });

        ['work-takes-wrapper', 'work-pubs-wrapper', 'work-roles-wrapper', 'work-recog-wrapper'].forEach(id => {
            const wrapper = document.getElementById(id);
            if (wrapper) {
                wrapper.classList.remove('intro-collapsed');
                wrapper.querySelectorAll('.text-line').forEach(line => line.classList.add('line-revealed'));
            }
        });
    }

    // ─── Animations ─────────────────────────────────────────
    function staggerVisualsItems() {
        if (visualsStaggerDone) return;

        const items = document.querySelectorAll('.visual-item');

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                items.forEach((item, i) => {
                    item.style.transitionDelay = `${i * 0.04}s`;
                    item.classList.add('show');
                });

                setTimeout(() => {
                    items.forEach(item => { item.style.transitionDelay = ''; });
                }, items.length * 40 + 600);
            });
        });

        visualsStaggerDone = true;
    }

    function initScrollReveals() {
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
