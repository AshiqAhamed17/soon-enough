import type { Cafe } from "@/types/cafe";

export function CafeSnapshot({ cafe }: { cafe: Cafe }) {
  const rows: [string, string][] = [
    ["Location", cafe.location],
    ["Visited", cafe.visitDate],
    ["Weather", cafe.weather],
    ["Mood", cafe.mood],
    ["Music", cafe.music],
    ["With", cafe.companions],
    ["Favourite drink", cafe.favouriteDrink],
  ];

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-sm uppercase tracking-widest text-text-secondary">Snapshot</h2>
      <dl className="mt-6 grid gap-6 sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs uppercase tracking-widest text-text-secondary">{label}</dt>
            <dd className="mt-1 text-text">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
