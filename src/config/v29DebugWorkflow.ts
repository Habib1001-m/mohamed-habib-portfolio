import { ANALYTICS_CONFIG } from "./analytics";
import { V29_OBSERVABILITY_REVIEW_DECISION } from "./v29ObservabilityReview";

export interface V29DebugWorkflowStep {
  id: string;
  status: "ready" | "watch" | "blocked";
  instruction: string;
}

export const V29_DEBUG_WORKFLOW: V29DebugWorkflowStep[] = [
  {
    id: "open-local-or-preview",
    status: "ready",
    instruction: "Open the portfolio in local or Vercel preview mode.",
  },
  {
    id: "attach-browser-listener",
    status: "ready",
    instruction: "Attach a listener for the configured first-party browser event name.",
  },
  {
    id: "click-proof-cta",
    status: "ready",
    instruction: "Click each visible proof asset CTA once.",
  },
  {
    id: "verify-safe-payload",
    status: "ready",
    instruction: "Confirm event name and structured params only.",
  },
  {
    id: "record-manual-result",
    status: "watch",
    instruction: "Record screenshots or console notes only when visual proof is needed.",
  },
];

export const V29_DEBUG_WORKFLOW_DECISION = {
  phase: "v2.9-B",
  status:
    V29_OBSERVABILITY_REVIEW_DECISION.status === "observability-review-pass"
      ? "debug-workflow-ready"
      : "debug-workflow-blocked",
  publicActivation: true,
  browserEventName: ANALYTICS_CONFIG.browserEventName,
  steps: V29_DEBUG_WORKFLOW.map((step) => step.id),
  decisionSummary:
    "The v2.9 debug workflow is ready for checking first-party proof asset interaction events before v3.0 planning.",
  nextSafeSprint: "v2.9-C-interaction-event-qa-checklist",
} as const;

export const v29DebugWorkflowIsReady =
  V29_DEBUG_WORKFLOW_DECISION.status === "debug-workflow-ready" &&
  V29_DEBUG_WORKFLOW.every((step) => step.status !== "blocked");
