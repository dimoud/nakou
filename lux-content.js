var LUX = {
  el: {
    nav: { about: "Προφίλ", services: "Υπηρεσίες", efka: "e-ΕΦΚΑ", reviews: "Κριτικές", contact: "Επικοινωνία" },
    hero: {
      badge: "ΔΙΚΗΓΟΡΙΚΟ ΓΡΑΦΕΙΟ\n· ΑΘΗΝΑ · ΘΕΣΣΑΛΟΝΙΚΗ",
      name: "Γεωργία Νάκου",
      role: "ΔΙΚΗΓΟΡΟΣ",
      tagline: "Εμπιστοσύνη. Γνώση. Αποτέλεσμα.",
      ctaPrimary: "Επικοινωνία",
      ctaSecondary: "Υπηρεσίες"
    },
    marquee: ["ΑΚΙΝΗΤΑ", "ΣΥΜΒΟΛΑΙΑ", "ΣΥΝΤΑΞΕΙΣ e-ΕΦΚΑ", "ΙΔΙΩΤΙΚΑ ΣΥΜΦΩΝΗΤΙΚΑ", "ΚΛΗΡΟΝΟΜΙΚΑ"],
    about: {
      label: "Προφίλ",
      heading: "Πίσω από κάθε υπόθεση, ένας άνθρωπος.",
      bio: "Δικηγόρος του Δικηγορικού Συλλόγου Αθηνών. Πιστοποιημένη για συντάξεις e-ΕΦΚΑ. Σαφήνεια, συνέπεια, ανθρωπιά.",
      certs: ["Πιστοποίηση e-ΕΦΚΑ", "Κτηματολόγιο & Ακίνητα", "Ασφαλιστικό Δίκαιο"]
    },
    manifesto: [["Ο", "νόμος", "είναι", "περίπλοκος."], ["Η", "σχέση", "μας", "όχι."], ["Σαφήνεια", "σε", "κάθε", "βήμα."]],
    journey: {
      label: "Η Πορεία",
      heading: "Πώς δουλεύουμε μαζί",
      intro: "Κάθε υπόθεση είναι μια ιστορία. Βήμα προς βήμα, με διαφάνεια.",
      steps: [
        { n: "01", title: "Πρώτη Επαφή", desc: "Ακούμε. Καταγράφουμε την υπόθεσή σας με προσοχή και χωρίς βιασύνη — δωρεάν πρώτη συνομιλία." },
        { n: "02", title: "Ανάλυση & Στρατηγική", desc: "Μελετάμε έγγραφα, τίτλους και δικαιώματα. Σχεδιάζουμε καθαρή στρατηγική με ρεαλιστικές προσδοκίες." },
        { n: "03", title: "Δράση", desc: "Συντάσσουμε, εκπροσωπούμε και διεκπεραιώνουμε — με συνέπεια σε κάθε προθεσμία." },
        { n: "04", title: "Αποτέλεσμα", desc: "Κλείνουμε την υπόθεση και παραμένουμε δίπλα σας για κάθε επόμενο βήμα." }
      ]
    },
    stats: [
      { value: 5.0, suffix: "", label: "Βαθμολογία Google", decimals: 1 },
      { value: 40, suffix: "+", label: "Κριτικές 5 αστέρων", decimals: 0 },
      { value: 2, suffix: "", label: "Πόλεις", decimals: 0 },
      { value: 100, suffix: "%", label: "Αφοσίωση", decimals: 0 }
    ],
    creed: {
      label: "Η φιλοσοφία μας",
      quote: "Ο νόμος γράφτηκε για τους ανθρώπους — και πίσω από κάθε υπόθεση υπάρχει ένας άνθρωπος. Αυτό δεν το ξεχνώ ποτέ.",
      author: "Γεωργία Νάκου",
      authorRole: "Δικηγόρος"
    },
    services: {
      label: "Υπηρεσίες",
      heading: "Νομική κάλυψη σε κάθε βήμα",
      list: [
        { n: "01", title: "Αγοραπωλησίες Ακινήτων", desc: "Έλεγχοι τίτλων, μεταβιβάσεις, κτηματολόγιο.", detail: "Αναλαμβάνουμε πλήρη νομική υποστήριξη σε αγοραπωλησίες ακινήτων: έλεγχο τίτλων ιδιοκτησίας, μεταγραφές στο Κτηματολόγιο, σύνταξη προσυμφωνών και οριστικών συμβολαίων, καθώς και αντιμετώπιση βαρών και υποθηκών." },
        { n: "02", title: "Συμβόλαια", desc: "Σύνταξη & έλεγχος με πλήρη ασφάλεια.", detail: "Σύνταξη και νομικός έλεγχος κάθε είδους συμβολαίου — αγοραπωλησίας, δωρεάς, γονικής παροχής, χρησιδανείου. Εξασφαλίζουμε πλήρη νομική κάλυψη σε κάθε συναλλαγή, προστατεύοντας τα συμφέροντά σας από την αρχή ως την υπογραφή." },
        { n: "03", title: "Ιδιωτικά Συμφωνητικά", desc: "Εμπορικά, ενοικιαστικά, εργατικά.", detail: "Σύνταξη εμπορικών συμφωνητικών, συμβάσεων μίσθωσης κατοικίας και επαγγελματικής στέγης, εργασιακών συμβάσεων. Κάθε ιδιωτική συμφωνία συντάσσεται με πλήρη νομική εγκυρότητα, σαφείς όρους και πλήρη προστασία των δικαιωμάτων σας." },
        { n: "04", title: "Συντάξεις e-ΕΦΚΑ", desc: "Έλεγχος δικαιωμάτων & έκδοση σύνταξης.", detail: "Πιστοποιημένη εκπροσώπηση για αίτηση και έκδοση κύριας και επικουρικής σύνταξης μέσω e-ΕΦΚΑ. Αναλαμβάνουμε έλεγχο ασφαλιστικού ιστορικού, αναγνώριση χρόνων ασφάλισης και πλήρη διεκπεραίωση από την αίτηση ως την απονομή." }
      ]
    },
    efka: {
      badge: "ΠΙΣΤΟΠΟΙΗΜΕΝΗ",
      heading: "Πιστοποιημένη για e-ΕΦΚΑ",
      desc: "Πλήρης εκπροσώπηση για κύριες & επικουρικές συντάξεις — από τον έλεγχο έως την απονομή.",
      cta: "Μετάβαση στο e-ΕΦΚΑ"
    },
    reviews: { label: "Κριτικές", heading: "Η εμπιστοσύνη των πελατών μας", subtitle: "Αξιολογήσεις Google", rating: "5.0" },
    news: {
      label: "Νέα",
      heading: "Νομικές Εξελίξεις",
      items: [
        { tag: "Ν. 5239/2025", title: "Νέες διατάξεις τ. ΟΓΑ", desc: "Ο χρόνος πρόσθετης ασφάλισης τ. ΟΓΑ αξιοποιείται πλέον και χωρίς συνέχιση κύριας ασφάλισης από 1/1/1998.", link: "https://www.facebook.com/share/p/1SgFEzHLVQ/?mibextid=wwXIfr" },
        { tag: "Απόφαση", title: "Διαγραφή οφειλών κληρονόμων", desc: "Διαγραφή οφειλών που βεβαιώθηκαν σε κληρονόμους — πρώτα εξαδέλφια θανόντος οφειλέτη.", link: "https://www.facebook.com/share/1CLy9GMSBD/?mibextid=wwXIfr" },
        { tag: "Κληρονομικό", title: "Νέα Κληρονομική Νομοθεσία 2026", desc: "Βασικές αλλαγές που επηρεάζουν τον σχεδιασμό κληρονομικής διαδοχής στην Ελλάδα.", link: "https://www.zeya.com/news/new-greek-inheritance-law-enacted-key-changes-impacting-estate-planning" },
        { tag: "Μεταρρύθμιση", title: "Μεταρρυθμίσεις στο Κληρονομικό Δίκαιο", desc: "Πώς οι πρόσφατες μεταρρυθμίσεις αναδιαμορφώνουν τον σχεδιασμό κληρονομιών.", link: "https://ally-law.com/recent-reforms-in-greek-inheritance-law-reshape-estate-planning/" },
        { tag: "Ακίνητα", title: "Αλλαγές στη Νομοθεσία Ακινήτων", desc: "Σημαντικές νομοθετικές αλλαγές στην αγορά ακινήτων για το 2026.", link: "https://globallawexperts.com/greece-property-law-changes-2026/" },
        { tag: "Οδηγός", title: "Νέο Κληρονομικό Δίκαιο 2026", desc: "Οδηγός για αλλοδαπούς και ιδιοκτήτες ακινήτων στην Ελλάδα.", link: "https://www.expatlaw.gr/post/greek-inheritance-law-2026-expats-property" },
        { tag: "Ακίνητα", title: "Τι Πρέπει να Γνωρίζουν οι Ιδιοκτήτες", desc: "Κληρονομικό δίκαιο: τι αλλάζει για αγοραστές και ιδιοκτήτες ακινήτων.", link: "https://elxis.com/greeces-new-inheritance-law-what-property-owners-and-buyers-need-to-know" },
        { tag: "Στρατηγική", title: "Επιπτώσεις Μεταρρύθμισης 2026", desc: "Στρατηγικές επιπτώσεις για διεθνή σχεδιασμό περιουσίας και cross-border ρυθμίσεις.", link: "https://tsamichaslaw.gr/greeces-new-inheritance-law-reform-2026-strategic-implications-for-estate-planning-cross-border-wealth-structuring/" },
        { tag: "Οικογένεια", title: "Κληρονομικό Δίκαιο & Σύγχρονες Οικογένειες", desc: "Πώς η νέα νομοθεσία προσαρμόζεται στις σύγχρονες οικογενειακές δομές.", link: "https://www.ekathimerini.com/economy/1287511/inheritance-laws-rewritten-for-modern-era/" },
        { tag: "Μεταρρύθμιση", title: "Αλλαγές σε Κληρονομιές & Διαθήκες", desc: "Η Ελλάδα παρουσιάζει μεγάλη πρόταση μεταρρύθμισης στο κληρονομικό δίκαιο.", link: "https://www.ot.gr/2026/05/20/english-edition/greece-unveils-major-inheritance-law-reform-proposal/" },
        { tag: "Εξωτερικό", title: "Αλλαγές για Έλληνες Εξωτερικού", desc: "Νέες ρυθμίσεις για κληρονομιές και ακίνητα Ελλήνων του εξωτερικού.", link: "https://www.pnlawyers.com/how-greeces-new-law-changes-inheritance-and-property-for-greeks-abroad/" },
        { tag: "Ακίνητα", title: "Εξελίξεις στην Αγορά Ακινήτων", desc: "Οι πιο σημαντικές νομοθετικές αλλαγές στην ελληνική αγορά ακινήτων.", link: "https://www.buygreece.us/blog/the-most-important-real-estate-law-changes-in-greece" }
      ],
      readMore: "Διαβάστε"
    },
    links: {
      label: "Χρήσιμα",
      heading: "Χρήσιμοι Σύνδεσμοι",
      list: [
        { title: "gov.gr", desc: "Κυβερνητική Πύλη", url: "https://www.gov.gr" },
        { title: "e-ΕΦΚΑ", desc: "Ηλεκτρονικές Υπηρεσίες", url: "https://www.efka.gov.gr" },
        { title: "Κτηματολόγιο", desc: "Εθνικό Κτηματολόγιο", url: "https://www.ktimatologio.gr" },
        { title: "myAADE", desc: "Ανεξάρτητη Αρχή Δημοσίων Εσόδων", url: "https://www.aade.gr" },
        { title: "ΔΣΑ", desc: "Δικηγορικός Σύλλογος Αθηνών", url: "https://www.dsa.gr" },
        { title: "Ολομέλεια", desc: "Δικηγορικοί Σύλλογοι Ελλάδος", url: "https://www.olomeleia.gr" },
        { title: "Άρειος Πάγος", desc: "Ανώτατο Δικαστήριο", url: "https://www.areiospagos.gr" },
        { title: "ΣτΕ", desc: "Συμβούλιο της Επικρατείας", url: "https://www.ste.gr" },
        { title: "Εθνικό Τυπογραφείο", desc: "ΦΕΚ & Νομοθεσία", url: "https://www.et.gr" },
        { title: "Μίτος", desc: "Διοικητικές Διαδικασίες", url: "https://mitos.gov.gr" },
        { title: "EUR-Lex", desc: "Ευρωπαϊκή Νομοθεσία", url: "https://eur-lex.europa.eu" },
        { title: "Your Europe", desc: "Single Digital Gateway EU", url: "https://europa.eu/youreurope" },
        { title: "ΓΕΜΗ", desc: "Γενικό Εμπορικό Μητρώο", url: "https://www.businessportal.gr" },
        { title: "Συνήγορος Πολίτη", desc: "Ανεξάρτητη Αρχή", url: "https://www.synigoros.gr" },
        { title: "Αίτηση Σύνταξης", desc: "Ηλεκτρονικός ΕΦΚΑ", url: "https://www.gov.gr/ipiresies/ergasia-kai-asphalise/suntaxiodotese" }
      ]
    },
    contact: {
      label: "Επικοινωνία",
      heading: "Ας μιλήσουμε",
      sub: "Συμπληρώστε τη φόρμα ή καλέστε απευθείας. Η πρώτη συνομιλία είναι πάντα δωρεάν.",
      formTitle: "Στείλτε μήνυμα",
      formNote: "Απάντηση εντός 24 ωρών.",
      calendlyLabel: "Κλείστε Ραντεβού Online",
      calendlyNote: "Διαθέσιμο 24/7",
      calendlyUrl: "https://calendly.com/gnakou-law",
      form: { name: "Ονοματεπώνυμο", email: "Email", phone: "Τηλέφωνο", message: "Πείτε μας λίγα λόγια για την υπόθεσή σας", submit: "Αποστολή", success: "Το μήνυμα στάλθηκε. Θα επικοινωνήσουμε σύντομα." },
      phone: "697 473 1607",
      phoneLabel: "Τηλέφωνο",
      email: "gnakou.law@gmail.com",
      emailLabel: "Email",
      location: "Αθήνα · Θεσσαλονίκη",
      hours: "Δευτ – Παρ · 09:00 – 18:00",
      hoursLabel: "Ώρες",
      directLabel: "Άμεση επικοινωνία",
      citiesLabel: "Εξυπηρέτηση",
      landline: "231 700 7792",
      landlineLabel: "Σταθερό",
      address: "Μαυρομιχάλη 68, Πολίχνη",
      addressLabel: "Διεύθυνση",
      cities: [{ name: "Αθήνα", note: "Κατόπιν ραντεβού" }, { name: "Θεσσαλονίκη", note: "Κατόπιν ραντεβού" }]
    },
    footer: { tagline: "Νομική εμπειρία. Ανθρώπινη προσέγγιση.", rights: "© 2026 Γεωργία Νάκου — Δικηγόρος" }
  },
  en: {
    nav: { about: "Profile", services: "Services", efka: "e-EFKA", reviews: "Reviews", contact: "Contact" },
    hero: {
      badge: "LAW OFFICE\n· ATHENS · THESSALONIKI",
      name: "Georgia Nakou",
      role: "ATTORNEY AT LAW",
      tagline: "Trust. Knowledge. Results.",
      ctaPrimary: "Get in Touch",
      ctaSecondary: "Services"
    },
    marquee: ["REAL ESTATE", "CONTRACTS", "e-EFKA PENSIONS", "PRIVATE AGREEMENTS", "INHERITANCE"],
    about: {
      label: "Profile",
      heading: "Behind every case, a person.",
      bio: "Attorney of the Athens Bar Association. Certified for e-EFKA pensions. Clarity, consistency, humanity.",
      certs: ["e-EFKA Certified", "Land Registry & Real Estate", "Insurance Law"]
    },
    manifesto: [["The", "law", "is", "complex."], ["Our", "relationship", "is", "not."], ["Clarity", "at", "every", "step."]],
    journey: {
      label: "The Journey",
      heading: "How we work together",
      intro: "Every case is a story. Here is how we move it forward \u2014 step by step, with full transparency.",
      steps: [
        { n: "01", title: "First Contact", desc: "We listen. We record your case with care and without rush \u2014 the first conversation is always free." },
        { n: "02", title: "Analysis & Strategy", desc: "We study documents, titles and entitlements, then design a clear strategy with realistic expectations." },
        { n: "03", title: "Action", desc: "We draft, represent and execute \u2014 consistently and on every deadline." },
        { n: "04", title: "Resolution", desc: "We close the case and stay by your side for every step that follows." }
      ]
    },
    stats: [
      { value: 5.0, suffix: "", label: "Google Rating", decimals: 1 },
      { value: 40, suffix: "+", label: "5-Star Reviews", decimals: 0 },
      { value: 2, suffix: "", label: "Cities", decimals: 0 },
      { value: 100, suffix: "%", label: "Dedication", decimals: 0 }
    ],
    creed: {
      label: "Our philosophy",
      quote: "The law was written for people \u2014 and behind every case there is a person. I never forget that.",
      author: "Georgia Nakou",
      authorRole: "Attorney at Law"
    },
    services: {
      label: "Services",
      heading: "Legal coverage at every step",
      list: [
        { n: "01", title: "Real Estate", desc: "Title checks, transfers, land registry.", detail: "Full legal support for real estate transactions: title searches, Land Registry transfers, drafting of preliminary and final contracts. We handle encumbrances, mortgages and every obstacle — ensuring a clean, secure transfer." },
        { n: "02", title: "Contracts", desc: "Drafting & review with full security.", detail: "Drafting and legal review of all contract types — sale, donation, parental provision, loan for use. We ensure complete legal coverage and protection of your interests in every transaction, from first draft to signature." },
        { n: "03", title: "Private Agreements", desc: "Commercial, rental, employment.", detail: "Drafting of commercial agreements, residential and commercial lease contracts, employment contracts. Every private agreement is written with full legal validity, clear terms and complete protection of your rights." },
        { n: "04", title: "e-EFKA Pensions", desc: "Entitlement checks & pension issuance.", detail: "Certified representation for application and issuance of primary and supplementary pensions through e-EFKA. We handle insurance history checks, recognition of insurance periods and full case management from application to award." }
      ]
    },
    efka: {
      badge: "CERTIFIED",
      heading: "Certified for e-EFKA",
      desc: "Full representation for primary & supplementary pensions — from review to award.",
      cta: "Go to e-EFKA"
    },
    reviews: { label: "Reviews", heading: "The trust of our clients", subtitle: "Google Reviews", rating: "5.0" },
    news: {
      label: "News",
      heading: "Legal Updates",
      items: [
        { tag: "Law 5239/2025", title: "New former-OGA provisions", desc: "Additional OGA insurance time is now usable even without continuing primary insurance from 1/1/1998.", link: "https://www.facebook.com/share/p/1SgFEzHLVQ/?mibextid=wwXIfr" },
        { tag: "Ruling", title: "Debt cancellation for heirs", desc: "Cancellation of debts imposed on heirs — first cousins of a deceased debtor.", link: "https://www.facebook.com/share/1CLy9GMSBD/?mibextid=wwXIfr" },
        { tag: "Inheritance", title: "New Greek Inheritance Law 2026", desc: "Key changes impacting estate planning and succession in Greece.", link: "https://www.zeya.com/news/new-greek-inheritance-law-enacted-key-changes-impacting-estate-planning" },
        { tag: "Reform", title: "Inheritance Law Reforms", desc: "How recent reforms reshape estate planning for residents and expats.", link: "https://ally-law.com/recent-reforms-in-greek-inheritance-law-reshape-estate-planning/" },
        { tag: "Real Estate", title: "Property Law Changes 2026", desc: "Major legislative changes in the Greek real estate market.", link: "https://globallawexperts.com/greece-property-law-changes-2026/" },
        { tag: "Guide", title: "New Inheritance Law for Expats", desc: "A guide for foreign nationals and property owners in Greece.", link: "https://www.expatlaw.gr/post/greek-inheritance-law-2026-expats-property" },
        { tag: "Real Estate", title: "What Property Owners Must Know", desc: "Inheritance law: what changes for buyers and property owners.", link: "https://elxis.com/greeces-new-inheritance-law-what-property-owners-and-buyers-need-to-know" },
        { tag: "Strategy", title: "2026 Reform Implications", desc: "Strategic implications for international estate planning and cross-border wealth.", link: "https://tsamichaslaw.gr/greeces-new-inheritance-law-reform-2026-strategic-implications-for-estate-planning-cross-border-wealth-structuring/" },
        { tag: "Family", title: "Inheritance Law & Modern Families", desc: "How the new legislation adapts to modern family structures.", link: "https://www.ekathimerini.com/economy/1287511/inheritance-laws-rewritten-for-modern-era/" },
        { tag: "Reform", title: "Major Changes to Inheritance", desc: "Greece unveils major inheritance law reform proposal.", link: "https://www.ot.gr/2026/05/20/english-edition/greece-unveils-major-inheritance-law-reform-proposal/" },
        { tag: "Diaspora", title: "Changes for Greeks Abroad", desc: "New rules for inheritance and property for Greeks living abroad.", link: "https://www.pnlawyers.com/how-greeces-new-law-changes-inheritance-and-property-for-greeks-abroad/" },
        { tag: "Real Estate", title: "Real Estate Law Updates", desc: "The most important real estate law changes in Greece.", link: "https://www.buygreece.us/blog/the-most-important-real-estate-law-changes-in-greece" }
      ],
      readMore: "Read"
    },
    links: {
      label: "Resources",
      heading: "Useful Links",
      list: [
        { title: "gov.gr", desc: "Government Portal", url: "https://www.gov.gr" },
        { title: "e-EFKA", desc: "Electronic Services", url: "https://www.efka.gov.gr" },
        { title: "Land Registry", desc: "National Cadastre", url: "https://www.ktimatologio.gr" },
        { title: "myAADE", desc: "Independent Revenue Authority", url: "https://www.aade.gr" },
        { title: "Athens Bar", desc: "Bar Association of Athens", url: "https://www.dsa.gr" },
        { title: "Olomeleia", desc: "Greek Bar Associations", url: "https://www.olomeleia.gr" },
        { title: "Areios Pagos", desc: "Supreme Court of Greece", url: "https://www.areiospagos.gr" },
        { title: "Council of State", desc: "Administrative Court", url: "https://www.ste.gr" },
        { title: "Nat. Printing Office", desc: "Government Gazette (ΦΕΚ)", url: "https://www.et.gr" },
        { title: "Mitos", desc: "Administrative Procedures", url: "https://mitos.gov.gr" },
        { title: "EUR-Lex", desc: "EU Legislation", url: "https://eur-lex.europa.eu" },
        { title: "Your Europe", desc: "Single Digital Gateway EU", url: "https://europa.eu/youreurope" },
        { title: "GEMI", desc: "General Commercial Registry", url: "https://www.businessportal.gr" },
        { title: "Ombudsman", desc: "Independent Authority", url: "https://www.synigoros.gr" },
        { title: "Pension Application", desc: "e-EFKA Online", url: "https://www.gov.gr/ipiresies/ergasia-kai-asphalise/suntaxiodotese" }
      ]
    },
    contact: {
      label: "Contact",
      heading: "Let's talk",
      sub: "Fill in the form or call directly. The first conversation is always free.",
      formTitle: "Send a message",
      formNote: "Reply within 24 hours.",
      calendlyLabel: "Book an Appointment",
      calendlyNote: "Available 24/7",
      calendlyUrl: "https://calendly.com/gnakou-law",
      form: { name: "Full Name", email: "Email", phone: "Phone", message: "Tell us a little about your case", submit: "Send", success: "Message sent. We'll be in touch shortly." },
      phone: "697 473 1607",
      phoneLabel: "Phone",
      email: "gnakou.law@gmail.com",
      emailLabel: "Email",
      location: "Athens · Thessaloniki",
      hours: "Mon – Fri · 09:00 – 18:00",
      hoursLabel: "Hours",
      directLabel: "Direct contact",
      citiesLabel: "Where we serve",
      landline: "231 700 7792",
      landlineLabel: "Landline",
      address: "Mavromichali 68, Polichni",
      addressLabel: "Address",
      cities: [{ name: "Athens", note: "By appointment" }, { name: "Thessaloniki", note: "By appointment" }]
    },
    footer: { tagline: "Legal expertise. Human touch.", rights: "© 2026 Georgia Nakou — Attorney at Law" }
  }
};

