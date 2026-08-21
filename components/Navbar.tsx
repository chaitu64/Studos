export function Navbar() {
  return (
    <nav className="border-b bg-gray-50 dark:bg-gray-900/80 border-gray-200/50 py-2.5">
      <div className="container mx-auto max-w-7xl flex items-center justify-between px-4">
        {/* Logo - prominent, typographic */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tighter bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            StudOS
          </span>
        </div>

        {/* Desktop Nav Links with underline accent */}
        <div className="hidden md:flex items-center gap-8">
          <a href="/opportunities" className="relative text-sm font-medium hover:text-indigo-600 transition-colors">
            Opportunities
          </a>
          <a href="/ideas" className="relative text-sm font-medium hover:text-indigo-600 transition-colors">
            Ideas
          </a>
          <a href="/career" className="relative text-sm font-medium hover:text-indigo-600 transition-colors">
            Career
          </a>
          <a href="/roadmap" className="relative text-sm font-medium hover:text-indigo-600 transition-colors">
            Roadmap
          </a>
          <a href="/campus" className="relative text-sm font-medium hover:text-indigo-600 transition-colors">
            Campus
          </a>
          <a href="/resources" className="relative text-sm font-medium hover:text-indigo-600 transition-colors">
            Resources
          </a>
        </div>

        {/* Mobile Burger Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <button className="burger-btn rounded-md p-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors" aria-label="Open main menu">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 12l2-2m0 0l7-7m7 7l2-2m-7 0l2 2" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}