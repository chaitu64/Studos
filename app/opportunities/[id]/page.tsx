// @ts-nocheck
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Share2,
  BadgeCheck,
  MapPin,
  Globe,
  CalendarClock,
  Trophy,
  Wallet,
} from 'lucide-react';
import type { Opportunity } from '../../../types/opportunity';
import { api } from '../../../lib/api/api-client';
import { OpportunityDeadline } from '../../../components/opportunities/opportunity-deadline';
import { OpportunitySaveButton } from '../../../components/opportunities/opportunity-save-button';
import { useToast } from '../../../components/ui/toast';

function fmt(iso: string) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function CategoryIcon({ category }: { category: string }) {
  const map: Record<string, typeof Globe> = {
    Hackathon: Globe,
    Internship: MapPin,
    Competition: Trophy,
    Fellowship: Wallet,
    Research: CalendarClock,
    Workshop: Check,
    Scholarship: Check,
  };
  const Icon = map[category] ?? Check;
  return <Icon size={16} className="text-accent" aria-hidden />;
}

export default function OpportunityDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const toast = useToast();
  const [opp, setOpp] = useState<Opportunity | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    if (!id) return;
    setState('loading');
    const controller = new AbortController();
    api
      .getOpportunity(id as string, controller.signal)
      .then((o) => {
        setOpp(o);
        setState('ready');
      })
      .catch((err) => {
        if ((err as Error).name !== 'AbortError') setState('error');
      });
    return () => controller.abort();
  }, [id]);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: opp?.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast('Link copied.');
      }
    } catch {
      // user cancelled — ignore
    }
  }

  if (state === 'loading') {
    return (
      <div className="container-s py-8" role="status" aria-label="Loading opportunity">
        <div className="h-5 w-40 animate-pulse rounded bg-surface-2" />
        <div className="mt-6 h-9 w-3/4 max-w-xl animate-pulse rounded bg-surface-2" />
        <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-surface-2" />
        <div className="mt-8 h-64 animate-pulse rounded-xl bg-surface-2" />
      </div>
    );
  }

  if (state === 'error' || !opp) {
    return (
      <div className="container-s py-16 text-center">
        <h1 className="text-2xl font-semibold text-fg">Something went wrong.</h1>
        <p className="mt-2 text-sm text-mut">We could not load this opportunity right now.</p>
        <button onClick={() => router.push('/opportunities')} className="btn-primary mt-5 text-sm">
          Back to opportunities
        </button>
      </div>
    );
  }

  return (
    <div className="container-s py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[13px] text-mut">
        <a href="/opportunities" className="hover:text-accent transition-colors">
          Opportunities
        </a>
        <ChevronRight size={13} aria-hidden />
        <span className="text-fg">{opp.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        {/* Main column */}
        <div className="min-w-0">
          <div className="mb-6 flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-borderline bg-surface-2 text-lg font-semibold text-accent">
              {opp.organizationLogo}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  {opp.title}
                </h1>
                {opp.verified && (
                  <span className="inline-flex items-center gap-1 text-xs text-mut">
                    <BadgeCheck size={14} className="text-accent" /> Verified
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-mut">{opp.organization}</p>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-mut">
                <span className="inline-flex items-center gap-1.5">
                  <CategoryIcon category={opp.category} /> {opp.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin size={13} /> {opp.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Globe size={13} /> {opp.mode}
                </span>
              </p>
            </div>
          </div>

          <p className="text-[15px] leading-relaxed text-mut">{opp.description}</p>

          {/* Skills */}
          <div className="mt-6">
            <h2 className="mb-2 text-sm font-semibold text-fg">Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {opp.skills.map((s) => (
                <span key={s} className="rounded-md border border-borderline bg-surface-2 px-2.5 py-1 text-[13px] text-fg">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="mt-6">
            <h2 className="mb-2 text-sm font-semibold text-fg">Eligibility</h2>
            <div className="flex flex-wrap gap-1.5">
              {opp.eligibility.map((v) => (
                <span key={v} className="rounded-md border border-borderline bg-surface-2 px-2.5 py-1 text-[13px] text-mut">
                  {v}
                </span>
              ))}
              {opp.branches.map((b) => (
                <span key={b} className="rounded-md border border-borderline bg-surface-2 px-2.5 py-1 text-[13px] text-mut">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline (static structure) */}
          <div className="mt-8">
            <h2 className="mb-3 text-sm font-semibold text-fg">Timeline</h2>
            <ol className="space-y-4 border-l border-borderline pl-5">
              {[
                { label: 'Applications open', date: fmt(opp.createdAt) },
                { label: 'Application deadline', date: fmt(opp.deadline) },
                { label: 'Selection announced', date: 'Mid September 2026' },
                { label: 'Program begins', date: 'October 2026' },
              ].map((step) => (
                <li key={step.label} className="relative">
                  <span className="absolute -left-[23px] top-1 h-2 w-2 rounded-full bg-accent" />
                  <p className="text-sm font-medium text-fg">{step.label}</p>
                  <p className="text-[13px] text-mut">{step.date}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Side column */}
        <aside className="space-y-4">
          <div className="rounded-xl border border-borderline bg-surface p-5">
            <p className="text-[11px] uppercase tracking-wider text-mut">Deadline</p>
            <p className="mt-1 text-lg font-semibold text-fg">{fmt(opp.deadline)}</p>
            <OpportunityDeadline daysLeft={opp.daysLeft} />

            {(opp.prize || opp.stipend) && (
              <>
                <div className="mt-4 border-t border-borderline pt-4">
                  {opp.prize && (
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-mut">Prize</p>
                      <p className="mt-0.5 text-sm font-medium text-fg">{opp.prize}</p>
                    </div>
                  )}
                  {opp.stipend && (
                    <div className="mt-3">
                      <p className="text-[11px] uppercase tracking-wider text-mut">Stipend</p>
                      <p className="mt-0.5 text-sm font-medium text-fg">{opp.stipend}</p>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="mt-5 flex flex-col gap-2">
              <a
                href="#"
                className="btn-primary w-full text-center text-sm"
                onClick={(e) => e.preventDefault()}
              >
                Apply now
              </a>
              <div className="grid grid-cols-2 gap-2">
                <OpportunitySaveButton id={opp.id} label="Save" />
                <button
                  onClick={share}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-borderline px-2.5 py-1.5 text-xs font-medium text-mut transition-colors hover:text-fg hover:border-accent/40"
                >
                  <Share2 size={13} /> Share
                </button>
              </div>
            </div>
          </div>

          <a
            href="/opportunities"
            className="inline-flex items-center gap-1.5 text-sm text-mut hover:text-accent transition-colors"
          >
            <ArrowLeft size={14} /> All opportunities
          </a>
        </aside>
      </div>
    </div>
  );
}