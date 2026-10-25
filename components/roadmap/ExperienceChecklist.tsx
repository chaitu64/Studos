import React, { useState } from 'react';
import { ExperienceGoal } from '@/types/roadmap';
import { ArrowRight, Check, Sparkles, Trophy } from 'lucide-react';

interface ExperienceChecklistProps {
  experiences: ExperienceGoal[];
}

export function ExperienceChecklist({ experiences }: ExperienceChecklistProps) {
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    experiences.forEach((e) => {
      if (e.status === 'completed') initial[e.id] = true;
    });
    return initial;
  });

  const toggleExperience = (id: string) => {
    setCompletedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(completedIds).filter(Boolean).length;

  return (
    <div className="py-8 border-t border-white/[0.08]">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Real-World Proof</span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {completedCount}/{experiences.length} COMPLETED
            </span>
          </div>
          <h3 className="font-extrabold text-xl sm:text-2xl text-white">Experience Checklist</h3>
          <p className="text-xs text-slate-300 mt-0.5">Click any milestone below to toggle completion and celebrate your progress.</p>
        </div>
        <a href="/opportunities" className="cyber-btn-interactive btn-pill-glass text-xs px-4 py-2 self-start md:self-auto flex items-center gap-1.5">
          <span>Explore Opportunities</span>
          <ArrowRight size={13} />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {experiences.map((exp) => {
          const isDone = !!completedIds[exp.id];

          return (
            <div
              key={exp.id}
              onClick={() => toggleExperience(exp.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleExperience(exp.id);
                }
              }}
              className={`cyber-hud-card flex p-5 rounded-2xl border transition-all cursor-pointer select-none ${
                isDone
                  ? 'border-emerald-500/50 bg-emerald-500/[0.08] shadow-[0_0_25px_rgba(16,185,129,0.15)] scale-[1.01]'
                  : 'border-white/[0.08] bg-white/[0.02] hover:border-indigo-500/30 hover:bg-white/[0.04]'
              }`}
            >
              <div className="mr-3.5 mt-0.5 shrink-0">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isDone
                      ? 'bg-emerald-500 border-emerald-400 text-white shadow-md shadow-emerald-500/40 animate-pop-burst scale-110'
                      : 'bg-white/[0.05] border-white/[0.2] text-transparent hover:border-indigo-400'
                  }`}
                >
                  <Check size={14} className="stroke-[3px] text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                  <h4 className={`font-bold text-sm transition-colors ${isDone ? 'text-emerald-200 line-through' : 'text-white'}`}>
                    {exp.title}
                  </h4>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full transition-all ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pop-burst'
                        : 'bg-white/[0.06] text-slate-300 border border-white/[0.08]'
                    }`}
                  >
                    {isDone ? 'Verified ✓' : exp.suggestedYear}
                  </span>
                </div>

                <p className="text-xs leading-relaxed text-slate-300 mb-3">{exp.whyItMatters}</p>

                <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
                  <span className="text-[11px] font-mono text-slate-400">
                    {isDone ? 'Tap to mark incomplete' : 'Tap to mark complete'}
                  </span>
                  {!isDone && (
                    <a
                      href="/opportunities"
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                    >
                      <span>Find {exp.title.toLowerCase().includes('hackathon') ? 'hackathons' : exp.title.toLowerCase().includes('internship') ? 'internships' : 'roles'}</span>
                      <ArrowRight size={12} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
