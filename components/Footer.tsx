import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a2e25] text-white mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg
                className="w-6 h-6 text-[#e8923a]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
              <span className="font-bold text-lg">Trail Compass</span>
            </div>
            <p className="text-[#b0bec5] text-sm">
              Find your perfect hike across the Benelux
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#e8923a]">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/destinations" className="text-[#b0bec5] hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/hike-finder" className="text-[#b0bec5] hover:text-white transition-colors">
                  Hike Finder
                </Link>
              </li>
              <li>
                <Link href="/gear" className="text-[#b0bec5] hover:text-white transition-colors">
                  Gear
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-[#b0bec5] hover:text-white transition-colors">
                  Guides
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#e8923a]">Information</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-[#b0bec5] hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-[#b0bec5] hover:text-white transition-colors">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#e8923a]">Countries</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/destinations/netherlands" className="text-[#b0bec5] hover:text-white transition-colors">
                  Netherlands
                </Link>
              </li>
              <li>
                <Link href="/destinations/belgium" className="text-[#b0bec5] hover:text-white transition-colors">
                  Belgium
                </Link>
              </li>
              <li>
                <Link href="/destinations/germany" className="text-[#b0bec5] hover:text-white transition-colors">
                  Germany
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#37474f] pt-8">
          <p className="text-center text-[#b0bec5] text-sm">
            © {new Date().getFullYear()} Trail Compass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
