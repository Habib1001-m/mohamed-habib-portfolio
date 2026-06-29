import { FEATURES } from "../../config/features";
import { selectedPublicProofAssets } from "../../data/proofAssetReviewSelection";
import { APPROVED_CURRENT_PROOF_COPY } from "../../data/proofLayerCopyMap";

type Lang = "en" | "ar";

interface ProofLayerSectionProps {
  lang: Lang;
}

const getAssetTypeLabel = (area: (typeof selectedPublicProofAssets)[number]["area"], lang: Lang) => {
  const labels: Record<typeof area, { en: string; ar: string }> = {
    identity: { en: "Identity", ar: "هوية" },
    cv: { en: "CV", ar: "سيرة" },
    deployment: { en: "Deployment", ar: "نشر" },
    repository: { en: "Repository", ar: "مستودع" },
    project: { en: "Project", ar: "مشروع" },
    screenshot: { en: "Screenshot", ar: "لقطة" },
    "trust-content": { en: "Trust", ar: "ثقة" },
  };

  return labels[area][lang];
};

export default function ProofLayerSection({ lang }: ProofLayerSectionProps) {
  if (!FEATURES.proofLayer) {
    return null;
  }

  const proofCards = selectedPublicProofAssets
    .map((asset) => {
      const copy = APPROVED_CURRENT_PROOF_COPY.find((item) => item.assetId === asset.id);
      return copy ? { asset, copy } : null;
    })
    .filter(Boolean) as Array<{
    asset: (typeof selectedPublicProofAssets)[number];
    copy: (typeof APPROVED_CURRENT_PROOF_COPY)[number];
  }>;

  if (proofCards.length === 0) {
    return null;
  }

  return (
    <section id="proof" className="ds-shell py-24 md:py-28" aria-labelledby="proof-heading">
      <div className="ds-section-heading mb-12 max-w-4xl">
        <p className="ds-kicker">{lang === "ar" ? "إثباتات عامة" : "Public proof"}</p>
        <div className="ds-section-rule" />
        <h2 id="proof-heading" className="ds-section-title">
          {lang === "ar" ? "إثباتات جاهزة بدون مبالغة" : "Proof assets without overclaiming"}
        </h2>
        <p className="ds-muted-copy max-w-3xl">
          {lang === "ar"
            ? "هذه الطبقة تعرض فقط الأصول المعتمدة حاليًا للاستخدام العام. التوصيات، الحجز، ودراسات الحالة الكاملة تظل مخفية حتى اكتمال الأدلة."
            : "This layer only shows assets that are already approved for public use. Testimonials, booking, and full case studies stay hidden until evidence is complete."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {proofCards.map(({ asset, copy }) => {
          const href = asset.href ?? asset.localPath;
          const isExternal = Boolean(href?.startsWith("http"));
          const ctaText = copy.ctaLabel?.[lang];

          return (
            <article
              key={asset.id}
              className="ds-card ds-card-hover group relative flex min-h-[260px] flex-col overflow-hidden p-5 md:p-6"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/40 to-transparent opacity-70" />

              <div className="mb-5 flex items-start justify-between gap-4">
                <p className="ds-kicker mb-0">{copy.eyebrow[lang]}</p>
                <span className="rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-orange-100/80">
                  {getAssetTypeLabel(asset.area, lang)}
                </span>
              </div>

              <h3 className="text-xl font-semibold leading-snug text-white md:text-2xl">
                {copy.title[lang]}
              </h3>
              <p className="ds-muted-copy mt-4 text-sm leading-7">{copy.description[lang]}</p>

              <div className="mt-auto pt-6">
                {href && ctaText ? (
                  <a
                    className="ds-action ds-action-accent inline-flex w-full justify-center md:w-auto"
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    aria-label={`${ctaText}: ${copy.title[lang]}`}
                  >
                    {ctaText}
                  </a>
                ) : (
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                    {lang === "ar" ? "إثبات بصري" : "Visual proof"}
                  </p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
