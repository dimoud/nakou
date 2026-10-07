/**
 * config.js — ΟΛΟ το περιεχόμενο του ιστότοπου Γεωργίας Νάκου (μόνο δεδομένα)
 * ════════════════════════════════════════════════════════════════════════════
 * Φορτώνει στο <head>, ΧΩΡΙΣ defer. Το διαβάζουν: site-init.js (χτίζει τη
 * σελίδα), i18n.js (ΕΛ/ΕΝ), prerender.py (στατικό HTML + JSON-LD + sitemap).
 *
 * Αλλάζεις κείμενο ΜΟΝΟ εδώ και μετά:  python3 prerender.py <φάκελος>
 * Κάθε ορατό κείμενο έχει ζεύγος …El / …En.  '&amp;' αντί για σκέτο '&'.
 *
 * ΤΟΜΕΑΣ: όταν βγει ο δικός της (π.χ. nakoulaw.gr), αλλάζεις το meta.domain,
 * βάζεις αρχείο CNAME και ξανατρέχεις prerender.py.
 *
 * ΧΩΡΙΣ ΠΑΚΕΤΟ SEO (απόφαση 07/10/2026): δεν έχει ακόμα JSON-LD, sitemap,
 * robots.txt, εικόνα κοινοποίησης ούτε τίτλους για λέξεις-κλειδιά. Το
 * prerender.py βάζει JSON-LD και sitemap αυτόματα, οπότε μετά από κάθε
 * prerender τρέχει και το  python3 _xoris_seo.py  (βγάζει JSON-LD, sitemap, robots).
 * ════════════════════════════════════════════════════════════════════════════
 */
