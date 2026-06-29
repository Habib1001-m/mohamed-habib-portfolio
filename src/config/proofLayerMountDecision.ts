import { FEATURES } from "./features";
import { PROOF_LAYER_PLACEMENT_REVIEW_DECISION } from "./proofLayerPlacementReview";
import { PROOF_LAYER_RISK_REVIEW_DECISION } from "./proofLayerRiskReview";

export const PROOF_LAYER_APP_MOUNT_DECISION = {
  phase: "v2.5-C",
  status: "hidden-mount-approved-and-applied",
  appMounted: true,
  publicActivation: false,
  proofLayerFeatureFlag: FEATURES.proofLayer,
  placement: PROOF_LAYER_PLACEMENT_REVIEW_DECISION.recommendedPlacement,
  riskGateAllowsHiddenMount: PROOF_LAYER_RISK_REVIEW_DECISION.hiddenMountAllowed,
  decisionSummary:
    "The proof layer is mounted in App after Projects and before Systems Lab, but remains hidden because FEATURES.proofLayer is false.",
  nextSafeSprint: "v2.5-D-proof-layer-feature-flag-activation-decision",
} as const;

export const proofLayerHiddenMountIsSafe =
  PROOF_LAYER_APP_MOUNT_DECISION.appMounted === true &&
  PROOF_LAYER_APP_MOUNT_DECISION.publicActivation === false &&
  FEATURES.proofLayer === false;
