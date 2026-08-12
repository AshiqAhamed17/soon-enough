import Image from "next/image";
import type { Cafe } from "@/types/cafe";

export function CafeGallery({ cafe }: { cafe: Cafe }) {
  if (cafe.gallery.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-sm uppercase tracking-widest text-text-secondary">Gallery</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cafe.gallery.map((src, index) => (
          <div key={src} className="relative h-72 w-full overflow-hidden rounded-2xl">
            <Image src={src} alt={`${cafe.name} — photo ${index + 1}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
