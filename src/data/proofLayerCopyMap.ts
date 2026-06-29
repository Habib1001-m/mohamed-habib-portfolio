import {
  DEFERRED_PROOF_ASSET_IDS,
  EXCLUDED_PROOF_ASSET_IDS,
  SELECTED_PUBLIC_PROOF_ASSET_IDS,
} from "./proofAssetReviewSelection";

export interface LocalizedProofCopy {
  en: string;
  ar: string;
}

export type ProofLayerCopyStatus = "approved-current" | "draft-deferred" | "blocked";

export interface ProofLayerCopyItem {
  assetId: string;
  copyStatus: ProofLayerCopyStatus;
  publicSurfaceAllowed: boolean;
  eyebrow: LocalizedProofCopy;
  title: LocalizedProofCopy;
  description: LocalizedProofCopy;
  ctaLabel?: LocalizedProofCopy;
}

export const PROOF_LAYER_COPY_MAP: ProofLayerCopyItem[] = [
  {
    assetId: "portfolio-live-site",
    copyStatus: "approved-current",
    publicSurfaceAllowed: true,
    eyebrow: { en: "Live system", ar: "نظام منشور" },
    title: { en: "Portfolio live deployment", ar: "نسخة البورتفوليو المنشورة" },
    description: {
      en: "A deployed bilingual portfolio with contact delivery, CV access, motion polish, and proof-gated trust surfaces.",
      ar: "بورتفوليو ثنائي اللغة منشور فعليًا مع إرسال تواصل، وصول للسيرة الذاتية، حركة خفيفة، وبوابات ثقة محكومة.",
    },
    ctaLabel: { en: "Open live site", ar: "افتح الموقع" },
  },
  {
    assetId: "portfolio-source-repository",
    copyStatus: "approved-current",
    publicSurfaceAllowed: true,
    eyebrow: { en: "Source proof", ar: "إثبات بالكود" },
    title: { en: "Public implementation repository", ar: "مستودع التنفيذ العام" },
    description: {
      en: "The repository shows the implementation structure, release discipline, feature flags, deployment config, and trust-gating model.",
      ar: "المستودع يعرض بنية التنفيذ، انضباط الإصدارات، بوابات الميزات، إعدادات النشر، ونموذج حوكمة الثقة.",
    },
    ctaLabel: { en: "View repository", ar: "عرض المستودع" },
  },
  {
    assetId: "one-page-cv",
    copyStatus: "approved-current",
    publicSurfaceAllowed: true,
    eyebrow: { en: "CV", ar: "السيرة الذاتية" },
    title: { en: "One-page CV", ar: "سيرة مختصرة من صفحة واحدة" },
    description: {
      en: "A concise recruiter-friendly CV for fast profile review.",
      ar: "سيرة مختصرة مناسبة للمراجعة السريعة من مسؤولي التوظيف.",
    },
    ctaLabel: { en: "Download CV", ar: "تحميل السيرة" },
  },
  {
    assetId: "detailed-cv",
    copyStatus: "approved-current",
    publicSurfaceAllowed: true,
    eyebrow: { en: "Detailed profile", ar: "ملف تفصيلي" },
    title: { en: "Detailed CV", ar: "السيرة التفصيلية" },
    description: {
      en: "A deeper CV version for technical review, project context, and broader background validation.",
      ar: "نسخة أعمق للمراجعة التقنية، سياق المشاريع، والتحقق الأشمل من الخلفية المهنية.",
    },
    ctaLabel: { en: "Download detailed CV", ar: "تحميل السيرة التفصيلية" },
  },
  {
    assetId: "hero-portrait",
    copyStatus: "approved-current",
    publicSurfaceAllowed: true,
    eyebrow: { en: "Identity", ar: "الهوية" },
    title: { en: "Approved profile portrait", ar: "صورة شخصية معتمدة" },
    description: {
      en: "A consistent identity image used across the hero area and personal brand surface.",
      ar: "صورة هوية متسقة مستخدمة في منطقة الهيرو وسطح العلامة الشخصية.",
    },
  },
  {
    assetId: "linkedin-og-image",
    copyStatus: "approved-current",
    publicSurfaceAllowed: true,
    eyebrow: { en: "Social preview", ar: "معاينة اجتماعية" },
    title: { en: "LinkedIn / OG image", ar: "صورة LinkedIn / OG" },
    description: {
      en: "A social preview asset prepared for consistent external sharing.",
      ar: "أصل بصري مجهز لمعاينة اجتماعية متسقة عند المشاركة الخارجية.",
    },
  },
  {
    assetId: "quickshed-live-product",
    copyStatus: "draft-deferred",
    publicSurfaceAllowed: false,
    eyebrow: { en: "Deferred project proof", ar: "إثبات مشروع مؤجل" },
    title: { en: "QuickShed live product", ar: "منتج QuickShed المنشور" },
    description: {
      en: "Public link exists, but this proof should wait for approved screenshots and outcome wording before promotion.",
      ar: "الرابط العام موجود، لكن هذا الإثبات ينتظر لقطات معتمدة وصياغة نتائج قبل الترويج.",
    },
  },
  {
    assetId: "quickshed-source-repository",
    copyStatus: "draft-deferred",
    publicSurfaceAllowed: false,
    eyebrow: { en: "Deferred source proof", ar: "إثبات كود مؤجل" },
    title: { en: "QuickShed source repository", ar: "مستودع QuickShed" },
    description: {
      en: "Repository exists, but case-study framing must be reviewed before being used as a proof layer.",
      ar: "المستودع موجود، لكن صياغة دراسة الحالة تحتاج مراجعة قبل استخدامه كطبقة إثبات.",
    },
  },
  {
    assetId: "sieve-private-walkthrough",
    copyStatus: "blocked",
    publicSurfaceAllowed: false,
    eyebrow: { en: "Restricted proof", ar: "إثبات محدود" },
    title: { en: "SIEVE restricted walkthrough", ar: "عرض SIEVE المحدود" },
    description: {
      en: "Keep request-only until redacted screenshots and disclosure boundaries are approved.",
      ar: "يبقى متاحًا عند الطلب فقط حتى اعتماد لقطات منقحة وحدود الإفصاح.",
    },
  },
  {
    assetId: "public-testimonials",
    copyStatus: "blocked",
    publicSurfaceAllowed: false,
    eyebrow: { en: "Blocked trust content", ar: "محتوى ثقة محظور" },
    title: { en: "Public testimonials", ar: "التوصيات العامة" },
    description: {
      en: "Do not publish until approved recommendations and source context exist.",
      ar: "لا يتم النشر حتى تتوفر توصيات معتمدة وسياق مصدر واضح.",
    },
  },
  {
    assetId: "booking-proof-flow",
    copyStatus: "blocked",
    publicSurfaceAllowed: false,
    eyebrow: { en: "Blocked conversion proof", ar: "إثبات تحويل محظور" },
    title: { en: "Booking workflow proof", ar: "إثبات مسار الحجز" },
    description: {
      en: "Do not expose until booking URL, availability, call purpose, and follow-up workflow are approved.",
      ar: "لا يتم عرضه حتى اعتماد رابط الحجز، المواعيد، هدف المكالمة، ومسار المتابعة.",
    },
  },
];

