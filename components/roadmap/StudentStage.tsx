import React from 'react';
import { Roadmap } from '@/types/roadmap';

interface StudentStageProps {
  roadmap: Roadmap;
}

export function StudentStage({ roadmap }: StudentStageProps) {
  return (
    <div className="border-b border-white/[0.08] bg-[#0c0e15]/70 py-5 backdrop-blur-md">
      <div className="container-s">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Your Academic Stage</p>
              <p className="text-sm font-extrabold text-white">
                {roadmap.studentContext.branch} • {roadmap.studentContext.year}
              </p>
            </div>

            <div className="border-l border-white/[0.08] pl-6">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Target Role</p>
              <p className="text-sm font-bold text-indigo-300">{roadmap.careerPath}</p>
            </div>

            <div className="border-l border-white/[0.08] pl-6 col-span-2 sm:col-span-1">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Current Focus</p>
              <p className="text-sm font-semibold text-slate-200">
                {roadmap.stages.find(s => s.status === 'current')?.title || "Building Core Foundations"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/[0.03] p-3 rounded-xl border border-white/[0.06]">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Overall Roadmap Progress</span>
              <div className="flex items-center gap-3 mt-1.5">
                <div className="w-32 h-2 bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-glow-sm"
                    style={{ width: `${roadmap.overallProgress}%` }}
                  />
                </div>
                <span className="text-xs font-extrabold text-white">{roadmap.overallProgress}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