var LUX_REVIEWS = [
  { name: "Olga Olgagr", date: "4μ", text: "Η κ. Νάκου είναι πρωτίστως ΑΝΘΡΩΠΟΣ και στη συνέχεια εξαίρετη επαγγελματίας!" },
  { name: "Sotiris Tseronis", date: "7μ", text: "Σου θυμίζει ότι πίσω από το επάγγελμα υπάρχουν άνθρωποι. Από την πρώτη συνάντηση ένιωσα πως άκουγε." },
  { name: "Psyrri Anthi", date: "7μ", text: "Εξαιρετική και σαν δικηγόρος και σαν άνθρωπος. Σε κάνει να νιώθεις ασφάλεια με τις γνώσεις και τον επαγγελματισμό της." },
  { name: "Dimitra P.", date: "7μ", text: "Σπάνια συναντάς επαγγελματίες που συνδυάζουν γνώση, συνέπεια και ανθρωπιά. Η κ. Νάκου είναι μία από αυτούς!" },
  { name: "Dionysis Lytras", date: "6μ", text: "Πολύ καταρτισμένη, ευγενική και πάντα διαθέσιμη. Έλυσα την υπόθεσή μου γρήγορα και με απόλυτη διαφάνεια." },
  { name: "Georgia Xatzinikolaou", date: "5μ", text: "Άψογη επαγγελματίας αλλά πάνω από όλα Άνθρωπος, με ενσυναίσθηση και ηθική. Κάθε υπόθεση γίνεται προσωπική." },
  { name: "Παναγιώτης Κωστόπουλος", date: "6μ", text: "Από την πρώτη στιγμή ενδιαφέρθηκε ειλικρινά. Μου εξήγησε τα πάντα απλά και κατανοητά." },
  { name: "mary azoykh", date: "8μ", text: "Εξαιρετική σαν δικηγόρος αλλά και σαν άνθρωπος. Πάντα πρόθυμη να βοηθήσει και να λύσει κάθε απορία." },
  { name: "Marios Zervos", date: "8μ", text: "Πέρα από την άρτια νομική κατάρτιση, ξεχώρισε για τον ανθρώπινο χαρακτήρα και τη στήριξή της." },
  { name: "Γιάννης Χατζημήτσος", date: "6μ", text: "Επαγγελματίας, αξιόπιστη και αποτελεσματική! Τη συνιστώ ανεπιφύλακτα — γνώση και ήθος μαζί." },
  { name: "f0t", date: "8μ", text: "Επαγγελματίας με γνώση και αγάπη για το αντικείμενο. Η καλύτερη δικηγόρος και ένας υπέροχος άνθρωπος." },
  { name: "Φωτεινή Κωστοπούλου", date: "7μ", text: "Είχα την τύχη να συνεργαστώ επιτέλους με έναν επαγγελματία. Ευδιάθετη, υπομονετική και πάντα διαθέσιμη." },
  { name: "Kostas Kechagias", date: "5μ", text: "Συνεργάστηκα για σοβαρή υπόθεση και έμεινα απόλυτα ικανοποιημένος. Προσέγγιση επαγγελματική, άμεση και αποτελεσματική." },
  { name: "Γιώργος Φουρλάς", date: "8μ", text: "Εξαιρετική στον τομέα της. Άρτια καταρτισμένη και πάντα σε επικοινωνία για κάθε εξέλιξη." },
  { name: "Antriana Gkika", date: "8μ", text: "Τυπική στα ραντεβού της, πρόθυμη να σε ακούσει και να σε καθοδηγήσει με τις σωστές συμβουλές. Άψογη." },
  { name: "eleni al", date: "8μ", text: "Εξαιρετική δικηγόρος, καταρτισμένη και πρόθυμη να λύσει κάθε απορία. Εν ολίγοις άψογη επαγγελματίας." },
  { name: "Dimitris Giagiwtis", date: "10μ", text: "Άψογη δικηγόρος! Κορυφαία στον τομέα της, με υπομονή και κατανόηση και πάντα δίπλα στον πελάτη!" },
  { name: "Μαρία Μπινιάρη", date: "8μ", text: "Συστήνω ανεπιφύλακτα την κ. Νάκου για τον άψογο επαγγελματισμό και την κατάρτισή της σε σύνθετα νομικά ζητήματα." },
  { name: "Νίκος Αναστασόπουλος", date: "5μ", text: "Εξαιρετική επαγγελματίας με ανθρώπινη προσέγγιση και αμεσότητα." },
  { name: "Fofiko Fofikou", date: "10μ", text: "Χειρίστηκε την υπόθεσή μου με υπευθυνότητα και ειλικρίνεια. Μου ενέπνευσε εμπιστοσύνη από την πρώτη στιγμή!" },
  { name: "Μιλτιάδης Τσαλκιτζής", date: "10μ", text: "Εξαιρετική και κατατοπιστική δικηγόρος. Διεκπεραίωσε αμέσως την υπόθεση που της αναθέσαμε. Ευχαριστούμε!" },
  { name: "Θεοδώρα Κετάνη", date: "10μ", text: "Μου έλυσε κάθε απορία και δεν με ταλαιπώρησε καθόλου. Φανταστική εξυπηρέτηση, ευχαριστούμε πολύ!" },
  { name: "kiki vag", date: "10μ", text: "Άριστη εξυπηρέτηση με πολύ επαγγελματισμό και γνώση πάνω στο αντικείμενο, και πάνω από όλα με ανθρωπιά." },
  { name: "A-KAPA", date: "8μ", text: "Εξαιρετική δικηγόρος! Άψογη στη δουλειά της και πάντα τυπική στα ραντεβού της. Υπεύθυνη και με άμεση ανταπόκριση." },
  { name: "Eleni Stonikou", date: "5μ", text: "Εξαιρετική επαγγελματίας αλλά και άνθρωπος με ενσυναίσθηση." },
  { name: "Vasilis Michopoulos", date: "8μ", text: "Εξαιρετική και με απίστευτο εύρος νομικών γνώσεων." },
  { name: "Georgia Rentzou", date: "10μ", text: "Με βοήθησε με υπευθυνότητα, συνέπεια και πραγματικό ενδιαφέρον. Από την πρώτη στιγμή έδειξε βαθιά γνώση." },
  { name: "Evanggelia Danapasi", date: "10μ", text: "Ξέρει ακριβώς πώς να σε συμβουλέψει προς τη σωστή κατεύθυνση. Αν μπορούσα θα έβαζα 10 αστέρια!" },
  { name: "Mpetso Mpetso", date: "10μ", text: "Ευτυχώς η γειτονιά μας έχει τέτοιο δικηγόρο!" },
  { name: "Fay Bet", date: "10μ", text: "Εξαιρετική δικηγόρος, απίστευτος άνθρωπος!" },
  { name: "Bariemai Pouzw", date: "10μ", text: "Καταρτισμένη, έτοιμη να σου λύσει κάθε απορία. Την συστήνω ανεπιφύλακτα!" },
  { name: "efstathia azouki", date: "8μ", text: "Εξαιρετική επαγγελματίας με εμπειρία!" },
  { name: "eirini pavlidou", date: "10μ", text: "Άψογη επαγγελματίας! Δίπλα μας σε όλα! Ευχαριστούμε πολύ!" },
  { name: "Δέσποινα Θεοφανίδου", date: "8μ", text: "Άμεση και άψογη εξυπηρέτηση! Το συστήνω!" },
  { name: "Αθηνά Κιοσέογλου", date: "2μ", text: "Απίστευτη επαγγελματίας! Ξεχωρίζει για τις γνώσεις της, που με μεγάλη υπομονή κάνει κατανοητές." },
  { name: "Νικόλαος Αζ.", date: "6μ", text: "Μετά από κακή πρώτη εμπειρία με άλλον δικηγόρο, η κ. Νάκου ανέλαβε υπεύθυνα την υπόθεση αγοράς του ακινήτου μας." }
];
