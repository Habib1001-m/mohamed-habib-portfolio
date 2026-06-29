import { FEATURES } from "./features";
import { PROOF_LAYER_VISUAL_QA_REVIEW_DECISION } from "./proofLayerVisualQAReview";
import { PROOF_LAYER_RTL_LTR_QA_DECISION } from "./proofLayerRtlLtrQA";
import { PROOF_LAYER_LINK_CTA_POLISH_DECISION } from "./proofLayerLinkCtaPolish";
import { selectedPublicProofAssets } from "../data/proofAssetReviewSelection";

export const PROOF_LAYER_VISUAL_POLISH_CLOSEOUT = {
  phase: "v2.7-E",
  status: "closed-public-proof-visual-polish",
  publicActivation: FEATURES.proofLayer,
  renderedAssetCount: selectedPublicProofAssets.length,
  sourceDecisions: {
    visualQa: PROOF_LAYER_VISUAL_QA_REVIEW_DECISION.status,
    rtlLtrQa: PROOF_LAYER_RTL_LTR_QA_DECISION.status,
    linkCtaPolish: PROOF_LAYER_LINK_CTA_POLISH_DECISION.status,
  },
  completedWork: [
    "Public proof visual QA",
    "Card hierarchy and spacing polish",
    "RTL/LTR QA review",
    "Link and CTA review",
    "Visual polish closeout",
  ],
  stillGated: ["testimonials", "booking", "caseStudies", "restricted-project-proof", "quickshed-case-study-proof"],
  decisionSummary:
    "v2.7 is complete. The active limited proof layer received visual, layout, RTL/LTR, and CTA review without expanding trust scope or rendering deferred proof assets.",
  nextSafeSprint: "v2.8-trust-content-evidence-collection-or-proof-layer-interaction-analytics",
} as const;

export const PROOF_LAYER_VISUAL_POLISH_GUARDRAILS = [
  "Do not add testimonials without approved source evidence.",
  "Do not add booking proof without approved workflow evidence.",
  "Do not add case-study claims without screenshots, outcomes, and disclosure boundaries.",
  "Do not add restricted project proof without redaction approval.",
  "Do not add placeholder proof or unapproved outcome claims.",
] as const;

export const proofLayerVisualPolishCloseoutIsSafe =
  PROOF_LAYER_VISUAL_POLISH_CLOSEOUT.status === "closed-public-proof-visual-polish" &&
  PROOF_LAYER_VISUAL_POLISH_CLOSEOUT.publicActivation === true &&
  PROOF_LAYER_VISUAL_POLISH_CLOSEOUT.renderedAssetCount > 0;
