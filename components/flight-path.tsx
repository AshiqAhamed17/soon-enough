"use client";

import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { animate, useMotionValue, useReducedMotion } from "framer-motion";
import L from "leaflet";
import { getFlightPath } from "@/lib/trips";
import { buildRoutePoints, pointAtProgress } from "@/lib/flight-path-geometry";

const PLANE_ICON = L.divIcon({
  className: "",
  html: `<div style="width:22px;height:22px;display:flex;align-items:center;justify-content:center;color:var(--color-accent);">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M2 16l20-7-3 8 3 8-20-7v-2z"/>
    </svg>
  </div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

const STOP_ICON = L.divIcon({
  className: "",
  html: `<span style="display:block;width:10px;height:10px;border-radius:9999px;background:var(--color-accent-deep);"></span>`,
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});

export function FlightPath({ play, replayKey }: { play: boolean; replayKey: number }) {
  const map = useMap();
  const prefersReducedMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const polylineRef = useRef<L.Polyline | null>(null);
  const planeRef = useRef<L.Marker | null>(null);
  const stopMarkersRef = useRef<L.Marker[]>([]);

  const waypoints = getFlightPath();
  const { points, cumulative } = buildRoutePoints(waypoints.map((w) => w.coordinates));

  useEffect(() => {
    const polyline = L.polyline([], { color: "var(--color-accent)", weight: 2, opacity: 0.8 }).addTo(map);
    const plane = L.marker([waypoints[0].coordinates.lat, waypoints[0].coordinates.lng], {
      icon: PLANE_ICON,
    }).addTo(map);
    const stops = waypoints.map((w) =>
      L.marker([w.coordinates.lat, w.coordinates.lng], { icon: STOP_ICON })
        .bindTooltip(`${w.city}${"displayDate" in w ? ` — ${w.displayDate}` : ""}`)
        .addTo(map)
    );

    polylineRef.current = polyline;
    planeRef.current = plane;
    stopMarkersRef.current = stops;

    return () => {
      map.removeLayer(polyline);
      map.removeLayer(plane);
      stops.forEach((s) => map.removeLayer(s));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    if (!play) return;

    const totalKm = cumulative[cumulative.length - 1] ?? 0;
    const duration = Math.min(Math.max(totalKm / 400, 3), 9);

    if (prefersReducedMotion) {
      const end = pointAtProgress(points, cumulative, 1);
      polylineRef.current?.setLatLngs(points.map((p) => [p.lat, p.lng]));
      planeRef.current?.setLatLng([end.lat, end.lng]);
      return;
    }

    progress.set(0);
    const controls = animate(progress, 1, {
      duration,
      ease: "easeOut",
      onUpdate: (value) => {
        const current = pointAtProgress(points, cumulative, value);
        const drawn = points.slice(0, current.pointIndex + 1);
        polylineRef.current?.setLatLngs(drawn.map((p) => [p.lat, p.lng]));
        planeRef.current?.setLatLng([current.lat, current.lng]);

        const el = planeRef.current?.getElement();
        if (el) {
          (el.firstElementChild as HTMLElement).style.transform = `rotate(${current.bearing}deg)`;
        }
      },
    });

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, replayKey]);

  return null;
}
