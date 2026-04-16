import { NextRequest, NextResponse } from "next/server";
import { routes } from "@/data/routes";
import { scoreRoutes } from "@/lib/scorer";
import type { UserPreferences } from "@/data/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const prefs: UserPreferences = {
    country: searchParams.get("country") || undefined,
    difficulty: (searchParams.get("difficulty") as UserPreferences["difficulty"]) || undefined,
    distanceRange: (searchParams.get("distance") as UserPreferences["distanceRange"]) || undefined,
    terrain: (searchParams.get("terrain") as UserPreferences["terrain"]) || undefined,
    routeType: (searchParams.get("routeType") as UserPreferences["routeType"]) || undefined,
    season: (searchParams.get("season") as UserPreferences["season"]) || undefined,
    duration: (searchParams.get("duration") as UserPreferences["duration"]) || undefined,
    suitability: (searchParams.get("suitability") as UserPreferences["suitability"]) || undefined,
  };

  const scored = scoreRoutes(routes, prefs);

  return NextResponse.json({
    results: scored,
    total: scored.length,
    filters: prefs,
  });
}
