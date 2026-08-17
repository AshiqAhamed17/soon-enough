import type { Metadata } from "next";
import { getAllPhotos } from "@/lib/memories";
import { GalleryGrid } from "@/components/gallery-grid";
import { QuoteBanner } from "@/components/quote-banner";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Every photo, in one place. Click through, or use the arrow keys.",
};

export default function GalleryPage() {
  const photos = getAllPhotos();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70">
        The archive
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-text md:text-4xl">Gallery</h1>
      <p className="mt-3 max-w-xl text-text-secondary">
        Every photo, in one place. Click through, or use the arrow keys.
      </p>
      <div className="mt-12">
        <GalleryGrid photos={photos} />
      </div>
      <QuoteBanner index={4} />
    </div>
  );
}
