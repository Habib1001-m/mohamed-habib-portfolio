export interface LocalizedText {
  en: string;
  ar: string;
}

export type CaseStudyStatus = "draft" | "ready" | "restricted";

export interface CaseStudySection {
  title: LocalizedText;
  body: LocalizedText;
}

export interface CaseStudyHighlight {
  label: LocalizedText;
  value: string;
}

export interface CaseStudyArtifact {
  label: LocalizedText;
  description: LocalizedText;
  href?: string;
  restrictedAccess?: boolean;
}

export interface CaseStudy {
  projectId: string;
  slug: string;
  status: CaseStudyStatus;
  title: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  role: LocalizedText;
  decisions: CaseStudySection[];
  challenges: CaseStudySection[];
  outcomes: CaseStudyHighlight[];
  artifacts: CaseStudyArtifact[];
  verification: LocalizedText;
  publishNotes: LocalizedText;
}
