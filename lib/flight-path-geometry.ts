type LatLng = { lat: number; lng: number };

/**
 * Flat lat/lng-space quadratic-Bézier bow between two points — not a true
 * spherical great circle. Fine at this site's current India-only scale;
 * replace with a haversine-based great-circle midpoint if trips ever go
 * intercontinental (the bow becomes visibly wrong at high latitude/long
 * distance).
 */
export function buildArcPoints(from: LatLng, to: LatLng, steps = 48): LatLng[] {
  const mid = { lat: (from.lat + to.lat) / 2, lng: (from.lng + to.lng) / 2 };
  const dx = to.lng - from.lng;
  const dy = to.lat - from.lat;
  const length = Math.hypot(dx, dy);
  const bow = length * 0.15;
  // Perpendicular offset applied to the midpoint as the Bézier control point.
  const control = {
    lat: mid.lat + (dx / length || 0) * bow,
    lng: mid.lng - (dy / length || 0) * bow,
  };

  const points: LatLng[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const lat =
      (1 - t) ** 2 * from.lat + 2 * (1 - t) * t * control.lat + t ** 2 * to.lat;
    const lng =
      (1 - t) ** 2 * from.lng + 2 * (1 - t) * t * control.lng + t ** 2 * to.lng;
    points.push({ lat, lng });
  }
  return points;
}

function haversineKm(a: LatLng, b: LatLng): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function buildRoutePoints(waypoints: LatLng[]) {
  const points: LatLng[] = [];
  for (let i = 0; i < waypoints.length - 1; i++) {
    const arc = buildArcPoints(waypoints[i], waypoints[i + 1]);
    points.push(...(i === 0 ? arc : arc.slice(1)));
  }

  const cumulative: number[] = [0];
  for (let i = 1; i < points.length; i++) {
    cumulative.push(cumulative[i - 1] + haversineKm(points[i - 1], points[i]));
  }

  return { points, cumulative, totalKm: cumulative[cumulative.length - 1] ?? 0 };
}

export function pointAtProgress(
  points: LatLng[],
  cumulative: number[],
  progress: number
): { lat: number; lng: number; bearing: number; pointIndex: number } {
  const total = cumulative[cumulative.length - 1] ?? 0;
  const target = total * Math.min(Math.max(progress, 0), 1);

  let index = cumulative.findIndex((d) => d >= target);
  if (index <= 0) index = 1;
  if (index >= points.length) index = points.length - 1;

  const segStart = cumulative[index - 1];
  const segEnd = cumulative[index];
  const segT = segEnd > segStart ? (target - segStart) / (segEnd - segStart) : 0;

  const a = points[index - 1];
  const b = points[index];
  const lat = a.lat + (b.lat - a.lat) * segT;
  const lng = a.lng + (b.lng - a.lng) * segT;
  const bearing = (Math.atan2(b.lng - a.lng, b.lat - a.lat) * 180) / Math.PI;

  return { lat, lng, bearing, pointIndex: index };
}
