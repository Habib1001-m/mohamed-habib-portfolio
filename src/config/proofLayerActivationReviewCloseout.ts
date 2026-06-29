import { FEATURES } from "./features";
import { PROOF_LAYER_PLACEMENT_REVIEW_DECISION } from "./proofLayerPlacementReview";
import { PROOF_LAYER_RISK_REVIEW_DECISION } from "./proofLayerRiskReview";
import { PROOF_LAYER_APP_MOUNT_DECISION } from "./proofLayerMountDecision";
import { PROOF_LAYER_FEATURE_FLAG_ACTIVATION_DECISION } from "./proofLayerActivationDecision";
import { PROOF_LAYER_PUBLIC_QA_SWEEP_DECISION } from "./proofLayerPublicQASweep";

export const PROOF_LAYER_ACTIVATION_REVIEW_CLOSEOUT = {
  phase: "v2.5-F",
  status: "closed-hidden-mounted",
  publicActivation: false,
  appMounted: true,
  proofLayerFeatureFlag: FEATURES.proofLayer,
  recommendedPlacement: PROOF_LAYER_PLACEMENT_REVIEW_DECISION.recommendedPlacement,
  sourceDecisions: {
    placementReview: PROOF_LAYER_PLACEMENT_REVIEW_DECISION.status,
    riskReview: PROOF_LAYER_RISK_REVIEW_DECISION.status,
    appMount: PROOF_LAYER_APP_MOUNT_DECISION.status,
    flagActivation: PROOF_LAYER_FEATURE_FLAG_ACTIVATION_DECISION.status,
    publicQa: PROOF_LAYER_PUBLIC_QA_SWEEP_DECISION.status,
  },
  decisionSummary:
    "v2.5 is complete. The proof layer is mounted in the recommended location but remains hidden because the feature flag is off. Public activation requires a later explicit approval sprint.",
  nextSafeSprint: "v2.6-proof-layer-public-activation-or-content-evidence-collection",
} as const;

export const PROOF_LAYER_ACTIVATION_REVIEW_GUARDRAILS = [
  "Keep FEATURES.proofLayer false until explicit public activation approval.",
  "Do not enable testimonials, booking, or case studies through the proof layer.",
  "Keep SIEVE proof request-only until redacted public evidence is approved.",
  "Do not introduce placeholder proof or unapproved claims.",
  "Any public activation must be a separate commit after review.",
] as const;

export const proofLayerActivationReviewCloseoutIsSafe =
  PROOF_LAYER_ACTIVATION_REVIEW_CLOSEOUT.status === "closed-hidden-mounted" &&
  PROOF_LAYER_ACTIVATION_REVIEW_CLOSEOUT.publicActivation === false &&
  PROOF_LAYER_ACTIVATION_REVIEW_CLOSEOUT.appMounted === true &&
  FEATURES.proofLayer === false;
