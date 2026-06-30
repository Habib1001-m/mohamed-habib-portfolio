import { FEATURES, TRUST_CONFIG } from "./features";

export interface TrustContentGate {
  publicActivation: boolean;
  requiredEvidence: readonly string[];
  blockedStates: readonly string[];
}

export interface TrustContentGateWithMinimum extends TrustContentGate {
  minimumApprovedCount: number;
}

export const TRUST_CONTENT_GATES = {
  testimonials: {
    publicActivation: false,
    minimumApprovedCount: TRUST_CONFIG.testimonialsMinimumCount,
    requiredEvidence: [
      "approvedForPublicUse",
      "sourceCategory",
      "authorName",
      "relationshipContext",
    ],
    blockedStates: ["placeholder", "anonymous-without-approval", "unverified-quote"],
  },
  booking: {
    publicActivation: false,
    requiredEvidence: [
      "approvedBookingUrl",
      "availabilityWindow",
      "callPurpose",
      "followUpWorkflow",
    ],
    blockedStates: ["placeholder-url", "unclear-offer", "overpromising-copy"],
  },
  caseStudies: {
    publicActivation: false,
    requiredEvidence: [
      "readyStatus",
      "proofSafeCopy",
      "approvedScreenshots",
      "approvedMetrics",
    ],
    blockedStates: ["draft", "restricted", "private-implementation-detail", "unapproved-metric"],
  },
} as const;

export const testimonialsTrustReady = Boolean(
  FEATURES.testimonials &&
    TRUST_CONTENT_GATES.testimonials.publicActivation &&
    TRUST_CONTENT_GATES.testimonials.requiredEvidence.length > 0 &&
    TRUST_CONTENT_GATES.testimonials.minimumApprovedCount >= TRUST_CONFIG.testimonialsMinimumCount
);

export const bookingTrustReady = Boolean(
  FEATURES.booking &&
    TRUST_CONTENT_GATES.booking.publicActivation &&
    TRUST_CONTENT_GATES.booking.requiredEvidence.length > 0 &&
    Boolean(TRUST_CONFIG.bookingUrl)
);

export const caseStudiesTrustReady = Boolean(
  FEATURES.caseStudies &&
    TRUST_CONTENT_GATES.caseStudies.publicActivation &&
    TRUST_CONTENT_GATES.caseStudies.requiredEvidence.length > 0
);

export const trustGatesAreReady = Boolean(
  testimonialsTrustReady && bookingTrustReady && caseStudiesTrustReady
);
