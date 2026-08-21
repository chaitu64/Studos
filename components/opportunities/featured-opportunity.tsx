'use client';

import { ArrowRight, Sparkles, Zap, Briefcase, Trophy, Award, Microscope, Wrench, GraduationCap } from 'lucide-react';
import type { Opportunity } from '@/types/opportunity';

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function CategoryIcon({ category }: { category: string }) {
  const icons: Record<string, React.ReactNode> = {
    Hackathon: <Zap size={14} className="text-accent" />,
    Internship: <Briefcase size={14} className="text-accent" />,
    Competition: <Trophy size={14} className="text-accent" />,
    Fellowship: <Award size={14} className="text-accent" />,
    Research: <Microscope size={14} className="text-accent" />,
    Workshop: <Wrench size={14} className="text-accent" />,
    Scholarship: <GraduationCap size={14} className="text-accent" />,
  };
  return icons[category] ?? null;
}

export function FeaturedOpportunity({ opportunity: o }: { opportunity: Opportunity }) {
  return (
    <a
      href={`/opportunities/${o.id}`}
      className="group relative block overflow-hidden rounded-xl border border-accent/30 border-l-2 bg-surface p-5 md:p-6 transition-colors hover:border-accent/50 hover:bg-surface-2/40"
    >
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="min-w-0 md:max-w-2xl">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-accent">
            <Sparkles size={13} /> Featured
          </span>
          <div className="mt-1.5 flex items-center gap-2">
            <CategoryIcon category={o.category} />
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-fg group-hover:text-accent transition-colors">
              {o.title}
            </h3>
            {o.verified && (
              <span className="inline-flex items-center gap-1 text-[11px] text-mut" title="Verified opportunity">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Verified
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-mut">
            {o.organization} · {o.category} · {o.location}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mut">{o.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-mut">
            <span>Deadline: <span className="text-fg">{fmt(o.deadline)}</span></span>
            {o.prize && <span>Prize: <span className="text-fg">{o.prize}</span></span>}
            {o.stipend && <span>Stipend: <span className="text-fg">{o.stipend}</span></span>}
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 self-end rounded-lg border border-accent/40 px-3 py-2 text-sm font-medium text-accent transition-colors group-hover:bg-accent/10 md:self-center">
          View opportunity <ArrowRight size={15} />
        </span>
      </div>
    </a>
  );
}