import { getAllCountries, getCountryBySlug, getRegionsByCountry } from "@/data/index";
import DestinationCard from "@/components/DestinationCard";
import { Metadata } from "next";

export const dynamicParams = false;

export async function generateStaticParams() {
  const countries = getAllCountries();
  return countries.map((c) => ({ country: c.slug }));
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const params = await props.params;
  const country = getCountryBySlug(params.country);
  if (!country) return { title: "Not Found" };
  return {
    title: `Hiking in ${country.name} | Trail Compass`,
    description: country.description,
  };
}

export default async function CountryPage(props: any) {
  const params = await props.params;
  const country = getCountryBySlug(params.country);
  const regions = getRegionsByCountry(params.country);

  if (!country) {
    return <div className="container-section py-16">Country not found</div>;
  }

  return (
    <div>
      <section className="relative h-80 bg-cover bg-center">
        <img
          src={country.hero}
          alt={country.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container-section pb-8">
            <h1 className="text-5xl font-bold text-white mb-2">{country.name}</h1>
            <p className="text-xl text-[#e8f0eb]">{country.description}</p>
          </div>
        </div>
      </section>

      <section className="container-section py-16">
        <div className="mb-12">
          <p className="text-lg text-[#2c2c2c] leading-relaxed">
            {country.slug === "netherlands" && "The Netherlands is Europe's most underrated hiking destination. While many know it for its cycling, the Dutch landscape offers incredible diversity: vast heathlands in the Veluwe, rolling hills in Limburg, dramatic dunes along the coast, and serene forest paths connecting historic villages."}
            {country.slug === "belgium" && "Belgium punches far above its weight in hiking quality. The Belgian Ardennes rivals the Alps in drama, while the High Fens offer a unique bogland ecosystem found nowhere else in Western Europe."}
            {country.slug === "germany" && "Germany's hiking infrastructure is world-class. From the Black Forest's dense fir forests to the Eifel's volcanic crater lakes and the Sauerland's highland plateaus, Germany offers exceptional hiking variety."}
            {country.slug === "luxembourg" && "Luxembourg may be small but the Mullerthal — Luxembourg's 'Little Switzerland' — offers some of the most distinctive hiking in Western Europe: deep sandstone canyons, mossy ravines and rock pillars under a thick beech canopy. The Mullerthal Trail is rated by many German hiking magazines as the best trail in Europe outside the Alps."}
          </p>
        </div>

        <h2 className="text-3xl font-bold text-[#1b3a2d] mb-8">
          Regions & Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {regions.map((region) => (
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
      </section>
    </div>
  );
}
