import { cafes } from "@/data/cafes";
import { CafeCard } from "@/components/cafe-card";

export default function CafesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70">
        The archive
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-text md:text-4xl">Cafés</h1>
      <p className="mt-3 max-w-xl text-text-secondary">
        Not reviews. Stories — one for every café that became part of mine.
      </p>
      <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
        {cafes.map((cafe, i) => (
          <CafeCard key={cafe.slug} cafe={cafe} tiltIndex={i} />
        ))}
      </div>
    </div>
  );
}
