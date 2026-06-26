import { TechCategory } from "../types/portfolio";

export const TECH_STACK: TechCategory[] = [
  {
    id: "frontend",
    title: { en: "Frontend", ar: "الواجهة" },
    items: ["React", "TypeScript", "Vite", "Tailwind CSS", "Three.js", "Responsive UI", "RTL/LTR layouts"]
  },
  {
    id: "backend-data",
    title: { en: "Backend & Data", ar: "الخلفية والبيانات" },
    items: ["Python", "FastAPI", "Node.js", "REST APIs", "PostgreSQL", "Redis", "Data processing"]
  },
  {
    id: "automation-ai",
    title: { en: "AI & Automation", ar: "الذكاء الاصطناعي والأتمتة" },
    items: ["MCP Protocol", "Ollama", "Qdrant", "Workflow orchestration", "Prompt systems", "Knowledge routing", "AI-assisted tools"]
  },
  {
    id: "infrastructure",
    title: { en: "Infrastructure", ar: "البنية والنشر" },
    items: ["GitHub", "Vercel", "Docker", "Docker Compose", "Linux", "WSL", "Deployment pipelines"]
  },
  {
    id: "systems-practices",
    title: { en: "Systems Practices", ar: "ممارسات الأنظمة" },
    items: ["Event-driven workflows", "Privacy-conscious design", "Observable pipelines", "Structured logs", "Recovery paths", "Maintainable architecture"]
  },
  {
    id: "product-ops",
    title: { en: "Product & Operations", ar: "المنتج والتشغيل" },
    items: ["User workflows", "Landing pages", "SEO basics", "Analytics thinking", "Technical support", "Network diagnostics"]
  }
];
export default TECH_STACK;
