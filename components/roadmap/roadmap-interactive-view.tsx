'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  Code2,
  Briefcase,
  Trophy,
  FileText,
  Compass,
  Layers,
  ChevronRight,
  GitBranch,
  Target
} from 'lucide-react';
import { Card3D } from '@/components/ui/Card3D';
import { HoloGyro } from '@/components/3d/HoloGyro';
import type {
  Roadmap,
  SkillRecommendation,
  ProjectRecommendation,
  ExperienceGoal,
  ResumeRequirement,
  YearlyPlan
} from '@/types/roadmap';

interface RoadmapInteractiveViewProps {
  roadmap: Roadmap;
  skills: SkillRecommendation[];
  projects: ProjectRecommendation[];
  experience: ExperienceGoal[];
  resume: ResumeRequirement[];
}

export function RoadmapInteractiveView({
  roadmap,
  skills: initialSkills,
  projects,
  experience: initialExperience,
  resume,
}: RoadmapInteractiveViewProps) {
  const [selectedYearIndex, setSelectedYearIndex] = useState(2); // 3rd Year by default
  const [skillsList, setSkillsList] = useState(initialSkills);
  const [experienceList, setExperienceList] = useState(initialExperience);
  const [activeTab, setActiveTab] = useState<'all' | 'skills' | 'projects' | 'experience' | 'readiness'>('all');

  const toggleSkill = (id: string) => {
    setSkillsList(prev =>
      prev.map(s =>
        s.id === id
          ? { ...s, status: s.status === 'completed' ? 'learning' : 'completed' }
          : s
      )
    );
  };

  const toggleExperience = (id: string) => {
    setExperienceList(prev =>
      prev.map(e =>
        e.id === id
          ? { ...e, status: e.status === 'completed' ? 'not_started' : 'completed' }
          : e
      )
    );
  };

  const years = [
    { label: '1st Year', sub: 'Foundations & Math', icon: '01' },
    { label: '2nd Year', sub: 'DSA & Core Stack', icon: '02' },
    { label: '3rd Year', sub: 'Internships & Systems', icon: '03' },
    { label: '4th Year', sub: 'Placements & Launch', icon: '04' },
  ];

  const currentPlan = roadmap.fourYearPlan[selectedYearIndex] || roadmap.fourYearPlan[0];

  return (
    <div className="min-h-screen bg-transparent text-white pb-24 selection:bg-purple-600 selection:text-white">

      {/* ── 1. COSMIC HERO SECTION ── */}
      <section className="relative pt-12 pb-14 border-b border-white/5 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-600/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="container-s relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 font-mono text-xs font-semibold tracking-widest uppercase mb-4">
            <Sparkles size={13} className="text-purple-400" />
            <span>CAMPUS CURRICULUM • MILESTONES • READINESS</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Engineering Roadmap & Milestones
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            Your step-by-step semester navigation system from Day 1 to Placement Offer. Know what to learn, build, and conquer every term.
          </p>

          {/* Quick Action Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/career#build-path"
              className="btn-pill-white text-xs py-2.5 px-6 flex items-center gap-2 font-semibold shadow-lg shadow-purple-500/20"
            >
              <span>Customize for My Branch</span>
              <ArrowRight size={13} />
            </Link>
            <Link
              href="/opportunities"
              className="btn-pill-glass text-xs py-2.5 px-5 flex items-center gap-2 font-medium"
            >
              <Compass size={14} className="text-cyan-400" />
              <span>Explore Matched Opportunities</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. TELEMETRY STATUS BAR ── */}
      <section className="bg-[#0A071A]/90 border-b border-white/5 py-4 backdrop-blur-xl">
        <div className="container-s flex flex-col md:flex-row items-center justify-between gap-4">

          <div className="flex flex-wrap items-center gap-6 text-xs">
            <div>
              <span className="text-slate-500 text-[10px] font-mono uppercase tracking-wider block">Target Career</span>
              <span className="font-bold text-white text-sm">{roadmap.careerPath}</span>
            </div>
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <div>
              <span className="text-slate-500 text-[10px] font-mono uppercase tracking-wider block">Academic Branch</span>
              <span className="font-semibold text-purple-300">{roadmap.studentContext.branch}</span>
            </div>
            <div className="h-6 w-px bg-white/10 hidden sm:block" />
            <div>
              <span className="text-slate-500 text-[10px] font-mono uppercase tracking-wider block">Placement Goal</span>
              <span className="font-semibold text-emerald-300">{roadmap.studentContext.goal}</span>
            </div>
          </div>

          {/* Progress Meter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-xs text-slate-400 font-medium">Roadmap Progress</span>
            <div className="w-36 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-sm"
                style={{ width: `${roadmap.overallProgress}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-white">{roadmap.overallProgress}%</span>
          </div>

        </div>
      </section>

      {/* ── 3. FOUR-YEAR INTERACTIVE STAGE SELECTOR ── */}
      <section className="py-8 border-b border-white/5 bg-[#050412]">
        <div className="container-s">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {years.map((y, idx) => {
              const isSelected = selectedYearIndex === idx;
              return (
                <button
                  key={y.label}
                  onClick={() => setSelectedYearIndex(idx)}
                  className={`
                    p-4 rounded-2xl text-left border transition-all duration-300 relative group cursor-pointer
                    ${isSelected
                      ? 'bg-gradient-to-br from-purple-900/40 via-purple-950/20 to-transparent border-purple-500 shadow-lg shadow-purple-500/20'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/5'
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-purple-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                      YEAR {y.icon}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white">{y.label}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{y.sub}</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. CURRENT YEAR SPOTLIGHT & GOALS ── */}
      <main className="container-s py-10 space-y-12">

        {/* Year Overview Card */}
        <Card3D maxTilt={4} scale={1.01} glare={true} className="cyber-hud-card">
          <div className="holo-scanner-sweep" />
          <div className="rounded-3xl p-6 sm:p-8 bg-[#0D0A22]/85 border border-purple-500/30 backdrop-blur-xl relative overflow-hidden shadow-2xl preserve-3d">

            {/* Ambient HoloGyro */}
            <div className="absolute -right-10 -bottom-10 pointer-events-none opacity-20 hidden md:block">
              <HoloGyro size="sm" label="CURRICULUM ENGINE" />
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-purple-500/15 border border-purple-500/30 text-purple-300 mb-2 translate-z-20">
                  ACTIVE SEMESTER MILESTONES
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {currentPlan.year}: {currentPlan.focus}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  Core priorities: {currentPlan.learn.slice(0, 3).join(' • ')}
                </p>
              </div>

              {/* Quick Stats Pill */}
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 shrink-0 translate-z-20">
                <div className="text-center px-2">
                  <span className="text-xl font-bold text-white">{skillsList.filter(s => s.status === 'completed').length}/{skillsList.length}</span>
                  <span className="text-[10px] text-slate-400 block uppercase">Skills</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center px-2">
                  <span className="text-xl font-bold text-pink-400">{projects.length}</span>
                  <span className="text-[10px] text-slate-400 block uppercase">Projects</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center px-2">
                  <span className="text-xl font-bold text-emerald-400">
                    {Math.round((resume.filter(r => r.status === 'completed').length / (resume.length || 1)) * 100)}%
                  </span>
                  <span className="text-[10px] text-slate-400 block uppercase">Resume</span>
                </div>
              </div>
            </div>
          </div>
        </Card3D>

        {/* ── 5. CORE COMPETENCIES & SKILLS ── */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-purple-400 uppercase block mb-1">
                COMPETENCIES
              </span>
              <h3 className="text-xl font-bold text-white">Skills to Master this Academic Year</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">Click to mark completed</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillsList.map((skill) => {
              const isCompleted = skill.status === 'completed';
              return (
                <div
                  key={skill.id}
                  onClick={() => toggleSkill(skill.id)}
                  className={`
                    p-5 rounded-2xl border transition-all duration-300 cursor-pointer group flex flex-col justify-between
                    ${isCompleted
                      ? 'bg-emerald-950/20 border-emerald-500/40 shadow-sm'
                      : 'bg-[#0E0B1F]/70 border-white/10 hover:border-purple-500/50 hover:bg-white/5'
                    }
                  `}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${isCompleted ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-slate-300'
                        }`}>
                        {skill.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 capitalize">{skill.currentLevel} → {skill.targetLevel}</span>
                        {isCompleted ? (
                          <CheckCircle2 size={16} className="text-emerald-400" />
                        ) : (
                          <Circle size={16} className="text-slate-500 group-hover:text-purple-400 transition-colors" />
                        )}
                      </div>
                    </div>

                    <h4 className={`text-base font-bold transition-colors ${isCompleted ? 'text-emerald-200 line-through' : 'text-white group-hover:text-purple-300'}`}>
                      {skill.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {skill.whyItMatters}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Target: {skill.importance} priority</span>
                    <span className={isCompleted ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
                      {isCompleted ? 'Completed ✓' : 'In Progress'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 6. RECOMMENDED PORTFOLIO PROJECTS ── */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-pink-400 uppercase block mb-1">
                HANDS-ON PORTFOLIO
              </span>
              <h3 className="text-xl font-bold text-white">Recommended Capstone & Mini Projects</h3>
            </div>
            <Link href="/ideas" className="text-xs text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1">
              <span>Find Team Squad</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p) => (
              <Card3D key={p.id} maxTilt={6} scale={1.015} glare={true} className="cyber-hud-card h-full">
                <div className="holo-scanner-sweep" />
                <div
                  className="p-6 rounded-2xl bg-[#0D091F]/90 border border-pink-500/30 hover:border-pink-500/70 shadow-lg transition-all duration-300 group flex flex-col justify-between h-full preserve-3d"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/30 translate-z-20">
                        {p.difficulty}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock size={12} />
                        {p.estimatedTime}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-pink-200 transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {p.whyBuildIt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {p.skills.map((s) => (
                        <span key={s} className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs translate-z-20">
                    <span className="text-slate-400">{p.careerRelevance}</span>
                    <Link
                      href={`/ideas/submit?title=${encodeURIComponent(p.title)}`}
                      className="text-pink-400 hover:text-pink-300 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Build with Squad</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>

        {/* ── 7. EXPERIENCE CHECKLIST & RESUME READINESS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Experience Checklist */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#09071A]/90 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={18} className="text-amber-400" />
              <h3 className="text-lg font-bold text-white">Extracurricular & Hackathon Goals</h3>
            </div>
            <div className="space-y-3">
              {experienceList.map((exp) => {
                const isCompleted = exp.status === 'completed';
                return (
                  <div
                    key={exp.id}
                    onClick={() => toggleExperience(exp.id)}
                    className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all cursor-pointer flex items-start gap-3.5"
                  >
                    <button className="mt-0.5">
                      {isCompleted ? (
                        <CheckCircle2 size={17} className="text-emerald-400 shrink-0" />
                      ) : (
                        <Circle size={17} className="text-slate-500 shrink-0 hover:text-white" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h5 className={`text-xs sm:text-sm font-semibold ${isCompleted ? 'text-emerald-300 line-through' : 'text-white'}`}>
                        {exp.title}
                      </h5>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        {exp.whyItMatters}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Resume Readiness Meter */}
          <div className="p-6 sm:p-7 rounded-3xl bg-[#09071A]/90 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-cyan-400" />
                  <h3 className="text-lg font-bold text-white">Resume & Placement Readiness</h3>
                </div>
                <span className="text-sm font-mono font-bold text-emerald-400">
                  {Math.round((resume.filter(r => r.status === 'completed').length / (resume.length || 1)) * 100)}% Ready
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Benchmark evaluation based on verified student placement standards for Tier-1 technology companies.
              </p>

              {/* Progress Pillars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Target Keywords Match</span>
                    <span className="font-mono text-white">85%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-cyan-400 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">DSA & Problem Solving Count</span>
                    <span className="font-mono text-white">70%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: '70%' }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">Deployed Capstone Artifacts</span>
                    <span className="font-mono text-white">65%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full bg-pink-500 rounded-full" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5">
              <Link
                href="/career"
                className="btn-pill-glass w-full py-2.5 text-xs text-center font-semibold block"
              >
                Launch Mock Placement Audit →
              </Link>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
