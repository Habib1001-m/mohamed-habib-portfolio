export const FEATURES = {
  testimonials: false,
  booking: false,
  caseStudies: false,
  proofLayer: false,
  motionPrototype: true,
  scrollProgress: true,
  sectionHeadingReveal: true,
  projectCardStagger: true,
  customCursor: false,
} as const;

export const TRUST_CONFIG = {
  bookingUrl: null as string | null,
  testimonialsMinimumCount: 3,
} as const;

export type FeatureName = keyof typeof FEATURES;
