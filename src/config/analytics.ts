/**
 * Runtime analytics configuration for the v3.1 Next.js port.
 *
 * Ported from the frozen Vite baseline (`repo_clone/src/config/analytics.ts`),
 * keeping ANALYTICS_CONFIG, ANALYTICS_EVENTS, SENSITIVE_ANALYTICS_PARAM_KEYS,
 * and the type helpers verbatim. Adds the new v3.1 lead-funnel events.
 *
 * The ANALYTICS_PROVIDER_DECISION history object is a decision-record artifact
 * (documentation-as-code) and remains in the frozen Vite baseline — it is
 * intentionally NOT ported here.
 */
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
  proof_asset_clicked: {
    category: "proof_validation",
    description: "A public proof layer asset CTA was clicked.",
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
  // ─── v3.1 lead-funnel events ────────────────────────────────────────────
  lead_cv_downloaded: {
    category: "lead_funnel",
    description: "Either CV (one-page or detailed) was downloaded — a top-of-funnel lead signal.",
  },
  lead_case_study_opened: {
    category: "lead_funnel",
    description: "A case-study affordance was opened by a recruiter/visitor evaluating depth.",
  },
  lead_contact_started: {
    category: "lead_funnel",
    description: "User began the contact form interaction (first input focus).",
  },
  lead_contact_submitted: {
    category: "lead_funnel",
    description: "Contact form was submitted successfully — primary lead conversion event.",
  },
  lead_booking_intent: {
    category: "lead_funnel",
    description: "User expressed booking intent (gated — fires once booking surface activates).",
  },
  project_preview_hovered: {
    category: "lead_funnel",
    description: "A project preview card was hovered, indicating consideration interest.",
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
