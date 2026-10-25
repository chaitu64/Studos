"use client";

import React, { useState } from 'react';
import { YearlyPlan } from '@/types/roadmap';
import { BookOpen, GitBranch, Briefcase, Target } from 'lucide-react';

interface YearlyRoadmapProps {
  plans: YearlyPlan[];
}

export function YearlyRoadmap({ plans }: YearlyRoadmapProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="glass-panel overflow-hidden rounded-2xl border border-white/[0.08] shadow-xl">
      {/* Tabs */}
      <div className="flex overflow-x-auto border-b border-white/[0.08] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-white/[0.02]">
        {plans.map((plan, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 min-w-[120px] py-4 px-4 text-xs font-bold uppercase tracking-wider text-center border-b-2 transition-all ${isActive
                  ? 'border-indigo-500 text-indigo-300 bg-indigo-500/10 font-extrabold'
                  : 'border-transparent text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
            >
              {plan.year}
            </button>
          );
        })}
      </div>

      <div className="p-6 sm:p-8">
        <div className="mb-6 text-center md:text-left">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">Primary Focus</span>
          <h3 className="font-extrabold text-xl sm:text-2xl text-white">{plans[activeTab].focus}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Learn */}
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <BookOpen size={13} />
              </span>
              <span>Learn & Master</span>
            </h4>
            <ul className="space-y-2">
              {plans[activeTab].learn.length === 0 ? (
                <li className="text-xs text-slate-400 italic">No specific learning goals defined.</li>
              ) : (
                plans[activeTab].learn.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-300">
                    <span className="text-indigo-400 mt-0.5">•</span> {item}
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Build */}
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
                <GitBranch size={13} />
              </span>
              <span>Build & Deploy</span>
            </h4>
            <ul className="space-y-2">
              {plans[activeTab].build.length === 0 ? (
                <li className="text-xs text-slate-400 italic">No specific building goals defined.</li>
              ) : (
                plans[activeTab].build.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-300">
                    <span className="text-purple-400 mt-0.5">•</span> {item}
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Do (Experience) */}
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Briefcase size={13} />
              </span>
              <span>Engage & Compete</span>
            </h4>
            <ul className="space-y-2">
              {plans[activeTab].do.length === 0 ? (
                <li className="text-xs text-slate-400 italic">No specific experience goals defined.</li>
              ) : (
                plans[activeTab].do.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-300">
                    <span className="text-emerald-400 mt-0.5">•</span> {item}
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Prepare */}
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <Target size={13} />
              </span>
              <span>Career Milestones</span>
            </h4>
            <ul className="space-y-2">
              {(!plans[activeTab].prepare || plans[activeTab].prepare.length === 0) ? (
                <li className="text-xs text-slate-400 italic">No specific milestones defined.</li>
              ) : (
                plans[activeTab].prepare.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs font-medium text-slate-300">
                    <span className="text-amber-400 mt-0.5">•</span> {item}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
