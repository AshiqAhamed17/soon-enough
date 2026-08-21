import { HOME } from "@/data/home";
import { trips } from "@/data/trips";

export function getFlightPath() {
  const ordered = [...trips].sort((a, b) => (a.sortDate < b.sortDate ? -1 : 1));
  return [HOME, ...ordered];
}
