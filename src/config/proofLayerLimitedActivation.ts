import { FEATURES } from "./features";
import { PROOF_LAYER_PLACEMENT_REVIEW_DECISION } from "./proofLayerPlacementReview";
import { PROOF_LAYER_APP_MOUNT_DECISION } from "./proofLayerMountDecision";
import { APPROVED_CURRENT_PROOF_COPY } from "../data/proofLayerCopyMap";
import {
  DEFERRED_PROOF_ASSET_IDS,
  EXCLUDED_PROOF_ASSET_IDS,
  SELECTED_PUBLIC_PROOF_ASSET_IDS,
} from "../data/proofAssetReviewSelection";

export const PROOF_LAYER_LIMITED_ACTIVATION_RECORD = {
  phase: "v2.6-A",
  status: "limited-proof-layer-ready",
  scope: "selected-public-ready-assets-only",
  featureFlagBeforeChange: FEATURES.proofLayer,
  appMounted: PROOF_LAYER_APP_MOUNT_DECISION.appMounted,
  placement: PROOF_LAYER_PLACEMENT_REVIEW_DECISION.recommendedPlacement,
  selectedAssetIds: SELECTED_PUBLIC_PROOF_ASSET_IDS,
  deferredAssetIds: DEFERRED_PROOF_ASSET_IDS,
  excludedAssetIds: EXCLUDED_PROOF_ASSET_IDS,
  approvedCopyCount: APPROVED_CURRENT_PROOF_COPY.length,
  unavailableSurfaces: ["testimonials", "booking", "caseStudies", "restricted-project-proof"],
  decisionSummary:
    "The proof layer is limited to selected identity, CV, deployment, and repository assets. Deferred and excluded assets remain unavailable for rendering.",
  nextSafeSprint: "v2.6-B-proof-layer-feature-flag-change",
} as const;

export const proofLayerLimitedActivationScopeIsSafe =
  PROOF_LAYER_LIMITED_ACTIVATION_RECORD.selectedAssetIds.length > 0 &&
  PROOF_LAYER_LIMITED_ACTIVATION_RECORD.deferredAssetIds.length > 0 &&
  PROOF_LAYER_LIMITED_ACTIVATION_RECORD.excludedAssetIds.length > 0;
