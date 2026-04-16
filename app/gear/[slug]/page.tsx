import { getAllGearGuides, getGearGuide, getGearByIds } from "@/lib/content";
import GearGrid from "@/components/GearGrid";
import { Metadata } from "next";

export const dynamicParams = false;

export async function generateStaticParams() {
  const guides = getAllGearGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const params = await props.params;
  const guide = getGearGuide(params.slug);
  if (!guide) return { title: "Not Found" };
  
  return {
    title: `${guide.title} | Trail Compass`,
    description: guide.description,
  };
}

export default async function GearGuidePage(props: any) {
  const params = await props.params;
  const guide = getGearGuide(params.slug);

  if (!guide) {
    return <div className="container-section py-16">Guide not found</div>;
  }

  const products = getGearByIds(guide.productIds);

  return (
    <div>
      <section className="relative h-80 bg-cover bg-center">
        <img
          src={guide.hero}
          alt={guide.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end">
          <div className="container-section pb-8">
            <h1 className="text-5xl font-bold text-white">{guide.title}</h1>
          </div>
        </div>
      </section>

      <section className="container-section py-16">
        <div className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: guide.content.replace(/^---[\s\S]*?---/, '').trim() }} />
        </div>

        {products.length > 0 && (
          <div className="mb-16 mt-16">
            <h2 className="text-3xl font-bold text-[#1b3a2d] mb-8">Featured Products</h2>
            <GearGrid products={products} />
          </div>
        )}
      </section>
    </div>
  );
}
