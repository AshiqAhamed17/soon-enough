import Image from "next/image";
import Link from "next/link";
import type { Restaurant } from "@/types/restaurant";

const TILTS = ["mount-tilt-2", "mount-tilt-3", "mount-tilt-1", "mount-tilt-4"];

export function RestaurantCard({
  restaurant,
  tiltIndex = 0,
}: {
  restaurant: Restaurant;
  tiltIndex?: number;
}) {
  return (
    <Link href={`/restaurants/${restaurant.slug}`} className="group block">
      <div className={`photo-mount rounded-sm p-3 ${TILTS[tiltIndex % TILTS.length]}`}>
        <div className="relative h-72 w-full overflow-hidden">
          <Image
            src={restaurant.heroImage}
            alt={restaurant.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="px-1 pb-1 pt-4">
          <h3 className="text-lg font-semibold text-text">{restaurant.name}</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-text-secondary">
            {restaurant.city}, {restaurant.country}
          </p>
        </div>
      </div>
    </Link>
  );
}
