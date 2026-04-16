import fs from "fs";
import path from "path";
import matter from "gray-matter";

const getCwd = () => {
  if (typeof process !== "undefined" && process.cwd) {
    try {
      const cwd = process.cwd();
      if (typeof cwd === "string" && cwd.length > 0) {
        return cwd;
      }
    } catch {}
  }
  const fallback = process.env.PWD || __dirname || ".";
  if (typeof fallback === "string" && fallback.length > 0) {
    return fallback;
  }
  return ".";
};

export interface Country {
  title: string;
  slug: string;
  description: string;
  hero: string;
  regions: string[];
}

export interface Region {
  title: string;
  slug: string;
  country: string;
  countrySlug: string;
  description: string;
  hero: string;
  landscape: string[];
  difficulty: string;
  bestSeason: string;
  highlights: string[];
  distance: string;
}

export interface Route {
  title: string;
  slug: string;
  region: string;
  regionSlug: string;
  country: string;
  countrySlug: string;
  distance: number;
  elevation: number;
  duration: string;
  difficulty: string;
  routeType: string;
  landscape: string[];
  season: string[];
  gearIds: string[];
  description: string;
  hero: string;
  highlights: string[];
  content?: string;
}

export interface GearProduct {
  title: string;
  slug: string;
  category: string;
  price: number;
  image: string;
  affiliateLinks: Array<{ retailer: string; url: string }>;
  summary: string;
  content?: string;
}

export interface GearGuide {
  title: string;
  slug: string;
  description: string;
  hero: string;
  category: string;
  productIds: string[];
  publishedAt: string;
  content: string;
}

export interface HikingGuide {
  title: string;
  slug: string;
  description: string;
  hero: string;
  tags: string[];
  publishedAt: string;
  content: string;
}

function getFilesInDir(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
}

function parseFile(filePath: string): any {
  const content = fs.readFileSync(filePath, "utf-8");
  const { data, content: body } = matter(content);
  return { ...data, content: body };
}

export function getAllCountries(): Country[] {
  const cwd = getCwd();
  const dir = path.join(cwd, "content", "countries");
  const files = getFilesInDir(dir);
  return files.map((file) => parseFile(path.join(dir, file)));
}

export function getCountry(slug: string): Country | null {
  const cwd = getCwd();
  const dir = path.join(cwd, "content", "countries");
  const file = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  return parseFile(file);
}

export function getAllRegions(): Region[] {
  const cwd = getCwd();
  const dir = path.join(cwd, "content", "regions");
  if (!fs.existsSync(dir)) return [];
  const regions: Region[] = [];
  const countries = fs.readdirSync(dir);
  for (const country of countries) {
    const countryPath = path.join(dir, country);
    const files = getFilesInDir(countryPath);
    for (const file of files) {
      regions.push(parseFile(path.join(countryPath, file)));
    }
  }
  return regions;
}

export function getRegionsByCountry(countrySlug: string): Region[] {
  const cwd = getCwd();
  const dir = path.join(cwd, "content", "regions", countrySlug);
  if (!fs.existsSync(dir)) return [];
  const files = getFilesInDir(dir);
  return files.map((file) => parseFile(path.join(dir, file)));
}

export function getRegion(
  countrySlug: string,
  regionSlug: string
): Region | null {
  const cwd = getCwd();
  const file = path.join(
    cwd,
    "content",
    "regions",
    countrySlug,
    `${regionSlug}.mdx`
  );
  if (!fs.existsSync(file)) return null;
  return parseFile(file);
}

export function getAllRoutes(): Route[] {
  const cwd = getCwd();
  const dir = path.join(cwd, "content", "routes");
  if (!fs.existsSync(dir)) return [];
  const routes: Route[] = [];
  const countries = fs.readdirSync(dir);
  for (const country of countries) {
    const countryPath = path.join(dir, country);
    const regions = fs.readdirSync(countryPath);
    for (const region of regions) {
      const regionPath = path.join(countryPath, region);
      const files = getFilesInDir(regionPath);
      for (const file of files) {
        routes.push(parseFile(path.join(regionPath, file)));
      }
    }
  }
  return routes;
}

export function getRoutesByRegion(
  countrySlug: string,
  regionSlug: string
): Route[] {
  const cwd = getCwd();
  const dir = path.join(
    cwd,
    "content",
    "routes",
    countrySlug,
    regionSlug
  );
  if (!fs.existsSync(dir)) return [];
  const files = getFilesInDir(dir);
  return files.map((file) => parseFile(path.join(dir, file)));
}

export function getRoute(
  countrySlug: string,
  regionSlug: string,
  routeSlug: string
): Route | null {
  const cwd = getCwd();
  const file = path.join(
    cwd,
    "content",
    "routes",
    countrySlug,
    regionSlug,
    `${routeSlug}.mdx`
  );
  if (!fs.existsSync(file)) return null;
  return parseFile(file);
}

export function getAllGearProducts(): GearProduct[] {
  const cwd = getCwd();
  const dir = path.join(cwd, "content", "gear", "products");
  if (!fs.existsSync(dir)) return [];
  const files = getFilesInDir(dir);
  return files.map((file) => parseFile(path.join(dir, file)));
}

export function getGearProduct(slug: string): GearProduct | null {
  const cwd = getCwd();
  const file = path.join(
    cwd,
    "content",
    "gear",
    "products",
    `${slug}.mdx`
  );
  if (!fs.existsSync(file)) return null;
  return parseFile(file);
}

export function getGearByIds(ids: string[]): GearProduct[] {
  const products = getAllGearProducts();
  return products.filter((p) => ids.includes(p.slug));
}

export function getAllGearGuides(): GearGuide[] {
  const cwd = getCwd();
  const dir = path.join(cwd, "content", "gear", "guides");
  if (!fs.existsSync(dir)) return [];
  const files = getFilesInDir(dir);
  return files.map((file) => parseFile(path.join(dir, file)));
}

export function getGearGuide(slug: string): GearGuide | null {
  const cwd = getCwd();
  const file = path.join(
    cwd,
    "content",
    "gear",
    "guides",
    `${slug}.mdx`
  );
  if (!fs.existsSync(file)) return null;
  return parseFile(file);
}

export function getAllHikingGuides(): HikingGuide[] {
  const cwd = getCwd();
  const dir = path.join(cwd, "content", "guides");
  if (!fs.existsSync(dir)) return [];
  const files = getFilesInDir(dir);
  return files.map((file) => parseFile(path.join(dir, file)));
}

export function getHikingGuide(slug: string): HikingGuide | null {
  const cwd = getCwd();
  const file = path.join(cwd, "content", "guides", `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  return parseFile(file);
}
