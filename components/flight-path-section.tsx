"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { AllPlacesMap } from "@/components/all-places-map";
import type { MapMarkerData } from "@/components/leaflet-map";

// FlightPath imports `leaflet` at module scope (touches `window` on import),
// so it must never be reachable via a statically-evaluated server import
// chain — same reasoning as the leaflet-map.tsx loader in place-map.tsx /
// all-places-map.tsx.
const FlightPath = dynamic(
  () => import("@/components/flight-path").then((mod) => mod.FlightPath),
  { ssr: false }
);

export function FlightPathSection({
  visited,
  dreams,
}: {
  visited: MapMarkerData[];
  dreams: MapMarkerData[];
}) {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative">
      <motion.div
        viewport={{ once: true, amount: 0.4 }}
        onViewportEnter={() => setHasPlayed(true)}
      />

      <AllPlacesMap visited={visited} dreams={dreams}>
        <FlightPath play={hasPlayed} replayKey={replayKey} />
      </AllPlacesMap>

      {hasPlayed && !prefersReducedMotion && (
        <button
          type="button"
          aria-label="Replay flight path"
          onClick={() => setReplayKey((k) => k + 1)}
          className="absolute bottom-4 right-4 z-[1000] rounded-full bg-card p-2 text-text-secondary shadow-sm transition-colors hover:text-text"
        >
          <RotateCcw size={16} />
        </button>
      )}
    </div>
  );
}
