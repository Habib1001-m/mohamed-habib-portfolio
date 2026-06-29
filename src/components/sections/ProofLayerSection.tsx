import { FEATURES } from "../../config/features";
import { selectedPublicProofAssets } from "../../data/proofAssetReviewSelection";
import { APPROVED_CURRENT_PROOF_COPY } from "../../data/proofLayerCopyMap";

type Lang = "en" | "ar";

interface ProofLayerSectionProps {
  lang: Lang;
}

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
    <section id="proof" className="ds-shell py-24">
      <div className="ds-section-heading mb-10">
        <p className="ds-kicker">{lang === "ar" ? "إثباتات عامة" : "Public proof"}</p>
        <div className="ds-section-rule" />
        <h2 className="ds-section-title">
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

          return (
            <article key={asset.id} className="ds-card ds-card-hover p-5">
              <p className="ds-kicker mb-3">{copy.eyebrow[lang]}</p>
              <h3 className="text-xl font-semibold text-white">{copy.title[lang]}</h3>
              <p className="ds-muted-copy mt-3 text-sm leading-7">{copy.description[lang]}</p>

              {href && copy.ctaLabel ? (
                <a
                  className="ds-action ds-action-accent mt-5 inline-flex"
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                >
                  {copy.ctaLabel[lang]}
                </a>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
