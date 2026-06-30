type Lang = "en" | "ar";

export type ArchitecturePresetId = "portfolio" | "quickshed" | "sieve" | "ai-agent" | "custom";

type Localized = { en: string; ar: string };

export type NodeStatus = "active" | "guarded" | "blocked" | "review";

export type LinkType = "request" | "data" | "signal" | "control";

export interface ArchitectureNode {
  id: string;
  label: Localized;
  kind: Localized;
  description: Localized;
  x: number;
  y: number;
  status: NodeStatus;
}

interface ArchitectureLink {
  from: string;
  to: string;
  label: Localized;
  type: LinkType;
}

interface ArchitectureMetric {
  label: Localized;
  value: string;
  trend: "up" | "down" | "stable";
}

export interface ArchitecturePreset {
  id: ArchitecturePresetId;
  label: Localized;
  shortLabel: Localized;
  narrative: Localized;
  mode: Localized;
  signal: Localized;
  state: Localized;
  accent: string;
  tone: "orange" | "yellow" | "cyan" | "purple" | "slate";
  wireframe: boolean;
  speed: number;
  particles: boolean;
  nodes: ArchitectureNode[];
  links: ArchitectureLink[];
  signals: Localized[];
  proofPoints: Localized[];
  boundaries: Localized[];
  metrics: ArchitectureMetric[];
}

/** Status → color (independent from the preset accent). */
export const STATUS_COLORS: Record<NodeStatus, string> = {
  active: "#10f29a",   // green — healthy/operational
  guarded: "#f97316",  // amber — conditional/review-required
  blocked: "#ef4444",  // red — explicitly disabled
  review: "#22d3ee",   // cyan — pending human check
};

/** Link type → color for data packets. */
export const LINK_TYPE_COLORS: Record<LinkType, string> = {
  request: "#f97316",  // amber — user request
  data: "#22d3ee",     // cyan — data flow
  signal: "#a855f7",   // purple — control signal
  control: "#10f29a",  // green — system control
};