export const APPROVED_CURRENT_PROOF_COPY = PROOF_LAYER_COPY_MAP.filter(
  (item) => item.copyStatus === "approved-current" && item.publicSurfaceAllowed
);

export const DEFERRED_PROOF_COPY = PROOF_LAYER_COPY_MAP.filter(
  (item) => item.copyStatus === "draft-deferred"
);

export const BLOCKED_PROOF_COPY = PROOF_LAYER_COPY_MAP.filter(
  (item) => item.copyStatus === "blocked"
);

export const proofLayerCopyMapIsReady = SELECTED_PUBLIC_PROOF_ASSET_IDS.every((assetId) =>
  APPROVED_CURRENT_PROOF_COPY.some((item) => item.assetId === assetId)
);

export const proofLayerDeferredCopyIsAligned = DEFERRED_PROOF_ASSET_IDS.every((assetId) =>
  DEFERRED_PROOF_COPY.some((item) => item.assetId === assetId)
);

export const proofLayerBlockedCopyIsAligned = EXCLUDED_PROOF_ASSET_IDS.every((assetId) =>
  BLOCKED_PROOF_COPY.some((item) => item.assetId === assetId)
);

export const PROOF_LAYER_COPY_MAP_DECISION = {
  phase: "v2.4-C",
  status: "copy-map-created",
  publicActivation: false,
  readyForControlledUse:
    proofLayerCopyMapIsReady && proofLayerDeferredCopyIsAligned && proofLayerBlockedCopyIsAligned,
  decisionSummary:
    "Proof-layer copy is mapped for selected public-ready assets while deferred and blocked assets remain unavailable for public surfaces.",
  nextSafeSprint: "v2.4-D-proof-layer-component-staging",
} as const;
