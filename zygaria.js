/**
 * zygaria.js — ζυγαριά της δικαιοσύνης που σχεδιάζεται και ισορροπεί
 * ════════════════════════════════════════════════════════════════════════════
 * Προέλευση: nakou (Γεωργία Νάκου, δικηγόρος), 10/2026.
 *
 * ΣΗΜΑΝΣΗ
 *   <div class="zygaria" data-zygaria></div>                 ← «intro»: σχεδιάζεται,
 *        γέρνει, αφήνεται και ισορροπεί με αληθινή φυσική (ελατήριο με απόσβεση)
 *   <div class="zygaria" data-zygaria="scroll" data-zg-target="#section"></div>
 *        ← «scroll»: η φάλαγγα γέρνει και ισορροπεί όσο προχωρά η κύλιση στο #section
 *   data-zg-tilt="16"   αρχική κλίση σε μοίρες (προεπιλογή 15)
 *
 * Τι κάνει: SVG με χρυσή διαβάθμιση· οι γραμμές «σχεδιάζονται», μια λάμψη περνά
 * από πάνω, οι δίσκοι κρέμονται σαν εκκρεμή (μένουν κατακόρυφοι, ταλαντεύονται
 * με καθυστέρηση), στο ποντίκι η ζυγαριά «αισθάνεται» τη θέση του δείκτη, και όταν
 * ισορροπήσει, ο άξονας λάμπει μία φορά.
 *
 * Μειωμένη κίνηση: στατική, ισορροπημένη, ολόκληρη. Εκτός οθόνης: σταματά.
 * Καθολικό: window.Zygaria = { mount(el) }
 * ════════════════════════════════════════════════════════════════════════════ */
