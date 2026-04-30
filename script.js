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

})();
