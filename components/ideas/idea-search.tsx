'use client';

import { Search } from 'lucide-react';

export function IdeaSearch({
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
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-mut"
      />
      <input
        type="search"
        role="searchbox"
        aria-label="Search ideas"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search ideas, technologies, problems..."
        className="w-full rounded-xl border border-borderline bg-surface py-3.5 pl-11 pr-4 text-[15px] text-fg placeholder:text-mut outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}
