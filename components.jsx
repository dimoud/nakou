const { useState, useEffect } = React;

/* ── Icons ──────────────────────────────────────────────── */
const IconHouse  = () => <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z"/></svg>;
const IconDoc    = () => <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M6 3H15L21 9V21H6V3Z"/><path d="M15 3V9H21"/><path d="M9 13H18M9 17H14"/></svg>;
const IconPen    = () => <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M17 3L21 7L10 18H6V14L17 3Z"/><path d="M14 6L18 10"/></svg>;
const IconShield = () => <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 3L21 7V13C21 18 17 22 12 22C7 22 3 18 3 13V7L12 3Z"/><path d="M9 12L11 14L15 10"/></svg>;
const IconPhone  = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.7 12.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012.61 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.63a16 16 0 006.46 6.46l1-1a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>;
const IconMail   = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6L12 13L2 6"/></svg>;
const IconPin    = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const IconFb     = () => <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
const IconArrow  = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>;
const svcIcons   = [<IconHouse/>, <IconDoc/>, <IconPen/>, <IconShield/>];

/* ── Nav ─────────────────────────────────────────────────── */
function Nav({ lang, setLang, t }) {
  const [open, setOpen] = useState(false);
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' });
    setOpen(false);
  };
  const links = [
    { id: 'services', label: t.nav.services },
    { id: 'efka',     label: t.nav.efka     },
    { id: 'reviews',  label: t.nav.reviews  },
    { id: 'contact',  label: t.nav.contact  }
  ];
  return (
    <nav className={`main-nav${open ? ' nav-open' : ''}`}>
      <a className="nav-logo" href="#" onClick={e => { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); }}>
        <img src="uploads/pasted-1780674099644-0.png" alt="Γεωργία Νάκου Δικηγόρος" />
      </a>
      <div className="nav-links">
        {links.map(l => <button key={l.id} className="nav-link-btn" onClick={() => scrollTo(l.id)}>{l.label}</button>)}
      </div>
      <div className="nav-right">
        <a className="nav-phone" href="tel:6974731607">697 473 1607</a>
        <div className="lang-toggle">
          <button className={`lang-btn${lang==='el'?' active':''}`} onClick={() => setLang('el')}>ΕΛ</button>
          <button className={`lang-btn${lang==='en'?' active':''}`} onClick={() => setLang('en')}>EN</button>
        </div>
        <button className="hamburger" aria-label="Menu" onClick={() => setOpen(!open)}>
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            {open ? <><line x1="2" y1="2" x2="20" y2="14"/><line x1="20" y1="2" x2="2" y2="14"/></> : <><line x1="0" y1="2" x2="22" y2="2"/><line x1="0" y1="8" x2="22" y2="8"/><line x1="0" y1="14" x2="22" y2="14"/></>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="mobile-menu">
          {links.map(l => <button key={l.id} className="mobile-link-btn" onClick={() => scrollTo(l.id)}>{l.label}</button>)}
          <div className="mobile-divider"></div>
          <a className="mobile-phone" href="tel:6974731607">697 473 1607</a>
        </div>
      )}
    </nav>
  );
}

/* ── Hero ────────────────────────────────────────────────── */
function Hero({ t, lang, setLang }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' });
  };
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-badge">{t.hero.badge}</span>
        <h1 className="hero-name">{t.hero.name}</h1>
        <p className="hero-title">{t.hero.title}</p>
        <p className="hero-desc">{t.hero.desc}</p>
        <button className="hero-cta" onClick={() => scrollTo('contact')}>{t.hero.cta}</button>
        <p className="hero-location">{t.hero.location}</p>
      </div>
      <div className="hero-right">
        <img src="uploads/pasted-1780674326974-0.png" alt="Γεωργία Νάκου" />
        <div className="hero-overlay"></div>
      </div>
    </section>
  );
}

