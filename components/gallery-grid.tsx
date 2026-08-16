"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Photo } from "@/lib/memories";

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, [photos.length]);
  const showNext = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, close, showPrev, showNext]);

  const active = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3">
        {photos.map((photo, i) => (
          <button
            key={`${photo.src}-${i}`}
            type="button"
            onClick={() => setActiveIndex(i)}
            aria-label={`Open photo from ${photo.name}`}
            className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-sm"
          >
            <div className="relative w-full" style={{ aspectRatio: i % 3 === 0 ? "3 / 4" : "4 / 3" }}>
              <Image
                src={photo.src}
                alt={photo.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 py-8"
            onClick={close}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              className="absolute right-6 top-6 text-white/80 transition-colors hover:text-white"
            >
              <X size={28} />
            </button>

            <button
              type="button"
              aria-label="Previous photo"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white md:left-8"
            >
              <ChevronLeft size={32} />
            </button>

            <button
              type="button"
              aria-label="Next photo"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 transition-colors hover:text-white md:right-8"
            >
              <ChevronRight size={32} />
            </button>

            <motion.div
              key={active.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex max-h-full flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70vh] w-[85vw] max-w-3xl">
                <Image src={active.src} alt={active.name} fill className="object-contain" />
              </div>
              <Link
                href={active.href}
                className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-white/80 transition-colors hover:text-white"
              >
                {active.name} — {active.city}, {active.country}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
