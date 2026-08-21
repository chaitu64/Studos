'use client';

import { ArrowRight } from 'lucide-react';
import type { Idea } from '@/types/idea';
import { IdeaVisual } from './idea-visual';
import { IdeaStatusBadge } from './idea-status-badge';

/** Compact companion card for the featured section's right column. */
export function IdeaMiniCard({ idea }: { idea: Idea }) {
  return (
    <a
      href={`/ideas/${idea.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-borderline bg-surface transition-colors hover:border-accent/40"
    >
      <IdeaVisual visual={idea.visual} tag={idea.technologies.join(' · ').toUpperCase()} className="h-24" />
      <div className="flex min-w-0 flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-[15px] font-semibold tracking-tight text-fg transition-colors group-hover:text-accent">
            {idea.title}
          </h3>
          <IdeaStatusBadge status={idea.status} />
        </div>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-mut">{idea.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="truncate text-xs text-mut">
            <span className="font-medium text-fg/80">{idea.creator}</span> · {idea.branch} ·{' '}
            {idea.year === '4' ? 'Final Year' : `Year ${idea.year}`}
          </p>
          <span className="inline-flex shrink-0 items-center gap-1 text-[13px] font-medium text-accent">
            View
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </a>
  );
}
