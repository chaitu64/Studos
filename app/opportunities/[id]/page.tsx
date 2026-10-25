// @ts-nocheck
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Share2,
  BadgeCheck,
  MapPin,
  Globe,
  CalendarClock,
  Trophy,
  Wallet,
  Sparkles,
  ExternalLink,
  Check
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
  return <Icon size={14} className="text-pink-400" aria-hidden />;
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

  const [applying, setApplying] = useState(false);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: opp?.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast('Link copied to clipboard.');
      }
    } catch {
      // user cancelled
    }
  }

  const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    setApplying(true);
    toast('Handshaking with external verification gateway...');
    setTimeout(() => {
      setApplying(false);
      window.open(opp?.applyUrl || 'https://unstop.com', '_blank');
    }, 1200);
  };

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-transparent text-white py-12">
        <div className="container-s" role="status" aria-label="Loading opportunity">
          <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
          <div className="mt-6 h-8 w-3/4 max-w-xl animate-pulse rounded bg-white/10" />
          <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-white/10" />
          <div className="mt-8 h-64 animate-pulse rounded-2xl bg-white/5 border border-white/10" />
        </div>
      </div>
    );
  }

  if (state === 'error' || !opp) {
    return (
      <div className="min-h-screen bg-transparent text-white flex items-center justify-center p-4">
        <div className="cyber-hud-card card-cosmic p-8 text-center max-w-md animate-scale-in">
          <h1 className="text-lg font-bold text-white">Opportunity not found</h1>
          <p className="mt-1 text-xs text-slate-400">We could not load this opportunity right now.</p>
          <button onClick={() => router.push('/opportunities')} className="cyber-btn-interactive btn-pill-white mt-4 text-xs inline-flex items-center gap-1.5">
            <ArrowLeft size={14} /> Back to opportunities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white pb-20 relative overflow-hidden">

      {/* Background Ambient Glows */}
      <div className="cosmic-glow-pink -top-24 -left-24 opacity-25 pointer-events-none" />
      <div className="cosmic-glow-blue top-1/2 -right-24 opacity-25 pointer-events-none" />

      <div className="container-s py-10 relative z-10 animate-fade-in">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-slate-400">
          <a href="/opportunities" className="hover:text-white transition-colors">
            Opportunities
          </a>
          <ChevronRight size={13} aria-hidden />
          <span className="text-pink-300 font-semibold truncate max-w-sm">{opp.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Main column */}
          <div className="min-w-0">
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-pink-500/40 bg-pink-500/15 text-xl font-extrabold text-pink-300 shadow-lg shadow-pink-500/20">
                {opp.organizationLogo || opp.organization.charAt(0)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl sm:text-3xl font-black text-white">
                    {opp.title}
                  </h1>
                  {opp.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30 shadow-sm shadow-emerald-500/20">
                      <BadgeCheck size={13} /> Verified
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm font-semibold text-cyan-400">{opp.organization}</p>
                <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <CategoryIcon category={opp.category} /> {opp.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={13} className="text-slate-400" /> {opp.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Globe size={13} className="text-slate-400" /> {opp.mode}
                  </span>
                </p>
              </div>
            </div>

            <div className="cyber-hud-card card-cosmic p-6 sm:p-8 animate-scale-in">
              <h2 className="heading-gold text-xs uppercase tracking-wider mb-2">Overview</h2>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-200">{opp.description}</p>

              {/* Skills */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h2 className="mb-3 heading-gold text-xs uppercase tracking-wider">Required & Preferred Skills</h2>
                <div className="flex flex-wrap gap-1.5">
                  {opp.skills.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 hover:border-pink-400/40 hover:scale-105 transition-all">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Eligibility */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h2 className="mb-3 heading-gold text-xs uppercase tracking-wider">Eligibility Criteria</h2>
                <div className="flex flex-wrap gap-1.5">
                  {opp.eligibility.map((v) => (
                    <span key={v} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                      {v}
                    </span>
                  ))}
                  {opp.branches.map((b) => (
                    <span key={b} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300">
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <h2 className="mb-4 heading-gold text-xs uppercase tracking-wider">Timeline & Next Steps</h2>
                <ol className="space-y-4 border-l-2 border-pink-500/30 pl-4">
                  {[
                    { label: 'Applications open', date: fmt(opp.createdAt) },
                    { label: 'Application deadline', date: fmt(opp.deadline) },
                    { label: 'Shortlisting & Reviews', date: 'Within 7 days of closing' },
                    { label: 'Program begins', date: 'Upcoming cycle' },
                  ].map((step) => (
                    <li key={step.label} className="relative group">
                      <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-pink-500 shadow-md shadow-pink-500/50 group-hover:scale-125 transition-transform" />
                      <p className="text-xs font-bold text-white">{step.label}</p>
                      <p className="text-[11px] text-slate-400">{step.date}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Side column */}
          <aside className="space-y-4">
            <div className="cyber-hud-card card-cosmic p-6 animate-scale-in">
              <p className="heading-gold text-[11px] uppercase tracking-wider">Application Deadline</p>
              <p className="mt-1 text-lg font-bold text-white">{fmt(opp.deadline)}</p>
              <div className="mt-2">
                <OpportunityDeadline daysLeft={opp.daysLeft} />
              </div>

              {(opp.prize || opp.stipend) && (
                <div className="mt-5 border-t border-white/10 pt-4 space-y-2">
                  {opp.prize && (
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Prize Pool</p>
                      <p className="text-sm font-bold text-cyan-400">{opp.prize}</p>
                    </div>
                  )}
                  {opp.stipend && (
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Stipend</p>
                      <p className="text-sm font-bold text-emerald-300">{opp.stipend}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 flex flex-col gap-2.5">
                {applying ? (
                  <button
                    disabled
                    className="w-full justify-center text-center text-xs py-2.5 rounded-full bg-pink-600/40 border border-pink-400 text-white font-bold flex items-center gap-2 laser-progress-bar shadow-lg shadow-pink-500/30"
                  >
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Launching Verification Portal...</span>
                  </button>
                ) : (
                  <a
                    href="#"
                    className="cyber-btn-interactive btn-pill-white w-full justify-center text-center text-xs py-2.5 flex items-center gap-2 shadow-lg shadow-pink-500/20"
                    onClick={handleApply}
                  >
                    <span>Apply now</span>
                    <ExternalLink size={13} />
                  </a>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <OpportunitySaveButton id={opp.id} label="Save" />
                  <button
                    onClick={share}
                    className="cyber-btn-interactive inline-flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-white/10"
                  >
                    <Share2 size={13} /> Share
                  </button>
                </div>
              </div>
            </div>

            <a
              href="/opportunities"
              className="cyber-btn-interactive inline-flex items-center gap-1.5 text-xs font-semibold text-pink-400 hover:text-pink-300"
            >
              <ArrowLeft size={13} /> Back to all opportunities
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}