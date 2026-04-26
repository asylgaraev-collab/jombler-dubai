(function () {
    'use strict';

    const WHATSAPP_PHONE = '971545441060';
    const t = (key) => (window.I18N && window.I18N.t) ? window.I18N.t(key) : key;

    // ----------------------------------------------
    // Header: change style on scroll
    // ----------------------------------------------
    const header = document.getElementById('header');
    const onScroll = () => {
        if (window.scrollY > 30) header.classList.add('header--scrolled');
        else header.classList.remove('header--scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // ----------------------------------------------
    // Mobile burger menu
    // ----------------------------------------------
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('is-open');
            burger.classList.toggle('is-open');
            burger.setAttribute('aria-expanded', String(isOpen));
            burger.setAttribute('aria-label', isOpen ? t('burger.closeLabel') : t('burger.openLabel'));
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burger.classList.remove('is-open');
                nav.classList.remove('is-open');
                burger.setAttribute('aria-expanded', 'false');
                burger.setAttribute('aria-label', t('burger.openLabel'));
                document.body.style.overflow = '';
            });
        });
    }

    // ----------------------------------------------
    // Reveal-on-scroll animations
    // ----------------------------------------------
    const reveals = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

        reveals.forEach(el => io.observe(el));
    } else {
        reveals.forEach(el => el.classList.add('is-visible'));
    }

    // ----------------------------------------------
    // Animated counters
    // ----------------------------------------------
    const counters = document.querySelectorAll('[data-count]');

    const animateCounter = (el) => {
        const target = parseInt(el.dataset.count, 10);
        if (Number.isNaN(target)) return;
        const duration = 1800;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target).toString();
            if (progress < 1) requestAnimationFrame(tick);
            else el.textContent = target.toString();
        };
        requestAnimationFrame(tick);
    };

    if ('IntersectionObserver' in window && counters.length) {
        const cIO = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    cIO.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        counters.forEach(c => cIO.observe(c));
    }

    // ----------------------------------------------
    // Analytics: WhatsApp / phone clicks
    // ----------------------------------------------
    const trackEvent = (name, params) => {
        if (window.dataLayer) {
            window.dataLayer.push({ event: name, ...(params || {}) });
        }
        if (typeof window.gtag === 'function') {
            window.gtag('event', name, params || {});
        }
        if (typeof window.ym === 'function' && window.YM_COUNTER_ID) {
            window.ym(window.YM_COUNTER_ID, 'reachGoal', name, params || {});
        }
    };

    document.querySelectorAll('[data-event]').forEach(el => {
        el.addEventListener('click', () => {
            const name = el.dataset.event;
            const source = el.dataset.source || null;
            trackEvent(name, source ? { source } : undefined);
        });
    });

    // ----------------------------------------------
    // Lead magnet form -> WhatsApp deep link
    // ----------------------------------------------
    const leadForm = document.getElementById('leadForm');
    const leadStatus = document.getElementById('leadFormStatus');

    const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/;

    const setError = (input, hasError) => {
        input.classList.toggle('is-error', hasError);
    };

    const validateLead = (form) => {
        const name = form.querySelector('#lfName');
        const budget = form.querySelector('#lfBudget');
        const goal = form.querySelector('#lfGoal');
        const phone = form.querySelector('#lfPhone');

        const errors = [];

        if (!name.value.trim() || name.value.trim().length < 2) {
            setError(name, true); errors.push(t('err.name'));
        } else setError(name, false);

        if (!budget.value) {
            setError(budget, true); errors.push(t('err.budget'));
        } else setError(budget, false);

        if (!goal.value) {
            setError(goal, true); errors.push(t('err.goal'));
        } else setError(goal, false);

        if (!phoneRegex.test(phone.value.trim())) {
            setError(phone, true); errors.push(t('err.phone'));
        } else setError(phone, false);

        return { ok: errors.length === 0, errors, values: {
            name: name.value.trim(),
            budget: budget.value,
            goal: goal.value,
            phone: phone.value.trim()
        }};
    };

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const result = validateLead(leadForm);

            if (!result.ok) {
                leadStatus.textContent = result.errors.join(' · ');
                leadStatus.className = 'lead-form__status is-error';
                return;
            }

            const { name, budget, goal, phone } = result.values;

            const message =
                t('wa.lead.greet') + ' ' + name + '.\n' +
                t('wa.lead.budget') + ' ' + budget + '.\n' +
                t('wa.lead.goal') + ' ' + goal + '.\n' +
                t('wa.lead.shortlist') + '\n' +
                t('wa.lead.contact') + ' ' + phone + '.';

            const url = 'https://wa.me/' + WHATSAPP_PHONE + '?text=' + encodeURIComponent(message);

            trackEvent('lead_magnet_submit', { budget, goal });

            const opened = window.open(url, '_blank', 'noopener');
            const linkHtml = '<a href="' + url + '" target="_blank" rel="noopener">' + t('wa.clickHere') + '</a>';
            const manualHtml = '<a href="' + url + '" target="_blank" rel="noopener">' + t('wa.openManual') + '</a>';
            leadStatus.innerHTML = opened
                ? t('wa.opening') + linkHtml + '.'
                : t('wa.failed') + manualHtml + '.';
            leadStatus.className = 'lead-form__status is-success';
        });

        leadForm.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', () => setError(input, false));
            input.addEventListener('change', () => setError(input, false));
        });
    }

    // ----------------------------------------------
    // Legacy contact form (contacts.html) -> WhatsApp
    // ----------------------------------------------
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('fName').value.trim();
            const phone = document.getElementById('fPhone').value.trim();
            const message = document.getElementById('fMessage').value.trim();

            if (!name || !phone) {
                alert(t('err.namePhone'));
                return;
            }

            const text =
                t('wa.contact.greet') + ' ' + name + '.\n' +
                t('wa.contact.phone') + ' ' + phone + '.\n' +
                (message ? t('wa.contact.message') + ' ' + message : t('wa.contact.fallback'));

            const url = 'https://wa.me/' + WHATSAPP_PHONE + '?text=' + encodeURIComponent(text);
            trackEvent('contact_form_submit');
            window.open(url, '_blank', 'noopener');
        });
    }

    // ----------------------------------------------
    // Sticky WhatsApp button (appears after 400px scroll)
    // ----------------------------------------------
    const sticky = document.createElement('a');
    sticky.href = 'https://wa.me/' + WHATSAPP_PHONE;
    sticky.target = '_blank';
    sticky.rel = 'noopener';
    sticky.className = 'sticky-wa';
    sticky.setAttribute('aria-label', t('sticky.aria'));
    sticky.dataset.event = 'whatsapp_click';
    sticky.dataset.source = 'sticky';
    sticky.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.74-.86-2.01-.96-.27-.1-.46-.15-.66.15-.2.3-.76.96-.93 1.16-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.34.46-.51.15-.17.2-.3.3-.51.1-.2.05-.38-.02-.53-.07-.15-.66-1.6-.91-2.18-.24-.57-.48-.49-.66-.5-.17-.01-.37-.01-.56-.01-.2 0-.51.07-.78.38-.27.3-1.02 1-1.02 2.45s1.05 2.85 1.2 3.05c.15.2 2.07 3.16 5.02 4.43.7.3 1.25.48 1.68.62.7.22 1.34.19 1.85.12.57-.08 1.74-.71 1.99-1.4.24-.69.24-1.28.17-1.4-.07-.12-.27-.2-.56-.34zM12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5l-1.42 5.18 5.31-1.39c1.46.8 3.1 1.22 4.74 1.22h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04C17.16 3.08 14.66 2.04 12 2.04z"/></svg>';

    sticky.addEventListener('click', () => trackEvent('whatsapp_click', { source: 'sticky' }));

    document.body.appendChild(sticky);

    document.addEventListener('langchange', () => {
        sticky.setAttribute('aria-label', t('sticky.aria'));
        if (burger) {
            const isOpen = burger.classList.contains('is-open');
            burger.setAttribute('aria-label', isOpen ? t('burger.closeLabel') : t('burger.openLabel'));
        }
    });

    const onScrollSticky = () => {
        if (window.scrollY > 400) sticky.classList.add('is-visible');
        else sticky.classList.remove('is-visible');
    };
    window.addEventListener('scroll', onScrollSticky, { passive: true });

    // ----------------------------------------------
    // Smooth scroll for hash anchors
    // ----------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href').slice(1);
            if (!id) return;
            const target = document.getElementById(id);
            if (!target) return;
            e.preventDefault();
            const headerH = header ? header.offsetHeight : 0;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - headerH - 20,
                behavior: 'smooth'
            });
            history.replaceState(null, '', '#' + id);
        });
    });

    document.querySelectorAll('[data-year]').forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    // ----------------------------------------------
    // Ultra-luxury catalog (dubai.html)
    // ----------------------------------------------
    const ULTRA_DATA = {
        'downtown': [
            { handover: '2025', name: 'Address Residences Dubai Opera', developer: 'Emaar Properties', segment: 'Luxury',
              features: { ru: 'Виды на Burj Khalifa и Dubai Opera', en: 'Views of Burj Khalifa and Dubai Opera' } },
            { handover: '2025', name: 'St. Regis The Residences (Financial Center)', developer: 'Emaar / Marriott', segment: 'Trophy',
              features: { ru: '60-эт. башня, 232 резиденции, бренд St. Regis', en: '60-floor tower, 232 residences, St. Regis brand' } },
            { handover: '2025', name: 'Mercedes-Benz Places by Binghatti', developer: 'Binghatti', segment: 'Trophy',
              features: { ru: 'Первая в мире branded резиденция Mercedes-Benz', en: "World's first Mercedes-Benz branded residence" } },
            { handover: 'Q4 2026', name: 'Mr. C Residences Downtown', developer: 'Alta Real Estate / Cipriani', segment: 'Ultra-luxury',
              features: { ru: 'Бренд Cipriani, архитектура Arquitectonica', en: 'Cipriani brand, Arquitectonica architecture' } },
            { handover: '2026', name: 'Baccarat Hotel & Residences (Tower 1)', developer: 'Shamal Holding / H&H', segment: 'Trophy',
              features: { ru: 'Studio Libeskind, 49 резиденций, напротив Burj Khalifa', en: 'Studio Libeskind, 49 residences, opposite Burj Khalifa' } },
            { handover: '2027', name: 'Rouge by Baccarat (Tower 2)', developer: 'Shamal Holding / H&H', segment: 'Trophy',
              features: { ru: 'От AED ~21,5 М, ультра-люкс branded', en: 'From AED ~21.5M, ultra-luxury branded' } },
            { handover: '2027', name: 'Fairmont Residences Solara Tower', developer: 'RKM Durar / Fairmont', segment: 'Ultra-luxury',
              features: { ru: 'Branded, инфраструктура отельного уровня', en: 'Branded, hotel-grade amenities' } },
            { handover: '2027', name: 'Rixos Financial Center Road', developer: 'Rixos / partners', segment: 'Luxury',
              features: { ru: 'Branded residences', en: 'Branded residences' } }
        ],
        'business-bay': [
            { handover: { ru: 'Сдан (Q1 2024)', en: 'Delivered (Q1 2024)' }, name: 'The Lana Residences, Dorchester Collection', developer: 'OMNIYAT / Dorchester', segment: 'Trophy',
              features: { ru: '39 резиденций, Foster + Partners, Marasi Bay Marina', en: '39 residences, Foster + Partners, Marasi Bay Marina' } },
            { handover: 'Q4 2025', name: 'Jumeirah Living Business Bay', developer: 'Select Group / Jumeirah Group', segment: 'Ultra-luxury',
              features: { ru: 'От AED ~7,4 М, 82 резиденции, Killa Design', en: 'From AED ~7.4M, 82 residences, Killa Design' } },
            { handover: '2025–2026', name: 'Eden House Marasi', developer: 'H&H Development', segment: 'Ultra-luxury',
              features: { ru: 'Boutique branded penthouses на Marasi Drive', en: 'Boutique branded penthouses on Marasi Drive' } },
            { handover: 'Q4 2026', name: 'Edge by Rotana', developer: 'Rotana / partners', segment: 'Luxury',
              features: { ru: 'Branded residences Business Bay', en: 'Branded residences in Business Bay' } },
            { handover: 'Q2 2027', name: 'Vela Viento', developer: 'OMNIYAT', segment: 'Trophy',
              features: { ru: 'От AED ~20 М, прямой доступ к Dubai Mall, Foster + Partners', en: 'From AED ~20M, direct access to Dubai Mall, Foster + Partners' } }
        ],
        'difc': [
            { handover: 'Q2 2025', name: 'Waldorf Astoria Residences DIFC', developer: 'Daman Real Estate / Hilton', segment: 'Trophy',
              features: { ru: 'От AED ~5,5 М, 28 резиденций, верх Burj Daman', en: 'From AED ~5.5M, 28 residences, atop Burj Daman' } },
            { handover: 'Q2 2025', name: 'Sky Gardens (DIFC)', developer: 'AveNew', segment: 'Luxury',
              features: { ru: '40 этажей, премиум sky-residences', en: '40 floors, premium sky-residences' } },
            { handover: 'Q1 2026', name: 'Ritz-Carlton Residences DIFC', developer: 'DIFC partners / Marriott', segment: 'Trophy',
              features: { ru: 'От AED ~4,4 М, branded Ritz-Carlton', en: 'From AED ~4.4M, Ritz-Carlton branded' } },
            { handover: 'Q2 2026', name: 'DIFC Heights Tower', developer: 'DIFC Development', segment: 'Ultra-luxury',
              features: { ru: 'Ультра-премиум резиденции', en: 'Ultra-premium residences' } },
            { handover: 'Q3 2026', name: 'DIFC Living', developer: 'DIFC Authority', segment: 'Luxury',
              features: { ru: 'Первый резиденциальный проект DIFC, от AED ~1,5 М', en: "DIFC's first residential project, from AED ~1.5M" } },
            { handover: 'Q4 2027', name: 'Four Seasons Private Residences DIFC', developer: 'H&H Development', segment: 'Trophy',
              features: { ru: 'От AED ~23 М, всего 61 резиденция, Sir David Chipperfield', en: 'From AED ~23M, just 61 residences, Sir David Chipperfield' } },
            { handover: '2027+', name: 'Janu Dubai', developer: 'Aman / H&H', segment: 'Trophy',
              features: { ru: 'Ультра-люкс branded от Aman/Janu', en: 'Ultra-luxury Aman/Janu branded' } }
        ],
        'marina': [
            { handover: { ru: 'Сдан (Q4 2022)', en: 'Delivered (Q4 2022)' }, name: 'Vida Residences Dubai Marina', developer: 'Emaar / Vida (Emaar Hospitality)', segment: 'Luxury',
              features: { ru: '57-эт. branded tower, 1–4BR, виды на Yacht Club', en: '57-floor branded tower, 1–4BR, Yacht Club views' } },
            { handover: 'Q3 2025', name: 'Cavalli Tower', developer: 'DAMAC / Roberto Cavalli', segment: 'Ultra-luxury',
              features: { ru: 'От AED ~1,75 М, branded Cavalli, 70 этажей', en: 'From AED ~1.75M, Cavalli branded, 70 floors' } },
            { handover: '2025', name: 'Ciel Dubai Marina', developer: 'The First Group', segment: 'Luxury',
              features: { ru: '82 этажа, самый высокий отель в мире на момент сдачи', en: "82 floors, world's tallest hotel at handover" } }
        ],
        'palm': [
            { handover: 'Q4 2025', name: 'AVA at Palm Jumeirah by Dorchester Collection', developer: 'OMNIYAT / Dorchester', segment: 'Trophy',
              features: { ru: 'От AED ~45,3 М, всего 17 резиденций', en: 'From AED ~45.3M, just 17 residences' } },
            { handover: 'Q4 2025', name: 'Serenia Living Tower 3', developer: 'Palma Holding', segment: 'Ultra-luxury',
              features: { ru: 'От AED ~12,5 М, sky penthouses', en: 'From AED ~12.5M, sky penthouses' } },
            { handover: 'Q4 2025', name: 'Luce', developer: 'Taraf', segment: 'Ultra-luxury',
              features: { ru: 'От AED ~7 М, эксклюзивный duplex/penthouse', en: 'From AED ~7M, exclusive duplex/penthouse' } },
            { handover: '2025', name: 'Six Senses Residences The Palm', developer: 'Select Group / Six Senses', segment: 'Trophy',
              features: { ru: 'Foster + Partners, Dorchester Collection management', en: 'Foster + Partners, Dorchester Collection management' } },
            { handover: 'Q1 2026', name: 'One Crescent', developer: 'AHS Properties', segment: 'Trophy',
              features: { ru: 'От AED ~15 М, beachfront penthouses на Crescent', en: 'From AED ~15M, beachfront penthouses on Crescent' } },
            { handover: 'Q1 2026', name: '39 Crescent Road', developer: '—', segment: 'Ultra-luxury',
              features: { ru: '88 апартаментов 2–6BR с private pools', en: '88 apartments 2–6BR with private pools' } },
            { handover: 'Q4 2026', name: 'ORLA by OMNIYAT', developer: 'OMNIYAT / Dorchester', segment: 'Trophy',
              features: { ru: 'От AED ~24 М, 270° обзора, Dorchester Collection', en: 'From AED ~24M, 270° views, Dorchester Collection' } },
            { handover: 'Q1 2027', name: 'Ocean House', developer: 'Ellington Properties', segment: 'Ultra-luxury',
              features: { ru: 'От AED ~9,5 М, 80/20 plan, full sea view', en: 'From AED ~9.5M, 80/20 plan, full sea view' } },
            { handover: 'Q4 2027', name: 'Orla Infinity by OMNIYAT', developer: 'OMNIYAT', segment: 'Trophy',
              features: { ru: 'От AED ~22 М, апофеоз branded sea-view', en: 'From AED ~22M, the pinnacle of branded sea-view' } },
            { handover: 'Q4 2027', name: 'Olaia Residences', developer: 'Gulf House Real Estate', segment: 'Ultra-luxury',
              features: { ru: 'От AED ~3,2 М (1BR), private beach access', en: 'From AED ~3.2M (1BR), private beach access' } }
        ],
        'canal': [
            { handover: 'Q3 2025', name: 'One Canal', developer: 'AHS Properties / Fendi Casa', segment: 'Trophy',
              features: { ru: '9 этажей, 24 резиденции, penthouses & sky villas', en: '9 floors, 24 residences, penthouses & sky villas' } },
            { handover: 'Q4 2025', name: 'Eden House The Canal', developer: 'H&H Development', segment: 'Ultra-luxury',
              features: { ru: 'Boutique-branded на Jumeirah-стороне канала', en: 'Boutique-branded on the Jumeirah side of the canal' } },
            { handover: 'Q1 2026', name: 'Casa Canal', developer: 'AHS Properties', segment: 'Trophy',
              features: { ru: 'Killa Design + HBA, 3–6BR sky villas, от AED ~22,5 М', en: 'Killa Design + HBA, 3–6BR sky villas, from AED ~22.5M' } },
            { handover: 'Q1 2027', name: 'Amali Residences', developer: 'Amali Properties / AHS', segment: 'Trophy',
              features: { ru: 'От AED ~10–14,5 М, 211 резиденций, private pool в каждой', en: 'From AED ~10–14.5M, 211 residences, private pool in every unit' } },
            { handover: 'Q4 2027', name: 'Four Seasons Private Residences (Jumeirah/Canal)', developer: 'H&H Development', segment: 'Trophy',
              features: { ru: 'От AED ~19 М, всего 28 резиденций', en: 'From AED ~19M, just 28 residences' } }
        ]
    };

    const SEGMENT_CLASS = {
        'Trophy': 'ul-badge--trophy',
        'Ultra-luxury': 'ul-badge--ultra',
        'Luxury': 'ul-badge--luxury'
    };

    const ulPanelsRoot = document.getElementById('ul-panels');

    if (ulPanelsRoot) {
        const colLabel = (key) => t('dubai.ul.col.' + key);
        const pickLang = (val) => {
            if (val == null) return '';
            if (typeof val === 'string') return val;
            const lang = window.I18N && window.I18N.getLang ? window.I18N.getLang() : 'ru';
            return val[lang] || val.ru || '';
        };
        const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
        }[c]));

        function renderUltra() {
            Object.keys(ULTRA_DATA).forEach(key => {
                const tbody = ulPanelsRoot.querySelector('[data-rows="' + key + '"]');
                const cards = ulPanelsRoot.querySelector('[data-cards="' + key + '"]');
                const items = ULTRA_DATA[key];
                if (!tbody || !cards) return;

                const rowsHtml = items.map(p => {
                    const segCls = SEGMENT_CLASS[p.segment] || 'ul-badge--luxury';
                    return (
                        '<tr>' +
                            '<td class="col-handover">' + escapeHtml(pickLang(p.handover)) + '</td>' +
                            '<td class="col-project">' + escapeHtml(p.name) + '</td>' +
                            '<td class="col-developer">' + escapeHtml(p.developer) + '</td>' +
                            '<td><span class="ul-badge ' + segCls + '">' + escapeHtml(p.segment) + '</span></td>' +
                            '<td class="col-features">' + escapeHtml(pickLang(p.features)) + '</td>' +
                        '</tr>'
                    );
                }).join('');
                tbody.innerHTML = rowsHtml;

                const cardsHtml = items.map(p => {
                    const segCls = SEGMENT_CLASS[p.segment] || 'ul-badge--luxury';
                    return (
                        '<article class="ul-card">' +
                            '<div class="ul-card__head">' +
                                '<div class="ul-card__name">' + escapeHtml(p.name) + '</div>' +
                                '<span class="ul-badge ' + segCls + '">' + escapeHtml(p.segment) + '</span>' +
                            '</div>' +
                            '<div class="ul-card__row"><div class="ul-card__label">' + escapeHtml(colLabel('handover')) + '</div><div class="ul-card__value">' + escapeHtml(pickLang(p.handover)) + '</div></div>' +
                            '<div class="ul-card__row"><div class="ul-card__label">' + escapeHtml(colLabel('developer')) + '</div><div class="ul-card__value">' + escapeHtml(p.developer) + '</div></div>' +
                            '<div class="ul-card__row"><div class="ul-card__label">' + escapeHtml(colLabel('features')) + '</div><div class="ul-card__value">' + escapeHtml(pickLang(p.features)) + '</div></div>' +
                        '</article>'
                    );
                }).join('');
                cards.innerHTML = cardsHtml;
            });
        }

        // Tab switching
        ulPanelsRoot.parentElement.querySelectorAll('.ul-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-target');
                if (!target) return;

                ulPanelsRoot.parentElement.querySelectorAll('.ul-tab').forEach(t => {
                    const isActive = t === tab;
                    t.classList.toggle('is-active', isActive);
                    t.setAttribute('aria-selected', String(isActive));
                });

                ulPanelsRoot.querySelectorAll('.ul-panel').forEach(panel => {
                    const isActive = panel.getAttribute('data-panel') === target;
                    panel.classList.toggle('is-active', isActive);
                    if (isActive) panel.removeAttribute('hidden');
                    else panel.setAttribute('hidden', '');
                });

                trackEvent('ul_tab_switch', { district: target });
            });
        });

        renderUltra();
        document.addEventListener('langchange', renderUltra);
    }

})();
