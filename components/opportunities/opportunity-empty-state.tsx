'use client';

import { SearchX } from 'lucide-react';

export function OpportunityEmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-borderline bg-surface px-6 py-16 text-center">
      <SearchX size={28} className="text-mut" aria-hidden />
      <h3 className="text-lg font-semibold text-fg">No opportunities found.</h3>
      <p className="max-w-sm text-sm text-mut">
        Try removing a filter or searching for something else.
      </p>
      <button
        onClick={onClear}
        className="btn-subtle mt-2 text-sm"
      >
        Clear filters
      </button>
    </div>
  );
}