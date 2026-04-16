import type { Route, Region, GearItem } from "@/data/types";
import { gearItems } from "@/data/gear";

interface AffiliateRule {
  condition: (route: Route, region?: Region) => boolean;
  gearIds: string[];
  reason: string;
}

const rules: AffiliateRule[] = [
  {
    condition: (r) =>
      r.terrainTypes.includes("bogland") ||
      r.terrainTypes.includes("river"),
    gearIds: ["hiking-boots-waterproof"],
    reason: "Waterproof boots essential for boggy/wet terrain",
  },
  {
    condition: (r) =>
      r.terrainTypes.some((t) =>
        ["hills", "valleys", "rocky", "mountains"].includes(t)
      ),
    gearIds: ["hiking-boots-mid", "trekking-poles"],
    reason: "Mid-cut boots and poles recommended for hilly terrain",
  },
  {
    condition: (r) => r.durationHours >= 5,
    gearIds: ["daypack"],
    reason: "A proper daypack is essential for routes over 5 hours",
  },
  {
    condition: (r, region) =>
      region?.weatherPattern === "rainy" || r.weatherSensitivity === "high",
    gearIds: ["rain-jacket"],
    reason: "Rain jacket essential in this region",
  },
  {
    condition: (r) => r.hazardFlags.includes("steep") || r.elevationGain > 400,
    gearIds: ["trekking-poles"],
    reason: "Trekking poles reduce knee strain on steep descents",
  },
  {
    condition: (r) => r.difficulty === "easy" && r.durationHours <= 4,
    gearIds: ["hiking-boots-low", "daypack"],
    reason: "Light hiking boots and a small daypack are all you need",
  },
];

export function getAffiliateRecommendations(
  route: Route,
  region?: Region
): { item: GearItem; reason: string }[] {
  const recommended: { item: GearItem; reason: string }[] = [];
  const addedIds = new Set<string>();

  for (const rule of rules) {
    if (rule.condition(route, region)) {
      for (const gearId of rule.gearIds) {
        if (!addedIds.has(gearId)) {
          const item = gearItems.find((g) => g.id === gearId);
          if (item) {
            recommended.push({ item, reason: rule.reason });
            addedIds.add(gearId);
          }
        }
      }
    }
  }

  return recommended.slice(0, 4);
}