/* ── About ───────────────────────────────────────────────── */
function About({ t }) {
  return (
    <section className="section" id="about">
      <div className="section-inner">
        <div className="about-grid">
          <div>
            <p className="section-label">{t.about.label}</p>
            <h2 className="section-title">{t.about.heading}</h2>
            <p className="about-bio">{t.about.bio}</p>
            <blockquote className="about-quote">
              <p>"{t.about.quote}"</p>
              <cite>{t.about.quoteAuthor}</cite>
            </blockquote>
          </div>
          <div>
            <ul className="about-certs">
              {t.about.certs.map((c, i) => (
                <li key={i} className="cert-item">
                  <span className="cert-dot"></span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Services ────────────────────────────────────────────── */
function Services({ t }) {
  return (
    <section className="section bg-light" id="services">
      <div className="section-inner">
        <p className="section-label">{t.services.label}</p>
        <h2 className="section-title">{t.services.heading}</h2>
        <div className="services-grid">
          {t.services.list.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-icon">{svcIcons[i]}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── EFKA Banner ─────────────────────────────────────────── */
function EfkaBanner({ t }) {
  return (
    <section className="efka-banner" id="efka">
      <div className="efka-inner">
        <span className="efka-badge">{t.efka.badge}</span>
        <h2 className="efka-title">{t.efka.heading}</h2>
        <p className="efka-desc">{t.efka.desc}</p>
        <a href="https://www.e-efka.gov.gr/el/yperesies-e-ephka" target="_blank" rel="noopener noreferrer" className="efka-link">
          {t.efka.cta} <IconArrow />
        </a>
      </div>
    </section>
  );
}

/* ── Reviews Carousel ────────────────────────────────────── */
function Reviews({ t }) {
  const [page, setPage] = useState(0);
  const perPage = 3;
  const pages = Math.ceil(reviewsData.length / perPage);

  useEffect(() => {
    const timer = setInterval(() => setPage(p => (p + 1) % pages), 6000);
    return () => clearInterval(timer);
  }, [pages]);

  const start = page * perPage;
  const raw = reviewsData.slice(start, start + perPage);
  const visible = raw.length < perPage ? [...raw, ...reviewsData.slice(0, perPage - raw.length)] : raw;

  return (
    <section className="section" id="reviews">
      <div className="section-inner">
        <p className="section-label">{t.reviews.label}</p>
        <div className="reviews-head">
          <h2 className="section-title sm">{t.reviews.heading}</h2>
          <div className="google-badge">
            <span className="google-g">G</span>
            <span className="stars-all">★★★★★</span>
            <span className="google-badge-text">5.0 · {t.reviews.total}</span>
          </div>
        </div>
        <div className="reviews-grid">
          {visible.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"{r.text}"</p>
              <div className="review-author">
                <div className="review-avatar">{r.name.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-date">{r.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-nav">
          <button className="carousel-btn" onClick={() => setPage(p => (p - 1 + pages) % pages)} aria-label="Previous">←</button>
          <div className="carousel-dots">
            {Array.from({length: pages}).map((_, i) => (
              <button key={i} className={`carousel-dot${i===page?' active':''}`} onClick={() => setPage(i)} aria-label={`Page ${i+1}`}></button>
            ))}
          </div>
          <button className="carousel-btn" onClick={() => setPage(p => (p + 1) % pages)} aria-label="Next">→</button>
        </div>
      </div>
    </section>
  );
}

/* ── News ────────────────────────────────────────────────── */
function News({ t }) {
  return (
    <section className="section bg-light" id="news">
      <div className="section-inner">
        <p className="section-label">{t.news.label}</p>
        <h2 className="section-title sm">{t.news.heading}</h2>
        <div className="news-grid">
          {t.news.items.map((item, i) => (
            <div key={i} className="news-card">
              <h3 className="news-title">{item.title}</h3>
              <p className="news-desc">{item.desc}</p>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="news-link">
                {t.news.readMore}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Useful Links ────────────────────────────────────────── */
function UsefulLinks({ t }) {
  return (
    <section className="section bg-dark" id="links">
      <div className="section-inner">
        <p className="section-label gold">{t.links.label}</p>
        <h2 className="section-title on-dark sm">{t.links.heading}</h2>
        <div className="links-grid">
          {t.links.list.map((l, i) => (
            <a key={i} href={l.url} target="_blank" rel="noopener noreferrer" className="link-card">
              <div className="link-arrow"><IconArrow /></div>
              <h3 className="link-title">{l.title}</h3>
              <p className="link-desc">{l.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Education ───────────────────────────────────────────── */
function Education({ t }) {
  return (
    <section className="section" id="education">
      <div className="section-inner">
        <div className="edu-contact-wrap">
          <div>
            <p className="section-label">{t.education.label}</p>
            <h2 className="section-title sm">{t.education.heading}</h2>
            <div className="education-list">
              {t.education.items.map((item, i) => (
                <div key={i} className="education-item">
                  <span className="edu-year">{item.year}</span>
                  <span className="edu-detail">{item.detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact ─────────────────────────────────────────────── */
function Contact({ t }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [sent, setSent] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setForm({ name:'', email:'', phone:'', subject:'', message:'' });
    setTimeout(() => setSent(false), 6000);
  };
  const f = t.contact.form;
  const info = t.contact.info;
  return (
    <section className="section bg-light" id="contact">
      <div className="section-inner">
        <div className="contact-grid">
          <div className="contact-form-wrap">
            <p className="section-label">{t.contact.label}</p>
            <h2 className="section-title sm">{t.contact.heading}</h2>
            {sent && <div className="success-msg">{f.success}</div>}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input name="name" value={form.name} onChange={handleChange} placeholder={f.name} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder={f.email} required />
                </div>
                <div className="form-group">
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder={f.phone} />
                </div>
              </div>
              <div className="form-group">
                <input name="subject" value={form.subject} onChange={handleChange} placeholder={f.subject} />
              </div>
              <div className="form-group">
                <textarea name="message" value={form.message} onChange={handleChange} placeholder={f.message} rows="5" required></textarea>
              </div>
              <button type="submit" className="form-submit">{f.submit}</button>
            </form>
          </div>
          <div className="contact-info-panel">
            <h3 className="contact-panel-name">Γεωργία Νάκου</h3>
            <p className="contact-panel-title">{t.hero.title}</p>
            <div className="contact-items">
              <a href="tel:6974731607" className="contact-item">
                <span className="contact-item-icon"><IconPhone /></span>
                <span>{info.phone}</span>
              </a>
              <a href="mailto:gnakou.law@gmail.com" className="contact-item">
                <span className="contact-item-icon"><IconMail /></span>
                <span>{info.email}</span>
              </a>
              <div className="contact-item">
                <span className="contact-item-icon"><IconPin /></span>
                <span>{info.location}</span>
              </div>
              <a href="https://www.facebook.com/profile.php?id=61579331237666" target="_blank" rel="noopener noreferrer" className="contact-item">
                <span className="contact-item-icon"><IconFb /></span>
                <span>{info.facebook}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
function Footer({ t }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' });
  };
  return (
    <footer className="main-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <img src="uploads/pasted-1780674099644-0.png" alt="Γεωργία Νάκου" className="footer-logo" />
            <p className="footer-tagline">{t.footer.tagline}</p>
          </div>
          <nav className="footer-links">
            {[['services',t.nav.services],['efka',t.nav.efka],['reviews',t.nav.reviews],['contact',t.nav.contact]].map(([id,label]) => (
              <button key={id} className="footer-link-btn" onClick={() => scrollTo(id)}>{label}</button>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">{t.footer.rights}</p>
          <div className="footer-social">
            <a href="https://www.facebook.com/profile.php?id=61579331237666" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><IconFb /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── App ─────────────────────────────────────────────────── */
function App() {
  const [lang, setLang] = useState('el');
  const t = translations[lang];
  return (
    <div className="app">
      <Nav lang={lang} setLang={setLang} t={t} />
      <Hero t={t} lang={lang} setLang={setLang} />
      <About t={t} />
      <Services t={t} />
      <EfkaBanner t={t} />
      <Reviews t={t} />
      <News t={t} />
      <UsefulLinks t={t} />
      <Education t={t} />
      <Contact t={t} />
      <Footer t={t} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
