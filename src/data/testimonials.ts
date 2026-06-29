import { TRUST_CONFIG } from "../config/features";

export interface Testimonial {
  id: string;
  quote: {
    en: string;
    ar: string;
  };
  author: string;
  role?: string;
  relation: "mentor" | "collaborator" | "client" | "manager" | "peer";
  approvedForPublicUse: boolean;
  source?: "linkedin" | "email" | "direct" | "documented";
}

export const TESTIMONIALS: Testimonial[] = [];

export const testimonialsAreReady =
  TESTIMONIALS.filter((testimonial) => testimonial.approvedForPublicUse).length >=
  TRUST_CONFIG.testimonialsMinimumCount;
