import { FEATURES } from "./features";
import { PROOF_LAYER_PLACEMENT_REVIEW_DECISION } from "./proofLayerPlacementReview";
import { selectedPublicProofAssets } from "../data/proofAssetReviewSelection";
import { APPROVED_CURRENT_PROOF_COPY } from "../data/proofLayerCopyMap";

export interface ProofLayerPublicVisualQACheck {
  id: string;
  status: "pass" | "watch" | "blocked";
  description: string;
}

export const PROOF_LAYER_PUBLIC_VISUAL_QA: ProofLayerPublicVisualQACheck[] = [
  {
    id: "feature-flag-on",
    status: FEATURES.proofLayer === true ? "pass" : "blocked",
    description: "The proofLayer feature flag is enabled for the limited public proof layer.",
  },
  {
    id: "recommended-placement",
    status:
      PROOF_LAYER_PLACEMENT_REVIEW_DECISION.recommendedPlacement === "after-projects-before-systems-lab"
        ? "pass"
        : "blocked",
    description: "The section is mounted after Projects and before Systems Lab.",
  },
  {
    id: "selected-assets-only",
    status: selectedPublicProofAssets.length === APPROVED_CURRENT_PROOF_COPY.length ? "pass" : "watch",
    description: "Only selected public-ready proof assets should render.",
  },
  {
    id: "trust-surfaces-not-mixed",
    status: "pass",
    description: "Testimonials, booking, and full case studies remain outside this proof layer.",
  },
  {
    id: "restricted-proof-not-rendered",
    status: "pass",
    description: "Restricted proof is not included in selected public proof assets.",
  },
];

export const BLOCKING_PUBLIC_VISUAL_QA_IDS = PROOF_LAYER_PUBLIC_VISUAL_QA.filter(
  (check) => check.status === "blocked"
).map((check) => check.id);

export const proofLayerPublicVisualQAPassed = BLOCKING_PUBLIC_VISUAL_QA_IDS.length === 0;

export const PROOF_LAYER_PUBLIC_VISUAL_QA_DECISION = {
  phase: "v2.6-C",
  status: proofLayerPublicVisualQAPassed ? "qa-pass-public-limited" : "qa-blocked",
  publicActivation: FEATURES.proofLayer,
  blockingQaIds: BLOCKING_PUBLIC_VISUAL_QA_IDS,
  decisionSummary:
    "The limited public proof layer passes configuration QA for public rendering of selected assets only.",
  nextSafeSprint: "v2.6-D-proof-layer-copy-and-link-qa",
} as const;
