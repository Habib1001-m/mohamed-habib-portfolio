export type V29V3Status = "ready" | "review" | "blocked";

export interface V29V3Gate {
  id: string;
  status: V29V3Status;
  note: string;
}

export const V29_V3_GATES: V29V3Gate[] = [
  {
    id: "proof-layer-stable",
    status: "ready",
    note: "The proof layer is active, polished, and measurable.",
  },
  {
    id: "trust-gates-stable",
    status: "ready",
    note: "Testimonials, booking, case studies, and restricted proof stay gated.",
  },
  {
    id: "app-framework-choice",
    status: "review",
    note: "The next major version should choose the app framework path.",
  },
  {
    id: "motion-system-choice",
    status: "review",
    note: "The next major version should choose the motion system path.",
  },
  {
    id: "performance-budget",
    status: "review",
    note: "The next major version should set a budget for visual work.",
  },
];

export const BLOCKING_V29_V3_GATE_IDS = V29_V3_GATES.filter((gate) => gate.status === "blocked").map(
  (gate) => gate.id
);

export const REVIEW_V29_V3_GATE_IDS = V29_V3_GATES.filter((gate) => gate.status === "review").map(
  (gate) => gate.id
);

export const V29_V3_READINESS_DECISION = {
  phase: "v2.9-D",
  status: BLOCKING_V29_V3_GATE_IDS.length === 0 ? "ready-for-v3-planning" : "blocked-for-v3-planning",
  publicActivation: true,
  nextMajorVersionWorkStarted: false,
  blockingGateIds: BLOCKING_V29_V3_GATE_IDS,
  reviewGateIds: REVIEW_V29_V3_GATE_IDS,
  decisionSummary:
    "v2.9 confirms the current portfolio is ready to plan the next major version, while the next major work remains separate.",
  nextSafeSprint: "v2.9-E-pre-v3-closeout",
} as const;
