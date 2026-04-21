"use client";

import { useState } from "react";

const NAV_ITEMS = ["about", "experience", "skills", "education", "contact"] as const;
type NavItem = typeof NAV_ITEMS[number];

const SKILLS = {
  "Languages": ["Python", "Java", "JavaScript", "TypeScript", "Bash", "C", "C++", "HTML"],
  "ML & AI": ["TensorFlow", "PyTorch Geometric", "Scikit-learn", "XGBoost", "Pandas", "NumPy", "Keras"],
  "Security": ["Splunk", "Bloodhound", "Active Directory", "Kali Linux", "SPL", "IsolationForest"],
  "Techniques": ["NLP", "Anomaly Detection", "LSTMs", "GNNs", "GINEConv", "DDP", "XAI (SHAP/LIME)", "Time-Series", "Regression", "SVM", "Clustering"],
  "Platforms": ["Jupyter Notebooks", "Microsoft Active Directory", "Kali Linux", "Windows", "Unix/Linux"],
};

const COURSES = [
  "Cybersecurity",
  "Data Science",
  "Deep Learning",
  "Web Development",
  "Software Engineering",
  "Design & Analysis of Algorithms",
  "Ethical Hacking",
  "Computer Design & Architecture",
  "Digital Design",
  "Machine Learning",
  "Data Structures & Algorithms",
  "Computer Networks",
  "Database Systems",
  "Linear Algebra",
  "Probability & Statistics",
  "Operating Systems",
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

const BORDER_MAP = {
  green: "#2ec87a",
  blue: "#5ab4d6",
  amber: "#e8a83a",
};

const COLOR_MAP = {
  green: { color: "#2ec87a" },
  blue: { color: "#5ab4d6" },
  amber: { color: "#e8a83a" },
};

export default function Home() {
  const [active, setActive] = useState<NavItem>("about");

  const scrollTo = (id: NavItem) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#0a0d0f", minHeight: "100vh", color: "#e8f4f0" }}>
      {/* Nav */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "rgba(10,13,15,0.92)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #1a2a32",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 56,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              color: "#2ec87a",
              letterSpacing: "0.05em",
            }}
          >
            reid@portfolio:~$
          </span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: active === item ? "#2ec87a" : "#5a8090",
                  borderBottom: active === item ? "1px solid #2ec87a" : "1px solid transparent",
                  paddingBottom: 2,
                  transition: "color 0.15s",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.5rem 6rem" }}>
        {/* Hero */}
        <section id="about" style={{ padding: "5rem 0 4rem" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "#5a8090",
              marginBottom: "1rem",
              letterSpacing: "0.1em",
            }}
          >
            AVAILABLE MAY 2026 · PHILADELPHIA, PA
          </div>

          <h1
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              lineHeight: 1.05,
              color: "#e8f4f0",
              marginBottom: "0.5rem",
            }}
          >
            Reid VanTrieste
          </h1>

          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1rem, 3vw, 1.4rem)",
              color: "#d0e8f0",
              marginBottom: "1.5rem",
            }}
          >
            ML Engineer · SOC Technician · CS @ Fairfield '26 · M.S. AI @ Penn '28
          </div>

          <p
            style={{
              maxWidth: 600,
              color: "#7a9aaa",
              lineHeight: 1.75,
              marginBottom: "2rem",
              fontSize: 15,
            }}
          >
            Computer Science senior graduating May 2026, heading to Penn for an M.S. in AI.
            Hands-on experience building production ML models — LSTM + GNN leak detection,
            XGBoost anomaly detection, NLP pipelines — and working inside a live Security
            Operations Center. I target roles at the intersection of AI and security.
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "2.5rem" }}>
            {["ML / Anomaly Detection", "SOC / SIEM", "NLP / XAI", "Python / Java", "Active Directory", "Splunk"].map(
              (tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#5a8090",
                    border: "1px solid #1a2a32",
                    padding: "3px 10px",
                    borderRadius: 3,
                    background: "#0b1318",
                  }}
                >
                  {tag}
                </span>
              )
            )}
          </div>

          {/* CTA Links */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
            <a
              href="mailto:Reidvantrieste@gmail.com"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#0a0d0f",
                background: "#2ec87a",
                padding: "8px 18px",
                borderRadius: 3,
                textDecoration: "none",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              EMAIL ME
            </a>
            <a
              href="https://www.linkedin.com/in/reidvantrieste/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#5ab4d6",
                border: "1px solid #5ab4d6",
                padding: "8px 18px",
                borderRadius: 3,
                textDecoration: "none",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              LINKEDIN
            </a>
            <a
              href="#"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: "#e8a83a",
                border: "1px solid #e8a83a",
                padding: "8px 18px",
                borderRadius: 3,
                textDecoration: "none",
                fontWeight: 700,
                letterSpacing: "0.05em",
              }}
            >
              RESUME ↓
            </a>
          </div>
        </section>

        <Divider />

        {/* Experience */}
        <section id="experience" style={{ padding: "4rem 0" }}>
          <SectionLabel>Experience</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "2rem" }}>
            {EXPERIENCE.map((exp) => (
              <div
                key={exp.role}
                style={{
                  background: "#0b1318",
                  borderLeft: `3px solid ${BORDER_MAP[exp.color]}`,
                  padding: "1.25rem 1.5rem",
                  borderRadius: "0 4px 4px 0",
                }}
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
                    <li key={b} style={{ color: "#7a9aaa", fontSize: 14, lineHeight: 1.65 }}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Skills */}
        <section id="skills" style={{ padding: "4rem 0" }}>
          <SectionLabel>Skills & Tools</SectionLabel>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "1.25rem",
              marginTop: "2rem",
            }}
          >
            {Object.entries(SKILLS).map(([category, items]) => (
              <div
                key={category}
                style={{
                  background: "#0b1318",
                  border: "1px solid #1a2a32",
                  borderRadius: 4,
                  padding: "1rem 1.25rem",
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#2ec87a",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                >
                  {category}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {items.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 11,
                        color: "#7a9aaa",
                        background: "#0a0d0f",
                        border: "1px solid #1a2a32",
                        padding: "2px 8px",
                        borderRadius: 3,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Education */}
<section id="education" style={{ padding: "4rem 0" }}>
  <SectionLabel>Education</SectionLabel>

  {/* UPenn Entry */}
  <div
    style={{
      background: "#0b1318",
      borderLeft: "3px solid #5ab4d6",
      padding: "1.5rem",
      borderRadius: "0 4px 4px 0",
      marginTop: "2rem",
      marginBottom: "2rem",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.3rem" }}>
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#e8f4f0" }}>
        University of Pennsylvania
      </span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5a8090" }}>
        Expected May 2028
      </span>
    </div>
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#5ab4d6", marginBottom: "0.75rem" }}>
      M.S. Engineering: Artificial Intelligence
    </div>
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#7a9aaa", fontStyle: "italic" }}>
      Focus: Ethically-based AI/ML Engineering in cybersecurity and real-world infrastructure
    </div>
  </div>

  {/* Fairfield Entry */}
  <div
    style={{
      background: "#0b1318",
      borderLeft: "3px solid #5ab4d6",
      padding: "1.5rem",
      borderRadius: "0 4px 4px 0",
      marginTop: "2rem",
      marginBottom: "2rem",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.3rem" }}>
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#e8f4f0" }}>
        Fairfield University
      </span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5a8090" }}>
        May 2026
      </span>
    </div>
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#5ab4d6", marginBottom: "0.75rem" }}>
      B.S. Computer Science · Minor: Mathematics · GPA: 3.4
    </div>
    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#5a8090", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
      Coursework
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
      {COURSES.map((course) => (
        <span
          key={course}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#7a9aaa",
            background: "#0a0d0f",
            border: "1px solid #1a2a32",
            padding: "3px 10px",
            borderRadius: 3,
          }}
        >
          {course}
        </span>
      ))}
    </div>
  </div>

          {/* Extracurriculars */}
          <div
            style={{
              background: "#0b1318",
              border: "1px solid #1a2a32",
              borderRadius: 4,
              padding: "1.25rem 1.5rem",
            }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "#2ec87a", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Activities
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div style={{ fontSize: 14, color: "#7a9aaa" }}>
                <span style={{ color: "#e8f4f0" }}>Co-founder</span> · Fairfield Kickboxing Club (2024–2026)
              </div>
              <div style={{ fontSize: 14, color: "#7a9aaa" }}>
                <span style={{ color: "#e8f4f0" }}>Member</span> · Fairfield AI Club (2023–2026)
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Contact */}
        <section id="contact" style={{ padding: "4rem 0" }}>
          <SectionLabel>Contact</SectionLabel>
          <p style={{ color: "#7a9aaa", fontSize: 15, marginTop: "1.5rem", marginBottom: "2rem", maxWidth: 500 }}>
            Open to full-time roles starting May 2026 — ML Engineering, SOC/Security, and hybrid AI-Security positions.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { label: "EMAIL", value: "Reidvantrieste@gmail.com", href: "mailto:Reidvantrieste@gmail.com", color: "#2ec87a" },
              { label: "PHONE", value: "610-314-1880", href: "tel:6103141880", color: "#5ab4d6" },
              { label: "LINKEDIN", value: "linkedin.com/in/reidvantrieste", href: "https://www.linkedin.com/in/reidvantrieste/", color: "#5ab4d6" },
              { label: "LOCATION", value: "Philadelphia, PA area", href: null, color: "#e8a83a" },
            ].map(({ label, value, href, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "#5a8090",
                    width: 80,
                    letterSpacing: "0.08em",
                  }}
                >
                  {label}
                </span>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color, textDecoration: "none" }}
                  >
                    {value}
                  </a>
                ) : (
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color }}>{value}</span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid #1a2a32",
            paddingTop: "2rem",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: "#5a8090",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          <span>Reid VanTrieste · Fairfield CS '26 · Penn M.S. AI '28</span>
          <span>Built with Next.js + Tailwind</span>
        </footer>
      </main>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "#2ec87a",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
        }}
      >
        {children}
      </span>
      <div style={{ flex: 1, height: 1, background: "#1a2a32" }} />
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "#1a2a32" }} />;
}
