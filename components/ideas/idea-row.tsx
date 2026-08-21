'use client';

import { ArrowRight, Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Idea } from '@/types/idea';
import { IdeaStatusBadge } from './idea-status-badge';
import { formatIdeaDate } from './format-idea-date';
import { toggleSavedIdea, getSavedIdeas } from '@/lib/utils/save-ideas';
import { useToast } from '../ui/toast';

/**
 * Information-dense list row for ideas — used by "Recently submitted" and
 * the discovery results view. Typography and spacing carry the hierarchy;
 * status is the only colored element.
 */
export function IdeaRow({ idea }: { idea: Idea }) {
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
      className="group grid gap-2 px-1 py-4 transition-colors md:grid-cols-[minmax(0,1fr)_190px] md:gap-6"
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h3 className="text-[15px] font-semibold tracking-tight text-fg transition-colors group-hover:text-accent">
            {idea.title}
          </h3>
          <p className="text-xs text-mut">
            {idea.creator} · {idea.branch} ·{' '}
            {idea.year === '4' ? 'Final Year' : `Year ${idea.year}`}
          </p>
        </div>
        <p className="mt-1 line-clamp-1 text-[13px] text-mut">{idea.description}</p>
        <p className="mt-1.5 truncate text-xs text-mut">
          <span className="text-fg/70">{idea.technologies.join(' · ')}</span>
          {idea.supportNeeded.length > 0 && (
            <>
              <span className="mx-2 text-mut/50">|</span>
              Support needed: <span className="text-fg/70">{idea.supportNeeded.join(', ')}</span>
            </>
          )}
        </p>
      </div>

      <div className="flex items-center justify-between gap-3 md:flex-col md:items-end md:justify-center md:gap-1.5">
        <IdeaStatusBadge status={idea.status} />
        <p className="text-xs text-mut">Submitted {formatIdeaDate(idea.createdAt)}</p>
        <div data-stop className="flex items-center gap-1.5">
          <button
            onClick={onSave}
            aria-pressed={saved}
            aria-label={saved ? 'Saved' : 'Save idea'}
            className={`inline-flex h-7 w-7 items-center justify-center rounded-lg border transition-colors ${
              saved
                ? 'border-accent/50 bg-accent/10 text-accent'
                : 'border-borderline text-mut hover:text-fg'
            }`}
          >
            <Bookmark size={12} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <span className="inline-flex items-center gap-1 rounded-lg border border-borderline px-2.5 py-1.5 text-xs font-medium text-fg transition-colors group-hover:border-accent/40 group-hover:text-accent">
            View <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </a>
  );
}
