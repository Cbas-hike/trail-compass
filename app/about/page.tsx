import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Trail Compass",
  description: "About Trail Compass - premium hiking guides for the Benelux",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div>
      <section className="bg-[#1b3a2d] text-white py-12">
        <div className="container-section">
          <h1 className="text-4xl font-bold">About Trail Compass</h1>
        </div>
      </section>

      <section className="container-section py-16">
        <div className="prose max-w-3xl mx-auto">
          <h2>Our Mission</h2>
          <p>
            Trail Compass exists to inspire and guide hikers across the Benelux region. We believe that
            exceptional hiking doesn't require alpine peaks or extreme weather—the Netherlands, Belgium,
            and Germany offer some of Europe's most rewarding and accessible hiking experiences.
          </p>

          <h2>What We Offer</h2>
          <p>
            Trail Compass provides:
          </p>
          <ul>
            <li>Detailed route guides with difficulty ratings, elevation profiles, and seasonal insights</li>
            <li>Expert gear recommendations from brands we trust and use personally</li>
            <li>Beginner-friendly hiking guides covering safety, technique, and preparation</li>
            <li>An interactive hike finder to match your preferences with perfect routes</li>
            <li>Regional destination guides highlighting landscape, culture, and highlights</li>
          </ul>

          <h2>Our Values</h2>
          <p>
            We believe hiking should be accessible to everyone. We write for beginners and experienced
            hikers alike. We prioritize safety, environmental responsibility, and authentic recommendations.
          </p>

          <h2>Affiliate Disclosure</h2>
          <p>
            Trail Compass is an affiliate site. When you purchase through our links, we earn a small commission
            at no cost to you. This allows us to create and maintain quality content. We only recommend products
            we believe in, and we never recommend inferior products to earn more commission.
          </p>
        </div>
      </section>
    </div>
  );
}
