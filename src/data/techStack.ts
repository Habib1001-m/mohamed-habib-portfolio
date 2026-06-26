import { TechCategory } from "../types/portfolio";

export const TECH_STACK: TechCategory[] = [
  {
    id: "languages",
    title: { en: "Languages", ar: "لغات البرمجة" },
    items: ["Python", "TypeScript", "JavaScript (ES6+)", "SQL (Postgres)", "HTML5 / CSS3", "Bash Scripting"]
  },
  {
    id: "frameworks",
    title: { en: "Frameworks & UI", ar: "إطارات العمل والواجهات" },
    items: ["FastAPI", "React (v18/19)", "Next.js (App Router)", "Vite", "Tailwind CSS", "Three.js", "Framer Motion", "Recharts"]
  },
  {
    id: "infrastructure",
    title: { en: "Infrastructure & Data", ar: "البنية التحتية والبيانات" },
    items: ["Docker", "Docker Compose", "NATS JetStream", "Redis Caching", "PostgreSQL", "Nginx Proxy", "Linux Server Admin", "Git / GitHub"]
  },
  {
    id: "ai-ml",
    title: { en: "AI & ML Stack", ar: "تقنيات الذكاء الاصطناعي" },
    items: ["MCP Protocol", "Ollama LLMs", "Qdrant Vector DB", "LangChain Routing", "RAG Pipeline Setup", "Nous Hermes Integrations"]
  },
  {
    id: "practices",
    title: { en: "Engineering Practices", ar: "الأساليب الهندسية" },
    items: ["Event-Driven Arch", "Privacy-First / Local State", "Decoupled Server Microservices", "REST API Engineering", "Audit-Ready Logs", "Asynchronous I/O"]
  },
  {
    id: "marketing-support",
    title: { en: "Marketing & Support", ar: "التسويق والدعم الفني" },
    items: ["Network Diagnostics", "Active Directory Security", "LAN/WAN Systems", "SEO & SMO Optimization", "Analytics & Conversion Funnels", "Technical Copywriting"]
  }
];
export default TECH_STACK;
