import Link from "next/link";
import type { Route } from "@/lib/content";
import type { Route as NewRoute } from "@/data/types";
import DifficultyBadge from "./DifficultyBadge";

interface Props {
  route: Route | NewRoute;
}

export default function RouteCard({ route }: Props) {
  const isNewRoute = "distanceKm" in route;
  const title = isNewRoute ? route.name : route.title;
  const description = route.description;
  const difficulty = route.difficulty;
  const regionName = isNewRoute ? route.regionName : route.region;
  const country = route.country;
  const distance = isNewRoute ? route.distanceKm : route.distance;
  const duration = isNewRoute ? `${route.durationHours}h` : route.duration;
  const elevation = isNewRoute ? route.elevationGain : route.elevation;
  const terrainTypes = isNewRoute ? route.terrainTypes : (route as any).landscape || [];
  const countrySlug = route.countrySlug;
  const regionSlug = isNewRoute ? route.regionSlug : (route as any).regionSlug;
  const slug = route.slug;
  const hero = isNewRoute ? route.hero : undefined;

  return (
    <Link
      href={`/hikes/${countrySlug}/${regionSlug}/${slug}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div className="card overflow-hidden h-full flex flex-col">
        {hero && (
          <div className="h-48 overflow-hidden shrink-0">
            <img
              src={hero}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex gap-2 flex-wrap mb-3">
            {terrainTypes.slice(0, 2).map((t: string) => (
              <span key={t} className="badge-landscape capitalize">{t}</span>
            ))}
          </div>

          <h3 className="text-lg font-bold text-[#1b3a2d] mb-1 group-hover:text-[#e8923a] transition-colors">
            {title}
          </h3>
          <p className="text-xs text-[#6b7280] mb-3">
            {regionName} · {country}
          </p>

          <div className="flex items-center gap-3 text-sm text-[#2c2c2c] mb-3">
            <span className="font-semibold">{distance} km</span>
            <span className="text-[#c0c0c0]">·</span>
            <span>{duration}</span>
            <span className="text-[#c0c0c0]">·</span>
            <DifficultyBadge difficulty={difficulty} />
          </div>
          {elevation > 0 && (
            <p className="text-xs text-[#6b7280] mb-3">↑ {elevation} m elevation</p>
          )}

          <p className="text-[#2c2c2c] line-clamp-2 text-sm flex-1">{description}</p>

          <div className="mt-4 text-[#e8923a] text-sm font-semibold group-hover:underline">
            View route ↗
          </div>
        </div>
      </div>
    </Link>
  );
}
