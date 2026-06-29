import { useLayoutEffect } from "react";
import { FEATURES } from "../config/features";
import { MOTION_CONFIG } from "../config/motion";
import { trackEvent } from "../lib/analytics";

interface SectionHeadingRevealControllerProps {
  lang: "en" | "ar";
}

const REVEAL_SELECTOR = ".ds-section-heading, [data-motion-reveal='section-heading']";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function motionTargetIsActive() {
  return MOTION_CONFIG.activePrototypes.includes("section-heading-reveal");
}

function prepareElement(element: HTMLElement) {
  element.style.opacity = "0";
  element.style.transform = "translate3d(0, 16px, 0)";
  element.style.transition = "opacity 420ms ease, transform 560ms cubic-bezier(0.22, 1, 0.36, 1)";
  element.style.willChange = "opacity, transform";
}

function revealElement(element: HTMLElement) {
  element.style.opacity = "1";
  element.style.transform = "translate3d(0, 0, 0)";
  element.style.willChange = "auto";
}

export default function SectionHeadingRevealController({ lang }: SectionHeadingRevealControllerProps) {
  useLayoutEffect(() => {
    if (!FEATURES.motionPrototype || !FEATURES.sectionHeadingReveal || !MOTION_CONFIG.enabled || !motionTargetIsActive()) return;
    if (MOTION_CONFIG.respectReducedMotion && prefersReducedMotion()) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));

    if (elements.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      elements.forEach(revealElement);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target;
          if (target instanceof HTMLElement) {
            revealElement(target);
            observer.unobserve(target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    elements.forEach((element) => {
      prepareElement(element);
      observer.observe(element);
    });

    trackEvent("motion_layer_loaded", {
      target: "section_heading_reveal",
      count: elements.length,
      lang,
    });

    return () => {
      observer.disconnect();
      elements.forEach((element) => {
        element.style.opacity = "";
        element.style.transform = "";
        element.style.transition = "";
        element.style.willChange = "";
      });
    };
  }, [lang]);

  return null;
}
