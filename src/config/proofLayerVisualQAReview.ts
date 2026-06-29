import { FEATURES } from "./features";
import { PROOF_LAYER_PUBLIC_ACTIVATION_CLOSEOUT } from "./proofLayerPublicActivationCloseout";
import { selectedPublicProofAssets } from "../data/proofAssetReviewSelection";
import { APPROVED_CURRENT_PROOF_COPY } from "../data/proofLayerCopyMap";

export interface ProofLayerVisualQACheck {
  id: string;
  status: "pass" | "watch" | "blocked";
  description: string;
}

export const PROOF_LAYER_VISUAL_QA_REVIEW: ProofLayerVisualQACheck[] = [
  {
    id: "public-limited-layer-active",
    status: FEATURES.proofLayer ? "pass" : "blocked",
    description: "The limited public proof layer is active for v2.7 review.",
  },
  {
    id: "asset-count-aligned",
    status: selectedPublicProofAssets.length === APPROVED_CURRENT_PROOF_COPY.length ? "pass" : "watch",
    description: "Selected proof assets and approved copy entries are aligned.",
  },
  {
    id: "activation-scope-preserved",
    status:
      PROOF_LAYER_PUBLIC_ACTIVATION_CLOSEOUT.activationScope === "selected-public-ready-assets-only"
        ? "pass"
        : "blocked",
    description: "The active layer remains limited to selected public-ready assets only.",
  },
  {
    id: "visual-polish-needed",
    status: "watch",
    description: "The section should receive spacing, card hierarchy, CTA, and RTL/LTR polish before v2.7 closeout.",
  },
];

export const BLOCKING_PROOF_LAYER_VISUAL_QA_IDS = PROOF_LAYER_VISUAL_QA_REVIEW.filter(
  (check) => check.status === "blocked"
).map((check) => check.id);

export const proofLayerVisualQAReviewPassed = BLOCKING_PROOF_LAYER_VISUAL_QA_IDS.length === 0;

export const PROOF_LAYER_VISUAL_QA_REVIEW_DECISION = {
  phase: "v2.7-A",
  status: proofLayerVisualQAReviewPassed ? "visual-qa-ready-for-polish" : "visual-qa-blocked",
  publicActivation: FEATURES.proofLayer,
  blockingQaIds: BLOCKING_PROOF_LAYER_VISUAL_QA_IDS,
  watchItems: PROOF_LAYER_VISUAL_QA_REVIEW.filter((check) => check.status === "watch").map(
    (check) => check.id
  ),
  decisionSummary:
    "The limited proof layer is safe for v2.7 visual polish. The next step is card layout, spacing, CTA, and RTL/LTR refinement without expanding the proof scope.",
  nextSafeSprint: "v2.7-B-proof-layer-card-layout-polish",
} as const;
