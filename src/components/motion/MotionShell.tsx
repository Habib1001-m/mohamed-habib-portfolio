"use client";

import { useEffect } from "react";
import { MOTION_CONFIG } from "@/config/motion";
import { track } from "@/lib/analytics";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Global motion controller. Wires up scroll reveals for any element
 * carrying a `data-reveal` attribute. Progressive enhancement:
 * - reduced-motion / motion disabled → elements stay visible (no hidden state added).
 * - otherwise → element gets `.reveal` (hidden) then `.is-visible` on intersection.
 *
 * Stagger: an optional `data-reveal-index` attribute delays the transition.
 * Targets group: `data-reveal-group="cards"` applies a 70ms-per-item stagger
 * automatically (capped at 210ms) when `data-reveal-index` is absent.
 *
 * This is the single motion grammar — no per-section bespoke animations.
 */
export function MotionShell() {
  useEffect(() => {
    const enabled =
      MOTION_CONFIG.enabled &&
      !(MOTION_CONFIG.respectReducedMotion && prefersReducedMotion());
    if (!enabled) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (elements.length === 0) return;

    // Group elements to compute stagger indices per group.
    const groupCounters: Record<string, number> = {};

    const observed: Array<{ el: HTMLElement; observer: IntersectionObserver }> =
      [];

    elements.forEach((el) => {
      const group = el.dataset.revealGroup;
      let delay: number;
      if (el.dataset.revealIndex !== undefined) {
        delay = Math.min(Number(el.dataset.revealIndex) * 70, 210);
      } else if (group) {
        const idx = groupCounters[group] ?? 0;
        groupCounters[group] = idx + 1;
        delay = Math.min(idx * 70, 210);
      } else {
        delay = 0;
      }

      el.classList.add("reveal");
      el.style.transitionDelay = `${delay}ms`;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
      );
      observer.observe(el);
      observed.push({ el, observer });
    });

    track({
      eventName: "motion_layer_loaded",
      category: "future_motion",
      props: { target: "reveal_shell", count: elements.length },
    });

    // Cinematic section activation — adds is-active to the most-visible .ds-section
    // for the ambient glow transition.
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>(".ds-section"),
    );
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sections.forEach((s) => s.classList.remove("is-active"));
            entry.target.classList.add("is-active");
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0, 0.3, 0.7] },
    );
    sections.forEach((s) => sectionObserver.observe(s));

    return () => {
      observed.forEach(({ observer }) => observer.disconnect());
      sectionObserver.disconnect();
    };
  }, []);

  return null;
}
