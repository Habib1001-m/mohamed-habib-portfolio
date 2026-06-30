import { ANALYTICS_CONFIG, SENSITIVE_ANALYTICS_PARAM_KEYS } from "@/config/analytics";

export type AnalyticsCategory =
  | "engagement"
  | "navigation"
  | "proof"
  | "project"
  | "contact"
  | "lead"
  | "future_motion"
  | "system";

export interface AnalyticsEvent {
  eventName: string;
  category: AnalyticsCategory;
  props?: Record<string, unknown>;
}

function isProd(): boolean {
  return process.env.NODE_ENV === "production";
}

function sanitizeProps(
  props?: Record<string, unknown>,
): Record<string, unknown> {
  if (!props) return {};
  const clean: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if ((SENSITIVE_ANALYTICS_PARAM_KEYS as readonly string[]).includes(key)) continue;
    clean[key] = value;
  }
  return clean;
}

/**
 * First-party analytics dispatcher. Client-side only.
 * Dispatches a custom browser event `habib:analytics` (listenable via
 * `window.addEventListener("habib:analytics", ...)`). No third-party
 * forwarding unless explicitly enabled in config.
 */
export function track(event: AnalyticsEvent): void {
  if (!ANALYTICS_CONFIG.enabled) return;
  if (typeof window === "undefined") return;

  const safeProps = sanitizeProps(event.props);

  if (ANALYTICS_CONFIG.debugInDevelopment && !isProd()) {
     
    console.debug(`[habib:analytics]`, {
      eventName: event.eventName,
      category: event.category,
      props: safeProps,
    });
  }

  if (ANALYTICS_CONFIG.dispatchBrowserEvent) {
    try {
      window.dispatchEvent(
        new CustomEvent(ANALYTICS_CONFIG.browserEventName, {
          detail: {
            eventName: event.eventName,
            category: event.category,
            props: safeProps,
            timestamp: Date.now(),
          },
        }),
      );
    } catch {
      // CustomEvent may be unavailable in rare environments — fail silently.
    }
  }
}
