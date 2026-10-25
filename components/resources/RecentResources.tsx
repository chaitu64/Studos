import React from 'react';
import Link from 'next/link';
import { Resource } from '@/types/resource';
import { FileText, Link2, ArrowRight, Clock, Sparkles, Download, Eye } from 'lucide-react';

interface RecentResourcesProps {
  resources: Resource[];
}

export function RecentResources({ resources }: RecentResourcesProps) {
  if (!resources || resources.length === 0) return null;

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'Notes':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'Previous Papers':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'Practical/Viva':
      case 'Lab Manuals':
        return 'bg-pink-500/15 text-pink-300 border-pink-500/30';
      case 'Important Questions':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      default:
        return 'bg-slate-500/15 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="py-8 border-t border-white/10">
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Sparkles size={16} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
              Recently Uploaded & Verified
            </h2>
            <p className="text-xs text-slate-400">
              Fresh notes, PYQ solutions, and lab manuals submitted by top students
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0d1127]/70 backdrop-blur-xl overflow-hidden divide-y divide-white/5 shadow-xl">
        {resources.map((resource) => (
          <Link
            key={resource.id}
            href={`/resources/${resource.subjectId}`}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 hover:bg-white/[0.04] transition-all group gap-3.5"
          >
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:border-purple-500/40 transition-all">
                {resource.format === 'PDF' ? <FileText size={18} /> : <Link2 size={18} />}
              </div>
              <div>
                <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors line-clamp-1">
                  {resource.title}
                </h4>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${getTypeBadgeStyle(resource.type)}`}>
                    {resource.type}
                  </span>
                  <span>•</span>
                  <span className="text-slate-300 font-medium">
                    {resource.branch}
                  </span>
                  <span>•</span>
                  <span>{resource.year}</span>
                  {resource.views && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Eye size={11} className="text-slate-500" /> {resource.views} views
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 text-xs shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Clock size={12} className="text-slate-500" />
                {new Date(resource.updatedAt).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric'
                })}
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 group-hover:text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20 group-hover:border-purple-500/40 transition-all">
                <span>View File</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
