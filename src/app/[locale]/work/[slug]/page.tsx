import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { PROJECTS_LIST } from "@/data/projects";
import { PORTFOLIO_DATA } from "@/data/portfolioContent";
import { CASE_STUDIES, PUBLIC_CASE_STUDIES } from "@/data/caseStudies";
import { FEATURES } from "@/config/features";
import { isLocale, isRtl, t, type Locale } from "@/lib/i18n";
import { CaseStudyProgress } from "@/components/motion/CaseStudyProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GalleryGrid } from "@/components/projects/GalleryGrid";
import { ShareBar } from "@/components/projects/ShareBar";
import { CaseStudyToc } from "@/components/projects/CaseStudyToc";
import { estimateReadingTime, readingTimeLabel } from "@/lib/readingTime";
import { SITE_NAME, absoluteUrl } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS_LIST.flatMap((project) =>
    (["en", "ar"] as const).map((locale) => ({ locale, slug: project.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = PROJECTS_LIST.find((p) => p.id === slug);
  if (!project) return {};
  const loc: Locale = isLocale(locale) ? locale : "en";
  return {
    title: t(project.title, loc),
    description: t(project.tagline, loc),
    alternates: {
      canonical: `/${loc}/work/${slug}`,
      languages: { en: `/en/work/${slug}`, ar: `/ar/work/${slug}`, "x-default": `/en/work/${slug}` },
    },
    openGraph: {
      title: t(project.title, loc),
      description: t(project.tagline, loc),
      url: absoluteUrl(`/${loc}/work/${slug}`),
      siteName: SITE_NAME,
      type: "article",
      locale: loc === "ar" ? "ar_EG" : "en_US",
      alternateLocale: [loc === "ar" ? "en_US" : "ar_EG"],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const loc = locale as Locale;
  const rtl = isRtl(loc);

  const project = PROJECTS_LIST.find((p) => p.id === slug);
  if (!project) notFound();

  const p = PORTFOLIO_DATA.projects;
  const caseStudy = CASE_STUDIES.find((cs) => cs.projectId === slug);
  const isPublic = FEATURES.caseStudies && PUBLIC_CASE_STUDIES.some((cs) => cs.projectId === slug);

  return (
    <>
      <CaseStudyProgress />
      <Navbar locale={loc} />
      <main id="main" className="ds-shell pt-28 pb-20">
      <Link
        href={`/${loc}#projects`}
        className={`inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors ${rtl ? "flex-row-reverse" : ""}`}
      >
        <ArrowLeft className={`h-4 w-4 ${rtl ? "rotate-180" : ""}`} />
        {t({ en: "Back to work", ar: "العودة للأعمال" }, loc)}
      </Link>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_180px] xl:gap-12">
      <article id="case-study-body" className="max-w-3xl">
        <div className="flex flex-wrap gap-2">
          <span className="ds-chip">{t(project.category, loc)}</span>
          {project.status && (
            <span className="ds-chip !text-[var(--accent-soft)] !border-hairline-accent">
              {t(project.status, loc)}
            </span>
          )}
        </div>
        <h1 className="display-text mt-4 text-[length:var(--fs-h1)]">
          {t(project.title, loc)}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          {t(project.tagline, loc)}
        </p>

        {/* Meta row: reading time + share */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-hairline py-3">
          <span className="inline-flex items-center gap-2 font-mono text-xs text-ink-faint">
            <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
            {readingTimeLabel(estimateReadingTime(project.longDescription, loc), loc)}
          </span>
          <ShareBar
            url={absoluteUrl(`/${loc}/work/${project.id}`)}
            title={t(project.title, loc)}
            locale={loc}
          />
        </div>

        <p className="mt-5 leading-relaxed text-ink-muted">
          {t(project.longDescription, loc)}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-action"
            >
              <Github className="h-4 w-4" />
              {t(p.viewSource, loc)}
            </a>
          )}
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-action ds-action-primary"
            >
              <ExternalLink className="h-4 w-4" />
              {t(p.visitDemo, loc)}
            </a>
          )}
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <section id="cs-gallery" className="mt-12 scroll-mt-24">
            <h2 className="ds-section-title mb-4 text-xl">
              {t({ en: "Gallery", ar: "المعرض" }, loc)}
            </h2>
            <GalleryGrid
              images={project.gallery.map((shot) => ({
                src: shot.src,
                alt: t(shot.label, loc),
                caption: shot.caption ? t(shot.caption, loc) : t(shot.label, loc),
              }))}
            />
          </section>
        )}

        {project.stats && project.stats.length > 0 && (
          <section id="cs-outcome" className="mt-12 scroll-mt-24">
            <h2 className="ds-section-title mb-4 text-xl">
              {t({ en: "Outcome signals", ar: "مؤشرات النتيجة" }, loc)}
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {project.stats.map((stat, i) => (
                <div key={i} className="ds-metric text-center">
                  <div className="text-xl font-bold text-ink">{stat.value}</div>
                  <div className="mt-1 text-xs text-ink-faint">
                    {t(stat.label, loc)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.tech && project.tech.length > 0 && (
          <section id="cs-stack" className="mt-12 scroll-mt-24">
            <h2 className="ds-section-title mb-4 text-xl">
              {t({ en: "Tech stack", ar: "التقنيات" }, loc)}
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="ds-chip">{tech}</span>
              ))}
            </div>
          </section>
        )}

        {/* Case-study long-form content — only when approved (G4 gate) */}
        {isPublic && caseStudy ? (
          <div className="mt-12 ds-panel p-6">
            <h2 className="text-[length:var(--fs-h2)] font-semibold">
              {t(caseStudy.summary, loc)}
            </h2>
            {/* Full case-study content renders in Phase v3.1-D once approved */}
          </div>
        ) : null}

        {!isPublic && (
          <div className="mt-12 ds-card border-dashed p-6 text-center">
            <p className="text-sm text-ink-muted">
              {t(
                {
                  en: "A detailed case study for this project is being prepared and will be published once verified.",
                  ar: "تُحضّر دراسة حالة مفصّلة لهذا المشروع وستُنشر بمجرد التحقق منها.",
                },
                loc,
              )}
            </p>
          </div>
        )}
      </article>
      <aside className="hidden xl:block">
        <CaseStudyToc locale={loc} />
      </aside>
      </div>
      </main>
      <Footer locale={loc} />
    </>
  );
}
