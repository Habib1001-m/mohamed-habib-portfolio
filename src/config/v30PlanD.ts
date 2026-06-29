export const V30_PLAN_D = {
  phase: "v3.0-D",
  status: "recorded",
  executionApproved: false,
  targetLighthouseMobile: 90,
  maxNewRuntimeDepsBeforeApproval: 0,
  maxInitialJsKbTarget: 220,
  maxHeroBlockingMsTarget: 200,
  requiredChecks: ["lint", "build", "mobile-qa", "reduced-motion-qa"],
  nextSafeSprint: "v3.0-E",
} as const;
