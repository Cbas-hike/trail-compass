import Link from "next/link";

interface Props {
  title: string;
  slug: string;
  description: string;
  hero: string;
  labels?: string[];
  href: string;
}

export default function DestinationCard({
  title,
  description,
  hero,
  labels,
  href,
}: Props) {
  return (
    <Link href={href}>
      <div className="card overflow-hidden h-full cursor-pointer">
        <div className="relative h-48 bg-gray-200">
          <img
            src={hero}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-[#1b3a2d] mb-2">{title}</h3>
          <p className="text-[#2c2c2c] mb-4 line-clamp-2">{description}</p>
          {labels && labels.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {labels.map((label) => (
                <span
                  key={label}
                  className="badge-landscape"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
