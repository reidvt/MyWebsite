"use client";

import { useState } from "react";

const NAV_ITEMS = ["about", "projects", "experience", "education", "skills", "contact"] as const;
type NavItem = typeof NAV_ITEMS[number];

// ── Data ──────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: "senior-design",
    title: "Senior Design / Capstone",
    org: "Sponsored by Recursive AI",
    color: "green" as const,
    tags: ["ML", "Deep Learning", "Anomaly Detection", "GNN", "Python"],
    short: "LSTM + GINEConv (GNN) leak detection across 1.46M graph windows. F1=0.93, AUC=0.981. Multi-GPU, production-hardened.",
    metrics: ["F1 = 0.93", "ROC-AUC = 0.981", "1.46M graph windows", "96.9% Precision (XGBoost)", "99.7% Recall (XGBoost)"],
    tech: ["Python", "PyTorch Geometric", "GINEConv", "LSTM", "XGBoost", "DDP", "Parquet"],
    githubStatus: "pending" as const,
    featured: true,
  },
  {
    id: "emotions-classifier",
    title: "Emotions Classifier",
    org: "Independent Research",
    color: "blue" as const,
    tags: ["NLP", "XAI", "ML", "Python"],
    short: "Multi-task NLP pipeline across 210K+ annotated text segments — 27 emotions, sentiment, and trust. SHAP + LIME explainability.",
    metrics: ["62.7% trust accuracy", "61.2% sentiment accuracy", "210K+ annotated segments"],
    tech: ["Python", "Scikit-learn", "TF-IDF", "SHAP", "LIME", "Pandas"],
    githubStatus: "pending" as const,
    featured: true,
  },
  {
    id: "deepfake-detector",
    title: "Deepfake Detector",
    org: "CPSC 4366 — Course Project",
    color: "green" as const,
    tags: ["ML", "Computer Vision", "Deep Learning", "XAI"],
    short: "EfficientNetB0 + custom CNN trained on 140K real/fake faces (StyleGAN2). GradCAM explainability for decision-level visualization.",
    metrics: ["140K real/fake images", "EfficientNetB0 backbone", "GradCAM heatmaps"],
    tech: ["Python", "TensorFlow", "Keras", "EfficientNetB0", "GradCAM", "NumPy"],
    githubStatus: "public" as const,
    featured: true,
  },
  {
    id: "soc-scripts",
    title: "SOC Scripts (Project Stalker)",
    org: "Fairfield University SOC",
    color: "amber" as const,
    tags: ["Security", "SOC", "Splunk", "Anomaly Detection", "Python"],
    short: "IsolationForest ML system flagging anomalous logins across 20K+ network logs. Splunk dashboards, AD audit scripts (45K+ accounts), Bloodhound AD mapping.",
    metrics: ["45K+ AD accounts audited", "20K+ network event logs", "Enterprise config changes driven"],
    tech: ["Python", "Splunk SPL", "IsolationForest", "PowerShell", "Active Directory", "Bloodhound"],
    githubStatus: "private" as const,
    featured: false,
  },
  {
    id: "hyperspectral",
    title: "Hyperspectral Challenge",
    org: "Research / Competition",
    color: "green" as const,
    tags: ["ML", "Deep Learning", "Computer Vision"],
    short: "Deep learning solution for multi-band hyperspectral image classification on remote sensing data.",
    metrics: [],
    tech: ["Python", "TensorFlow", "Keras", "NumPy"],
    githubStatus: "pending" as const,
    featured: false,
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking Project",
    org: "Cybersecurity Course",
    color: "amber" as const,
    tags: ["Security", "Penetration Testing", "Kali Linux"],
    short: "Structured pen-test exercise covering recon, exploitation, and reporting on a controlled target. Kali, Nmap, Metasploit, Burp Suite.",
    metrics: [],
    tech: ["Kali Linux", "Nmap", "Metasploit", "Burp Suite"],
    githubStatus: "private" as const,
    featured: false,
  },
  {
    id: "bunkmates",
    title: "Bunkmates App",
    org: "Full-Stack Project",
    color: "blue" as const,
    tags: ["Web", "Full Stack", "Mobile"],
    short: "Roommate matching app pairing students by preferences, schedules, and habits.",
    metrics: [],
    tech: ["TypeScript", "React Native", "Node.js"],
    githubStatus: "pending" as const,
    featured: false,
  },
  {
    id: "bash-book",
    title: "Bash Book",
    org: "Reference Project",
    color: "amber" as const,
    tags: ["Systems", "Bash", "CLI"],
    short: "CLI reference and tool collection — shell scripting patterns, system admin commands, automation workflows.",
    metrics: [],
    tech: ["Bash", "Unix/Linux"],
    githubStatus: "pending" as const,
    featured: false,
  },
  {
    id: "crud-app",
    title: "CRUD App",
    org: "Web Dev Fundamentals",
    color: "blue" as const,
    tags: ["Web", "Full Stack", "Database"],
    short: "Full-stack CRUD application demonstrating REST API design, DB integration, and frontend/backend separation.",
    metrics: [],
    tech: ["JavaScript", "Node.js", "SQL", "HTML/CSS"],
    githubStatus: "pending" as const,
    featured: false,
  },
];

