import Image from "next/image";
import Link from "next/link";
import type { Cafe } from "@/types/cafe";

export function CafeCard({ cafe }: { cafe: Cafe }) {
  return (
    <Link
      href={`/cafes/${cafe.slug}`}
      className="group block overflow-hidden rounded-2xl bg-card transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={cafe.heroImage}
          alt={cafe.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-medium text-text">{cafe.name}</h3>
        <p className="mt-1 text-sm text-text-secondary">
          {cafe.city}, {cafe.country}
        </p>
      </div>
    </Link>
  );
}
