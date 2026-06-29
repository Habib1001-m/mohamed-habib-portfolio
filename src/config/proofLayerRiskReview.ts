import { FEATURES } from "./features";
import { PROOF_LAYER_PLACEMENT_REVIEW_DECISION } from "./proofLayerPlacementReview";
import { PROOF_LAYER_COPY_MAP_DECISION } from "../data/proofLayerCopyMap";
import { PROOF_ASSET_REVIEW_SELECTION_DECISION } from "../data/proofAssetReviewSelection";

export type ProofLayerRiskLevel = "low" | "medium" | "high";
export type ProofLayerRiskStatus = "accepted" | "mitigated" | "blocked";

export interface ProofLayerRiskItem {
  id: string;
  level: ProofLayerRiskLevel;
  status: ProofLayerRiskStatus;
  description: string;
  mitigation: string;
}

export const PROOF_LAYER_RISK_REVIEW: ProofLayerRiskItem[] = [
  {
    id: "overclaiming-risk",
    level: "medium",
    status: "mitigated",
    description: "The proof layer could sound self-promotional if it claims more than the available evidence proves.",
    mitigation: "Use only selected public-ready assets and avoid testimonials, metrics, or case-study claims until evidence is approved.",
  },
  {
    id: "trust-surface-confusion",
    level: "medium",
    status: "mitigated",
    description: "Users may confuse proof assets with full case studies or social proof.",
    mitigation: "Keep copy focused on identity, CV, deployment, and repository proof only.",
  },
  {
    id: "conversion-pressure-risk",
    level: "low",
    status: "accepted",
    description: "The proof layer could add pressure if placed too close to contact CTAs.",
    mitigation: "Use the recommended placement after Projects and before Systems Lab, not inside the Contact section.",
  },
  {
    id: "restricted-project-exposure",
    level: "high",
    status: "blocked",
    description: "Restricted SIEVE proof must not become public by accident.",
    mitigation: "Keep SIEVE excluded from public proof and request-only until redacted material is approved.",
  },
  {
    id: "placeholder-proof-risk",
    level: "high",
    status: "blocked",
    description: "Placeholder proof would damage credibility and violate the trust-content policy.",
    mitigation: "Render no testimonials, booking proof, or case-study claims without approved evidence.",
  },
];

export const BLOCKING_PROOF_LAYER_RISK_IDS = PROOF_LAYER_RISK_REVIEW.filter(
  (risk) => risk.status === "blocked"
).map((risk) => risk.id);

export const proofLayerRiskReviewAllowsHiddenMount =
  FEATURES.proofLayer === false &&
  PROOF_LAYER_PLACEMENT_REVIEW_DECISION.recommendedPlacement === "after-projects-before-systems-lab" &&
  PROOF_LAYER_COPY_MAP_DECISION.readyForControlledUse &&
  PROOF_ASSET_REVIEW_SELECTION_DECISION.status === "selection-complete";

export const proofLayerRiskReviewAllowsPublicActivation =
  proofLayerRiskReviewAllowsHiddenMount && BLOCKING_PROOF_LAYER_RISK_IDS.length === 0;

export const PROOF_LAYER_RISK_REVIEW_DECISION = {
  phase: "v2.5-B",
  status: "risk-reviewed",
  publicActivation: false,
  hiddenMountAllowed: proofLayerRiskReviewAllowsHiddenMount,
  publicActivationAllowed: proofLayerRiskReviewAllowsPublicActivation,
  blockingRiskIds: BLOCKING_PROOF_LAYER_RISK_IDS,
  decisionSummary:
    "The proof layer is safe for hidden mounting behind the disabled feature flag, but not approved for public activation while restricted and placeholder-proof risks remain blocked.",
  nextSafeSprint: "v2.5-C-proof-layer-app-mount-decision",
} as const;
