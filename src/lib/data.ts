// lib/data.ts — All personal data for Harshit Mathur's portfolio

export const personal = {
  name: "Harshit Mathur",
  tagline: "Building Intelligent Systems. Shipping Real Products.",
  subTagline: "AI/ML Engineer · Full-Stack Builder · IIT (ISM) Dhanbad · Founder",
  bio: `I sit at the intersection of research and execution — training models that see the world, building systems that ship to it, and founding ventures that make it matter. Currently pursuing B.Tech in ECE at IIT (ISM) Dhanbad (CGPA 8.91), obsessing over computer vision, LLMs, and whatever breaks next.`,
  email: "mathur.harshit96@gmail.com",
  phone: "+91 9555913188",
  location: "IIT (ISM) Dhanbad, Jharkhand",
  links: {
    github: "https://github.com/HarshitMathur01",
    linkedin: "https://www.linkedin.com/in/harshit-mathur-4b2417207/",
    kaggle: "https://www.kaggle.com/harshitmathur96",
    codeforces: "https://codeforces.com/profile/HarshitMathur",
    email: "mailto:mathur.harshit96@gmail.com",
  },
};

export const experience = [
  {
    id: "iit-roorkee",
    role: "ML Research Intern",
    company: "IIT Roorkee",
    duration: "May 2025 – July 2025",
    type: "Research",
    highlights: [
      "Developed an unsupervised vision system using ground-based visual data for real-time landslide early warning",
      "Architected scalable deep learning pipelines for domain generalization",
      "Adapted optical flow models from aerial imagery to ground-level visual streams",
    ],
    tech: ["PyTorch", "Computer Vision", "Optical Flow", "Deep Learning"],
  },
];

export const education = [
  {
    institution: "Indian Institute of Technology (ISM) Dhanbad",
    degree: "B.Tech — Electronics & Communication Engineering",
    duration: "2023 – May 2027",
    cgpa: "8.91 / 10",
    coursework: ["Linear Algebra", "Probability & Statistics", "Calculus", "DSA"],
  },
];

export const projects = [
  {
    id: "news-agent",
    title: "AI-Powered Authenticated News Agent",
    shortTitle: "NewsAgent AI",
    description:
      "Autonomous AI system for news retrieval, verification, summarization, and publishing. BERT-base semantic similarity for claim cross-verification. Gemini-powered abstractive summarization. End-to-end pipeline: web crawl → fact check → summarize → SEO → publish.",
    tech: ["PyTorch", "BERT", "Gemini", "NLP", "LangChain", "RAG"],
    category: "AI / NLP",
    github: "https://github.com/HarshitMathur01",
    featured: true,
  },
  {
    id: "land-cover",
    title: "Data-Centric Land Cover Classification",
    shortTitle: "BMVC 2024",
    description:
      "BMVC 2024 submission. Novel ranking strategy to estimate label fidelity for noise-robust training. DeepLabv3+ with ResNet152 backbone — 0.7331 Val Mean IoU. 75+ model variants submitted including Grounding SAM, DINO, UNet, Mask2Former. Kendall Tau: 0.4635.",
    tech: ["HuggingFace", "Lightning", "Hydra", "DeepLabv3+", "Voxel51", "Grounding SAM"],
    category: "Computer Vision",
    github: "https://github.com/HarshitMathur01",
    featured: true,
    badge: "BMVC 2024",
  },
];

export const skills = {
  "Languages": ["Python", "C/C++"],
  "Frameworks": ["PyTorch", "Lightning", "Hydra", "LangChain", "LangGraph"],
  "AI/ML": ["Computer Vision", "NLP", "Transformers", "LLMs", "RAG", "Transfer Learning", "CNNs", "Semantic Segmentation"],
  "Libraries": ["HuggingFace", "OpenCV", "timm", "Scikit-learn", "Librosa", "segmentation-models-pytorch"],
  "Tools": ["Git", "GitHub", "Neptune", "Voxel51", "VS Code"],
  "Concepts": ["OOP", "OS", "SQL", "DSA", "DBMS"],
};

export const achievements = [
  { text: "2nd Runner-Up (445 teams) — SHL Hiring Assessment Challenge, Kaggle", icon: "🏆", type: "SUCCESS" as const },
  { text: "2nd Runner-Up — AGGLOMERATION 2.0 (CSE Society) & AI of GOD 3.0 (MnC Dept, IIT Dhanbad)", icon: "🥉", type: "SUCCESS" as const },
  { text: "Codeforces Specialist — Max Rating 1461 | CodeChef 3-Star — Max Rating 1694 | 500+ problems solved", icon: "⚡", type: "STATUS" as const },
  { text: "Volleyball Team Captain — Winners Parakram 2024 | 1st Runner-Up Parakram 2025 & Dhanbad District Tournament", icon: "🏐", type: "TROPHY" as const },
  { text: "Inter IIT Sports Meet — 2023 (IIT Bombay), 2024 (IIT Kanpur), 2025 (IIT Hyderabad)", icon: "🎖️", type: "TROPHY" as const },
];

export const startup = {
  name: "MindMitra",
  tagline: "My Startup — Coming Soon",
  description: "Currently building something ambitious. Details dropping soon.",
  status: "stealth" as const,
};

export const blogPosts = [
  {
    slug: "optical-flow-landslide-detection",
    title: "How I Trained an Optical Flow Model to Detect Landslides in Real-Time",
    date: "2025-06-15",
    tags: ["Computer Vision", "Research", "PyTorch"],
    excerpt: "Breaking down the architecture and training pipeline behind a real-time landslide early warning system using ground-based visual data.",
  },
  {
    slug: "bmvc-2024-75-model-variants",
    title: "BMVC 2024: What I Learned Submitting 75+ Model Variants",
    date: "2025-04-22",
    tags: ["Deep Learning", "Competition", "Segmentation"],
    excerpt: "From DeepLabv3+ to Grounding SAM — the brutal journey of data-centric land cover classification and what actually worked.",
  },
  {
    slug: "rag-vs-fine-tuning",
    title: "RAG Pipelines vs Fine-Tuning: When to Use What",
    date: "2025-03-10",
    tags: ["LLMs", "NLP", "Architecture"],
    excerpt: "A practical guide on choosing between RAG and fine-tuning based on real-world deployment constraints, cost, and accuracy tradeoffs.",
  },
];

export const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#projects" },
  { label: "SKILLS", href: "#skills" },
  { label: "TIMELINE", href: "#timeline" },
  { label: "BLOG", href: "#blog" },
  { label: "CONTACT", href: "#contact" },
];

export const stats = [
  { value: 8.91, label: "CGPA", decimals: 2 },
  { value: 500, label: "PROBLEMS", suffix: "+" },
  { value: 3, label: "HACKATHON WINS" },
  { value: 1461, label: "CF RATING" },
  { value: 3, label: "CODECHEF", suffix: "★" },
  { value: 3, label: "INTER IIT" },
];

export const funFacts = [
  "Volleyball captain who also trains neural networks. Two different kinds of blocking.",
  "Has submitted 75+ ML model variants for a single competition. Perfectionism is a feature, not a bug.",
  "Rating on Codeforces: 1461. Rating on IRL: higher.",
  "Building a startup while maintaining 8.91 CGPA. Sleep is overrated.",
  "Trained a model to predict landslides. Can't predict when his own code will compile on the first try.",
  "The only person who thinks 'optical flow' sounds cool at parties.",
];
