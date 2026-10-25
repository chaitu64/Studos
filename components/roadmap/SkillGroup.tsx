import React from 'react';
import { SkillRecommendation } from '@/types/roadmap';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

interface SkillGroupProps {
  skills: SkillRecommendation[];
}

export function SkillGroup({ skills }: SkillGroupProps) {
  const core = skills.filter(s => s.category === 'core');
  const important = skills.filter(s => s.category === 'important');
  const next = skills.filter(s => s.category === 'next');

  const SkillItem = ({ skill }: { skill: SkillRecommendation }) => (
    <div className="glass-card p-5 rounded-2xl border border-white/[0.08] hover:border-indigo-500/40 flex flex-col justify-between group h-full">
      <div>
        <div className="flex justify-between items-start gap-3 mb-2.5">
          <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">{skill.name}</h4>
          <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${skill.status === 'completed'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : skill.status === 'learning'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-white/[0.05] text-slate-400 border border-white/[0.08]'
            }`}>
            {skill.status.replace('_', ' ')}
          </span>
        </div>

        <p className="text-xs leading-relaxed text-slate-300 mb-4 line-clamp-2">
          {skill.whyItMatters}
        </p>
      </div>

      <div>
        <div className="flex items-center justify-between text-[10px] font-semibold tracking-wider uppercase mb-1.5 text-slate-400">
          <span>Mastery</span>
          <span className="text-indigo-400 font-bold">{skill.currentLevel === 'none' ? 'New' : skill.currentLevel} → {skill.targetLevel}</span>
        </div>

        <div className="flex gap-1 h-1.5 mb-4">
          <div className={`flex-1 rounded-l-full ${skill.currentLevel !== 'none' ? 'bg-indigo-500' : 'bg-white/[0.08]'}`} />
          <div className={`flex-1 ${['intermediate', 'advanced'].includes(skill.currentLevel) ? 'bg-indigo-500' : 'bg-white/[0.08]'}`} />
          <div className={`flex-1 rounded-r-full ${skill.currentLevel === 'advanced' ? 'bg-indigo-500' : 'bg-white/[0.08]'}`} />
        </div>

        <button className="btn-subtle w-full justify-center text-xs py-2 font-semibold">
          <span>{skill.status === 'completed' ? 'Review Skill' : skill.status === 'learning' ? 'Continue Learning' : 'Start Learning'}</span>
          <ArrowRight size={13} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="py-8">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">Competencies</span>
        <h3 className="font-extrabold text-xl sm:text-2xl text-white">Skills to Develop</h3>
        <p className="text-xs text-slate-300 mt-0.5">High-leverage engineering skills mapped to industry standards.</p>
      </div>

      <div className="space-y-8">
        {core.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-3 border-b border-white/[0.08] pb-2">Core Foundation</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {core.map(s => <SkillItem key={s.id} skill={s} />)}
            </div>
          </div>
        )}

        {important.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3 border-b border-white/[0.08] pb-2">Important Next</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {important.map(s => <SkillItem key={s.id} skill={s} />)}
            </div>
          </div>
        )}

        {next.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3 border-b border-white/[0.08] pb-2">Advanced Specialization</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {next.map(s => <SkillItem key={s.id} skill={s} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
