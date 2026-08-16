import type { Restaurant } from "@/types/restaurant";

export const restaurants: Restaurant[] = [
  {
    slug: "locanda-verde-nyc",
    name: "Locanda Verde",
    city: "New York",
    country: "United States",
    heroImage: "/images/restaurants/locanda-verde-nyc/hero.jpg",
    gallery: [
      "/images/restaurants/locanda-verde-nyc/gallery-1.jpg",
      "/images/restaurants/locanda-verde-nyc/gallery-2.jpg",
    ],
    location: "Tribeca, New York",
    visitDate: "2024-09-12",
    signatureDish: "Sheep's milk ricotta and grandma's ravioli",
    companions: "Three friends celebrating a promotion that wasn't mine",
    music: "Warm chatter, glasses, a record playing low behind the bar",
    weather: "Early autumn evening, jacket weather for the first time in months",
    mood: "Loud happiness, the kind you don't have to explain",
    story:
      "It wasn't even my celebration, but somehow I ended up giving a toast. We stayed long after the plates were cleared, arguing about nothing, ordering one more thing every time we said we were done.",
    lesson: "Some of my best nights were never about me, and that was the whole point.",
    whyItMatters:
      "It's the place I think of when someone asks what a good night out actually feels like.",
    futureMe: {
      wouldReturn: true,
      wouldRecommend: true,
      whatChanged: "I started showing up for other people's wins louder.",
    },
  },
  {
    slug: "attica-melbourne",
    name: "Attica",
    city: "Melbourne",
    country: "Australia",
    heroImage: "/images/restaurants/attica-melbourne/hero.jpg",
    gallery: [
      "/images/restaurants/attica-melbourne/gallery-1.jpg",
      "/images/restaurants/attica-melbourne/gallery-2.jpg",
    ],
    location: "Ripponlea, Melbourne",
    visitDate: "2025-02-18",
    signatureDish: "A twelve-course tasting built entirely around native ingredients",
    companions: "My partner, on a trip we'd been saving for two years",
    music: "Almost none — just the kitchen doors and quiet plating",
    weather: "Warm evening, the kind that lingers into a long walk home",
    mood: "Reverent, unhurried, a little overwhelmed",
    story:
      "Every course came with a story about where the ingredient was foraged. I stopped checking my phone somewhere around course four and didn't think about it again until we left three hours later.",
    lesson: "Attention is the most expensive ingredient, and you can taste when it's missing.",
    whyItMatters:
      "It's the meal that made me understand why people save up for a single night out.",
    futureMe: {
      wouldReturn: true,
      wouldRecommend: true,
      whatChanged: "I started cooking slower at home, on purpose.",
    },
  },
  {
    slug: "le-comptoir-paris",
    name: "Le Comptoir du Relais",
    city: "Paris",
    country: "France",
    heroImage: "/images/restaurants/le-comptoir-paris/hero.jpg",
    gallery: [
      "/images/restaurants/le-comptoir-paris/gallery-1.jpg",
      "/images/restaurants/le-comptoir-paris/gallery-2.jpg",
    ],
    location: "Saint-Germain-des-Prés, Paris",
    visitDate: "2023-06-23",
    signatureDish: "Duck confit, ordered without looking at the menu",
    companions: "My sister, two days after the café argument that dissolved into laughter",
    music: "Street noise through an open window, cutlery, French I only half understood",
    weather: "Warm evening light spilling onto the pavement tables",
    mood: "Easy, unplanned, exactly what the trip needed",
    story:
      "We hadn't booked, so we stood outside for twenty minutes and didn't mind at all. When the table opened up, it felt like we'd earned something small but real.",
    lesson: "The best meals are rarely the ones you plan for weeks in advance.",
    whyItMatters:
      "It's a small, ordinary memory that somehow outlasted the bigger moments from that trip.",
    futureMe: {
      wouldReturn: true,
      wouldRecommend: true,
      whatChanged: "I stopped over-planning trips with my sister after this one.",
    },
  },
  {
    slug: "din-tai-fung-taipei",
    name: "Din Tai Fung",
    city: "Taipei",
    country: "Taiwan",
    heroImage: "/images/restaurants/din-tai-fung-taipei/hero.jpg",
    gallery: [
      "/images/restaurants/din-tai-fung-taipei/gallery-1.jpg",
      "/images/restaurants/din-tai-fung-taipei/gallery-2.jpg",
    ],
    location: "Xinyi, Taipei",
    visitDate: "2025-03-30",
    signatureDish: "Xiaolongbao, counted and compared like a competitive sport",
    companions: "My whole family, for the first time in three years",
    music: "The clatter of an open kitchen, dumplings being folded in view",
    weather: "Humid night, neon signs blurring through the restaurant windows",
    mood: "Full in every sense of the word",
    story:
      "We waited ninety minutes and nobody complained once. Watching the kitchen fold dumplings through the glass became its own kind of entertainment before the food even arrived.",
    lesson: "Waiting together is still time spent together.",
    whyItMatters:
      "The first proper meal with my whole family after years of everyone being scattered across time zones.",
    futureMe: {
      wouldReturn: true,
      wouldRecommend: true,
      whatChanged: "I started planning trips home around getting everyone at one table.",
    },
  },
];
