'use client';

import { ChevronDown } from 'lucide-react';
import type { SortKey } from '@/types/opportunity';

const SORTS: { value: SortKey; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'deadline', label: 'Deadline soon' },
  { value: 'newest', label: 'Newest' },
  { value: 'updated', label: 'Recently updated' },
];

export function OpportunitySort({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-400 font-medium">Sort:</span>
      <div className="relative inline-block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          aria-label="Sort opportunities"
          className="appearance-none rounded-xl border border-white/10 bg-[#0E0B1F] py-2 pl-3 pr-8 text-xs font-semibold text-white outline-none focus:border-purple-500 transition-all cursor-pointer"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value} className="bg-[#0E0B1F] text-slate-200">
              {s.label}
            </option>
          ))}
        </select>
        <ChevronDown size={13} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>
    </div>
  );
}