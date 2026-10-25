'use client';

import { X } from 'lucide-react';
import type { OpportunityFilters } from '@/types/opportunity';

const LABELS: Record<string, string> = {
  category: 'Category',
  year: 'Eligibility',
  branch: 'Branch',
  mode: 'Mode',
  location: 'Location',
  skill: 'Skills',
  deadline: 'Deadline',
  stipend: 'Stipend / Prize',
};

function getDisplayValue(key: string, value: string): string {
  const multiKeys = ['category', 'year', 'branch', 'mode', 'location', 'skill'];
  if (multiKeys.includes(key) && value.includes(',')) {
    return value.split(',').join(' · ');
  }
  return value;
}

export function ActiveFilters({
  filters,
  onRemove,
  onClear,
}: {
  filters: OpportunityFilters;
  onRemove: (key: keyof OpportunityFilters) => void;
  onClear: () => void;
}) {
  const entries = Object.entries(filters).filter(
    ([k, v]) =>
      v &&
      v !== 'All' &&
      v !== 'Any' &&
      v !== 'Any Branch' &&
      v !== 'Any Year' &&
      v !== '' &&
      k !== 'q'
  ) as [keyof OpportunityFilters, string][];

  if (entries.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5 mt-2">
      {entries.map(([key, value]) => (
        <button
          key={key}
          onClick={() => onRemove(key)}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <span>{LABELS[key] ?? key}: {getDisplayValue(key, value)}</span>
          <X size={12} aria-hidden />
          <span className="sr-only">Remove {LABELS[key] ?? key} filter {value}</span>
        </button>
      ))}
      <button
        onClick={onClear}
        className="text-xs text-slate-400 hover:text-white ml-1 font-medium transition-colors cursor-pointer"
      >
        Clear all
      </button>
    </div>
  );
}