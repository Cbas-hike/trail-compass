import { getAllHikingGuides } from "@/lib/content";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hiking Guides & Tips",
  description: "Expert hiking guides covering gear, technique, and destinations",
  path: "/guides",
  image: "https://picsum.photos/seed/guides/1200/800",
});

export default function GuidesPage() {
  const guides = getAllHikingGuides();

  return (
    <div>
      <section className="bg-[#1b3a2d] text-white py-12">
        <div className="container-section">
          <h1 className="text-4xl font-bold mb-4">Hiking Guides</h1>
          <p className="text-xl text-[#e8f0eb]">
            Expert guides covering gear, technique, safety and destinations
          </p>
        </div>
      </section>

      <section className="container-section py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guides.map((guide) => (
            <Link href={`/guides/${guide.slug}`} key={guide.slug}>
              <div className="card overflow-hidden cursor-pointer h-full">
                <img
                  src={guide.hero}
                  alt={guide.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex gap-2 flex-wrap mb-3">
                    {guide.tags.map((tag) => (
                      <span key={tag} className="badge-landscape text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold text-[#1b3a2d] mb-2">
                    {guide.title}
                  </h3>
                  <p className="text-[#2c2c2c]">{guide.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
