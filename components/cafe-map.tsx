import { PlaceMap } from "@/components/place-map";
import type { Cafe } from "@/types/cafe";

export function CafeMap({ cafe }: { cafe: Cafe }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-sm uppercase tracking-widest text-text-secondary">Location</h2>
      <div className="mt-6">
        <PlaceMap name={cafe.name} coordinates={cafe.coordinates} />
      </div>
    </section>
  );
}
