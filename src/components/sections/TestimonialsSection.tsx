"use client";

import { useEffect } from "react";
import { Quote } from "lucide-react";
import { FEATURES, TRUST_CONFIG } from "@/config/features";
import { testimonialsTrustReady } from "@/config/trust";
import { TESTIMONIALS } from "@/data/testimonials";
import { canPublishTestimonials } from "@/lib/trustPresentation.mjs";
import { track } from "@/lib/analytics";
import { t, type Locale } from "@/lib/i18n";
import { SectionHeading } from "@/components/layout/SectionHeading";

export function TestimonialsSection({ locale }: { locale: Locale }) {
  const approvedTestimonials = TESTIMONIALS.filter(
    (testimonial) => testimonial.approvedForPublicUse,
  );
  const shouldShow = canPublishTestimonials({
    featureEnabled: FEATURES.testimonials,
    trustReady: testimonialsTrustReady,
    minimumCount: TRUST_CONFIG.testimonialsMinimumCount,
    testimonials: TESTIMONIALS,
  });

  useEffect(() => {
    if (!shouldShow) return;
    track({
      eventName: "testimonials_viewed",
      category: "proof",
      props: {
        count: approvedTestimonials.length,
        language: locale,
      },
    });
  }, [approvedTestimonials.length, locale, shouldShow]);

  if (!shouldShow) return null;

  return (
    <section id="testimonials" className="ds-section">
      <div className="ds-shell">
        <SectionHeading
          num="T"
          title={t(
            { en: "Verified testimonials.", ar: "توصيات موثّقة." },
            locale,
          )}
          subtitle={t(
            {
              en: "Published only with explicit public-use approval and documented context.",
              ar: "لا تُنشر إلا بعد موافقة صريحة للاستخدام العام وتوثيق السياق.",
            },
            locale,
          )}
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {approvedTestimonials.map((testimonial) => (
            <figure
              key={testimonial.id}
              className="ds-card ds-card-hover p-5"
              data-reveal
              data-reveal-group="testimonials"
            >
              <Quote className="h-5 w-5 text-accent" aria-hidden="true" />
              <blockquote className="mt-4 text-sm leading-relaxed text-ink-soft">
                “{t(testimonial.quote, locale)}”
              </blockquote>
              <figcaption className="mt-5 border-t border-hairline pt-4">
                <span className="block text-sm font-semibold text-ink">
                  {testimonial.author}
                </span>
                {testimonial.role && (
                  <span className="mt-1 block text-xs text-ink-faint">
                    {testimonial.role}
                  </span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
