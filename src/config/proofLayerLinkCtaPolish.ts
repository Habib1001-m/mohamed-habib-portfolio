import { FEATURES } from "./features";
import { PROOF_LAYER_RTL_LTR_QA_DECISION } from "./proofLayerRtlLtrQA";
import { selectedPublicProofAssets } from "../data/proofAssetReviewSelection";
import { APPROVED_CURRENT_PROOF_COPY } from "../data/proofLayerCopyMap";

export interface ProofLayerLinkCtaPolishCheck {
  id: string;
  status: "pass" | "watch" | "blocked";
  description: string;
}

const clickableApprovedCopyIds = APPROVED_CURRENT_PROOF_COPY.filter((item) => item.ctaLabel).map(
  (item) => item.assetId
);

export const PROOF_LAYER_LINK_CTA_POLISH: ProofLayerLinkCtaPolishCheck[] = [
  {
    id: "proof-layer-active",
    status: FEATURES.proofLayer ? "pass" : "blocked",
    description: "The public proof layer remains active for CTA review.",
  },
  {
    id: "direction-qa-complete",
    status:
      PROOF_LAYER_RTL_LTR_QA_DECISION.status === "rtl-ltr-qa-pass-with-watch-items"
        ? "pass"
        : "blocked",
    description: "RTL/LTR QA completed before CTA closeout.",
  },
  {
    id: "clickable-assets-have-cta-copy",
    status: selectedPublicProofAssets.every((asset) => clickableApprovedCopyIds.includes(asset.id))
      ? "pass"
      : "watch",
    description: "Selected linkable proof assets have CTA copy where applicable.",
  },
  {
    id: "local-and-external-links-supported",
    status: selectedPublicProofAssets.some((asset) => asset.href) && selectedPublicProofAssets.some((asset) => asset.localPath)
      ? "pass"
      : "watch",
    description: "The proof layer supports both external links and local asset paths.",
  },
  {
    id: "future-analytics-hook-ready",
    status: "watch",
    description: "A proof asset analytics event exists and can be connected in a later interaction sprint if needed.",
  },
];

export const BLOCKING_PROOF_LAYER_LINK_CTA_IDS = PROOF_LAYER_LINK_CTA_POLISH.filter(
  (check) => check.status === "blocked"
).map((check) => check.id);

export const proofLayerLinkCtaPolishPassed = BLOCKING_PROOF_LAYER_LINK_CTA_IDS.length === 0;

export const PROOF_LAYER_LINK_CTA_POLISH_DECISION = {
  phase: "v2.7-D",
  status: proofLayerLinkCtaPolishPassed ? "link-cta-polish-pass" : "link-cta-polish-blocked",
  publicActivation: FEATURES.proofLayer,
  blockingQaIds: BLOCKING_PROOF_LAYER_LINK_CTA_IDS,
  watchItems: PROOF_LAYER_LINK_CTA_POLISH.filter((check) => check.status === "watch").map(
    (check) => check.id
  ),
  decisionSummary:
    "Link and CTA review has no blocking issues. The active proof layer supports selected local and external proof assets without unlocking deferred trust surfaces.",
  nextSafeSprint: "v2.7-E-proof-layer-visual-polish-closeout",
} as const;