window.SITE_CONFIG = {

  meta: {
    domain: 'expertease.eu/nakou',          // ← προσωρινό· αλλάζει όταν βγει ο τομέας
    lang: 'el',
    titleEl: 'Γεωργία Νάκου · Δικηγόρος — Αθήνα · Θεσσαλονίκη',
    titleEn: 'Georgia Nakou · Lawyer — Athens · Thessaloniki',
    descriptionEl: 'Δικηγορικό γραφείο Γεωργίας Νάκου. Ακίνητα, συμβόλαια, ιδιωτικά συμφωνητικά, συντάξεις e-ΕΦΚΑ. Αθήνα · Θεσσαλονίκη.',
    descriptionEn: 'Law office of Georgia Nakou. Real estate, contracts, private agreements, e-EFKA pensions. Athens · Thessaloniki.',
  },

  profile: {
    firstNameEl: 'Γεωργία', firstNameEn: 'Georgia',
    lastNameEl:  'Νάκου',   lastNameEn:  'Nakou',
    initials: 'ΓΝ',
    displayNameEl: 'Γεωργία Νάκου', displayNameEn: 'Georgia Nakou',
    professionEl: 'Δικηγόρος', professionEn: 'Lawyer',
    fullTitleEl: 'Δικηγόρος', fullTitleEn: 'Attorney at Law',
    locationEl: 'Αθήνα · Θεσσαλονίκη', locationEn: 'Athens · Thessaloniki',
    areaEl: 'Αθήνα · Θεσσαλονίκη', areaEn: 'Athens · Thessaloniki',
  },

  assets: {
    logo: 'nakou-monogram-200.webp',
    photo: 'georgia-nakou-960.webp',
    photoSmall: 'georgia-nakou-560.webp',
    heroSlides: [],
  },

  contact: {
    phone: '697 473 1607', phoneTel: 'tel:+306974731607',
    landline: '231 700 7792', landlineTel: 'tel:+302317007792',
    email: 'gnakou.law@gmail.com',
    addressEl: 'Μαυρομιχάλη 68, Πολίχνη', addressEn: 'Mavromichali 68, Polichni',
    hoursEl: 'Δευτ – Παρ · 09:00 – 18:00', hoursEn: 'Mon – Fri · 09:00 – 18:00',
    facebook: 'https://www.facebook.com/profile.php?id=61579331237666',
    mapsUrl: 'https://share.google/1sa4DvbyVMADLWPpc',          // το Προφίλ της στο Google (χάρτης, κριτικές)
    googleProfile: 'https://share.google/1sa4DvbyVMADLWPpc',
    mapsEmbed: 'https://maps.google.com/maps?q=%CE%9C%CE%B1%CF%85%CF%81%CE%BF%CE%BC%CE%B9%CF%87%CE%AC%CE%BB%CE%B7+68,+%CE%A0%CE%BF%CE%BB%CE%AF%CF%87%CE%BD%CE%B7+%CE%98%CE%B5%CF%83%CF%83%CE%B1%CE%BB%CE%BF%CE%BD%CE%AF%CE%BA%CE%B7%CF%82+565+33&output=embed&hl=el',
  },

  hero: {
    badgeEl: 'Δικηγορικό γραφείο\nΑθήνα · Θεσσαλονίκη',
    badgeEn: 'Law office\nAthens · Thessaloniki',
    taglineEl: 'Εμπιστοσύνη. Γνώση. Αποτέλεσμα.',
    taglineEn: 'Trust. Knowledge. Results.',
  },

  marquee: [
    { el: 'Ακίνητα', en: 'Real estate' },
    { el: 'Συμβόλαια', en: 'Contracts' },
    { el: 'Συντάξεις e-ΕΦΚΑ', en: 'e-EFKA pensions' },
    { el: 'Ιδιωτικά συμφωνητικά', en: 'Private agreements' },
    { el: 'Κληρονομικά', en: 'Inheritance' },
  ],

  about: {
    headingEl: 'Πίσω από κάθε υπόθεση, ένας άνθρωπος.',
    headingEn: 'Behind every case, a person.',
    points: [
      { el: 'Δικηγόρος του Δικηγορικού Συλλόγου Αθηνών', en: 'Member of the Athens Bar Association' },
      { el: 'Πιστοποιημένη για συντάξεις e-ΕΦΚΑ', en: 'Certified for e-EFKA pension cases' },
      { el: 'Σαφήνεια, συνέπεια, ανθρωπιά', en: 'Clarity, consistency, humanity' },
    ],
  },

  manifesto: [
    { el: 'Ο νόμος είναι περίπλοκος.', en: 'The law is complex.' },
    { el: 'Η σχέση μας όχι.', en: 'Our relationship is not.' },
    { el: 'Σαφήνεια σε κάθε βήμα.', en: 'Clarity at every step.' },
  ],

  services: [
    { titleEl: 'Αγοραπωλησίες Ακινήτων', titleEn: 'Property Purchases &amp; Sales',
      textEl: 'Πλήρης νομική υποστήριξη σε αγορά και πώληση ακινήτου: έλεγχος τίτλων ιδιοκτησίας, μεταγραφή στο Κτηματολόγιο, σύνταξη προσυμφώνου και οριστικού συμβολαίου, αντιμετώπιση βαρών και υποθηκών.',
      textEn: 'Full legal support when buying or selling property: title checks, registration with the Land Registry (Ktimatologio), preliminary and final contracts, and clearing liens and mortgages.' },
    { titleEl: 'Συμβόλαια', titleEn: 'Contracts',
      textEl: 'Σύνταξη και νομικός έλεγχος συμβολαίων αγοραπωλησίας, δωρεάς, γονικής παροχής και χρησιδανείου, ώστε τα συμφέροντά σας να προστατεύονται από το πρώτο σχέδιο ως την υπογραφή.',
      textEn: 'Drafting and legal review of sale, donation, parental gift and loan-for-use contracts, protecting your interests from the first draft to the signature.' },
    { titleEl: 'Ιδιωτικά Συμφωνητικά', titleEn: 'Private Agreements',
      textEl: 'Εμπορικά συμφωνητικά, μισθώσεις κατοικίας και επαγγελματικής στέγης, συμβάσεις εργασίας. Γραμμένα με σαφείς όρους, ώστε να ξέρετε τι υπογράφετε και τι σας καλύπτει.',
      textEn: 'Commercial agreements, residential and business leases, employment contracts. Written in clear terms, so you know what you are signing and what protects you.' },
    { titleEl: 'Συντάξεις e-ΕΦΚΑ', titleEn: 'e-EFKA Pensions',
      textEl: 'Πιστοποιημένη εκπροσώπηση για αίτηση κύριας και επικουρικής σύνταξης στον e-ΕΦΚΑ: έλεγχος ασφαλιστικού ιστορικού, αναγνώριση χρόνων ασφάλισης και διεκπεραίωση ως την απονομή.',
      textEn: 'Certified representation for main and supplementary pension applications with e-EFKA: insurance history review, recognition of insured periods and follow-through until the pension is awarded.' },
  ],

  journey: {
    introEl: 'Κάθε υπόθεση είναι μια ιστορία. Βήμα βήμα, με διαφάνεια.',
    introEn: 'Every case is a story. Step by step, with full transparency.',
    steps: [
      { titleEl: 'Πρώτη επαφή', titleEn: 'First contact',
        textEl: 'Ακούμε και καταγράφουμε την υπόθεσή σας με προσοχή, χωρίς βιασύνη. Η πρώτη συνομιλία είναι δωρεάν.',
        textEn: 'We listen and note down your case carefully, without rushing. The first conversation is free.' },
      { titleEl: 'Ανάλυση &amp; στρατηγική', titleEn: 'Analysis &amp; strategy',
        textEl: 'Μελετάμε έγγραφα, τίτλους και δικαιώματα και σχεδιάζουμε στρατηγική με ρεαλιστικές προσδοκίες.',
        textEn: 'We study documents, titles and entitlements, then plan a strategy with realistic expectations.' },
      { titleEl: 'Δράση', titleEn: 'Action',
        textEl: 'Συντάσσουμε, εκπροσωπούμε και διεκπεραιώνουμε, με συνέπεια σε κάθε προθεσμία.',
        textEn: 'We draft, represent and see things through, on time at every deadline.' },
      { titleEl: 'Αποτέλεσμα', titleEn: 'Outcome',
        textEl: 'Κλείνουμε την υπόθεση και μένουμε δίπλα σας για ό,τι χρειαστεί μετά.',
        textEn: 'We close the case and stay by your side for whatever comes next.' },
    ],
  },

  efka: {
    badgeEl: 'Πιστοποιημένη', badgeEn: 'Certified',
    headingEl: 'Πιστοποιημένη για e-ΕΦΚΑ', headingEn: 'Certified for e-EFKA',
    textEl: 'Εκπροσώπηση για κύριες και επικουρικές συντάξεις, από τον έλεγχο του ιστορικού ως την απονομή.',
    textEn: 'Representation for main and supplementary pensions, from the insurance history check to the award.',
    url: 'https://www.e-efka.gov.gr/el/yperesies-e-ephka',
  },

  /* Κριτικές Google (αποσπάσματα από το Προφίλ της· ανανέωση 07/10/2026 — 39 από τις 43, όσες φαίνονται χωρίς σύνδεση.
     Στην αγγλική σελίδα σε μετάφραση, με σημείωση) */
  reviews: [
    { name: 'Stathis Nikolaidis', el: 'Εξαιρετική επαγγελματίας! Συνεργάστηκα με την κα. Νάκου για την αγορά ενός χώρου αποθήκης-στάθμευσης και έμεινα απόλυτα ευχαριστημένος.', en: 'An excellent professional! I worked with Ms Nakou on buying a storage and parking space and was completely satisfied.' },
    { name: 'George Danapassis', el: 'Πολύ καλή επαγγελματίας. Μπορεί να διαχειρίζεται και να διεκπεραιώνει τις υποθέσεις με σεβασμό, γνώσεις και επιμονή! Τη συστήνω ανεπιφύλακτα από πολύ πρόσφατη εμπειρία μου!', en: 'A very good professional. She handles and sees cases through with respect, knowledge and persistence! I recommend her without reservation from my very recent experience!' },
    { name: 'Κυριάκος Κοράκης', el: 'Η κ. Νάκου είναι αξιόλογη και υπεύθυνη επαγγελματίας στους τομείς ενδιαφέροντός της.', en: 'Ms Nakou is a capable and responsible professional in her fields of practice.' },
    { name: 'Olga Olgagr', el: 'Η κ. Νάκου είναι πρωτίστως ΑΝΘΡΩΠΟΣ και στη συνέχεια εξαίρετη επαγγελματίας! Την επισκέφθηκα προκειμένου να ενημερωθώ για συνταξιοδοτικά θέματα και από την πρώτη στιγμή μου ενέπνευσε εμπιστοσύνη!', en: 'Ms Nakou is first and foremost a decent HUMAN BEING, and then an excellent professional! I visited her to ask about my pension and she inspired trust from the very first moment!' },
    { name: 'Sotiris Tseronis', el: 'Σου θυμίζει ότι πίσω από το επάγγελμα υπάρχουν άνθρωποι. Από την πρώτη συνάντηση ένιωσα πως άκουγε.', en: 'She reminds you there are people behind the profession. From our first meeting I felt she was listening.' },
    { name: 'Psyrri Anthi', el: 'Εξαιρετική και σαν δικηγόρος και σαν άνθρωπος. Σε κάνει να νιώθεις ασφάλεια με τις γνώσεις και τον επαγγελματισμό της.', en: 'Excellent both as a lawyer and as a person. Her knowledge and professionalism make you feel safe.' },
    { name: 'Dimitra P.', el: 'Σπάνια συναντάς επαγγελματίες που συνδυάζουν γνώση, συνέπεια και ανθρωπιά. Η κ. Νάκου είναι μία από αυτούς!', en: 'You rarely meet professionals who combine knowledge, reliability and humanity. Ms Nakou is one of them!' },
    { name: 'Dionysis Lytras', el: 'Πολύ καταρτισμένη, ευγενική και πάντα διαθέσιμη. Έλυσα την υπόθεσή μου γρήγορα και με απόλυτη διαφάνεια.', en: 'Very knowledgeable, kind and always available. My case was resolved quickly and with complete transparency.' },
    { name: 'Georgia Xatzinikolaou', el: 'Άψογη επαγγελματίας αλλά πάνω από όλα Άνθρωπος, με ενσυναίσθηση και ηθική. Κάθε υπόθεση γίνεται προσωπική.', en: 'A flawless professional, but above all a human being, with empathy and integrity. Every case becomes personal.' },
    { name: 'Παναγιώτης Κωστόπουλος', el: 'Από την πρώτη στιγμή ενδιαφέρθηκε ειλικρινά. Μου εξήγησε τα πάντα απλά και κατανοητά.', en: 'She cared sincerely from the very first moment and explained everything simply and clearly.' },
    { name: 'mary azoykh', el: 'Εξαιρετική σαν δικηγόρος αλλά και σαν άνθρωπος. Πάντα πρόθυμη να βοηθήσει και να λύσει κάθε απορία.', en: 'Excellent as a lawyer and as a person. Always willing to help and answer every question.' },
    { name: 'Marios Zervos', el: 'Πέρα από την άρτια νομική κατάρτιση, ξεχώρισε για τον ανθρώπινο χαρακτήρα και τη στήριξή της.', en: 'Beyond her excellent legal training, she stood out for her humanity and support.' },
    { name: 'Γιάννης Χατζημήτσος', el: 'Επαγγελματίας, αξιόπιστη και αποτελεσματική! Τη συνιστώ ανεπιφύλακτα — γνώση και ήθος μαζί.', en: 'Professional, reliable and effective! I recommend her without reservation — knowledge and integrity together.' },
    { name: 'f0t', el: 'Επαγγελματίας με γνώση και αγάπη για το αντικείμενο. Η καλύτερη δικηγόρος και ένας υπέροχος άνθρωπος.', en: 'A professional with knowledge and love for her work. The best lawyer and a wonderful person.' },
    { name: 'Φωτεινή Κωστοπούλου', el: 'Είχα την τύχη να συνεργαστώ επιτέλους με έναν επαγγελματία. Ευδιάθετη, υπομονετική και πάντα διαθέσιμη.', en: 'I was lucky to finally work with a real professional. Cheerful, patient and always available.' },
    { name: 'Kostas Kechagias', el: 'Συνεργάστηκα για σοβαρή υπόθεση και έμεινα απόλυτα ικανοποιημένος. Προσέγγιση επαγγελματική, άμεση και αποτελεσματική.', en: 'I worked with her on a serious case and was completely satisfied. Professional, prompt and effective.' },
    { name: 'Γιώργος Φουρλάς', el: 'Εξαιρετική στον τομέα της. Άρτια καταρτισμένη και πάντα σε επικοινωνία για κάθε εξέλιξη.', en: 'Excellent in her field. Thoroughly trained and always in touch about every development.' },
    { name: 'Antriana Gkika', el: 'Τυπική στα ραντεβού της, πρόθυμη να σε ακούσει και να σε καθοδηγήσει με τις σωστές συμβουλές. Άψογη.', en: 'Punctual, willing to listen and to guide you with the right advice. Flawless.' },
    { name: 'eleni al', el: 'Εξαιρετική δικηγόρος, καταρτισμένη και πρόθυμη να λύσει κάθε απορία. Εν ολίγοις άψογη επαγγελματίας.', en: 'An excellent, well-trained lawyer, willing to answer every question. In short, a flawless professional.' },
    { name: 'Dimitris Giagiwtis', el: 'Άψογη δικηγόρος! Κορυφαία στον τομέα της, με υπομονή και κατανόηση και πάντα δίπλα στον πελάτη!', en: 'A flawless lawyer! Top of her field, patient and understanding, always on the client’s side!' },
    { name: 'Μαρία Μπινιάρη', el: 'Συστήνω ανεπιφύλακτα την κ. Νάκου για τον άψογο επαγγελματισμό και την κατάρτισή της σε σύνθετα νομικά ζητήματα.', en: 'I fully recommend Ms Nakou for her flawless professionalism and her expertise in complex legal matters.' },
    { name: 'Νίκος Αναστασόπουλος', el: 'Εξαιρετική επαγγελματίας με ανθρώπινη προσέγγιση και αμεσότητα.', en: 'An excellent professional with a human, direct approach.' },
    { name: 'Fofiko Fofikou', el: 'Χειρίστηκε την υπόθεσή μου με υπευθυνότητα και ειλικρίνεια. Μου ενέπνευσε εμπιστοσύνη από την πρώτη στιγμή!', en: 'She handled my case responsibly and honestly. She inspired trust from the very first moment!' },
    { name: 'Μιλτιάδης Τσαλκιτζής', el: 'Εξαιρετική και κατατοπιστική δικηγόρος. Διεκπεραίωσε αμέσως την υπόθεση που της αναθέσαμε. Ευχαριστούμε!', en: 'An excellent lawyer who explains things well. She handled our case right away. Thank you!' },
    { name: 'Θεοδώρα Κετάνη', el: 'Μου έλυσε κάθε απορία και δεν με ταλαιπώρησε καθόλου. Φανταστική εξυπηρέτηση, ευχαριστούμε πολύ!', en: 'She answered every question and spared me any hassle. Fantastic service, thank you very much!' },
    { name: 'kiki vag', el: 'Άριστη εξυπηρέτηση με πολύ επαγγελματισμό και γνώση πάνω στο αντικείμενο, και πάνω από όλα με ανθρωπιά.', en: 'Excellent service, very professional and knowledgeable, and above all humane.' },
    { name: 'A-KAPA', el: 'Εξαιρετική δικηγόρος! Άψογη στη δουλειά της και πάντα τυπική στα ραντεβού της. Υπεύθυνη και με άμεση ανταπόκριση.', en: 'An excellent lawyer! Flawless work, always punctual, responsible and quick to respond.' },
    { name: 'Eleni Stonikou', el: 'Εξαιρετική επαγγελματίας αλλά και άνθρωπος με ενσυναίσθηση.', en: 'An excellent professional and an empathetic person.' },
    { name: 'Vasilis Michopoulos', el: 'Εξαιρετική και με απίστευτο εύρος νομικών γνώσεων.', en: 'Excellent, with an incredible breadth of legal knowledge.' },
    { name: 'Georgia Rentzou', el: 'Με βοήθησε με υπευθυνότητα, συνέπεια και πραγματικό ενδιαφέρον. Από την πρώτη στιγμή έδειξε βαθιά γνώση.', en: 'She helped me responsibly, consistently and with real interest. She showed deep knowledge from the start.' },
    { name: 'Evanggelia Danapasi', el: 'Ξέρει ακριβώς πώς να σε συμβουλέψει προς τη σωστή κατεύθυνση. Αν μπορούσα θα έβαζα 10 αστέρια!', en: 'She knows exactly how to steer you in the right direction. I would give 10 stars if I could!' },
    { name: 'Mpetso Mpetso', el: 'Ευτυχώς η γειτονιά μας έχει τέτοιο δικηγόρο!', en: 'Luckily our neighbourhood has a lawyer like her!' },
    { name: 'Fay Bet', el: 'Εξαιρετική δικηγόρος, απίστευτος άνθρωπος!', en: 'An excellent lawyer and an amazing person!' },
    { name: 'Bariemai Pouzw', el: 'Καταρτισμένη, έτοιμη να σου λύσει κάθε απορία. Την συστήνω ανεπιφύλακτα!', en: 'Knowledgeable and ready to answer any question. I recommend her without reservation!' },
    { name: 'efstathia azouki', el: 'Εξαιρετική επαγγελματίας με εμπειρία!', en: 'An excellent, experienced professional!' },
    { name: 'eirini pavlidou', el: 'Άψογη επαγγελματίας! Δίπλα μας σε όλα! Ευχαριστούμε πολύ!', en: 'A flawless professional! By our side in everything! Thank you so much!' },
    { name: 'Δέσποινα Θεοφανίδου', el: 'Άμεση και άψογη εξυπηρέτηση! Το συστήνω!', en: 'Prompt, flawless service! Highly recommended!' },
    { name: 'Αθηνά Κιοσέογλου', el: 'Απίστευτη επαγγελματίας! Ξεχωρίζει για τις γνώσεις της, που με μεγάλη υπομονή κάνει κατανοητές.', en: 'An amazing professional! She stands out for her knowledge, which she explains with great patience.' },
    { name: 'Νικόλαος Αζ.', el: 'Μετά από κακή πρώτη εμπειρία με άλλον δικηγόρο, η κ. Νάκου ανέλαβε υπεύθυνα την υπόθεση αγοράς του ακινήτου μας.', en: 'After a bad first experience with another lawyer, Ms Nakou took responsible charge of our property purchase.' },
  ],

  /* Νέα: ΜΟΝΟ δικές της αναρτήσεις. Όχι σύνδεσμοι σε σελίδες άλλων δικηγορικών γραφείων. */
  articles: [
    { url: 'https://www.facebook.com/share/p/1SgFEzHLVQ/?mibextid=wwXIfr',
      catEl: 'Ν. 5239/2025', catEn: 'Law 5239/2025',
      titleEl: 'Νέες διατάξεις για τον τ. ΟΓΑ', titleEn: 'New rules for former OGA insurance',
      textEl: 'Ο χρόνος πρόσθετης ασφάλισης του τ. ΟΓΑ αξιοποιείται πλέον και χωρίς συνέχιση της κύριας ασφάλισης από 1/1/1998.',
      textEn: 'Additional insurance time with the former OGA can now count even without continued main insurance from 1/1/1998.' },
    { url: 'https://www.facebook.com/share/1CLy9GMSBD/?mibextid=wwXIfr',
      catEl: 'Απόφαση', catEn: 'Ruling',
      titleEl: 'Διαγραφή οφειλών κληρονόμων', titleEn: 'Debts of heirs written off',
      textEl: 'Διαγραφή οφειλών που βεβαιώθηκαν σε κληρονόμους, πρώτα εξαδέλφια θανόντος οφειλέτη.',
      textEn: 'Debts assessed on heirs who were first cousins of a deceased debtor were written off.' },
  ],

  /* Χρήσιμοι σύνδεσμοι: μόνο επίσημοι φορείς */
  links: [
    { title: 'gov.gr', el: 'Κυβερνητική Πύλη', en: 'Government portal', url: 'https://www.gov.gr' },
    { title: 'e-ΕΦΚΑ', titleEn: 'e-EFKA', el: 'Ηλεκτρονικές υπηρεσίες', en: 'Online services', url: 'https://www.efka.gov.gr' },
    { title: 'Κτηματολόγιο', titleEn: 'Land Registry', el: 'Ελληνικό Κτηματολόγιο', en: 'Hellenic Cadastre', url: 'https://www.ktimatologio.gr' },
    { title: 'myAADE', el: 'Ανεξάρτητη Αρχή Δημοσίων Εσόδων', en: 'Independent Authority for Public Revenue', url: 'https://www.aade.gr' },
    { title: 'ΔΣΑ', titleEn: 'Athens Bar', el: 'Δικηγορικός Σύλλογος Αθηνών', en: 'Athens Bar Association', url: 'https://www.dsa.gr' },
    { title: 'Ολομέλεια', titleEn: 'Olomeleia', el: 'Δικηγορικοί Σύλλογοι Ελλάδος', en: 'Greek Bar Associations', url: 'https://www.olomeleia.gr' },
    { title: 'Άρειος Πάγος', titleEn: 'Areios Pagos', el: 'Ανώτατο Δικαστήριο', en: 'Supreme Civil Court', url: 'https://www.areiospagos.gr' },
    { title: 'ΣτΕ', titleEn: 'Council of State', el: 'Συμβούλιο της Επικρατείας', en: 'Supreme Administrative Court', url: 'https://www.ste.gr' },
    { title: 'Εθνικό Τυπογραφείο', titleEn: 'National Printing Office', el: 'ΦΕΚ και νομοθεσία', en: 'Government Gazette', url: 'https://www.et.gr' },
    { title: 'Μίτος', titleEn: 'Mitos', el: 'Διοικητικές διαδικασίες', en: 'Administrative procedures', url: 'https://mitos.gov.gr' },
    { title: 'EUR-Lex', el: 'Ευρωπαϊκή νομοθεσία', en: 'EU law', url: 'https://eur-lex.europa.eu' },
    { title: 'ΓΕΜΗ', titleEn: 'GEMI', el: 'Γενικό Εμπορικό Μητρώο', en: 'General Commercial Registry', url: 'https://www.businessportal.gr' },
    { title: 'Συνήγορος του Πολίτη', titleEn: 'Ombudsman', el: 'Ανεξάρτητη Αρχή', en: 'Independent authority', url: 'https://www.synigoros.gr' },
  ],

  footer: {
    taglineEl: 'Νομική εμπειρία. Ανθρώπινη προσέγγιση.',
    taglineEn: 'Legal expertise. A human approach.',
  },
};
