"use client";

import { ShieldCheck, ExternalLink, FileText, Github, Globe, Image as ImageIcon, User, ArrowRight } from "lucide-react";
import { selectedPublicProofAssets } from "@/data/proofAssetReviewSelection";
import { APPROVED_CURRENT_PROOF_COPY } from "@/data/proofLayerCopyMap";
import { FEATURES } from "@/config/features";
import { t, type Locale, type Bilingual } from "@/lib/i18n";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { track } from "@/lib/analytics";

const AREA_ICON: Record<string, React.ElementType> = {
  identity: User,
  cv: FileText,
  deployment: Globe,
  repository: Github,
  project: ShieldCheck,
  screenshot: ImageIcon,
  "trust-content": ShieldCheck,
};

const AREA_LABEL: Record<string, Bilingual> = {
  identity: { en: "Identity", ar: "الهوية" },
  cv: { en: "CV", ar: "السيرة" },
  deployment: { en: "Deployment", ar: "نشر" },
  repository: { en: "Repository", ar: "المستودع" },
  project: { en: "Project", ar: "مشروع" },
  screenshot: { en: "Screenshot", ar: "لقطة" },
  "trust-content": { en: "Trust", ar: "ثقة" },
};

export function ProofLayerSection({ locale }: { locale: Locale }) {
  if (!FEATURES.proofLayer) return null;

  const proofCards = selectedPublicProofAssets
    .map((asset) => {
      const copy = APPROVED_CURRENT_PROOF_COPY.find((c) => c.assetId === asset.id);
      return copy ? { asset, copy } : null;
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  if (proofCards.length === 0) return null;

  return (
    <section id="proof" className="ds-section">
      <div className="ds-shell">
        <SectionHeading
          num="03."
          title={t(
            { en: "Proof, without exaggeration.", ar: "إثباتات جاهزة بدون مبالغة." },
            locale,
          )}
          subtitle={t(
            {
              en: "Verifiable evidence — live deployments, public repositories, and ready CVs. No fabricated metrics.",
              ar: "أدلة قابلة للتحقق — نشر مباشر، مستودعات عامة، وسير جاهزة. بلا أرقام ملفّقة.",
            },
            locale,
          )}
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {proofCards.map(({ asset, copy }) => {
            const Icon = AREA_ICON[asset.area] ?? ShieldCheck;
            const href = asset.href || asset.localPath;
            const areaLabel = AREA_LABEL[asset.area] ?? { en: asset.area, ar: asset.area };
            return (
              <a
                key={asset.id}
                href={href}
                data-reveal
                data-reveal-group="proof-cards"
                target={href?.startsWith("http") ? "_blank" : undefined}
                rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="ds-card ds-card-hover group block p-5"
                onClick={() =>
                  track({
                    eventName: "proof_asset_clicked",
                    category: "proof",
                    props: {
                      proof_id: asset.id,
                      proof_area: asset.area,
                      destination: href,
                      language: locale,
                    },
                  })
                }
              >
                <div className="flex items-center justify-between">
                  <span className="ds-chip !text-[var(--accent-soft)] !border-hairline-accent">
                    <Icon className="h-3 w-3" />
                    {t(areaLabel, locale)}
                  </span>
                  <ExternalLink className="h-3.5 w-3.5 text-ink-faint transition-colors group-hover:text-accent" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {t(copy.title, locale)}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {t(copy.description, locale)}
                </p>
                {copy.ctaLabel && (
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                    {t(copy.ctaLabel, locale)}
                    <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                  </span>
                )}

                {/* Top accent line on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
