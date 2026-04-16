import type { Route, GearItem, UserPreferences, ScoredRoute } from "@/data/types";
import { gearItems } from "@/data/gear";

interface ScoreWeights {
  terrainMatch: number;
  seasonMatch: number;
  popularity: number;
  suitabilityMatch: number;
  hazardPenalty: number;
}

const DEFAULT_WEIGHTS: ScoreWeights = {
  terrainMatch: 30,
  seasonMatch: 25,
  popularity: 20,
  suitabilityMatch: 15,
  hazardPenalty: -10,
};

function distanceMatches(route: Route, distanceRange?: string): boolean {
  if (!distanceRange || distanceRange === "all") return true;
  const km = route.distanceKm;
  if (distanceRange === "short") return km <= 10;
  if (distanceRange === "medium") return km > 10 && km <= 20;
  if (distanceRange === "long") return km > 20 && km <= 40;
  if (distanceRange === "multiday") return km > 40;
  return true;
}

function durationMatches(route: Route, duration?: string): boolean {
  if (!duration || duration === "all") return true;
  const hours = route.durationHours;
  if (duration === "half-day") return hours <= 3;
  if (duration === "full-day") return hours > 3 && hours <= 8;
  if (duration === "multiday") return hours > 8;
  return true;
}

export function scoreRoutes(
  allRoutes: Route[],
  prefs: UserPreferences
): ScoredRoute[] {
  // Step 1: Hard filters
  const filtered = allRoutes.filter((route) => {
    if (
      prefs.country &&
      prefs.country !== "all" &&
      route.countrySlug !== prefs.country
    )
      return false;
    if (
      prefs.difficulty &&
      prefs.difficulty !== "all" &&
      route.difficulty !== prefs.difficulty
    )
      return false;
    if (
      prefs.routeType &&
      prefs.routeType !== "all" &&
      route.routeType !== prefs.routeType
    )
      return false;
    if (!distanceMatches(route, prefs.distanceRange)) return false;
    if (!durationMatches(route, prefs.duration)) return false;
    if (prefs.suitability && prefs.suitability !== "all") {
      const s = prefs.suitability as keyof typeof route.suitability;
      if (!route.suitability[s]) return false;
    }
    return true;
  });

  // Step 2: Score remaining routes
  const scored: ScoredRoute[] = filtered.map((route) => {
    let score = 0;
    const matchReasons: string[] = [];

    // Terrain match
    if (prefs.terrain && prefs.terrain !== "all") {
      if (route.terrainTypes.includes(prefs.terrain)) {
        score += DEFAULT_WEIGHTS.terrainMatch;
        matchReasons.push(`Great ${prefs.terrain} terrain`);
      }
    } else {
      score += DEFAULT_WEIGHTS.terrainMatch / 2;
    }

    // Season match
    if (prefs.season && prefs.season !== "all") {
      if (route.bestSeasons.includes(prefs.season)) {
        score += DEFAULT_WEIGHTS.seasonMatch;
        matchReasons.push(`Ideal for ${prefs.season}`);
      } else {
        score -= 10;
      }
    } else {
      score += DEFAULT_WEIGHTS.seasonMatch / 2;
    }

    // Popularity
    score += (route.popularityScore / 10) * DEFAULT_WEIGHTS.popularity;
    if (route.popularityScore >= 8)
      matchReasons.push("Highly rated by hikers");

    // Suitability bonus
    if (prefs.suitability && prefs.suitability !== "all") {
      score += DEFAULT_WEIGHTS.suitabilityMatch;
      if (prefs.suitability === "beginner")
        matchReasons.push("Beginner-friendly");
      if (prefs.suitability === "dogs") matchReasons.push("Dog-friendly route");
      if (prefs.suitability === "kids")
        matchReasons.push("Great for families");
    }

    // Easy/short bonus for beginners
    if (route.difficulty === "easy") {
      matchReasons.push("Easy difficulty");
    }

    // Difficulty label
    if (!matchReasons.some((r) => r.includes("difficulty") || r.includes("Beginner"))) {
      if (route.difficulty === "moderate")
        matchReasons.push("Moderate difficulty");
      if (route.difficulty === "hard") matchReasons.push("Challenging terrain");
    }

    // Distance reason
    matchReasons.push(`${route.distanceKm}km · ${route.durationHours}h`);

    // Get gear recommendations
    const gearRecs = getGearForRoute(route, prefs);

    return {
      route,
      score: Math.max(0, Math.round(score)),
      matchReasons: matchReasons.slice(0, 3),
      gearRecommendations: gearRecs,
    };
  });

  // Step 3: Sort by score descending
  return scored.sort((a, b) => b.score - a.score);
}

function getGearForRoute(
  route: Route,
  _prefs: UserPreferences
): GearItem[] {
  return gearItems
    .filter((gear) => {
      const terrainMatch = gear.terrainTags.some((t) =>
        route.terrainTypes.includes(t)
      );
      const difficultyMatch = gear.difficultyTags.includes(route.difficulty);
      return terrainMatch || difficultyMatch;
    })
    .slice(0, 3);
}
