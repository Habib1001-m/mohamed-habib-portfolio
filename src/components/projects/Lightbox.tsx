"use client";

import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  /** Index of the currently open image, or null if closed. */
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const isOpen = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % images.length);
  }, [index, images.length, onNavigate]);

  const prev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + images.length) % images.length);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [isOpen, next, prev, onClose]);

  if (!isOpen || index === null) return null;
  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md animate-fade-in" />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-hairline glass text-ink-muted hover:text-ink transition-colors"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
            className="absolute left-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-hairline glass text-ink-muted hover:text-accent transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
            className="absolute right-4 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-hairline glass text-ink-muted hover:text-accent transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <figure
        className="relative z-[1] max-h-[85vh] max-w-5xl animate-rise-in"
        onClick={(e) => e.stopPropagation()}
      >
        { }
        <img
          src={current.src}
          alt={current.alt}
          className="max-h-[78vh] w-auto rounded-[var(--r-lg)] border border-hairline object-contain"
        />
        {current.caption && (
          <figcaption className="mt-3 text-center text-sm text-ink-muted">
            {current.caption}
          </figcaption>
        )}
        {images.length > 1 && (
          <div className="mt-2 text-center font-mono text-xs text-ink-faint">
            {index + 1} / {images.length}
          </div>
        )}
      </figure>
    </div>
  );
}
