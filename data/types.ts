export type Difficulty = "easy" | "moderate" | "hard" | "expert";
export type Season = "spring" | "summer" | "autumn" | "winter";
export type Terrain = "forest" | "heathland" | "hills" | "valleys" | "bogland" | "coast" | "dunes" | "mountains" | "farmland" | "rocky" | "river";
export type RouteType = "loop" | "out-and-back" | "point-to-point";
export type RegionType = "forest" | "mountains" | "coast" | "heathland" | "mixed" | "highland";
export type WeatherPattern = "rainy" | "moderate" | "dry" | "variable" | "harsh";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Region {
  id: string;
  name: string;
  slug: string;
  country: string;
  countrySlug: string;
  regionType: RegionType;
  description: string;
  longDescription: string;
  hero: string;
  difficultyAvg: Difficulty;
  bestSeasons: Season[];
  weatherPattern: WeatherPattern;
  terrainTypes: Terrain[];
  popularityScore: number; // 1-10
  accessibility: { car: boolean; publicTransport: boolean };
  dogFriendly: boolean;
  highlights: string[];
  coordinates: Coordinates; // center of region
  routeCount: number;
}

export interface Route {
  id: string;
  name: string;
  slug: string;
  regionId: string;
  regionName: string;
  regionSlug: string;
  country: string;
  countrySlug: string;
  distanceKm: number;
  durationHours: number;
  elevationGain: number;
  difficulty: Difficulty;
  routeType: RouteType;
  terrainTypes: Terrain[];
  bestSeasons: Season[];
  startLocation: string;
  endLocation: string;
  coordinates: {
    start: Coordinates;
    end: Coordinates;
    waypoints?: Coordinates[];
  };
  suitability: {
    beginner: boolean;
    kids: boolean;
    dogs: boolean;
  };
  hazardFlags: string[]; // "mud", "steep", "exposed", "rocky", "slippery"
  popularityScore: number; // 1-10
  description: string;
  longDescription: string;
  hero: string;
  highlights: string[];
  practicalInfo: {
    parking: string;
    publicTransport: string;
    facilities: string;
    trailhead: string;
  };
  gearIds: string[];
  weatherSensitivity: "low" | "medium" | "high";
  allTrailsUrl?: string;
  komootUrl?: string;
  photos?: string[];
}

export interface GearItem {
  id: string;
  slug: string;
  name: string;
  category: "boots" | "backpack" | "jacket" | "poles" | "navigation" | "clothing" | "safety";
  terrainTags: Terrain[];
  weatherTags: string[]; // "rain", "cold", "mud", "snow"
  difficultyTags: Difficulty[];
  durationTags: string[]; // "half-day", "full-day", "multiday"
  affiliateLinks: { retailer: string; url: string }[];
  priceRange: { min: number; max: number };
  priceDisplay: string;
  rating: number; // 1-5
  image: string;
  summary: string;
  reviewHighlights: string[];
}

export interface UserPreferences {
  country?: string;
  difficulty?: Difficulty | "all";
  distanceRange?: "short" | "medium" | "long" | "multiday";
  terrain?: Terrain | "all";
  routeType?: RouteType | "all";
  season?: Season | "all";
  duration?: "half-day" | "full-day" | "multiday" | "all";
  suitability?: "kids" | "dogs" | "beginner" | "all";
}

export interface ScoredRoute {
  route: Route;
  score: number;
  matchReasons: string[];
  gearRecommendations: GearItem[];
}
