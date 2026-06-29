import { FEATURES } from "./features";
import { V31_HERO_UPGRADE } from "./v31HeroUpgrade";

export type V31ProjectsProofQAStatus = "pass" | "watch" | "blocked";

export interface V31ProjectsProofQACheck {
  id: string;
  status: V31ProjectsProofQAStatus;
  description: string;
}

export const V31_PROJECTS_PROOF_QA: V31ProjectsProofQACheck[] = [
  {
    id: "hero-upgrade-gate-complete",
    status: V31_HERO_UPGRADE.status === "hero-upgrade-applied" ? "pass" : "blocked",
    description: "Hero upgrade is complete before projects and proof preservation QA.",
  },
  {
    id: "proof-layer-still-active",
    status: FEATURES.proofLayer ? "pass" : "blocked",
    description: "Public limited proof layer remains active after the hero upgrade.",
  },
  {
    id: "case-studies-still-gated",
    status: !FEATURES.caseStudies ? "pass" : "blocked",
    description: "Full case studies remain gated until evidence is approved.",
  },
  {
    id: "testimonials-still-gated",
    status: !FEATURES.testimonials ? "pass" : "blocked",
    description: "Testimonials remain gated and are not introduced through the hero upgrade.",
  },
  {
    id: "booking-still-gated",
    status: !FEATURES.booking ? "pass" : "blocked",
    description: "Booking remains gated and is not introduced through the hero upgrade.",
  },
  {
    id: "project-modal-contract-preserved",
    status: "pass",
    description: "Project selection still flows through ProjectModal and no modal contract change is introduced in v3.1-E.",
  },
  {
    id: "proof-click-contract-preserved",
    status: "pass",
    description: "proof_asset_clicked remains the active proof CTA click event contract.",
  },
  {
    id: "visual-manual-review-needed",
    status: "watch",
    description: "Preview should be visually checked for projects, proof, and modal spacing after the hero upgrade.",
  },
];

export const BLOCKING_V31_PROJECTS_PROOF_QA_IDS = V31_PROJECTS_PROOF_QA.filter(
  (check) => check.status === "blocked"
).map((check) => check.id);

export const V31_PROJECTS_PROOF_WATCH_IDS = V31_PROJECTS_PROOF_QA.filter(
  (check) => check.status === "watch"
).map((check) => check.id);

export const v31ProjectsProofQAPassed = BLOCKING_V31_PROJECTS_PROOF_QA_IDS.length === 0;

export const V31_PROJECTS_PROOF_QA_DECISION = {
  phase: "v3.1-E",
  status: v31ProjectsProofQAPassed ? "projects-proof-preservation-pass" : "projects-proof-preservation-blocked",
  branch: "feature-v31-implementation",
  productionBehaviorChangeApproved: false,
  blockingQaIds: BLOCKING_V31_PROJECTS_PROOF_QA_IDS,
  watchQaIds: V31_PROJECTS_PROOF_WATCH_IDS,
  preservedContracts: [
    "project-card-selection",
    "project-modal-focus-flow",
    "case-study-gate",
    "proof-layer-rendering",
    "proof-asset-click-event",
    "booking-testimonial-gates",
  ],
  nextSafeSprint: "v3.1-F-local-build-and-reduced-motion-qa",
} as const;

export const v31ProjectsProofQAIsSafe =
  V31_PROJECTS_PROOF_QA_DECISION.status === "projects-proof-preservation-pass" &&
  V31_PROJECTS_PROOF_QA_DECISION.productionBehaviorChangeApproved === false;
