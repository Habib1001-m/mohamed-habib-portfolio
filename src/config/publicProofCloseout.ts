import { FEATURES } from "./features";
import { PUBLIC_PROOF_ASSET_INVENTORY_DECISION } from "../data/publicProofAssets";
import { PROOF_ASSET_REVIEW_SELECTION_DECISION } from "../data/proofAssetReviewSelection";
import { PROOF_LAYER_COPY_MAP_DECISION } from "../data/proofLayerCopyMap";

export const PUBLIC_PROOF_CLOSEOUT_DECISION = {
  phase: "v2.4",
  status: "closed-gated",
  publicActivation: false,
  proofLayerFeatureFlag: FEATURES.proofLayer,
  componentStaged: true,
  planningStatus: "complete",
  activationStatus: "blocked-until-explicit-operator-approval",
  selectedPublicProofLayer: "identity-cv-deployment-repository-only",
  blockedSurfaces: ["testimonials", "booking", "caseStudies", "sieve-public-walkthrough"],
  sourceDecisions: {
    inventory: PUBLIC_PROOF_ASSET_INVENTORY_DECISION.status,
    reviewSelection: PROOF_ASSET_REVIEW_SELECTION_DECISION.status,
    copyMap: PROOF_LAYER_COPY_MAP_DECISION.status,
  },
  decisionSummary:
    "v2.4 is complete as a gated public-proof readiness phase. The proof layer is staged in code, but remains hidden because the proofLayer feature flag is off.",
  nextSafeSprint: "v2.5-proof-layer-activation-review",
} as const;

export const PUBLIC_PROOF_CLOSEOUT_GUARDRAILS = [
  "Keep proofLayer disabled until explicit activation approval.",
  "Do not expose testimonials without approved recommendation evidence.",
  "Do not expose booking without approved URL, availability, purpose, and follow-up workflow.",
  "Do not expose case studies until screenshots, outcomes, and disclosure boundaries are approved.",
  "Keep SIEVE proof request-only until redacted public material is approved.",
  "Do not use placeholder social proof.",
] as const;

export const publicProofCloseoutIsSafe =
  PUBLIC_PROOF_CLOSEOUT_DECISION.status === "closed-gated" &&
  PUBLIC_PROOF_CLOSEOUT_DECISION.publicActivation === false &&
  FEATURES.proofLayer === false;
