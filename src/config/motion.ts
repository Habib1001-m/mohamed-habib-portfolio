export const MOTION_READINESS_DECISION = {
  phase: "2H-F",
  trustFoundationStatus: "closed",
  nextSprint: "v2.2-motion-layer",
  decision: "prototype-only",
  rationale:
    "Trust foundation is stable, gated features are not public, and the next safe improvement is a limited motion prototype rather than a full cinematic rollout.",
  hardRules: [
    "No GSAP everywhere.",
    "No Next.js migration for v2.2.",
    "No preloader until section motion is validated.",
    "No custom cursor on touch devices.",
    "Respect prefers-reduced-motion.",
    "Keep all trust features gated until content is approved.",
  ],
} as const;

export const MOTION_CONFIG = {
  enabled: true,
  desktopOnly: false,
  respectReducedMotion: true,
  provider: "native-scroll",
  activePrototype: "motion-closeout",
  activePrototypes: ["scroll-progress", "section-heading-reveal", "project-card-stagger"],
  prototypeTargets: ["section-heading-reveal", "project-card-stagger", "scroll-progress"],
  disabledTargets: ["preloader", "custom-cursor", "page-transitions"],
} as const;

export const MOTION_ACCEPTANCE_CRITERIA = [
  "No layout shift.",
  "No mobile jank.",
  "No accessibility regression.",
  "Reduced-motion users receive static content.",
  "Bundle increase remains justified by UX value.",
] as const;

export const MOTION_CLOSEOUT_DECISION = {
  phase: "v2.2-D",
  status: "go-limited-rollout",
  publicMotionLayer: "approved",
  fullCinematicRollout: "no-go",
  approvedProductionEffects: ["scroll-progress", "section-heading-reveal", "project-card-stagger"],
  blockedEffects: ["preloader", "custom-cursor", "page-transitions", "gsap-sitewide"],
  decisionSummary:
    "The native motion prototype passed deployment and QA gates. Keep the lightweight production motion layer active, but do not escalate to a cinematic portfolio system yet.",
  nextSafeSprint: "v2.3-trust-content-readiness",
} as const;
