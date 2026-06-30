import { ExperienceItem } from "../types/portfolio";

export const EXPERIENCE_LIST: ExperienceItem[] = [
  {
    id: "indie-dev",
    role: { en: "Full-Stack Developer & Systems Builder", ar: "مطور Full-Stack وباني أنظمة" },
    company: { en: "Independent Work", ar: "عمل مستقل" },
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    period: { en: "2022 — Present", ar: "2022 — الآن" },
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    points: [
      {
        en: "Built QuickShed as a browser-first utility workspace for developers who need fast text and data tools without exposing sensitive inputs to third-party servers.",
        ar: "بناء QuickShed كمساحة أدوات داخل المتصفح للمطورين الذين يحتاجون أدوات سريعة للنصوص والبيانات دون تعريض مدخلات حساسة لخوادم خارجية."
      },
      {
        en: "Designed SIEVE Research OS to turn scattered research ideas into phased reviews, scoring views, and clearer decision paths.",
        ar: "تصميم SIEVE Research OS لتحويل الأفكار البحثية المتناثرة إلى مراجعات مرحلية، طرق تقييم، ومسارات قرار أوضح."
      },
      {
        en: "Built backend workflow patterns using Python, queues, cache layers, and databases to keep processing steps observable and easier to recover.",
        ar: "بناء أنماط مسارات خلفية باستخدام Python والطوابير والكاش وقواعد البيانات لجعل خطوات المعالجة قابلة للمراقبة وأسهل في التعافي."
      },
      {
        en: "Experimented with local AI workflows, MCP-style tool access, and structured memory patterns for practical AI-assisted execution.",
        ar: "تجربة مسارات ذكاء اصطناعي محلية، واستدعاء أدوات بأسلوب MCP، وأنماط ذاكرة منظمة للتنفيذ العملي المدعوم بالذكاء الاصطناعي."
      }
    ]
  },
  {
    id: "marketing",
    role: { en: "Digital Marketing & Content Specialist", ar: "أخصائي تسويق رقمي وصناعة محتوى" },
    company: { en: "Freelance", ar: "عمل مستقل" },
    location: { en: "Egypt", ar: "مصر" },
    period: { en: "Nov 2020 — Present", ar: "نوفمبر 2020 — الآن" },
    badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    points: [
      {
        en: "Worked on SEO, social content, and campaign execution with a practical focus on visibility, conversion paths, and measurable user behavior.",
        ar: "العمل على تحسين محركات البحث، محتوى المنصات، وتنفيذ الحملات مع تركيز عملي على الظهور، مسارات التحويل، وسلوك المستخدم القابل للقياس."
      },
      {
        en: "Created copy, landing-page structures, and email workflows informed by analytics and real user actions.",
        ar: "صياغة محتوى، هياكل صفحات هبوط، ومسارات بريدية مبنية على التحليلات وأفعال المستخدمين الحقيقية."
      },
      {
        en: "Carried product and user-flow thinking from marketing work into software, automation, and portfolio systems.",
        ar: "نقل فهم المنتج ومسارات المستخدم من العمل التسويقي إلى البرمجة، الأتمتة، وبناء الأنظمة."
      }
    ]
  },
  {
    id: "technical-support",
    role: { en: "Senior Technical Support Specialist", ar: "أخصائي دعم فني متقدم" },
    company: { en: "Orange Egypt", ar: "Orange Egypt" },
    location: { en: "Cairo, Egypt", ar: "القاهرة، مصر" },
    period: { en: "Jan 2016 — Jan 2020", ar: "يناير 2016 — يناير 2020" },
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    points: [
      {
        en: "Handled network diagnostics, configuration issues, and LAN/WAN troubleshooting for operational and customer-facing environments.",
        ar: "التعامل مع تشخيص الشبكات، مشكلات الإعداد، وحل أعطال LAN/WAN في بيئات تشغيلية وبيئات مواجهة للعملاء."
      },
      {
        en: "Worked with user accounts, access structures, and internal support consoles, building a practical understanding of reliability and support workflows.",
        ar: "العمل مع حسابات المستخدمين، هياكل الوصول، ولوحات الدعم الداخلية، مما كوّن فهمًا عمليًا للاعتمادية ومسارات الدعم."
      },
      {
        en: "Developed a systems mindset around uptime, clear escalation paths, and tools that should make operational work easier.",
        ar: "تكوين عقلية أنظمة حول استمرارية التشغيل، وضوح مسارات التصعيد، والأدوات التي يجب أن تجعل العمل التشغيلي أسهل."
      }
    ]
  }
];
