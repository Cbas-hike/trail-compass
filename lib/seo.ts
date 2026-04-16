import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://trailcompass.eu";

interface MetadataParams {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

export function buildMetadata(params: MetadataParams): Metadata {
  const fullTitle = `${params.title} | Trail Compass`;
  const url = params.path ? `${BASE_URL}${params.path}` : BASE_URL;

  return {
    title: fullTitle,
    description: params.description,
    metadataBase: new URL(BASE_URL),
    openGraph: {
      title: fullTitle,
      description: params.description,
      url: url,
      siteName: "Trail Compass",
      images: params.image ? [{ url: params.image }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: params.description,
      images: params.image ? [params.image] : [],
    },
  };
}
