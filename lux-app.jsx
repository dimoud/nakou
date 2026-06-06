const { useState, useEffect, useRef } = React;

/* ═══ Animation utilities ═══ */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.unobserve(el); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, className = "", delay = 0, tag = "div" }) {
  const [ref, shown] = useReveal();
  const Tag = tag;
  return <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={{ transitionDelay: delay + "ms" }}>{children}</Tag>;
}

function useCountUp(target, decimals, run) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf, start;
    const dur = 1700;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick); else setVal(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return decimals ? val.toFixed(decimals) : Math.round(val);
}

function useParallax(speed = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(pointer: coarse)").matches) return;
    let raf;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2 - window.innerHeight / 2;
        el.style.transform = `translateY(${c * -speed}px)`;
      });
    };
    window.addEventListener("scroll", on, { passive: true }); on();
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, [speed]);
  return ref;
}

/* progress 0..1 of how far an element has travelled through the viewport */
function useScrollScrub() {
  const ref = useRef(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = r.height + vh;
        const seen = vh - r.top;
        setP(Math.max(0, Math.min(1, seen / total)));
      });
    };
    window.addEventListener("scroll", on, { passive: true }); on();
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  return [ref, p];
}

function Magnetic({ children, className, onClick, ...rest }) {
  const ref = useRef(null);
  const move = (e) => {
    if (matchMedia("(pointer: coarse)").matches) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.4}px)`;
  };
  const leave = () => { ref.current.style.transform = ""; };
  return <button ref={ref} className={`magnetic ${className}`} onMouseMove={move} onMouseLeave={leave} onClick={onClick} {...rest}>{children}</button>;
}

/* ═══ Chrome: cursor + progress ═══ */
function Cursor() {
  useEffect(() => {
    if (matchMedia("(pointer: coarse)").matches) return;
    const dot = document.createElement("div"); dot.className = "cur-dot";
    const ring = document.createElement("div"); ring.className = "cur-ring";
    document.body.append(dot, ring);
    let rx = 0, ry = 0, mx = 0, my = 0, raf;
    const move = (e) => { mx = e.clientX; my = e.clientY; dot.style.transform = `translate(${mx}px,${my}px)`; };
    const loop = () => { rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16; ring.style.transform = `translate(${rx}px,${ry}px)`; raf = requestAnimationFrame(loop); };
    const over = (e) => { ring.classList.toggle("big", !!e.target.closest("a,button,.hoverable,input,textarea")); };
    window.addEventListener("mousemove", move); window.addEventListener("mouseover", over); loop();
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); cancelAnimationFrame(raf); dot.remove(); ring.remove(); };
  }, []);
  return null;
}

function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', on, { passive: true }); on();
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <button
      className={`scroll-top ${show ? 'scroll-top-show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >↑</button>
  );
}

function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => { const h = document.documentElement; const max = h.scrollHeight - h.clientHeight; setP(max > 0 ? (h.scrollTop / max) * 100 : 0); };
    window.addEventListener("scroll", on, { passive: true }); on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div className="scroll-progress" style={{ transform: `scaleX(${p / 100})` }} />;
}

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 70, behavior: "smooth" });
};

/* ═══ Scales emblem ═══ */
function Emblem({ className = "" }) {
  return (
    <svg className={`emblem ${className}`} viewBox="0 0 100 104" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="50" cy="13" r="2.4" />
      <line x1="50" y1="16" x2="50" y2="86" />
      <line x1="40" y1="90" x2="60" y2="90" />
      <g className="emblem-beam">
        <path d="M27 27 Q50 19 73 27" />
        <line x1="27" y1="27" x2="27" y2="34" />
        <line x1="73" y1="27" x2="73" y2="34" />
        <path d="M17 34 Q27 52 37 34" />
        <path d="M63 34 Q73 52 83 34" />
      </g>
    </svg>
  );
}

