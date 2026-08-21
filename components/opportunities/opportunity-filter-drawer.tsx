'use client';

import { X } from 'lucide-react';
import type { OpportunityFilters } from '@/types/opportunity';
import { OpportunityFilters as FiltersPanel } from './opportunity-filters';

export function OpportunityFilterDrawer({
  open,
  onClose,
  filters,
  onFilter,
  onClear,
}: {
  open: boolean;
  onClose: () => void;
  filters: OpportunityFilters;
  onFilter: (key: keyof OpportunityFilters, value: string) => void;
  onClear: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden
      />
      {/* Sheet */}
      <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-borderline bg-bg shadow-xl">
        <div className="flex items-center justify-between border-b border-borderline px-5 py-3.5">
          <h2 className="text-sm font-semibold text-fg">Filters</h2>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="p-1.5 text-mut hover:text-fg transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <FiltersPanel filters={filters} onFilter={onFilter} onClear={onClear} />
        </div>
        <div className="border-t border-borderline p-4">
          <button onClick={onClose} className="btn-primary w-full text-sm">
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}