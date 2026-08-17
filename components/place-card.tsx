import Image from "next/image";
import Link from "next/link";
import type { Place } from "@/types/place";

const TILTS = ["mount-tilt-2", "mount-tilt-3", "mount-tilt-1", "mount-tilt-4"];

export function PlaceCard({ place, tiltIndex = 0 }: { place: Place; tiltIndex?: number }) {
  return (
    <Link href={`/places/${place.slug}`} className="group block">
      <div className={`photo-mount rounded-sm p-3 ${TILTS[tiltIndex % TILTS.length]}`}>
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={place.heroImage}
            alt={place.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-bg/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary backdrop-blur-sm">
            {place.category}
          </span>
        </div>
        <div className="px-1 pb-1 pt-4">
          <h3 className="text-lg font-semibold text-text">{place.name}</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-text-secondary">
            {place.city}, {place.country}
          </p>
        </div>
      </div>
    </Link>
  );
}
