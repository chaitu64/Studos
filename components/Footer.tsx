"use client";

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 border-t border-white/10 bg-[#0B0F1A]/90 backdrop-blur-md text-slate-400 text-xs">
      <div className="container-s py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand & Development Credit */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <Link href="/" className="inline-block">
              <BrandLogo size="sm" />
            </Link>
            <span className="hidden sm:inline text-white/20">|</span>
            <p className="text-xs font-medium text-slate-300">
              <span className="text-white font-bold">StudOS</span> — Developed by the <span className="text-[#E11D48] font-bold">IIC Web Team</span>
            </p>
          </div>

          {/* Clean Essential Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs font-medium">
            <Link href="/opportunities" className="hover:text-white transition-colors">
              Opportunities
            </Link>
            <Link href="/ideas" className="hover:text-white transition-colors">
              Idea Hub
            </Link>
            <Link href="/career" className="hover:text-white transition-colors">
              Career
            </Link>
            <Link href="/roadmap" className="hover:text-white transition-colors">
              Roadmap
            </Link>
            <Link href="/resources" className="hover:text-white transition-colors">
              Resources
            </Link>
          </nav>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="mt-6 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {currentYear} StudOS. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
