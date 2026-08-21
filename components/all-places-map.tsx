"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import type { MapMarkerData } from "@/components/leaflet-map";

const LeafletMapClient = dynamic(
  () => import("@/components/leaflet-map").then((mod) => mod.LeafletMap),
  {
    ssr: false,
    loading: () => <div className="h-full w-full animate-pulse rounded-2xl bg-card" />,
  }
);

export function AllPlacesMap({
  visited,
  dreams,
  children,
}: {
  visited: MapMarkerData[];
  dreams: MapMarkerData[];
  children?: ReactNode;
}) {
  return (
    <div className="h-[70vh] w-full overflow-hidden rounded-2xl">
      <LeafletMapClient mode="fit-bounds" markers={[...visited, ...dreams]}>
        {children}
      </LeafletMapClient>
    </div>
  );
}
