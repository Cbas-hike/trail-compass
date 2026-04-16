import { getAllRegions, getRegionBySlug, getRoutesByRegion, getGearByIds } from "@/data/index";
import RouteCard from "@/components/RouteCard";
import GearGrid from "@/components/GearGrid";

export const dynamicParams = false;

export async function generateStaticParams() {
  const regions = getAllRegions();
  return regions.map((r) => ({
    country: r.countrySlug,
    region: r.slug,
  }));
}

export default async function RegionPage(props: any) {
  const params = await props.params;
  const region = getRegionBySlug(params.country, params.region);
  const routes = getRoutesByRegion(region?.id || "");

  if (!region) {
    return <div className="container-section py-16">Region not found</div>;
  }

  const allGearIds = Array.from(new Set(routes.flatMap(r => r.gearIds)));
  const recommendedGear = getGearByIds(allGearIds.slice(0, 3));

  return (
    <div>
      <section className="relative h-96 bg-cover bg-center">
        <img
          src={region.hero}
          alt={region.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container-section pb-8">
            <p className="text-[#e8f0eb] text-sm mb-2">
              {region.country}
            </p>
            <h1 className="text-5xl font-bold text-white">{region.name}</h1>
          </div>
        </div>
      </section>

      <section className="container-section py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div>
            <h3 className="text-sm uppercase tracking-wide text-[#6b7280] font-bold mb-2">Difficulty</h3>
            <p className="text-2xl font-bold text-[#1b3a2d] capitalize">{region.difficultyAvg}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wide text-[#6b7280] font-bold mb-2">Best Seasons</h3>
            <p className="text-2xl font-bold text-[#1b3a2d] capitalize">{region.bestSeasons.join(", ")}</p>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-wide text-[#6b7280] font-bold mb-2">Popularity</h3>
            <p className="text-2xl font-bold text-[#1b3a2d]">{region.popularityScore}/10</p>
          </div>
        </div>

        <div className="prose mb-16 max-w-none">
          <p className="text-lg leading-relaxed text-[#2c2c2c]">
            {region.description}
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#1b3a2d] mb-6">Highlights</h2>
          <ul className="space-y-3">
            {region.highlights.map((highlight: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#e8923a] font-bold mt-1">•</span>
                <span className="text-[#2c2c2c]">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#1b3a2d] mb-6">Terrain Types</h2>
          <div className="flex gap-2 flex-wrap">
            {region.terrainTypes.map((type: string) => (
              <span key={type} className="badge-landscape capitalize">
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#1b3a2d] mb-8">Popular Routes</h2>
          {routes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {routes.map((route: any) => (
                <RouteCard key={route.slug} route={route} />
              ))}
            </div>
          ) : (
            <p className="text-[#6b7280]">No routes available for this region yet.</p>
          )}
        </div>

        {recommendedGear.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[#1b3a2d] mb-8">Recommended Gear</h2>
            <GearGrid products={recommendedGear} />
          </div>
        )}

        <div className="bg-[#f0f0f0] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[#1b3a2d] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-[#1b3a2d] mb-2">When is the best time to visit?</h3>
              <p className="text-[#2c2c2c]">The best seasons for {region.name} are {region.bestSeasons.join(", ")}. Weather is most stable and landscapes are at their finest.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#1b3a2d] mb-2">How difficult are the routes?</h3>
              <p className="text-[#2c2c2c]">Routes range from easy to {region.difficultyAvg}. Choose routes appropriate to your fitness and experience level.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#1b3a2d] mb-2">What gear do I need?</h3>
              <p className="text-[#2c2c2c]">Always bring waterproof boots, a daypack, plenty of water, and a rain jacket. Trekking poles are recommended for routes with significant elevation.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
