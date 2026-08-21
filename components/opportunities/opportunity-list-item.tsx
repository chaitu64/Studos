'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, BadgeCheck, Bookmark, Share2, Zap, Briefcase, Trophy, Award, Microscope, Wrench, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Opportunity } from '@/types/opportunity';
import { OpportunityDeadline } from './opportunity-deadline';
import { useToast } from '../ui/toast';
import { getSaved, toggleSaved } from '@/lib/utils/save';

function formatDeadline(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function SkillTag({ s }: { s: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-borderline bg-surface-2 px-2 py-0.5 text-[11px] font-medium text-fg/80">
      {s}
    </span>
  );
}

function CategoryIcon({ category }: { category: string }) {
  const icons: Record<string, React.ReactNode> = {
    Hackathon: <Zap size={11} className="text-accent" />,
    Internship: <Briefcase size={11} className="text-accent" />,
    Competition: <Trophy size={11} className="text-accent" />,
    Fellowship: <Award size={11} className="text-accent" />,
    Research: <Microscope size={11} className="text-accent" />,
    Workshop: <Wrench size={11} className="text-accent" />,
    Scholarship: <GraduationCap size={11} className="text-accent" />,
  };
  return icons[category] ?? null;
}

function OrgLogo({ initials }: { initials: string }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-borderline bg-surface-2 text-[13px] font-semibold text-accent">
      {initials}
    </div>
  );
}

export function OpportunityListItem({ opportunity: o }: { opportunity: Opportunity }) {
  const router = useRouter();
  const toast = useToast();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(getSaved().includes(o.id));
  }, [o.id]);

  function go() {
    router.push(`/opportunities/${o.id}`);
  }

  function onCardClick(e: React.MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.closest('[data-stop]')) return;
    go();
  }

  function onCardKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') go();
  }

  function onSave(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    const next = toggleSaved(o.id);
    setSaved(next);
    toast(next ? 'Opportunity saved.' : 'Opportunity removed.');
  }

  async function onShare(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    const url = `${window.location.origin}/opportunities/${o.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: o.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast('Link copied.');
      }
    } catch {
      // user cancelled — ignore
    }
  }

  return (
    <article
      onClick={onCardClick}
      onKeyDown={onCardKey}
      role="link"
      tabIndex={0}
      aria-label={o.title}
      className="group relative cursor-pointer rounded-xl border border-borderline bg-surface transition-colors hover:border-accent/40 hover:bg-surface-2/40"
    >
      {/* Mobile: stacked layout */}
      <div className="flex flex-col gap-3 p-4 md:hidden">
        <div className="flex items-start gap-3">
          <OrgLogo initials={o.organizationLogo} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-1.5">
              <CategoryIcon category={o.category} />
              <h3 className="text-[15px] font-semibold leading-snug text-fg group-hover:text-accent transition-colors">
                {o.title}
              </h3>
              {o.verified && (
                <BadgeCheck size={13} className="text-accent" aria-label="Verified" />
              )}
            </div>
            <p className="mt-0.5 text-[13px] text-mut">{o.organization}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-mut">
          <span className="font-medium text-fg/90">{o.category}</span>
          <span aria-hidden>·</span>
          <span>{o.location}</span>
          <span aria-hidden>·</span>
          <span>{o.mode}</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {o.skills.slice(0, 4).map((s) => (
            <SkillTag key={s} s={s} />
          ))}
          {o.skills.length > 4 && (
            <span className="text-[11px] text-mut">+{o.skills.length - 4}</span>
          )}
        </div>

        {(o.prize || o.stipend) && (
          <div className="text-[12.5px] text-mut">
            {o.prize && (
              <span>
                Prize: <span className="text-fg/90">{o.prize}</span>
              </span>
            )}
            {o.prize && o.stipend && <span className="mx-2 text-mut/60">·</span>}
            {o.stipend && <span className="text-fg/90">{o.stipend}</span>}
          </div>
        )}

        <div className="mt-1 flex items-end justify-between border-t border-borderline pt-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-mut">Deadline</p>
            <p className="text-[13px] font-medium text-fg">{formatDeadline(o.deadline)}</p>
            <OpportunityDeadline daysLeft={o.daysLeft} />
          </div>
          <div className="flex items-center gap-1.5">
            <button
              data-stop
              onClick={onSave}
              aria-pressed={saved}
              aria-label={saved ? 'Saved' : 'Save opportunity'}
              className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                saved
                  ? 'border-accent/50 bg-accent/10 text-accent'
                  : 'border-borderline text-mut hover:text-fg'
              }`}
            >
              <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
            </button>
            <a
              data-stop
              href={`/opportunities/${o.id}`}
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 rounded-lg bg-accent px-2.5 py-1.5 text-[12px] font-medium text-white hover:bg-accent-strong"
            >
              View <ArrowRight size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Desktop: horizontal row with 3 main columns - logo, content, actions */}
      <div className="hidden md:grid md:grid-cols-[56px_1fr_220px] md:items-center md:gap-4 md:px-5 md:py-4">
        <div className="flex h-12 w-12 items-center justify-center">
          <OrgLogo initials={o.organizationLogo} />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <CategoryIcon category={o.category} />
            <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-fg group-hover:text-accent transition-colors">
              {o.title}
            </h3>
            {o.verified && (
              <span
                className="inline-flex items-center gap-1 text-[11px] text-mut"
                title="Verified opportunity"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent">
                  <polyline points="20 6 9 17 4 12" />
                </svg> Verified
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[13.5px] text-mut">
            <span className="font-medium text-fg/80">{o.organization}</span>
            <span className="mx-1.5 text-mut/60">·</span>
            <span>{o.category}</span>
            <span className="mx-1.5 text-mut/60">·</span>
            <span>{o.location}</span>
            <span className="mx-1.5 text-mut/60">·</span>
            <span>{o.mode}</span>
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {o.skills.map((s) => (
              <SkillTag key={s} s={s} />
            ))}
            {(o.prize || o.stipend) && (
              <span className="ml-1 text-[12px] text-mut">
                {o.prize && (
                  <>
                    Prize: <span className="text-fg/90">{o.prize}</span>
                  </>
                )}
                {o.prize && o.stipend && <span className="mx-1.5 text-mut/60">·</span>}
                {o.stipend && <span className="text-fg/90">{o.stipend}</span>}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-mut">Deadline</p>
            <p className="text-[14px] font-medium text-fg">{formatDeadline(o.deadline)}</p>
            <div className="mt-0.5 flex justify-end">
              <OpportunityDeadline daysLeft={o.daysLeft} />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              data-stop
              onClick={onShare}
              aria-label="Share opportunity"
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-borderline text-mut transition-colors hover:text-fg hover:border-accent/40"
            >
              <Share2 size={13} />
            </button>
            <button
              data-stop
              onClick={onSave}
              aria-pressed={saved}
              aria-label={saved ? 'Saved' : 'Save opportunity'}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                saved
                  ? 'border-accent/50 bg-accent/10 text-accent'
                  : 'border-borderline text-mut hover:text-fg hover:border-accent/40'
              }`}
            >
              <Bookmark size={12} fill={saved ? 'currentColor' : 'none'} aria-hidden />
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}