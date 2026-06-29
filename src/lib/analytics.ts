import {
  ANALYTICS_CONFIG,
  ANALYTICS_EVENTS,
  SENSITIVE_ANALYTICS_PARAM_KEYS,
  isAnalyticsEventName,
} from "../config/analytics";
import type { AnalyticsEventName } from "../config/analytics";

export type { AnalyticsEventName } from "../config/analytics";

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

interface AnalyticsValidationResult {
  valid: boolean;
  blockedKeys: string[];
  unknownEvent: boolean;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (eventName: string, options?: { props?: Record<string, string | number | boolean> }) => void;
    dataLayer?: unknown[];
  }
}

function isSensitiveParamKey(key: string) {
  const normalizedKey = key.toLowerCase();
  return SENSITIVE_ANALYTICS_PARAM_KEYS.some((sensitiveKey) => normalizedKey.includes(sensitiveKey));
}

function cleanParams(params: AnalyticsParams = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([key, value]) => {
      if (value === undefined || value === null || value === "") return false;
      if (isSensitiveParamKey(key)) return false;
      return true;
    })
  ) as Record<string, string | number | boolean>;
}

export function validateAnalyticsEvent(eventName: string, params: AnalyticsParams = {}): AnalyticsValidationResult {
  const blockedKeys = Object.keys(params).filter(isSensitiveParamKey);

  return {
    valid: isAnalyticsEventName(eventName) && blockedKeys.length === 0,
    blockedKeys,
    unknownEvent: !isAnalyticsEventName(eventName),
  };
}

export function trackEvent(eventName: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (!ANALYTICS_CONFIG.enabled || typeof window === "undefined") return;

  const validation = validateAnalyticsEvent(eventName, params);

  if (validation.unknownEvent) {
    if (import.meta.env.DEV) {
      console.warn("[habib:analytics] Unknown event blocked", eventName);
    }
    return;
  }

  if (validation.blockedKeys.length > 0 && import.meta.env.DEV) {
    console.warn("[habib:analytics] Sensitive analytics params removed", {
      eventName,
      blockedKeys: validation.blockedKeys,
    });
  }

  const props = cleanParams(params);
  const eventDefinition = ANALYTICS_EVENTS[eventName];
  const payload = {
    eventName,
    category: eventDefinition.category,
    props,
  };

  if (ANALYTICS_CONFIG.dispatchBrowserEvent) {
    window.dispatchEvent(
      new CustomEvent(ANALYTICS_CONFIG.browserEventName, {
        detail: payload,
      })
    );
  }

  if (ANALYTICS_CONFIG.allowGtagForwarding && typeof window.gtag === "function") {
    window.gtag("event", eventName, {
      event_category: eventDefinition.category,
      ...props,
    });
  }

  if (ANALYTICS_CONFIG.allowPlausibleForwarding && typeof window.plausible === "function") {
    window.plausible(eventName, { props: { category: eventDefinition.category, ...props } });
  }

  if (ANALYTICS_CONFIG.debugInDevelopment && import.meta.env.DEV) {
    console.debug("[habib:analytics]", payload);
  }
}

export {};
