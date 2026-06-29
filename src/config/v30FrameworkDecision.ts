export type V30FrameworkOptionId =
  | "keep-current-vite"
  | "parallel-next-planning"
  | "immediate-rebuild";

export type V30FrameworkOptionStatus = "recommended" | "acceptable" | "rejected";

export interface V30FrameworkOption {
  id: V30FrameworkOptionId;
  status: V30FrameworkOptionStatus;
  rationale: string;
  risks: string[];
}

export const V30_FRAMEWORK_OPTIONS: V30FrameworkOption[] = [
  {
    id: "keep-current-vite",
    status: "acceptable",
    rationale:
      "The current Vite and React stack is stable, deployed, measurable, and already supports the active proof layer.",
    risks: [
      "Cinematic routing, metadata control, and long-form case-study storytelling may need extra custom structure.",
    ],
  },
  {
    id: "parallel-next-planning",
    status: "recommended",
    rationale:
      "Plan a parallel Next.js-style architecture while keeping the current production build stable as the rollback baseline.",
    risks: [
      "Requires a careful route, asset, SEO, deployment, and interaction tracking migration plan before execution.",
    ],
  },
  {
    id: "immediate-rebuild",
    status: "rejected",
    rationale:
      "A direct rewrite would increase risk before the cinematic architecture, motion system, and performance budget are approved.",
    risks: ["Could break the currently stable public portfolio and trust/proof gates."],
  },
];

export const V30_FRAMEWORK_DECISION = {
  phase: "v3.0-A",
  status: "framework-decision-recorded",
  recommendedPath: "parallel-next-planning",
  currentProductionStack: "vite-react",
  executionApproved: false,
  migrationApprovedNow: false,
  productionBaselineMustRemainStable: true,
  requiredBeforeExecution: [
    "route-and-section-map",
    "seo-and-metadata-preservation-plan",
    "motion-system-decision",
    "performance-budget",
    "deployment-rollback-plan",
    "trust-gate-preservation-check",
  ],
  decisionSummary:
    "v3.0-A approves a parallel framework migration planning path, not an immediate rebuild. Current production remains stable while the cinematic architecture is designed.",
  nextSafeSprint: "v3.0-B-cinematic-information-architecture",
} as const;
