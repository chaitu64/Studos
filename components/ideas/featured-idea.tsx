'use client';

import { ArrowRight, Sparkles, UserPlus, Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Idea } from '@/types/idea';
import { IdeaVisual } from './idea-visual';
import { IdeaStatusBadge } from './idea-status-badge';
import { toggleSavedIdea, getSavedIdeas } from '@/lib/utils/save-ideas';
import { useToast } from '../ui/toast';
import { formatIdeaDate } from './format-idea-date';

/**
 * Large editorial card for the featured slot. Whole card navigates to
 * /ideas/[id]; bookmark is isolated with data-stop.
 */
export function FeaturedIdea({ idea }: { idea: Idea }) {
  const toast = useToast();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(getSavedIdeas().includes(idea.id));
  }, [idea.id]);

  function onSave(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    const next = toggleSavedIdea(idea.id);
    setSaved(next);
    toast(next ? 'Idea saved.' : 'Idea removed.');
  }

  return (
    <a
      href={`/ideas/${idea.id}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-borderline bg-surface transition-colors hover:border-accent/40"
    >
      <div className="relative">
        <IdeaVisual visual={idea.visual} tag={`FIG — ${idea.title.toUpperCase()}`} className="h-44 md:h-52" />
        <button
          data-stop
          onClick={onSave}
          aria-pressed={saved}
          aria-label={saved ? 'Saved' : 'Save idea'}
          className={`absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-lg border backdrop-blur transition-colors ${
            saved
              ? 'border-accent/50 bg-accent/20 text-accent'
              : 'border-borderline bg-bg/70 text-mut hover:text-fg'
          }`}
        >
          <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-accent">
            <Sparkles size={12} aria-hidden /> Featured
          </span>
          <IdeaStatusBadge status={idea.status} />
        </div>

        <h3 className="mt-2 text-xl font-semibold tracking-tight text-fg transition-colors group-hover:text-accent md:text-2xl">
          {idea.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-mut">{idea.description}</p>

        <p className="mt-3 text-[13px] text-mut">
          <span className="font-medium text-fg/90">{idea.creator}</span>
          <span className="mx-1.5 text-mut/60">·</span>
          {idea.branch}
          <span className="mx-1.5 text-mut/60">·</span>
          {idea.year === '4' ? 'Final Year' : `${idea.year}${['st', 'nd', 'rd', 'th'][Number(idea.year) - 1]} Year`}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {idea.technologies.map((t) => (
            <span
              key={t}
              className="rounded-md border border-borderline bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-fg/80"
            >
              {t}
            </span>
          ))}
        </div>

        {idea.lookingFor.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]">
            <span className="text-mut">Looking for:</span>
            {idea.lookingFor.map((role) => (
              <span key={role} className="inline-flex items-center gap-1 font-medium text-info">
                <UserPlus size={12} aria-hidden />
                {role}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-xs text-mut">Submitted {formatIdeaDate(idea.createdAt)}</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            View idea
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </a>
  );
}
