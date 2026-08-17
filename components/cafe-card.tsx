import Image from "next/image";
import Link from "next/link";
import type { Cafe } from "@/types/cafe";

const TILTS = ["mount-tilt-2", "mount-tilt-3", "mount-tilt-1", "mount-tilt-4"];

export function CafeCard({ cafe, tiltIndex = 0 }: { cafe: Cafe; tiltIndex?: number }) {
  return (
    <Link href={`/cafes/${cafe.slug}`} className="group block">
      <div className={`photo-mount rounded-sm p-3 ${TILTS[tiltIndex % TILTS.length]}`}>
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={cafe.heroImage}
            alt={cafe.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="px-1 pb-1 pt-4">
          <h3 className="text-lg font-semibold text-text">{cafe.name}</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-text-secondary">
            {cafe.city}, {cafe.country}
          </p>
        </div>
      </div>
    </Link>
  );
}
