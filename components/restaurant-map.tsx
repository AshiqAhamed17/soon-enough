import { PlaceMap } from "@/components/place-map";
import type { Restaurant } from "@/types/restaurant";

export function RestaurantMap({ restaurant }: { restaurant: Restaurant }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-sm uppercase tracking-widest text-text-secondary">Location</h2>
      <div className="mt-6">
        <PlaceMap name={restaurant.name} coordinates={restaurant.coordinates} />
      </div>
    </section>
  );
}
