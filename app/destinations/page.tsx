import { getAllCountries } from "@/data/index";
import DestinationCard from "@/components/DestinationCard";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hiking Destinations",
  description: "Explore hiking destinations across the Netherlands, Belgium, Germany and Luxembourg",
  path: "/destinations",
  image: "https://picsum.photos/seed/destinations/1200/800",
});

export default function DestinationsPage() {
  const countries = getAllCountries();

  return (
    <div>
      <section className="bg-[#1b3a2d] text-white py-12">
        <div className="container-section">
          <h1 className="text-4xl font-bold mb-4">Hiking Destinations</h1>
          <p className="text-xl text-[#e8f0eb]">
            Discover premium hiking regions across the Benelux
          </p>
        </div>
      </section>

      <section className="container-section py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {countries.map((country) => (
            <DestinationCard
              key={country.slug}
              title={country.name}
              slug={country.slug}
              description={country.description}
              hero={country.hero}
              labels={[]}
              href={`/destinations/${country.slug}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
