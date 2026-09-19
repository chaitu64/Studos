'use client';

import { Zap, Briefcase, Trophy, Award, Microscope, Wrench, GraduationCap } from 'lucide-react';

const TABS: { value: string; label: string; icon: React.ReactNode }[] = [
  { value: 'All',         label: 'All',          icon: null },
  { value: 'Internship',  label: 'Internships',  icon: <Briefcase size={13} /> },
  { value: 'Hackathon',   label: 'Hackathons',   icon: <Zap size={13} /> },
  { value: 'Competition', label: 'Competitions', icon: <Trophy size={13} /> },
  { value: 'Scholarship', label: 'Scholarships', icon: <GraduationCap size={13} /> },
  { value: 'Research',    label: 'Research',     icon: <Microscope size={13} /> },
  { value: 'Workshop',    label: 'Workshops',    icon: <Wrench size={13} /> },
  { value: 'Fellowship',  label: 'Fellowships',  icon: <Award size={13} /> },
];

export function OpportunityCategoryTabs({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Opportunity categories"
      className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {TABS.map((tab) => {
        const active = value === tab.value;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(active ? 'All' : tab.value)}
            className={`shrink-0 flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              active
                ? 'border-white/25 bg-white/15 text-white'
                : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/20 hover:text-white hover:bg-white/[0.07]'
            }`}
          >
            {tab.icon && (
              <span className={active ? 'text-white' : 'text-slate-400'}>
                {tab.icon}
              </span>
            )}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}