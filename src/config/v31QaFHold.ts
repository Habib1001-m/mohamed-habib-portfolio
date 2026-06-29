export const V31_QA_F_HOLD = {
  phase: "v3.1-F",
  status: "hold",
  branch: "feature-v31-implementation",
  productionBehaviorChangeApproved: false,
  reason: "preview provider limit",
  codeRegressionConfirmed: false,
  requiredBeforeNext: ["restore-preview-success", "local-lint", "local-build"],
  nextSafeSprint: "v3.1-F-recheck",
} as const;
