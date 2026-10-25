'use client';

import { SearchX } from 'lucide-react';

export function OpportunityEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-6 py-14 text-center">
      <SearchX size={28} className="text-slate-400" aria-hidden />
      <h3 className="text-base font-bold text-slate-800">No opportunities found</h3>
      <p className="max-w-sm text-xs text-slate-500">
        Try removing a filter or searching for a different keyword.
      </p>
      <button
        onClick={onClear}
        className="btn-secondary mt-2 text-xs px-3.5 py-1.5"
      >
        Clear all filters
      </button>
    </div>
  );
}