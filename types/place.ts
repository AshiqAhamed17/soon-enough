export interface FutureMe {
  wouldReturn: boolean;
  wouldRecommend: boolean;
  whatChanged: string;
}

export interface Place {
  slug: string;
  name: string;
  city: string;
  country: string;
  category: string;
  heroImage: string;
  gallery: string[];
  video?: string;
  location: string;
  visitDate: string;
  detail: string;
  companions: string;
  music: string;
  weather: string;
  mood: string;
  story: string;
  lesson: string;
  whyItMatters: string;
  futureMe: FutureMe;
}
