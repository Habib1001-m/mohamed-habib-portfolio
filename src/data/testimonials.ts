import { TRUST_CONFIG } from "../config/features";
import { PublicTestimonial } from "../types/testimonial";

export type Testimonial = PublicTestimonial;

export const TESTIMONIALS: Testimonial[] = [];

export const testimonialsAreReady =
  TESTIMONIALS.filter((testimonial) => testimonial.approvedForPublicUse).length >=
  TRUST_CONFIG.testimonialsMinimumCount;
