import { V30_FRAMEWORK_DECISION } from "./v30FrameworkDecision";
import { V30_PLAN_B } from "./v30PlanB";
import { V30_PLAN_C } from "./v30PlanC";
import { V30_PLAN_D } from "./v30PlanD";
import { V30_PLAN_E } from "./v30PlanE";
import { V30_PLAN_F } from "./v30PlanF";

export const V30_PLAN_G = {
  phase: "v3.0-G",
  status: "execution-plan-recorded",
  implementationApproved: false,
  sourceDecisions: {
    framework: V30_FRAMEWORK_DECISION.status,
    ia: V30_PLAN_B.status,
    motion: V30_PLAN_C.status,
    budget: V30_PLAN_D.status,
    accessibility: V30_PLAN_E.status,
    visualScope: V30_PLAN_F.status,
  },
  plannedBuildOrder: [
    "baseline-snapshot",
    "section-map",
    "motion-shell",
    "hero-upgrade",
    "projects-upgrade",
    "proof-layer-preservation",
    "qa-and-rollback",
  ],
  finalRequiredGates: ["lint", "build", "preview", "mobile-qa", "reduced-motion-qa"],
  nextSafeSprint: "v3.0-H-closeout",
} as const;
