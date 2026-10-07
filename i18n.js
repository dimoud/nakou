/**
 * i18n.js — Ελληνικά / Αγγλικά   (v2 — προαπόδοση + ασφαλής αποθήκευση)
 * ════════════════════════════════════════════════════════════════════════════
 * Δύο τρόποι λειτουργίας, τους διαλέγει μόνο του:
 *
 *   Α. ΠΡΟΑΠΟΔΟΜΕΝΗ ΣΕΛΙΔΑ  (<html data-prerendered="el|en">, από prerender.py)
 *      Κάθε γλώσσα έχει δική της διεύθυνση (/ και /en/). Το κείμενο είναι ήδη
 *      μέσα στο HTML. Οι διακόπτες γλώσσας είναι απλοί σύνδεσμοι <a href> —
 *      δεν πειράζουμε τίποτα, απλώς θυμόμαστε την επιλογή.
 *
 *   Β. ΣΕΛΙΔΑ ΑΝΑΠΤΥΞΗΣ  (index.src.html, χωρίς data-prerendered)
 *      Αλλαγή γλώσσας επί τόπου, όπως πριν.
 *
 * Χαρακτηριστικά που αναγνωρίζει:
 *   data-i18n="k"            → textContent
 *   data-i18n-html="k"       → innerHTML
 *   data-i18n-placeholder="k"→ placeholder
 *   data-i18n-aria-label="k" → aria-label
 *   data-i18n-alt="k"        → alt
 *   data-i18n-title="k"      → title
 *   data-href-el / -en       → href ανά γλώσσα
 *
 * Εκπέμπει  document 'langchange'  (CustomEvent, detail.lang) μετά από κάθε
 * αλλαγή — τα εξαρτήματα που χτίζουν δικό τους DOM (μπάρα cookies, φόρμα,
 * καρουζέλ) ακούνε αυτό, δεν ξανασαρώνουν τη σελίδα.
 *
 * Δημόσιο API:  window.I18n.setLang('el'|'en') · I18n.getLang() · window.setLang
 * ════════════════════════════════════════════════════════════════════════════
 */
(function () {
    'use strict';

    var C     = window.SITE_CONFIG || {};
    var t     = C.translations || {};
    var LANGS = ['el', 'en'];
    var root  = document.documentElement;
    var PRE   = root.getAttribute('data-prerendered');          /* 'el' | 'en' | null */

    /* Κλειδί ανά ιστότοπο: όλα τα github.io ενός λογαριασμού μοιράζονται
       origin — ένα κοινό 'lang' θα «μόλυνε» τον έναν πελάτη από τον άλλον. */
    var KEY = 'lang_' + ((C.meta && C.meta.domain) || location.host || 'site');

    /* Ασφαλής αποθήκευση: σε ιδιωτική περιήγηση / μπλοκαρισμένα cookies το
       localStorage ΠΕΤΑΕΙ εξαίρεση — χωρίς try/catch ο ιστότοπος έμενε λευκός. */
    function sget(k)    { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
    function sset(k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* αποθήκευση μη διαθέσιμη */ } }
    function valid(l)   { return LANGS.indexOf(l) !== -1 ? l : null; }

    var currentLang = valid(PRE) || valid(sget(KEY)) || valid(C.meta && C.meta.lang) || 'el';

    function each(attr, fn) {
        document.querySelectorAll('[' + attr + ']').forEach(function (el) {
            var k = el.getAttribute(attr);
            if (t[k] && t[k][currentLang] !== undefined) fn(el, t[k][currentLang]);
        });
    }

    function setMeta(sel, attr, val) {
        var m = document.querySelector(sel);
        if (m && val) m.setAttribute(attr, val);
    }

    function applyLang(lang) {
        lang = valid(lang) || 'el';
        currentLang = lang;
        sset(KEY, lang);

        /* Σε προαποδομένη σελίδα η άλλη γλώσσα είναι άλλη διεύθυνση */
        if (PRE && lang !== PRE) {
            var alt = document.querySelector('link[rel="alternate"][hreflang="' + lang + '"]');
            if (alt) { location.href = alt.href; return; }
        }

        if (!PRE) {
            each('data-i18n',             function (el, v) { el.textContent = v; });
            each('data-i18n-html',        function (el, v) { el.innerHTML   = v; });
            each('data-i18n-placeholder', function (el, v) { el.placeholder = v; });
            each('data-i18n-aria-label',  function (el, v) { el.setAttribute('aria-label', v); });
            each('data-i18n-alt',         function (el, v) { el.setAttribute('alt', v); });
            each('data-i18n-title',       function (el, v) { el.setAttribute('title', v); });
            document.querySelectorAll('[data-href-el]').forEach(function (el) {
                var u = el.getAttribute(lang === 'en' ? 'data-href-en' : 'data-href-el');
                if (u) el.setAttribute('href', u);
            });

            root.lang = lang;
            var M = C.meta || {}, K = lang === 'en' ? 'En' : 'El';
            if (M['title' + K]) document.title = M['title' + K];
            setMeta('meta[name="description"]',        'content', M['description' + K]);
            setMeta('meta[property="og:title"]',       'content', M['title' + K]);
            setMeta('meta[property="og:description"]', 'content', M['description' + K]);
            setMeta('meta[property="og:locale"]',      'content', lang === 'en' ? 'en_GB' : 'el_GR');
            setMeta('meta[name="twitter:title"]',      'content', M['title' + K]);
        }

        document.querySelectorAll('.lang-btn').forEach(function (b) {
            var on = b.getAttribute('data-lang') === lang;
            b.classList.toggle('active', on);
            b.setAttribute('aria-current', on ? 'true' : 'false');
        });

        try { document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } })); }
        catch (e) { /* πολύ παλιός περιηγητής */ }
    }

    window.I18n   = { setLang: applyLang, getLang: function () { return currentLang; }, translations: t, storageKey: KEY };
    window.setLang = applyLang;

    /* Σελίδα ανάπτυξης: οι διακόπτες είναι <a href="en/"> — εδώ αλλάζουμε επί τόπου */
    if (!PRE) {
        document.querySelectorAll('.lang-btn[data-lang]').forEach(function (b) {
            b.addEventListener('click', function (e) { e.preventDefault(); applyLang(b.getAttribute('data-lang')); });
        });
    }

    /* Αμέσως, όχι στο DOMContentLoaded: τρέχουμε στο τέλος του <body>, το DOM
       υπάρχει. Η αναμονή έδινε μετατόπιση διάταξης (CLS 0,14) στο hero. */
    applyLang(currentLang);
})();
