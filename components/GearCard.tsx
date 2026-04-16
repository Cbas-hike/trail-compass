import { GearProduct } from "@/lib/content";
import type { GearItem } from "@/data/types";
import AffiliateLink from "./AffiliateLink";

interface Props {
  product: GearProduct | GearItem;
}

export default function GearCard({ product }: Props) {
  const isGearItem = "name" in product;
  const title = isGearItem ? product.name : product.title;
  const priceDisplay = isGearItem ? product.priceDisplay : `€${product.price}`;
  const image = product.image;
  const category = product.category;
  const summary = product.summary;
  const affiliateLinks = product.affiliateLinks;

  return (
    <div className="card overflow-hidden">
      <div className="relative h-64 bg-gray-200">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="text-xs text-[#6b7280] uppercase tracking-wide mb-2">
          {category}
        </div>
        <h3 className="text-lg font-bold text-[#1b3a2d] mb-2">{title}</h3>
        <p className="text-sm text-[#2c2c2c] mb-4 leading-relaxed">
          {summary}
        </p>
        <div className="mb-4">
          <div className="text-2xl font-bold text-[#e8923a]">{priceDisplay}</div>
        </div>
        <div className="space-y-2">
          {affiliateLinks.map((link) => (
            <AffiliateLink
              key={link.url}
              href={link.url}
              retailer={link.retailer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
