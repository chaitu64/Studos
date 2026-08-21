'use client';

import { ArrowDownWideNarrow } from 'lucide-react';
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
    <label className="flex items-center gap-2">
      <ArrowDownWideNarrow size={15} className="text-mut" aria-hidden />
      <span className="hidden text-xs text-mut sm:inline">Sort by</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        aria-label="Sort opportunities"
        className="rounded-lg border border-borderline bg-surface px-2.5 py-1.5 text-[13px] text-fg outline-none transition-colors focus:border-accent"
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </label>
  );
}