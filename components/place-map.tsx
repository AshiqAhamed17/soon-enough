"use client";

import dynamic from "next/dynamic";

const LeafletMapClient = dynamic(
  () => import("@/components/leaflet-map").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse rounded-2xl bg-card" />
    ),
  }
);

export function PlaceMap({
  name,
  coordinates,
}: {
  name: string;
  coordinates: { lat: number; lng: number };
}) {
  return (
    <div className="h-80 w-full overflow-hidden rounded-2xl">
      <LeafletMapClient
        mode="single"
        markers={[
          {
            id: name,
            lat: coordinates.lat,
            lng: coordinates.lng,
            label: name,
            variant: "visited",
          },
        ]}
      />
    </div>
  );
}
