import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Trail Compass | Find Your Perfect Hike",
  description:
    "Discover premium hiking routes across the Netherlands, Belgium and Germany. Detailed guides, gear recommendations and expert insights.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://trailcompass.eu"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#f7f5f0]">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
