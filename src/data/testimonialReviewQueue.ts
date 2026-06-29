import { TRUST_CONTENT_GATES } from "../config/trustContent";
import { TestimonialReviewQueueItem } from "../types/testimonial";

export const TESTIMONIAL_REVIEW_QUEUE: TestimonialReviewQueueItem[] = [];

export const testimonialReviewQueueIsReady =
  TESTIMONIAL_REVIEW_QUEUE.filter(
    (item) =>
      item.status === "approved" &&
      item.publishCandidate &&
      item.evidence.publicUseApproved
  ).length >= TRUST_CONTENT_GATES.testimonials.minimumApprovedCount;
