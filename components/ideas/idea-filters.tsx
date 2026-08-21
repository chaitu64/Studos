'use client';

import { ChevronDown, RotateCcw } from 'lucide-react';
import {
  IDEA_BRANCH_OPTIONS,
  IDEA_STATUS_LIST,
  IDEA_YEAR_OPTIONS,
  SUPPORT_LIST,
} from '@/types/idea';

export interface IdeaFilterState {
  status: string;
  tech: string;
  branch: string;
  year: string;
  support: string;
}

export const EMPTY_IDEA_FILTERS: IdeaFilterState = {
  status: 'All',
  tech: 'All',
  branch: 'Any Branch',
  year: 'Any Year',
  support: 'All',
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  const active = value !== options[0]?.value;
  return (
    <label className="relative inline-flex shrink-0 items-center">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none rounded-lg border bg-surface py-2 pl-3 pr-8 text-[13px] font-medium outline-none transition-colors focus:border-accent ${
          active
            ? 'border-accent/50 text-accent'
            : 'border-borderline text-mut hover:text-fg'
        }`}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-surface text-fg">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={13}
        aria-hidden
        className="pointer-events-none absolute right-2.5 text-mut"
      />
    </label>
  );
}

export function IdeaFilters({
  filters,
  techOptions,
  onChange,
  onClear,
}: {
  filters: IdeaFilterState;
  techOptions: string[];
  onChange: (patch: Partial<IdeaFilterState>) => void;
  onClear: () => void;
}) {
  const hasActive =
    filters.status !== EMPTY_IDEA_FILTERS.status ||
    filters.tech !== EMPTY_IDEA_FILTERS.tech ||
    filters.branch !== EMPTY_IDEA_FILTERS.branch ||
    filters.year !== EMPTY_IDEA_FILTERS.year ||
    filters.support !== EMPTY_IDEA_FILTERS.support;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterSelect
        label="Filter by status"
        value={filters.status}
        onChange={(v) => onChange({ status: v })}
        options={[
          { value: 'All', label: 'Any status' },
          ...IDEA_STATUS_LIST.map((s) => ({ value: s, label: s })),
        ]}
      />
      <FilterSelect
        label="Filter by technology"
        value={filters.tech}
        onChange={(v) => onChange({ tech: v })}
        options={[
          { value: 'All', label: 'Any technology' },
          ...techOptions.map((t) => ({ value: t, label: t })),
        ]}
      />
      <FilterSelect
        label="Filter by branch"
        value={filters.branch}
        onChange={(v) => onChange({ branch: v })}
        options={[
          { value: 'Any Branch', label: 'Any branch' },
          ...IDEA_BRANCH_OPTIONS.map((b) => ({ value: b, label: b })),
        ]}
      />
      <FilterSelect
        label="Filter by year"
        value={filters.year}
        onChange={(v) => onChange({ year: v })}
        options={[
          { value: 'Any Year', label: 'Any year' },
          ...IDEA_YEAR_OPTIONS.map((y) => ({ value: y.value, label: y.label })),
        ]}
      />
      <FilterSelect
        label="Filter by support needed"
        value={filters.support}
        onChange={(v) => onChange({ support: v })}
        options={[
          { value: 'All', label: 'Any support' },
          ...SUPPORT_LIST.map((s) => ({ value: s, label: s })),
        ]}
      />
      {hasActive && (
        <button
          onClick={onClear}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-[13px] text-mut transition-colors hover:text-fg"
        >
          <RotateCcw size={12} aria-hidden />
          Clear
        </button>
      )}
    </div>
  );
}
