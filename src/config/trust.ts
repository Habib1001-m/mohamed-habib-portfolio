/**
 * Runtime trust-gates configuration for the v3.1 Next.js port.
 *
 * Ported from the frozen Vite baseline (`repo_clone/src/config/trustContent.ts`),
 * keeping TRUST_CONTENT_GATES verbatim (publicActivation: false across all
 * surfaces, requiredEvidence + blockedStates preserved).
 *
 * The TRUST_CONTENT_READINESS_DECISION and TRUST_CONTENT_NEXT_SEQUENCE
 * history objects are decision-record artifacts (documentation-as-code) and
 * remain in the frozen Vite baseline — they are intentionally NOT ported here.
 *
 * Source of truth for TRUST_CONFIG (bookingUrl, testimonialsMinimumCount)
 * lives in `./features.ts` and is re-exported here for convenience.
 */
import { FEATURES, TRUST_CONFIG } from "./features";

export { TRUST_CONFIG };

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

/**
 * Per-surface readiness booleans. Each surface is "ready" only when its
 * feature flag is on AND its trust gate is publicly activated AND all
 * required evidence fields are populated.
 *
 * All three evaluate to `false` today because the feature flags and gate
 * activations are intentionally blocked pending real evidence.
 */
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

/**
 * Aggregate trust-gates readiness. `false` until ALL three surfaces are ready.
 */
export const trustGatesAreReady = Boolean(
  testimonialsTrustReady && bookingTrustReady && caseStudiesTrustReady
);
