export type Lang = "en" | "ar";

export type ArchitecturePresetId = "portfolio" | "quickshed" | "sieve" | "ai-agent" | "custom";

type Localized = { en: string; ar: string };

export interface ArchitectureNode {
  id: string;
  label: Localized;
  kind: Localized;
  x: number;
  y: number;
  status: "active" | "guarded" | "blocked" | "review";
}

export interface ArchitectureLink {
  from: string;
  to: string;
  label: Localized;
}

export interface ArchitecturePreset {
  id: ArchitecturePresetId;
  label: Localized;
  shortLabel: Localized;
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
  boundaries: Localized[];
}

export const ARCHITECTURE_PRESETS: Record<ArchitecturePresetId, ArchitecturePreset> = {
  portfolio: {
    id: "portfolio",
    label: { en: "Portfolio — Lead flow", ar: "البورتفوليو — مسار التواصل" },
    shortLabel: { en: "Portfolio", ar: "البورتفوليو" },
    mode: { en: "Lead capture pipeline", ar: "مسار التقاط تواصل" },
    signal: { en: "Contact form · Resend · PDF assets", ar: "نموذج تواصل · Resend · ملفات PDF" },
    state: { en: "Production path active", ar: "مسار إنتاجي نشط" },
    accent: "#FF3E00",
    tone: "orange",
    wireframe: false,
    speed: 1.15,
    particles: true,
    nodes: [
      { id: "visitor", label: { en: "Visitor", ar: "زائر" }, kind: { en: "Entry", ar: "دخول" }, x: 14, y: 52, status: "active" },
      { id: "proof", label: { en: "Project Proof", ar: "إثبات المشاريع" }, kind: { en: "Gallery", ar: "معرض" }, x: 36, y: 28, status: "active" },
      { id: "contact", label: { en: "Contact Form", ar: "نموذج التواصل" }, kind: { en: "Lead", ar: "تواصل" }, x: 42, y: 70, status: "active" },
      { id: "function", label: { en: "Vercel Function", ar: "دالة Vercel" }, kind: { en: "Serverless", ar: "بلا خادم" }, x: 66, y: 58, status: "guarded" },
      { id: "resend", label: { en: "Resend", ar: "Resend" }, kind: { en: "Delivery", ar: "إرسال" }, x: 84, y: 36, status: "active" },
      { id: "cv", label: { en: "Static CV PDFs", ar: "ملفات CV ثابتة" }, kind: { en: "Asset", ar: "ملف" }, x: 78, y: 78, status: "active" },
    ],
    links: [
      { from: "visitor", to: "proof", label: { en: "inspect", ar: "فحص" } },
      { from: "visitor", to: "contact", label: { en: "inquire", ar: "استفسار" } },
      { from: "contact", to: "function", label: { en: "POST", ar: "إرسال" } },
      { from: "function", to: "resend", label: { en: "email", ar: "بريد" } },
      { from: "visitor", to: "cv", label: { en: "download", ar: "تحميل" } },
    ],
    signals: [
      { en: "Real identity proof", ar: "إثبات هوية حقيقي" },
      { en: "CV access path", ar: "مسار وصول للسيرة" },
      { en: "Inbox delivery", ar: "إرسال إلى البريد" },
    ],
    boundaries: [
      { en: "No generated CV fallback", ar: "لا يوجد CV مولد كبديل" },
      { en: "Contact API validates inputs", ar: "API التواصل يتحقق من المدخلات" },
    ],
  },
  quickshed: {
    id: "quickshed",
    label: { en: "QuickShed — Local-first tooling", ar: "QuickShed — أدوات محلية" },
    shortLabel: { en: "QuickShed", ar: "QuickShed" },
    mode: { en: "Local-first utility system", ar: "نظام أدوات محلي" },
    signal: { en: "Browser runtime · zero account path", ar: "تشغيل داخل المتصفح · بدون حساب" },
    state: { en: "Privacy boundary active", ar: "حد الخصوصية نشط" },
    accent: "#FFBE00",
    tone: "yellow",
    wireframe: false,
    speed: 1.7,
    particles: true,
    nodes: [
      { id: "browser", label: { en: "User Browser", ar: "متصفح المستخدم" }, kind: { en: "Runtime", ar: "تشغيل" }, x: 15, y: 50, status: "active" },
      { id: "router", label: { en: "Tool Router", ar: "موجّه الأدوات" }, kind: { en: "Discovery", ar: "اكتشاف" }, x: 34, y: 28, status: "active" },
      { id: "tool", label: { en: "Utility Engine", ar: "محرك الأدوات" }, kind: { en: "Local", ar: "محلي" }, x: 52, y: 52, status: "active" },
      { id: "storage", label: { en: "Local Storage", ar: "تخزين محلي" }, kind: { en: "Device", ar: "الجهاز" }, x: 76, y: 28, status: "guarded" },
      { id: "output", label: { en: "Instant Result", ar: "نتيجة فورية" }, kind: { en: "Output", ar: "نتيجة" }, x: 80, y: 74, status: "active" },
    ],
    links: [
      { from: "browser", to: "router", label: { en: "choose", ar: "اختيار" } },
      { from: "router", to: "tool", label: { en: "execute", ar: "تنفيذ" } },
      { from: "tool", to: "storage", label: { en: "optional", ar: "اختياري" } },
      { from: "tool", to: "output", label: { en: "result", ar: "نتيجة" } },
    ],
    signals: [
      { en: "No account required", ar: "لا يحتاج حسابًا" },
      { en: "No server upload path", ar: "لا يوجد رفع للخادم" },
      { en: "AR/EN interface", ar: "واجهة عربية/إنجليزية" },
    ],
    boundaries: [
      { en: "Sensitive snippets stay local", ar: "المقاطع الحساسة تبقى محلية" },
      { en: "Browser-side processing", ar: "معالجة داخل المتصفح" },
    ],
  },
  sieve: {
    id: "sieve",
    label: { en: "SIEVE — Evidence gate", ar: "SIEVE — بوابة الأدلة" },
    shortLabel: { en: "SIEVE", ar: "SIEVE" },
    mode: { en: "Evidence screening gate", ar: "بوابة فحص الأدلة" },
    signal: { en: "Selection engine · decision blocked", ar: "محرك اختيار · القرار محظور" },
    state: { en: "Boundary enforcement visible", ar: "حدود النظام مرئية" },
    accent: "#22d3ee",
    tone: "cyan",
    wireframe: true,
    speed: 0.65,
    particles: true,
    nodes: [
      { id: "candidate", label: { en: "Candidate", ar: "مرشح" }, kind: { en: "Input", ar: "مدخل" }, x: 14, y: 50, status: "active" },
      { id: "screen", label: { en: "Screening Gate", ar: "بوابة الفحص" }, kind: { en: "Gate", ar: "بوابة" }, x: 34, y: 32, status: "guarded" },
      { id: "evidence", label: { en: "Evidence Board", ar: "لوحة الأدلة" }, kind: { en: "Trail", ar: "مسار" }, x: 55, y: 50, status: "active" },
      { id: "review", label: { en: "Human Review", ar: "مراجعة بشرية" }, kind: { en: "Check", ar: "تحقق" }, x: 76, y: 30, status: "review" },
      { id: "watchlist", label: { en: "Watchlist", ar: "قائمة متابعة" }, kind: { en: "Output", ar: "نتيجة" }, x: 78, y: 72, status: "active" },
      { id: "decision", label: { en: "Decision Engine", ar: "محرك القرار" }, kind: { en: "Blocked", ar: "محظور" }, x: 52, y: 78, status: "blocked" },
    ],
    links: [
      { from: "candidate", to: "screen", label: { en: "criteria", ar: "معايير" } },
      { from: "screen", to: "evidence", label: { en: "evidence", ar: "دليل" } },
      { from: "evidence", to: "review", label: { en: "review", ar: "مراجعة" } },
      { from: "evidence", to: "watchlist", label: { en: "qualify", ar: "تأهيل" } },
      { from: "screen", to: "decision", label: { en: "blocked", ar: "محظور" } },
    ],
    signals: [
      { en: "Evidence trail visible", ar: "مسار الأدلة مرئي" },
      { en: "Human review required", ar: "مراجعة بشرية مطلوبة" },
      { en: "Recommendation logic blocked", ar: "منطق التوصيات محظور" },
    ],
    boundaries: [
      { en: "Selection only", ar: "اختيار فقط" },
      { en: "No buy/sell outputs", ar: "لا توجد مخرجات بيع/شراء" },
    ],
  },
  "ai-agent": {
    id: "ai-agent",
    label: { en: "AI Workflow — Tool layer", ar: "مسار AI — طبقة الأدوات" },
    shortLabel: { en: "AI Workflow", ar: "مسار AI" },
    mode: { en: "Tool-assisted AI workflow", ar: "مسار AI مدعوم بالأدوات" },
    signal: { en: "Context · tool layer · review loop", ar: "سياق · طبقة أدوات · مراجعة" },
    state: { en: "Human-in-the-loop ready", ar: "جاهز لمراجعة بشرية" },
    accent: "#a855f7",
    tone: "purple",
    wireframe: false,
    speed: 1.35,
    particles: true,
    nodes: [
      { id: "input", label: { en: "Input", ar: "مدخل" }, kind: { en: "Request", ar: "طلب" }, x: 14, y: 52, status: "active" },
      { id: "context", label: { en: "Context", ar: "سياق" }, kind: { en: "Retrieval", ar: "استرجاع" }, x: 34, y: 30, status: "guarded" },
      { id: "tools", label: { en: "Tool Layer", ar: "طبقة الأدوات" }, kind: { en: "MCP/API", ar: "MCP/API" }, x: 54, y: 52, status: "active" },
      { id: "model", label: { en: "Model", ar: "نموذج" }, kind: { en: "Reasoning", ar: "استدلال" }, x: 74, y: 32, status: "active" },
      { id: "review", label: { en: "Review", ar: "مراجعة" }, kind: { en: "Human", ar: "بشرية" }, x: 84, y: 70, status: "review" },
      { id: "output", label: { en: "Output", ar: "مخرج" }, kind: { en: "Deliver", ar: "تسليم" }, x: 36, y: 76, status: "active" },
    ],
    links: [
      { from: "input", to: "context", label: { en: "scope", ar: "تحديد" } },
      { from: "context", to: "tools", label: { en: "ground", ar: "تدعيم" } },
      { from: "tools", to: "model", label: { en: "call", ar: "استدعاء" } },
      { from: "model", to: "review", label: { en: "check", ar: "تحقق" } },
      { from: "review", to: "output", label: { en: "ship", ar: "تسليم" } },
    ],
    signals: [
      { en: "Tool use is explicit", ar: "استخدام الأدوات واضح" },
      { en: "Review loop included", ar: "حلقة المراجعة موجودة" },
      { en: "Context before output", ar: "السياق قبل المخرج" },
    ],
    boundaries: [
      { en: "No autonomous deployment", ar: "لا يوجد نشر ذاتي" },
      { en: "Human review before action", ar: "مراجعة بشرية قبل الإجراء" },
    ],
  },
  custom: {
    id: "custom",
    label: { en: "Custom inspection state", ar: "حالة فحص مخصصة" },
    shortLabel: { en: "Custom", ar: "مخصص" },
    mode: { en: "Custom inspection state", ar: "حالة فحص مخصصة" },
    signal: { en: "Manual controls override preset", ar: "تحكم يدوي خارج السيناريو" },
    state: { en: "Operator tuning", ar: "ضبط بواسطة المشغّل" },
    accent: "#94a3b8",
    tone: "slate",
    wireframe: false,
    speed: 1.0,
    particles: true,
    nodes: [
      { id: "input", label: { en: "Input", ar: "مدخل" }, kind: { en: "Manual", ar: "يدوي" }, x: 20, y: 50, status: "active" },
      { id: "lab", label: { en: "Lab", ar: "مختبر" }, kind: { en: "Tuning", ar: "ضبط" }, x: 52, y: 50, status: "review" },
      { id: "output", label: { en: "Output", ar: "مخرج" }, kind: { en: "Preview", ar: "معاينة" }, x: 80, y: 50, status: "guarded" },
    ],
    links: [
      { from: "input", to: "lab", label: { en: "tune", ar: "ضبط" } },
      { from: "lab", to: "output", label: { en: "preview", ar: "معاينة" } },
    ],
    signals: [
      { en: "Manual override", ar: "تجاوز يدوي" },
      { en: "Visual inspection", ar: "فحص بصري" },
    ],
    boundaries: [
      { en: "No production mutation", ar: "لا تغيير إنتاجي" },
    ],
  },
};

export const PRESET_ORDER: ArchitecturePresetId[] = ["portfolio", "quickshed", "sieve", "ai-agent"];

export function getArchitecturePreset(id: string): ArchitecturePreset {
  return ARCHITECTURE_PRESETS[id as ArchitecturePresetId] ?? ARCHITECTURE_PRESETS.custom;
}
