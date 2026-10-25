'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Lightbulb,
  CheckCircle2,
  Plus,
  X,
  Sparkles,
  Users,
  Code2,
  Target,
  Send,
  Eye,
  Zap,
  Info
} from 'lucide-react';

const POPULAR_TECH = [
  'Next.js',
  'React',
  'Python',
  'PyTorch',
  'FastAPI',
  'Node.js',
  'React Native',
  'PostgreSQL',
  'IoT / ESP32',
  'Tailwind CSS',
  'Docker',
  'OpenCV',
];

const POPULAR_ROLES = [
  'Frontend Developer',
  'Backend Developer',
  'AI / ML Engineer',
  'UI / UX Designer',
  'Mobile App Developer',
  'IoT / Hardware Tech',
  'Data Scientist',
];

const BRANCHES = ['CSE', 'AIML', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Other'];
const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

function SubmitIdeaForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const challengeParam = searchParams.get('challenge') || '';

  const [title, setTitle] = useState(challengeParam ? `Solution: ${challengeParam}` : '');
  const [category, setCategory] = useState('AI / ML');
  const [branch, setBranch] = useState('CSE');
  const [year, setYear] = useState('3rd Year');
  const [problem, setProblem] = useState(challengeParam ? `Addressing the campus challenge: "${challengeParam}"` : '');
  const [solution, setSolution] = useState('');
  const [teamTarget, setTeamTarget] = useState(4);
  const [technologies, setTechnologies] = useState<string[]>(['Next.js', 'Python']);
  const [customTech, setCustomTech] = useState('');
  const [roles, setRoles] = useState<string[]>(['Frontend Developer']);
  const [customRole, setCustomRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitPhase, setSubmitPhase] = useState('INITIALIZING...');
  const [submitProgress, setSubmitProgress] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const toggleTech = (tech: string) => {
    if (technologies.includes(tech)) {
      setTechnologies(technologies.filter((t) => t !== tech));
    } else {
      setTechnologies([...technologies, tech]);
    }
  };

  const addCustomTech = () => {
    if (customTech.trim() && !technologies.includes(customTech.trim())) {
      setTechnologies([...technologies, customTech.trim()]);
      setCustomTech('');
    }
  };

  const toggleRole = (role: string) => {
    if (roles.includes(role)) {
      setRoles(roles.filter((r) => r !== role));
    } else {
      setRoles([...roles, role]);
    }
  };

  const addCustomRole = () => {
    if (customRole.trim() && !roles.includes(customRole.trim())) {
      setRoles([...roles, customRole.trim()]);
      setCustomRole('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitProgress(20);
    setSubmitPhase('VALIDATING CAMPUS SQUAD SPEC...');

    setTimeout(() => {
      setSubmitProgress(60);
      setSubmitPhase('SYNTHESIZING HOLOGRAPHIC BLUEPRINT...');
    }, 400);

    setTimeout(() => {
      setSubmitProgress(90);
      setSubmitPhase('BROADCASTING TO CAMPUS SQUAD NETWORK...');
    }, 800);

    setTimeout(() => {
      setSubmitProgress(100);
      setSubmitPhase('PROJECT DEPLOYED SUCCESSFULLY!');
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      }, 350);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-transparent text-white py-10 selection:bg-purple-600 selection:text-white relative overflow-hidden">
      
      {/* Background Soft Lighting */}
      <div className="cosmic-glow-pink -top-24 -left-20 opacity-20 pointer-events-none" />
      <div className="cosmic-glow-purple top-1/2 -right-24 opacity-20 pointer-events-none" />

      <div className="container-s max-w-4xl relative z-10 animate-fade-in">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/ideas"
            className="cyber-btn-interactive inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors bg-[#0F172A] border border-white/10 px-3.5 py-1.5 rounded-full"
          >
            <ArrowLeft size={14} className="text-amber-400" />
            <span>Back to Idea Hub</span>
          </Link>
          <div className="text-xs text-amber-400 font-mono flex items-center gap-1.5 bg-amber-950/40 border border-amber-500/30 px-3 py-1 rounded-full backdrop-blur-md">
            <Sparkles size={12} />
            <span>STUDOS // PROJECT INCUBATOR</span>
          </div>
        </div>

        {/* Submitting Telemetry Overlay */}
        {isSubmitting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="cyber-hud-card rounded-3xl bg-[#0B0F2A] border border-amber-500/40 p-8 sm:p-10 max-w-md w-full text-center space-y-5 shadow-2xl shadow-amber-500/20 animate-scale-in">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/20 animate-pulse">
                <Zap size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white tracking-wide">
                  Deploying Project Blueprint
                </h3>
                <p className="text-xs font-mono text-amber-300">
                  {submitPhase}
                </p>
              </div>
              <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden p-0.5 border border-white/15 laser-progress-bar">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-pink-500 rounded-full transition-all duration-300"
                  style={{ width: `${submitProgress}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                {submitProgress}% Synchronized
              </p>
            </div>
          </div>
        )}

        {submitted ? (
          /* Success Screen with Cyber HUD and scale-in */
          <div className="cyber-hud-card bg-[#0F172A]/95 backdrop-blur-xl border border-emerald-500/40 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-2xl shadow-emerald-950/30 animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto animate-pop-burst shadow-lg shadow-emerald-500/30">
              <CheckCircle2 size={40} className="text-emerald-400" />
            </div>
            
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                BROADCAST ACTIVE
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Project Published Successfully!
              </h2>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Your idea <strong className="text-white">"{title || 'New Student Project'}"</strong> is now live on the Idea Hub. Campus peers can view your problem statement and request to join your squad.
              </p>
            </div>

            {/* Live Preview Card */}
            <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#131B38] border border-cyan-500/30 text-left space-y-3 mt-4 shadow-lg shadow-cyan-950/30">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-amber-400">{category}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Open for Collaboration
                </span>
              </div>
              <h4 className="text-base font-bold text-white">{title || 'Untitled Project'}</h4>
              <p className="text-xs text-slate-300 line-clamp-2">{problem || 'No description provided.'}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {technologies.slice(0, 3).map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded text-[10px] bg-white/5 border border-white/10 text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Link
                href="/ideas"
                className="cyber-btn-interactive btn-pill-white text-xs py-3 px-7 shadow-lg shadow-emerald-500/20"
              >
                View in Idea Hub
              </Link>
              <button
                onClick={() => setSubmitted(false)}
                className="cyber-btn-interactive btn-pill-glass text-xs py-3 px-7"
              >
                Submit Another Project
              </button>
            </div>
          </div>
        ) : (
          /* Submission Form */
          <div className="space-y-8">
            
            {/* Header Banner */}
            <div className="bg-[#0F172A] border border-white/10 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
              <div className="max-w-xl space-y-2 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
                  <Sparkles size={12} />
                  <span>STUDENT PROJECT INCUBATOR</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Turn Your Idea into a Team Project
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Post your technical concept, specify the skills you need, and connect with developers, designers, and researchers across campus.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* SECTION 1: PROJECT ESSENTIALS */}
              <div className="bg-[#0F172A] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-white/10 pb-3">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-mono">1</div>
                  <span>Project Overview</span>
                </div>

                {/* Project Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-1.5">
                    Project Title <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Smart Campus Energy Monitor, AI Resume Analyzer"
                    className="w-full px-4 py-3 rounded-xl bg-[#151D36] border border-white/15 text-sm text-white placeholder:text-slate-400 outline-none focus:border-amber-400 focus:bg-[#18213E] transition-colors"
                  />
                </div>

                {/* Category & Branch Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">
                      Domain Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#151D36] border border-white/15 text-xs font-medium text-white outline-none focus:border-amber-400"
                    >
                      <option value="AI / ML">AI / Machine Learning</option>
                      <option value="Web & Cloud">Web & Cloud Systems</option>
                      <option value="Mobile & AR">Mobile Apps & AR</option>
                      <option value="IoT & Hardware">IoT & Robotics</option>
                      <option value="Social Impact">Social Impact & AgriTech</option>
                      <option value="Cybersecurity">Cybersecurity & Networks</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">
                      Your Branch
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#151D36] border border-white/15 text-xs font-medium text-white outline-none focus:border-amber-400"
                    >
                      {BRANCHES.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-200 mb-1.5">
                      Target Team Size
                    </label>
                    <select
                      value={teamTarget}
                      onChange={(e) => setTeamTarget(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#151D36] border border-white/15 text-xs font-medium text-white outline-none focus:border-amber-400"
                    >
                      <option value={2}>2 Members (Solo Lead + 1)</option>
                      <option value={3}>3 Members (Core Pod)</option>
                      <option value={4}>4 Members (Standard Hackathon)</option>
                      <option value={5}>5 Members (Large Build)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: PROBLEM & SOLUTION */}
              <div className="bg-[#0F172A] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-white/10 pb-3">
                  <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-mono">2</div>
                  <span>Problem & Solution</span>
                </div>

                {/* Problem Statement */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-200">
                      Problem Statement <span className="text-amber-400">*</span>
                    </label>
                    <span className="text-[11px] text-slate-400">What pain point does this solve?</span>
                  </div>
                  <textarea
                    required
                    rows={3}
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    placeholder="e.g. Campus students struggle to navigate complex indoor buildings and find empty study labs during exam periods."
                    className="w-full px-4 py-3 rounded-xl bg-[#151D36] border border-white/15 text-xs sm:text-sm text-white placeholder:text-slate-400 outline-none focus:border-purple-400 focus:bg-[#18213E] transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Proposed Solution */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-200">
                      Proposed Solution / Architecture
                    </label>
                    <span className="text-[11px] text-slate-400">Brief technical approach</span>
                  </div>
                  <textarea
                    rows={3}
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    placeholder="e.g. An interactive mobile app using ARKit for turn-by-turn routing with real-time room occupancy sensors."
                    className="w-full px-4 py-3 rounded-xl bg-[#151D36] border border-white/15 text-xs sm:text-sm text-white placeholder:text-slate-400 outline-none focus:border-purple-400 focus:bg-[#18213E] transition-colors resize-none leading-relaxed"
                  />
                </div>
              </div>

              {/* SECTION 3: TECH STACK & RECRUITING ROLES */}
              <div className="bg-[#0F172A] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
                <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-white/10 pb-3">
                  <div className="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs font-mono">3</div>
                  <span>Technologies & Roles Needed</span>
                </div>

                {/* Technology Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-200 mb-2">
                    Select Technologies (Click to toggle)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {POPULAR_TECH.map((t) => {
                      const active = technologies.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => toggleTech(t)}
                          className={`cyber-btn-interactive px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            active
                              ? 'bg-amber-400 text-black shadow-md shadow-amber-400/30 font-bold scale-105'
                              : 'bg-[#151D36] text-slate-300 border border-white/15 hover:text-white hover:bg-[#1C2546]'
                          }`}
                        >
                          {active ? `✓ ${t}` : `+ ${t}`}
                        </button>
                      );
                    })}
                  </div>

                  {/* Add Custom Tech Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customTech}
                      onChange={(e) => setCustomTech(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addCustomTech();
                        }
                      }}
                      placeholder="Add other tech (e.g. ROS, GraphQL, Rust) and click Add"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-[#151D36] border border-white/15 text-xs text-white placeholder:text-slate-400 outline-none focus:border-amber-400"
                    />
                    <button
                      type="button"
                      onClick={addCustomTech}
                      className="cyber-btn-interactive px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                    >
                      Add Tech
                    </button>
                  </div>
                </div>

                {/* Open Roles Selector */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-200 mb-2">
                    Looking For (Teammate Roles to Recruit)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {POPULAR_ROLES.map((r) => {
                      const active = roles.includes(r);
                      return (
                        <button
                          key={r}
                          type="button"
                          onClick={() => toggleRole(r)}
                          className={`cyber-btn-interactive px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            active
                              ? 'bg-purple-500 text-white shadow-md shadow-purple-500/35 font-bold scale-105'
                              : 'bg-[#151D36] text-slate-300 border border-white/15 hover:text-white hover:bg-[#1C2546]'
                          }`}
                        >
                          {active ? `✓ ${r}` : `+ ${r}`}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Role Input */}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addCustomRole();
                        }
                      }}
                      placeholder="Add custom role (e.g. Hardware Firmware Engineer) & click Add"
                      className="flex-1 px-3.5 py-2 rounded-xl bg-[#151D36] border border-white/15 text-xs text-white placeholder:text-slate-400 outline-none focus:border-purple-400"
                    />
                    <button
                      type="button"
                      onClick={addCustomRole}
                      className="cyber-btn-interactive px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
                    >
                      Add Role
                    </button>
                  </div>
                </div>

              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <Link
                  href="/ideas"
                  className="cyber-btn-interactive w-full sm:w-auto text-center px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  className="cyber-btn-interactive w-full sm:w-auto btn-pill-white text-xs sm:text-sm py-3.5 px-8 shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2"
                >
                  <span>Publish Idea to Hub</span>
                  <Send size={15} />
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </main>
  );
}

export default function SubmitIdeaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#070A1E] text-white p-8">Loading...</div>}>
      <SubmitIdeaForm />
    </Suspense>
  );
}