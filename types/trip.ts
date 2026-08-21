export interface Trip {
  slug: string;
  city: string;
  country: string;
  coordinates: { lat: number; lng: number };
  sortDate: string;
  displayDate: string;
  precision: "year" | "quarter" | "day";
}
