/**
 * Runtime motion configuration for the v3.1 Next.js port.
 *
 * Ported from the frozen Vite baseline (`repo_clone/src/config/motion.ts`),
 * keeping MOTION_CONFIG and MOTION_ACCEPTANCE_CRITERIA verbatim.
 *
 * The MOTION_READINESS_DECISION and MOTION_CLOSEOUT_DECISION history objects
 * are decision-record artifacts (documentation-as-code) and remain in the
 * frozen Vite baseline — they are intentionally NOT ported here.
 */
export const MOTION_CONFIG = {
  enabled: true,
  desktopOnly: false,
  respectReducedMotion: true,
  provider: "native-scroll",
  activePrototype: "motion-closeout",
  activePrototypes: ["scroll-progress", "section-heading-reveal", "project-card-stagger"],
  prototypeTargets: ["section-heading-reveal", "project-card-stagger", "scroll-progress"],
  disabledTargets: ["preloader", "custom-cursor", "page-transitions"],
  /** v3.1 flag — framer-motion runtime is gated off until v3.1-B validates the motion shell. */
  framerMotion: false,
  /** v3.1 fallback strategy when prefers-reduced-motion is active or motion is disabled. */
  reducedMotionFallback: "static",
} as const;

export const MOTION_ACCEPTANCE_CRITERIA = [
  "No layout shift.",
  "No mobile jank.",
  "No accessibility regression.",
  "Reduced-motion users receive static content.",
  "Bundle increase remains justified by UX value.",
] as const;

export type MotionConfig = typeof MOTION_CONFIG;
