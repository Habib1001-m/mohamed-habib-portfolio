export const V30_PLAN_E = {
  phase: "v3.0-E",
  status: "recorded",
  executionApproved: false,
  reducedMotionRequired: true,
  keyboardAccessRequired: true,
  readableContrastRequired: true,
  noEssentialMotion: true,
  requiredBeforeExecution: ["prefers-reduced-motion", "focus-states", "aria-review", "rtl-ltr-review"],
  nextSafeSprint: "v3.0-F",
} as const;
