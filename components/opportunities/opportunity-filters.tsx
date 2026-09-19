'use client';

import React from 'react';
import {
  Briefcase,
  Trophy,
  Code2,
  GraduationCap,
  Microscope,
  Calendar,
  Layers,
  ChevronDown
} from 'lucide-react';
import type { OpportunityFilters as FiltersType } from '@/types/opportunity';

interface OpportunityFiltersProps {
  filters: FiltersType;
  onFilter: (key: keyof FiltersType, value: string) => void;
  onClear: () => void;
}

const CATEGORIES = [
  { value: 'All', label: 'All', icon: <Layers size={14} />, count: 142 },
  { value: 'Internship', label: 'Internships', icon: <Briefcase size={14} />, count: 56 },
  { value: 'Hackathon', label: 'Hackathons', icon: <Trophy size={14} />, count: 24 },
  { value: 'Competition', label: 'Competitions', icon: <Code2 size={14} />, count: 18 },
  { value: 'Scholarship', label: 'Scholarships', icon: <GraduationCap size={14} />, count: 20 },
  { value: 'Research', label: 'Research', icon: <Microscope size={14} />, count: 14 },
  { value: 'Workshop', label: 'Workshops', icon: <Calendar size={14} />, count: 10 },
];

const ELIGIBILITY_OPTIONS = [
  'First Year',
  'Second Year',
  'Third Year',
  'Final Year',
  'Post Graduate',
];

const OPPORTUNITY_TYPES = [
  { value: 'Remote', label: 'Remote' },
  { value: 'Offline', label: 'On-site' },
  { value: 'Hybrid', label: 'Hybrid' },
];

const LOCATIONS = [
  'All Locations',
  'Remote',
  'India',
  'Hyderabad',
  'Bangalore',
  'Chennai',
  'Germany',
  'United States',
];

const SKILLS = [
  'All Skills',
  'Python',
  'AI / ML',
  'System Design',
  'Problem Solving',
  'Web Development',
  'Cloud',
  'Software Engineering',
  'Generative AI',
  'Product Building',
  'DSA',
  'Algorithms',
];

export function OpportunityFilters({
  filters,
  onFilter,
  onClear,
}: OpportunityFiltersProps) {
  const currentCategory = filters.category || 'All';

  return (
    <div className="w-full space-y-6 pr-2">
      
      {/* ── 1. CATEGORY SECTION ── */}
      <div>
        <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase mb-3">
          Category
        </h3>
        <div className="space-y-1">
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onFilter('category', cat.value === 'All' ? 'All' : cat.value)}
                className={`
                  w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all
                  ${
                    isActive
                      ? 'bg-white/10 text-white border border-white/15 font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }
                `}
              >
                <div className="flex items-center gap-2.5">
                  <span className={isActive ? 'text-white' : 'text-slate-400'}>
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                </div>
                <span className={`text-[11px] font-mono ${isActive ? 'text-white font-bold' : 'text-slate-500'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 2. ELIGIBILITY SECTION ── */}
      <div className="pt-2 border-t border-white/5">
        <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase mb-3">
          Eligibility
        </h3>
        <div className="space-y-2">
          {ELIGIBILITY_OPTIONS.map((year) => {
            const isChecked = filters.year === year;
            return (
              <label
                key={year}
                className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-slate-200 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onFilter('year', isChecked ? 'Any Year' : year)}
                  className="w-3.5 h-3.5 rounded border border-white/20 bg-white/5 checked:bg-purple-600 checked:border-purple-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span>{year}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ── 3. LOCATION SECTION ── */}
      <div className="pt-2 border-t border-white/5">
        <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase mb-2">
          Location
        </h3>
        <div className="relative">
          <select
            value={filters.location || ''}
            onChange={(e) => onFilter('location', e.target.value === 'All Locations' ? 'All' : e.target.value)}
            className="w-full appearance-none rounded-xl border border-white/10 bg-[#0B0820] py-2 pl-3 pr-8 text-xs text-slate-300 outline-none focus:border-white/25 transition-all cursor-pointer"
          >
            <option value="">Select location</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc} className="bg-[#0B0820] text-slate-200">
                {loc}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* ── 4. OPPORTUNITY TYPE (MODE) SECTION ── */}
      <div className="pt-2 border-t border-white/5">
        <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase mb-3">
          Opportunity Type
        </h3>
        <div className="space-y-2">
          {OPPORTUNITY_TYPES.map((type) => {
            const isChecked = filters.mode === type.value;
            return (
              <label
                key={type.value}
                className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-slate-200 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => onFilter('mode', isChecked ? 'All' : type.value)}
                  className="w-3.5 h-3.5 rounded border border-white/20 bg-white/5 checked:bg-purple-600 checked:border-purple-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <span>{type.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ── 5. SKILLS SECTION ── */}
      <div className="pt-2 border-t border-white/5">
        <h3 className="text-xs font-bold text-slate-200 tracking-wide uppercase mb-2">
          Skills
        </h3>
        <div className="relative">
          <select
            value={filters.skill || ''}
            onChange={(e) => onFilter('skill', e.target.value === 'All Skills' ? 'Any' : e.target.value)}
            className="w-full appearance-none rounded-xl border border-white/10 bg-[#0B0820] py-2 pl-3 pr-8 text-xs text-slate-300 outline-none focus:border-white/25 transition-all cursor-pointer"
          >
            <option value="">Select skills</option>
            {SKILLS.map((skill) => (
              <option key={skill} value={skill} className="bg-[#0B0820] text-slate-200">
                {skill}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* ── 6. RESET ALL BUTTON ── */}
      <div className="pt-4">
        <button
          onClick={onClear}
          className="w-full py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all text-center cursor-pointer"
        >
          Reset all
        </button>
      </div>

    </div>
  );
}