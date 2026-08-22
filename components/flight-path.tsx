"use client";

import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { animate, useMotionValue, useReducedMotion } from "framer-motion";
import L from "leaflet";
import { getFlightPath } from "@/lib/trips";
import { buildRoutePoints, pointAtProgress } from "@/lib/flight-path-geometry";

// A symmetric top-down jet silhouette, mirrored left/right around x=12, so
// it points due north (straight up) in its unrotated state by construction
// — no guessing required. `bearing` in pointAtProgress() is a compass
// bearing (0° = north, 90° = east, clockwise), and CSS `rotate(Ndeg)` is
// also clockwise from the element's default orientation, so `rotate(bearing)`
// only lands correctly if "no rotation" already means "pointing north."
// (The previous dart shape got this right; an earlier attempt using a
// pre-made paper-plane glyph did not — it pointed northeast by default and
// visibly flew sideways.)
const PLANE_ICON = L.divIcon({
  className: "",
  html: `<div style="width:22px;height:22px;display:flex;align-items:center;justify-content:center;color:var(--color-accent);filter:drop-shadow(0 1px 2px rgb(var(--shadow-warm) / 40%));">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M12 1 L13 9 L23 15 L23 17 L13 13.5 L13.5 20 L17 22.5 L17 23.5 L12 22.5 L7 23.5 L7 22.5 L10.5 20 L11 13.5 L1 17 L1 15 L11 9 Z"/>
    </svg>
  </div>`,
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

const STOP_ICON = L.divIcon({
  className: "",
  html: `<span style="display:block;width:12px;height:12px;border-radius:9999px;background:var(--color-accent-deep);border:2px solid var(--color-card);box-shadow:0 1px 3px rgb(var(--shadow-warm) / 40%);"></span>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

// Two-layer trail for a "fading behind the plane" look instead of one flat
// opaque line: a dim base trail for everything already flown, plus a
// brighter "head" segment near the plane for the most recent stretch.
const TRAIL_STYLE = { color: "var(--color-accent)", weight: 2, opacity: 0.3 };
const HEAD_STYLE = { color: "var(--color-accent)", weight: 2.5, opacity: 0.9 };
const HEAD_FRACTION = 0.18; // trailing fraction of the current leg drawn bright

const STOPOVER_PAUSE_MS = 600;

export function FlightPath({ play, replayKey }: { play: boolean; replayKey: number }) {
  const map = useMap();
  const prefersReducedMotion = useReducedMotion();
  const progress = useMotionValue(0);
  const trailRef = useRef<L.Polyline | null>(null);
  const headRef = useRef<L.Polyline | null>(null);
  const planeRef = useRef<L.Marker | null>(null);
  const stopMarkersRef = useRef<L.Marker[]>([]);

  const waypoints = getFlightPath();
  // Each leg gets its own independent arc/points/duration, rather than one
  // route animated start-to-finish, so the plane can pause at intermediate
  // stops (a real stopover) instead of flying through as one continuous blur.
  const legs = waypoints.slice(0, -1).map((from, i) => {
    const to = waypoints[i + 1];
    const { points, cumulative, totalKm } = buildRoutePoints([from.coordinates, to.coordinates]);
    return { points, cumulative, duration: Math.min(Math.max(totalKm / 400, 2.5), 7) };
  });

  useEffect(() => {
    const trail = L.polyline([], TRAIL_STYLE).addTo(map);
    const head = L.polyline([], HEAD_STYLE).addTo(map);
    const plane = L.marker([waypoints[0].coordinates.lat, waypoints[0].coordinates.lng], {
      icon: PLANE_ICON,
    }).addTo(map);
    const stops = waypoints.map((w) =>
      L.marker([w.coordinates.lat, w.coordinates.lng], { icon: STOP_ICON })
        .bindTooltip(`${w.city}${"displayDate" in w ? ` — ${w.displayDate}` : ""}`)
        .addTo(map)
    );

    trailRef.current = trail;
    headRef.current = head;
    planeRef.current = plane;
    stopMarkersRef.current = stops;

    return () => {
      map.removeLayer(trail);
      map.removeLayer(head);
      map.removeLayer(plane);
      stops.forEach((s) => map.removeLayer(s));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  useEffect(() => {
    if (!play) return;
    let cancelled = false;
    let activeControls: ReturnType<typeof animate> | null = null;

    if (prefersReducedMotion) {
      const allPoints = legs.flatMap((leg) => leg.points);
      const last = waypoints[waypoints.length - 1].coordinates;
      trailRef.current?.setLatLngs(allPoints.map((p) => [p.lat, p.lng]));
      headRef.current?.setLatLngs([]);
      planeRef.current?.setLatLng([last.lat, last.lng]);
      return;
    }

    const completed: { lat: number; lng: number }[] = [];

    // animate()'s returned thenable rejects when .stop() is called mid-flight
    // (its `then(onResolve, onReject)` signature implies cancellation takes
    // the reject path) — waited on via a plain Promise that resolves either
    // way, since "the animation didn't finish" and "it finished" both just
    // mean "move on" here; letting the rejection propagate would surface as
    // an unhandled-rejection console error every time replay fires mid-leg.
    function waitFor(controls: ReturnType<typeof animate>) {
      return new Promise<void>((resolve) => {
        controls.then(resolve, resolve);
      });
    }

    async function run() {
      for (let i = 0; i < legs.length; i++) {
        if (cancelled) return;
        const leg = legs[i];
        progress.set(0);

        const controls = animate(progress, 1, {
          duration: leg.duration,
          ease: "easeInOut", // slow start (climb) → fast middle (cruise) → slow end (descent)
          onUpdate: (value) => {
            const current = pointAtProgress(leg.points, leg.cumulative, value);
            const drawnSoFar = leg.points.slice(0, current.pointIndex + 1);
            const headStart = Math.max(0, drawnSoFar.length - Math.ceil(drawnSoFar.length * HEAD_FRACTION) - 1);

            trailRef.current?.setLatLngs(
              [...completed, ...drawnSoFar].map((p) => [p.lat, p.lng])
            );
            headRef.current?.setLatLngs(drawnSoFar.slice(headStart).map((p) => [p.lat, p.lng]));
            planeRef.current?.setLatLng([current.lat, current.lng]);

            const el = planeRef.current?.getElement();
            if (el) {
              (el.firstElementChild as HTMLElement).style.transform = `rotate(${current.bearing}deg)`;
            }
          },
        });
        activeControls = controls;

        await waitFor(controls);
        if (cancelled) return;

        completed.push(...leg.points);
        headRef.current?.setLatLngs([]);

        if (i < legs.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, STOPOVER_PAUSE_MS));
        }
      }
    }

    run();

    return () => {
      cancelled = true;
      activeControls?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [play, replayKey]);

  return null;
}
