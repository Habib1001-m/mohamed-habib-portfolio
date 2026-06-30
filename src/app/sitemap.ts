import type { MetadataRoute } from "next";
import { SITE_URL, absoluteUrl } from "@/config/site";
import { LOCALES } from "@/lib/i18n";
import { PROJECTS_LIST } from "@/data/projects";

function localeAlternates(pathBuilder: (locale: (typeof LOCALES)[number]) => string) {
  return {
    en: absoluteUrl(pathBuilder("en")),
    ar: absoluteUrl(pathBuilder("ar")),
    "x-default": absoluteUrl(pathBuilder("en")),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const root = {
    url: SITE_URL,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: { languages: localeAlternates((locale) => `/${locale}`) },
  };

  const home = LOCALES.map((locale) => ({
    url: absoluteUrl(`/${locale}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 1,
    alternates: { languages: localeAlternates((l) => `/${l}`) },
  }));

  const work = PROJECTS_LIST.flatMap((project) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(`/${locale}/work/${project.id}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: { languages: localeAlternates((l) => `/${l}/work/${project.id}`) },
    })),
  );

  return [root, ...home, ...work];
}
