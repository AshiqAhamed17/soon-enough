import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { places } from "@/data/places";
import { PlaceHero } from "@/components/place-hero";
import { PlaceSnapshot } from "@/components/place-snapshot";
import { PlaceGallery } from "@/components/place-gallery";
import { PlaceStory } from "@/components/place-story";
import { PlaceFutureMe } from "@/components/place-future-me";

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const place = places.find((p) => p.slug === slug);
  if (!place) return {};

  return {
    title: place.name,
    description: place.whyItMatters,
  };
}

export default async function PlacePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const place = places.find((p) => p.slug === slug);
  if (!place) notFound();

  return (
    <div>
      <PlaceHero place={place} />
      <PlaceSnapshot place={place} />
      <PlaceGallery place={place} />
      <PlaceStory place={place} />
      <PlaceFutureMe place={place} />
    </div>
  );
}
