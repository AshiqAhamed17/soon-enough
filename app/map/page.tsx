import type { Metadata } from "next";
import { getAllMapMarkers } from "@/lib/memories";
import { FlightPathSection } from "@/components/flight-path-section";

export const metadata: Metadata = {
  title: "Map",
  description: "Everywhere that became a memory, and everywhere I still want to go.",
};

export default function MapPage() {
  const { visited, dreams } = getAllMapMarkers();

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-text-secondary/70">
        The archive
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-text md:text-4xl">Map</h1>
      <p className="mt-3 max-w-xl text-text-secondary">
        Everywhere that became a memory, and everywhere I still want to go.
      </p>

      <div className="mt-12 flex gap-6 font-mono text-xs uppercase tracking-[0.15em] text-text-secondary">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-accent" /> Visited
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full border-2 border-dashed border-accent" /> Soon Enough
        </span>
      </div>

      <div className="mt-6">
        <FlightPathSection visited={visited} dreams={dreams} />
      </div>
    </div>
  );
}
