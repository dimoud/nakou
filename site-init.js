/**
 * site-init.js — μηχανή απόδοσης του ιστότοπου Γεωργίας Νάκου
 * ════════════════════════════════════════════════════════════════════════════
 * ΣΕΙΡΑ ΦΟΡΤΩΣΗΣ: στο τέλος του <body>, ΠΡΙΝ το i18n.js και το animations.js,
 * χωρίς defer. Διαβάζει το window.SITE_CONFIG (config.js) και:
 *   1. χτίζει τις μεταφράσεις (C.translations) για το i18n.js
 *   2. αποδίδει τα επαναλαμβανόμενα μέρη (ταινία, υπηρεσίες, βήματα, κριτικές,
 *      νέα, σύνδεσμοι, στοιχεία επικοινωνίας)
 *   3. δένει το μενού κινητού (πάνελ δεξιά, Χ, κύλιση/σουάιπ — κανόνας K11)
 *
 * Σε ΠΡΟΑΠΟΔΟΜΕΝΗ σελίδα (<html data-prerendered>) το περιεχόμενο είναι ήδη
 * στο HTML: εδώ χτίζονται μόνο οι μεταφράσεις και δένονται οι συμπεριφορές.
 * Περιεχόμενο ΔΕΝ γράφεται εδώ — μόνο στο config.js.
 * ════════════════════════════════════════════════════════════════════════════
 */
