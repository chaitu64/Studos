'use client';

import type { OpportunityFilters } from '@/types/opportunity';

const SECTIONS: { key: keyof OpportunityFilters; label: string; options: { value: string; label?: string }[] }[] = [
  {
    key: 'category',
    label: 'Category',
    options: [
      { value: 'Hackathon', label: 'Hackathons' },
      { value: 'Internship', label: 'Internships' },
      { value: 'Competition', label: 'Competitions' },
      { value: 'Fellowship', label: 'Fellowships' },
      { value: 'Research', label: 'Research' },
      { value: 'Workshop', label: 'Workshops' },
      { value: 'Scholarship', label: 'Scholarships' },
    ],
  },
  {
    key: 'year',
    label: 'Eligibility',
    options: [
      { value: 'First Year' },
      { value: 'Second Year' },
      { value: 'Third Year' },
      { value: 'Final Year' },
    ],
  },
  {
    key: 'branch',
    label: 'Branch',
    options: [
      { value: 'CSE' },
      { value: 'AIML' },
      { value: 'ECE' },
      { value: 'EEE' },
      { value: 'Mechanical' },
      { value: 'Civil' },
    ],
  },
  {
    key: 'mode',
    label: 'Mode',
    options: [{ value: 'Online' }, { value: 'Offline' }, { value: 'Hybrid' }],
  },
  {
    key: 'location',
    label: 'Location',
    options: [
      { value: 'Andhra Pradesh' },
      { value: 'Hyderabad' },
      { value: 'Bangalore' },
      { value: 'Chennai' },
      { value: 'India' },
      { value: 'Remote' },
    ],
  },
  {
    key: 'skill',
    label: 'Skills',
    options: [
      { value: 'AI / ML' },
      { value: 'Python' },
      { value: 'Web Development' },
      { value: 'App Development' },
      { value: 'Cloud' },
      { value: 'Cybersecurity' },
      { value: 'IoT' },
      { value: 'Robotics' },
      { value: 'UI/UX' },
      { value: 'Research' },
    ],
  },
  {
    key: 'deadline',
    label: 'Deadline',
    options: [
      { value: 'Next 3 days' },
      { value: 'Next 7 days' },
      { value: 'Next 30 days' },
    ],
  },
];

function getDefaultValue(key: keyof OpportunityFilters): string {
  const defaults: Partial<OpportunityFilters> = {
    category: 'All',
    branch: 'Any Branch',
    year: 'Any Year',
    mode: 'All',
    location: 'All',
    skill: 'Any',
    deadline: 'All',
    stipend: 'All',
  };
  return defaults[key] ?? '';
}

export function OpportunityFilters({
  filters,
  onFilter,
  onClear,
}: {
  filters: OpportunityFilters;
  onFilter: (key: keyof OpportunityFilters, value: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-fg">Filters</h2>
        <button
          onClick={onClear}
          className="text-xs text-mut underline-offset-2 hover:text-accent hover:underline"
        >
          Clear all filters
        </button>
      </div>

      {SECTIONS.map((section) => {
        const activeVal = filters[section.key] ?? '';
        const isMulti = ['category', 'year', 'branch', 'mode', 'location', 'skill'].includes(section.key);
        const activeValues = isMulti ? activeVal.split(',').filter(Boolean) : [activeVal];

        return (
          <fieldset key={section.key}>
            <legend className="mb-2 text-[11px] font-medium uppercase tracking-wider text-mut">
              {section.label}
            </legend>
            <div className="space-y-1.5">
              {section.options.map((opt) => {
                const val = opt.value;
                const isActive = activeValues.includes(val);
                return (
                  <label
                    key={val}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-[13px] transition-colors ${
                      isActive
                        ? 'bg-accent/10 text-accent'
                        : 'text-mut hover:bg-surface-2 hover:text-fg'
                    }`}
                  >
                    <input
                      type={isMulti ? 'checkbox' : 'radio'}
                      name={section.key}
                      value={val}
                      checked={isActive}
                      onChange={(e) => {
                        if (isMulti) {
                          const current = activeValues;
                          const next = e.target.checked
                            ? [...current, val]
                            : current.filter((v) => v !== val);
                          onFilter(section.key, next.join(','));
                        } else {
                          onFilter(section.key, val);
                        }
                      }}
                      className="h-3.5 w-3.5 accent-[var(--accent)]"
                    />
                    {opt.label ?? val}
                  </label>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}