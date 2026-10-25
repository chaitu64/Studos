import React from 'react';
import { ResumeRequirement } from '@/types/roadmap';
import { Check } from 'lucide-react';

interface ResumeReadinessProps {
  resume: ResumeRequirement[];
}

export function ResumeReadiness({ resume }: ResumeReadinessProps) {
  const completed = resume.filter(r => r.status === 'completed').length;
  const total = resume.length;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="py-8 border-t border-white/[0.08]">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">Career Preparedness</span>
        <h3 className="font-extrabold text-xl sm:text-2xl text-white">Resume Readiness Checklist</h3>
        <p className="text-xs text-slate-300 mt-0.5">What a competitive student profile for your target career looks like.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        <div className="flex-1 glass-panel p-6 sm:p-7 rounded-2xl border border-white/[0.08]">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-4">Target Profile Requirements</span>

          <ul className="space-y-3">
            {resume.map((item) => (
              <li key={item.id} className="flex items-start gap-3 text-xs font-medium">
                <span
                  className={`mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center border transition-colors ${item.status === 'completed'
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-white/[0.05] border-white/[0.15] text-transparent'
                    }`}
                >
                  <Check size={10} className="stroke-[3px] text-white" />
                </span>
                <span className={`${item.status === 'completed' ? 'text-white font-semibold' : 'text-slate-300'}`}>
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:w-72 shrink-0 flex flex-col justify-center items-center p-6 glass-panel rounded-2xl border border-white/[0.08] text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-3">Readiness Score</span>

          <div className="relative w-28 h-28 flex items-center justify-center mb-3">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#6366f1"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <span className="absolute text-2xl font-black text-white">{percentage}%</span>
          </div>

          <p className="text-center text-xs font-medium text-slate-300 leading-relaxed">
            {percentage < 50
              ? 'Start with foundational projects and active skill tracks.'
              : percentage < 80
                ? 'Good progress! Target 1 national hackathon and 1 production deployment.'
                : 'Strong profile! Ready for tier-1 engineering applications.'}
          </p>
        </div>
      </div>
    </div>
  );
}
