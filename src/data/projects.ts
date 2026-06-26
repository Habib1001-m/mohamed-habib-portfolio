import { Project } from "../types/portfolio";

export const PROJECTS_LIST: Project[] = [
  {
    id: "quickshed",
    title: { en: "QuickShed", ar: "كويك شيد" },
    tagline: { en: "Privacy-focused client-side utility suite with a rich set of formatting and development tools.", ar: "صندوق أدوات متكامل يضم مجموعة واسعة من أدوات التطوير التي تعمل بالكامل داخل المتصفح لتعزيز الخصوصية والأمان." },
    description: {
      en: "A developer toolkit running directly in the client's browser. Safe from external network tracking, highly responsive in Arabic and English.",
      ar: "مجموعة أدوات برمجية للمطورين تعمل مباشرة على متصفح العميل دون تتبع البيانات الخارجية. دعم متميز للعربية والإنجليزية."
    },
    longDescription: {
      en: "QuickShed provides developers with safe tools to format, parse, encode, and minify sensitive data (such as JSON structure, tokens, or configuration keys) without exposing them to remote servers. By executing all processing within a highly optimized client-only Single Page App using Web Workers, QuickShed processes data with robust client-side privacy. It includes a PWA setup for offline-first usage with an elegant, responsive interface.",
      ar: "يحل كويك شيد مشكلة اضطرار المطورين إلى معالجة بيانات حساسة (مثل ملفات JSON أو الرموز البرمجية) في خوادم طرف ثالث غير موثوقة. من خلال تنفيذ جميع عمليات المعالجة (تنسيق، تشفير، فك ضغط) داخل المتصفح عبر Web Workers، يضمن النظام حماية فائقة للخصوصية والبيانات محلياً. كما يدعم العمل دون اتصال بالشبكة كـ PWA مع واجهة مستخدم متجاوبة."
    },
    category: { en: "Privacy Tooling", ar: "أدوات الخصوصية" },
    status: { en: "Live / Production", ar: "متاح ومستقر للإنتاج" },
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PWA", "Web Workers", "WebAssembly"],
    image: "/images/ai_infrastructure_visual_1782504890769.jpg",
    stats: [
      { label: { en: "Tools Included", ar: "الأدوات المدمجة" }, value: "90+" },
      { label: { en: "Server Transmission", ar: "إرسال البيانات للخادم" }, value: "None" },
      { label: { en: "Processing Time", ar: "زمن معالجة الواجهة" }, value: "Instant" }
    ],
    links: { github: "https://github.com/Habib1001-m/quickshed", demo: "https://quickshed.vercel.app" }
  },
  {
    id: "sieve",
    title: { en: "SIEVE Research OS", ar: "غربال: نظام تشغيل الأبحاث" },
    tagline: { en: "Ten-phase evidence screening and structured evaluation matrix.", ar: "محرك معالجة وبوابات حوكمة ممتدة على 10 مراحل لتصفية وفحص الأدلة." },
    description: {
      en: "An academic and industrial decision matrix, taking research ideas through strict evaluation phases to produce structured, actionable outcomes.",
      ar: "مصفوفة اتخاذ قرار أكاديمية وصناعية متطورة، تنقل الأفكار والأبحاث عبر بوابات حوكمة صارمة ومصفوفات فحص لإنتاج مخرجات موثوقة وعالية الدقة."
    },
    longDescription: {
      en: "SIEVE Research OS is an evidence-based selection engine designed to filter high-value insights from chaotic streams of raw hypotheses. Spanning across 10 structured execution phases, it includes active visual matrices, grading cards, analytical screening maps, and governance gates. Built with clean state modularity using React, TypeScript, and Recharts, it assists research teams in maintaining a logical and audit-ready log of scientific selections.",
      ar: "غربال هو محرك تصفية أبحاث مخصص لتصفية الأفكار والفرضيات العلمية والصناعية وفصل الإشارات المفيدة عن الضوضاء. من خلال 10 مراحل تشغيلية فريدة، يوفر النظام مصفوفات تصفية تفاعلية، ولوحات تقييم مخصصة، ومخططات بيانية تحليلة للتحقق من المخرجات وتوثيق عملية اتخاذ القرار للفرق الأكاديمية والتقنية بما يحقق أقصى دقة قابلة للمراجعة والتدقيق."
    },
    category: { en: "Decision Systems", ar: "أنظمة اتخاذ القرار" },
    status: { en: "10-Phase Active", ar: "مكتمل المراحل الـ 10" },
    tech: ["React", "TypeScript", "Vite", "Recharts", "TanStack Table", "Tailwind CSS"],
    image: "/images/ai_infrastructure_visual_1782504890769.jpg",
    stats: [
      { label: { en: "Evaluation Phases", ar: "مراحل التصفية" }, value: "10" },
      { label: { en: "Data Auditability", ar: "جاهزية تدقيق البيانات" }, value: "High" },
      { label: { en: "State Interactivity", ar: "تفاعلية واجهة التحكم" }, value: "High" }
    ],
    links: { github: "https://github.com/Habib1001-m", demo: "https://quickshed.vercel.app" }
  },
  {
    id: "ai-agent",
    title: { en: "AI Agent Orchestration", ar: "بنية تنسيق العملاء الأذكياء" },
    tagline: { en: "Multi-agent systems, knowledge graphs, and custom MCP integrations.", ar: "تنسيق مجموعة من عملاء الذكاء الاصطناعي مع بروتوكولات سياق MCP ومخازن المتجهات." },
    description: {
      en: "Plumbing and framework integration for complex LLM behaviors, orchestrating system tools, persistent memory, and context databases.",
      ar: "البنية التحتية والربط البرمجي لتعزيز تصرفات النماذج اللغوية الكبيرة. تنسيق الأدوات، الذاكرة المستمرة للمستخدم، وقواعد بيانات السياق المتكاملة."
    },
    longDescription: {
      en: "This infrastructure enables practical utilizing of AI agents by introducing custom Model Context Protocol (MCP) server integrations, semantic vector routing, dynamic knowledge graphs, and persistent memory structures. It includes active contributions to open-source tools like NousResearch's Hermes WebUI, facilitating production workflows with local LLM backends.",
      ar: "تركز هذه البنية التحتية على تمكين الاستخدام الفعلي والمؤسسي لعملاء الذكاء الاصطناعي، متجاوزة أنظمة الدردشة التقليدية البسيطة. تدعم تكاملاً لبروتوكول سياق النموذج (MCP)، وتوجيه المتجهات بين عدة عملاء، والإنشاء الديناميكي للرسوم البيانية الدلالية، والذاكرة المؤسسية المستديمة. يشارك حبيب بنشاط في تطوير واجهة Hermes WebUI الخاصة بمجموعة أبحاث NousResearch لدمج تدفقات العمل البرمجية مع خوادم LLM المحلية."
    },
    category: { en: "AI Infrastructure", ar: "البنية التحتية للذكاء الاصطناعي" },
    status: { en: "Open Source Contributor", ar: "مساهم برمجيات حرة" },
    tech: ["Python", "Ollama", "Qdrant Vector DB", "MCP Protocol", "FastAPI", "Docker"],
    image: "/images/ai_infrastructure_visual_1782504890769.jpg",
    stats: [
      { label: { en: "Semantic Retrieval", ar: "دقة مطابقة المتجهات" }, value: "Optimized" },
      { label: { en: "Context Window Guard", ar: "مراقب نافذة السياق" }, value: "Active" },
      { label: { en: "Execution Flow", ar: "مسار التنسيق" }, value: "Async" }
    ],
    links: { github: "https://github.com/Habib1001-m" }
  },
  {
    id: "event-driven",
    title: { en: "Event-Driven Stream Engines", ar: "محركات التدفق الفوري الموجه بالأحداث" },
    tagline: { en: "Real-time automated data processing with risk control.", ar: "معالجة تدفقات البيانات الضخمة بشكل فوري مع بوابات حماية مدمجة للتحكم بالمخاطر." },
    description: {
      en: "A highly modular backend system managing structured modules for fast, automated, and fully logged pipelines.",
      ar: "بنية تحتية متكاملة للخوادم الخلفية تدير وتنسق ملفات برمجية منظمة لمعالجة البيانات الفورية ومخاطر المعاملات بدقة وموثوقية."
    },
    longDescription: {
      en: "An event-driven backend engine coordinating real-time data streams. Leveraging a decoupled architecture with NATS message broker and Redis caching, it implements procedural checks, automated mathematical triggers, risk controls, and persistent storage using asyncpg on PostgreSQL. Built for reliability, it features automated crash recovery and comprehensive telemetry logs.",
      ar: "يعمل هذا المحرك البرمجي على تنسيق التحديثات المستمرة للبيانات الفورية. باستخدام بنية تحتية مفككة تعتمد على الأحداث مع وسيط الرسائل فائق السرعة NATS وذاكرة الكاش Redis، ينفذ النظام حوكمة صارمة للمخاطر مع قواعد بيانات PostgreSQL عالية الاستجابة عبر بروتوكول asyncpg. صُمم النظام لتحقيق الاعتمادية العالية والتشغيل المستقر."
    },
    category: { en: "Backend & Systems", ar: "الخوادم الخلفية والأنظمة" },
    status: { en: "Deployed Core", ar: "مستقر قيد التشغيل" },
    tech: ["Python", "FastAPI", "NATS JetStream", "Redis Cache", "PostgreSQL", "Docker Compose"],
    image: "/images/ai_infrastructure_visual_1782504890769.jpg",
    stats: [
      { label: { en: "Managed Modules", ar: "الوحدات البرمجية" }, value: "Structured" },
      { label: { en: "Processing Latency", ar: "زمن توصيل الحدث" }, value: "Low Latency" },
      { label: { en: "Queue Management", ar: "سعة طابور الأحداث" }, value: "Dynamic" }
    ],
    links: { github: "https://github.com/Habib1001-m" }
  }
];
export default PROJECTS_LIST;
