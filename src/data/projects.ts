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
    status: { en: "Private prototype", ar: "نموذج خاص" },
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
    ],
    verificationNote: {
      en: "Private prototype — source and live walkthrough available on request.",
      ar: "نموذج خاص — الكود والعرض المباشر متاحان عند الطلب."
    }
  },
  {
    id: "portfolio",
    title: { en: "Mohamed Habib Portfolio", ar: "بورتفوليو محمد حبيب" },
    tagline: {
      en: "A cinematic, bilingual portfolio rebuilt as a Next.js 16 production system with SSR, SSG case-study routes, and a live 3D systems lab.",
      ar: "بورتفوليو سينمائي ثنائي اللغة، أُعيد بناؤه كنظام إنتاجي على Next.js 16 مع SSR ومسارات دراسات حالة ولوحة أنظمة ثلاثية الأبعاد حيّة."
    },
    description: {
      en: "A dark-cinematic personal brand system built with Next.js 16 App Router: bilingual /en+/ar routing, scroll-driven motion, a Three.js architecture lab, Resend contact delivery, CV downloads, command palette, and SEO with structured data.",
      ar: "نظام علامة شخصية بأسلوب سينمائي داكن، مبني على Next.js 16 App Router: توجيه ثنائي اللغة ‎/en+/ar‎، حركة مدفوعة بالتمرير، مختبر معمارية ثلاثي الأبعاد بـ Three.js، إرسال تواصل عبر Resend، تحميل السيرة، لوحة أوامر، وتحسين محركات البحث مع بيانات منظمة."
    },
    longDescription: {
      en: "Treated as a product, not a static page. The v3.1 rebuild migrates from a Vite SPA to Next.js 16 with file-based routing, SSR/SSG, and a metadata API for lead-generation SEO. The design system is brand-kit-reconciled: warm amber accent on carbon black, fluid editorial typography, scroll-driven section reveals, and a reduced-motion-safe motion shell. A Three.js systems lab visualizes real product architectures interactively. Every trust surface (testimonials, booking, case studies) is gated behind evidence approval — no fabricated social proof.",
      ar: "يُعامل هذا الموقع كمنتج لا كصفحة ثابتة. إعادة البناء v3.1 تنقله من تطبيق Vite SPA إلى Next.js 16 مع توجيه قائم على الملفات، وSSR/SSG، وواجهة Metadata لتحسين البحث وتوليد العملاء. نظام التصميم متوافق مع دليل العلامة: لون أمبر دافئ على خلفية كربونية سوداء، تايبوغرافي تحريري مرن، ظهور الأقسام مدفوعًا بالتمرير، ونظام حركة آمن للحركة المخفّضة. مختبر أنظمة Three.js يعرض معماريات منتجات حقيقية بشكل تفاعلي. كل سطح ثقة (توصيات، حجز، دراسات حالة) محمي خلف موافقة الأدلة — لا أدلة اجتماعية ملفّقة."
    },
    category: { en: "Personal brand", ar: "علامة شخصية" },
    status: { en: "Live", ar: "متاح" },
    tech: ["Next.js 16", "TypeScript", "React 19", "Tailwind CSS 4", "Three.js", "Resend", "Vercel"],
    image: "/images/projects/portfolio-cover.webp",
    gallery: [
      {
        src: "/images/projects/portfolio-contact.webp",
        label: { en: "Contact + lead flow", ar: "التواصل وتوليد العملاء" },
        caption: { en: "Floating-label form with Resend delivery, char counter, animated success, and compact contact grid.", ar: "نموذج بتنسيق Floating-label مع إرسال عبر Resend، عدّاد أحرف، رسالة نجاح متحركة، وشبكة تواصل مدمجة." }
      },
      {
        src: "/images/projects/portfolio-mobile-nav.webp",
        label: { en: "Bilingual + responsive", ar: "ثنائي اللغة ومتجاوب" },
        caption: { en: "Bilingual /en+/ar routing with no-flash locale script, RTL-aware layouts, and mobile-first navigation.", ar: "توجيه ثنائي اللغة ‎/en+/ar‎ بدون وميض، تخطيطات تدعم RTL، وتنقل يبدأ من الموبايل." }
      }
    ],
    stats: [
      { label: { en: "Framework", ar: "الإطار" }, value: "Next.js 16" },
      { label: { en: "Locales", ar: "اللغات" }, value: "EN/AR" },
      { label: { en: "3D Lab", ar: "المختبر" }, value: "Three.js" }
    ],
    links: {
      github: "https://github.com/Habib1001-m/mohamed-habib-portfolio",
      demo: "https://mohamed-habib-portfolio-opal.vercel.app",
    }
  }
];

export default PROJECTS_LIST;
