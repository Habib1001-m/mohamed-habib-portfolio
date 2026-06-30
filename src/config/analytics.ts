export const ANALYTICS_CONFIG = {
  enabled: true,
  debugInDevelopment: true,
  dispatchBrowserEvent: true,
  browserEventName: "habib:analytics",
} as const;

export const SENSITIVE_ANALYTICS_PARAM_KEYS = [
  "name",
  "email",
  "message",
  "phone",
  "company",
  "subject",
  "body",
] as const;
