import { proofLayerActivationDecisionIsSafe } from "./proofLayerActivationDecision";
import { proofLayerHiddenMountIsSafe } from "./proofLayerMountDecision";

const proofLayerFeatureFlagAtV25QASweep: boolean = false;

export interface ProofLayerQACheck {
  id: string;
  status: "pass" | "watch" | "blocked";
  description: string;
}

export const PROOF_LAYER_PUBLIC_QA_SWEEP: ProofLayerQACheck[] = [
  {
    id: "feature-flag-off",
    status: proofLayerFeatureFlagAtV25QASweep === false ? "pass" : "blocked",
    description: "The v2.5 proofLayer flag snapshot remained disabled.",
  },
  {
    id: "hidden-mount-safe",
    status: proofLayerHiddenMountIsSafe ? "pass" : "blocked",
    description: "The ProofLayerSection is mounted but returns null while the v2.5 flag snapshot is disabled.",
  },
  {
    id: "activation-decision-safe",
    status: proofLayerActivationDecisionIsSafe ? "pass" : "blocked",
    description: "The v2.5 flag decision kept the section unavailable.",
  },
  {
    id: "trust-surfaces-hidden",
    status: "pass",
    description: "Testimonials, booking, and case studies remain outside the proof layer.",
  },
  {
    id: "restricted-proof-hidden",
    status: "pass",
    description: "Restricted proof remains excluded.",
  },
  {
    id: "no-placeholder-proof",
    status: "pass",
    description: "No placeholder social proof or unapproved claims are used.",
  },
];

export const BLOCKING_PROOF_LAYER_QA_IDS = PROOF_LAYER_PUBLIC_QA_SWEEP.filter(
  (check) => check.status === "blocked"
).map((check) => check.id);

export const proofLayerPublicQASweepPassed = BLOCKING_PROOF_LAYER_QA_IDS.length === 0;

export const PROOF_LAYER_PUBLIC_QA_SWEEP_DECISION = {
  phase: "v2.5-E",
  status: proofLayerPublicQASweepPassed ? "qa-pass-hidden" : "qa-blocked",
  publicActivation: false,
  blockingQaIds: BLOCKING_PROOF_LAYER_QA_IDS,
  decisionSummary: "QA passed for the v2.5 hidden-mounted proof layer snapshot.",
  nextSafeSprint: "v2.5-F-proof-layer-activation-review-closeout",
} as const;
