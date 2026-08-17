import Image from "next/image";
import type { SoonEnough } from "@/types/soon-enough";

const TILTS = ["mount-tilt-3", "mount-tilt-1", "mount-tilt-4", "mount-tilt-2"];

export function SoonEnoughCard({
  destination,
  tiltIndex = 0,
}: {
  destination: SoonEnough;
  tiltIndex?: number;
}) {
  const rows: [string, string][] = [
    ["Why I want to go", destination.whyIWantToGo],
    ["What I want to experience", destination.whatIWantToExperience],
    ["Dream coffee", destination.dreamCoffee],
    ["Dream meal", destination.dreamMeal],
    ["Dream photograph", destination.dreamPhotograph],
  ];

  return (
    <div className={`photo-mount rounded-sm p-3 ${TILTS[tiltIndex % TILTS.length]}`}>
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={destination.heroImage}
          alt={destination.name}
          fill
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-bg/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-accent backdrop-blur-sm">
          Soon Enough
        </span>
      </div>
      <div className="px-1 pb-1 pt-4">
        <h3 className="text-lg font-semibold text-text">{destination.name}</h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-text-secondary">
          {destination.city}, {destination.country}
        </p>

        <dl className="mt-5 space-y-3">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary/70">
                {label}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-text-secondary">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
