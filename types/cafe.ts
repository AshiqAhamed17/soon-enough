export interface FutureMe {
  wouldReturn: boolean;
  wouldRecommend: boolean;
  whatChanged: string;
}

export interface Cafe {
  slug: string;
  name: string;
  city: string;
  country: string;
  coordinates: { lat: number; lng: number };
  heroImage: string;
  gallery: string[];
  video?: string;
  location: string;
  visitDate: string;
  favouriteDrink: string;
  companions: string;
  music: string;
  weather: string;
  mood: string;
  story: string;
  lesson: string;
  whyItMatters: string;
  futureMe: FutureMe;
}
