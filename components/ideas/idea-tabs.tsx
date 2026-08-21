'use client';

import { Sparkles, Clock, Users, GraduationCap, Coins } from 'lucide-react';

export const IDEA_TABS = [
  { value: 'all', label: 'All ideas', icon: null },
  { value: 'featured', label: 'Featured', icon: <Sparkles size={13} /> },
  { value: 'recent', label: 'Recent', icon: <Clock size={13} /> },
  { value: 'team', label: 'Looking for team', icon: <Users size={13} /> },
  { value: 'mentorship', label: 'Looking for mentorship', icon: <GraduationCap size={13} /> },
  { value: 'funding', label: 'Looking for funding', icon: <Coins size={13} /> },
] as const;

export type IdeaTab = (typeof IDEA_TABS)[number]['value'];

export function IdeaTabs({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: IdeaTab) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Idea discovery views"
      className="flex gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {IDEA_TABS.map((tab) => {
        const active = value === tab.value;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
              active
                ? 'border-accent/60 bg-accent/10 text-accent'
                : 'border-borderline bg-surface text-mut hover:border-accent/40 hover:text-fg'
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
