'use client';

import React from 'react';
import { RoadmapStage } from '@/types/roadmap';
import { Check, Target, Circle, ArrowRight } from 'lucide-react';
import { Card3D } from '@/components/ui/Card3D';

interface JourneyTimelineProps {
  stages: RoadmapStage[];
}

export function JourneyTimeline({ stages }: JourneyTimelineProps) {
  return (
    <div className="py-10">
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 block mb-1">Visual Progression</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">Your 4-Year College Journey</h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-300">Step-by-step milestones to complete from First Year through Campus Placements.</p>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute top-[24px] left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500/40 via-indigo-500/40 to-purple-500/40 -z-10" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-0">
          {stages.map((stage, index) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';

            return (
              <div key={stage.id} className="flex flex-col">
                <div className="mb-4 relative shrink-0 flex items-center justify-start">
                  {/* Concentric 3D Orbit Node */}
                  <div className="relative">
                    {isCurrent && (
                      <div className="absolute -inset-2 rounded-full border border-indigo-400/40 animate-ping pointer-events-none" />
                    )}
                    <div
                      className={`h-11 w-11 rounded-full flex items-center justify-center border-2 transition-all shadow-md relative z-10 ${
                        isCompleted
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : isCurrent
                            ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 ring-4 ring-indigo-500/20 shadow-glow-sm shadow-[0_0_20px_rgba(99,102,241,0.4)]'
                            : 'bg-white/[0.04] border-white/[0.1] text-slate-500'
                      }`}
                    >
                      {isCompleted ? (
                        <Check size={16} className="stroke-[3px]" />
                      ) : isCurrent ? (
                        <Target size={16} className="text-indigo-400" />
                      ) : (
                        <Circle size={14} className="stroke-[2px]" />
                      )}
                    </div>
                  </div>
                </div>

                <Card3D maxTilt={6} scale={1.02} glare={true} className="cyber-hud-card h-full">
                  <div className="holo-scanner-sweep" />
                  <div
                    className={`glass-panel p-5 h-full flex flex-col justify-between rounded-2xl border transition-all preserve-3d ${
                      isCurrent
                        ? 'border-indigo-500/50 bg-indigo-500/[0.06] shadow-glow-sm shadow-[0_0_30px_rgba(99,102,241,0.15)]'
                        : 'border-white/[0.08] bg-[#0A071E]/90'
                    }`}
                  >
                    <div>
                      <div className="mb-2 flex items-center gap-1.5">
                        <span className="rounded-full bg-white/[0.06] border border-white/[0.08] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-300 translate-z-20">
                          {stage.year}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" /> Active Stage
                          </span>
                        )}
                      </div>

                      <h3 className={`font-bold text-base mb-1 ${isCurrent ? 'text-indigo-300' : 'text-white'}`}>
                        {stage.title}
                      </h3>

                      <p className="text-xs leading-relaxed text-slate-300 mb-4 line-clamp-3">
                        {stage.description}
                      </p>
                    </div>

                    {isCurrent && stage.milestones.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/[0.08]">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-2">Stage Milestones</p>
                        <ul className="space-y-1.5 mb-4">
                          {stage.milestones.slice(0, 3).map((m) => (
                            <li key={m.id} className="text-xs flex items-start gap-2 font-medium text-slate-200">
                              <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-[8px] font-bold text-emerald-300 border border-emerald-500/30">
                                <Check size={8} className="stroke-[3px]" />
                              </span>
                              <span>{m.title}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-auto">
                          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                            <span>Progress</span>
                            <span className="text-indigo-400 font-bold">
                              {stage.milestones.filter((m) => m.status === 'completed').length} / {stage.milestones.length}
                            </span>
                          </div>
                          <div className="w-full h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                              style={{
                                width: `${(stage.milestones.filter((m) => m.status === 'completed').length / stage.milestones.length) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card3D>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
