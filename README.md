# Trail Compass

Data-driven hiking platform for the Netherlands, Belgium, and Europe. Built with Next.js 15, TypeScript, Tailwind CSS v4, and Leaflet maps.

## Features

- **HikeFinder** — 5-factor scoring algorithm matches routes to your preferences (terrain, season, difficulty, duration, suitability)
- **Interactive Maps** — Leaflet maps with GPS waypoints for every route
- **Affiliate Engine** — Rule-based gear recommendations per route based on terrain and conditions
- **Full SEO** — Automatic sitemap, meta tags, Open Graph support
- **Data-driven architecture** — TypeScript data files for regions, routes, and gear

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Required Node version:** 20+

---

## Project Structure

```
data/
  types.ts          — TypeScript interfaces for all data models
  regions.ts        — 6 regions across NL, BE, DE
  routes.ts         — 5 routes with full GPS coordinates
  gear.ts           — 6 gear items with affiliate links
  index.ts          — Query helper functions
lib/
  scorer.ts         — 5-factor route scoring algorithm
  affiliate-engine.ts — Terrain/weather-based gear recommendations
components/
  HikeFinder.tsx    — Sidebar filter + scored results
  RouteMap.tsx      — Single-route Leaflet map
  RegionMap.tsx     — Multi-marker region overview map
app/
  api/routes/       — GET endpoint for filtered/scored routes
  hike-finder/      — HikeFinder page
  destinations/     — Country → Region → Route pages
  gear/             — Gear review pages and guides
```

---

## Adding a New Route

1. Add GPS coordinates and route data to `data/routes.ts`:

```typescript
{
  id: "your-route-id",
  name: "Route Name",
  slug: "route-slug",
  regionId: "veluwe",         // must match a region id
  distanceKm: 14,
  durationHours: 4,
  elevationGain: 120,
  difficulty: "moderate",
  routeType: "loop",
  terrainTypes: ["forest", "hills"],
  bestSeasons: ["spring", "autumn"],
  coordinates: {
    start: { lat: 52.058, lng: 5.848 },
    end: { lat: 52.058, lng: 5.848 },
    waypoints: [
      { lat: 52.06, lng: 5.85 },
      // ...
    ],
  },
  gearIds: ["osprey-talon-22"],
  // ... other fields
}
```

2. The route is automatically available at `/hikes/[country]/[region]/[route]`.

---

## Adding a New Gear Item

1. Add the product to `data/gear.ts`:

```typescript
{
  id: "product-slug",
  slug: "product-slug",
  name: "Product Name",
  category: "boots-low",
  terrainTags: ["forest", "hills"],
  affiliateLinks: [
    { retailer: "Bergfreunde", url: "https://..." },
  ],
  priceRange: [80, 120],
  priceDisplay: "€80–€120",
  rating: 4.4,
  // ...
}
```

2. Reference it via `gearIds` in any route.

---

## Deployment to Vercel

1. Push to a GitHub repository.
2. Import at [vercel.com](https://vercel.com) — Vercel detects Next.js automatically.
3. Set environment variable: `NEXT_PUBLIC_BASE_URL` → your domain.
4. Click Deploy. Every push to `main` triggers a new deploy automatically.

The sitemap is automatically generated after each build at `/sitemap.xml`.
