import { getAllGearGuides, getAllGearProducts } from "@/lib/content";
import GearGrid from "@/components/GearGrid";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hiking Gear & Equipment",
  description: "Essential hiking gear guides and product recommendations for the Benelux",
  path: "/gear",
  image: "https://picsum.photos/seed/gear/1200/800",
});

export default function GearPage() {
  const guides = getAllGearGuides();
  const products = getAllGearProducts();

  return (
    <div>
      <section className="bg-[#1b3a2d] text-white py-12">
        <div className="container-section">
          <h1 className="text-4xl font-bold mb-4">Hiking Gear</h1>
          <p className="text-xl text-[#e8f0eb]">
            Expert guides and product recommendations for Benelux hiking
          </p>
        </div>
      </section>

      <section className="container-section py-16">
        <h2 className="text-3xl font-bold text-[#1b3a2d] mb-8">Gear Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {guides.map((guide) => (
            <Link href={`/gear/${guide.slug}`} key={guide.slug}>
              <div className="card overflow-hidden cursor-pointer">
                <img
                  src={guide.hero}
                  alt={guide.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#1b3a2d] mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-[#2c2c2c]">{guide.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-[#1b3a2d] mb-8">Recommended Products</h2>
        <GearGrid products={products} />
      </section>
    </div>
  );
}
