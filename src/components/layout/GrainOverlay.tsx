/**
 * Subtle film-grain overlay for cinematic texture (~3.5% opacity, overlay blend).
 * Static by design: no animation, no hydration state, and safe for reduced-motion users.
 */
export function GrainOverlay() {
  return <div className="grain-overlay" aria-hidden="true" />;
}
