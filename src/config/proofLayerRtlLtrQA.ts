import { FEATURES } from "./features";
import { PROOF_LAYER_VISUAL_QA_REVIEW_DECISION } from "./proofLayerVisualQAReview";

export interface ProofLayerDirectionQACheck {
  id: string;
  status: "pass" | "watch" | "blocked";
  description: string;
}

export const PROOF_LAYER_RTL_LTR_QA: ProofLayerDirectionQACheck[] = [
  {
    id: "proof-layer-active",
    status: FEATURES.proofLayer ? "pass" : "blocked",
    description: "The public proof layer is active during RTL/LTR QA.",
  },
  {
    id: "visual-qa-ready",
    status:
      PROOF_LAYER_VISUAL_QA_REVIEW_DECISION.status === "visual-qa-ready-for-polish"
        ? "pass"
        : "blocked",
    description: "The section passed the v2.7 visual QA gate before direction review.",
  },
  {
    id: "language-copy-available",
    status: "pass",
    description: "Proof layer copy is localized through the existing English and Arabic copy map.",
  },
  {
    id: "cta-layout-responsive",
    status: "watch",
    description: "CTA buttons are full-width on small screens and compact on larger screens to reduce wrapping risk.",
  },
  {
    id: "card-chip-direction-safe",
    status: "watch",
    description: "The proof type chip is visually separated from titles and should remain readable in RTL and LTR.",
  },
];

export const BLOCKING_PROOF_LAYER_DIRECTION_QA_IDS = PROOF_LAYER_RTL_LTR_QA.filter(
  (check) => check.status === "blocked"
).map((check) => check.id);

export const proofLayerDirectionQAPassed = BLOCKING_PROOF_LAYER_DIRECTION_QA_IDS.length === 0;

export const PROOF_LAYER_RTL_LTR_QA_DECISION = {
  phase: "v2.7-C",
  status: proofLayerDirectionQAPassed ? "rtl-ltr-qa-pass-with-watch-items" : "rtl-ltr-qa-blocked",
  publicActivation: FEATURES.proofLayer,
  blockingQaIds: BLOCKING_PROOF_LAYER_DIRECTION_QA_IDS,
  watchItems: PROOF_LAYER_RTL_LTR_QA.filter((check) => check.status === "watch").map(
    (check) => check.id
  ),
  decisionSummary:
    "RTL/LTR QA has no blocking issues. The proof layer keeps bilingual copy and responsive CTAs, with chip and wrapping behavior marked for visual watch.",
  nextSafeSprint: "v2.7-D-proof-link-and-cta-polish",
} as const;
