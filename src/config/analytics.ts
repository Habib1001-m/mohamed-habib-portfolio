export const ANALYTICS_PROVIDER_DECISION = {
  phase: "2H-C",
  provider: "browser-events",
  externalProvider: "none",
  rationale:
    "Use first-party browser events for v2.1 so the portfolio becomes measurable without adding third-party scripts before the domain, consent, and reporting workflow are approved.",
  nextProviderCandidates: ["plausible", "ga4"],
} as const;

export const ANALYTICS_CONFIG = {
  enabled: true,
  debugInDevelopment: true,
  dispatchBrowserEvent: true,
  allowGtagForwarding: false,
  allowPlausibleForwarding: false,
  browserEventName: "habib:analytics",
} as const;

export const ANALYTICS_EVENTS = {
  hero_projects_clicked: {
    category: "navigation",
    description: "Hero primary CTA clicked to jump to projects.",
  },
  hero_contact_clicked: {
    category: "navigation",
    description: "Hero contact CTA clicked.",
  },
  cv_one_page_clicked: {
    category: "conversion",
    description: "One-page CV link clicked.",
  },
  cv_detailed_clicked: {
    category: "conversion",
    description: "Detailed CV link clicked.",
  },
  project_opened: {
    category: "project_engagement",
    description: "A project card or case-study affordance was opened.",
  },
  project_demo_clicked: {
    category: "project_validation",
    description: "Project live/demo link clicked.",
  },
  project_github_clicked: {
    category: "project_validation",
    description: "Project source link clicked.",
  },
  contact_card_clicked: {
    category: "conversion",
    description: "A contact card was clicked.",
  },
  contact_form_started: {
    category: "conversion",
    description: "User focused the contact form for the first time.",
  },
  contact_form_submitted: {
    category: "conversion",
    description: "Contact form submitted successfully.",
  },
  contact_form_failed: {
    category: "conversion_error",
    description: "Contact form failed validation or request delivery.",
  },
  github_clicked: {
    category: "external_profile",
    description: "Main GitHub profile clicked.",
  },
  linkedin_clicked: {
    category: "external_profile",
    description: "LinkedIn profile clicked.",
  },
  email_clicked: {
    category: "conversion",
    description: "Email contact link clicked.",
  },
  booking_clicked: {
    category: "future_conversion",
    description: "Future booking CTA clicked. Gated until booking is enabled.",
  },
  testimonials_viewed: {
    category: "future_trust",
    description: "Future testimonials section viewed. Gated until testimonials are enabled.",
  },
  case_study_viewed: {
    category: "future_trust",
    description: "Future full case-study panel viewed. Gated until case studies are enabled.",
  },
  motion_layer_loaded: {
    category: "future_motion",
    description: "Future motion layer loaded. Gated until motion prototype is enabled.",
  },
} as const;

export type AnalyticsEventName = keyof typeof ANALYTICS_EVENTS;
export type AnalyticsCategory = (typeof ANALYTICS_EVENTS)[AnalyticsEventName]["category"];

export const ANALYTICS_EVENT_NAMES = Object.keys(ANALYTICS_EVENTS) as AnalyticsEventName[];

export const SENSITIVE_ANALYTICS_PARAM_KEYS = [
  "name",
  "email",
  "message",
  "phone",
  "company",
  "subject",
  "body",
] as const;

export function isAnalyticsEventName(eventName: string): eventName is AnalyticsEventName {
  return eventName in ANALYTICS_EVENTS;
}
