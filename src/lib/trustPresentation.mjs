/**
 * @typedef {{
 *   approvedForPublicUse: boolean
 * }} TestimonialCandidate
 */

/**
 * @param {{
 *   featureEnabled: boolean,
 *   trustReady: boolean,
 *   minimumCount: number,
 *   testimonials: TestimonialCandidate[]
 * }} input
 */
export function canPublishTestimonials(input) {
  const approvedCount = input.testimonials.filter(
    (testimonial) => testimonial.approvedForPublicUse,
  ).length;
  return Boolean(
    input.featureEnabled
      && input.trustReady
      && approvedCount >= input.minimumCount,
  );
}

/**
 * @param {{
 *   featureEnabled: boolean,
 *   trustReady: boolean,
 *   workflowReady: boolean,
 *   bookingUrl: string | null
 * }} input
 */
export function canPublishBooking(input) {
  return Boolean(
    input.featureEnabled
      && input.trustReady
      && input.workflowReady
      && input.bookingUrl,
  );
}
