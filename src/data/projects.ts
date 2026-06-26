import { Project } from "../types/portfolio";

export const PROJECTS_LIST: Project[] = [
  {
    id: "quickshed",
    title: { en: "QuickShed", ar: "كويك شيد" },
    tagline: {
      en: "A client-side utility workspace for formatting, encoding, and working with sensitive text without sending it to a server.",
      ar: "مساحة أدوات داخل المتصفح لتنسيق النصوص والبيانات الحساسة والعمل عليها دون إرسالها إلى خادم خارجي."
    },
    description: {
      en: "A practical browser-based toolkit that keeps common developer utilities fast, private, and available in Arabic and English.",
      ar: "صندوق أدوات عملي يعمل داخل المتصفح، يوفّر أدوات المطورين اليومية بسرعة وخصوصية وبدعم عربي وإنجليزي."
    },
    longDescription: {
      en: "QuickShed is built for moments when developers need to format, parse, encode, decode, or clean up sensitive data without pasting it into unknown online tools. Processing runs in the browser, with a PWA setup for fast repeat use and a bilingual interface for everyday work.",
      ar: "تم بناء QuickShed للحالات التي يحتاج فيها المطور إلى تنسيق JSON، أو معالجة نصوص، أو تحويل بيانات حساسة دون وضعها في أدوات خارجية غير موثوقة. تتم المعالجة داخل المتصفح، مع دعم PWA للاستخدام السريع والمتكرر وواجهة ثنائية اللغة للعمل اليومي."
    },
    category: { en: "Privacy Tooling", ar: "أدوات خصوصية" },
    status: { en: "Live", ar: "متاح" },
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PWA", "Web Workers", "WebAssembly"],
    image: "/images/ai_infrastructure_visual_1782504890769.jpg",
    stats: [
      { label: { en: "Tools Included", ar: "الأدوات" }, value: "90+" },
      { label: { en: "Server Uploads", ar: "رفع للخادم" }, value: "None" },
      { label: { en: "Workflow", ar: "مسار العمل" }, value: "Instant" }
    ],
    links: { github: "https://github.com/Habib1001-m/quickshed", demo: "https://quickshed.vercel.app" }
  },
  {
    id: "sieve",
    title: { en: "SIEVE Research OS", ar: "SIEVE: نظام تشغيل الأبحاث" },
    tagline: {
      en: "A structured evaluation system for turning scattered ideas into clearer decision paths.",
      ar: "نظام تقييم منظم يحوّل الأفكار المتناثرة إلى مسارات قرار أوضح."
    },
    description: {
      en: "A research and decision workflow that helps screen ideas through phases, criteria, and visible evidence trails.",
      ar: "مسار عمل بحثي لاتخاذ القرار يساعد على فحص الأفكار عبر مراحل ومعايير وأثر واضح للأدلة."
    },
    longDescription: {
      en: "SIEVE is an evidence-screening workspace designed for research-heavy thinking. It organizes raw hypotheses into phases, review cards, scoring views, and decision gates so that teams can see why an idea should move forward, pause, or be rejected.",
      ar: "SIEVE هو مساحة عمل لفحص الأدلة في السياقات البحثية. ينظّم الفرضيات الأولية داخل مراحل وبطاقات مراجعة وطرق تقييم وبوابات قرار، بحيث يصبح سبب قبول الفكرة أو إيقافها أو رفضها واضحًا وقابلًا للمراجعة."
    },
    category: { en: "Decision Systems", ar: "أنظمة قرار" },
    status: { en: "Structured workflow", ar: "مسار منظم" },
    tech: ["React", "TypeScript", "Vite", "Recharts", "TanStack Table", "Tailwind CSS"],
    image: "/images/ai_infrastructure_visual_1782504890769.jpg",
    stats: [
      { label: { en: "Evaluation Phases", ar: "مراحل التقييم" }, value: "10" },
      { label: { en: "Evidence Trail", ar: "أثر الأدلة" }, value: "Visible" },
      { label: { en: "Review Flow", ar: "مسار المراجعة" }, value: "Structured" }
    ],
    links: { github: "https://github.com/Habib1001-m", demo: "https://quickshed.vercel.app" }
  },
  {
    id: "ai-agent",
    title: { en: "AI Workflow Orchestration", ar: "تنسيق مسارات الذكاء الاصطناعي" },
    tagline: {
      en: "Practical experiments with agents, local model tooling, memory, and MCP-style integrations.",
      ar: "تجارب عملية مع العملاء الأذكياء، أدوات النماذج المحلية، الذاكرة، وتكاملات MCP."
    },
    description: {
      en: "A systems layer for connecting AI tools to real workflows: context, memory, routing, and tool access.",
      ar: "طبقة أنظمة لربط أدوات الذكاء الاصطناعي بمسارات عمل حقيقية: سياق، ذاكرة، توجيه، واستدعاء أدوات."
    },
    longDescription: {
      en: "This work explores how AI agents can support operating systems of work rather than remain isolated chat boxes. It includes MCP integrations, local model workflows, knowledge routing, and structured memory patterns for tool-assisted execution.",
      ar: "يركز هذا العمل على جعل العملاء الأذكياء جزءًا من نظام تشغيل العمل، لا مجرد نافذة دردشة منفصلة. يشمل ذلك تكاملات MCP، مسارات النماذج المحلية، توجيه المعرفة، وأنماط ذاكرة منظمة تساعد على التنفيذ المدعوم بالأدوات."
    },
    category: { en: "AI Systems", ar: "أنظمة ذكاء اصطناعي" },
    status: { en: "Active exploration", ar: "استكشاف نشط" },
    tech: ["Python", "Ollama", "Qdrant Vector DB", "MCP Protocol", "FastAPI", "Docker"],
    image: "/images/ai_infrastructure_visual_1782504890769.jpg",
    stats: [
      { label: { en: "Context Routing", ar: "توجيه السياق" }, value: "Structured" },
      { label: { en: "Tool Access", ar: "استدعاء الأدوات" }, value: "MCP" },
      { label: { en: "Execution Flow", ar: "مسار التنفيذ" }, value: "Async" }
    ],
    links: { github: "https://github.com/Habib1001-m" }
  },
  {
    id: "event-driven",
    title: { en: "Event-Driven Stream Engines", ar: "محركات تدفق موجهة بالأحداث" },
    tagline: {
      en: "Backend workflows for coordinating streams, queues, checks, and logged processing steps.",
      ar: "مسارات خلفية لتنسيق التدفقات، الطوابير، الفحوصات، وخطوات المعالجة الموثقة."
    },
    description: {
      en: "A modular backend approach for moving data through clear, observable, event-driven pipelines.",
      ar: "نهج خلفي معياري لتحريك البيانات داخل مسارات واضحة، قابلة للمراقبة، ومبنية على الأحداث."
    },
    longDescription: {
      en: "This backend architecture coordinates stream processing with message queues, cache layers, database writes, procedural checks, and telemetry. The focus is not only speed, but clarity: every processing path should be understandable, observable, and recoverable.",
      ar: "تنسق هذه البنية الخلفية معالجة التدفقات عبر طوابير رسائل، طبقات كاش، كتابة في قواعد البيانات، فحوصات إجرائية، وسجلات مراقبة. التركيز ليس على السرعة فقط، بل على الوضوح: كل مسار معالجة يجب أن يكون مفهومًا، قابلًا للمراقبة، وقابلًا للتعافي."
    },
    category: { en: "Backend & Systems", ar: "الخلفية والأنظمة" },
    status: { en: "Core pattern", ar: "نمط أساسي" },
    tech: ["Python", "FastAPI", "NATS JetStream", "Redis Cache", "PostgreSQL", "Docker Compose"],
    image: "/images/ai_infrastructure_visual_1782504890769.jpg",
    stats: [
      { label: { en: "Modules", ar: "الوحدات" }, value: "Structured" },
      { label: { en: "Latency Goal", ar: "هدف الاستجابة" }, value: "Low" },
      { label: { en: "Observability", ar: "المراقبة" }, value: "Logged" }
    ],
    links: { github: "https://github.com/Habib1001-m" }
  }
];
export default PROJECTS_LIST;
