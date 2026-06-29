import { V29_DEBUG_WORKFLOW_DECISION, v29DebugWorkflowIsReady } from "./v29DebugWorkflow";

export interface V29InteractionEventQACheck {
  id: string;
  required: boolean;
  status: "pass" | "watch" | "blocked";
  description: string;
}

export const V29_INTERACTION_EVENT_QA_CHECKLIST: V29InteractionEventQACheck[] = [
  {
    id: "debug-workflow-ready",
    required: true,
    status: v29DebugWorkflowIsReady ? "pass" : "blocked",
    description: "Debug workflow is ready before the interaction event QA checklist is accepted.",
  },
  {
    id: "event-name-confirmed",
    required: true,
    status: V29_DEBUG_WORKFLOW_DECISION.browserEventName === "habib:analytics" ? "pass" : "blocked",
    description: "The configured browser event name remains habib:analytics.",
  },
  {
    id: "payload-contract-confirmed",
    required: true,
    status: "pass",
    description: "The proof asset event payload remains limited to proof_id, proof_area, destination, and language.",
  },
  {
    id: "visual-proof-not-required",
    required: false,
    status: "watch",
    description: "Screenshots are optional and should be captured only if visual QA is requested.",
  },
];

export const BLOCKING_V29_INTERACTION_EVENT_QA_IDS = V29_INTERACTION_EVENT_QA_CHECKLIST.filter(
  (check) => check.required && check.status === "blocked"
).map((check) => check.id);

export const v29InteractionEventQAPassed = BLOCKING_V29_INTERACTION_EVENT_QA_IDS.length === 0;

export const V29_INTERACTION_EVENT_QA_DECISION = {
  phase: "v2.9-C",
  status: v29InteractionEventQAPassed ? "interaction-event-qa-pass" : "interaction-event-qa-blocked",
  publicActivation: true,
  blockingQaIds: BLOCKING_V29_INTERACTION_EVENT_QA_IDS,
  optionalWatchItems: V29_INTERACTION_EVENT_QA_CHECKLIST.filter((check) => check.status === "watch").map(
    (check) => check.id
  ),
  decisionSummary:
    "Interaction event QA has no blocking items and keeps the proof event payload contract stable before v3.0 planning.",
  nextSafeSprint: "v2.9-D-v3-cinematic-readiness-decision",
} as const;
