import { V31_MOTION_SHELL } from "./v31MotionShell";

export const V31_HERO_UPGRADE = {
  phase: "v3.1-D",
  status: "hero-upgrade-applied",
  branch: "feature-v31-implementation",
  productionBehaviorChangeApproved: false,
  sourceGate: V31_MOTION_SHELL.status,
  upgradedComponent: "HeroSection",
  completedWork: [
    "ambient-hero-background",
    "executive-interface-label",
    "headline-depth-polish",
    "primary-cta-glow-polish",
    "portrait-orbit-labels",
    "portrait-frame-depth-polish",
  ],
  preservedContracts: [
    "language-toggle-flow",
    "hero-cta-analytics",
    "cv-link",
    "portrait-color-toggle",
    "proof-layer-scope",
  ],
  nextSafeSprint: "v3.1-E-projects-proof-preservation-qa",
} as const;

export const v31HeroUpgradeIsSafe =
  V31_HERO_UPGRADE.status === "hero-upgrade-applied" &&
  V31_HERO_UPGRADE.productionBehaviorChangeApproved === false;
