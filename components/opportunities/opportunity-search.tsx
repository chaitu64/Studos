'use client';

import { Search, Command } from 'lucide-react';

export function OpportunitySearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <Search
        size={17}
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="search"
        role="searchbox"
        aria-label="Search opportunities"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search internships, hackathons, scholarships..."
        className="w-full rounded-full border border-white/15 bg-white/5 py-3 pl-11 pr-12 text-sm text-white placeholder:text-slate-400 backdrop-blur-md outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
      />
      <kbd className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-mono text-slate-400 border border-white/10 bg-white/5 rounded px-1.5 py-0.5">
        <Command size={10} aria-hidden /> K
      </kbd>
    </div>
  );
}