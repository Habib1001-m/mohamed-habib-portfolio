"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { Lightbox, type LightboxImage } from "@/components/projects/Lightbox";

interface GalleryGridProps {
  images: LightboxImage[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!images.length) return null;

  return (
    <>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {images.map((img, i) => (
          <figure
            key={i}
            className="ds-card group relative cursor-pointer overflow-hidden"
            onClick={() => setLightboxIndex(i)}
            role="button"
            tabIndex={0}
            aria-label={`Open ${img.alt} in viewer`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLightboxIndex(i);
              }
            }}
          >
            { }
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-hairline bg-black/50 text-ink-soft opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <Maximize2 className="h-3.5 w-3.5" />
            </div>
            {img.caption && (
              <figcaption className="p-3 text-xs text-ink-muted">
                {img.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>

      <Lightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
