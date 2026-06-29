export const V31_BASELINE_ROLLBACK_PLAN = {
  phase: "v3.1-A",
  status: "baseline-rollback-recorded",
  baselineCommit: "34336253700f5444aea970e359dd8828b8391bfb",
  baselineVercelStatus: "success",
  productionBranch: "main",
  implementationBranch: "feature-v31-baseline",
  productionBehaviorChangeApproved: false,
  rollbackStrategy: {
    primary: "revert-or-reset-to-baseline-commit",
    baselineCommit: "34336253700f5444aea970e359dd8828b8391bfb",
    requiredBeforeMerge: ["lint", "build", "preview-deploy", "mobile-qa", "reduced-motion-qa"],
    rollbackTrigger: ["build-failure", "preview-regression", "motion-accessibility-regression", "proof-layer-regression"],
  },
  preservedPublicSurfaces: [
    "proofLayer",
    "cvLinks",
    "repositoryLink",
    "contactLinks",
    "analyticsBrowserEvent",
  ],
  stillGated: ["testimonials", "booking", "caseStudies", "restrictedProof", "customCursor"],
  decisionSummary:
    "v3.1-A records the stable production baseline and rollback plan before any implementation work begins.",
  nextSafeSprint: "v3.1-B-section-map-and-component-boundaries",
} as const;

export const v31BaselineRollbackPlanIsSafe =
  V31_BASELINE_ROLLBACK_PLAN.status === "baseline-rollback-recorded" &&
  V31_BASELINE_ROLLBACK_PLAN.productionBehaviorChangeApproved === false;
