export type SkillDomain = "ml" | "security" | "web" | "systems" | "foundations";

export interface Skill {
  name: string;
  level: number; // 0-100
  domain: SkillDomain;
}

export interface SkillGroup {
  domain: SkillDomain;
  label: string;
  accent: "green" | "blue" | "amber";
  description: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    domain: "ml",
    label: "Machine Learning & Data",
    accent: "green",
    description:
      "Classical ML, deep learning, and data workflows applied to research and capstone projects.",
    skills: [
      { name: "Python", level: 92, domain: "ml" },
      { name: "Scikit-learn", level: 88, domain: "ml" },
      { name: "XGBoost", level: 82, domain: "ml" },
      { name: "TensorFlow / Keras", level: 78, domain: "ml" },
      { name: "PyTorch Geometric", level: 76, domain: "ml" },
      { name: "Pandas / NumPy", level: 90, domain: "ml" },
      { name: "SHAP / LIME (XAI)", level: 74, domain: "ml" },
      { name: "GINEConv / GNNs", level: 72, domain: "ml" },
      { name: "DDP / Multi-GPU", level: 68, domain: "ml" },
    ],
  },
  {
    domain: "security",
    label: "Security & SOC",
    accent: "amber",
    description:
      "Offensive and defensive security work — SOC operations, AD audits, pen-testing curriculum.",
    skills: [
      { name: "Splunk SPL", level: 80, domain: "security" },
      { name: "Active Directory", level: 78, domain: "security" },
      { name: "Kali Linux", level: 72, domain: "security" },
      { name: "Nmap / Metasploit", level: 70, domain: "security" },
      { name: "Burp Suite", level: 65, domain: "security" },
      { name: "Bloodhound", level: 68, domain: "security" },
    ],
  },
  {
    domain: "web",
    label: "Web Development",
    accent: "blue",
    description:
      "Modern full-stack web stack with a focus on React, Next.js, and typed frontends.",
    skills: [
      { name: "TypeScript", level: 80, domain: "web" },
      { name: "React / Next.js", level: 82, domain: "web" },
      { name: "Tailwind CSS", level: 85, domain: "web" },
      { name: "Node.js", level: 72, domain: "web" },
      { name: "REST APIs", level: 78, domain: "web" },
      { name: "HTML / CSS", level: 88, domain: "web" },
    ],
  },
  {
    domain: "systems",
    label: "Systems & Tooling",
    accent: "amber",
    description:
      "Unix-flavored systems work — shell, git, and the plumbing around research code.",
    skills: [
      { name: "Bash / Shell", level: 82, domain: "systems" },
      { name: "Git / GitHub", level: 88, domain: "systems" },
      { name: "Unix / Linux", level: 80, domain: "systems" },
      { name: "PowerShell", level: 68, domain: "systems" },
      { name: "Wireshark", level: 70, domain: "systems" },
      { name: "Jupyter", level: 86, domain: "systems" },
    ],
  },
  {
    domain: "foundations",
    label: "CS Foundations",
    accent: "blue",
    description:
      "Core CS theory from the Fairfield curriculum — what holds up everything above.",
    skills: [
      { name: "Data Structures & Algorithms", level: 85, domain: "foundations" },
      { name: "Linear Algebra", level: 80, domain: "foundations" },
      { name: "Probability & Statistics", level: 82, domain: "foundations" },
      { name: "Operating Systems", level: 75, domain: "foundations" },
      { name: "Computer Networks", level: 78, domain: "foundations" },
      { name: "Database Systems", level: 80, domain: "foundations" },
    ],
  },
];
