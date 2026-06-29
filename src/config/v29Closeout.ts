import { V29_OBSERVABILITY_REVIEW_DECISION } from "./v29ObservabilityReview";
import { V29_DEBUG_WORKFLOW_DECISION } from "./v29DebugWorkflow";
import { V29_INTERACTION_EVENT_QA_DECISION } from "./v29InteractionEventQAChecklist";
import { V29_V3_READINESS_DECISION } from "./v29V3Readiness";

export const V29_CLOSEOUT_DECISION = {
  phase: "v2.9-E",
  status: "closed-ready-for-v3-planning",
  publicActivation: true,
  nextMajorVersionWorkStarted: false,
  sourceDecisions: {
    observability: V29_OBSERVABILITY_REVIEW_DECISION.status,
    debugWorkflow: V29_DEBUG_WORKFLOW_DECISION.status,
    interactionEventQa: V29_INTERACTION_EVENT_QA_DECISION.status,
    v3Readiness: V29_V3_READINESS_DECISION.status,
  },
  completedWork: [
    "Observability review",
    "Debug workflow",
    "Interaction event QA checklist",
    "Next major version readiness decision",
    "v2.9 closeout",
  ],
  nextMajorVersionEntryGates: [
    "Framework path decision",
    "Motion system decision",
    "Performance budget",
    "Reduced motion and accessibility policy",
    "Trust-surface evidence boundaries",
  ],
  stillGated: ["testimonials", "booking", "caseStudies", "restricted-project-proof", "quickshed-case-study-proof"],
  decisionSummary:
    "v2.9 is complete as the final v2 readiness phase. The portfolio is ready to plan v3.0, while v3.0 work remains a separate major-version track.",
  nextSafeSprint: "v3.0-planning-and-cinematic-architecture",
} as const;

export const V29_CLOSEOUT_GUARDRAILS = [
  "Keep v3.0 work separate from v2.9 closeout.",
  "Do not add heavy visual systems without a performance budget.",
  "Do not add new trust surfaces without evidence approval.",
  "Keep reduced-motion and accessibility policy mandatory for the next major version.",
] as const;

export const v29CloseoutIsSafe =
  V29_CLOSEOUT_DECISION.status === "closed-ready-for-v3-planning" &&
  V29_CLOSEOUT_DECISION.nextMajorVersionWorkStarted === false;
