import { FEATURES } from "./features";
import { proofLayerHiddenMountIsSafe } from "./proofLayerMountDecision";
import { PROOF_LAYER_RISK_REVIEW_DECISION } from "./proofLayerRiskReview";

export const PROOF_LAYER_FEATURE_FLAG_ACTIVATION_DECISION = {
  phase: "v2.5-D",
  status: "no-go-keep-flag-off",
  publicActivation: false,
  activateFeatureFlag: false,
  currentFeatureFlag: FEATURES.proofLayer,
  hiddenMountIsSafe: proofLayerHiddenMountIsSafe,
  publicActivationAllowedByRiskReview: PROOF_LAYER_RISK_REVIEW_DECISION.publicActivationAllowed,
  decisionSummary:
    "The proof layer is mounted behind the disabled flag, but public activation remains a NO-GO until a separate explicit activation approval is issued.",
  nextSafeSprint: "v2.5-E-public-qa-sweep",
} as const;

export const proofLayerActivationDecisionIsSafe =
  PROOF_LAYER_FEATURE_FLAG_ACTIVATION_DECISION.publicActivation === false &&
  PROOF_LAYER_FEATURE_FLAG_ACTIVATION_DECISION.activateFeatureFlag === false &&
  FEATURES.proofLayer === false;