(function () {
    'use strict';

    var PRE = document.documentElement.getAttribute('data-prerendered');
    var C = window.SITE_CONFIG;
    if (!C) { console.error('[site-init] λείπει το window.SITE_CONFIG — φόρτωσε το config.js στο <head>'); return; }
    var P = C.profile, K = C.contact;

    function sget(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
    function $(id) { return document.getElementById(id); }
    function esc(s) { return String(s == null ? '' : s).replace(/&(?![a-zA-Z]+;|#\d+;)/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
    function pad(n) { return n < 10 ? '0' + n : '' + n; }

    // ── 1. ΜΕΤΑΦΡΑΣΕΙΣ ────────────────────────────────────────────────────────
    var T = {};
    /* Οι μεταφράσεις είναι ΣΚΕΤΟ κείμενο (το i18n.js γράφει textContent): το '&amp;' του config γίνεται '&' */
    function plain(s) { return String(s == null ? '' : s).replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&'); }
    function put(k, el, en) { T[k] = { el: plain(el), en: plain(en) }; }
    function pair(k, o, f) { put(k, o[f + 'El'], o[f + 'En']); }

    put('a11y.skip', 'Μετάβαση στο περιεχόμενο', 'Skip to content');
    put('a11y.top', 'Επιστροφή επάνω', 'Back to top');
    put('nav.menu', 'Μενού', 'Menu');
    put('nav.close', 'Κλείσιμο μενού', 'Close menu');
    put('nav.about', 'Προφίλ', 'Profile');
    put('nav.services', 'Υπηρεσίες', 'Services');
    put('nav.efka', 'e-ΕΦΚΑ', 'e-EFKA');
    put('nav.reviews', 'Κριτικές', 'Reviews');
    put('nav.contact', 'Επικοινωνία', 'Contact');
    put('brand.name', P.displayNameEl, P.displayNameEn);
    put('img.person', P.displayNameEl + ', ' + P.professionEl.toLowerCase(), P.displayNameEn + ', ' + P.professionEn.toLowerCase());

    pair('hero.badge', C.hero, 'badge');
    put('hero.first', P.firstNameEl, P.firstNameEn);
    put('hero.last', P.lastNameEl, P.lastNameEn);
    pair('hero.role', P, 'fullTitle');
    pair('hero.tagline', C.hero, 'tagline');
    put('hero.cta1', 'Επικοινωνία', 'Get in touch');
    put('hero.cta2', 'Υπηρεσίες', 'Services');

    put('about.label', 'Προφίλ', 'Profile');
    pair('about.heading', C.about, 'heading');
    put('about.cap', P.displayNameEl + ' · ' + P.fullTitleEl, P.displayNameEn + ' · ' + P.fullTitleEn);
    (C.about.points || []).forEach(function (p, i) { put('about.p' + (i + 1), p.el, p.en); });

    (C.marquee || []).forEach(function (m, i) { put('marquee.m' + (i + 1), m.el, m.en); });
    (C.manifesto || []).forEach(function (m, i) { put('mf.' + (i + 1), m.el, m.en); });

    put('services.label', 'Υπηρεσίες', 'Services');
    put('services.heading', 'Νομική κάλυψη σε κάθε βήμα', 'Legal cover at every step');
    put('svc.more', 'Περισσότερα', 'More');
    (C.services || []).forEach(function (s, i) {
        pair('s' + (i + 1) + '.title', s, 'title');
        pair('s' + (i + 1) + '.text', s, 'text');
    });

    put('journey.label', 'Η πορεία', 'The process');
    put('journey.heading', 'Πώς δουλεύουμε μαζί', 'How we work together');
    pair('journey.intro', C.journey, 'intro');
    (C.journey.steps || []).forEach(function (s, i) {
        pair('j' + (i + 1) + '.title', s, 'title');
        pair('j' + (i + 1) + '.text', s, 'text');
    });

    pair('efka.badge', C.efka, 'badge');
    pair('efka.heading', C.efka, 'heading');
    pair('efka.text', C.efka, 'text');
    put('efka.cta', 'Μετάβαση στον e-ΕΦΚΑ', 'Go to e-EFKA');

    put('reviews.label', 'Κριτικές', 'Reviews');
    put('reviews.heading', 'Η εμπιστοσύνη των πελατών μας', 'The trust of our clients');
    put('reviews.sub', 'Αξιολογήσεις Google', 'Google reviews · translated from Greek');
    (C.reviews || []).forEach(function (r, i) { put('rv.' + (i + 1), r.el, r.en); });

    put('news.label', 'Νέα', 'News');
    put('news.heading', 'Νομικές εξελίξεις', 'Legal updates');
    put('news.more', 'Διαβάστε', 'Read');
    (C.articles || []).forEach(function (a, i) {
        pair('n' + (i + 1) + '.cat', a, 'cat');
        pair('n' + (i + 1) + '.title', a, 'title');
        pair('n' + (i + 1) + '.text', a, 'text');
    });
    put('links.label', 'Χρήσιμοι σύνδεσμοι', 'Useful links');
    (C.links || []).forEach(function (l, i) {
        put('l' + (i + 1) + '.title', l.title, l.titleEn || l.title);
        put('l' + (i + 1) + '.desc', l.el, l.en);
    });

    put('contact.label', 'Επικοινωνία', 'Contact');
    put('contact.heading', 'Ας μιλήσουμε', 'Let’s talk');
    put('contact.sub', 'Καλέστε απευθείας ή στείλτε μήνυμα. Η πρώτη συνομιλία είναι δωρεάν.', 'Call directly or send a message. The first conversation is free.');
    put('contact.direct', 'Άμεση επικοινωνία', 'Direct contact');
    put('contact.mobile', 'Κινητό', 'Mobile');
    put('contact.landline', 'Σταθερό', 'Landline');
    put('contact.addressLabel', 'Γραφείο', 'Office');
    pair('contact.address', K, 'address');
    put('contact.emailLabel', 'Email', 'Email');
    put('contact.hoursLabel', 'Ώρες', 'Hours');
    pair('contact.hours', K, 'hours');
    put('contact.cities', 'Εξυπηρέτηση', 'Where we work');
    put('contact.byAppt', 'Κατόπιν ραντεβού', 'By appointment');
    put('city.ath', 'Αθήνα', 'Athens');
    put('city.thes', 'Θεσσαλονίκη', 'Thessaloniki');
    put('map.show', 'Εμφάνιση χάρτη', 'Show map');
    put('map.title', P.displayNameEl + ' — τοποθεσία γραφείου', P.displayNameEn + ' — office location');

    put('form.title', 'Στείλτε μήνυμα', 'Send a message');
    put('form.name', 'Ονοματεπώνυμο', 'Full name');
    put('form.email', 'Email', 'Email');
    put('form.phone', 'Τηλέφωνο (προαιρετικό)', 'Phone (optional)');
    put('form.message', 'Λίγα λόγια για την υπόθεσή σας', 'A few words about your case');
    put('form.submit', 'Αποστολή', 'Send');
    put('form.note', 'Απάντηση συνήθως μέσα σε μία εργάσιμη ημέρα.', 'We usually reply within one working day.');

    pair('footer.tagline', C.footer, 'tagline');
    put('cc.settings', 'Ρυθμίσεις cookies', 'Cookie settings');
    put('ec.rights', 'Με επιφύλαξη παντός δικαιώματος', 'All rights reserved');
    put('ec.by', 'Σχεδίαση', 'Designed by');
    put('ec.like', 'Σας αρέσει ο ιστότοπος;', 'Like this site?');
    put('ec.cta', 'Φτιάχνουμε και τον δικό σας', 'Let’s build yours');
    put('mcb.call', 'Κλήση', 'Call');
    put('mcb.msg', 'Μήνυμα', 'Message');

    C.translations = T;

    var KEY = 'lang_' + ((C.meta && C.meta.domain) || location.host || 'site');
    var st = sget(KEY);
    var LANG = PRE || ((st === 'el' || st === 'en') ? st : (C.meta.lang || 'el'));
    function tx(k) { return (T[k] && T[k][LANG]) || ''; }
    /* στοιχείο με κλειδί μετάφρασης: το κείμενο της τρέχουσας γλώσσας + data-i18n */
    function t(tag, k, cls, attrs) {
        return '<' + tag + (cls ? ' class="' + cls + '"' : '') + (attrs || '') + ' data-i18n="' + k + '">' + esc(tx(k)) + '</' + tag + '>';
    }

    // ── 2. ΑΠΟΔΟΣΗ (μόνο στη σελίδα ανάπτυξης / στο prerender) ───────────────
    if (!PRE) {
        var el;
        var ic = {
            phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
            mobile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
            mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,6 12,13 2,6"/></svg>',
            pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
            clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>',
            fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8V6c0-.9.6-1.1 1-1.1h2.5V1H14c-3.6 0-4.4 2.7-4.4 4.4V8H7v4h2.6v11H14V12h3.2l.4-4H14z"/></svg>'
        };

        // Πρώτη οθόνη: στοιχεία επικοινωνίας (υπολογιστής)
        if ((el = $('heroInfo'))) {
            el.innerHTML =
                '<a class="hic" href="' + K.phoneTel + '"><span class="hic-icon" aria-hidden="true">' + ic.mobile + '</span><span class="hic-text">' + t('span', 'contact.mobile', 'hic-label') + '<span class="hic-val">' + K.phone + '</span></span></a>' +
                '<a class="hic" href="' + K.landlineTel + '"><span class="hic-icon" aria-hidden="true">' + ic.phone + '</span><span class="hic-text">' + t('span', 'contact.landline', 'hic-label') + '<span class="hic-val">' + K.landline + '</span></span></a>' +
                '<a class="hic" href="mailto:' + K.email + '"><span class="hic-icon" aria-hidden="true">' + ic.mail + '</span><span class="hic-text">' + t('span', 'contact.emailLabel', 'hic-label') + '<span class="hic-val">' + K.email + '</span></span></a>' +
                '<a class="hic" href="' + esc(K.mapsUrl) + '" target="_blank" rel="noopener"><span class="hic-icon" aria-hidden="true">' + ic.pin + '</span><span class="hic-text">' + t('span', 'contact.addressLabel', 'hic-label') + t('span', 'contact.address', 'hic-val') + '</span></a>';
        }

        // Ταινία: δύο αντίγραφα για ατέρμονη κύλιση (το δεύτερο κρυφό για αναγνώστες)
        if ((el = $('marqueeTrack'))) {
            var m = '';
            [0, 1, 2].forEach(function () {
                (C.marquee || []).forEach(function (x, i) {
                    m += '<span class="marquee-item">' + t('span', 'marquee.m' + (i + 1)) + '<i class="marquee-dot">◆</i></span>';
                });
            });
            el.innerHTML = m;
        }

        // Πορτρέτο
        if ((el = $('portrait'))) {
            el.src = C.assets.photo;
            el.srcset = C.assets.photoSmall + ' 560w, ' + C.assets.photo + ' 960w';
            el.alt = tx('img.person');
        }

        if ((el = $('aboutPoints'))) {
            el.innerHTML = (C.about.points || []).map(function (p, i) {
                return '<li class="about-bio-item"><span class="about-bio-bullet" aria-hidden="true"></span>' + t('span', 'about.p' + (i + 1)) + '</li>';
            }).join('');
        }

        // Δήλωση: κάθε σειρά, λέξη-λέξη για το φώτισμα με την κύλιση
        if ((el = $('manifestoText'))) {
            el.innerHTML = (C.manifesto || []).map(function (r, i) {
                return t('span', 'mf.' + (i + 1), 'mf-row');
            }).join(' ');
        }

        // Υπηρεσίες: ακορντεόν με <button aria-expanded>, το κείμενο ΠΑΝΤΑ στο HTML
        if ((el = $('servicesList'))) {
            el.innerHTML = (C.services || []).map(function (s, i) {
                var n = i + 1;
                return '<div class="svc-item" data-reveal>' +
                    '<h3 class="svc-h"><button class="svc-row" type="button" aria-expanded="false" aria-controls="svc' + n + '">' +
                    '<span class="svc-n" aria-hidden="true">' + pad(n) + '</span>' +
                    t('span', 's' + n + '.title', 'svc-title') +
                    '<span class="svc-arrow" aria-hidden="true">+</span></button></h3>' +
                    '<div class="svc-detail-wrap" id="svc' + n + '">' + t('p', 's' + n + '.text', 'svc-detail') + '</div></div>';
            }).join('');
        }

        // Πορεία
        var steps = (C.journey && C.journey.steps) || [];
        if ((el = $('journeySteps'))) {
            el.innerHTML = steps.map(function (s, i) {
                var n = i + 1;
                return '<li class="journey-step' + (i === 0 ? ' on' : '') + '" data-i="' + i + '">' +
                    '<span class="js-n" aria-hidden="true">' + pad(n) + '</span><div class="js-body">' +
                    t('h3', 'j' + n + '.title', 'js-title') + t('p', 'j' + n + '.text', 'js-desc') + '</div></li>';
            }).join('');
        }
        if ((el = $('journeyCounter'))) {
            el.innerHTML = '<div class="jc-num">' + steps.map(function (s, i) {
                return '<span class="jc-n' + (i === 0 ? ' on' : '') + '">' + pad(i + 1) + '</span>';
            }).join('') + '</div><div class="jc-bar"><span></span></div>';
        }

        if ((el = $('efkaLink'))) el.href = C.efka.url;

        // Κριτικές: δύο σειρές που κυλούν (υπολογιστής) — στο κινητό μία, με σύρσιμο
        if ((el = $('reviewRows'))) {
            var R = C.reviews || [], half = Math.ceil(R.length / 2);
            var card = function (r, idx, hidden) {
                return '<li class="rev-card"' + (hidden ? ' aria-hidden="true"' : '') + '>' +
                    '<p class="rev-stars" aria-hidden="true">★★★★★</p>' +
                    '<blockquote class="rev-text">«<span data-i18n="rv.' + (idx + 1) + '">' + esc(tx('rv.' + (idx + 1))) + '</span>»</blockquote>' +
                    '<p class="rev-foot"><span class="rev-av" aria-hidden="true">' + esc(r.name.charAt(0).toUpperCase()) + '</span><span class="rev-name"' + (/[\u0370-\u03ff]/.test(r.name) ? ' lang="el"' : '') + ' translate="no">' + esc(r.name) + '</span></p></li>';
            };
            var row = function (from, to, cls) {
                var a = '', b = '';
                for (var i = from; i < to; i++) { a += card(R[i], i, false); b += card(R[i], i, true); }
                return '<div class="rev-rowwrap"><ul class="rev-track ' + cls + '">' + a + b + '</ul></div>';
            };
            el.innerHTML = row(0, half, '') + row(half, R.length, 'rev');
        }

        // Νέα: μόνο δικές της αναρτήσεις
        if ((el = $('newsGrid'))) {
            el.innerHTML = (C.articles || []).map(function (a, i) {
                var n = i + 1;
                return '<article class="news-card" data-reveal>' + t('span', 'n' + n + '.cat', 'news-tag') +
                    t('h3', 'n' + n + '.title', 'news-title') + t('p', 'n' + n + '.text', 'news-desc') +
                    '<a class="news-link" href="' + esc(a.url) + '" target="_blank" rel="noopener">' + t('span', 'news.more') + ' <span aria-hidden="true">→</span></a></article>';
            }).join('');
        }

        // Χρήσιμοι σύνδεσμοι: δύο αντίγραφα για τη συνεχή κύλιση
        if ((el = $('linksTrack'))) {
            var lk = function (hidden) {
                return (C.links || []).map(function (l, i) {
                    var n = i + 1;
                    return '<li><a class="link-pill" href="' + esc(l.url) + '" target="_blank" rel="noopener"' + (hidden ? ' tabindex="-1" aria-hidden="true"' : '') + '>' +
                        t('span', 'l' + n + '.title', 'link-pill-title') + t('span', 'l' + n + '.desc', 'link-pill-desc') +
                        '<span class="link-pill-arr" aria-hidden="true">↗</span></a></li>';
                }).join('');
            };
            el.innerHTML = lk(false) + lk(true);
        }

        // Επικοινωνία: ορατή ΚΑΙ στο κινητό
        if ((el = $('contactInfo'))) {
            var ci = function (href, icon, labelKey, val, valKey) {
                var inner = '<span class="ci-ic" aria-hidden="true">' + icon + '</span><span class="ci-txt">' + t('b', labelKey) +
                    (valKey ? t('span', valKey) : '<span>' + val + '</span>') + '</span>';
                return href ? '<a class="ci" href="' + esc(href) + '"' + (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : '') + '>' + inner + '<span class="ci-go" aria-hidden="true">↗</span></a>'
                            : '<div class="ci">' + inner + '</div>';
            };
            el.innerHTML =
                '<div class="ci-block">' + t('p', 'contact.direct', 'ci-cap') +
                ci(K.phoneTel, ic.mobile, 'contact.mobile', K.phone) +
                ci(K.landlineTel, ic.phone, 'contact.landline', K.landline) +
                ci('mailto:' + K.email, ic.mail, 'contact.emailLabel', K.email) +
                ci(K.mapsUrl, ic.pin, 'contact.addressLabel', '', 'contact.address') +
                ci('', ic.clock, 'contact.hoursLabel', '', 'contact.hours') + '</div>' +
                '<div class="ci-block">' + t('p', 'contact.cities', 'ci-cap') + '<div class="ci-cities">' +
                ['city.ath', 'city.thes'].map(function (c) {
                    return '<div class="ci-city"><span class="ci-city-dot" aria-hidden="true"></span><div>' + t('p', c, 'ci-city-name') + t('p', 'contact.byAppt', 'ci-city-note') + '</div></div>';
                }).join('') + '</div></div>' +
                '<a class="ci-social" href="' + esc(K.facebook) + '" target="_blank" rel="noopener"><span class="ci-ic" aria-hidden="true">' + ic.fb + '</span> Facebook</a>';
        }

        if ((el = $('footerPhone'))) { el.href = K.phoneTel; el.textContent = K.phone; }
        if ((el = $('footerEmail'))) { el.href = 'mailto:' + K.email; el.textContent = K.email; }
        if ((el = $('mcbCall'))) el.href = K.phoneTel;
    }

    // ── 3. ΜΕΝΟΥ ΚΙΝΗΤΟΥ (σε ΚΑΘΕ σελίδα, και στην προαποδομένη) ──────────────
    // K11: πάνελ ΔΕΞΙΑ (≤ 82vw, ≤ 340px), Χ, κλείνει με πάτημα/κύλιση έξω,
    // σουάιπ αριστερά/δεξιά, Esc και με σύνδεσμο.
    (function () {
        if (window.__PRERENDER) return;
        var links = $('navLinks'), old = $('hamburger');
        if (!links || !old || links.getAttribute('data-menu-bound')) return;
        links.setAttribute('data-menu-bound', '1');
        var html = document.documentElement;
        var hamb = old.cloneNode(true);
        old.parentNode.replaceChild(hamb, old);
        var closeBtn = links.querySelector('.nav-close');
        var bd = document.createElement('div'); bd.className = 'nav-backdrop'; bd.hidden = true; document.body.appendChild(bd);
        var y0 = 0, tx0 = null, ty0 = 0;
        function isOpen() { return links.classList.contains('open'); }
        function openMenu() {
            links.classList.add('open'); html.classList.add('nav-open'); bd.hidden = false;
            hamb.setAttribute('aria-expanded', 'true'); y0 = window.scrollY;
            try { closeBtn.focus({ preventScroll: true }); } catch (e) { /* παλιός περιηγητής */ }
        }
        function closeMenu(back) {
            if (!isOpen()) return;
            links.classList.remove('open'); html.classList.remove('nav-open'); bd.hidden = true;
            hamb.setAttribute('aria-expanded', 'false');
            if (back) { try { hamb.focus({ preventScroll: true }); } catch (e) { /* — */ } }
        }
        hamb.addEventListener('click', function () { isOpen() ? closeMenu(true) : openMenu(); });
        if (closeBtn) closeBtn.addEventListener('click', function () { closeMenu(true); });
        bd.addEventListener('click', function () { closeMenu(); });
        bd.addEventListener('touchmove', function () { closeMenu(); }, { passive: true });
        bd.addEventListener('wheel', function () { closeMenu(); }, { passive: true });
        links.addEventListener('click', function (e) { if (e.target.closest('a[href]')) closeMenu(); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(true); });
        window.addEventListener('scroll', function () { if (isOpen() && Math.abs(window.scrollY - y0) > 8) closeMenu(); }, { passive: true });
        document.addEventListener('touchstart', function (e) {
            if (!isOpen() || e.touches.length !== 1) { tx0 = null; return; }
            tx0 = e.touches[0].clientX; ty0 = e.touches[0].clientY;
        }, { passive: true });
        document.addEventListener('touchend', function (e) {
            if (tx0 === null || !isOpen()) return;
            var p = e.changedTouches[0], dx = p.clientX - tx0, dy = p.clientY - ty0;
            tx0 = null;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) closeMenu();
        }, { passive: true });
        window.addEventListener('resize', function () { if (window.innerWidth > 860) closeMenu(); }, { passive: true });
    })();
})();
