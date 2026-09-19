"use client";

import React from 'react';
import { Layers } from 'lucide-react';

interface AcademicSelectorProps {
  year: string;
  setYear: (y: string) => void;
  branch: string;
  setBranch: (b: string) => void;
  semester: string;
  setSemester: (s: string) => void;
}

export function AcademicSelector({ year, setYear, branch, setBranch, semester, setSemester }: AcademicSelectorProps) {
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const branches = ['AIML', 'CSE', 'ECE', 'EEE', 'Mechanical', 'Civil'];
  const semesters = year === '4th Year' ? ['Semester 1'] : ['Semester 1', 'Semester 2'];

  return (
    <div className="bg-[#07080c]/90 backdrop-blur-xl border-b border-white/[0.08] sticky top-20 z-30">
      <div className="container-s py-3.5 flex flex-col md:flex-row gap-4 md:items-center justify-between">
        {/* Year Tabs */}
        <div className="flex overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden space-x-1.5 p-1 bg-white/[0.04] rounded-xl border border-white/[0.08]">
          {years.map((y) => {
            const isActive = year === y;
            return (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${isActive
                  ? 'bg-indigo-600 text-white shadow-glow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
              >
                {y}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Branch Selector */}
          <div className="flex items-center space-x-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-3 py-1.5 backdrop-blur-md">
            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/20 text-indigo-300">
              <Layers size={12} />
            </span>
            <select
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer pr-1"
            >
              {branches.map((b) => (
                <option key={b} value={b} className="bg-[#12151f] text-white">
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="w-px h-5 bg-white/[0.08] hidden md:block" />

          {/* Semester Tabs */}
          <div className="flex space-x-1.5 p-1 bg-white/[0.04] rounded-xl border border-white/[0.08]">
            {semesters.map((s) => {
              const isActive = semester === s;
              return (
                <button
                  key={s}
                  onClick={() => setSemester(s)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${isActive
                    ? 'bg-indigo-600 text-white shadow-glow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
