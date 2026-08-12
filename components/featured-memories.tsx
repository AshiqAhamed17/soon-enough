import Image from "next/image";
import Link from "next/link";
import { cafes } from "@/data/cafes";

export function FeaturedMemories() {
  const featured = [...cafes]
    .sort((a, b) => (a.visitDate < b.visitDate ? 1 : -1))
    .slice(0, 3);

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="mb-10 text-2xl font-medium text-text md:text-3xl">
        Featured memories
      </h2>
      <div className="grid gap-6 md:grid-cols-3">
        {featured.map((cafe) => (
          <Link
            key={cafe.slug}
            href={`/cafes/${cafe.slug}`}
            className="group overflow-hidden rounded-2xl bg-card"
          >
            <div className="relative h-64 w-full overflow-hidden">
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
        ))}
      </div>
    </section>
  );
}
