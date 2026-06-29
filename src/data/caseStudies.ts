import { FEATURES } from "../config/features";
import { CaseStudy } from "../types/caseStudy";

export const CASE_STUDIES: CaseStudy[] = [
  {
    projectId: "quickshed",
    slug: "quickshed",
    status: "draft",
    title: { en: "QuickShed", ar: "كويك شيد" },
    summary: {
      en: "A local-first utility workspace for everyday browser tools, built around privacy, bilingual access, and fast repeated workflows.",
      ar: "مساحة أدوات محلية داخل المتصفح للاستخدام اليومي، مبنية حول الخصوصية، دعم العربية والإنجليزية، وسرعة تكرار المهام."
    },
    problem: {
      en: "Common online utilities often require users to paste sensitive snippets into unknown third-party sites. QuickShed turns those repeated tasks into a single workspace that can run directly in the browser.",
      ar: "الأدوات المنتشرة على الإنترنت كثيرًا ما تدفع المستخدم لوضع نصوص أو بيانات حساسة داخل مواقع غير معروفة. QuickShed يحول هذه المهام المتكررة إلى مساحة واحدة تعمل داخل المتصفح."
    },
    role: {
      en: "Owned product direction, interface structure, bilingual UX, utility grouping, and deployment readiness.",
      ar: "مسؤول عن اتجاه المنتج، بنية الواجهة، تجربة الاستخدام ثنائية اللغة، تنظيم الأدوات، وجاهزية النشر."
    },
    decisions: [
      {
        title: { en: "Local-first processing", ar: "معالجة محلية أولًا" },
        body: { en: "Prioritized browser-side workflows to reduce unnecessary server transfer for common utility tasks.", ar: "تم إعطاء الأولوية للمعالجة داخل المتصفح لتقليل نقل البيانات للخادم في مهام الأدوات اليومية." }
      },
      {
        title: { en: "Category-based discovery", ar: "اكتشاف حسب التصنيف" },
        body: { en: "Grouped tools by real use cases so users can find formatters, generators, converters, and calculators faster.", ar: "تم تنظيم الأدوات حسب حالات الاستخدام الفعلية لتسهيل الوصول إلى أدوات التنسيق والتوليد والتحويل والحساب." }
      },
      {
        title: { en: "Bilingual workflow", ar: "مسار ثنائي اللغة" },
        body: { en: "Designed Arabic and English access as part of the product flow, not as a superficial translation layer.", ar: "تم التعامل مع العربية والإنجليزية كجزء من مسار المنتج، لا كطبقة ترجمة سطحية." }
      }
    ],
    challenges: [
      {
        title: { en: "Trust without accounts", ar: "ثقة بدون حسابات" },
        body: { en: "The product needed to communicate privacy and usefulness quickly without asking users to sign up first.", ar: "كان المنتج يحتاج لإيصال الخصوصية والفائدة بسرعة بدون مطالبة المستخدم بإنشاء حساب." }
      }
    ],
    outcomes: [
      { label: { en: "Processing", ar: "المعالجة" }, value: "Local" },
      { label: { en: "Interface", ar: "الواجهة" }, value: "AR/EN" },
      { label: { en: "Access", ar: "الوصول" }, value: "No account" }
    ],
    artifacts: [
      {
        label: { en: "Live product", ar: "المنتج الحي" },
        description: { en: "Public deployment for hands-on validation.", ar: "نشر عام يسمح بالتحقق العملي." },
        href: "https://quickshed.vercel.app"
      },
      {
        label: { en: "Source", ar: "الكود" },
        description: { en: "Repository for implementation review.", ar: "مستودع الكود للمراجعة التقنية." },
        href: "https://github.com/Habib1001-m/quickshed"
      }
    ],
    verification: {
      en: "Live deployment and source repository available for validation.",
      ar: "النشر الحي ومستودع الكود متاحان للتحقق."
    },
    publishNotes: {
      en: "Draft needs final metrics, screenshots, and outcome wording before public case-study publishing.",
      ar: "المسودة تحتاج أرقام نهائية ولقطات وصياغة نتائج قبل النشر العام كدراسة حالة."
    }
  },
  {
    projectId: "sieve",
    slug: "sieve-research-os",
    status: "restricted",
    title: { en: "SIEVE Research OS", ar: "SIEVE: نظام تشغيل الأبحاث" },
    summary: {
      en: "A research console for evidence screening, review states, watchlist readiness, and visible decision boundaries.",
      ar: "واجهة بحثية لفحص الأدلة، حالات المراجعة، جاهزية قائمة المتابعة، وحدود القرار المرئية."
    },
    problem: {
      en: "Research-heavy evaluation can become scattered across chats and spreadsheets. SIEVE makes gates, evidence gaps, and review states visible in one controlled workspace.",
      ar: "التقييم البحثي قد يتشتت بين المحادثات والجداول. SIEVE يجعل البوابات وفجوات الأدلة وحالات المراجعة واضحة داخل مساحة واحدة مضبوطة."
    },
    role: {
      en: "Defined the workflow, boundaries, screening states, evidence model, UI structure, and proof screenshots.",
      ar: "تم تحديد مسار العمل، الحدود، حالات الفحص، نموذج الأدلة، بنية الواجهة، ولقطات الإثبات."
    },
    decisions: [
      {
        title: { en: "Selection, not recommendation", ar: "اختيار لا توصية" },
        body: { en: "The system separates screening from recommendation so the product can support research without pretending to make final decisions.", ar: "يفصل النظام بين الفحص والتوصية حتى يدعم البحث دون ادعاء اتخاذ قرارات نهائية." }
      },
      {
        title: { en: "Visible evidence gaps", ar: "فجوات أدلة مرئية" },
        body: { en: "Evidence confidence, source reliability, conflicts, and missing-data gaps are treated as first-class interface elements.", ar: "يتم التعامل مع ثقة الأدلة وموثوقية المصادر والتعارضات وفجوات البيانات كعناصر أساسية في الواجهة." }
      }
    ],
    challenges: [
      {
        title: { en: "Making reasoning auditable", ar: "جعل التفكير قابلًا للمراجعة" },
        body: { en: "The interface needed to expose why an item is qualified, blocked, watched, or escalated to human review.", ar: "كان مطلوبًا أن توضح الواجهة لماذا يكون العنصر مؤهلًا أو محظورًا أو قيد المراقبة أو بحاجة لمراجعة بشرية." }
      }
    ],
    outcomes: [
      { label: { en: "Mode", ar: "الوضع" }, value: "Research" },
      { label: { en: "Trail", ar: "المسار" }, value: "Visible" },
      { label: { en: "Recommendations", ar: "التوصيات" }, value: "Blocked" }
    ],
    artifacts: [
      {
        label: { en: "Walkthrough", ar: "عرض توضيحي" },
        description: { en: "Restricted walkthrough available on request.", ar: "عرض توضيحي محدود متاح عند الطلب." },
        restrictedAccess: true
      },
      {
        label: { en: "Screenshots", ar: "لقطات" },
        description: { en: "Portfolio modal includes product proof screenshots.", ar: "نافذة المشروع في البورتفوليو تتضمن لقطات إثبات من المنتج." }
      }
    ],
    verification: {
      en: "Restricted prototype — source and live walkthrough available on request.",
      ar: "نموذج محدود — الكود والعرض الحي متاحان عند الطلب."
    },
    publishNotes: {
      en: "Keep public wording careful: private prototype, no public source link, no exaggerated claims.",
      ar: "يجب أن تظل الصياغة العامة حذرة: نموذج خاص، لا رابط كود عام، ولا ادعاءات مبالغ فيها."
    }
  },
  {
    projectId: "portfolio",
    slug: "mohamed-habib-portfolio",
    status: "draft",
    title: { en: "Mohamed Habib Portfolio", ar: "بورتفوليو محمد حبيب" },
    summary: {
      en: "A bilingual personal brand system with real contact delivery, CV access, project proof, and a systems-oriented architecture lab.",
      ar: "نظام علامة شخصية ثنائي اللغة مع إرسال تواصل حقيقي، وصول للسيرة الذاتية، إثباتات مشاريع، ومختبر معماري موجه للأنظمة."
    },
    problem: {
      en: "A portfolio must do more than look good: it needs to prove identity, show credible work, support recruiter flow, and make contact low-friction.",
      ar: "البورتفوليو يجب أن يفعل أكثر من الشكل الجميل: يجب أن يثبت الهوية، يعرض عملًا موثوقًا، يدعم مسار مسؤولي التوظيف، ويجعل التواصل سهلًا."
    },
    role: {
      en: "Owned positioning, bilingual content structure, design system consolidation, contact flow, CV delivery, project proof, and deployment readiness.",
      ar: "مسؤول عن التموضع، بنية المحتوى ثنائي اللغة، توحيد نظام التصميم، مسار التواصل، تسليم السيرة، إثبات المشاريع، وجاهزية النشر."
    },
    decisions: [
      {
        title: { en: "Design system before motion", ar: "نظام التصميم قبل الحركة" },
        body: { en: "The site prioritized shared primitives and consistent spacing before adding cinematic motion.", ar: "تم إعطاء الأولوية لعناصر التصميم المشتركة واتساق المسافات قبل إضافة الحركة السينمائية." }
      },
      {
        title: { en: "Gated trust features", ar: "ميزات ثقة محكومة" },
        body: { en: "Testimonials and booking are prepared behind flags but hidden until real content and process readiness exist.", ar: "تم تجهيز التوصيات والحجز خلف بوابات تشغيل لكنها مخفية حتى تتوفر الداتا الحقيقية وجاهزية العملية." }
      },
      {
        title: { en: "Bilingual by default", ar: "ثنائية اللغة كأساس" },
        body: { en: "Arabic and English are treated as core product modes with RTL/LTR support.", ar: "يتم التعامل مع العربية والإنجليزية كوضعين أساسيين للمنتج مع دعم RTL/LTR." }
      }
    ],
    challenges: [
      {
        title: { en: "Balancing polish and proof", ar: "الموازنة بين الشكل والإثبات" },
        body: { en: "The portfolio needed visual polish without losing technical credibility or turning into a purely decorative landing page.", ar: "كان المطلوب تحقيق جودة بصرية دون فقدان المصداقية التقنية أو التحول إلى صفحة شكلية فقط." }
      }
    ],
    outcomes: [
      { label: { en: "Languages", ar: "اللغات" }, value: "AR/EN" },
      { label: { en: "Contact", ar: "التواصل" }, value: "Resend" },
      { label: { en: "Deployment", ar: "النشر" }, value: "Vercel" }
    ],
    artifacts: [
      {
        label: { en: "Live site", ar: "الموقع الحي" },
        description: { en: "Current deployed portfolio.", ar: "نسخة البورتفوليو المنشورة حاليًا." },
        href: "https://mohamed-habib-portfolio-opal.vercel.app"
      },
      {
        label: { en: "Source", ar: "الكود" },
        description: { en: "Repository for implementation validation.", ar: "مستودع الكود للتحقق من التنفيذ." },
        href: "https://github.com/Habib1001-m/mohamed-habib-portfolio"
      }
    ],
    verification: {
      en: "Live deployment, source repository, CV files, and contact form are available for validation.",
      ar: "النشر الحي، مستودع الكود، ملفات السيرة، ونموذج التواصل متاحون للتحقق."
    },
    publishNotes: {
      en: "Draft should be expanded with before/after screenshots and sprint timeline before being made public as a full case study.",
      ar: "تحتاج المسودة إلى لقطات قبل/بعد وخط زمني للمراحل قبل نشرها كدراسة حالة كاملة."
    }
  }
];

export const PUBLIC_CASE_STUDIES = FEATURES.caseStudies
  ? CASE_STUDIES.filter((caseStudy) => caseStudy.status === "ready")
  : [];

export function getCaseStudyByProjectId(projectId: string) {
  return CASE_STUDIES.find((caseStudy) => caseStudy.projectId === projectId) ?? null;
}

export function getCaseStudyBySlug(slug: string) {
  return CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug) ?? null;
}
