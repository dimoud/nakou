/**
 * hero-letters.js - όνομα που ανεβαίνει γράμμα-γράμμα, και μία λάμψη στο τέλος
 * ════════════════════════════════════════════════════════════════════════════
 * Προέλευση: vaiosliapis.gr (index.html, ενσωματωμένο σενάριο + .hero-anim, 10/2026).
 *
 * ΣΗΜΑΝΣΗ
 *   <head>  (ΠΡΙΝ από το CSS — βλ. «ασφάλεια» πιο κάτω)
 *     <script>if(!matchMedia('(prefers-reduced-motion: reduce)').matches)
 *       document.documentElement.classList.add('hl-pre');</script>
 *   <h1 class="hl" data-letters>
 *     <span class="hl-line">ΒΑΪΟΣ</span>
 *     <span class="hl-line hl-shine">ΛΙΑΠΗΣ</span>     ← hl-shine: μία χρυσή λάμψη στο τέλος
 *   </h1>
 *   data-step="45"  ms ανάμεσα σε γράμματα (προεπιλογή 45)
 *
 * ΠΡΟΣΒΑΣΙΜΟΤΗΤΑ
 *   Όσο τρέχει, κάθε γραμμή κρατά τη λέξη ολόκληρη σε κρυφό <span class="hl-sr">
 *   και τα γράμματα είναι aria-hidden (αλλιώς ο αναγνώστης διαβάζει «Β. Α. Ϊ. Ο. Σ.»).
 *   ΟΧΙ aria-label σε σκέτο <span>, όπως το πρωτότυπο: το ARIA 1.2 το απαγορεύει σε
 *   στοιχεία χωρίς ρόλο και πολλοί αναγνώστες το αγνοούν. Μόλις τελειώσει, τα <span>
 *   φεύγουν και μένει σκέτο κείμενο: σωστή αντιγραφή, σωστή αναζήτηση.
 *
 * ΑΣΦΑΛΕΙΑ: η κλάση hl-pre κρύβει το όνομα πριν τρέξει το JS (αλλιώς αναβοσβήνει:
 *   ολόκληρο → κενό → γράμμα-γράμμα). Αν το JS δεν τρέξει ποτέ, το CSS το εμφανίζει
 *   μόνο του σε 2,5″. Τίποτα δεν μένει κρυφό για πάντα.
 *
 * ΚΑΘΟΛΙΚΟ: window.HeroLetters = { run(el) }
 * ════════════════════════════════════════════════════════════════════════════ */
(function () {
    'use strict';
    var root = document.documentElement;
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function run(el) {
        if (!el || el.__hl) return; el.__hl = true;
        if (reduced) { el.classList.add('hl-done'); return; }
        var step = parseInt(el.getAttribute('data-step'), 10) || 45;
        var lines = el.querySelectorAll('.hl-line'); if (!lines.length) lines = [el];
        var k = 0;
        Array.prototype.forEach.call(lines, function (ln) {
            var txt = ln.textContent;
            ln.setAttribute('data-hl-text', txt);
            ln.textContent = '';
            var sr = document.createElement('span'); sr.className = 'hl-sr'; sr.textContent = txt; ln.appendChild(sr);
            /* Array.from: σωστά και με συνδυασμένους χαρακτήρες (Ϊ γραμμένο ως Ι + ̈) */
            Array.from(txt.normalize('NFC')).forEach(function (ch) {
                var s = document.createElement('span');
                s.className = 'hl-ch'; s.setAttribute('aria-hidden', 'true');
                s.style.setProperty('--i', k++);
                s.textContent = ch === ' ' ? ' ' : ch;
                ln.appendChild(s);
            });
        });
        el.style.setProperty('--hl-step', step + 'ms');
        el.classList.add('hl-run');
        /* τέλος = καθυστέρηση εκκίνησης + τελευταίο γράμμα + διάρκεια ενός γράμματος */
        setTimeout(function () {
            Array.prototype.forEach.call(lines, function (ln) {
                ln.textContent = ln.getAttribute('data-hl-text'); ln.removeAttribute('data-hl-text');
            });
            el.classList.remove('hl-run'); el.classList.add('hl-done');
        }, 250 + k * step + 900 + 100);
    }

    function boot() {
        root.classList.remove('hl-pre');
        Array.prototype.forEach.call(document.querySelectorAll('[data-letters]'), run);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
    window.HeroLetters = { run: run };
})();
