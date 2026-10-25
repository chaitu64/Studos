'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight, CheckCircle2, Bookmark, MapPin, GraduationCap, Calendar, Share2, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Opportunity } from '@/types/opportunity';
import { useToast } from '../ui/toast';
import { getSaved, toggleSaved } from '@/lib/utils/save';
import { Card3D } from '../ui/Card3D';

function formatDeadline(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Company Logos matching reference screenshot
function CompanyLogo({ org }: { org: string }) {
  const name = org.toLowerCase();

  if (name.includes('google')) {
    return (
      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center p-2.5 shrink-0 shadow-md">
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
      </div>
    );
  }

  if (name.includes('meta')) {
    return (
      <div className="w-12 h-12 rounded-full bg-[#0081FB] flex items-center justify-center p-2.5 shrink-0 shadow-md">
        <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
          <path d="M12 14.5c-1.38 0-2.57-1.12-2.97-2.5.4-1.38 1.59-2.5 2.97-2.5s2.57 1.12 2.97 2.5c-.4 1.38-1.59 2.5-2.97 2.5zm4.85-6.5C15.34 8 13.79 9.07 12 10.74 10.21 9.07 8.66 8 7.15 8 4.3 8 2 10.29 2 13.14c0 3.36 2.97 6.36 6.8 6.36 1.83 0 3.38-1.07 5.2-2.74 1.82 1.67 3.37 2.74 5.2 2.74 3.83 0 6.8-3 6.8-6.36C26 10.29 23.7 8 20.85 8h-4z" />
        </svg>
      </div>
    );
  }

  if (name.includes('daad')) {
    return (
      <div className="w-12 h-12 rounded-full bg-[#005A9C] flex items-center justify-center shrink-0 shadow-md">
        <span className="text-white font-extrabold text-[13px] tracking-tight font-sans">DAAD</span>
      </div>
    );
  }

  if (name.includes('microsoft')) {
    return (
      <div className="w-12 h-12 rounded-full bg-[#1F2430] flex items-center justify-center p-3 shrink-0 shadow-md border border-white/10">
        <div className="grid grid-cols-2 gap-1 w-6 h-6">
          <div className="bg-[#F25022] rounded-xs" />
          <div className="bg-[#7FBA00] rounded-xs" />
          <div className="bg-[#00A4EF] rounded-xs" />
          <div className="bg-[#FFB900] rounded-xs" />
        </div>
      </div>
    );
  }

  if (name.includes('codechef')) {
    return (
      <div className="w-12 h-12 rounded-full bg-[#E5D7B7] flex items-center justify-center p-2 shrink-0 shadow-md border border-amber-900/20">
        {/* Chef Hat Mascot */}
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-[#5B3926]">
          <path d="M18.06 6.64c-.38-.97-1.2-1.7-2.22-1.96C15.22 3.1 13.73 2 12 2c-1.73 0-3.22 1.1-3.84 2.68-1.02.26-1.84.99-2.22 1.96C5.16 7.42 5 8.35 5 9.35c0 1.98.98 3.73 2.5 4.81V18h9v-3.84c1.52-1.08 2.5-2.83 2.5-4.81 0-1-.16-1.93-.94-2.71zM8.5 20h7v2h-7z" />
        </svg>
      </div>
    );
  }

  // Fallback monogram logo
  return (
    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md border border-white/15">
      {org.slice(0, 2).toUpperCase()}
    </div>
  );
}

// Category Badge Styling: clean, subtle tags without harsh neon card boundaries
function getCategoryBadge(category: string) {
  switch (category) {
    case 'Internship':
      return 'text-pink-300 bg-pink-500/10 border-pink-500/25';
    case 'Hackathon':
      return 'text-indigo-300 bg-indigo-500/10 border-indigo-500/25';
    case 'Scholarship':
      return 'text-amber-300 bg-amber-500/10 border-amber-500/25';
    case 'Competition':
      return 'text-purple-300 bg-purple-500/10 border-purple-500/25';
    case 'Research':
      return 'text-teal-300 bg-teal-500/10 border-teal-500/25';
    case 'Workshop':
      return 'text-sky-300 bg-sky-500/10 border-sky-500/25';
    default:
      return 'text-slate-300 bg-white/5 border-white/10';
  }
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

  function onSave(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    const next = toggleSaved(o.id);
    setSaved(next);
    toast(next ? 'Opportunity saved to your library.' : 'Opportunity removed.');
  }

  return (
    <Card3D maxTilt={5} scale={1.01} glare={true} className="mb-4">
      <article
        onClick={onCardClick}
        role="link"
        tabIndex={0}
        aria-label={o.title}
        className="
          rounded-2xl p-5 bg-[#0B0820]/90 hover:bg-[#100C2B] backdrop-blur-md
          border border-white/10 hover:border-cyan-400/40 transition-all duration-300
          cursor-pointer group relative flex flex-col md:flex-row items-start md:items-center justify-between gap-5
          cyber-hud-card overflow-hidden shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]
        "
      >
        {/* Holographic Laser Sweep Line */}
        <div className="holo-scanner-sweep" />

        {/* ── LEFT SECTION: Logo + Content Details ── */}
        <div className="flex items-start gap-4 flex-1 min-w-0">
          
          {/* Company Logo with 3D Pop-Out */}
          <div className="translate-z-20 transition-transform duration-300 group-hover:scale-105">
            <CompanyLogo org={o.organization} />
          </div>

          {/* Text and Tags */}
          <div className="flex-1 min-w-0">
            
            {/* Header Line: Company • Category Badge */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-white font-semibold text-xs">{o.organization}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider font-medium ${getCategoryBadge(o.category)}`}>
                {o.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
              {o.title}
            </h3>

            {/* Short Description */}
            <p className="text-xs text-slate-400 mt-1 line-clamp-1 leading-relaxed">
              {o.description}
            </p>

            {/* Skills Pills */}
            <div className="flex flex-wrap items-center gap-1.5 mt-3">
              {o.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-300 group-hover:border-cyan-400/20 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Bottom Meta Row with Icons */}
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-slate-400">
              {/* Location / Mode */}
              <span className="inline-flex items-center gap-1">
                <MapPin size={12} className="text-slate-500" />
                <span>{o.location}</span>
              </span>

              {/* Eligibility */}
              <span className="inline-flex items-center gap-1">
                <GraduationCap size={13} className="text-slate-500" />
                <span>{o.eligibility?.[0] || 'Open to All'}</span>
              </span>

              {/* Deadline Date */}
              <span className="inline-flex items-center gap-1">
                <Calendar size={12} className="text-slate-500" />
                <span>{formatDeadline(o.deadline)}</span>
              </span>
            </div>

          </div>
        </div>

        {/* ── RIGHT SECTION: Verified, Bookmark, Deadline & CTA ── */}
        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center w-full md:w-auto gap-4 pt-3 md:pt-0 border-t md:border-t-0 border-white/10 shrink-0">
          
          {/* Top Badges Row */}
          <div className="flex items-center gap-3">
            {o.verified && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <CheckCircle2 size={12} className="text-emerald-400" />
                Verified
              </span>
            )}

            {/* Bookmark Button */}
            <button
              data-stop
              onClick={onSave}
              aria-label="Save opportunity"
              className={`p-1.5 rounded-lg transition-colors ${
                saved ? 'text-pink-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark size={17} fill={saved ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Deadline Information */}
          <div className="text-right hidden md:block">
            <div className="flex items-center gap-1 text-xs font-semibold text-rose-400 justify-end">
              <Calendar size={13} />
              <span>Deadline</span>
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              {formatDeadline(o.deadline)}
            </div>
            <div className={`text-xs font-medium mt-0.5 ${o.daysLeft <= 3 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {o.daysLeft} days left
            </div>
          </div>

          {/* CTA Button: View Details → with 3D Pop-Out */}
          <div className="translate-z-30">
            <button
              type="button"
              onClick={go}
              className="btn-pill-white text-xs font-semibold px-5 py-2 flex items-center gap-1.5 shadow-lg group-hover:scale-105 transition-all"
            >
              <span>View Details</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </div>
      </article>
    </Card3D>
  );
}