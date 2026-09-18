"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ArrowRight,
  Sun,
  Moon,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useTheme } from './ThemeProvider';

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Opportunities', href: '/opportunities' },
    { name: 'Idea Hub', href: '/ideas' },
    { name: 'Career Paths', href: '/career' },
    { name: 'Roadmap', href: '/roadmap' },
    { name: 'Resources', href: '/resources' },
    { name: 'Classrooms', href: '/classrooms' },
  ];

  return (
    <header className="sticky top-3.5 z-50 px-4 sm:px-6 md:px-8 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">

        {/* ── 1. SEPARATED LOGO POD ── */}
        <div className="pointer-events-auto shrink-0">
          <Link
            href="/"
            aria-label="StudOS Home"
            className="group flex items-center gap-3 px-4 py-2.5 rounded-2xl backdrop-blur-xl border shadow-xl shadow-black/20 transition-all duration-200"
            style={{
              background: 'var(--bg-nav)',
              borderColor: 'var(--border-nav)',
            }}
          >
            <BrandLogo size="sm" />
          </Link>
        </div>

        {/* ── 2. FLOATING NAVIGATION ISLAND ── */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex pointer-events-auto items-center gap-1 px-2.5 py-1.5 rounded-full backdrop-blur-xl border shadow-xl shadow-black/20"
          style={{
            background: 'var(--bg-nav)',
            borderColor: 'var(--border-nav)',
          }}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-colors"
                style={{
                  color: isActive ? 'var(--fg-nav-active)' : 'var(--fg-nav)',
                  background: isActive ? 'var(--surface-glass)' : 'transparent',
                  border: isActive ? '1px solid var(--border-glass)' : '1px solid transparent',
                  fontWeight: isActive ? 600 : 500,
                }}
              >
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* ── 3. ACTION POD (Right) ── */}
        <div
          className="hidden sm:flex pointer-events-auto items-center gap-2.5 px-3 py-1.5 rounded-2xl backdrop-blur-xl border shadow-xl shadow-black/20 shrink-0"
          style={{
            background: 'var(--bg-nav)',
            borderColor: 'var(--border-nav)',
          }}
        >
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: 'var(--surface-glass)',
              border: '1px solid var(--border-glass)',
              color: 'var(--fg-nav)',
            }}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <Link
            href="/career"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <span>Launch Track</span>
            <ArrowRight size={13} />
          </Link>
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold"
            style={{
              background: 'var(--surface-glass)',
              border: '1px solid var(--border-glass)',
              color: 'var(--fg-muted)',
            }}
          >
            SN
          </div>
        </div>

        {/* ── 4. MOBILE TRIGGER ── */}
        <div className="lg:hidden pointer-events-auto flex items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2.5 rounded-2xl backdrop-blur-xl border transition-colors"
            style={{
              background: 'var(--bg-nav)',
              borderColor: 'var(--border-nav)',
              color: 'var(--fg-muted)',
            }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-2xl backdrop-blur-xl border transition-colors"
            style={{
              background: 'var(--bg-nav)',
              borderColor: 'var(--border-nav)',
              color: 'var(--fg)',
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* ── 5. MOBILE DRAWER ── */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden pointer-events-auto max-w-md mx-auto mt-3 rounded-2xl border p-4 shadow-2xl shadow-black/40 animate-scale-in backdrop-blur-2xl"
          style={{
            background: 'var(--bg-nav)',
            borderColor: 'var(--border-nav)',
          }}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-colors"
                  style={{
                    background: isActive ? 'var(--surface-glass)' : 'transparent',
                    color: isActive ? 'var(--fg-nav-active)' : 'var(--fg-nav)',
                    border: isActive ? '1px solid var(--border-glass)' : '1px solid transparent',
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <div
              className="pt-3 border-t mt-2"
              style={{ borderColor: 'var(--border-glass)' }}
            >
              <Link
                href="/career"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <span>Launch Track</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
