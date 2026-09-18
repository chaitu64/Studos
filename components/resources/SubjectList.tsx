'use client';

import React from 'react';
import Link from 'next/link';
import { Subject } from '@/types/resource';
import { BookOpen, FileText, ChevronRight, Sparkles, FolderOpen, ArrowUpRight } from 'lucide-react';
import { Card3D } from '@/components/ui/Card3D';

interface SubjectListProps {
  subjects: Subject[];
  year: string;
  branch: string;
  semester: string;
  searchQuery?: string;
}

export function SubjectList({ subjects, year, branch, semester, searchQuery = '' }: SubjectListProps) {
  return (
    <div className="py-8">
      {/* Section Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Curated Subject Vaults
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
              {subjects.length} Subjects
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Displaying semester curriculum for <span className="text-purple-300 font-semibold">{branch}</span> •{' '}
            <span className="text-cyan-300 font-semibold">{year}</span> •{' '}
            <span className="text-pink-300 font-semibold">{semester}</span>
          </p>
        </div>

        {searchQuery && (
          <div className="text-xs text-slate-400 bg-white/[0.04] px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
            Filtered by: &ldquo;<span className="text-white font-medium">{searchQuery}</span>&rdquo;
          </div>
        )}
      </div>

      {subjects.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mx-auto mb-3">
            <BookOpen size={28} />
          </div>
          <h3 className="font-bold text-lg text-white">No subjects found</h3>
          <p className="mt-1.5 text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            {searchQuery
              ? `No subjects match "${searchQuery}" in ${branch} ${year} ${semester}. Try clearing the search query.`
              : `Materials for ${branch} ${year} ${semester} are currently being curated by student leads.`}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjects.map((subject) => {
            return (
              <Card3D key={subject.id} maxTilt={6} scale={1.02} glare={true} className="cyber-hud-card h-full">
                <div className="holo-scanner-sweep" />
                <Link
                  href={`/resources/${subject.id}`}
                  className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#0d1127]/80 hover:bg-[#121736]/90 border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.15)] h-full preserve-3d"
                >
                  {/* Glowing corner gradient */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 group-hover:bg-purple-500/15 rounded-full blur-2xl pointer-events-none transition-all" />

                  <div>
                    {/* Top Metadata */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span className="px-3 py-1 rounded-lg text-xs font-black tracking-wider bg-purple-500/15 text-purple-300 border border-purple-500/30 translate-z-20">
                        {subject.code}
                      </span>
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10">
                        <FileText size={13} className="text-purple-400" />
                        <span>{subject.resourceCount} files</span>
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-extrabold text-base sm:text-lg text-white group-hover:text-purple-300 transition-colors mb-2 line-clamp-1">
                      {subject.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-5">
                      {subject.description}
                    </p>

                    {/* Resource Availability Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/5">
                        📄 Notes
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/5">
                        📝 PYQs
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/5">
                        🔬 Lab Manual
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/5">
                        💡 Viva Prep
                      </span>
                    </div>
                  </div>

                  {/* Card Footer Button */}
                  <div className="pt-3.5 border-t border-white/10 flex items-center justify-between text-xs font-bold text-purple-400 group-hover:text-purple-300 translate-z-20">
                    <span className="flex items-center gap-1">
                      <FolderOpen size={14} /> Open Subject Vault
                    </span>
                    <div className="w-6 h-6 rounded-full bg-purple-500/10 group-hover:bg-purple-500/20 flex items-center justify-center transition-colors">
                      <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Card3D>
            );
          })}
        </div>
      )}
    </div>
  );
}
