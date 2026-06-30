export const FEATURES = {
  testimonials: false,
  booking: false,
  caseStudies: false,
  proofLayer: true,
  scrollProgress: true,
} as const;

export const TRUST_CONFIG = {
  bookingUrl: null as string | null,
  testimonialsMinimumCount: 3,
} as const;
