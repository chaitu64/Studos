import React from 'react';
import { Search, Sparkles, BookOpen, Layers, X } from 'lucide-react';

interface ResourceHeaderProps {
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  onTagClick?: (tag: string) => void;
  selectedTag?: string;
}

export function ResourceHeader({
  searchQuery = '',
  onSearchChange,
  onTagClick,
  selectedTag = ''
}: ResourceHeaderProps) {
  const popularTags = [
    'All Material',
    'Previous Papers',
    'Handwritten Notes',
    'Lab Manuals',
    'Important Viva Qs',
    'Syllabus'
  ];

  return (
    <div className="relative border-b border-white/10 bg-gradient-to-b from-[#0e122b]/80 via-[#0a0d20]/90 to-[#070A1E] backdrop-blur-2xl py-12 md:py-16 overflow-hidden">
      {/* Background ambient cosmic glow */}
      <div className="absolute -top-24 left-1/4 w-[500px] h-[350px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[300px] bg-cyan-500/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="container-s relative z-10">
        <div className="max-w-3xl">
          {/* Cosmic tag badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 text-xs font-semibold text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <Sparkles size={13} className="text-purple-400 animate-pulse" />
            <span>ACADEMIC RESOURCE VAULT • 100% VERIFIED</span>
          </div>

          <h1 className="mb-4 text-3xl font-black tracking-tight text-white md:text-5xl leading-tight">
            Semester Success,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Simplified.
            </span>
          </h1>

          <p className="mb-8 max-w-2xl text-sm md:text-base leading-relaxed text-slate-300">
            Instant access to professor-verified lecture notes, solved previous year question papers, syllabus breakdowns, and lab manuals organized by branch & semester.
          </p>

          {/* Interactive Search Bar */}
          <div className="relative max-w-2xl group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-400 group-focus-within:text-purple-400 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Search subjects, topics, notes (e.g. Data Structures, OS, Calculus)..."
              className="w-full pl-11 pr-10 py-3.5 text-sm rounded-2xl bg-white/[0.05] border border-white/10 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 backdrop-blur-xl transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange?.('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Popular Tag Filters */}
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 mr-1 flex items-center gap-1">
              <BookOpen size={12} /> Filter:
            </span>
            {popularTags.map((tag) => {
              const isActive = (selectedTag === tag) || (selectedTag === '' && tag === 'All Material');
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onTagClick?.(tag === 'All Material' ? '' : tag)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${isActive
                      ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.35)] border border-purple-400/40'
                      : 'bg-white/[0.03] border border-white/10 text-slate-300 hover:border-purple-500/30 hover:text-white hover:bg-white/[0.06]'
                    }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
