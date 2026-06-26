import { ExperienceItem } from "../types/portfolio";

export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    id: "indie-dev",
    role: { en: "Product Builder & Systems Architect", ar: "مهندس أنظمة ومطور منتجات مستقل" },
    company: { en: "Self-Employed", ar: "عمل مستقل" },
    location: { en: "Cairo, Egypt", ar: "القاهرة، جمهورية مصر العربية" },
    period: { en: "2022 — Present", ar: "2022 — الحالي" },
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    points: [
      {
        en: "Architected and built QuickShed, an extensive client-side framework with 90+ tools using Next.js and TypeScript, shifting intensive computation to the browser for robust user privacy.",
        ar: "تصميم وبناء كويك شيد (QuickShed)، وهي حزمة متكاملة تضم أكثر من 90 أداة في المتصفح باستخدام Next.js و TypeScript، ومعالجة البيانات محلياً دون الحاجة لخادم خارجي للحفاظ على خصوصية المستخدم."
      },
      {
        en: "Created SIEVE Research OS, an academic and industrial evidence screening system with a 10-phase logic gate using React, Vite, and Recharts, mapping unstructured research ideas into logical evaluation sheets.",
        ar: "تطوير نظام تشغيل الأبحاث غربال (SIEVE Research OS) الممتد عبر 10 مراحل علمية تفاعلية باستخدام React و Vite لإدارة وتقييم الفرضيات الأكاديمية وتحويل البيانات العشوائية إلى جداول حوكمة موثقة."
      },
      {
        en: "Constructed low-latency event-driven data pipelines utilizing Python, NATS JetStream, Redis caching, and PostgreSQL (asyncpg), coordinating structured modules under tight performance requirements.",
        ar: "بناء وتصميم محركات تدفق البيانات الخلفية بلغة Python باستخدام NATS JetStream و Redis و PostgreSQL، وإدارة بيئة برمجية منظمة مع الالتزام بقيود أداء تشغيلية عالية الدقة والسرعة."
      },
      {
        en: "Contributed to NousResearch's Hermes WebUI open-source repository to expand private local LLM orchestration and Model Context Protocol (MCP) tool bindings.",
        ar: "المساهمة البرمجية في Hermes WebUI التابع لمؤسسة الأبحاث NousResearch لتوسيع قدرات الاتصال المحلي بنماذج الذكاء الاصطناعي وتجهيز بروتوكولات MCP لاستدعاء الأدوات للعملاء الأذكياء."
      }
    ]
  },
  {
    id: "marketing",
    role: { en: "Digital Marketing Specialist", ar: "أخصائي تسويق رقمي وصناعة محتوى" },
    company: { en: "Freelance", ar: "عمل مستقل" },
    location: { en: "Egypt", ar: "مصر" },
    period: { en: "Nov 2020 — Present", ar: "نوفمبر 2020 — الحالي" },
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    points: [
      {
        en: "Executed digital marketing and search engine optimization (SEO) campaigns, significantly enhancing organic visibility and user conversion rates for business platforms.",
        ar: "تنفيذ حملات تحسين محركات البحث (SEO) والتهيئة لمواقع التواصل الاجتماعي (SMO)، مما أدى إلى زيادة معدلات الوصول العضوي وتفاعل الجمهور."
      },
      {
        en: "Created analytics-backed copywriting, email automations, and carried out detailed Google Analytics conversion funnel audits for local businesses.",
        ar: "صياغة نصوص تسويقية مبنية على البيانات، وتصميم سلاسل رسائل البريد الإلكتروني الآلية، وتحليل قنوات التحويل في Google Analytics للشركات المحلية."
      },
      {
        en: "Designed optimized user landing pages, driving engagement tracking, higher conversions, and coherent conversion paths.",
        ar: "التعاون مع الفرق البرمجية والإبداعية لبناء صفحات هبوط ذات معدلات تحويل مرتفعة، وتتبع مباشر للتفاعل، وتصميم رحلات مستخدم مثالية."
      }
    ]
  },
  {
    id: "technical-support",
    role: { en: "Senior Technical Support Specialist", ar: "أخصائي دعم فني متقدم وشبكات" },
    company: { en: "Orange Egypt", ar: "شركة أورانج مصر (Orange)" },
    location: { en: "Cairo, Egypt", ar: "القاهرة، جمهورية مصر العربية" },
    period: { en: "Jan 2016 — Jan 2020", ar: "يناير 2016 — يناير 2020" },
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    points: [
      {
        en: "Performed advanced network diagnostics, system configuration, and LAN/WAN troubleshooting for enterprise operations and premium client accounts.",
        ar: "إجراء تشخيصات متقدمة للعتاد والبرمجيات وحل مشكلات الشبكات المعقدة (LAN/WAN) للمؤسسات والعملاء المميزين بمهارة عالية وسرعة استجابة فائقة."
      },
      {
        en: "Managed corporate user directories, secure domain setups, and permissions group structures utilizing Active Directory and corporate consoles.",
        ar: "إدارة وتأمين حسابات المستخدمين، وصلاحيات المجموعات، وسياسات الوصول للشبكة عبر Active Directory ولوحات تحكم الخوادم والأنظمة المعتمدة."
      },
      {
        en: "Maintained critical communications, ensuring internal system tools met high availability objectives and ran with reliable uptime.",
        ar: "تقديم الدعم الفني والتشغيلي عالي المستوى لضمان عمل عقد الاتصالات والأدوات الداخلية للشركة على مدار الساعة (24/7) دون أي توقف."
      }
    ]
  }
];
export default EXPERIENCE_LIST;
