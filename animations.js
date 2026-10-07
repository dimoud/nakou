/**
 * animations.js — κίνηση και μικρές συμπεριφορές (ιστότοπος Νάκου)
 * ════════════════════════════════════════════════════════════════════════════
 * Φορτώνει ΜΕΤΑ το site-init.js και το i18n.js (βλέπει ό,τι χτίστηκε).
 * Με prefers-reduced-motion: καμία κίνηση· τα περιεχόμενα εμφανίζονται αμέσως.
 * Τίποτα εδώ δεν γράφει περιεχόμενο — μόνο κλάσεις, στυλ και συμβάντα.
 * ════════════════════════════════════════════════════════════════════════════
 */
(function () {
    'use strict';
    if (window.__PRERENDER) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia('(pointer: fine)').matches;
    var root = document.documentElement;
    function $(id) { return document.getElementById(id); }
    function onScroll(fn) { window.addEventListener('scroll', fn, { passive: true }); fn(); }
    function frame(fn) { var r = 0; return function () { cancelAnimationFrame(r); r = requestAnimationFrame(fn); }; }

    var y = document.getElementById('ecYear');
    if (y) y.textContent = new Date().getFullYear();

    /* 1. Εμφάνιση με την κύλιση ([data-reveal] → .visible) */
    var rev = document.querySelectorAll('[data-reveal]');
    if (reduced || !('IntersectionObserver' in window)) {
        rev.forEach(function (e) { e.classList.add('visible'); });
    } else {
        var io = new IntersectionObserver(function (es) {
            es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        rev.forEach(function (e) { io.observe(e); });
    }

    /* 2. Μενού: συμπαγές μετά από 60px · μπάρα προόδου · κουμπί «επάνω» */
    var nav = $('nav'), bar = $('progress'), top = $('backToTop');
    onScroll(frame(function () {
        var s = window.scrollY, h = root.scrollHeight - root.clientHeight;
        if (nav) nav.classList.toggle('solid', s > 60);
        if (bar) bar.style.transform = 'scaleX(' + (h > 0 ? s / h : 0) + ')';
        if (top) top.classList.toggle('show', s > 500);
    }));
    if (top) top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }); });

    /* 3. Σωματίδια στην πρώτη οθόνη (λιγότερα και χωρίς σκιά σε κινητό) */
    var cv = $('heroParticles');
    if (cv && !reduced && cv.getContext) {
        var ctx = cv.getContext('2d'), w, h, pts, raf = 0, running = false;
        var N = fine ? 80 : 36;
        var size = function () { w = cv.width = cv.offsetWidth; h = cv.height = cv.offsetHeight; };
        size(); window.addEventListener('resize', size, { passive: true });
        pts = Array.from({ length: N }, function () {
            return { x: Math.random() * w, y: Math.random() * h, r: Math.random() * 2.2 + 0.8,
                     vx: (Math.random() - 0.5) * 0.25, vy: -(Math.random() * 0.35 + 0.05),
                     life: Math.random(), sp: 0.0014 + Math.random() * 0.0016 };
        });
        if (fine) { ctx.shadowColor = 'rgba(201,163,94,0.7)'; ctx.shadowBlur = 6; }
        var draw = function () {
            ctx.clearRect(0, 0, w, h);
            pts.forEach(function (p) {
                p.life += p.sp; p.x += p.vx; p.y += p.vy;
                if (p.life >= 1 || p.y < -10) { p.life = 0; p.x = Math.random() * w; p.y = h + 10; }
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832);
                ctx.fillStyle = 'rgba(212,176,108,' + (Math.sin(p.life * Math.PI) * 0.9).toFixed(3) + ')'; ctx.fill();
            });
            raf = requestAnimationFrame(draw);
        };
        /* σταματά όταν η πρώτη οθόνη δεν φαίνεται — μπαταρία κινητού */
        new IntersectionObserver(function (es) {
            var vis = es[0].isIntersecting;
            if (vis && !running) { running = true; draw(); }
            else if (!vis && running) { running = false; cancelAnimationFrame(raf); }
        }).observe(cv);
    }

    /* 4. Παράλλαξη πρώτης οθόνης (μόνο με ποντίκι) */
    var inner = $('heroInner'), embBg = document.querySelector('.hero-emblem-bg');
    if (fine && !reduced && inner) {
        onScroll(frame(function () {
            var s = window.scrollY, vh = window.innerHeight;
            if (s > vh * 1.25) return;
            var p = Math.min(s / vh, 1);
            inner.style.transform = 'translateY(' + (s * 0.3) + 'px)';
            inner.style.opacity = String(Math.max(0, 1 - p * 1.3));
            if (embBg) embBg.style.transform = 'translate(-50%, calc(-46% + ' + (s * 0.14) + 'px)) scale(' + (1 + p * 0.14) + ')';
        }));
    }

    /* 5. Δήλωση: οι λέξεις φωτίζονται καθώς κυλάς (το κείμενο μένει ολόκληρο για αναγνώστες) */
    var mf = $('manifestoText');
    if (mf) {
        var words = [];
        mf.querySelectorAll('.mf-row').forEach(function (row) {
            var txt = row.textContent.trim();
            row.textContent = '';
            var sr = document.createElement('span'); sr.className = 'sr-only'; sr.textContent = txt; row.appendChild(sr);
            txt.split(/\s+/).forEach(function (wd) {
                var s = document.createElement('span'); s.className = 'mf-w'; s.setAttribute('aria-hidden', 'true');
                s.textContent = wd; row.appendChild(s); row.appendChild(document.createTextNode(' ')); words.push(s);
            });
        });
        var glow = document.querySelector('.manifesto-glow'), sec = $('manifesto');
        if (reduced) words.forEach(function (s) { s.classList.add('lit'); });
        else onScroll(frame(function () {
            var r = sec.getBoundingClientRect(), vh = window.innerHeight;
            var p = Math.max(0, Math.min(1, (vh - r.top) / (r.height + vh * 0.6)));
            var act = p * (words.length + 2) - 1;
            words.forEach(function (s, i) {
                var lit = Math.max(0, Math.min(1, act - i + 1));
                s.style.opacity = (0.16 + lit * 0.84).toFixed(3);
                s.style.transform = 'translateY(' + ((1 - lit) * 10).toFixed(1) + 'px)';
                s.classList.toggle('lit', lit > 0.6);
            });
            if (glow) glow.style.opacity = (0.25 + p * 0.55).toFixed(3);
        }));
    }

    /* 6. Υπηρεσίες: ακορντεόν (ένα ανοιχτό τη φορά) */
    document.querySelectorAll('.svc-row').forEach(function (b) {
        b.addEventListener('click', function () {
            var item = b.closest('.svc-item'), open = !item.classList.contains('svc-open');
            document.querySelectorAll('.svc-item.svc-open').forEach(function (o) {
                o.classList.remove('svc-open'); o.querySelector('.svc-row').setAttribute('aria-expanded', 'false');
            });
            item.classList.toggle('svc-open', open);
            b.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    });

    /* 7. Πορεία: το βήμα στη μέση της οθόνης φωτίζεται */
    var js = document.querySelectorAll('.journey-step'), jn = document.querySelectorAll('.jc-n'), jb = document.querySelector('.jc-bar span');
    if (js.length && 'IntersectionObserver' in window) {
        var setStep = function (i) {
            js.forEach(function (e, k) { e.classList.toggle('on', k === i); });
            jn.forEach(function (e, k) { e.classList.toggle('on', k === i); });
            if (jb) jb.style.transform = 'scaleY(' + ((i + 1) / js.length) + ')';
        };
        var jo = new IntersectionObserver(function (es) {
            es.forEach(function (e) { if (e.isIntersecting) setStep(+e.target.getAttribute('data-i')); });
        }, { rootMargin: '-45% 0px -45% 0px' });
        js.forEach(function (e) { jo.observe(e); });
    }

    /* 8. Κριτικές / σύνδεσμοι: παύση στο άγγιγμα ή στο ποντίκι */
    document.querySelectorAll('.rev-rowwrap, .links-scroll-wrap').forEach(function (w) {
        var pause = function () { w.classList.add('paused'); }, go = function () { w.classList.remove('paused'); };
        w.addEventListener('touchstart', pause, { passive: true });
        w.addEventListener('touchend', function () { setTimeout(go, 2500); });
        w.addEventListener('mouseenter', pause); w.addEventListener('mouseleave', go);
        w.addEventListener('focusin', pause); w.addEventListener('focusout', go);
    });

    /* 9. Χάρτης μόνο με πάτημα: χωρίς cookies της Google και χωρίς βάρος στη φόρτωση */
    var ml = $('mapLoad'), C = window.SITE_CONFIG;
    if (ml && C && C.contact && C.contact.mapsEmbed) {
        ml.addEventListener('click', function () {
            var f = document.createElement('iframe');
            f.src = C.contact.mapsEmbed; f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade';
            var tt = C.translations && C.translations['map.title'];
            f.title = tt ? tt[(root.lang || 'el').slice(0, 2)] || tt.el : 'Χάρτης';
            ml.parentNode.replaceChild(f, ml);
        });
    }

    /* 10. Δρομέας (μόνο με ποντίκι, όχι με μειωμένη κίνηση) */
    if (fine && !reduced) {
        var dot = document.createElement('div'), ring = document.createElement('div');
        dot.className = 'cur-dot'; ring.className = 'cur-ring';
        dot.setAttribute('aria-hidden', 'true'); ring.setAttribute('aria-hidden', 'true');
        document.body.appendChild(dot); document.body.appendChild(ring);
        var mx = -100, my = -100, rx = -100, ry = -100;
        window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)'; }, { passive: true });
        window.addEventListener('mouseover', function (e) { ring.classList.toggle('big', !!e.target.closest('a,button,input,textarea')); }, { passive: true });
        (function loop() { rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16; ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)'; requestAnimationFrame(loop); })();
    }
})();
