import { cafes } from "@/data/cafes";
import { restaurants } from "@/data/restaurants";
import { places } from "@/data/places";
import { soonEnough } from "@/data/soon-enough";
import type { MapMarkerData } from "@/components/leaflet-map";

export interface Memory {
  href: string;
  name: string;
  category: string;
  city: string;
  country: string;
  coordinates: { lat: number; lng: number };
  heroImage: string;
  gallery: string[];
  visitDate: string;
  note: string;
}

export function getAllMemories(): Memory[] {
  const all: Memory[] = [
    ...cafes.map((cafe) => ({
      href: `/cafes/${cafe.slug}`,
      name: cafe.name,
      category: "Café",
      city: cafe.city,
      country: cafe.country,
      coordinates: cafe.coordinates,
      heroImage: cafe.heroImage,
      gallery: cafe.gallery,
      visitDate: cafe.visitDate,
      note: cafe.whyItMatters,
    })),
    ...restaurants.map((restaurant) => ({
      href: `/restaurants/${restaurant.slug}`,
      name: restaurant.name,
      category: "Restaurant",
      city: restaurant.city,
      country: restaurant.country,
      coordinates: restaurant.coordinates,
      heroImage: restaurant.heroImage,
      gallery: restaurant.gallery,
      visitDate: restaurant.visitDate,
      note: restaurant.whyItMatters,
    })),
    ...places.map((place) => ({
      href: `/places/${place.slug}`,
      name: place.name,
      category: place.category,
      city: place.city,
      country: place.country,
      coordinates: place.coordinates,
      heroImage: place.heroImage,
      gallery: place.gallery,
      visitDate: place.visitDate,
      note: place.whyItMatters,
    })),
  ];

  return all.sort((a, b) => (a.visitDate < b.visitDate ? 1 : -1));
}

export interface Photo {
  src: string;
  name: string;
  city: string;
  country: string;
  href: string;
}

export function getAllPhotos(): Photo[] {
  return getAllMemories().flatMap((memory) => [
    { src: memory.heroImage, name: memory.name, city: memory.city, country: memory.country, href: memory.href },
    ...memory.gallery.map((src) => ({
      src,
      name: memory.name,
      city: memory.city,
      country: memory.country,
      href: memory.href,
    })),
  ]);
}

export function getMemoriesByYear(): Array<{ year: string; memories: Memory[] }> {
  const memories = getAllMemories();
  const byYear = new Map<string, Memory[]>();

  for (const memory of memories) {
    const year = memory.visitDate.slice(0, 4);
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(memory);
  }

  return Array.from(byYear.entries())
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .map(([year, yearMemories]) => ({ year, memories: yearMemories }));
}

export function getAllMapMarkers(): { visited: MapMarkerData[]; dreams: MapMarkerData[] } {
  const visited: MapMarkerData[] = getAllMemories().map((memory) => ({
    id: memory.href,
    lat: memory.coordinates.lat,
    lng: memory.coordinates.lng,
    label: memory.name,
    sublabel: `${memory.city}, ${memory.country}`,
    href: memory.href,
    variant: "visited",
    category: memory.category,
  }));

  const dreams: MapMarkerData[] = soonEnough.map((destination) => ({
    id: destination.slug,
    lat: destination.coordinates.lat,
    lng: destination.coordinates.lng,
    label: destination.name,
    sublabel: `${destination.city}, ${destination.country}`,
    href: `/soon-enough`,
    variant: "dream",
  }));

  return { visited, dreams };
}
