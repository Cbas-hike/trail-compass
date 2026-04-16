"use client";
import { useState, useMemo } from "react";
import type { Route, Region, UserPreferences } from "@/data/types";
import { scoreRoutes } from "@/lib/scorer";
import Link from "next/link";

interface HikeFinderProps {
  routes: Route[];
  regions: Region[];
}

type FilterOption = { value: string; label: string };

const COUNTRIES: FilterOption[] = [
  { value: "all", label: "All countries" },
  { value: "netherlands", label: "Netherlands" },
  { value: "belgium", label: "Belgium" },
  { value: "germany", label: "Germany" },
];

const DIFFICULTIES: FilterOption[] = [
  { value: "all", label: "Any" },
  { value: "easy", label: "Easy" },
  { value: "moderate", label: "Moderate" },
  { value: "hard", label: "Hard" },
];

const DISTANCES: FilterOption[] = [
  { value: "all", label: "Any" },
  { value: "short", label: "< 10km" },
  { value: "medium", label: "10–20km" },
  { value: "long", label: "20–40km" },
  { value: "multiday", label: "40km+" },
];

const TERRAINS: FilterOption[] = [
  { value: "all", label: "Any" },
  { value: "forest", label: "Forest" },
  { value: "heathland", label: "Heathland" },
  { value: "hills", label: "Hills" },
  { value: "valleys", label: "Valleys" },
  { value: "bogland", label: "Bogland" },
  { value: "river", label: "River" },
  { value: "dunes", label: "Dunes" },
];

const SEASONS: FilterOption[] = [
  { value: "all", label: "Any" },
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
  { value: "autumn", label: "Autumn" },
  { value: "winter", label: "Winter" },
];

const DURATIONS: FilterOption[] = [
  { value: "all", label: "Any" },
  { value: "half-day", label: "Half day" },
  { value: "full-day", label: "Full day" },
  { value: "multiday", label: "Multi-day" },
];

const SUITABILITIES: FilterOption[] = [
  { value: "all", label: "Any" },
  { value: "beginner", label: "Beginner" },
  { value: "kids", label: "With kids" },
  { value: "dogs", label: "With dogs" },
];

function FilterSection({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mb-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              value === opt.value
                ? "bg-[#1B3A2D] text-white"
                : "bg-white text-stone-600 border border-stone-200 hover:border-[#1B3A2D] hover:text-[#1B3A2D]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function HikeFinder({ routes, regions }: HikeFinderProps) {
  const [prefs, setPrefs] = useState<UserPreferences>({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const activeFilterCount = Object.values(prefs).filter(
    (v) => v && v !== "all"
  ).length;

  const results = useMemo(() => {
    return scoreRoutes(routes, prefs);
  }, [routes, prefs]);

  function set(key: keyof UserPreferences) {
    return (val: string) =>
      setPrefs((p) => ({
        ...p,
        [key]: val === "all" ? undefined : val,
      }));
  }

  function clearAll() {
    setPrefs({});
  }

  const getVal = (key: keyof UserPreferences): string =>
    (prefs[key] as string) || "all";

  const sidebar = (
    <div className="bg-[#F5F2ED] rounded-xl p-5 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-stone-800 text-sm">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-[#E8923A] hover:underline font-medium"
          >
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>
      <FilterSection
        label="Country"
        options={COUNTRIES}
        value={getVal("country")}
        onChange={set("country")}
      />
      <FilterSection
        label="Difficulty"
        options={DIFFICULTIES}
        value={getVal("difficulty")}
        onChange={set("difficulty")}
      />
      <FilterSection
        label="Distance"
        options={DISTANCES}
        value={getVal("distanceRange")}
        onChange={set("distanceRange")}
      />
      <FilterSection
        label="Terrain"
        options={TERRAINS}
        value={getVal("terrain")}
        onChange={set("terrain")}
      />
      <FilterSection
        label="Season"
        options={SEASONS}
        value={getVal("season")}
        onChange={set("season")}
      />
      <FilterSection
        label="Duration"
        options={DURATIONS}
        value={getVal("duration")}
        onChange={set("duration")}
      />
      <FilterSection
        label="Suitable for"
        options={SUITABILITIES}
        value={getVal("suitability")}
        onChange={set("suitability")}
      />
    </div>
  );

  return (
    <div>
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1B3A2D] text-white rounded-xl text-sm font-medium"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4h18M6 12h12M10 20h4"
            />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className="bg-[#E8923A] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
        {mobileOpen && <div className="mt-3">{sidebar}</div>}
      </div>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">{sidebar}</aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-stone-500">
              <span className="font-semibold text-stone-800">
                {results.length}
              </span>{" "}
              {results.length === 1 ? "route" : "routes"} found
              {activeFilterCount > 0 && " matching your filters"}
            </p>
            {results.length > 0 && (
              <p className="text-xs text-stone-400">Sorted by best match</p>
            )}
          </div>

          {results.length === 0 ? (
            <div className="text-center py-16 bg-stone-50 rounded-xl border border-stone-200">
              <p className="text-2xl mb-2">hiking boot emoji</p>
              <p className="font-semibold text-stone-700">No routes found</p>
              <p className="text-stone-400 text-sm mt-1 mb-4">
                Try adjusting your filters
              </p>
              <button
                onClick={clearAll}
                className="text-sm text-[#E8923A] font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {results.map((scored, i) => (
                <div key={scored.route.id} className="relative">
                  {i === 0 && activeFilterCount > 0 && (
                    <div className="absolute -top-2 -right-2 z-10">
                      <span className="bg-[#E8923A] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                        Best match
                      </span>
                    </div>
                  )}
                  <ScoredRouteCard scored={scored} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScoredRouteCard({
  scored,
}: {
  scored: {
    route: Route;
    score: number;
    matchReasons: string[];
    gearRecommendations: { id: string; name: string }[];
  };
}) {
  const { route, matchReasons } = scored;
  const diffColors: Record<string, string> = {
    easy: "bg-green-100 text-green-800",
    moderate: "bg-yellow-100 text-yellow-800",
    hard: "bg-red-100 text-red-800",
  };

  return (
    <Link
      href={`/hikes/${route.countrySlug}/${route.regionSlug}/${route.slug}`}
      className="group block bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-md transition-all hover:border-[#1B3A2D]/30"
    >
      <div className="relative h-44">
        <img
          src={route.hero}
          alt={route.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <span className="text-white font-bold text-sm line-clamp-1">
              {route.name}
            </span>
            <p className="text-white/80 text-xs">
              {route.regionName} · {route.country}
            </p>
          </div>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              diffColors[route.difficulty] ||
              "bg-stone-100 text-stone-700"
            }`}
          >
            {route.difficulty}
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex gap-3 text-xs text-stone-500 mb-3">
          <span>📍 {route.distanceKm}km</span>
          <span>⏱ {route.durationHours}h</span>
          <span>↑ {route.elevationGain}m</span>
          <span className="capitalize">{route.routeType}</span>
        </div>
        {matchReasons.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {matchReasons.map((reason, i) => (
              <span
                key={i}
                className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full border border-green-100"
              >
                ✓ {reason}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
