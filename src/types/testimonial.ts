export type TestimonialRelation = "mentor" | "collaborator" | "client" | "manager" | "peer";

export type TestimonialSource = "linkedin" | "email" | "direct" | "documented";

export type TestimonialReviewStatus = "needs-review" | "approved" | "rejected" | "archived";

export interface LocalizedQuote {
  en: string;
  ar: string;
}

export interface PublicTestimonial {
  id: string;
  quote: LocalizedQuote;
  author: string;
  role?: string;
  relation: TestimonialRelation;
  approvedForPublicUse: boolean;
  source?: TestimonialSource;
}

export interface TestimonialEvidence {
  source: TestimonialSource;
  receivedAt?: string;
  approvedAt?: string;
  approvalReference?: string;
  publicUseApproved: boolean;
}

export interface TestimonialReviewQueueItem {
  id: string;
  status: TestimonialReviewStatus;
  candidateName: string;
  candidateRole?: string;
  relation: TestimonialRelation;
  draftQuote: LocalizedQuote;
  evidence: TestimonialEvidence;
  reviewerNotes?: string;
  publishCandidate: boolean;
}
