import { restaurants } from "@/data/restaurants";
import { RestaurantCard } from "@/components/restaurant-card";

export default function RestaurantsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70">
        The archive
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-text md:text-4xl">Restaurants</h1>
      <p className="mt-3 max-w-xl text-text-secondary">
        Not food reviews. Experiences, celebrations, small moments — one for every table that
        became part of mine.
      </p>
      <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
        {restaurants.map((restaurant, i) => (
          <RestaurantCard key={restaurant.slug} restaurant={restaurant} tiltIndex={i} />
        ))}
      </div>
    </div>
  );
}
