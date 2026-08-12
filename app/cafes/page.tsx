import { cafes } from "@/data/cafes";
import { CafeCard } from "@/components/cafe-card";

export default function CafesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-3xl font-medium text-text md:text-4xl">Cafés</h1>
      <p className="mt-3 max-w-xl text-text-secondary">
        Not reviews. Stories — one for every café that became part of mine.
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {cafes.map((cafe) => (
          <CafeCard key={cafe.slug} cafe={cafe} />
        ))}
      </div>
    </div>
  );
}
