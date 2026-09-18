'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Calendar, BadgeCheck, ShieldAlert } from 'lucide-react';
import type { Opportunity } from '@/types/opportunity';
import { Card3D } from '../ui/Card3D';

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function FeaturedOpportunity({ opportunity: o }: { opportunity: Opportunity }) {
  return (
    <div className="mb-8">
      <Card3D maxTilt={5} scale={1.01} glare={true}>
        <Link
          href={`/opportunities/${o.id}`}
          className="card-cosmic p-6 sm:p-7 block group border-pink-500/30 hover:border-pink-500/60 transition-all cyber-hud-card relative overflow-hidden shadow-2xl hover:shadow-[0_0_35px_rgba(236,72,153,0.2)]"
        >
          {/* Holographic Laser Sweep */}
          <div className="holo-scanner-sweep" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center gap-1 shadow-[0_0_12px_rgba(236,72,153,0.3)]">
                <Sparkles size={11} className="animate-spin-slow" /> Featured {o.category}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {o.organization} · {o.location} · {o.mode}
              </span>
            </div>

            {o.verified && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1 self-start sm:self-auto shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <BadgeCheck size={12} /> Verified
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="font-extrabold text-lg sm:text-xl text-white group-hover:text-pink-400 transition-colors mb-2 translate-z-20">
                {o.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2 mb-4">
                {o.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {o.skills.map((s) => (
                  <span key={s} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 text-slate-300 border border-white/10 group-hover:border-pink-500/20 transition-colors">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-white/10 shrink-0">
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">Deadline</span>
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1 mt-0.5">
                  <Calendar size={12} className="text-amber-400" /> {fmt(o.deadline)}
                </span>
                {(o.prize || o.stipend) && (
                  <span className="text-xs font-bold text-cyan-400 block mt-1">
                    {o.prize || o.stipend}
                  </span>
                )}
              </div>

              <div className="translate-z-30">
                <span className="btn-pill-white text-xs py-2 px-4 shadow-lg group-hover:scale-105 transition-all">
                  <span>View Details</span>
                  <ArrowRight size={12} />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </Card3D>
    </div>
  );
}

export default FeaturedOpportunity;