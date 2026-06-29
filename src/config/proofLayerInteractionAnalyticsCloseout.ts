import { FEATURES } from "./features";
import { PROOF_LAYER_ANALYTICS_VALIDATION_DECISION } from "./proofLayerAnalyticsValidationQA";
import { PROOF_LAYER_PRIVACY_PARAM_QA_DECISION } from "./proofLayerPrivacyParamQA";
import { PROOF_LAYER_PUBLIC_INTERACTION_QA_DECISION } from "./proofLayerPublicInteractionQA";
import { selectedPublicProofAssets } from "../data/proofAssetReviewSelection";

export const PROOF_LAYER_INTERACTION_ANALYTICS_CLOSEOUT = {
  phase: "v2.8-E",
  status: "closed-proof-layer-interaction-analytics",
  publicActivation: FEATURES.proofLayer,
  trackedEventName: "proof_asset_clicked",
  renderedAssetCount: selectedPublicProofAssets.length,
  sourceDecisions: {
    analyticsValidation: PROOF_LAYER_ANALYTICS_VALIDATION_DECISION.status,
    privacyParamQa: PROOF_LAYER_PRIVACY_PARAM_QA_DECISION.status,
    publicInteractionQa: PROOF_LAYER_PUBLIC_INTERACTION_QA_DECISION.status,
  },
  completedWork: [
    "Proof asset click tracking hook",
    "Analytics event validation QA",
    "Privacy parameter QA",
    "Public interaction QA",
    "Interaction analytics closeout",
  ],
  stillGated: ["testimonials", "booking", "caseStudies", "restricted-project-proof", "quickshed-case-study-proof"],
  decisionSummary:
    "v2.8 is complete. The active limited proof layer now emits a first-party proof_asset_clicked browser event with a small structured payload while larger trust surfaces remain gated.",
  nextSafeSprint: "v2.9-trust-content-evidence-collection-or-proof-layer-observability-review",
} as const;

export const PROOF_LAYER_INTERACTION_ANALYTICS_GUARDRAILS = [
  "Keep proof asset analytics first-party unless a separate provider decision is approved.",
  "Keep proof asset analytics params structured and non-sensitive.",
  "Keep testimonials, booking, case studies, and restricted proof gated.",
  "Do not add placeholder proof or unapproved outcome claims.",
] as const;

export const proofLayerInteractionAnalyticsCloseoutIsSafe =
  PROOF_LAYER_INTERACTION_ANALYTICS_CLOSEOUT.status === "closed-proof-layer-interaction-analytics" &&
  PROOF_LAYER_INTERACTION_ANALYTICS_CLOSEOUT.publicActivation === true &&
  PROOF_LAYER_INTERACTION_ANALYTICS_CLOSEOUT.renderedAssetCount > 0;