const SKILLS = {
  "Languages": ["Python", "Java", "JavaScript", "TypeScript", "Bash", "C", "C++", "HTML"],
  "ML & AI": ["TensorFlow", "PyTorch Geometric", "Scikit-learn", "XGBoost", "Pandas", "NumPy", "Keras"],
  "Security": ["Splunk", "Bloodhound", "Active Directory", "Kali Linux", "SPL", "IsolationForest"],
  "Techniques": ["NLP", "Anomaly Detection", "LSTMs", "GNNs", "GINEConv", "DDP", "XAI (SHAP/LIME)", "Time-Series", "Regression", "SVM", "Clustering"],
  "Platforms": ["Jupyter Notebooks", "Microsoft Active Directory", "Kali Linux", "Windows", "Unix/Linux"],
};

const COURSES = [
  "Cybersecurity", "Data Science", "Deep Learning", "Web Development",
  "Software Engineering", "Design & Analysis of Algorithms", "Ethical Hacking",
  "Computer Design & Architecture", "Digital Design", "Machine Learning",
  "Data Structures & Algorithms", "Computer Networks", "Database Systems",
  "Linear Algebra", "Probability & Statistics", "Operating Systems",
  "Theory of Computation",
];

const EXPERIENCE = [
  {
    role: "Machine Learning Engineer",
    org: "School of Engineering & Computing, sponsored by Recursive AI",
    period: "Sept 2025 – Present",
    location: "Fairfield, CT",
    color: "green" as const,
    bullets: [
      "Designed and trained a joint LSTM + GINEConv (GNN) model for leak detection across 109K+ held-out windows on four pipe network topologies — F1=0.93, ROC-AUC=0.981",
      "Scaled training pipeline from 50 to 2,000+ scenarios (1.46M graph windows) with parallelized CSV-to-Parquet preprocessing and stable multi-GPU training across dual 25GB VRAM GPUs",
      "Built production-hardened infrastructure: crash-safe checkpoints, SIGTERM handling, per-epoch heartbeat monitoring, and automated evaluation reports",
      "XGBoost classifier on live infrastructure sensor data: 96.9% Precision, 99.7% Recall",
    ],
  },
  {
    role: "SOC Technician",
    org: "Fairfield University Security Operations Center",
    period: "Sept 2025 – Present",
    location: "Fairfield, CT",
    color: "amber" as const,
    bullets: [
      "Monitored enterprise network traffic with Splunk alongside a team of six; contributed to developing the Project Manager role within the SOC team structure",
      "Built Python + SPL detection scans and Splunk dashboards to visualize blocked traffic and risk trends; audited 45,000+ Microsoft Active Directory accounts and disabled inactive users",
      "Reduced attack surface using Bloodhound to enumerate and map AD privilege escalation paths",
      "Engineered a Python + SPL IsolationForest anomaly detection system analyzing 20,000+ network event logs across 30-day spans — flagging logins to atypical machines — producing findings that drove direct enterprise configuration changes",
      "Led ML research on Splunk AI capabilities; presenting findings to CISO",
    ],
  },
  {
    role: "Independent Project: Emotion & Trust Classifier",
    org: "Self-directed NLP Research",
    period: "Oct 2025 – Dec 2025",
    location: "Remote",
    color: "blue" as const,
    bullets: [
      "Multi-task NLP pipeline: 27 emotional states, sentiment, and trust levels",
      "Dataset: 210,000+ human-annotated text segments",
      "TF-IDF + One-vs-Rest Logistic Regression with SHAP/LIME explainability",
      "Results: 62.7% trust detection accuracy, 61.2% sentiment accuracy",
    ],
  },
  {
    role: "Assistant Land Director",
    org: "YMCA Camp Tockwogh",
    period: "May 2025 – Sept 2025",
    location: "Worton, MD",
    color: "green" as const,
    bullets: [
      "Managed 50+ staff members and 400+ campers across all land-based programming",
      "Applied algorithmic and data-driven approaches to complex scheduling logistics",
    ],
  },
];

