export type CourseCategory =
  | "security"
  | "ml"
  | "web"
  | "systems"
  | "theory";

export interface Course {
  name: string;
  category: CourseCategory;
  accent: "green" | "blue" | "amber";
  skills: string[];
}

export const courses: Course[] = [
  {
    name: "Cybersecurity",
    category: "security",
    accent: "amber",
    skills: [
      "Network security",
      "Threat modeling",
      "Cryptography",
      "Kali Linux",
    ],
  },
  {
    name: "Ethical Hacking",
    category: "security",
    accent: "amber",
    skills: [
      "Penetration testing",
      "Nmap",
      "Metasploit",
      "Burp Suite",
      "OSINT",
    ],
  },
  {
    name: "Computer Networks",
    category: "security",
    accent: "amber",
    skills: ["TCP/IP", "DNS", "HTTP", "Packet analysis", "Wireshark"],
  },
  {
    name: "Machine Learning",
    category: "ml",
    accent: "green",
    skills: [
      "Scikit-learn",
      "Regression",
      "Classification",
      "Model evaluation",
      "Cross-validation",
    ],
  },
  {
    name: "Deep Learning",
    category: "ml",
    accent: "green",
    skills: [
      "TensorFlow",
      "Keras",
      "CNNs",
      "LSTMs",
      "Backpropagation",
      "GPU training",
    ],
  },
  {
    name: "Data Science",
    category: "ml",
    accent: "green",
    skills: [
      "Pandas",
      "NumPy",
      "Data cleaning",
      "Exploratory analysis",
      "Visualization",
    ],
  },
  {
    name: "Web Development",
    category: "web",
    accent: "blue",
    skills: ["HTML", "CSS", "JavaScript", "REST APIs", "React", "Node.js"],
  },
  {
    name: "Software Engineering",
    category: "web",
    accent: "blue",
    skills: [
      "Agile",
      "Git workflows",
      "System design",
      "Testing",
      "Documentation",
    ],
  },
  {
    name: "Database Systems",
    category: "web",
    accent: "blue",
    skills: ["SQL", "Normalization", "Indexing", "Transactions", "ERDs"],
  },
  {
    name: "Design & Analysis of Algorithms",
    category: "theory",
    accent: "blue",
    skills: [
      "Big-O",
      "Dynamic programming",
      "Graph algorithms",
      "Sorting",
    ],
  },
  {
    name: "Data Structures & Algorithms",
    category: "theory",
    accent: "blue",
    skills: [
      "Trees",
      "Graphs",
      "Hash maps",
      "Linked lists",
      "Complexity analysis",
    ],
  },
  {
    name: "Theory of Computation",
    category: "theory",
    accent: "blue",
    skills: [
      "Automata",
      "Turing machines",
      "Complexity classes",
      "Formal languages",
    ],
  },
  {
    name: "Linear Algebra",
    category: "theory",
    accent: "green",
    skills: [
      "Vectors",
      "Matrices",
      "Eigenvalues",
      "Applied to ML transformations",
    ],
  },
  {
    name: "Probability & Statistics",
    category: "theory",
    accent: "green",
    skills: [
      "Distributions",
      "Hypothesis testing",
      "Bayes theorem",
      "Statistical inference",
    ],
  },
  {
    name: "Operating Systems",
    category: "systems",
    accent: "amber",
    skills: [
      "Process scheduling",
      "Memory management",
      "File systems",
      "Unix internals",
    ],
  },
  {
    name: "Computer Design & Architecture",
    category: "systems",
    accent: "amber",
    skills: [
      "Assembly",
      "CPU pipelines",
      "Memory hierarchy",
      "Binary systems",
    ],
  },
  {
    name: "Digital Design",
    category: "systems",
    accent: "amber",
    skills: ["Logic gates", "Circuits", "Verilog", "FPGA basics"],
  },
];

export const categoryLabels: Record<CourseCategory, string> = {
  security: "Security",
  ml: "ML / Data",
  web: "Web / Software",
  systems: "Systems",
  theory: "Theory & Math",
};
