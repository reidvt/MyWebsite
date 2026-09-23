'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { SKILLS_DATA } from '@/data/skills';

const BootOverlay = dynamic(() => import('@/components/BootOverlay'), { ssr: false });
const OrbitalWheel = dynamic(() => import('@/components/OrbitalWheel'), { ssr: false });
const CmdTerminal = dynamic(() => import('@/components/CmdTerminal'), { ssr: false });

interface Toast {
  id: number;
  label: string;
  msg: string;
  xp?: number;
}

let toastId = 0;

/* ── Matrix Rain ─────────────────────────────────── */
function matrixRain() {
  const cv = document.createElement('canvas');
  cv.style.cssText = 'position:fixed;inset:0;z-index:8000;pointer-events:none;opacity:0;transition:opacity .3s';
  document.body.appendChild(cv);
  const cx = cv.getContext('2d')!;
  cv.width = window.innerWidth; cv.height = window.innerHeight;
  const cols = Math.floor(cv.width / 14);
  const drops = Array(cols).fill(1);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*><\\/[]{}|'.split('');
  requestAnimationFrame(() => { cv.style.opacity = '1'; });
  let f = 0;
  const id = setInterval(() => {
    cx.fillStyle = 'rgba(9,12,14,.05)'; cx.fillRect(0, 0, cv.width, cv.height);
    cx.fillStyle = '#2fd47c'; cx.font = '13px Space Mono,monospace';
    drops.forEach((y, x) => {
      cx.fillText(chars[Math.floor(Math.random() * chars.length)], x * 14, y * 14);
      if (y * 14 > cv.height && Math.random() > .975) drops[x] = 0;
      drops[x]++;
    });
    if (++f > 90) { clearInterval(id); cv.style.opacity = '0'; setTimeout(() => cv.remove(), 400); }
  }, 50);
}

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [xp, setXp] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [booted, setBooted] = useState(false);
  const unlockedRef = useRef(new Set<string>());
  const xpRef = useRef(0);
  const barsAnimatedRef = useRef(false);
  const activeNavRef = useRef('about');
  const [, forceUpdate] = useState(0);

  /* Theme */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  /* XP */
  function addXp(n: number) {
    xpRef.current += n;
    setXp(xpRef.current);
    const el = document.getElementById('xp-val');
    if (el) { el.style.color = 'var(--green)'; setTimeout(() => { if (el) el.style.color = ''; }, 700); }
  }

  /* Toasts + Achievements */
  function showToast(label: string, msg: string, xpAmt?: number) {
    const id = ++toastId;
    setToasts(t => [...t, { id, label, msg, xp: xpAmt }]);
    if (xpAmt) addXp(xpAmt);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4200);
  }

  const achievement = useCallback((id: string, label: string, msg: string, xpAmt: number) => {
    if (unlockedRef.current.has(id)) return;
    unlockedRef.current.add(id);
    showToast(label, msg, xpAmt);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Boot done */
  function onBooted() {
    setBooted(true);
    achievement('boot', 'SYSTEM_BOOT', 'Portfolio initialized', 50);
    animateXpBars();
  }

  /* Theme toggle (also used by terminal) */
  function toggleTheme() {
    setIsDark(d => {
      const next = !d;
      achievement('theme', 'DISPLAY_MODE', (next ? 'Dark' : 'Light') + ' mode activated', 15);
      return next;
    });
  }

  /* Skills XP bars */
  function animateXpBars() {
    if (barsAnimatedRef.current) return;
    barsAnimatedRef.current = true;
    document.querySelectorAll<HTMLDivElement>('.xp-bar').forEach((b, i) => {
      setTimeout(() => {
        const v = b.dataset.v;
        b.style.width = v + '%';
        const p = b.closest('.xp-row')?.querySelector<HTMLElement>('.xp-pct');
        if (p) p.textContent = v + '%';
      }, i * 55);
    });
  }

  /* Nav scroll tracking */
  useEffect(() => {
    if (!booted) return;
    const SECS = ['about', 'projects', 'experience', 'education', 'skills', 'contact'];
    const secA: Record<string, { id: string; label: string; msg: string; xp: number }> = {
      projects: { id: 'sp', label: 'MISSION_CONTROL', msg: 'Project orbits unlocked', xp: 100 },
      experience: { id: 'se', label: 'EXPERIENCE_LOADED', msg: 'Work history decrypted', xp: 80 },
      education: { id: 'sd', label: 'CREDENTIALS_VERIFIED', msg: 'Academic record accessed', xp: 80 },
      skills: { id: 'sk', label: 'SKILL_MATRIX', msg: 'Proficiency chart active', xp: 100 },
      contact: { id: 'sc', label: 'CONTACT_UNLOCKED', msg: 'Secure channel established', xp: 150 },
    };
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          activeNavRef.current = id;
          forceUpdate(n => n + 1);
          if (secA[id]) achievement(secA[id].id, secA[id].label, secA[id].msg, secA[id].xp);
          if (id === 'skills') animateXpBars();
        }
      });
    }, { rootMargin: '-38% 0px -57% 0px' });
    SECS.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [booted, achievement]);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      {/* BOOT */}
      <BootOverlay onDone={onBooted} />

      {/* TOASTS */}
      <div id="toast-container">
        {toasts.map(t => (
          <div key={t.id} className="toast">
            <div className="tl">★ {t.label}</div>
            <div className="tm">{t.msg}</div>
            {t.xp && <div className="tx">+{t.xp} XP</div>}
          </div>
        ))}
      </div>

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <span className="nav-brand">reid@portfolio:~$<span className="nav-cursor"></span></span>
          <div className="nav-links">
            {['about', 'projects', 'experience', 'education', 'skills', 'contact'].map(s => (
              <button
                key={s}
                className={`nav-btn${activeNavRef.current === s ? ' active' : ''}`}
                data-target={s}
                onClick={() => scrollTo(s)}
              >{s}</button>
            ))}
          </div>
          <div className="nav-right">
            <span className="nav-xp">XP&nbsp;<span id="xp-val">{xp}</span></span>
            <button className="theme-btn" id="theme-btn" title="Toggle light/dark" onClick={toggleTheme}></button>
          </div>
        </div>
      </nav>

      <div className="page-wrap">
        {/* ── HERO ── */}
        <section id="about">
          <div className="hero-avail"><span className="avail-dot"></span>AVAILABLE MAY 2026 · PHILADELPHIA, PA</div>
          <h1 className="heading-xl" data-text="Reid VanTrieste">Reid VanTrieste</h1>
          <p className="hero-role">ML Engineer · SOC Technician · CS @ Fairfield &apos;26 · M.S. AI @ Penn &apos;28</p>
          <p className="hero-bio">Computer Science senior graduating May 2026, heading to Penn for an M.S. in AI. Hands-on experience building production ML models — LSTM + GNN leak detection, XGBoost anomaly detection, NLP pipelines — and working inside a live Security Operations Center.</p>
          <div className="tags">
            <span className="tag">ML / Anomaly Detection</span>
            <span className="tag">SOC / SIEM</span>
            <span className="tag">NLP / XAI</span>
            <span className="tag">Python / Java</span>
            <span className="tag">Active Directory</span>
            <span className="tag">Splunk</span>
          </div>
          <div className="cta-row">
            <a href="mailto:Reidvantrieste@gmail.com" className="btn btn-green">EMAIL ME</a>
            <a href="https://linkedin.com/in/reidvantrieste" className="btn btn-blue" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
            <a href="https://github.com/reidvantrieste" className="btn btn-amber" target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
          </div>
        </section>

        <div className="divider"></div>

        {/* ── PROJECTS ── */}
        <section id="projects">
          <div className="section-label"><span>// Mission Control</span></div>
          <OrbitalWheel onAchievement={achievement} />
        </section>

        <div className="divider"></div>

        {/* ── EXPERIENCE ── */}
        <section id="experience">
          <div className="section-label"><span>// Experience</span></div>
          <div className="exp-list">
            <div className="exp-card green">
              <div className="exp-header">
                <span className="exp-role">Machine Learning Engineer</span>
                <span className="exp-period">Sept 2025 – Present</span>
              </div>
              <div className="exp-org green">School of Engineering &amp; Computing, sponsored by Recursive AI · Fairfield, CT</div>
              <ul className="exp-bullets">
                <li>Designed and trained a joint LSTM + GINEConv (GNN) model for leak detection across 109K+ held-out windows — F1=0.93, ROC-AUC=0.981</li>
                <li>Scaled training pipeline to 2,000+ scenarios (1.46M graph windows) with parallelized preprocessing and stable multi-GPU training</li>
                <li>Built production-hardened infrastructure: crash-safe checkpoints, SIGTERM handling, per-epoch heartbeat monitoring</li>
                <li>XGBoost classifier on live sensor data: 96.9% Precision, 99.7% Recall</li>
              </ul>
            </div>
            <div className="exp-card amber">
              <div className="exp-header">
                <span className="exp-role">SOC Technician</span>
                <span className="exp-period">Sept 2025 – Present</span>
              </div>
              <div className="exp-org amber">Fairfield University Security Operations Center · Fairfield, CT</div>
              <ul className="exp-bullets">
                <li>Monitored enterprise network traffic with Splunk; developed Project Manager role within SOC</li>
                <li>Built Python + SPL detection scans and dashboards; audited 45,000+ Active Directory accounts</li>
                <li>Reduced attack surface using Bloodhound to enumerate AD privilege escalation paths</li>
                <li>IsolationForest anomaly detection over 20K+ network logs — drove direct enterprise configuration changes</li>
                <li>Leading ML research on Splunk AI capabilities; presenting findings to CISO</li>
              </ul>
            </div>
            <div className="exp-card blue">
              <div className="exp-header">
                <span className="exp-role">Independent: Emotion &amp; Trust Classifier</span>
                <span className="exp-period">Oct – Dec 2025</span>
              </div>
              <div className="exp-org blue">Self-directed NLP Research · Remote</div>
              <ul className="exp-bullets">
                <li>Multi-task NLP pipeline: 27 emotional states, sentiment, trust across 210,000+ annotated text segments</li>
                <li>TF-IDF + One-vs-Rest Logistic Regression with SHAP/LIME explainability layers</li>
                <li>62.7% trust detection accuracy, 61.2% sentiment accuracy</li>
              </ul>
            </div>
            <div className="exp-card green">
              <div className="exp-header">
                <span className="exp-role">Assistant Land Director</span>
                <span className="exp-period">May – Sept 2025</span>
              </div>
              <div className="exp-org green">YMCA Camp Tockwogh · Worton, MD</div>
              <ul className="exp-bullets">
                <li>Managed 50+ staff and 400+ campers across all land-based programming</li>
                <li>Applied algorithmic and data-driven approaches to complex scheduling logistics</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        {/* ── EDUCATION ── */}
        <section id="education">
          <div className="section-label"><span>// Education</span></div>
          <div className="edu-timeline">
            <div className="edu-milestone">
              <div className="edu-card-inner">
                <div className="edu-hd">
                  <span className="edu-school">University of Pennsylvania</span>
                  <span className="edu-date">Expected May 2028</span>
                </div>
                <div className="edu-deg">M.S. Engineering: Artificial Intelligence</div>
                <div className="edu-note">Focus: Ethically-based AI/ML Engineering in cybersecurity and real-world infrastructure · Online program</div>
              </div>
            </div>
            <div className="edu-milestone">
              <div className="edu-card-inner">
                <div className="edu-hd">
                  <span className="edu-school">Fairfield University</span>
                  <span className="edu-date">May 2026</span>
                </div>
                <div className="edu-deg">B.S. Computer Science · Minor: Mathematics · GPA: 3.4</div>
                <div className="course-map">
                  <div className="course-map-title">Course Map</div>
                  <div className="course-groups">
                    <div className="course-group">
                      <div className="cg-title">CS Core</div>
                      <div className="cg-tags">
                        {['Data Structures','Algorithms','OS','Networks','Theory','Architecture','Databases','Software Eng'].map(c => (
                          <span key={c} className="cg-tag cs">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div className="course-group">
                      <div className="cg-title">AI &amp; Data</div>
                      <div className="cg-tags">
                        {['Machine Learning','Deep Learning','Data Science','Web Dev'].map(c => (
                          <span key={c} className="cg-tag ml">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div className="course-group">
                      <div className="cg-title">Security</div>
                      <div className="cg-tags">
                        {['Cybersecurity','Ethical Hacking'].map(c => (
                          <span key={c} className="cg-tag sec">{c}</span>
                        ))}
                      </div>
                    </div>
                    <div className="course-group">
                      <div className="cg-title">Math</div>
                      <div className="cg-tags">
                        {['Linear Algebra','Prob & Stats'].map(c => (
                          <span key={c} className="cg-tag math">{c}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <div className="cg-title" style={{ marginBottom: '.5rem' }}>Activities</div>
                  <div className="edu-activities">
                    <span className="act-badge">Co-founder · Kickboxing Club</span>
                    <span className="act-badge">Member · AI Club</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider"></div>

        {/* ── SKILLS ── */}
        <section id="skills">
          <div className="section-label"><span>// Skill Matrix</span></div>
          <div className="skills-grid" id="skills-grid">
            {SKILLS_DATA.map(s => (
              <div key={s.cat} className="skill-card">
                <div className="skill-card-title">{s.cat}</div>
                {s.items.map(i => (
                  <div key={i.n} className="xp-row">
                    <span className="xp-label">{i.n}</span>
                    <div className="xp-bar-wrap">
                      <div className={`xp-bar ${s.color}`} data-v={i.v}></div>
                    </div>
                    <span className="xp-pct" data-v={i.v}>0%</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <div className="divider"></div>

        {/* ── CONTACT ── */}
        <section id="contact">
          <div className="section-label"><span>// Contact</span></div>
          <p className="contact-intro">Open to full-time roles starting May 2026 — ML Engineering, SOC/Security, and hybrid AI-Security positions.</p>
          <div className="contact-list">
            <div className="contact-row">
              <span className="contact-label">EMAIL</span>
              <a href="mailto:Reidvantrieste@gmail.com" className="contact-value green">Reidvantrieste@gmail.com</a>
            </div>
            <div className="contact-row">
              <span className="contact-label">PHONE</span>
              <span className="contact-value blue">610-314-1880</span>
            </div>
            <div className="contact-row">
              <span className="contact-label">LINKEDIN</span>
              <a href="https://linkedin.com/in/reidvantrieste" className="contact-value blue" target="_blank" rel="noopener noreferrer">linkedin.com/in/reidvantrieste ↗</a>
            </div>
            <div className="contact-row">
              <span className="contact-label">GITHUB</span>
              <a href="https://github.com/reidvantrieste" className="contact-value green" target="_blank" rel="noopener noreferrer">github.com/reidvantrieste ↗</a>
            </div>
            <div className="contact-row">
              <span className="contact-label">LOCATION</span>
              <span className="contact-value amber">Philadelphia, PA area</span>
            </div>
          </div>
        </section>

        <footer>
          <span>Reid VanTrieste · Fairfield CS &apos;26 · Penn M.S. AI &apos;28</span>
          <span>Built with Next.js + Tailwind · Vercel</span>
        </footer>
      </div>

      {/* CMD TERMINAL */}
      <CmdTerminal
        onAchievement={achievement}
        onAddXp={addXp}
        onThemeToggle={toggleTheme}
        onMatrix={matrixRain}
      />
    </>
  );
}
