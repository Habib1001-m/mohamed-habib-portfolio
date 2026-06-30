export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_LABELS: Record<Locale, { en: string; ar: string }> = {
  en: { en: "English", ar: "الإنجليزية" },
  ar: { en: "Arabic", ar: "العربية" },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

export function dir(locale: Locale): "ltr" | "rtl" {
  return isRtl(locale) ? "rtl" : "ltr";
}

/** Bilingual content helper — picks the right string for the active locale. */
export type Bilingual = { en: string; ar: string };

export function t(value: Bilingual, locale: Locale): string {
  return value[locale] ?? value.en;
}

/** Inert link helper: returns the href for the same page in the other locale. */
export function localeSwitchHref(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments[0] = target;
  } else {
    segments.unshift(target);
  }
  return "/" + segments.join("/");
}
