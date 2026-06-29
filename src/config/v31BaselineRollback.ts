export const V31_BASELINE_ROLLBACK = {
  phase: "v3.1-A",
  status: "baseline-rollback-recorded",
  implementationBranch: "feature-v31-implementation",
  baselineCommit: "34336253700f5444aea970e359dd8828b8391bfb",
  baselineStack: "vite-react",
  productionBehaviorChangeApproved: false,
  rollbackTarget: "34336253700f5444aea970e359dd8828b8391bfb",
  rollbackCommand: "git reset --hard 34336253700f5444aea970e359dd8828b8391bfb",
  requiredBeforeVisualWork: [
    "section-boundary-map",
    "safe-feature-flags",
    "lint-pass",
    "build-pass",
    "preview-deploy",
    "reduced-motion-check",
    "mobile-check",
  ],
  safeStartScope: ["section-map", "motion-shell", "feature-flag-wiring"],
  blockedStartScope: ["preloader", "webgl-background", "custom-cursor", "page-transitions"],
  decisionSummary:
    "v3.1-A records the production baseline and rollback target before any cinematic implementation work begins.",
  nextSafeSprint: "v3.1-B-section-map-and-component-boundaries",
} as const;

export const v31BaselineRollbackIsSafe =
  V31_BASELINE_ROLLBACK.status === "baseline-rollback-recorded" &&
  V31_BASELINE_ROLLBACK.productionBehaviorChangeApproved === false;
