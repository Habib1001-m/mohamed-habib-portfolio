import { useLayoutEffect } from "react";
import { FEATURES } from "../config/features";
import { MOTION_CONFIG } from "../config/motion";
import { trackEvent } from "../lib/analytics";

interface ProjectCardStaggerControllerProps {
  lang: "en" | "ar";
}

const CARD_SELECTOR = "[data-motion-reveal='project-card']";
const STAGGER_MS = 70;
const MAX_STAGGER_MS = 210;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function motionTargetIsActive() {
  return MOTION_CONFIG.activePrototypes.includes("project-card-stagger");
}

function prepareElement(element: HTMLElement, index: number) {
  const delay = Math.min(index * STAGGER_MS, MAX_STAGGER_MS);

  element.style.opacity = "0";
  element.style.transform = "translate3d(0, 16px, 0)";
  element.style.transition = `opacity 420ms ease ${delay}ms, transform 560ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`;
  element.style.willChange = "opacity, transform";
}

function revealElement(element: HTMLElement) {
  element.style.opacity = "1";
  element.style.transform = "translate3d(0, 0, 0)";
  element.style.willChange = "auto";
}

function cleanupElement(element: HTMLElement) {
  element.style.opacity = "";
  element.style.transform = "";
  element.style.transition = "";
  element.style.willChange = "";
}

export default function ProjectCardStaggerController({ lang }: ProjectCardStaggerControllerProps) {
  useLayoutEffect(() => {
    if (!FEATURES.motionPrototype || !FEATURES.projectCardStagger || !MOTION_CONFIG.enabled || !motionTargetIsActive()) return;
    if (MOTION_CONFIG.respectReducedMotion && prefersReducedMotion()) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(CARD_SELECTOR));

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
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    elements.forEach((element, index) => {
      prepareElement(element, index);
      observer.observe(element);
    });

    trackEvent("motion_layer_loaded", {
      target: "project_card_stagger",
      count: elements.length,
      lang,
    });

    return () => {
      observer.disconnect();
      elements.forEach(cleanupElement);
    };
  }, [lang]);

  return null;
}
