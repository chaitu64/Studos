'use client';

import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const NAV = [
  { label: 'Opportunities', href: '/opportunities' },
  { label: 'Ideas', href: '/ideas' },
  { label: 'Career', href: '/career' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Resources', href: '/resources' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="sticky top-0 z-40 border-b border-borderline bg-bg/90 backdrop-blur w-full">
      <div className="container-s flex h-16 items-center justify-between gap-4">
        {/* Left: brand */}
        <a href="/" className="flex items-center gap-2 shrink-0">
          <span className="h-6 w-6 rounded-md bg-accent flex items-center justify-center text-white text-sm font-bold">
            S
          </span>
          <span className="text-lg font-semibold tracking-tight">StudOS</span>
        </a>

        {/* Center: nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={
                  active
                    ? 'relative text-sm font-medium text-fg after:absolute after:-bottom-[21px] after:left-0 after:h-[2px] after:w-full after:bg-accent'
                    : 'relative text-sm text-mut hover:text-fg transition-colors'
                }
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: search + login */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/opportunities"
            aria-label="Search"
            className="p-2 text-mut hover:text-fg transition-colors"
          >
            <Search className="h-4.5 w-4.5" size={18} />
          </a>
          <a
            href="#"
            className="hidden sm:inline-flex btn-subtle text-sm"
            onClick={(e) => e.preventDefault()}
          >
            Login
          </a>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-mut hover:text-fg"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <nav className="md:hidden border-t border-borderline bg-bg">
          <div className="container-s py-2">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`block py-2.5 text-sm transition-colors ${
                    active ? 'text-accent font-medium' : 'text-fg hover:text-accent'
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}