(function () {
    'use strict';
    if (window.__PRERENDER) return;                       /* ποτέ μέσα στο στατικό HTML */
    var NS = 'http://www.w3.org/2000/svg';
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    var uid = 0;
    var CX = 200, CY = 74, ARM = 140;                      /* άξονας και μήκος βραχίονα */

    function svg(html) {
        var n = uid++;
        return ('<svg class="zg-svg" viewBox="0 0 400 430" aria-hidden="true" focusable="false">' +
          '<defs>' +
            '<linearGradient id="zgG@" x1="0" y1="0" x2="1" y2="1">' +
              '<stop offset="0" stop-color="#F6E3B4"/><stop offset=".35" stop-color="#C9A35E"/>' +
              '<stop offset=".7" stop-color="#8A6526"/><stop offset="1" stop-color="#E6C988"/></linearGradient>' +
            '<linearGradient id="zgS@" gradientUnits="userSpaceOnUse" x1="-200" y1="0" x2="0" y2="0">' +
              '<stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".85"/>' +
              '<stop offset="1" stop-color="#fff" stop-opacity="0"/>' +
              '<animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="800 0" dur="5.5s" begin="2.2s" repeatCount="indefinite"/></linearGradient>' +
            '<radialGradient id="zgH@"><stop offset="0" stop-color="#F6E3B4" stop-opacity=".9"/><stop offset="1" stop-color="#C9A35E" stop-opacity="0"/></radialGradient>' +
            '<linearGradient id="zgP@" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6C988" stop-opacity=".55"/><stop offset="1" stop-color="#8A6526" stop-opacity=".25"/></linearGradient>' +
          '</defs>' + html + '</svg>').replace(/@/g, n);
    }

    /* Ένας «δίσκος»: γάντζος στο (0,0), αλυσίδες, μπολ. Ζωγραφίζεται δύο φορές
       (χρυσό + λάμψη), όπως και όλα τα άλλα μέρη. */
    function pan(cls, stroke, extra) {
        return '<g class="' + cls + '">' +
            '<path class="zg-draw" d="M0 0 L-50 118 M0 0 L0 118 M0 0 L50 118" stroke="' + stroke + '" stroke-width="1.6" fill="none"' + extra + '/>' +
            '<path class="zg-draw" d="M-62 118 Q0 176 62 118 Z" stroke="' + stroke + '" stroke-width="2.4" fill="none"' + extra + '/>' +
            '<path class="zg-fill" d="M-62 118 Q0 176 62 118 Z" fill="url(#zgP@)" stroke="none"/>' +
            '<circle class="zg-draw" cx="0" cy="0" r="4" stroke="' + stroke + '" stroke-width="2" fill="none"' + extra + '/></g>';
    }

    function build(el) {
        var g = function (stroke, extra) {
            extra = extra || '';
            return '<g fill="none" stroke-linecap="round" stroke-linejoin="round">' +
                /* βάση: δύο σκαλοπάτια */
                '<path class="zg-draw" d="M120 404 H280 V418 H120 Z M140 392 H260 V404 H140 Z" stroke="' + stroke + '" stroke-width="2"' + extra + '/>' +
                /* κίονας με ραβδώσεις — ίδιο μοτίβο με το «N» του λογότυπου */
                '<path class="zg-draw" d="M188 104 V392 M212 104 V392 M196 112 V384 M204 112 V384" stroke="' + stroke + '" stroke-width="2.4"' + extra + '/>' +
                '<path class="zg-draw" d="M176 92 H224 L218 104 H182 Z" stroke="' + stroke + '" stroke-width="2"' + extra + '/>' +
                /* κορυφή */
                '<path class="zg-draw" d="M200 22 L210 36 L200 50 L190 36 Z M200 50 V64" stroke="' + stroke + '" stroke-width="2"' + extra + '/>' +
                '<circle class="zg-draw" cx="' + CX + '" cy="' + CY + '" r="9" stroke="' + stroke + '" stroke-width="2.4"' + extra + '/>' +
                /* φάλαγγα (περιστρέφεται γύρω από τον άξονα) */
                '<g class="zg-beam"><path class="zg-draw" d="M' + (CX - ARM) + ' ' + CY + ' Q' + CX + ' ' + (CY - 18) + ' ' + (CX + ARM) + ' ' + CY + '" stroke="' + stroke + '" stroke-width="4.2"' + extra + '/>' +
                '<path class="zg-draw" d="M' + (CX - ARM) + ' ' + (CY - 7) + ' V' + (CY + 7) + ' M' + (CX + ARM) + ' ' + (CY - 7) + ' V' + (CY + 7) + '" stroke="' + stroke + '" stroke-width="2.4"' + extra + '/></g>' +
                pan('zg-pan zg-pan-l', stroke, extra) + pan('zg-pan zg-pan-r', stroke, extra) +
                '</g>';
        };
        el.innerHTML = svg(
            '<circle class="zg-halo" cx="' + CX + '" cy="' + CY + '" r="70" fill="url(#zgH@)"/>' +
            '<g class="zg-gold">' + g('url(#zgG@)') + '</g>' +
            '<g class="zg-shine">' + g('url(#zgS@)', ' stroke-opacity=".9"') + '</g>');
    }

    function mount(el) {
        if (!el || el.__zg) return; el.__zg = true;
        build(el);
        var root = el.querySelector('svg');
        var gold = root.querySelector('.zg-gold'), shine = root.querySelector('.zg-shine');
        var beams = root.querySelectorAll('.zg-beam');
        var pansL = root.querySelectorAll('.zg-pan-l'), pansR = root.querySelectorAll('.zg-pan-r');
        var halo = root.querySelector('.zg-halo');
        var mode = el.getAttribute('data-zygaria') || 'intro';
        var tilt0 = (parseFloat(el.getAttribute('data-zg-tilt')) || 15) * Math.PI / 180;

        /* «Σχεδίασμα»: μήκος κάθε γραμμής → dasharray/dashoffset, κλιμακωτά */
        var draws = gold.querySelectorAll('.zg-draw');
        if (!reduced) {
            Array.prototype.forEach.call(draws, function (p, i) {
                var L = 400; try { L = Math.ceil(p.getTotalLength()) + 2; } catch (e) { /* — */ }
                p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
                p.style.transitionDelay = (0.08 * i) + 's';
            });
        }

        function place(th, phL, phR) {
            var deg = th * 180 / Math.PI, c = Math.cos(th), s = Math.sin(th);
            var lx = CX - ARM * c, ly = CY - ARM * s, rx = CX + ARM * c, ry = CY + ARM * s;
            var b = 'rotate(' + deg.toFixed(3) + ' ' + CX + ' ' + CY + ')';
            beams.forEach(function (n) { n.setAttribute('transform', b); });
            var tl = 'translate(' + lx.toFixed(2) + ' ' + ly.toFixed(2) + ') rotate(' + (phL * 57.2958).toFixed(3) + ')';
            var tr = 'translate(' + rx.toFixed(2) + ' ' + ry.toFixed(2) + ') rotate(' + (phR * 57.2958).toFixed(3) + ')';
            pansL.forEach(function (n) { n.setAttribute('transform', tl); });
            pansR.forEach(function (n) { n.setAttribute('transform', tr); });
        }

        if (reduced) { el.classList.add('zg-drawn', 'zg-balanced'); place(0, 0, 0); return; }

        /* Φυσική: φάλαγγα = ελατήριο με απόσβεση προς τον «στόχο»· δίσκοι = εκκρεμή
           που οδηγούνται από τη γωνιακή επιτάχυνση της φάλαγγας. */
        var th = mode === 'scroll' ? -tilt0 : -tilt0, w = 0, target = 0;
        var pL = 0, vL = 0, pR = 0, vR = 0, push = 0;
        var K = 16, C = 1.5, G = 26, CP = 2.2;
        var released = mode === 'scroll', settledOnce = false, running = false, last = 0, raf = 0;
        place(th, 0, 0);

        function progress() {
            var sec = document.querySelector(el.getAttribute('data-zg-target') || '') || el;
            var r = sec.getBoundingClientRect(), vh = window.innerHeight;
            return Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height * 0.9 + vh * 0.2)));
        }

        function step(t) {
            if (!running) return;
            var dt = Math.min(0.033, (t - (last || t)) / 1000); last = t;
            if (mode === 'scroll') target = -tilt0 * (1 - progress());
            else target = released ? 0 : -tilt0;
            var acc = -K * (th - target) - C * w + push; push *= 0.9;
            w += acc * dt; th += w * dt;
            /* εκκρεμή: η επιτάχυνση της φάλαγγας τα «σπρώχνει» αντίθετα */
            var aL = -G * pL - CP * vL - acc * 0.35, aR = -G * pR - CP * vR - acc * 0.35;
            vL += aL * dt; pL += vL * dt; vR += aR * dt; pR += vR * dt;
            place(th, pL, pR);
            var still = Math.abs(th - target) < 0.004 && Math.abs(w) < 0.01;
            if (still && Math.abs(target) < 0.001 && !settledOnce) {
                settledOnce = true; el.classList.add('zg-balanced');
            }
            raf = requestAnimationFrame(step);
        }

        function start() { if (running) return; running = true; last = 0; raf = requestAnimationFrame(step); }
        function stop() { running = false; cancelAnimationFrame(raf); }

        /* μόνο όταν φαίνεται */
        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (es) {
                if (es[0].isIntersecting) {
                    if (!el.classList.contains('zg-drawn')) {
                        el.classList.add('zg-drawn');
                        if (mode !== 'scroll') setTimeout(function () { released = true; }, 1700);
                    }
                    start();
                } else stop();
            }, { threshold: 0.15 }).observe(el);
        } else { el.classList.add('zg-drawn'); released = true; start(); }
        document.addEventListener('visibilitychange', function () { if (document.hidden) stop(); });

        /* ποντίκι: η ζυγαριά «νιώθει» από ποια πλευρά είναι ο δείκτης */
        if (fine) {
            var zone = el.closest('section,header') || el;
            var onMove = function (e) {
                var r = el.getBoundingClientRect();
                var x = (e.clientX - (r.left + r.width / 2)) / Math.max(200, r.width);
                push = Math.max(-1.2, Math.min(1.2, x * 1.6));
            };
            zone.addEventListener('pointermove', onMove, { passive: true });
        }
        /* γρήγορη κύλιση = μικρή ώθηση */
        var ly = window.scrollY;
        function onScroll() {
            var d = window.scrollY - ly; ly = window.scrollY;
            if (running) w += Math.max(-0.6, Math.min(0.6, d * 0.004));
        }
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    function boot() { Array.prototype.forEach.call(document.querySelectorAll('[data-zygaria]'), mount); }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
    window.Zygaria = { mount: mount };
})();