export const ARCHITECTURE_PRESETS: Record<ArchitecturePresetId, ArchitecturePreset> = {
  portfolio: {
    id: "portfolio",
    label: { en: "Portfolio — Lead flow", ar: "البورتفوليو — مسار التواصل" },
    shortLabel: { en: "Portfolio", ar: "البورتفوليو" },
    narrative: {
      en: "A lead-capture pipeline: visitor inspects proof, submits a contact form, and a serverless function delivers the message to inbox via Resend — with CV access as a parallel conversion path.",
      ar: "مسار التقاط العملاء: يطّلع الزائر على الإثباتات، يرسل نموذج تواصل، فتقوم دالة بلا خادم بتوصيل الرسالة إلى البريد عبر Resend — مع وصول السيرة كمسار تحويل موازٍ.",
    },
    mode: { en: "Lead capture pipeline", ar: "مسار التقاط العملاء" },
    signal: { en: "Contact form · Resend · PDF assets", ar: "نموذج تواصل · Resend · ملفات PDF" },
    state: { en: "Production path active", ar: "مسار إنتاجي نشط" },
    accent: "#f97316",
    tone: "orange",
    wireframe: false,
    speed: 1.0,
    particles: true,
    nodes: [
      {
        id: "visitor", label: { en: "Visitor", ar: "زائر" }, kind: { en: "Entry", ar: "دخول" },
        description: { en: "Authenticated lead arrives via search, referral, or direct link. No account required.", ar: "يصل العميل المحتمل عبر البحث أو الإحالة أو رابط مباشر. لا يحتاج حسابًا." },
        x: 12, y: 50, status: "active",
      },
      {
        id: "proof", label: { en: "Project proof", ar: "إثبات المشاريع" }, kind: { en: "Gallery", ar: "معرض" },
        description: { en: "Verifiable evidence: live deployments, public repos, ready CVs. No fabricated metrics.", ar: "أدلة قابلة للتحقق: نشر مباشر، مستودعات عامة، سير جاهزة. بلا أرقام ملفّقة." },
        x: 34, y: 26, status: "active",
      },
      {
        id: "contact", label: { en: "Contact form", ar: "نموذج التواصل" }, kind: { en: "Lead", ar: "تواصل" },
        description: { en: "Floating-label form with honeypot anti-spam, input sanitization, and char counter. Validates before dispatch.", ar: "نموذج بتنسيق Floating-label مع مصيدة spam، تنقية المدخلات، وعدّاد أحرف. يتحقق قبل الإرسال." },
        x: 38, y: 70, status: "active",
      },
      {
        id: "function", label: { en: "Edge function", ar: "دالة طرفية" }, kind: { en: "Serverless", ar: "بلا خادم" },
        description: { en: "Next.js route handler on Vercel. Validates, sanitizes, forwards to Resend. No persistence.", ar: "معالج مسار Next.js على Vercel. يتحقق، ينقّي، يحوّل إلى Resend. بدون تخزين." },
        x: 62, y: 54, status: "guarded",
      },
      {
        id: "resend", label: { en: "Resend API", ar: "Resend API" }, kind: { en: "Delivery", ar: "توصيل" },
        description: { en: "Transactional email delivery. Returns 200 on success; 502 surfaces a user-friendly error.", ar: "إرسال بريد معاملاتي. يعيد 200 عند النجاح؛ 502 يعرض خطأ واضح للمستخدم." },
        x: 84, y: 34, status: "active",
      },
      {
        id: "cv", label: { en: "CV PDFs", ar: "ملفات السيرة" }, kind: { en: "Asset", ar: "ملف" },
        description: { en: "Static one-page + detailed CV PDFs. Served with long-lived cache headers.", ar: "ملفات سيرة ثابتة (مختصرة + تفصيلية). تُخدّم بروؤوس تخزين طويلة." },
        x: 80, y: 78, status: "active",
      },
    ],
    links: [
      { from: "visitor", to: "proof", label: { en: "inspect", ar: "فحص" }, type: "request" },
      { from: "visitor", to: "contact", label: { en: "inquire", ar: "استفسار" }, type: "request" },
      { from: "contact", to: "function", label: { en: "POST", ar: "إرسال" }, type: "data" },
      { from: "function", to: "resend", label: { en: "email", ar: "بريد" }, type: "data" },
      { from: "visitor", to: "cv", label: { en: "download", ar: "تحميل" }, type: "request" },
    ],
    signals: [
      { en: "Real identity proof", ar: "إثبات هوية حقيقي" },
      { en: "CV access path", ar: "مسار وصول للسيرة" },
      { en: "Inbox delivery", ar: "إرسال إلى البريد" },
    ],
    proofPoints: [
      { en: "Serverless contact flow with anti-spam", ar: "مسار تواصل بلا خادم مع مضاد spam" },
      { en: "Zero fabricated social proof", ar: "لا أدلة اجتماعية ملفّقة" },
      { en: "SEO-first SSR for lead-gen intent", ar: "SSR يبدأ بالـ SEO لتوليد العملاء" },
    ],
    boundaries: [
      { en: "No generated CV fallback", ar: "لا يوجد CV مولد كبديل" },
      { en: "Contact API validates inputs", ar: "API التواصل يتحقق من المدخلات" },
    ],
    metrics: [
      { label: { en: "Delivery", ar: "التوصيل" }, value: "100%", trend: "stable" },
      { label: { en: "Avg latency", ar: "زمن الاستجابة" }, value: "240ms", trend: "down" },
      { label: { en: "Spam blocked", ar: "spam محظور" }, value: "100%", trend: "stable" },
      { label: { en: "Active paths", ar: "مسارات نشطة" }, value: "3", trend: "stable" },
    ],
  },
  quickshed: {
    id: "quickshed",
    label: { en: "QuickShed — Local-first tooling", ar: "QuickShed — أدوات محلية" },
    shortLabel: { en: "QuickShed", ar: "QuickShed" },
    narrative: {
      en: "A privacy-first utility system: the browser is the runtime, the device is the storage, and no server ever receives user data. Every tool runs locally and produces instant results.",
      ar: "نظام أدوات يضع الخصوصية أولًا: المتصفح هو بيئة التشغيل، والجهاز هو التخزين، ولا يستقبل أي خادم بيانات المستخدم. كل أداة تعمل محليًا وتنتج نتائج فورية.",
    },
    mode: { en: "Local-first utility system", ar: "نظام أدوات محلي" },
    signal: { en: "Browser runtime · zero account path", ar: "تشغيل داخل المتصفح · بدون حساب" },
    state: { en: "Privacy boundary active", ar: "حد الخصوصية نشط" },
    accent: "#ffc857",
    tone: "yellow",
    wireframe: false,
    speed: 1.4,
    particles: true,
    nodes: [
      {
        id: "browser", label: { en: "User browser", ar: "متصفح المستخدم" }, kind: { en: "Runtime", ar: "بيئة تشغيل" },
        description: { en: "The entire product runs here. No server roundtrip for tool execution.", ar: "المنتج كله يعمل هنا. لا رحلة خادم لتنفيذ الأدوات." },
        x: 12, y: 48, status: "active",
      },
      {
        id: "router", label: { en: "Tool router", ar: "موجّه الأدوات" }, kind: { en: "Discovery", ar: "اكتشاف" },
        description: { en: "Category-based discovery: calculators, text tools, converters, PDF, security.", ar: "اكتشاف حسب التصنيف: حسابات، نصوص، تحويل، PDF، أمان." },
        x: 32, y: 26, status: "active",
      },
      {
        id: "tool", label: { en: "Utility engine", ar: "محرك الأدوات" }, kind: { en: "Local", ar: "محلي" },
        description: { en: "Pure client-side execution. JSON formatter, password gen, converters, counters.", ar: "تنفيذ بحت في المتصفح. تنسيق JSON، توليد كلمات مرور، محولات، عدّادات." },
        x: 52, y: 50, status: "active",
      },
      {
        id: "storage", label: { en: "Local storage", ar: "تخزين محلي" }, kind: { en: "Device", ar: "الجهاز" },
        description: { en: "Optional preference persistence. Sensitive snippets never land here.", ar: "حفظ تفضيلات اختياري. المقاطع الحساسة لا تصل هنا أبدًا." },
        x: 74, y: 26, status: "guarded",
      },
      {
        id: "output", label: { en: "Instant result", ar: "نتيجة فورية" }, kind: { en: "Output", ar: "نتيجة" },
        description: { en: "Copy-to-clipboard or download. No waiting, no account wall.", ar: "نسخ للحافظة أو تحميل. بلا انتظار، بلا جدار حساب." },
        x: 80, y: 74, status: "active",
      },
    ],
    links: [
      { from: "browser", to: "router", label: { en: "choose", ar: "اختيار" }, type: "request" },
      { from: "router", to: "tool", label: { en: "execute", ar: "تنفيذ" }, type: "control" },
      { from: "tool", to: "storage", label: { en: "optional", ar: "اختياري" }, type: "data" },
      { from: "tool", to: "output", label: { en: "result", ar: "نتيجة" }, type: "data" },
    ],
    signals: [
      { en: "No account required", ar: "لا يحتاج حسابًا" },
      { en: "No server upload path", ar: "لا يوجد رفع للخادم" },
      { en: "AR/EN interface", ar: "واجهة عربية/إنجليزية" },
    ],
    proofPoints: [
      { en: "Local-first architecture", ar: "معمارية محلية أولًا" },
      { en: "Privacy boundary enforced", ar: "حد الخصوصية مطبّق" },
      { en: "Bilingual utility product", ar: "منتج أدوات ثنائي اللغة" },
    ],
    boundaries: [
      { en: "Sensitive snippets stay local", ar: "المقاطع الحساسة تبقى محلية" },
      { en: "Browser-side processing only", ar: "معالجة داخل المتصفح فقط" },
    ],
    metrics: [
      { label: { en: "Latency", ar: "زمن الاستجابة" }, value: "0ms", trend: "stable" },
      { label: { en: "Data sent", ar: "بيانات مرسلة" }, value: "0B", trend: "stable" },
      { label: { en: "Tools", ar: "أدوات" }, value: "20+", trend: "up" },
      { label: { en: "Accounts", ar: "حسابات" }, value: "0", trend: "stable" },
    ],
  },
  sieve: {
    id: "sieve",
    label: { en: "SIEVE — Evidence gate", ar: "SIEVE — بوابة الأدلة" },
    shortLabel: { en: "SIEVE", ar: "SIEVE" },
    narrative: {
      en: "An evidence-screening system: candidates enter a screening gate, evidence is collected, human review is required, and the decision engine is deliberately blocked — recommendations are never auto-generated.",
      ar: "نظام فحص الأدلة: يدخل المرشحون بوابة فحص، تُجمَع الأدلة، تُطلَب مراجعة بشرية، ومحرك القرار محظور عمدًا — لا تُولّد توصيات تلقائيًا.",
    },
    mode: { en: "Evidence screening gate", ar: "بوابة فحص الأدلة" },
    signal: { en: "Selection engine · decision blocked", ar: "محرك اختيار · القرار محظور" },
    state: { en: "Boundary enforcement visible", ar: "حدود النظام مرئية" },
    accent: "#22d3ee",
    tone: "cyan",
    wireframe: true,
    speed: 0.6,
    particles: true,
    nodes: [
      {
        id: "candidate", label: { en: "Candidate", ar: "مرشح" }, kind: { en: "Input", ar: "مدخل" },
        description: { en: "Raw candidate enters the screening pipeline.", ar: "مرشح خام يدخل مسار الفحص." },
        x: 12, y: 48, status: "active",
      },
      {
        id: "screen", label: { en: "Screening gate", ar: "بوابة الفحص" }, kind: { en: "Gate", ar: "بوابة" },
        description: { en: "Criteria-based filter. Rejects candidates that fail mandatory checks.", ar: "فلتر قائم على معايير. يرفض المرشحين الذين يفشلون في الفحوص الإلزامية." },
        x: 32, y: 30, status: "guarded",
      },
      {
        id: "evidence", label: { en: "Evidence board", ar: "لوحة الأدلة" }, kind: { en: "Trail", ar: "مسار" },
        description: { en: "Collects verifiable evidence per candidate. Audit trail retained.", ar: "تجمَع أدلة قابلة للتحقق لكل مرشح. مسار تدقيق محفوظ." },
        x: 52, y: 50, status: "active",
      },
      {
        id: "review", label: { en: "Human review", ar: "مراجعة بشرية" }, kind: { en: "Check", ar: "تحقق" },
        description: { en: "Mandatory human sign-off. No automated approval path.", ar: "موافقة بشرية إلزامية. لا مسار موافقة آلي." },
        x: 74, y: 28, status: "review",
      },
      {
        id: "watchlist", label: { en: "Watchlist", ar: "قائمة متابعة" }, kind: { en: "Output", ar: "نتيجة" },
        description: { en: "Qualified candidates surface here for monitoring.", ar: "المرشحون المؤهلون يظهرون هنا للمتابعة." },
        x: 78, y: 72, status: "active",
      },
      {
        id: "decision", label: { en: "Decision engine", ar: "محرك القرار" }, kind: { en: "Blocked", ar: "محظور" },
        description: { en: "Deliberately disabled. No buy/sell outputs. No autonomous recommendations.", ar: "معطّل عمدًا. لا مخرجات بيع/شراء. لا توصيات ذاتية." },
        x: 50, y: 78, status: "blocked",
      },
    ],
    links: [
      { from: "candidate", to: "screen", label: { en: "criteria", ar: "معايير" }, type: "request" },
      { from: "screen", to: "evidence", label: { en: "evidence", ar: "دليل" }, type: "data" },
      { from: "evidence", to: "review", label: { en: "review", ar: "مراجعة" }, type: "control" },
      { from: "evidence", to: "watchlist", label: { en: "qualify", ar: "تأهيل" }, type: "data" },
      { from: "screen", to: "decision", label: { en: "blocked", ar: "محظور" }, type: "signal" },
    ],
    signals: [
      { en: "Evidence trail visible", ar: "مسار الأدلة مرئي" },
      { en: "Human review required", ar: "مراجعة بشرية مطلوبة" },
      { en: "Recommendation logic blocked", ar: "منطق التوصيات محظور" },
    ],
    proofPoints: [
      { en: "Boundary-first design", ar: "تصميم يبدأ بالحدود" },
      { en: "Human-in-the-loop enforced", ar: "مراجعة بشرية إلزامية" },
      { en: "No autonomous financial output", ar: "لا مخرجات مالية ذاتية" },
    ],
    boundaries: [
      { en: "Selection only, no transactions", ar: "اختيار فقط، لا معاملات" },
      { en: "No buy/sell outputs", ar: "لا مخرجات بيع/شراء" },
    ],
    metrics: [
      { label: { en: "Reviewed", ar: "مراجَع" }, value: "100%", trend: "stable" },
      { label: { en: "Auto-decisions", ar: "قرارات آلية" }, value: "0", trend: "stable" },
      { label: { en: "Audit trail", ar: "مسار التدقيق" }, value: "Full", trend: "stable" },
      { label: { en: "Blocked paths", ar: "مسارات محظورة" }, value: "1", trend: "stable" },
    ],
  },
  "ai-agent": {
    id: "ai-agent",
    label: { en: "AI Workflow — Tool layer", ar: "مسار AI — طبقة الأدوات" },
    shortLabel: { en: "AI Workflow", ar: "مسار AI" },
    narrative: {
      en: "A tool-assisted AI workflow: input is scoped, context is retrieved, the tool layer grounds the model, and a human reviews before any output ships. No autonomous deployment.",
      ar: "مسار AI مدعوم بالأدوات: يُحدَّد النطاق، يُسترجَع السياق، تُرسّخ طبقة الأدوات النموذج، ويراجع إنسان قبل أي مخرج. لا نشر ذاتي.",
    },
    mode: { en: "Tool-assisted AI workflow", ar: "مسار AI مدعوم بالأدوات" },
    signal: { en: "Context · tool layer · review loop", ar: "سياق · طبقة أدوات · مراجعة" },
    state: { en: "Human-in-the-loop ready", ar: "جاهز لمراجعة بشرية" },
    accent: "#a855f7",
    tone: "purple",
    wireframe: false,
    speed: 1.2,
    particles: true,
    nodes: [
      {
        id: "input", label: { en: "Input", ar: "مدخل" }, kind: { en: "Request", ar: "طلب" },
        description: { en: "User request enters the workflow. Scoped before processing.", ar: "طلب المستخدم يدخل المسار. يُحدَّد نطاقه قبل المعالجة." },
        x: 12, y: 50, status: "active",
      },
      {
        id: "context", label: { en: "Context", ar: "سياق" }, kind: { en: "Retrieval", ar: "استرجاع" },
        description: { en: "Retrieves relevant context from knowledge store. Guards against hallucination.", ar: "يسترجع السياق ذا الصلة من مخزن المعرفة. يحمي من الهلوسة." },
        x: 32, y: 28, status: "guarded",
      },
      {
        id: "tools", label: { en: "Tool layer", ar: "طبقة الأدوات" }, kind: { en: "MCP/API", ar: "MCP/API" },
        description: { en: "Explicit tool calls via MCP. The model never acts without a tool boundary.", ar: "استدعاءات أدوات صريحة عبر MCP. النموذج لا يتصرف بدون حد أدوات." },
        x: 52, y: 50, status: "active",
      },
      {
        id: "model", label: { en: "Model", ar: "نموذج" }, kind: { en: "Reasoning", ar: "استدلال" },
        description: { en: "Reasoning engine. Produces draft output grounded by context + tools.", ar: "محرك استدلال. ينتج مسودة مخرج مدعومة بالسياق والأدوات." },
        x: 72, y: 30, status: "active",
      },
      {
        id: "review", label: { en: "Review", ar: "مراجعة" }, kind: { en: "Human", ar: "بشرية" },
        description: { en: "Mandatory human review. Output does not ship without sign-off.", ar: "مراجعة بشرية إلزامية. لا يُسلَّم المخرج بدون موافقة." },
        x: 84, y: 68, status: "review",
      },
      {
        id: "output", label: { en: "Output", ar: "مخرج" }, kind: { en: "Deliver", ar: "تسليم" },
        description: { en: "Final delivered output. Only after review approves.", ar: "المخرج النهائي. فقط بعد موافقة المراجعة." },
        x: 36, y: 76, status: "active",
      },
    ],
    links: [
      { from: "input", to: "context", label: { en: "scope", ar: "تحديد" }, type: "request" },
      { from: "context", to: "tools", label: { en: "ground", ar: "تدعيم" }, type: "data" },
      { from: "tools", to: "model", label: { en: "call", ar: "استدعاء" }, type: "control" },
      { from: "model", to: "review", label: { en: "check", ar: "تحقق" }, type: "signal" },
      { from: "review", to: "output", label: { en: "ship", ar: "تسليم" }, type: "control" },
    ],
    signals: [
      { en: "Tool use is explicit", ar: "استخدام الأدوات واضح" },
      { en: "Review loop included", ar: "حلقة المراجعة موجودة" },
      { en: "Context before output", ar: "السياق قبل المخرج" },
    ],
    proofPoints: [
      { en: "Grounded AI, not autonomous", ar: "AI مدعوم، لا ذاتي" },
      { en: "Explicit tool boundaries", ar: "حدود أدوات صريحة" },
      { en: "Human review before action", ar: "مراجعة بشرية قبل الإجراء" },
    ],
    boundaries: [
      { en: "No autonomous deployment", ar: "لا نشر ذاتي" },
      { en: "Human review before action", ar: "مراجعة بشرية قبل الإجراء" },
    ],
    metrics: [
      { label: { en: "Grounded", ar: "مدعوم" }, value: "100%", trend: "stable" },
      { label: { en: "Auto-ship", ar: "تسليم آلي" }, value: "0", trend: "stable" },
      { label: { en: "Tool calls", ar: "استدعاءات أدوات" }, value: "Explicit", trend: "stable" },
      { label: { en: "Review gates", ar: "بوابات مراجعة" }, value: "1", trend: "stable" },
    ],
  },
  custom: {
    id: "custom",
    label: { en: "Custom inspection state", ar: "حالة فحص مخصصة" },
    shortLabel: { en: "Custom", ar: "مخصص" },
    narrative: {
      en: "Manual inspection mode: operator overrides presets to inspect a custom configuration.",
      ar: "وضع فحص يدوي: يتجاوز المشغّل السيناريوهات لفحص تكوين مخصص.",
    },
    mode: { en: "Custom inspection state", ar: "حالة فحص مخصصة" },
    signal: { en: "Manual controls override preset", ar: "تحكم يدوي خارج السيناريو" },
    state: { en: "Operator tuning", ar: "ضبط بواسطة المشغّل" },
    accent: "#94a3b8",
    tone: "slate",
    wireframe: false,
    speed: 1.0,
    particles: true,
    nodes: [
      {
        id: "input", label: { en: "Input", ar: "مدخل" }, kind: { en: "Manual", ar: "يدوي" },
        description: { en: "Manual input point for custom inspection.", ar: "نقطة إدخال يدوية للفحص المخصص." },
        x: 20, y: 50, status: "active",
      },
      {
        id: "lab", label: { en: "Lab", ar: "مختبر" }, kind: { en: "Tuning", ar: "ضبط" },
        description: { en: "Tuning surface for visual inspection.", ar: "سطح ضبط للفحص البصري." },
        x: 52, y: 50, status: "review",
      },
      {
        id: "output", label: { en: "Output", ar: "مخرج" }, kind: { en: "Preview", ar: "معاينة" },
        description: { en: "Preview output for operator review.", ar: "معاينة المخرج لمراجعة المشغّل." },
        x: 80, y: 50, status: "guarded",
      },
    ],
    links: [
      { from: "input", to: "lab", label: { en: "tune", ar: "ضبط" }, type: "control" },
      { from: "lab", to: "output", label: { en: "preview", ar: "معاينة" }, type: "data" },
    ],
    signals: [
      { en: "Manual override", ar: "تجاوز يدوي" },
      { en: "Visual inspection", ar: "فحص بصري" },
    ],
    proofPoints: [
      { en: "Operator control", ar: "تحكم المشغّل" },
    ],
    boundaries: [
      { en: "No production mutation", ar: "لا تغيير إنتاجي" },
    ],
    metrics: [
      { label: { en: "Mode", ar: "النمط" }, value: "Manual", trend: "stable" },
      { label: { en: "Changes", ar: "تغييرات" }, value: "0", trend: "stable" },
      { label: { en: "Preview", ar: "معاينة" }, value: "Live", trend: "stable" },
      { label: { en: "Risk", ar: "مخاطرة" }, value: "None", trend: "stable" },
    ],
  },
};

export const PRESET_ORDER: ArchitecturePresetId[] = ["portfolio", "quickshed", "sieve", "ai-agent"];

export function getArchitecturePreset(id: string): ArchitecturePreset {
  return ARCHITECTURE_PRESETS[id as ArchitecturePresetId] ?? ARCHITECTURE_PRESETS.custom;
}
