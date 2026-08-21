'use client';

import { ArrowRight, Bookmark, UserPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Idea } from '@/types/idea';
import { toggleSavedIdea, getSavedIdeas } from '@/lib/utils/save-ideas';
import { useToast } from '../ui/toast';

function CapacityBar({ size, target }: { size: number; target: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden>
      {Array.from({ length: Math.min(target, 6) }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-3.5 rounded-full ${i < size ? 'bg-accent' : 'bg-borderline'}`}
        />
      ))}
      {target > 6 && <span className="text-[10px] text-mut">+{target - 6}</span>}
    </span>
  );
}

/** Compact collaboration card for the "looking for teammates" rail. */
export function TeamSeekingCard({ idea }: { idea: Idea }) {
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
    <article className="group relative flex w-[280px] shrink-0 snap-start flex-col rounded-xl border border-borderline bg-surface p-4 transition-colors hover:border-accent/40 md:w-[300px]">
      <div className="flex items-start justify-between gap-2">
        <a href={`/ideas/${idea.id}`} className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold tracking-tight text-fg transition-colors group-hover:text-accent">
            {idea.title}
          </h3>
        </a>
        <button
          data-stop
          onClick={onSave}
          aria-pressed={saved}
          aria-label={saved ? 'Saved' : 'Save idea'}
          className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border transition-colors ${
            saved
              ? 'border-accent/50 bg-accent/10 text-accent'
              : 'border-borderline text-mut hover:text-fg'
          }`}
        >
          <Bookmark size={12} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-mut">{idea.description}</p>

      <div className="mt-3">
        <p className="text-[11px] uppercase tracking-wider text-mut">Looking for</p>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
          {idea.lookingFor.map((role) => (
            <span key={role} className="inline-flex items-center gap-1 text-xs font-medium text-info">
              <UserPlus size={11} aria-hidden />
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4 mt-3 flex items-center gap-2 text-xs text-mut">
        <CapacityBar size={idea.teamSize} target={idea.teamTarget} />
        <span>
          <span className="font-medium text-fg/90">
            {idea.teamSize} / {idea.teamTarget}
          </span>{' '}
          on team
        </span>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-borderline pt-3">
        <p className="truncate text-[11px] text-mut">{idea.technologies.join(' · ')}</p>
        <a
          href={`/ideas/${idea.id}`}
          className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-accent/40 px-2.5 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10"
        >
          View idea <ArrowRight size={12} />
        </a>
      </div>
    </article>
  );
}
