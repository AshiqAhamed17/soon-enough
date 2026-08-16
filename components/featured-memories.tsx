import Image from "next/image";
import Link from "next/link";
import { cafes } from "@/data/cafes";
import { restaurants } from "@/data/restaurants";

const TILTS = ["mount-tilt-1", "mount-tilt-2", "mount-tilt-3", "mount-tilt-4"];

interface Memory {
  href: string;
  name: string;
  city: string;
  country: string;
  heroImage: string;
  visitDate: string;
}

function MemoryCard({
  memory,
  tilt,
  imageHeight,
}: {
  memory: Memory;
  tilt: string;
  imageHeight: string;
}) {
  return (
    <Link href={memory.href} className="group block">
      <div className={`photo-mount rounded-sm p-3 ${tilt}`}>
        <div className={`relative w-full overflow-hidden ${imageHeight}`}>
          <Image
            src={memory.heroImage}
            alt={memory.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="px-1 pb-1 pt-4">
          <h3 className="text-lg font-semibold text-text">{memory.name}</h3>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-text-secondary">
            {memory.city}, {memory.country}
          </p>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedMemories() {
  const allMemories: Memory[] = [
    ...cafes.map((cafe) => ({
      href: `/cafes/${cafe.slug}`,
      name: cafe.name,
      city: cafe.city,
      country: cafe.country,
      heroImage: cafe.heroImage,
      visitDate: cafe.visitDate,
    })),
    ...restaurants.map((restaurant) => ({
      href: `/restaurants/${restaurant.slug}`,
      name: restaurant.name,
      city: restaurant.city,
      country: restaurant.country,
      heroImage: restaurant.heroImage,
      visitDate: restaurant.visitDate,
    })),
  ];

  const featured = allMemories
    .sort((a, b) => (a.visitDate < b.visitDate ? 1 : -1))
    .slice(0, 3);

  const [lead, ...rest] = featured;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70">
        Featured memories
      </p>
      <h2 className="mt-3 max-w-lg text-2xl font-semibold text-text md:text-3xl">
        A few chapters worth returning to
      </h2>

      {lead && (
        <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <MemoryCard memory={lead} tilt="mount-tilt-1" imageHeight="h-80 md:h-[26rem]" />
          </div>
          <div className="flex flex-col gap-10 md:col-span-5">
            {rest.map((memory, i) => (
              <MemoryCard
                key={memory.href}
                memory={memory}
                tilt={TILTS[(i + 1) % TILTS.length]}
                imageHeight="h-48"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
