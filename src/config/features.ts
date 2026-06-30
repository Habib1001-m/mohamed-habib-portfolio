export interface FeatureFlags {
  testimonials: boolean;
  booking: boolean;
  caseStudies: boolean;
  proofLayer: boolean;
  motionPrototype: boolean;
  scrollProgress: boolean;
  sectionHeadingReveal: boolean;
  projectCardStagger: boolean;
  customCursor: boolean;
  /** v3.1 flag — framer-motion runtime is intentionally disabled until the motion shell in v3.1-B is validated. */
  framerMotion: boolean;
}

export const FEATURES: FeatureFlags = {
  testimonials: false,
  booking: false,
  caseStudies: false,
  proofLayer: true,
  motionPrototype: true,
  scrollProgress: true,
  sectionHeadingReveal: true,
  projectCardStagger: true,
  customCursor: false,
  framerMotion: false,
};

export const TRUST_CONFIG = {
  bookingUrl: null as string | null,
  testimonialsMinimumCount: 3,
} as const;

export type FeatureName = keyof FeatureFlags;
