"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Map as LeafletMapInstance } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const TILE_URLS = {
  light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
};

const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

export type MapMarkerVariant = "visited" | "dream";

export interface MapMarkerData {
  id: string;
  lat: number;
  lng: number;
  label: string;
  sublabel?: string;
  href?: string;
  variant: MapMarkerVariant;
}

function createDivIcon(variant: MapMarkerVariant) {
  const isVisited = variant === "visited";
  return L.divIcon({
    className: "",
    html: `<span style="display:block;width:14px;height:14px;border-radius:9999px;background:${
      isVisited ? "var(--color-accent)" : "transparent"
    };border:2px ${isVisited ? "solid" : "dashed"} var(--color-accent);box-shadow:0 0 0 3px rgb(var(--shadow-warm) / 15%);"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
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
        <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={createDivIcon(marker.variant)}>
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
