interface Props {
  href: string;
  retailer: string;
}

export default function AffiliateLink({ href, retailer }: Props) {
  return (
    <a
      href={href}
      rel="sponsored nofollow"
      target="_blank"
      className="inline-block px-4 py-2 bg-[#e8923a] text-white font-bold rounded hover:bg-[#d47e2a] transition-colors text-sm"
    >
      Buy at {retailer}
    </a>
  );
}
