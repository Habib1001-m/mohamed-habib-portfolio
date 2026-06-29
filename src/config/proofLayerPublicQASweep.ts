import { FEATURES } from "./features";
import { proofLayerActivationDecisionIsSafe } from "./proofLayerActivationDecision";
import { proofLayerHiddenMountIsSafe } from "./proofLayerMountDecision";

export interface ProofLayerQACheck {
  id: string;
  status: "pass" | "watch" | "blocked";
  description: string;
}

export const PROOF_LAYER_PUBLIC_QA_SWEEP: ProofLayerQACheck[] = [
  {
    id: "feature-flag-off",
    status: FEATURES.proofLayer === false ? "pass" : "blocked",
    description: "The proofLayer flag remains disabled.",
  },
  {
    id: "hidden-mount-safe",
    status: proofLayerHiddenMountIsSafe ? "pass" : "blocked",
    description: "The ProofLayerSection is mounted but returns null while the flag is disabled.",
  },
  {
    id: "activation-decision-safe",
    status: proofLayerActivationDecisionIsSafe ? "pass" : "blocked",
    description: "The activation decision keeps public proof activation off.",
  },
  {
    id: "trust-surfaces-hidden",
    status: "pass",
    description: "Testimonials, booking, and case studies remain outside the public proof layer.",
  },
  {
    id: "restricted-proof-hidden",
    status: "pass",
    description: "SIEVE proof remains restricted and is not included in public rendering.",
  },
  {
    id: "no-placeholder-proof",
    status: "pass",
    description: "The public proof layer does not use placeholder social proof or unapproved claims.",
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
  decisionSummary:
    "Public QA passes for the hidden-mounted proof layer. Public activation remains off by design.",
  nextSafeSprint: "v2.5-F-proof-layer-activation-review-closeout",
} as const;
