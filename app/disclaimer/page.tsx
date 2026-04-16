import { buildMetadata } from "@/lib/seo";
import AffiliateBanner from "@/components/AffiliateBanner";

export const metadata = buildMetadata({
  title: "Affiliate Disclosure",
  description: "Affiliate disclosure and legal information for Trail Compass",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <div>
      <section className="bg-[#1b3a2d] text-white py-12">
        <div className="container-section">
          <h1 className="text-4xl font-bold">Affiliate Disclosure</h1>
        </div>
      </section>

      <section className="container-section py-16">
        <div className="prose max-w-3xl mx-auto">
          <AffiliateBanner />

          <h2>About Affiliate Links</h2>
          <p>
            Trail Compass is a participant in affiliate programs with Bergfreunde, Bol.com, OutdoorXL,
            and other outdoor retailers. When you purchase a product through our affiliate links, we
            receive a commission at no additional cost to you.
          </p>

          <h2>Our Commitment</h2>
          <ul>
            <li>We only recommend products we personally use and trust</li>
            <li>We never recommend products based on commission rates alone</li>
            <li>We provide honest, unbiased reviews and comparisons</li>
            <li>We disclose affiliate relationships clearly and transparently</li>
            <li>Affiliate revenue helps us maintain and improve our content</li>
          </ul>

          <h2>How We Choose Products</h2>
          <p>
            Our gear recommendations are based on:
          </p>
          <ul>
            <li>Personal testing and experience</li>
            <li>Quality and durability standards</li>
            <li>Value for money</li>
            <li>Relevance to Benelux hiking conditions</li>
            <li>Customer reviews and feedback</li>
          </ul>

          <h2>Disclaimer</h2>
          <p>
            While we strive for accuracy, hiking routes can change. Weather, maintenance, and access
            policies may affect trail conditions. Always check locally before hiking, and follow
            official trail guidance when available.
          </p>

          <p>
            Trail Compass and its authors are not responsible for accidents, injuries, or property damage
            resulting from following our guides. Hiking carries inherent risks. Always hike responsibly,
            follow safety guidelines, and consider your experience level.
          </p>

          <h2>Contact</h2>
          <p>
            Have questions about our affiliate relationships or content? Contact us and we'll respond
            within 48 hours.
          </p>
        </div>
      </section>
    </div>
  );
}
