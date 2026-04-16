import { GearProduct } from "@/lib/content";
import type { GearItem } from "@/data/types";
import GearCard from "./GearCard";

interface Props {
  products: (GearProduct | GearItem)[];
}

export default function GearGrid({ products }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <GearCard key={product.slug} product={product as any} />
      ))}
    </div>
  );
}
