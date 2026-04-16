import { regions } from "./regions";
import { routes } from "./routes";
import { gearItems } from "./gear";
import type { Region, Route, GearItem } from "./types";

// Regions
export function getAllRegions(): Region[] {
  return regions;
}

export function getRegionById(id: string): Region | undefined {
  return regions.find((r) => r.id === id);
}

export function getRegionsByCountry(countrySlug: string): Region[] {
  return regions.filter((r) => r.countrySlug === countrySlug);
}

export function getRegionBySlug(
  countrySlug: string,
  regionSlug: string
): Region | undefined {
  return regions.find(
    (r) => r.countrySlug === countrySlug && r.slug === regionSlug
  );
}

// Routes
export function getAllRoutes(): Route[] {
  return routes;
}

export function getRouteById(id: string): Route | undefined {
  return routes.find((r) => r.id === id);
}

export function getRoutesByRegion(regionId: string): Route[] {
  return routes.filter((r) => r.regionId === regionId);
}

export function getRouteBySlug(
  countrySlug: string,
  regionSlug: string,
  routeSlug: string
): Route | undefined {
  return routes.find(
    (r) =>
      r.countrySlug === countrySlug &&
      r.regionSlug === regionSlug &&
      r.slug === routeSlug
  );
}

// Gear
export function getAllGear(): GearItem[] {
  return gearItems;
}

export function getGearByIds(ids: string[]): GearItem[] {
  return ids
    .map((id) => gearItems.find((g) => g.id === id))
    .filter(Boolean) as GearItem[];
}

// Countries derived from regions
export const countries = [
  {
    slug: "netherlands",
    name: "Netherlands",
    hero: "https://source.unsplash.com/1200x800/?netherlands,nature",
    description: "Diverse nature from heathlands to hills",
  },
  {
    slug: "belgium",
    name: "Belgium",
    hero: "https://source.unsplash.com/1200x800/?belgium,ardennes",
    description: "Wild Ardennes, misty High Fens and hidden valleys",
  },
  {
    slug: "germany",
    name: "Germany",
    hero: "https://source.unsplash.com/1200x800/?germany,forest,hiking",
    description: "Black Forest, Eifel, Sauerland and Alpine foothills",
  },
  {
    slug: "luxembourg",
    name: "Luxembourg",
    hero: "https://source.unsplash.com/1200x800/?luxembourg,mullerthal,forest",
    description: "Sandstone gorges, mossy ravines and the Mullerthal - Luxembourg's Little Switzerland",
  },
];

export function getAllCountries() {
  return countries;
}

export function getCountryBySlug(slug: string) {
  return countries.find((c) => c.slug === slug);
}

export { regions, routes, gearItems };
