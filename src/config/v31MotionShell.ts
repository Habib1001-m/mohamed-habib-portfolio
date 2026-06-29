import { V31_COMPONENT_BOUNDARY_DECISION } from "./v31SectionBoundaries";

export const V31_MOTION_SHELL = {
  phase: "v3.1-C",
  status: "motion-shell-wired",
  branch: "feature-v31-implementation",
  productionBehaviorChangeApproved: false,
  shellComponent: "RevealShell",
  wrappedSections: ["hero", "projects"],
  preservedSections: V31_COMPONENT_BOUNDARY_DECISION.preservationTargets,
  nextSafeSprint: "v3.1-D-hero-cinematic-upgrade",
} as const;

export const v31MotionShellIsSafe =
  V31_MOTION_SHELL.status === "motion-shell-wired" &&
  V31_MOTION_SHELL.productionBehaviorChangeApproved === false;
