export interface V29ObservabilityCheck {
  id: string;
  status: "pass" | "watch" | "blocked";
  description: string;
}

export const V29_OBSERVABILITY_REVIEW: V29ObservabilityCheck[] = [
  {
    id: "v28-complete",
    status: "pass",
    description: "v2.8 interaction analytics is complete before the v2.9 review.",
  },
  {
    id: "first-party-signal-ready",
    status: "pass",
    description: "The proof asset click signal is ready for local browser review.",
  },
  {
    id: "provider-decision-deferred",
    status: "pass",
    description: "No new analytics provider is enabled in this phase.",
  },
  {
    id: "manual-review-needed",
    status: "watch",
    description: "The signal should be inspected manually before any future reporting provider decision.",
  },
];

export const BLOCKING_V29_OBSERVABILITY_IDS = V29_OBSERVABILITY_REVIEW.filter(
  (check) => check.status === "blocked"
).map((check) => check.id);

export const v29ObservabilityReviewPassed = BLOCKING_V29_OBSERVABILITY_IDS.length === 0;

export const V29_OBSERVABILITY_REVIEW_DECISION = {
  phase: "v2.9-A",
  status: v29ObservabilityReviewPassed ? "observability-review-pass" : "observability-review-blocked",
  publicActivation: true,
  blockingQaIds: BLOCKING_V29_OBSERVABILITY_IDS,
  decisionSummary:
    "v2.9 observability review is ready and keeps provider activation deferred.",
  nextSafeSprint: "v2.9-B-debug-workflow",
} as const;
