import { PROOF_LAYER_PLACEMENT_REVIEW_DECISION } from "./proofLayerPlacementReview";
import { PROOF_LAYER_RISK_REVIEW_DECISION } from "./proofLayerRiskReview";

const proofLayerFeatureFlagAtV25Mount: boolean = false;

export const PROOF_LAYER_APP_MOUNT_DECISION = {
  phase: "v2.5-C",
  status: "hidden-mount-approved-and-applied",
  appMounted: true,
  publicActivation: false,
  proofLayerFeatureFlag: proofLayerFeatureFlagAtV25Mount,
  placement: PROOF_LAYER_PLACEMENT_REVIEW_DECISION.recommendedPlacement,
  riskGateAllowsHiddenMount: PROOF_LAYER_RISK_REVIEW_DECISION.hiddenMountAllowed,
  decisionSummary:
    "The proof layer is mounted in App after Projects and before Systems Lab, while the v2.5 flag snapshot remains disabled.",
  nextSafeSprint: "v2.5-D-proof-layer-feature-flag-activation-decision",
} as const;

export const proofLayerHiddenMountIsSafe =
  PROOF_LAYER_APP_MOUNT_DECISION.appMounted === true &&
  PROOF_LAYER_APP_MOUNT_DECISION.publicActivation === false &&
  proofLayerFeatureFlagAtV25Mount === false;
