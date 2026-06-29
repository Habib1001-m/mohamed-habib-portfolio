import { proofLayerHiddenMountIsSafe } from "./proofLayerMountDecision";
import { PROOF_LAYER_RISK_REVIEW_DECISION } from "./proofLayerRiskReview";

const proofLayerFeatureFlagAtV25Decision: boolean = false;

export const PROOF_LAYER_FEATURE_FLAG_ACTIVATION_DECISION = {
  phase: "v2.5-D",
  status: "no-go-keep-flag-off",
  publicActivation: false,
  activateFeatureFlag: false,
  currentFeatureFlag: proofLayerFeatureFlagAtV25Decision,
  hiddenMountIsSafe: proofLayerHiddenMountIsSafe,
  publicActivationAllowedByRiskReview: PROOF_LAYER_RISK_REVIEW_DECISION.publicActivationAllowed,
  decisionSummary:
    "The v2.5 flag review kept the proof layer hidden behind the disabled flag.",
  nextSafeSprint: "v2.5-E-public-qa-sweep",
} as const;

export const proofLayerActivationDecisionIsSafe =
  PROOF_LAYER_FEATURE_FLAG_ACTIVATION_DECISION.publicActivation === false &&
  PROOF_LAYER_FEATURE_FLAG_ACTIVATION_DECISION.activateFeatureFlag === false &&
  proofLayerFeatureFlagAtV25Decision === false;
