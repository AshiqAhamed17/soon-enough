import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { restaurants } from "@/data/restaurants";
import { RestaurantHero } from "@/components/restaurant-hero";
import { RestaurantSnapshot } from "@/components/restaurant-snapshot";
import { RestaurantMap } from "@/components/restaurant-map";
import { RestaurantGallery } from "@/components/restaurant-gallery";
import { RestaurantStory } from "@/components/restaurant-story";
import { RestaurantFutureMe } from "@/components/restaurant-future-me";

export function generateStaticParams() {
  return restaurants.map((restaurant) => ({ slug: restaurant.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const restaurant = restaurants.find((r) => r.slug === slug);
  if (!restaurant) return {};

  return {
    title: restaurant.name,
    description: restaurant.whyItMatters,
  };
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const restaurant = restaurants.find((r) => r.slug === slug);
  if (!restaurant) notFound();

  return (
    <div>
      <RestaurantHero restaurant={restaurant} />
      <RestaurantSnapshot restaurant={restaurant} />
      <RestaurantMap restaurant={restaurant} />
      <RestaurantGallery restaurant={restaurant} />
      <RestaurantStory restaurant={restaurant} />
      <RestaurantFutureMe restaurant={restaurant} />
    </div>
  );
}
