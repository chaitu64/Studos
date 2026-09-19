import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Compass } from 'lucide-react';

export function RoadmapHeader() {
  return (
    <div className="py-12 md:py-16 border-b border-white/[0.08] relative overflow-hidden">
      <div className="container-s">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-300 mb-4">
            <Sparkles size={13} />
            <span>Structured Academic & Career Path</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Build Your Foundation Before You Launch Your Career.
          </h1>
          <p className="text-sm md:text-base text-slate-300 mb-8 max-w-2xl leading-relaxed">
            Know exactly what to learn, which projects to build, and key milestones to accomplish across your 4-year journey.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/career"
              className="btn-primary py-3 px-6 text-xs font-semibold shadow-glow-sm flex items-center gap-2"
            >
              <span>Customize My Path</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/opportunities"
              className="btn-subtle py-3 px-5 text-xs font-medium flex items-center gap-2"
            >
              <Compass size={14} className="text-indigo-400" />
              <span>Explore Opportunities</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
