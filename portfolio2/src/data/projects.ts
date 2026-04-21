export type ProjectColor = "green" | "blue" | "amber";
export type ProjectTag =
  | "ML"
  | "NLP"
  | "Security"
  | "Web"
  | "Systems"
  | "Research"
  | "Deep Learning"
  | "Computer Vision"
  | "Python"
  | "Bash"
  | "CLI"
  | "Full Stack"
  | "Database"
  | "XAI"
  | "SOC"
  | "Splunk"
  | "Automation"
  | "Anomaly Detection"
  | "Kali Linux"
  | "Penetration Testing"
  | "Mobile"
  | "App";

export interface Project {
  id: string;
  title: string;
  color: ProjectColor;
  tags: ProjectTag[];
  shortDescription: string;
  longDescription: string;
  tech: string[];
  metrics?: string[];
  github?: string;
  githubStatus: "public" | "private" | "tbd";
  liveDemo?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "senior-design",
    title: "Senior Design / Capstone",
    color: "green",
    tags: ["ML", "Deep Learning", "Anomaly Detection", "Python", "Research"],
    shortDescription:
      "LSTM + GNN (GINEConv) leak detection across 1.46M graph windows of water-distribution data. F1=0.93, AUC=0.981. Sponsored by Recursive AI.",
    longDescription:
      "Capstone engineering project sponsored by Recursive AI. Designed and trained a joint LSTM + Graph Neural Network (GINEConv) model for leak detection in water distribution networks, achieving F1=0.93 and ROC-AUC=0.981 on 109,000+ held-out windows across four distinct pipe network topologies. Scaled the training pipeline from 50 to 2,000+ scenarios (1.46M graph windows) via a parallelized CSV-to-Parquet preprocessing system with pickling-safe DataLoader workers, enabling stable multi-GPU training across dual 25GB VRAM GPUs. Built production-hardened training infrastructure: crash-safe checkpoints, SIGTERM handling, per-epoch heartbeat monitoring, and automated convergence plots. Also achieved 96.9% Precision and 99.7% Recall with an XGBoost classifier on the same sensor data.",
    tech: ["Python", "PyTorch Geometric", "GINEConv", "LSTMs", "GNNs", "XGBoost", "Scikit-learn", "Pandas", "NumPy", "Parquet", "DDP"],
    metrics: ["F1 = 0.93", "ROC-AUC = 0.981", "1.46M graph windows", "96.9% Precision (XGBoost)", "99.7% Recall (XGBoost)"],
    githubStatus: "tbd",
    featured: true,
  },
  {
    id: "emotions-classifier",
    title: "Emotions Classifier",
    color: "blue",
    tags: ["ML", "NLP", "Python", "XAI", "Research"],
    shortDescription:
      "Multi-task NLP pipeline across 210K+ annotated text segments with SHAP and LIME explainability.",
    longDescription:
      "Multi-task NLP pipeline classifying 27 emotional states, sentiment, and trust levels across 210,000+ human-annotated text segments. Uses TF-IDF + One-vs-Rest Logistic Regression with SHAP and LIME explainability layers.",
    tech: ["Python", "Scikit-learn", "TF-IDF", "SHAP", "LIME", "Pandas"],
    metrics: ["62.7% Trust accuracy", "61.2% Sentiment accuracy"],
    githubStatus: "tbd",
    featured: true,
  },
  {
    id: "hyperspectral",
    title: "Hyperspectral Challenge",
    color: "green",
    tags: ["ML", "Deep Learning", "Computer Vision", "Python"],
    shortDescription:
      "Deep learning solution for hyperspectral image classification on multi-band remote sensing data.",
    longDescription:
      "Deep learning solution for hyperspectral image classification challenge. Applied convolutional and spectral processing techniques to multi-band remote sensing data.",
    tech: [
      "Python",
      "TensorFlow",
      "Keras",
      "NumPy",
      "Deep learning architectures",
    ],
    githubStatus: "tbd",
    featured: true,
  },
  {
    id: "soc-scripts",
    title: "SOC Scripts",
    color: "amber",
    tags: ["Security", "SOC", "Python", "Splunk", "Automation", "Anomaly Detection"],
    shortDescription:
      "Detection scans, AD audit scripts, Splunk dashboards, and an IsolationForest ML anomaly detection system. Audited 45K+ AD accounts.",
    longDescription:
      "Collection of Python and SPL (Splunk Processing Language) scripts built during my role as SOC Technician at Fairfield University. Includes detection scans, Active Directory audit scripts, and custom Splunk dashboard queries for visualizing blocked traffic and risk trends. Audited 45,000+ Microsoft Active Directory accounts and disabled inactive users. Used Bloodhound to enumerate and map AD privilege escalation paths. Engineered a Python + SPL machine learning anomaly detection system using IsolationForest to analyze 20,000+ network event logs across 30-day spans — establishing user-machine connection baselines and flagging logins to atypical machines or network areas — producing findings that drove direct configuration changes across the enterprise environment.",
    tech: [
      "Python",
      "Splunk SPL",
      "IsolationForest",
      "PowerShell",
      "Microsoft Active Directory",
      "Bloodhound",
    ],
    metrics: ["45,000+ AD accounts audited", "20,000+ network event logs analyzed"],
    githubStatus: "private",
  },
  {
    id: "ethical-hacking",
    title: "Ethical Hacking Project",
    color: "amber",
    tags: ["Security", "Kali Linux", "Penetration Testing"],
    shortDescription:
      "Structured pen-test exercise covering recon, exploitation, and reporting on a controlled target.",
    longDescription:
      "Structured ethical hacking exercise covering reconnaissance, exploitation, and reporting phases. Applied tools and techniques from the offensive security curriculum on a controlled target environment.",
    tech: [
      "Kali Linux",
      "Nmap",
      "Metasploit",
      "Burp Suite",
      "Network scanning tools",
    ],
    githubStatus: "private",
  },
  {
    id: "bash-book",
    title: "Bash Book",
    color: "amber",
    tags: ["Systems", "Bash", "CLI"],
    shortDescription:
      "CLI reference and tool collection for shell scripting, system administration, and automation.",
    longDescription:
      "A command-line reference book and tool collection built in Bash. Documents common shell scripting patterns, system administration commands, and automation workflows.",
    tech: ["Bash", "Shell scripting", "Unix/Linux"],
    githubStatus: "tbd",
  },
  {
    id: "bunkmates",
    title: "Bunkmates App",
    color: "blue",
    tags: ["Web", "Full Stack", "Mobile", "App"],
    shortDescription:
      "Roommate matching and coordination app based on student preferences, schedules, and habits.",
    longDescription:
      "Roommate matching and coordination application. Designed to help students find compatible roommates based on preferences, schedules, and habits.",
    tech: [
      "TypeScript",
      "React / React Native",
      "Node.js",
      "Database backend",
    ],
    githubStatus: "tbd",
  },
  {
    id: "crud-app",
    title: "CRUD App",
    color: "blue",
    tags: ["Web", "Full Stack", "Database"],
    shortDescription:
      "Full-stack CRUD app demonstrating REST API design, DB integration, and frontend/backend separation.",
    longDescription:
      "Full-stack CRUD application demonstrating REST API design, database integration, and frontend/backend separation. Core web development fundamentals.",
    tech: ["JavaScript", "Node.js", "SQL/NoSQL", "HTML/CSS"],
    githubStatus: "tbd",
  },
];

export const allTags: ProjectTag[] = [
  "ML",
  "Security",
  "Web",
  "Systems",
  "Research",
];

export const colorMap: Record<ProjectColor, string> = {
  green: "#2ec87a",
  blue: "#5ab4d6",
  amber: "#e8a83a",
};