/* ═══ Nav ═══ */
function Nav({ lang, setLang, t }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", on, { passive: true }); on();
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [["about", t.nav.about], ["services", t.nav.services], ["efka", t.nav.efka], ["reviews", t.nav.reviews], ["contact", t.nav.contact]];
  const go = (id) => { scrollTo(id); setOpen(false); };
  return (
    <nav className={`nav ${solid ? "solid" : ""}`}>
      <button className="nav-brand" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <Emblem className="nav-emblem" />
        <span className="nav-brand-name">Γεωργία Νάκου</span>
      </button>
      <div className="nav-links">
        {links.map(([id, label]) => <button key={id} className="nav-link" onClick={() => go(id)}>{label}</button>)}
      </div>
      <div className="nav-right">
        <div className="lang">
          <button className={lang === "el" ? "on" : ""} onClick={() => setLang("el")}>ΕΛ</button>
          <span>/</span>
          <button className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">
          <span className={open ? "x" : ""}></span><span className={open ? "x" : ""}></span>
        </button>
      </div>
      <div className={`nav-drawer ${open ? "open" : ""}`}>
        {links.map(([id, label]) => <button key={id} onClick={() => go(id)}>{label}</button>)}
      </div>
    </nav>
  );
}

/* ═══ Hero particles ═══ */
function HeroParticles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let w, h, raf;
    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const pts = Array.from({ length: 90 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: Math.random() * 2.4 + 0.8,
      vx: (Math.random() - 0.5) * 0.25,
      vy: -(Math.random() * 0.35 + 0.05),
      life: Math.random(), speed: 0.0014 + Math.random() * 0.0016,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.shadowColor = 'rgba(201,163,94,0.7)'; ctx.shadowBlur = 6;
      pts.forEach(p => {
        p.life += p.speed; p.x += p.vx; p.y += p.vy;
        if (p.life >= 1 || p.y < -10) { p.life = 0; p.x = Math.random() * w; p.y = h + 10; }
        const a = Math.sin(p.life * Math.PI) * 0.9;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,176,108,${a})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="hero-particles" />;
}

/* ═══ Hero ═══ */
function Hero({ t }) {
  const innerRef = useRef(null);
  const bgRef = useRef(null);
  const glowRef = useRef(null);
  const cueRef = useRef(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY, vh = window.innerHeight;
        if (y > vh * 1.25) return;
        const p = Math.min(y / vh, 1);
        if (innerRef.current) { innerRef.current.style.transform = `translateY(${y * 0.3}px)`; innerRef.current.style.opacity = String(Math.max(0, 1 - p * 1.3)); }
        if (bgRef.current) bgRef.current.style.transform = `translate(-50%, calc(-46% + ${y * 0.14}px)) scale(${1 + p * 0.14})`;
        if (glowRef.current) glowRef.current.style.transform = `translateX(-50%) scale(${1 + p * 0.35})`;
        if (cueRef.current) cueRef.current.style.opacity = String(Math.max(0, 1 - p * 3.5));
      });
    };
    window.addEventListener("scroll", on, { passive: true }); on();
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);
  const words = t.hero.name.split(" ");
  let li = 0;
  return (
    <header className="hero" id="top">
      <HeroParticles />
      <div className="hero-beam"></div>
      <div className="hero-beam hero-beam-2"></div>
      <div className="hero-glow" ref={glowRef}></div>
      <div className="hero-emblem-bg" ref={bgRef}><Emblem /></div>
      <div className="hero-inner" ref={innerRef}>
        <p className="hero-badge fade-up d1">{t.hero.badge}</p>
        <Emblem className="hero-emblem hero-emblem-draw" />
        <h1 className="hero-name" key={t.hero.name} aria-label={t.hero.name}>
          {words.map((w, wi) => (
            <span className="hero-word" key={wi} aria-hidden="true">
              {[...w].map((ch, ci) => {
                const d = 360 + (li++) * 42;
                return (
                  <span className="hero-letter" key={ci}>
                    <span className="hero-letter-i" style={{ animationDelay: d + "ms" }}>{ch}</span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>
        <p className="hero-role fade-up d4">{t.hero.role}</p>
        <div className="hero-rule fade-up d4"></div>
        <p className="hero-tag fade-up d5">{t.hero.tagline}</p>
        <div className="hero-cta-row fade-up d6">
          <Magnetic className="btn btn-gold" onClick={() => scrollTo("contact")}>{t.hero.ctaPrimary}</Magnetic>
          <Magnetic className="btn btn-ghost" onClick={() => scrollTo("services")}>{t.hero.ctaSecondary}</Magnetic>
        </div>
      </div>
      <button className="scroll-cue fade-up d6" ref={cueRef} onClick={() => scrollTo("about")} aria-label="Scroll">
        <span></span>
      </button>
      <div className="hero-info">
        <a className="hic hic-1" href="tel:6974731607">
          <span className="hic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg></span>
          <span className="hic-text">
            <span className="hic-label">{t.contact.phoneLabel}</span>
            <span className="hic-val">{t.contact.phone}</span>
          </span>
        </a>
        <a className="hic hic-2" href="tel:2317007792">
          <span className="hic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></span>
          <span className="hic-text">
            <span className="hic-label">{t.contact.landlineLabel}</span>
            <span className="hic-val">{t.contact.landline}</span>
          </span>
        </a>
        <a className="hic hic-3" href={`mailto:${t.contact.email}`}>
          <span className="hic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
          <span className="hic-text">
            <span className="hic-label">{t.contact.emailLabel}</span>
            <span className="hic-val">{t.contact.email}</span>
          </span>
        </a>
        <div className="hic hic-4">
          <span className="hic-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg></span>
          <span className="hic-text">
            <span className="hic-label">{t.contact.addressLabel}</span>
            <span className="hic-val">{t.contact.address}</span>
          </span>
        </div>
      </div>
    </header>
  );
}

/* ═══ Marquee strip ═══ */
function Marquee({ items }) {
  const row = [...items, ...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {row.map((w, i) => <span key={i} className="marquee-item">{w}<i className="marquee-dot">◆</i></span>)}
      </div>
    </div>
  );
}

/* ═══ About ═══ */
function About({ t }) {
  const pRef = useParallax(0.06);
  return (
    <section className="section about" id="about">
      <div className="wrap about-grid">
        <Reveal className="about-portrait">
          <div className="portrait-frame" ref={pRef}>
            <img src="uploads/pasted-1780734660074-0.png" alt="Γεωργία Νάκου" />
          </div>
          <div className="portrait-cap"><Emblem className="cap-emblem" /><span>Γεωργία Νάκου · {t.hero.role}</span></div>
        </Reveal>
        <div className="about-text">
          <Reveal tag="p" className="label">{t.about.label}</Reveal>
          <Reveal tag="h2" className="display" delay={80}>{t.about.heading}</Reveal>
          <Reveal className="about-bio-list" delay={160}>
            {t.about.bio.split('. ').filter(Boolean).map((item, i) => (
              <div key={i} className="about-bio-item">
                <span className="about-bio-bullet"></span>
                <span>{item.replace(/\.$/, '')}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══ Stats ═══ */
function Stat({ s, run, i }) {
  const v = useCountUp(s.value, s.decimals, run);
  return (
    <div className="stat" style={{ transitionDelay: i * 110 + "ms" }}>
      <div className="stat-val">{v}{s.suffix}</div>
      <div className="stat-label">{s.label}</div>
    </div>
  );
}
function Stats({ t }) {
  const [ref, shown] = useReveal(0.3);
  return (
    <section className="stats" ref={ref}>
      <div className={`wrap stats-grid ${shown ? "in" : ""}`}>
        {t.stats.map((s, i) => <Stat key={i} s={s} run={shown} i={i} />)}
      </div>
    </section>
  );
}

/* ═══ Services ═══ */
function Services({ t }) {
  const [open, setOpen] = useState(null);
  return (
    <section className="section services" id="services">
      <div className="wrap">
        <Reveal tag="p" className="label">{t.services.label}</Reveal>
        <Reveal tag="h2" className="display mb" delay={80}>{t.services.heading}</Reveal>
        <div className="svc-list">
          {t.services.list.map((s, i) => (
            <Reveal key={i} className={`svc-item${open === i ? ' svc-open' : ''}`} delay={i * 90}>
              <div className="svc-row hoverable" onClick={() => setOpen(open === i ? null : i)}>
                <span className="svc-n">{s.n}</span>
                <div className="svc-main">
                  <h3 className="svc-title">{s.title}</h3>
                  <div className="svc-detail-wrap">
                    <p className="svc-detail">{s.detail}</p>
                  </div>
                </div>
                <span className="svc-arrow">{open === i ? '↓' : '↗'}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ Manifesto (scroll-scrubbed word reveal) ═══ */
function Manifesto({ t }) {
  const [ref, p] = useScrollScrub();
  const rows = t.manifesto;
  const words = rows.flat();
  const active = p * (words.length + 2) - 1;
  let wi = 0;
  return (
    <section className="manifesto" ref={ref}>
      <div className="manifesto-glow" style={{ opacity: 0.25 + p * 0.55 }}></div>
      <p className="manifesto-text">
        {rows.map((row, ri) => (
          <span key={ri} className="mf-row">
            {row.map((w) => {
              const i = wi++;
              const lit = Math.max(0, Math.min(1, active - i + 1));
              return (
                <span key={i} className="mf-w" style={{ opacity: 0.12 + lit * 0.88, color: lit > 0.6 ? "var(--gold-lt)" : undefined, transform: `translateY(${(1 - lit) * 12}px)` }}>{w} </span>
              );
            })}
          </span>
        ))}
      </p>
    </section>
  );
}

/* ═══ Journey (sticky scrollytelling) ═══ */
function Journey({ t }) {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(Number(e.target.dataset.i));
      });
    }, { threshold: 0.55, rootMargin: "-20% 0px -30% 0px" });
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  const j = t.journey;
  return (
    <section className="section journey" id="journey">
      <div className="wrap journey-grid">
        <div className="journey-aside">
          <div className="journey-sticky">
            <Reveal tag="p" className="label">{j.label}</Reveal>
            <Reveal tag="h2" className="display on-dark" delay={70}>{j.heading}</Reveal>
            <Reveal tag="p" className="journey-intro" delay={140}>{j.intro}</Reveal>
            <div className="journey-counter">
              <div className="jc-num">
                {j.steps.map((s, i) => (
                  <span key={i} className={`jc-n ${i === active ? "on" : ""}`}>{s.n}</span>
                ))}
              </div>
              <div className="jc-bar"><span style={{ transform: `scaleY(${(active + 1) / j.steps.length})` }}></span></div>
            </div>
          </div>
        </div>
        <ol className="journey-steps">
          {j.steps.map((s, i) => (
            <li key={i} data-i={i} ref={(el) => (refs.current[i] = el)} className={`journey-step ${i === active ? "on" : ""}`}>
              <span className="js-n">{s.n}</span>
              <div className="js-body">
                <h3 className="js-title">{s.title}</h3>
                <p className="js-desc">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ═══ e-EFKA ═══ */
function Efka({ t }) {
  return (
    <section className="section efka" id="efka">
      <div className="efka-glow"></div>
      <div className="wrap efka-inner">
        <Reveal tag="span" className="efka-badge">{t.efka.badge}</Reveal>
        <Reveal tag="h2" className="efka-title" delay={80}>{t.efka.heading}</Reveal>
        <Reveal tag="p" className="efka-desc" delay={160}>{t.efka.desc}</Reveal>
        <Reveal delay={240}>
          <a className="btn btn-gold" href="https://www.e-efka.gov.gr/el/yperesies-e-ephka" target="_blank" rel="noopener noreferrer">{t.efka.cta} <span className="arr">→</span></a>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ Reviews marquee ═══ */
function ReviewCard({ r }) {
  return (
    <div className="rev-card">
      <div className="rev-stars">★★★★★</div>
      <p className="rev-text">"{r.text}"</p>
      <div className="rev-foot"><span className="rev-av">{r.name.charAt(0)}</span><span className="rev-name">{r.name}</span><span className="rev-date">{r.date}</span></div>
    </div>
  );
}
function ReviewRow({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="rev-rowwrap">
      <div className={`rev-track ${reverse ? "rev" : ""}`}>
        {doubled.map((r, i) => <ReviewCard key={i} r={r} />)}
      </div>
    </div>
  );
}
function usePauseOnTouch(trackRef) {
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const pause = () => { el.style.animationPlayState = 'paused'; };
    const resume = () => { el.style.animationPlayState = 'running'; };
    el.parentElement.addEventListener('touchstart', pause, { passive: true });
    el.parentElement.addEventListener('touchend', resume);
    el.parentElement.addEventListener('mousedown', pause);
    el.parentElement.addEventListener('mouseup', resume);
    el.parentElement.addEventListener('mouseleave', resume);
    return () => {
      el.parentElement.removeEventListener('touchstart', pause);
      el.parentElement.removeEventListener('touchend', resume);
      el.parentElement.removeEventListener('mousedown', pause);
      el.parentElement.removeEventListener('mouseup', resume);
      el.parentElement.removeEventListener('mouseleave', resume);
    };
  }, []);
}
function ReviewsCarousel() {
  return (
    <div className="rev-mobile-wrap">
      <div className="rev-mobile-track">
        {LUX_REVIEWS.map((r, i) => <ReviewCard key={i} r={r} />)}
      </div>
    </div>
  );
}
function Reviews({ t }) {
  const half = Math.ceil(LUX_REVIEWS.length / 2);
  return (
    <section className="section reviews" id="reviews">
      <div className="wrap reviews-head">
        <div>
          <Reveal tag="p" className="label">{t.reviews.label}</Reveal>
          <Reveal tag="h2" className="display" delay={80}>{t.reviews.heading}</Reveal>
        </div>
        <Reveal className="g-badge" delay={120}>
          <span className="g-logo">G</span>
          <div><div className="g-stars">★★★★★ <b>{t.reviews.rating}</b></div><div className="g-sub">{t.reviews.subtitle}</div></div>
        </Reveal>
      </div>
      <div className="rev-rows rev-desktop">
        <ReviewRow items={LUX_REVIEWS.slice(0, half)} />
        <ReviewRow items={LUX_REVIEWS.slice(half)} reverse />
      </div>
      <ReviewsCarousel />
    </section>
  );
}

/* ═══ News + Links (merged) ═══ */
function NewsAndLinks({ t }) {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const items = t.news.items;
  const perPage = 2;
  const pages = Math.ceil(items.length / perPage);
  const visible = items.slice(page * perPage, page * perPage + perPage);
  const tripled = [...t.links.list, ...t.links.list, ...t.links.list];
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setPage(p => (p + 1) % pages), 5000);
    return () => clearInterval(timer);
  }, [pages, paused]);
  const go = (n) => { setPage((n + pages) % pages); setPaused(true); setTimeout(() => setPaused(false), 10000); };
  return (
    <section className="section news-links" id="news">
      <div className="wrap">
        <div className="news-header">
          <div>
            <Reveal tag="p" className="label">{t.news.label}</Reveal>
            <Reveal tag="h2" className="display" delay={80}>{t.news.heading}</Reveal>
          </div>
          <div className="news-nav">
            <button className="news-nav-btn" onClick={() => go(page - 1)} aria-label="Previous">←</button>
            <span className="news-nav-count">{page + 1} / {pages}</span>
            <button className="news-nav-btn" onClick={() => go(page + 1)} aria-label="Next">→</button>
          </div>
        </div>
        <div className="nl-news-grid">
          {visible.map((it, i) => (
            <div key={page + '-' + i} className="news-card hoverable fade-up">
              <span className="news-tag">{it.tag}</span>
              <h3 className="news-title">{it.title}</h3>
              <p className="news-desc">{it.desc}</p>
              <a className="news-link" href={it.link} target="_blank" rel="noopener noreferrer">{t.news.readMore} →</a>
            </div>
          ))}
        </div>
        <div className="nl-divider">
          <span className="nl-divider-label">{t.links.label}</span>
        </div>
      </div>
      <div className="links-scroll-wrap links-desktop">
        <div className="links-track">
          {tripled.map((l, i) => (
            <a key={i} className="link-pill" href={l.url} target="_blank" rel="noopener noreferrer">
              <span className="link-pill-title">{l.title}</span>
              <span className="link-pill-desc">{l.desc}</span>
              <span className="link-pill-arr">↗</span>
            </a>
          ))}
        </div>
      </div>
      <LinksMobileCarousel items={t.links.list} />
    </section>
  );
}

/* ═══ Links mobile carousel ═══ */
function LinksMobileCarousel({ items }) {
  return (
    <div className="links-mobile-wrap">
      <div className="links-mobile-track">
        {items.map((l, i) => (
          <a key={i} className="link-pill" href={l.url} target="_blank" rel="noopener noreferrer">
            <span className="link-pill-title">{l.title}</span>
            <span className="link-pill-desc">{l.desc}</span>
            <span className="link-pill-arr">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ═══ Links carousel ═══ */
function Links({ t }) {
  const items = t.links.list;
  const tripled = [...items, ...items, ...items];
  return (
    <section className="section links" id="links">
      <div className="wrap">
        <Reveal tag="p" className="label gold">{t.links.label}</Reveal>
        <Reveal tag="h2" className="display on-dark mb" delay={80}>{t.links.heading}</Reveal>
      </div>
      <div className="links-scroll-wrap links-desktop">
        <div className="links-track">
          {tripled.map((l, i) => (
            <a key={i} className="link-pill" href={l.url} target="_blank" rel="noopener noreferrer">
              <span className="link-pill-title">{l.title}</span>
              <span className="link-pill-desc">{l.desc}</span>
              <span className="link-pill-arr">↗</span>
            </a>
          ))}
        </div>
      </div>
      <LinksMobileCarousel items={items} />
    </section>
  );
}

/* ═══ Contact (redesigned — epic dark) ═══ */
function Field({ name, type, value, onChange, label, textarea }) {
  const [foc, setFoc] = useState(false);
  const filled = value && value.length > 0;
  const cls = `field ${foc ? "foc" : ""} ${filled ? "filled" : ""} ${textarea ? "field-area" : ""}`;
  const common = {
    name, value, onChange,
    onFocus: () => setFoc(true), onBlur: () => setFoc(false),
    required: name !== "phone",
    id: "f-" + name,
  };
  return (
    <div className={cls}>
      {textarea
        ? <textarea {...common} rows="4"></textarea>
        : <input {...common} type={type || "text"} />}
      <label htmlFor={"f-" + name}>{label}</label>
      <span className="field-line"></span>
    </div>
  );
}
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx6XHAAeJMIUVUBtHmjNqu6NGSKvFWgkWeUT4x6x_UMsmEaoPXFPMqlhXLKH5dJ0aGlag/exec";

function Contact({ t }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "ok" | "err"
  const ch = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData();
    fd.append("_to", "gnakou.law@gmail.com");
    fd.append("_key", "MyPrivateAgencyKey_99");
    fd.append("_hp", "");
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fetch(SCRIPT_URL, { method: "POST", body: fd })
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((j) => {
        if (j && j.result === "success") { setStatus("ok"); setForm({ name: "", email: "", phone: "", message: "" }); }
        else throw new Error();
      })
      .catch(() => setStatus("err"));
  };
  const c = t.contact, f = c.form;
  const pRef = useParallax(0.05);
  return (
    <section className="section contact" id="contact">
      <div className="contact-bg"></div>
      <div className="contact-emblem-bg" ref={pRef}><Emblem /></div>
      <div className="wrap">
        <div className="contact-head">
          <Reveal tag="p" className="label gold">{c.label}</Reveal>
          <Reveal tag="h2" className="display on-dark" delay={60}>{c.heading}</Reveal>
          <Reveal tag="p" className="contact-sub" delay={120}>{c.sub}</Reveal>
        </div>
        <div className="contact-grid">
          <Reveal className="contact-info" delay={120}>
            <div className="ci-block">
              <span className="ci-cap">{c.directLabel}</span>
              <a href="tel:6974731607" className="ci hoverable">
                <span className="ci-ic">☎</span>
                <span className="ci-txt"><b>{c.phoneLabel}</b>{c.phone}</span>
                <span className="ci-go">↗</span>
              </a>
              <a href="tel:2317007792" className="ci hoverable">
                <span className="ci-ic">☏</span>
                <span className="ci-txt"><b>{c.landlineLabel}</b>{c.landline}</span>
                <span className="ci-go">↗</span>
              </a>
              <div className="ci">
                <span className="ci-ic">⌖</span>
                <span className="ci-txt"><b>{c.addressLabel}</b>{c.address}</span>
              </div>
              <a href="mailto:gnakou.law@gmail.com" className="ci hoverable">
                <span className="ci-ic">✉</span>
                <span className="ci-txt"><b>{c.emailLabel}</b>{c.email}</span>
                <span className="ci-go">↗</span>
              </a>
              <div className="ci">
                <span className="ci-ic">◑</span>
                <span className="ci-txt"><b>{c.hoursLabel}</b>{c.hours}</span>
              </div>
            </div>
            <a href="https://www.facebook.com/profile.php?id=61579331237666" target="_blank" rel="noopener noreferrer" className="ci-social hoverable">
              <span className="ci-ic">f</span> Facebook
            </a>
          </Reveal>

          <Reveal className="contact-form-wrap" delay={180}>
            <div className="form-card">
              <div className="form-card-head">
                <h3 className="form-card-title">{c.formTitle}</h3>
              </div>
              {status === "ok" && <div className="form-ok">{f.success}</div>}
              {status === "err" && <div className="form-ok" style={{borderColor:"#c0392b",color:"#e74c3c",background:"rgba(192,57,43,.08)"}}>Κάτι πήγε στραβά. Δοκιμάστε ξανά ή καλέστε απευθείας.</div>}
              <form onSubmit={submit}>
                <Field name="name" value={form.name} onChange={ch} label={f.name} />
                <div className="frow">
                  <Field name="email" type="email" value={form.email} onChange={ch} label={f.email} />
                  <Field name="phone" type="tel" value={form.phone} onChange={ch} label={f.phone} />
                </div>
                <Field name="message" value={form.message} onChange={ch} label={f.message} textarea />
                <Magnetic className="btn btn-gold full" style={status === "sending" ? {opacity:.6,pointerEvents:"none"} : {}}>
                  {status === "sending" ? "Αποστολή…" : f.submit} <span className="arr">→</span>
                </Magnetic>
              </form>
            </div>
            <a href={c.calendlyUrl} target="_blank" rel="noopener noreferrer" className="ci-calendly hoverable" style={{marginTop:'16px'}}>
              <span className="ci-calendly-icon">📅</span>
              <span className="ci-calendly-txt">
                <b>{c.calendlyLabel}</b>
                <span>{c.calendlyNote}</span>
              </span>
              <span className="ci-go">↗</span>
            </a>
          </Reveal>
        </div>
        <Reveal className="contact-map" delay={200}>
          <iframe
            src="https://maps.google.com/maps?q=Μαυρομιχάλη+68,+Πολίχνη+Θεσσαλονίκης+565+33&output=embed&hl=el"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            title="Γεωργία Νάκου — Τοποθεσία"
          ></iframe>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══ Footer ═══ */
function Footer({ t, lang }) {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Emblem className="footer-emblem" />
            <div><div className="footer-name">Γεωργία Νάκου</div><div className="footer-role">{t.hero.role}</div></div>
          </div>
          <p className="footer-tag">{t.footer.tagline}</p>
        </div>
        <div className="footer-bottom">
          <span>{t.footer.rights}</span>
        </div>
      </div>
      <hr className="ec-rule" />
      <div className="expertease-credit">
        <div className="ec-layer ec-layer--credit">
          <span className="ec-copy">© {new Date().getFullYear()} · All Rights Reserved</span>
          <span className="ec-divider"></span>
          <a href="https://expertease.eu/webdesign" target="_blank" rel="noopener noreferrer" className="ec-brand">
            <span className="ec-label">Designed by</span>
            <img src="logo_expertease.png" alt="Expertease Designs" className="ec-logo" />
            <span className="ec-name">Expertease Designs</span>
          </a>
        </div>
        <div className="ec-layer ec-layer--ad">
          <div className="ec-ad-ring">
            <div className="ec-ad-logo"><img src="logo_expertease.png" alt="Expertease Designs" /></div>
          </div>
          <div className="ec-ad-text">
            <span className="ec-ad-question">Like this site?</span>
            <a href="https://expertease.eu/webdesign" target="_blank" rel="noopener noreferrer" className="ec-ad-cta">
              Let's build yours
              <span className="ec-ad-arrow"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="2" y1="6.5" x2="11" y2="6.5"/><polyline points="7,2.5 11,6.5 7,10.5"/></svg></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══ App ═══ */
function App() {
  const [lang, setLang] = useState("el");
  const t = LUX[lang];
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return (
    <React.Fragment>
      <ScrollToTop />
      <ScrollProgress />
      <Nav lang={lang} setLang={setLang} t={t} />
      <Hero t={t} />
      <Marquee items={t.marquee} />
      <About t={t} />
      <Manifesto t={t} />
      <Services t={t} />
      <Journey t={t} />
      <Efka t={t} />
      <Reviews t={t} />
      <NewsAndLinks t={t} />
      <Contact t={t} />
      <Footer t={t} lang={lang} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
