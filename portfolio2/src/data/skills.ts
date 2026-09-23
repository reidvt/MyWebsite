export interface SkillItem {
  n: string;
  v: number;
}

export interface SkillCategory {
  cat: string;
  color: "green" | "blue" | "amber";
  items: SkillItem[];
}

export const SKILLS_DATA: SkillCategory[] = [
  {
    cat: "Languages",
    color: "green",
    items: [
      { n: "Python", v: 90 },
      { n: "JavaScript", v: 75 },
      { n: "Java", v: 70 },
      { n: "TypeScript", v: 65 },
      { n: "Bash", v: 72 },
      { n: "C/C++", v: 50 },
    ],
  },
  {
    cat: "ML & AI",
    color: "green",
    items: [
      { n: "PyTorch Geometric", v: 85 },
      { n: "TensorFlow/Keras", v: 80 },
      { n: "Scikit-learn", v: 85 },
      { n: "XGBoost", v: 80 },
      { n: "Pandas/NumPy", v: 90 },
    ],
  },
  {
    cat: "Security",
    color: "amber",
    items: [
      { n: "Splunk / SPL", v: 78 },
      { n: "Active Directory", v: 75 },
      { n: "Bloodhound", v: 65 },
      { n: "Kali Linux", v: 60 },
      { n: "IsolationForest", v: 72 },
    ],
  },
  {
    cat: "Techniques",
    color: "blue",
    items: [
      { n: "NLP Pipelines", v: 80 },
      { n: "Anomaly Detection", v: 85 },
      { n: "GNNs (GINEConv)", v: 80 },
      { n: "LSTMs", v: 82 },
      { n: "XAI (SHAP/LIME)", v: 75 },
    ],
  },
  {
    cat: "Web & Platforms",
    color: "blue",
    items: [
      { n: "React / Next.js", v: 68 },
      { n: "Node.js", v: 65 },
      { n: "SQL", v: 70 },
      { n: "Unix/Linux", v: 80 },
    ],
  },
];
