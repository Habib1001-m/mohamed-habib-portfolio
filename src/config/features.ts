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
};

export const TRUST_CONFIG = {
  bookingUrl: null as string | null,
  testimonialsMinimumCount: 3,
} as const;

export type FeatureName = keyof FeatureFlags;
