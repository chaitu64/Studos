import { BrandLogo } from './BrandLogo';

export function Navbar() {
  return (
    <nav className="border-b bg-[#0B0F1A]/90 backdrop-blur-md border-white/10 py-3">
      <div className="container mx-auto max-w-7xl flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <BrandLogo size="sm" />
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Home
          </a>
          <a href="/opportunities" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Opportunities
          </a>
          <a href="/ideas" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Ideas
          </a>
          <a href="/career" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Career
          </a>
          <a href="/roadmap" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Roadmap
          </a>
          <a href="/resources" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
            Resources
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button className="rounded-md p-2 text-slate-300 hover:text-white transition-colors" aria-label="Open main menu">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}