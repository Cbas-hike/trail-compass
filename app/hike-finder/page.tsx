import { getAllRoutes, getAllRegions } from "@/data/index";
import HikeFinder from "@/components/HikeFinder";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hike Finder - Find Your Perfect Route",
  description: "Filter hiking routes by difficulty, distance, landscape, season and more. Smart scoring algorithm matches routes to your preferences.",
  path: "/hike-finder",
  image: "https://picsum.photos/seed/hike-finder/1200/800",
});

export default function HikeFinderPage() {
  const routes = getAllRoutes();
  const regions = getAllRegions();

  return (
    <div>
      <section className="bg-[#1b3a2d] text-white py-12">
        <div className="container-section">
          <h1 className="text-4xl font-bold mb-4">Hike Finder</h1>
          <p className="text-xl text-[#e8f0eb]">
            Filter routes by difficulty, distance, landscape, season and more. Our smart algorithm finds your perfect hike.
          </p>
        </div>
      </section>

      <section className="container-section py-16">
        <HikeFinder routes={routes} regions={regions} />
      </section>
    </div>
  );
}
