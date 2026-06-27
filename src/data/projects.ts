import { Project } from "../types/portfolio";

export const PROJECTS_LIST: Project[] = [
  {
    id: "quickshed",
    title: { en: "QuickShed", ar: "كويك شيد" },
    tagline: {
      en: "A privacy-focused browser workspace with local-first tools that run directly on the user device.",
      ar: "مساحة أدوات داخل المتصفح تعمل بنمط محلي وتحافظ على بيانات المستخدم على جهازه."
    },
    description: {
      en: "A practical toolkit for developers and everyday users who need formatters, calculators, generators, converters, and text utilities without accounts or server uploads.",
      ar: "صندوق أدوات عملي للمطورين والمستخدمين اليوميين: تنسيق، حسابات، توليد، تحويل، وأدوات نصية بدون حسابات أو رفع بيانات للخادم."
    },
    longDescription: {
      en: "QuickShed is built for repeat utility work: formatting JSON, generating passwords, converting data, counting text, calculating values, and handling sensitive snippets without pasting them into unknown third-party tools. The product emphasizes local processing, bilingual Arabic/English usage, category-based discovery, and quick access patterns for daily work.",
      ar: "تم بناء QuickShed لأعمال الأدوات المتكررة: تنسيق JSON، توليد كلمات مرور، تحويل البيانات، عدّ النصوص، حساب القيم، والتعامل مع مقاطع حساسة دون وضعها داخل أدوات خارجية غير موثوقة. يركّز المنتج على المعالجة المحلية، دعم العربية والإنجليزية، اكتشاف الأدوات حسب التصنيف، والوصول السريع للاستخدام اليومي."
    },
    category: { en: "Privacy tooling", ar: "أدوات خصوصية" },
    status: { en: "Live", ar: "متاح" },
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "PWA", "Browser APIs", "RTL/LTR"],
    image: "/images/projects/quickshed-cover.webp",
    gallery: [
      {
        src: "/images/projects/quickshed-tool-password.webp",
        label: { en: "Tool in use", ar: "أداة قيد الاستخدام" },
        caption: { en: "Password generator with controls, generated output, and strength feedback.", ar: "مولد كلمات مرور مع إعدادات، نتيجة فورية، ومؤشر قوة." }
      },
      {
        src: "/images/projects/quickshed-tool-arabic.webp",
        label: { en: "Arabic tool flow", ar: "تدفق أداة بالعربية" },
        caption: { en: "RTL interface proof inside an actual utility workflow.", ar: "دليل دعم RTL داخل أداة عملية حقيقية." }
      },
      {
        src: "/images/projects/quickshed-features.webp",
        label: { en: "Category system", ar: "نظام التصنيفات" },
        caption: { en: "Category-based discovery across calculators, text tools, converters, PDF tools, and security utilities.", ar: "اكتشاف الأدوات عبر تصنيفات للحسابات، النصوص، التحويل، PDF، والأمان." }
      },
      {
        src: "/images/projects/quickshed-mobile.webp",
        label: { en: "Mobile proof", ar: "إثبات الموبايل" },
        caption: { en: "Responsive mobile entry point for the toolbox.", ar: "واجهة موبايل متجاوبة لصندوق الأدوات." }
      }
    ],
    stats: [
      { label: { en: "Processing", ar: "المعالجة" }, value: "Local" },
      { label: { en: "Interface", ar: "الواجهة" }, value: "AR/EN" },
      { label: { en: "Accounts", ar: "الحسابات" }, value: "None" }
    ],
    links: { github: "https://github.com/Habib1001-m/quickshed", demo: "https://quickshed.vercel.app" }
  },
  {
    id: "sieve",
    title: { en: "SIEVE Research OS", ar: "SIEVE: نظام تشغيل الأبحاث" },
    tagline: {
      en: "A research console for screening ideas through evidence, boundary rules, and review states.",
      ar: "واجهة بحثية لفحص الأفكار عبر الأدلة، حدود النظام، وحالات المراجعة."
    },
    description: {
      en: "A structured research workflow that turns scattered candidates into visible screening rows, watchlist states, evidence gaps, and governance boundaries.",
      ar: "مسار بحثي منظم يحوّل المرشحات المتناثرة إلى صفوف فحص، حالات مراقبة، فجوات أدلة، وحدود حوكمة واضحة."
    },
    longDescription: {
      en: "SIEVE is an evidence-screening workspace for research-heavy evaluation. It separates selection from decision-making, blocks recommendation logic, and makes every gate visible: screening rows, watchlist readiness, evidence confidence, source gaps, and calibration health. The interface is designed to make reasoning auditable instead of hidden in a spreadsheet or chat thread.",
      ar: "SIEVE هو مساحة عمل لفحص الأدلة في سياقات التقييم البحثي. يفصل بين الاختيار واتخاذ القرار، يمنع منطق التوصيات، ويجعل كل بوابة واضحة: صفوف الفحص، جاهزية قائمة المتابعة، ثقة الأدلة، فجوات المصادر، وصحة المعايرة. صُممت الواجهة لجعل التفكير قابلًا للمراجعة بدل أن يظل مخفيًا داخل جدول أو محادثة."
    },
    category: { en: "Decision systems", ar: "أنظمة قرار" },
    status: { en: "Prototype", ar: "نموذج أولي" },
    tech: ["React", "TypeScript", "Vite", "Recharts", "TanStack Table", "Tailwind CSS"],
    image: "/images/projects/sieve-cover.webp",
    gallery: [
      {
        src: "/images/projects/sieve-overview.webp",
        label: { en: "Boundary overview", ar: "نظرة الحدود" },
        caption: { en: "Current gate, source policy, and boundary enforcement in one view.", ar: "البوابة الحالية، سياسة المصادر، وحدود النظام في شاشة واحدة." }
      },
      {
        src: "/images/projects/sieve-watchlist.webp",
        label: { en: "Watchlist readiness", ar: "جاهزية قائمة المتابعة" },
        caption: { en: "Qualified, watch, blocked, human-review, and confirmation states.", ar: "حالات مؤهل، مراقبة، محظور، مراجعة بشرية، وتأكيد خارجي." }
      },
      {
        src: "/images/projects/sieve-evidence.webp",
        label: { en: "Evidence board", ar: "لوحة الأدلة" },
        caption: { en: "Evidence rows, conflicts, confidence, source reliability, and missing-data gaps.", ar: "صفوف الأدلة، التعارضات، الثقة، موثوقية المصدر، وفجوات البيانات." }
      },
      {
        src: "/images/projects/sieve-calibration.webp",
        label: { en: "Calibration", ar: "المعايرة" },
        caption: { en: "Fixture health, sectors covered, tickers covered, and local workflow validation.", ar: "صحة البيانات التجريبية، القطاعات، الرموز، والتحقق المحلي من مسار العمل." }
      }
    ],
    stats: [
      { label: { en: "Role", ar: "الدور" }, value: "Selection" },
      { label: { en: "Evidence trail", ar: "مسار الأدلة" }, value: "Visible" },
      { label: { en: "Recommendations", ar: "التوصيات" }, value: "Blocked" }
    ]
  },
  {
    id: "portfolio",
    title: { en: "Mohamed Habib Portfolio", ar: "بورتفوليو محمد حبيب" },
    tagline: {
      en: "A bilingual personal brand system with real contact delivery, CV access, and project proof.",
      ar: "نظام علامة شخصية ثنائي اللغة مع إرسال حقيقي للتواصل، روابط للسيرة، وإثباتات للمشاريع."
    },
    description: {
      en: "A systems-focused portfolio built as a production SPA: bilingual content, responsive navigation, real project visuals, Resend contact delivery, CV downloads, and Vercel deployment.",
      ar: "بورتفوليو يركز على الأنظمة ومبني كتطبيق SPA جاهز للنشر: محتوى عربي/إنجليزي، تنقل متجاوب، صور مشاريع حقيقية، إرسال تواصل عبر Resend، تحميل CV، ونشر عبر Vercel."
    },
    longDescription: {
      en: "This portfolio is treated as a product rather than a static page. It went through audit-driven sprints covering positioning, typography, mobile navigation, language persistence, contact delivery, CV endpoints, LinkedIn integration, and project visual proof. The goal is to make the site credible as a working system, not only a visual landing page.",
      ar: "تم التعامل مع هذا البورتفوليو كمنتج، لا كصفحة ثابتة. مرّ بمراحل تحسين مبنية على مراجعات: التموضع، الخطوط، التنقل على الموبايل، حفظ اللغة، إرسال رسائل التواصل، نقاط تحميل السيرة، ربط LinkedIn، وإثباتات بصرية للمشاريع. الهدف أن يبدو الموقع كنظام عامل وموثوق، لا مجرد صفحة شكلية."
    },
    category: { en: "Personal brand", ar: "علامة شخصية" },
    status: { en: "Live", ar: "متاح" },
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Three.js", "Vercel"],
    image: "/images/projects/portfolio-cover.webp",
    gallery: [
      {
        src: "/images/projects/portfolio-contact.webp",
        label: { en: "Conversion layer", ar: "طبقة التحويل" },
        caption: { en: "Contact cards, LinkedIn, CV downloads, and Resend-backed form delivery.", ar: "كروت التواصل، LinkedIn، تحميل السيرة، ونموذج إرسال مدعوم بـ Resend." }
      },
      {
        src: "/images/projects/portfolio-mobile-nav.webp",
        label: { en: "Mobile navigation", ar: "تنقل الموبايل" },
        caption: { en: "Hamburger navigation and mobile-first access to the core sections.", ar: "قائمة موبايل واضحة للوصول إلى الأقسام الأساسية." }
      }
    ],
    stats: [
      { label: { en: "Identity", ar: "الهوية" }, value: "Real" },
      { label: { en: "Contact flow", ar: "التواصل" }, value: "Resend" },
      { label: { en: "CV access", ar: "السيرة" }, value: "PDF" }
    ],
    links: { github: "https://github.com/Habib1001-m/mohamed-habib-portfolio", demo: "https://mohamed-habib-portfolio-opal.vercel.app" }
  }
];

export default PROJECTS_LIST;
