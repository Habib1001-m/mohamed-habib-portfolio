export type AnalyticsEventName =
  | "hero_projects_clicked"
  | "hero_contact_clicked"
  | "cv_one_page_clicked"
  | "cv_detailed_clicked"
  | "project_opened"
  | "project_demo_clicked"
  | "project_github_clicked"
  | "contact_card_clicked"
  | "contact_form_started"
  | "contact_form_submitted"
  | "contact_form_failed"
  | "github_clicked"
  | "linkedin_clicked"
  | "email_clicked"
  | "booking_clicked"
  | "testimonials_viewed"
  | "case_study_viewed"
  | "motion_layer_loaded";

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
    dataLayer?: unknown[];
  }
}

function cleanParams(params: AnalyticsParams = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== "")
  ) as Record<string, string | number | boolean>;
}

export function trackEvent(eventName: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const props = cleanParams(params);

  window.dispatchEvent(
    new CustomEvent("habib:analytics", {
      detail: { eventName, props },
    })
  );

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, props);
  }

  if (typeof window.plausible === "function") {
    window.plausible(eventName, { props });
  }

  if (import.meta.env.DEV) {
    console.debug("[habib:analytics]", eventName, props);
  }
}

export {};