// ── Maps ──────────────────────────────────────────────────────────────────────

const BORDER_MAP = { green: "#2ec87a", blue: "#5ab4d6", amber: "#e8a83a" };
const COLOR_MAP = {
  green: { color: "#2ec87a" },
  blue: { color: "#5ab4d6" },
  amber: { color: "#e8a83a" },
};
const TAG_COLOR: Record<string, string> = {
  ML: "#2ec87a", "Deep Learning": "#2ec87a", "Anomaly Detection": "#2ec87a",
  "Computer Vision": "#2ec87a", GNN: "#2ec87a",
  NLP: "#5ab4d6", XAI: "#5ab4d6", Web: "#5ab4d6", "Full Stack": "#5ab4d6", Mobile: "#5ab4d6",
  Security: "#e8a83a", SOC: "#e8a83a", Splunk: "#e8a83a",
  "Penetration Testing": "#e8a83a", "Kali Linux": "#e8a83a",
  Python: "#7a9aaa", Bash: "#7a9aaa", Systems: "#7a9aaa", CLI: "#7a9aaa",
};

const GITHUB_BADGE: Record<string, { label: string; color: string }> = {
  public:  { label: "GitHub →", color: "#2ec87a" },
  private: { label: "Private repo", color: "#e8a83a" },
  pending: { label: "Repo pending", color: "#5a8090" },
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [active, setActive] = useState<NavItem>("about");
  const [projectFilter, setProjectFilter] = useState<string>("all");

  const scrollTo = (id: NavItem) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const filters = ["all", "ML", "Security", "NLP", "Web", "featured"];
  const visibleProjects = PROJECTS.filter((p) => {
    if (projectFilter === "all") return true;
    if (projectFilter === "featured") return p.featured;
    return p.tags.some((t) => t.toLowerCase() === projectFilter.toLowerCase());
  });

  return (
    <div style={{ background: "#0a0d0f", minHeight: "100vh", color: "#e8f4f0" }}>
      {/* ── Nav ─────────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "sticky", top: 0, zIndex: 50,
          background: "rgba(10,13,15,0.94)", backdropFilter: "blur(10px)",
          borderBottom: "1px solid #1a2a32", padding: "0 1.5rem",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#2ec87a", letterSpacing: "0.05em" }}>
            reid@portfolio:~$
          </span>
          <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: active === item ? "#2ec87a" : "#5a8090",
                  borderBottom: active === item ? "1px solid #2ec87a" : "1px solid transparent",
                  paddingBottom: 2, transition: "color 0.15s",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "0 1.5rem 6rem" }}>

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section id="about" style={{ padding: "5rem 0 4rem" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#5a8090", marginBottom: "1rem", letterSpacing: "0.1em" }}>
            AVAILABLE MAY 2026 · PHILADELPHIA, PA
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem, 6vw, 4rem)", lineHeight: 1.05, color: "#e8f4f0", marginBottom: "0.5rem" }}>
            Reid VanTrieste
          </h1>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 3vw, 1.3rem)", color: "#d0e8f0", marginBottom: "1.5rem" }}>
            ML Engineer · SOC Technician · CS @ Fairfield '26 · M.S. AI @ Penn '28
          </div>
          <p style={{ maxWidth: 600, color: "#7a9aaa", lineHeight: 1.75, marginBottom: "2rem", fontSize: 15 }}>
            Computer Science senior graduating May 2026, heading to Penn for an M.S. in AI.
            Hands-on experience building production ML models — LSTM + GNN leak detection,
            XGBoost anomaly detection, NLP pipelines — and working inside a live Security
            Operations Center. I target roles at the intersection of AI and security.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
            {["ML / Anomaly Detection", "SOC / SIEM", "NLP / XAI", "Python / Java", "Active Directory", "Splunk"].map((tag) => (
              <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5a8090", border: "1px solid #1a2a32", padding: "3px 10px", borderRadius: 3, background: "#0b1318" }}>
                {tag}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <a href="mailto:Reidvantrieste@gmail.com" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#0a0d0f", background: "#2ec87a", padding: "8px 18px", borderRadius: 3, textDecoration: "none", fontWeight: 700, letterSpacing: "0.05em" }}>
              EMAIL ME
            </a>
            <a href="https://www.linkedin.com/in/reidvantrieste/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#5ab4d6", border: "1px solid #5ab4d6", padding: "8px 18px", borderRadius: 3, textDecoration: "none", fontWeight: 700, letterSpacing: "0.05em" }}>
              LINKEDIN
            </a>
            <a href="#" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#e8a83a", border: "1px solid #e8a83a", padding: "8px 18px", borderRadius: 3, textDecoration: "none", fontWeight: 700, letterSpacing: "0.05em" }}>
              RESUME ↓
            </a>
          </div>
        </section>

        <Divider />

        {/* ── Projects ──────────────────────────────────────────────────────── */}
        <section id="projects" style={{ padding: "4rem 0" }}>
          <SectionLabel>Projects</SectionLabel>

          {/* Filter bar */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "2rem", marginBottom: "2rem" }}>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setProjectFilter(f)}
                style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  letterSpacing: "0.07em", textTransform: "uppercase",
                  background: projectFilter === f ? "#1a2a32" : "none",
                  color: projectFilter === f ? "#e8f4f0" : "#5a8090",
                  border: projectFilter === f ? "1px solid #2ec87a" : "1px solid #1a2a32",
                  padding: "4px 12px", borderRadius: 3, cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {f}
              </button>
            ))}
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5a8090", alignSelf: "center", marginLeft: "0.5rem" }}>
              {visibleProjects.length} project{visibleProjects.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Featured row */}
          {projectFilter === "all" || projectFilter === "featured" ? (
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#5a8090", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                ★ featured
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
                {PROJECTS.filter((p) => p.featured).map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          ) : null}

          {/* Rest of projects */}
          {projectFilter !== "featured" && (
            <>
              {(projectFilter === "all") && (
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#5a8090", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem", marginTop: "1.5rem" }}>
                  all projects
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
                {(projectFilter === "all" ? PROJECTS.filter((p) => !p.featured) : visibleProjects).map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </>
          )}
        </section>

        <Divider />

        {/* ── Experience ────────────────────────────────────────────────────── */}
        <section id="experience" style={{ padding: "4rem 0" }}>
          <SectionLabel>Experience</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "2rem" }}>
            {EXPERIENCE.map((exp) => (
              <div
                key={exp.role}
                style={{ background: "#0b1318", borderLeft: `3px solid ${BORDER_MAP[exp.color]}`, padding: "1.25rem 1.5rem", borderRadius: "0 4px 4px 0" }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.4rem" }}>
                  <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, color: "#e8f4f0" }}>
                    {exp.role}
                  </span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5a8090", paddingTop: 2 }}>
                    {exp.period}
                  </span>
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, marginBottom: "0.9rem", ...COLOR_MAP[exp.color] }}>
                  {exp.org} · {exp.location}
                </div>
                <ul style={{ paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {exp.bullets.map((b) => (
                    <li key={b} style={{ color: "#7a9aaa", fontSize: 14, lineHeight: 1.65 }}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Education ─────────────────────────────────────────────────────── */}
        <section id="education" style={{ padding: "4rem 0" }}>
          <SectionLabel>Education</SectionLabel>

          <div style={{ background: "#0b1318", borderLeft: "3px solid #5ab4d6", padding: "1.5rem", borderRadius: "0 4px 4px 0", marginTop: "2rem", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.3rem" }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#e8f4f0" }}>University of Pennsylvania</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5a8090" }}>Expected May 2028</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#5ab4d6", marginBottom: "0.5rem" }}>M.S. Engineering: Artificial Intelligence</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#7a9aaa", fontStyle: "italic" }}>Focus: Ethically-based AI/ML Engineering in cybersecurity and real-world infrastructure</div>
          </div>

          <div style={{ background: "#0b1318", borderLeft: "3px solid #5ab4d6", padding: "1.5rem", borderRadius: "0 4px 4px 0", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.3rem" }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#e8f4f0" }}>Fairfield University</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5a8090" }}>May 2026</span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#5ab4d6", marginBottom: "0.75rem" }}>B.S. Computer Science · Minor: Mathematics · GPA: 3.4</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5a8090", marginBottom: "0.6rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>Coursework</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {COURSES.map((c) => (
                <span key={c} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#7a9aaa", background: "#0a0d0f", border: "1px solid #1a2a32", padding: "3px 10px", borderRadius: 3 }}>{c}</span>
              ))}
            </div>
          </div>

          <div style={{ background: "#0b1318", border: "1px solid #1a2a32", borderRadius: 4, padding: "1.25rem 1.5rem" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#2ec87a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Activities</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ fontSize: 14, color: "#7a9aaa" }}><span style={{ color: "#e8f4f0" }}>Co-founder</span> · Fairfield Kickboxing Club (2024–2026)</div>
              <div style={{ fontSize: 14, color: "#7a9aaa" }}><span style={{ color: "#e8f4f0" }}>Member</span> · Fairfield AI Club (2023–2026)</div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── Skills ────────────────────────────────────────────────────────── */}
        <section id="skills" style={{ padding: "4rem 0" }}>
          <SectionLabel>Skills & Tools</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1.25rem", marginTop: "2rem" }}>
            {Object.entries(SKILLS).map(([category, items]) => (
              <div key={category} style={{ background: "#0b1318", border: "1px solid #1a2a32", borderRadius: 4, padding: "1rem 1.25rem" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#2ec87a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                  {category}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {items.map((skill) => (
                    <span key={skill} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#7a9aaa", background: "#0a0d0f", border: "1px solid #1a2a32", padding: "2px 8px", borderRadius: 3 }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* ── Contact ───────────────────────────────────────────────────────── */}
        <section id="contact" style={{ padding: "4rem 0" }}>
          <SectionLabel>Contact</SectionLabel>
          <p style={{ color: "#7a9aaa", fontSize: 15, marginTop: "1.5rem", marginBottom: "2rem", maxWidth: 500 }}>
            Open to full-time roles starting May 2026 — ML Engineering, SOC/Security, and hybrid AI-Security positions.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { label: "EMAIL",    value: "Reidvantrieste@gmail.com",          href: "mailto:Reidvantrieste@gmail.com",           color: "#2ec87a" },
              { label: "PHONE",    value: "610-314-1880",                       href: "tel:6103141880",                            color: "#5ab4d6" },
              { label: "LINKEDIN", value: "linkedin.com/in/reidvantrieste",     href: "https://www.linkedin.com/in/reidvantrieste/", color: "#5ab4d6" },
              { label: "LOCATION", value: "Philadelphia, PA area",              href: null,                                         color: "#e8a83a" },
            ].map(({ label, value, href, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5a8090", width: 80, letterSpacing: "0.08em" }}>{label}</span>
                {href ? (
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color, textDecoration: "none" }}>
                    {value}
                  </a>
                ) : (
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color }}>{value}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <footer style={{ borderTop: "1px solid #1a2a32", paddingTop: "2rem", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5a8090", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
          <span>Reid VanTrieste · Fairfield CS '26 · Penn M.S. AI '28</span>
          <span>Built with Next.js + Tailwind</span>
        </footer>
      </main>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const badge = GITHUB_BADGE[project.githubStatus];
  return (
    <div
      style={{
        background: "#0b1318",
        borderLeft: `3px solid ${BORDER_MAP[project.color]}`,
        border: "1px solid #1a2a32",
        borderLeftWidth: 3,
        borderRadius: "0 4px 4px 0",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        transition: "border-color 0.15s",
      }}
    >
      {/* Header */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem", marginBottom: "0.25rem" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: "#e8f4f0", lineHeight: 1.3 }}>
            {project.title}
          </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: badge.color, whiteSpace: "nowrap", paddingTop: 2 }}>
            {badge.label}
          </span>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, ...COLOR_MAP[project.color] }}>
          {project.org}
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: 13, color: "#7a9aaa", lineHeight: 1.65, margin: 0 }}>
        {project.short}
      </p>

      {/* Metrics */}
      {project.metrics.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
          {project.metrics.map((m) => (
            <span key={m} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: BORDER_MAP[project.color], background: "#0a0d0f", border: `1px solid ${BORDER_MAP[project.color]}33`, padding: "2px 8px", borderRadius: 3 }}>
              {m}
            </span>
          ))}
        </div>
      )}

      {/* Tech */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {project.tech.map((t) => (
          <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: "#5a8090", background: "#0a0d0f", border: "1px solid #1a2a32", padding: "2px 8px", borderRadius: 3 }}>
            {t}
          </span>
        ))}
      </div>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
        {project.tags.map((tag) => (
          <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: TAG_COLOR[tag] ?? "#7a9aaa", letterSpacing: "0.05em" }}>
            #{tag.toLowerCase().replace(/\s+/g, "-")}
          </span>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#2ec87a", letterSpacing: "0.12em", textTransform: "uppercase" }}>
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: "#1a2a32" }} />
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "#1a2a32" }} />;
}
