"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type ElementType,
  type CSSProperties,
} from "react";
import { MOTION_CONFIG } from "@/config/motion";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type MotionTarget =
  | "section-heading-reveal"
  | "project-card-stagger"
  | "scroll-progress";

export function targetEnabled(target: MotionTarget): boolean {
  if (!MOTION_CONFIG.enabled) return false;
  if (!MOTION_CONFIG.activePrototypes.includes(target)) return false;
  if (MOTION_CONFIG.respectReducedMotion && prefersReducedMotion()) return false;
  return true;
}

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  /** Stagger index — delays reveal by index * 70ms (capped at 210ms). */
  index?: number;
  className?: string;
  /** Which motion target's gate to honor. */
  target?: MotionTarget;
  style?: CSSProperties;
  id?: string;
}

/**
 * Unified scroll-reveal wrapper — the single motion grammar for v3.1.
 * Progressive enhancement: SSR / no-JS / reduced-motion → content visible.
 * On mount (client), if the target's gate passes, the element starts hidden
 * via the `.reveal` class and reveals (`.is-visible`) when intersecting.
 */
export function Reveal({
  children,
  as,
  index = 0,
  className = "",
  target = "section-heading-reveal",
  style,
  id,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(targetEnabled(target));
  }, [target]);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(index * 70, 210)}ms`;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add("is-visible");
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, index]);

  return (
    <Tag ref={ref} className={className} style={style} id={id}>
      {children}
    </Tag>
  );
}
