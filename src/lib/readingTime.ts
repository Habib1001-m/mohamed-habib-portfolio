import type { Bilingual } from "@/lib/i18n";

/**
 * Estimate reading time from a bilingual content object.
 * Uses the English text by default (falls back to Arabic).
 * Average adult reading speed ~200-220 wpm for English; Arabic slightly slower.
 * Returns minutes (minimum 1).
 */
export function estimateReadingTime(
  content: { en: string; ar: string },
  locale: "en" | "ar" = "en",
): number {
  const text = content[locale] ?? content.en;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const wpm = locale === "ar" ? 180 : 220;
  return Math.max(1, Math.round(words / wpm));
}

export function readingTimeLabel(minutes: number, locale: "en" | "ar"): string {
  if (locale === "ar") {
    return `${minutes} ${minutes === 1 ? "دقيقة" : "دقائق"} قراءة`;
  }
  return `${minutes} ${minutes === 1 ? "min" : "min"} read`;
}

export type { Bilingual };
