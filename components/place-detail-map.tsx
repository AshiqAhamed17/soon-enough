import { PlaceMap } from "@/components/place-map";
import type { Place } from "@/types/place";

export function PlaceDetailMap({ place }: { place: Place }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-sm uppercase tracking-widest text-text-secondary">Location</h2>
      <div className="mt-6">
        <PlaceMap name={place.name} coordinates={place.coordinates} />
      </div>
    </section>
  );
}
