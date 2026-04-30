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
            { handover: { ru: 'Сдан', en: 'Delivered' }, name: 'Address Residences Dubai Opera', developer: 'Emaar Properties', segment: 'Luxury',
              features: { ru: '803 резиденции в двух башнях (64 и 56 этажей), силуэт в форме арабских парусников, прямые виды на Burj Khalifa и Burj Lake', en: '803 residences across two towers of 64 and 56 floors, sailboat-inspired silhouette, direct Burj Khalifa and Burj Lake views' } },
            { handover: '2025', name: 'St. Regis The Residences (Financial Center)', developer: 'Emaar / Marriott', segment: 'Ultra Prime',
              features: { ru: '402 резиденции в двух art-deco башнях 262 и 171 м, butler service от St. Regis, cigar lounge', en: '402 residences across two art-deco towers of 262 m and 171 m, signature St. Regis butler service, cigar lounge' } },
            { handover: '2025', name: 'Mercedes-Benz Places by Binghatti', developer: 'Binghatti', segment: 'Ultra Prime',
              features: { ru: '150 резиденций и 5 пентхаусов, 341 м / ~65 этажей, дизайн-DNA Mercedes-Benz, 75 000 sq ft фотовольтаики', en: "150 residences plus 5 penthouses, 341 m supertall / ~65 floors, Mercedes-Benz design DNA, 75,000 sq ft of photovoltaics" } },
            { handover: 'Q4 2026', name: 'Mr. C Residences Downtown', developer: 'Alta Real Estate / Cipriani', segment: 'Ultra-luxury',
              features: { ru: '162 резиденции на 71 этаже, Nobile Collection из 22 апартаментов на верхних этажах, Arquitectonica, интерьеры 1508 London', en: '162 residences across 71 floors, 22-unit Nobile Collection on upper floors, Arquitectonica architecture, interiors by 1508 London' } },
            { handover: '2026', name: 'Baccarat Hotel & Residences (Tower 1)', developer: 'Shamal Holding / H&H', segment: 'Ultra Prime',
              features: { ru: '49 резиденций и 4 пентхауса на 44 этажах / 237 м, Studio Libeskind, силуэт хрустального кристалла, отель Baccarat в этой же башне', en: '49 residences plus 4 penthouses across 44 floors / 237 m, Studio Libeskind crystal-prism silhouette, Baccarat hotel in the same tower' } },
            { handover: '2027', name: 'Rouge by Baccarat (Tower 2)', developer: 'Shamal Holding / H&H', segment: 'Ultra Prime',
              features: { ru: '42 резиденции 3–4BR на 24 этажах, Studio Libeskind, фасад из ограненного хрусталя, эксклюзив Baccarat collection', en: '42 three- and four-bedroom residences across 24 floors, Studio Libeskind cut-crystal façade, exclusive Baccarat collection pieces' } },
            { handover: '2027', name: 'Fairmont Residences Solara Tower', developer: 'SOL Properties / Fairmont', segment: 'Ultra-luxury',
              features: { ru: '246 резиденций на 55 этажах / 277 м, потолки 3,65 м (9 м в дуплекс-пентхаусах), 60-м бассейн, кухни Miele', en: '246 residences across 55 floors / 277 m, 3.65 m ceilings (9 m in duplex penthouses), 60-metre pool, Miele kitchens' } },
            { handover: '2027', name: 'Rixos Financial Center Road', developer: 'Rixos / partners', segment: 'Luxury',
              features: { ru: '260 резиденций на 77 этажах / 340 м, первый отдельностоящий Rixos Residences в мире, sky lounge pool на 65 этаже, Turkish hammam, архитектура Aedas', en: "260 residences across 77 floors / 340 m, world's first standalone Rixos Residences, 65th-floor sky lounge pool, Turkish hammam, Aedas architecture" } }
        ],
        'business-bay': [
            { handover: { ru: 'Сдан (Q1 2024)', en: 'Delivered (Q1 2024)' }, name: 'The Lana Residences, Dorchester Collection', developer: 'OMNIYAT / Dorchester', segment: 'Ultra Prime',
              features: { ru: '39 резиденций на 29 этажах, 6 пентхаусов с private pools, Foster + Partners, Marasi Bay Marina', en: '39 residences across 29 floors, 6 penthouses with private pools, Foster + Partners, Marasi Bay Marina' } },
            { handover: { ru: 'Сдан (Q4 2025)', en: 'Delivered (Q4 2025)' }, name: 'Jumeirah Living Business Bay', developer: 'Select Group / Jumeirah Group', segment: 'Ultra-luxury',
              features: { ru: '82 резиденции на 35 этажах, Killa Design, multi-level wellness club, кинозал', en: '82 residences across 35 floors, Killa Design, multi-level wellness club, private cinema' } },
            { handover: { ru: 'Ожидается Q4 2026', en: 'Expected Q4 2026' }, name: 'Bugatti Residences by Binghatti', developer: 'Binghatti / Bugatti', segment: 'Ultra Prime',
              features: { ru: '182 резиденции: 171 Riviera Mansions + 11 Sky Mansions, car-lift до квартиры, Riviera-beach', en: '182 residences: 171 Riviera Mansions + 11 Sky Mansions, car lift to your unit, Riviera-inspired beach' } },
            { handover: { ru: 'Ожидается Q2 2027', en: 'Expected Q2 2027' }, name: 'Vela Viento', developer: 'OMNIYAT', segment: 'Ultra Prime',
              features: { ru: '92 резиденции на 45 этажах, Foster + Partners, интерьеры Gilles & Boissier, управление Dorchester Collection', en: '92 residences across 45 floors, Foster + Partners, Gilles & Boissier interiors, Dorchester Collection management' } },
            { handover: { ru: 'Ожидается Q4 2027', en: 'Expected Q4 2027' }, name: 'Eywa', developer: 'R.evolution', segment: 'Ultra Prime',
              features: { ru: '48 резиденций (включая 2 пентхауса), 16 тонн кристаллов в конструкции, MERV-16 фильтрация, EMF-защищённые спальни, биофилный дизайн', en: '48 residences (including 2 penthouses), 16 tons of crystals embedded in structure, MERV-16 air filtration, EMF-shielded bedrooms, biophilic design' } }
        ],
        'difc': [
            { handover: 'Q2 2025', name: 'Waldorf Astoria Residences DIFC', developer: 'Daman Real Estate / Hilton', segment: 'Ultra Prime',
              features: { ru: '28 резиденций на верхних этажах Burj Daman (51–55), Art Deco-интерьеры, доступ к сервисам Waldorf Astoria, рестораны Bull & Bear и Peacock Alley', en: '28 residences on top floors of Burj Daman (51–55), Art Deco-inspired interiors, full Waldorf Astoria hotel service, Bull & Bear and Peacock Alley restaurants' } },
            { handover: 'Q1 2026', name: 'Ritz-Carlton Residences DIFC', developer: 'DIFC partners / Marriott', segment: 'Ultra Prime',
              features: { ru: '73 резиденции от MAG, 1–3BR + 2 пентхауса и 4BR duplex-villa до 13 379 sqft, branded Ritz-Carlton', en: '73 residences by MAG, 1–3BR plus two penthouses and a 4BR duplex villa up to 13,379 sqft, Ritz-Carlton branded' } },
            { handover: 'Q2 2026', name: 'DIFC Heights Tower', developer: 'DIFC Development', segment: 'Ultra-luxury',
              features: { ru: '366 резиденций от 1BR до 4BR duplex, фасад с каллиграфией Маттара бин Лахеджа по поэзии шейха Мохаммеда, цель LEED Platinum, прямой выход на Gate Avenue', en: "366 residences from 1BR to 4BR duplexes, façade with Mattar bin Lahej calligraphy of Sheikh Mohammed's poetry, targeting LEED Platinum, direct link to Gate Avenue" } },
            { handover: 'Q3 2026', name: 'DIFC Living', developer: 'DIFC Authority', segment: 'Luxury',
              features: { ru: '174 квартиры и лофты 1–3BR — первый резиденциальный проект DIFC, infinity-бассейн, частный кинозал, прямой выход на Gate Avenue', en: "174 apartments and lofts 1–3BR — DIFC's first residential project, infinity pool, private cinema, direct access to Gate Avenue" } },
            { handover: 'Q4 2027', name: 'Four Seasons Private Residences DIFC', developer: 'H&H Development', segment: 'Ultra Prime',
              features: { ru: '59 резиденций включая 2 пентхауса с private pools от 1 145 кв.м, архитектор Sir David Chipperfield, интерьеры Tihany Design, целый 12-й этаж под amenities', en: '59 residences including 2 penthouses with private pools from 1,145 sqm, architect Sir David Chipperfield, interiors by Tihany Design, full 12th-floor amenities deck' } },
            { handover: '2027+', name: 'Janu Dubai', developer: 'Aman / H&H', segment: 'Ultra Prime',
              features: { ru: '57 branded резиденций, архитекторы Herzog & de Meuron (Pritzker), amenities-этаж на 34-м этаже с infinity pool, sky garden на крыше, Janu Club & Spa', en: '57 branded residences, Herzog & de Meuron (Pritzker) architects, 34th-floor amenities deck with infinity pool, rooftop sky garden, Janu Club and Spa' } }
        ],
        'marina': [
            { handover: { ru: 'Сдан (Q4 2022)', en: 'Delivered (Q4 2022)' }, name: 'Vida Residences Dubai Marina', developer: 'Emaar / Vida (Emaar Hospitality)', segment: 'Luxury',
              features: { ru: '300 резиденций на 57 этажах, 1–4BR, архитектура Killa Design, над Dubai Marina Yacht Club', en: '300 residences across 57 floors, 1–4BR, architecture by Killa Design, above Dubai Marina Yacht Club' } },
            { handover: '2025', name: 'Ciel Dubai Marina', developer: 'The First Group', segment: 'Luxury',
              features: { ru: '1004 номера на 82 этажах, 377 м — самый высокий отель в мире, архитектура NORR, Vignette Collection by IHG, infinity pool на 76 этаже', en: "1,004 keys across 82 floors, 377 m — world's tallest hotel, designed by NORR, Vignette Collection by IHG, infinity pool on level 76" } }
        ],
        'palm': [
            { handover: 'Q4 2025', name: 'AVA at Palm Jumeirah by Dorchester Collection', developer: 'OMNIYAT / Dorchester', segment: 'Ultra Prime',
              features: { ru: '17 резиденций на 24 этажах, по одной на этаж с private pool, 4-уровневый Sky Palace, U+A Architects, интерьеры Portia Fox', en: '17 residences across 24 floors, one per floor with private pool, 4-level Sky Palace, U+A Architects, interiors by Portia Fox' } },
            { handover: 'Q4 2025', name: 'Serenia Living Tower 3', developer: 'Palma Holding', segment: 'Ultra-luxury',
              features: { ru: '22 sky-пентхауса 3–6BR (5 000–14 000 sqft), full-floor и half-floor, архитектор Hazel Wong (Emirates Towers), West Crescent', en: '22 sky penthouses 3–6BR (5,000–14,000 sqft), full-floor and half-floor, architect Hazel Wong (Emirates Towers), West Crescent' } },
            { handover: 'Q4 2025', name: 'Luce', developer: 'Taraf', segment: 'Ultra-luxury',
              features: { ru: '36 резиденций 2–4BR + penthouse и duplex, 10 этажей, MZ Architects, East Crescent с прямым выходом на пляж', en: '36 residences 2–4BR plus penthouse and duplex, 10 floors, MZ Architects, East Crescent with direct beach access' } },
            { handover: '2025', name: 'Six Senses Residences The Palm', developer: 'Select Group / Six Senses', segment: 'Ultra Prime',
              features: { ru: '162 резиденции (121 пентхаус, 32 sky villa, 9 beachfront villa), West Crescent, 60 000 sqft wellness club с longevity clinic', en: '162 residences (121 penthouses, 32 sky villas, 9 beachfront villas), West Crescent, 60,000 sqft wellness club with longevity clinic' } },
            { handover: 'Q1 2026', name: 'One Crescent', developer: 'AHS Properties', segment: 'Ultra Prime',
              features: { ru: '25 резиденций — 3–4BR пентхаусы, 5BR sky villas и 6BR sky mansions, Killa Design (Museum of the Future), East Crescent beachfront', en: '25 residences — 3–4BR penthouses, 5BR sky villas and 6BR sky mansions, designed by Killa Design (Museum of the Future), East Crescent beachfront' } },
            { handover: 'Q4 2026', name: 'ORLA by OMNIYAT', developer: 'OMNIYAT / Dorchester', segment: 'Ultra Prime',
              features: { ru: '93 резиденции на 13 этажах, Foster + Partners, Dorchester Collection, sky palaces 17 000–22 000 sqft и 2 super-luxury mansion', en: '93 residences across 13 floors, Foster + Partners, Dorchester Collection, sky palaces 17,000–22,000 sqft plus 2 super-luxury mansions' } },
            { handover: 'Q1 2027', name: 'Ellington Ocean House', developer: 'Ellington Properties', segment: 'Ultra-luxury',
              features: { ru: '88 резиденций 2–6BR на 9 этажах (G+9), 6BR presidential suite и два угловых 5BR penthouse, full sea view', en: '88 residences 2–6BR across 9 floors (G+9), 6BR presidential suite and two corner 5BR penthouses, full sea view' } },
            { handover: 'Q4 2027', name: 'Orla Infinity by OMNIYAT', developer: 'OMNIYAT', segment: 'Ultra Prime',
              features: { ru: '20 duplex-резиденций 4BR на 12 этажах, Foster + Partners, интерьеры YODEZEEN, бассейны до 18 м, Dorchester Collection', en: '20 4BR duplex residences across 12 floors, Foster + Partners, interiors by YODEZEEN, pools up to 18 m, Dorchester Collection' } },
            { handover: 'Q4 2027', name: 'Olaia Residences', developer: 'Gulf House Real Estate', segment: 'Ultra-luxury',
              features: { ru: '34 duplex 3–5BR (18 на верхнем этаже с private pool) + 1–3BR апартаменты, 10 жилых этажей, private beach access', en: '34 duplexes 3–5BR (18 top-floor with private pool) plus 1–3BR apartments, 10 residential floors, private beach access' } }
        ],
        'canal': [
            { handover: 'Q3 2025', name: 'One Canal', developer: 'AHS Properties / Fendi Casa', segment: 'Ultra Prime',
              features: { ru: '24 резиденции на 9 этажах, sky mansion 18 000 sqft, Killa Design + HBA, мебель Fendi Casa, private sky infinity pools', en: '24 ultra-residences across 9 floors, 18,000 sqft sky mansion, Killa Design + HBA, Fendi Casa furniture, private sky infinity pools' } },
            { handover: 'Q4 2025', name: 'Eden House The Canal', developer: 'H&H Development', segment: 'Ultra-luxury',
              features: { ru: '88 апартаментов, 7 вилл и 3 пентхауса, low-rise 6 этажей, архитектура DXB Lab в стиле круизного лайнера, Jumeirah-сторона канала', en: '88 apartments, 7 villas and 3 penthouses, low-rise 6 floors, DXB Lab cruise-liner-inspired architecture, Jumeirah side of the canal' } },
            { handover: 'Q1 2026', name: 'Casa Canal', developer: 'AHS Properties', segment: 'Ultra Prime',
              features: { ru: '3 sky palaces + 6BR sky mansions, 4–5BR sky villas и 3BR пентхаусы (4 500–30 000 sqft), Killa Design + HBA, интерьеры Fendi Casa, проект $850 М', en: '3 sky palaces plus 6BR sky mansions, 4–5BR sky villas and 3BR penthouses (4,500–30,000 sqft), Killa Design + HBA, Fendi Casa interiors, $850M project' } },
            { handover: 'Q1 2027', name: 'Amali Residences', developer: 'Amali Properties / AHS', segment: 'Ultra Prime',
              features: { ru: '211 резиденций на 48 этажах, private pool в каждой, потолки 5,5 м, Killa Design + HBA, 54 000+ sqft amenities', en: '211 residences across 48 floors, private pool in every unit, 5.5 m floor-to-floor, Killa Design + HBA, 54,000+ sqft of amenities' } },
            { handover: 'Q4 2027', name: 'Four Seasons Private Residences (Jumeirah/Canal)', developer: 'H&H Development', segment: 'Ultra Prime',
              features: { ru: '28 резиденций (24 апартамента 2–4BR + 4 таунхауса 5BR), дизайн Sybille de Margerie, private beach в составе Four Seasons Resort Jumeirah Beach', en: '28 residences (24 apartments 2–4BR + 4 townhouses 5BR), designed by Sybille de Margerie, private beach access within Four Seasons Resort Jumeirah Beach masterplan' } }
        ]
    };

    const SEGMENT_CLASS = {
        'Ultra Prime': 'ul-badge--ultra-prime',
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
        const isDelivered = (p) => {
            const h = p && p.handover;
            if (!h || typeof h === 'string') return false;
            return /^Сдан/.test(h.ru || '') || /^Delivered/.test(h.en || '');
        };
        const completionLabel = (p) => {
            if (isDelivered(p)) return t('dubai.ul.completion.delivered');
            if (typeof p.completion === 'number') {
                const lang = window.I18N && window.I18N.getLang ? window.I18N.getLang() : 'ru';
                return (lang === 'en' ? 'completion ' : 'готовность ') + p.completion + '%';
            }
            return '';
        };
        const featuresCell = (p) => {
            const base = escapeHtml(pickLang(p.features));
            const comp = completionLabel(p);
            return base + (comp ? ' <span class="ul-completion">' + escapeHtml(comp) + '</span>' : '');
        };

        function renderUltra() {
            Object.keys(ULTRA_DATA).forEach(key => {
                const tbody = ulPanelsRoot.querySelector('[data-rows="' + key + '"]');
                const cards = ulPanelsRoot.querySelector('[data-cards="' + key + '"]');
                const items = ULTRA_DATA[key];
                if (!tbody || !cards) return;

                const rowsHtml = items.map(p => {
                    const segCls = SEGMENT_CLASS[p.segment] || 'ul-badge--luxury';
                    const trCls = isDelivered(p) ? ' class="ul-row--delivered"' : '';
                    return (
                        '<tr' + trCls + '>' +
                            '<td class="col-handover">' + escapeHtml(pickLang(p.handover)) + '</td>' +
                            '<td class="col-project">' + escapeHtml(p.name) + '</td>' +
                            '<td class="col-developer">' + escapeHtml(p.developer) + '</td>' +
                            '<td><span class="ul-badge ' + segCls + '">' + escapeHtml(p.segment) + '</span></td>' +
                            '<td class="col-features">' + featuresCell(p) + '</td>' +
                        '</tr>'
                    );
                }).join('');
                tbody.innerHTML = rowsHtml;

                const cardsHtml = items.map(p => {
                    const segCls = SEGMENT_CLASS[p.segment] || 'ul-badge--luxury';
                    const cardCls = 'ul-card' + (isDelivered(p) ? ' ul-card--delivered' : '');
                    return (
                        '<article class="' + cardCls + '">' +
                            '<div class="ul-card__head">' +
                                '<div class="ul-card__name">' + escapeHtml(p.name) + '</div>' +
                                '<span class="ul-badge ' + segCls + '">' + escapeHtml(p.segment) + '</span>' +
                            '</div>' +
                            '<div class="ul-card__row"><div class="ul-card__label">' + escapeHtml(colLabel('handover')) + '</div><div class="ul-card__value">' + escapeHtml(pickLang(p.handover)) + '</div></div>' +
                            '<div class="ul-card__row"><div class="ul-card__label">' + escapeHtml(colLabel('developer')) + '</div><div class="ul-card__value">' + escapeHtml(p.developer) + '</div></div>' +
                            '<div class="ul-card__row"><div class="ul-card__label">' + escapeHtml(colLabel('features')) + '</div><div class="ul-card__value">' + featuresCell(p) + '</div></div>' +
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
