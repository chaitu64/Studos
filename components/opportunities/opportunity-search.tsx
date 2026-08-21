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
        size={18}
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mut"
      />
      <input
        type="search"
        role="searchbox"
        aria-label="Search opportunities"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search opportunities, companies, skills..."
        className="w-full rounded-xl border border-borderline bg-surface py-4 pl-11 pr-14 text-[15px] text-fg placeholder:text-mut outline-none transition-colors focus:border-accent"
      />
      <kbd className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-mut/60">
        <Command size={12} aria-hidden /> K
      </kbd>
    </div>
  );
}