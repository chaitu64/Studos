'use client';

import { Zap, Briefcase, Trophy, Award, Microscope, Wrench, GraduationCap } from 'lucide-react';

const TABS: { value: string; label: string; icon: React.ReactNode }[] = [
  { value: 'All', label: 'All', icon: null },
  { value: 'Hackathon', label: 'Hackathons', icon: <Zap size={13} /> },
  { value: 'Internship', label: 'Internships', icon: <Briefcase size={13} /> },
  { value: 'Competition', label: 'Competitions', icon: <Trophy size={13} /> },
  { value: 'Fellowship', label: 'Fellowships', icon: <Award size={13} /> },
  { value: 'Research', label: 'Research', icon: <Microscope size={13} /> },
  { value: 'Workshop', label: 'Workshops', icon: <Wrench size={13} /> },
  { value: 'Scholarship', label: 'Scholarships', icon: <GraduationCap size={13} /> },
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
      className="flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {TABS.map((tab) => {
        const active = value === tab.value;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(active ? 'All' : tab.value)}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors flex items-center gap-1.5 ${
              active
                ? 'border-accent/60 bg-accent/10 text-accent'
                : 'border-borderline bg-surface text-mut hover:text-fg hover:border-accent/40'
            }`}
          >
            {tab.icon && <span className={active ? 'text-accent' : 'text-mut'}>{tab.icon}</span>}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}