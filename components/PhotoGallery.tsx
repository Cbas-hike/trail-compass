"use client";

import { useState } from "react";

interface PhotoGalleryProps {
  photos: string[];
  routeName: string;
}

export default function PhotoGallery({ photos, routeName }: PhotoGalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!photos || photos.length === 0) return null;

  const prev = () =>
    setLightbox((i) => (i !== null ? (i - 1 + photos.length) % photos.length : 0));
  const next = () =>
    setLightbox((i) => (i !== null ? (i + 1) % photos.length : 0));

  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-[#1b3a2d] mb-6">Photos</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {photos.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="aspect-[4/3] overflow-hidden rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#e8923a]"
          >
            <img
              src={src}
              alt={`${routeName} photo ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[lightbox]}
              alt={`${routeName} photo ${lightbox + 1}`}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="absolute inset-y-0 left-0 flex items-center -ml-12">
              <button
                onClick={prev}
                className="text-white text-4xl font-bold hover:text-[#e8923a] transition-colors w-10 text-center"
              >
                ‹
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center -mr-12">
              <button
                onClick={next}
                className="text-white text-4xl font-bold hover:text-[#e8923a] transition-colors w-10 text-center"
              >
                ›
              </button>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-2 right-2 text-white text-2xl font-bold bg-black/50 rounded-full w-9 h-9 flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              ×
            </button>
            <p className="text-center text-white/60 text-sm mt-3">
              {lightbox + 1} / {photos.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
