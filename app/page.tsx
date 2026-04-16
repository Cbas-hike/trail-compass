import Link from "next/link";
import { getAllRegions, getAllRoutes } from "@/data/index";
import HikeFinder from "@/components/HikeFinder";
import DestinationCard from "@/components/DestinationCard";
import RouteCard from "@/components/RouteCard";

export default async function Home() {
  const regions = getAllRegions();
  const routes = getAllRoutes();

  // Show top popular routes/regions for a well-curated homepage
  const featuredRoutes = [...routes]
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 4);
  const featuredRegions = [...regions]
    .sort((a, b) => b.popularityScore - a.popularityScore)
    .slice(0, 4);
  const countries = Array.from(new Set(regions.map((r) => r.country)));

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[560px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop"
          alt="Alpine hiking trail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70 flex items-center justify-center text-center">
          <div className="max-w-2xl px-4">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Find Your Perfect Hike
            </h1>
            <p className="text-lg text-white/85 mb-8">
              {routes.length} curated routes across {countries.length} countries with maps, photos, AllTrails links and gear advice.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link
                href="/hike-finder"
                className="bg-[#e8923a] text-white font-semibold px-7 py-3 rounded-full hover:bg-[#d47e2a] transition-colors"
              >
                Find Routes
              </Link>
              <Link
                href="/destinations"
                className="bg-white/20 backdrop-blur text-white font-semibold px-7 py-3 rounded-full border border-white/40 hover:bg-white/30 transition-colors"
              >
                Browse Destinations
              </Link>
            </div>
            {/* Country chips */}
            <div className="flex gap-2 justify-center flex-wrap mt-8">
              {countries.map((c) => (
                <span
                  key={c}
                  className="bg-white/15 backdrop-blur text-white/90 text-xs font-medium px-3 py-1 rounded-full border border-white/25"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HikeFinder */}
      <section className="bg-[#f7f5f0] py-14">
        <div className="container-section">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#1b3a2d] mb-1">Route Finder</h2>
            <p className="text-[#6b7280]">Filter by difficulty, terrain, distance, season and more</p>
          </div>
          <HikeFinder routes={routes} regions={regions} />
        </div>
      </section>

      {/* Featured routes */}
      <section className="py-14">
        <div className="container-section">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#1b3a2d] mb-1">Popular Routes</h2>
              <p className="text-[#6b7280]">Top-rated hikes - every route opens in a new tab</p>
            </div>
            <Link href="/destinations" className="text-[#e8923a] font-semibold hover:text-[#d47e2a] text-sm">
              All {routes.length} routes
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRoutes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured regions */}
      <section className="bg-[#f7f5f0] py-14">
        <div className="container-section">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#1b3a2d] mb-1">Featured Regions</h2>
              <p className="text-[#6b7280]">Explore the best hiking areas</p>
            </div>
            <Link href="/destinations" className="text-[#e8923a] font-semibold hover:text-[#d47e2a] text-sm">
              All regions
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRegions.map((region) => (
              <DestinationCard
                key={region.slug}
                title={region.name}
                slug={region.slug}
                description={region.description}
                hero={region.hero}
                labels={region.terrainTypes}
                href={`/destinations/${region.countrySlug}/${region.slug}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-[#1b3a2d] text-white py-14">
        <div className="container-section flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Ready to plan your next adventure?</h2>
            <p className="text-[#e8f0eb]">
              {routes.length} routes - {regions.length} regions - AllTrails + Komoot - photo albums - gear advice
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/hike-finder"
              className="bg-[#e8923a] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#d47e2a] transition-colors"
            >
              Find a Route
            </Link>
            <Link
              href="/guides"
              className="border border-white/40 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
            >
              Read Guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
