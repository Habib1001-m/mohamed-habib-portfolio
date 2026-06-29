import { FEATURES } from "./features";
import { PROOF_LAYER_LIMITED_ACTIVATION_RECORD } from "./proofLayerLimitedActivation";
import { PROOF_LAYER_PUBLIC_VISUAL_QA_DECISION } from "./proofLayerPublicVisualQA";
import { PROOF_LAYER_COPY_LINK_QA_DECISION } from "./proofLayerCopyLinkQA";
import { selectedPublicProofAssets } from "../data/proofAssetReviewSelection";

export const PROOF_LAYER_PUBLIC_ACTIVATION_CLOSEOUT = {
  phase: "v2.6-E",
  status: "closed-public-limited",
  publicActivation: FEATURES.proofLayer,
  activationScope: PROOF_LAYER_LIMITED_ACTIVATION_RECORD.scope,
  renderedAssetCount: selectedPublicProofAssets.length,
  sourceDecisions: {
    limitedActivation: PROOF_LAYER_LIMITED_ACTIVATION_RECORD.status,
    publicVisualQa: PROOF_LAYER_PUBLIC_VISUAL_QA_DECISION.status,
    copyLinkQa: PROOF_LAYER_COPY_LINK_QA_DECISION.status,
  },
  blockedSurfacesStillOff: ["testimonials", "booking", "caseStudies", "restricted-project-proof"],
  decisionSummary:
    "v2.6 is complete. The limited public proof layer is activated for selected identity, CV, deployment, and repository assets only. Higher-trust surfaces remain gated.",
  nextSafeSprint: "v2.7-trust-content-evidence-collection-or-proof-layer-visual-polish",
} as const;

export const PROOF_LAYER_PUBLIC_ACTIVATION_GUARDRAILS = [
  "Keep testimonials disabled until recommendation evidence is approved.",
  "Keep booking disabled until URL, availability, purpose, and follow-up workflow are approved.",
  "Keep case studies disabled until screenshots, outcomes, and disclosure boundaries are approved.",
  "Keep restricted project proof out of public rendering until redaction boundaries are approved.",
  "Do not add placeholder proof or unapproved claims.",
] as const;

export const proofLayerPublicActivationCloseoutIsSafe =
  PROOF_LAYER_PUBLIC_ACTIVATION_CLOSEOUT.status === "closed-public-limited" &&
  FEATURES.proofLayer === true &&
  selectedPublicProofAssets.length > 0;
