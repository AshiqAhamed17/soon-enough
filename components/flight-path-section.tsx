"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { AllPlacesMap } from "@/components/all-places-map";
import { FlightPath } from "@/components/flight-path";
import type { MapMarkerData } from "@/components/leaflet-map";

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
