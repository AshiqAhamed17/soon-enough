import type { Trip } from "@/types/trip";

export const trips: Trip[] = [
  {
    slug: "new-delhi-india-2025",
    city: "New Delhi",
    country: "India",
    coordinates: { lat: 28.6139, lng: 77.2090 },
    sortDate: "2025-01-01",
    displayDate: "2025",
    precision: "year",
  },
  {
    slug: "mumbai-india-2026",
    city: "Mumbai",
    country: "India",
    coordinates: { lat: 19.0760, lng: 72.8777 },
    sortDate: "2026-01-01",
    displayDate: "Q1 2026",
    precision: "quarter",
  },
];
