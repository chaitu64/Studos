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
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
        onClick={onClose}
        aria-hidden
      />
      {/* Sheet */}
      <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-white/10 bg-[#0A071E] shadow-2xl text-white">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
          <h2 className="text-sm font-bold text-white">Filters</h2>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="p-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4">
          <FiltersPanel filters={filters} onFilter={onFilter} onClear={onClear} />
        </div>
        <div className="border-t border-white/10 p-4">
          <button onClick={onClose} className="btn-pill-white w-full text-xs py-2.5 font-semibold cursor-pointer">
            Show results
          </button>
        </div>
      </div>
    </div>
  );
}