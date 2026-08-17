import type { Metadata } from "next";
import { places } from "@/data/places";
import { PlaceCard } from "@/components/place-card";
import { QuoteBanner } from "@/components/quote-banner";

export const metadata: Metadata = {
  title: "Places",
  description:
    "Not everything is food. Cities, viewpoints, museums, and the odd airport — anywhere that became memorable.",
};

export default function PlacesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70">
        The archive
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-text md:text-4xl">Places</h1>
      <p className="mt-3 max-w-xl text-text-secondary">
        Not everything is food. Cities, viewpoints, museums, and the odd airport — anywhere that
        became memorable.
      </p>
      <div className="mt-16 grid gap-x-10 gap-y-16 md:grid-cols-2">
        {places.map((place, i) => (
          <PlaceCard key={place.slug} place={place} tiltIndex={i} />
        ))}
      </div>
      <QuoteBanner index={2} />
    </div>
  );
}
