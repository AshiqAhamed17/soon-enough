"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Map as LeafletMapInstance } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Stadia Maps uses domain-based authentication for browser tile requests —
// no API key in the URL. Instead, register the site's domain(s) (including
// "localhost" for dev) in the Stadia Maps dashboard at stadiamaps.com.
// Requests from unregistered domains simply fail to load tiles.
const TILE_URLS = {
  light: "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png",
  dark: "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
};

const ATTRIBUTION =
  '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>';

export type MapMarkerVariant = "visited" | "dream";

export interface MapMarkerData {
  id: string;
  lat: number;
  lng: number;
  label: string;
  sublabel?: string;
  href?: string;
  variant: MapMarkerVariant;
  category?: string;
}

// Lucide icon path data (stroke-based, viewBox 0 0 24 24), inlined since
// L.divIcon needs raw HTML — a React component can't be rendered into it.
const ICON_PATHS = {
  coffee: `<path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/>`,
  restaurant: `<path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"/><path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"/><path d="m2.1 21.8 6.4-6.3"/><path d="m19 5-7 7"/>`,
  landmark: `<path d="M10 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>`,
  sparkles: `<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>`,
};

function categoryIconPath(category: string | undefined, variant: MapMarkerVariant): string {
  if (variant === "dream") return ICON_PATHS.sparkles;
  if (category === "Café") return ICON_PATHS.coffee;
  if (category === "Restaurant") return ICON_PATHS.restaurant;
  return ICON_PATHS.landmark;
}

// A teardrop pin (viewBox 0 0 24 30, point at the bottom) with a category
// icon inset near the top — reads as a real illustrated map pin instead of
// a plain dot. Visited pins are solid-filled; dream pins are hollow/outlined
// to keep the established visited-vs-dream distinction.
function createDivIcon(variant: MapMarkerVariant, category?: string) {
  const isVisited = variant === "visited";
  const iconPath = categoryIconPath(category, variant);
  const pinFill = isVisited ? "var(--color-accent)" : "var(--color-card)";
  const pinStroke = isVisited ? "none" : 'stroke="var(--color-accent)" stroke-width="1.5"';
  const glyphColor = isVisited ? "white" : "var(--color-accent)";

  return L.divIcon({
    className: "",
    html: `<div style="position:relative;width:26px;height:34px;">
      <svg viewBox="0 0 24 30" width="26" height="34" style="position:absolute;inset:0;filter:drop-shadow(0 2px 3px rgb(var(--shadow-warm) / 35%));">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 18 12 18s12-9 12-18c0-6.627-5.373-12-12-12z" fill="${pinFill}" ${pinStroke}/>
      </svg>
      <div style="position:absolute;top:5px;left:6px;width:14px;height:14px;color:${glyphColor};">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          ${iconPath}
        </svg>
      </div>
    </div>`,
    iconSize: [26, 34],
    iconAnchor: [13, 34],
    popupAnchor: [0, -32],
  });
}

function useMapTheme(): "light" | "dark" {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme(root.getAttribute("data-theme") === "dark" ? "dark" : "light");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}

export function LeafletMap({
  markers,
  mode,
  zoom = 14,
  onMapReady,
  children,
  className = "",
}: {
  markers: MapMarkerData[];
  mode: "single" | "fit-bounds";
  zoom?: number;
  onMapReady?: (map: LeafletMapInstance) => void;
  children?: ReactNode;
  className?: string;
}) {
  const theme = useMapTheme();
  const mapRef = useRef<LeafletMapInstance | null>(null);

  useEffect(() => {
    if (mapRef.current) onMapReady?.(mapRef.current);
  }, [onMapReady]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || mode !== "fit-bounds" || markers.length === 0) return;
    const bounds = L.latLngBounds(markers.map((m): [number, number] => [m.lat, m.lng]));
    map.fitBounds(bounds, { padding: [32, 32], maxZoom: 12 });
  }, [mode, markers]);

  const center: [number, number] =
    markers.length > 0 ? [markers[0].lat, markers[0].lng] : [20, 0];

  return (
    <MapContainer
      center={center}
      zoom={mode === "single" ? zoom : 3}
      scrollWheelZoom={false}
      ref={mapRef}
      className={`h-full w-full ${className}`}
    >
      <TileLayer
        key={theme}
        url={theme === "dark" ? TILE_URLS.dark : TILE_URLS.light}
        attribution={ATTRIBUTION}
      />
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.lat, marker.lng]}
          icon={createDivIcon(marker.variant, marker.category)}
        >
          <Popup>
            {marker.href ? (
              <a href={marker.href} className="font-medium">
                {marker.label}
              </a>
            ) : (
              <span className="font-medium">{marker.label}</span>
            )}
            {marker.sublabel && <div className="text-xs opacity-70">{marker.sublabel}</div>}
          </Popup>
        </Marker>
      ))}
      {children}
    </MapContainer>
  );
}
