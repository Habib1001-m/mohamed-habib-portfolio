import { useEffect } from "react";
import { FEATURES, TRUST_CONFIG } from "../../config/features";
import { TESTIMONIALS } from "../../data/testimonials";
import { trackEvent } from "../../lib/analytics";

interface TestimonialsSectionProps {
  lang: "en" | "ar";
}

export default function TestimonialsSection({ lang }: TestimonialsSectionProps) {
  const approvedTestimonials = TESTIMONIALS.filter((testimonial) => testimonial.approvedForPublicUse);
  const isRtl = lang === "ar";
  const shouldShow = FEATURES.testimonials && approvedTestimonials.length >= TRUST_CONFIG.testimonialsMinimumCount;

  useEffect(() => {
    if (!shouldShow) return;
    trackEvent("testimonials_viewed", {
      count: approvedTestimonials.length,
      lang,
    });
  }, [approvedTestimonials.length, lang, shouldShow]);

  if (!shouldShow) {
    return null;
  }

  return (
    <section id="testimonials-section" className="py-24 border-t border-white/5 relative">
      <div className="ds-shell">
        <div className={`ds-section-heading mb-12 ${isRtl ? "font-arabic text-right" : ""}`}>
          <span className="ds-kicker text-orange-500">TRUST</span>
          <h2 className={`ds-section-title ${isRtl ? "font-arabic" : "uppercase"}`}>
            {lang === "ar" ? "توصيات موثقة" : "Verified Testimonials"}
          </h2>
          <div className="ds-section-rule" />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {approvedTestimonials.map((testimonial) => (
            <figure key={testimonial.id} className={`ds-card ds-card-hover p-5 ${isRtl ? "font-arabic text-right" : "text-left"}`}>
              <blockquote className="text-sm ds-muted-copy text-slate-300 leading-relaxed">
                “{testimonial.quote[lang]}”
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-white/10">
                <div className="text-sm font-bold text-white">{testimonial.author}</div>
                {testimonial.role && <div className="ds-label mt-1">{testimonial.role}</div>}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
