import { getAllRoutes, getRouteBySlug, getGearByIds } from "@/data/index";
import { getAffiliateRecommendations } from "@/lib/affiliate-engine";
import { getRegionBySlug } from "@/data/index";
import DifficultyBadge from "@/components/DifficultyBadge";
import GearGrid from "@/components/GearGrid";
import RouteMap from "@/components/RouteMap";
import PhotoGallery from "@/components/PhotoGallery";

export const dynamicParams = false;

export async function generateStaticParams() {
  const routes = getAllRoutes();
  return routes.map((r) => ({
    country: r.countrySlug,
    region: r.regionSlug,
    route: r.slug,
  }));
}

export default async function RoutePage(props: any) {
  const params = await props.params;
  const route = getRouteBySlug(params.country, params.region, params.route);

  if (!route) {
    return <div className="container-section py-16">Route not found</div>;
  }

  const region = getRegionBySlug(params.country, params.region);
  const gear = getGearByIds(route.gearIds);
  const affiliateRecs = region ? getAffiliateRecommendations(route, region) : [];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-96 bg-cover bg-center">
        <img
          src={route.hero}
          alt={route.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45 flex items-end">
          <div className="container-section pb-8">
            <p className="text-[#e8f0eb] text-sm mb-2">
              {route.regionName} · {route.country}
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{route.name}</h1>
            {/* External links */}
            <div className="flex gap-3 flex-wrap">
              {route.allTrailsUrl && (
                <a
                  href={route.allTrailsUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#00b04f] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#009040] transition-colors"
                >
                  View on AllTrails ↗
                </a>
              )}
              {route.komootUrl && (
                <a
                  href={route.komootUrl}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#e8923a] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#d47e2a] transition-colors"
                >
                  View on Komoot ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container-section py-12">
        {/* Stats bar */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-[#6b7280] text-xs uppercase tracking-wide font-bold mb-1">Distance</div>
              <div className="text-3xl font-bold text-[#1b3a2d]">{route.distanceKm} km</div>
            </div>
            <div>
              <div className="text-[#6b7280] text-xs uppercase tracking-wide font-bold mb-1">Elevation</div>
              <div className="text-3xl font-bold text-[#1b3a2d]">↑ {route.elevationGain} m</div>
            </div>
            <div>
              <div className="text-[#6b7280] text-xs uppercase tracking-wide font-bold mb-1">Duration</div>
              <div className="text-3xl font-bold text-[#1b3a2d]">{route.durationHours} h</div>
            </div>
            <div>
              <div className="text-[#6b7280] text-xs uppercase tracking-wide font-bold mb-1">Difficulty</div>
              <div className="mt-1">
                <DifficultyBadge difficulty={route.difficulty} />
              </div>
            </div>
          </div>
          {/* Tags row */}
          <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-stone-100">
            {route.terrainTypes.map((type) => (
              <span key={type} className="badge-landscape capitalize">{type}</span>
            ))}
            {route.bestSeasons.map((s) => (
              <span key={s} className="badge-landscape capitalize">🌿 {s}</span>
            ))}
            {route.suitability.dogs && <span className="badge-landscape">🐕 Dogs OK</span>}
            {route.suitability.kids && <span className="badge-landscape">👨‍👩‍👧 Kids OK</span>}
          </div>
        </div>

        {/* Map */}
        {route.coordinates.start && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#1b3a2d] mb-4">Route Map</h2>
            <RouteMap
              center={route.coordinates.start}
              zoom={12}
              markers={[
                { position: route.coordinates.start, label: "Start", type: "start" },
                { position: route.coordinates.end, label: "End", type: "end" },
                ...(route.coordinates.waypoints?.map((w, i) => ({
                  position: w,
                  label: `Waypoint ${i + 1}`,
                  type: "waypoint" as const,
                })) || []),
              ]}
              height="420px"
            />
          </div>
        )}

        {/* Description */}
        <div className="prose mb-10 max-w-none">
          <p className="text-lg leading-relaxed text-[#2c2c2c] mb-6">{route.description}</p>
          {route.longDescription.split("\n\n").map((para, i) => (
            <p key={i} className="text-[#3c3c3c] leading-relaxed mb-4">{para}</p>
          ))}
        </div>

        {/* Photo gallery */}
        {route.photos && route.photos.length > 0 && (
          <PhotoGallery photos={route.photos} routeName={route.name} />
        )}

        {/* Highlights */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[#1b3a2d] mb-4">Highlights</h2>
          <ul className="space-y-3">
            {route.highlights.map((highlight, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-[#e8923a] font-bold mt-1 shrink-0">✓</span>
                <span className="text-[#2c2c2c]">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Practical info */}
        <div className="bg-[#f7f5f0] rounded-xl p-6 mb-10">
          <h2 className="text-2xl font-bold text-[#1b3a2d] mb-4">Practical Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <h3 className="font-bold text-[#1b3a2d] mb-1 text-sm uppercase tracking-wide">🚗 Parking</h3>
              <p className="text-[#3c3c3c] text-sm">{route.practicalInfo.parking}</p>
            </div>
            <div>
              <h3 className="font-bold text-[#1b3a2d] mb-1 text-sm uppercase tracking-wide">🚌 Public Transport</h3>
              <p className="text-[#3c3c3c] text-sm">{route.practicalInfo.publicTransport}</p>
            </div>
            <div>
              <h3 className="font-bold text-[#1b3a2d] mb-1 text-sm uppercase tracking-wide">☕ Facilities</h3>
              <p className="text-[#3c3c3c] text-sm">{route.practicalInfo.facilities}</p>
            </div>
            <div>
              <h3 className="font-bold text-[#1b3a2d] mb-1 text-sm uppercase tracking-wide">📍 Trailhead</h3>
              <p className="text-[#3c3c3c] text-sm">{route.practicalInfo.trailhead}</p>
            </div>
          </div>
        </div>

        {/* Gear recommendations */}
        {affiliateRecs.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#1b3a2d] mb-4">Smart Gear for This Route</h2>
            <div className="space-y-3 mb-6">
              {affiliateRecs.map((rec) => (
                <div key={rec.item.id} className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-amber-800 font-medium">{rec.reason}</p>
                </div>
              ))}
            </div>
            <GearGrid products={affiliateRecs.map((r) => r.item)} />
          </div>
        )}

        {gear.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-[#1b3a2d] mb-4">Essential Gear</h2>
            <GearGrid products={gear} />
          </div>
        )}

        {/* External links */}
        <div className="bg-[#1b3a2d] text-white rounded-xl p-6">
          <h2 className="text-xl font-bold mb-2">Navigation & GPX</h2>
          <p className="text-[#e8f0eb] text-sm mb-4">
            Download GPX tracks and turn-by-turn navigation via these platforms:
          </p>
          <div className="flex gap-3 flex-wrap">
            {route.allTrailsUrl && (
              <a
                href={route.allTrailsUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#00b04f] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#009040] transition-colors"
              >
                AllTrails ↗
              </a>
            )}
            {route.komootUrl && (
              <a
                href={route.komootUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#e8923a] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#d47e2a] transition-colors"
              >
                Komoot ↗
              </a>
            )}
            <a
              href="https://www.wandelnet.nl"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-white/20 transition-colors"
            >
              WandelNet ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
