'use client';

import { ArrowRight, Users, GraduationCap, Coins } from 'lucide-react';
import type { IdeaTab } from './idea-tabs';

const PATHWAYS: {
  tab: IdeaTab;
  icon: React.ReactNode;
  kicker: string;
  question: string;
  action: string;
}[] = [
  {
    tab: 'team',
    icon: <Users size={17} />,
    kicker: 'Team',
    question: 'Need people with specific skills?',
    action: 'Find collaborators',
  },
  {
    tab: 'mentorship',
    icon: <GraduationCap size={17} />,
    kicker: 'Mentorship',
    question: 'Need someone experienced to guide the project?',
    action: 'Request mentorship',
  },
  {
    tab: 'funding',
    icon: <Coins size={17} />,
    kicker: 'Funding',
    question: 'Need resources to build the prototype?',
    action: 'Explore funding support',
  },
];

/**
 * Three support pathways in the Idea Hub workflow. On desktop a dashed
 * connector line runs behind the pathway icons, tying them to the pipeline.
 */
export function SupportPathways({ onSelect }: { onSelect: (tab: IdeaTab) => void }) {
  return (
    <div className="relative">
      <span
        aria-hidden
        className="absolute left-10 right-10 top-10 hidden border-t border-dashed border-borderline lg:block"
      />
      <div className="grid gap-4 md:grid-cols-3">
        {PATHWAYS.map((p) => (
          <div key={p.kicker} className="relative rounded-xl border border-borderline bg-surface p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-surface-2 text-accent">
              {p.icon}
            </span>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-mut">
              {p.kicker}
            </p>
            <p className="mt-1.5 text-[15px] font-medium leading-snug text-fg">{p.question}</p>
            <button
              onClick={() => onSelect(p.tab)}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
            >
              {p.action}
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
