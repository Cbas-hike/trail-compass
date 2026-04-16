import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <svg
            className="w-8 h-8 text-[#1b3a2d]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
          </svg>
          <span className="font-bold text-[#1b3a2d] text-lg">Trail Compass</span>
        </Link>

        <div className="hidden md:flex gap-6">
          <Link
            href="/destinations"
            className="text-[#2c2c2c] hover:text-[#e8923a] transition-colors font-medium"
          >
            Destinations
          </Link>
          <Link
            href="/hike-finder"
            className="text-[#2c2c2c] hover:text-[#e8923a] transition-colors font-medium"
          >
            Hike Finder
          </Link>
          <Link
            href="/gear"
            className="text-[#2c2c2c] hover:text-[#e8923a] transition-colors font-medium"
          >
            Gear
          </Link>
          <Link
            href="/guides"
            className="text-[#2c2c2c] hover:text-[#e8923a] transition-colors font-medium"
          >
            Guides
          </Link>
        </div>

        <div className="md:hidden">
          <button className="text-[#1b3a2d] p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
