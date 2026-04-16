import { getAllHikingGuides, getHikingGuide } from "@/lib/content";
import { Metadata } from "next";

export const dynamicParams = false;

export async function generateStaticParams() {
  const guides = getAllHikingGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: any): Promise<Metadata> {
  const params = await props.params;
  const guide = getHikingGuide(params.slug);
  if (!guide) return { title: "Not Found" };
  
  return {
    title: `${guide.title} | Trail Compass`,
    description: guide.description,
  };
}

export default async function GuidePage(props: any) {
  const params = await props.params;
  const guide = getHikingGuide(params.slug);

  if (!guide) {
    return <div className="container-section py-16">Guide not found</div>;
  }

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
      </section>
    </div>
  );
}
