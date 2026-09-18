"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Lightbulb,
  GraduationCap,
  BookOpen,
  ArrowRight,
  Search,
  Calendar,
  Clock,
  Users,
  Sparkles,
  Zap,
  Globe,
  Award,
  CheckCircle2
} from 'lucide-react';
import { ProjectShowcase } from '../components/home/project-showcase';
import { BackToTop } from '../components/ui/back-to-top';
import { BrandLogo } from '../components/BrandLogo';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const stats = [
    { number: '940+', label: 'Active Students' },
    { number: '1500+', label: 'Verified Resources' },
    { number: '150+', label: 'Live Opportunities' },
    { number: '20+', label: 'Engineering Tracks' },
  ];

  const processSteps = [
    {
      num: '1',
      title: 'Choose a Track',
      desc: 'Explore tailored roadmaps and curriculum benchmarks calibrated for your college branch and target role.',
      color: 'from-pink-500 via-rose-600 to-red-600',
      glow: 'shadow-pink-500/40',
      dustColor: 'bg-rose-500/30',
      href: '/career'
    },
    {
      num: '2',
      title: 'Connect & Build',
      desc: 'Pitch visionary ideas, recruit complementary student developers, and enter top global hackathons.',
      color: 'from-purple-500 via-indigo-600 to-violet-800',
      glow: 'shadow-purple-500/40',
      dustColor: 'bg-purple-500/30',
      href: '/ideas'
    },
    {
      num: '3',
      title: 'Master & Launch',
      desc: 'Access past question papers, verified handwritten notes, and apply to vetted student internships.',
      color: 'from-amber-400 via-amber-500 to-orange-600',
      glow: 'shadow-amber-500/40',
      dustColor: 'bg-amber-500/30',
      href: '/opportunities'
    }
  ];

  const milestones = [
    {
      year: 'Year 1',
      title: 'The Beginning',
      desc: 'Master computational thinking, Linux environment, Git version control, and data structure fundamentals.',
      location: 'Foundations · Campus'
    },
    {
      year: 'Year 2',
      title: 'Early Exploration',
      desc: 'Form hackathon squads, dive into AI/ML or Fullstack domains, and begin contributing to open-source.',
      location: 'Hackathons · Labs'
    },
    {
      year: 'Year 3',
      title: 'Hard Work & Polish',
      desc: 'Architect end-to-end production systems, publish research, and secure verified summer internships.',
      location: 'Internships & Grants'
    },
    {
      year: 'Year 4',
      title: 'Industry Launch',
      desc: 'Complete capstone innovation, ace technical architecture interviews, and step into high-impact roles.',
      location: 'Global Placement'
    }
  ];

  const recentOpportunities = [
    {
      id: 'opp-1',
      title: 'Global AI Agentic Hackathon 2026',
      organization: 'Google DeepMind',
      type: 'Hackathon',
      deadline: '4 days left',
      mode: 'Online / Global',
      reward: '$50,000 Pool',
      skills: ['AI / LLMs', 'Python', 'Open Source']
    },
    {
      id: 'opp-2',
      title: 'Summer 2026 Software Engineer Internship',
      organization: 'Microsoft Cloud & AI',
      type: 'Internship',
      deadline: 'Sep 30, 2026',
      mode: 'Hybrid (Bangalore / Hyderabad)',
      reward: 'Stipend + Pre-Placement',
      skills: ['C++', 'Go', 'Cloud Architecture']
    },
    {
      id: 'opp-3',
      title: 'Autonomous Robotics Innovation Fellowship',
      organization: 'MIT Innovation Lab',
      type: 'Fellowship',
      deadline: 'Oct 15, 2026',
      mode: 'Research Grant',
      reward: 'Full Grant + Mentorship',
      skills: ['ROS 2', 'Embedded C', 'Hardware']
    }
  ];

  return (
    <div className="text-white min-h-screen relative overflow-hidden bg-transparent">

      {/* Background Ambient Depth */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[400px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[400px] bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* =========================================================================
      {/* =========================================================================
          SECTION 1: HERO (Spider-Man Futuristic Centerpiece & Active Background)
          ========================================================================= */}
      <section
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative pt-12 pb-20 md:pt-16 md:pb-28 flex flex-col items-center justify-center text-center px-4 overflow-hidden"
      >

        {/* Visual Composition Centerpiece with Matte 3D Spheres, Multi-Axis Orbital Rings & HUD Reticles */}
        <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center min-h-[340px] sm:min-h-[420px] md:min-h-[480px]">

          {/* Tri-Axis Animated Spider-Tech Orbital Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Outer Spider Crimson Orbital Ring */}
            <div className="w-[320px] sm:w-[480px] md:w-[600px] h-[320px] sm:h-[480px] md:h-[600px] rounded-full border border-red-500/25 border-dashed animate-spin-slow relative">
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 shadow-md shadow-red-500/50" />
            </div>
            {/* Mid Web Cobalt Orbital Ring */}
            <div className="absolute w-[240px] sm:w-[360px] md:w-[460px] h-[240px] sm:h-[360px] md:h-[460px] rounded-full border border-blue-500/25 border-dotted animate-spin-reverse">
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 shadow-md shadow-blue-500/50" />
            </div>
            {/* Inner Equatorial Web Ring */}
            <div className="absolute w-[180px] sm:w-[280px] md:w-[360px] h-[180px] sm:h-[280px] md:h-[360px] rounded-full border border-white/15 animate-spin-slow" style={{ animationDuration: '35s' }}>
              <div className="absolute bottom-2 left-1/4 w-2 h-2 rounded-full bg-slate-300" />
            </div>
          </div>

          {/* Tactical Spider HUD Corner Reticles Framing the Core */}
          <div className="absolute w-[280px] sm:w-[440px] md:w-[560px] h-[240px] sm:h-[320px] md:h-[380px] pointer-events-none border border-white/5 rounded-3xl">
            {/* Corner Brackets */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500/50 rounded-tl" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500/50 rounded-tr" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500/50 rounded-bl" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500/50 rounded-br" />

            {/* Tactical Micro Telemetry Tags */}
            <span className="absolute -top-3 left-6 px-2 py-0.5 rounded text-[9px] font-mono text-slate-400 bg-[#0B0F1A] border border-white/10">
              SYS::SPIDER_v3.2
            </span>
            <span className="absolute -bottom-3 right-6 px-2 py-0.5 rounded text-[9px] font-mono text-blue-400 bg-[#0B0F1A] border border-white/10">
              HUD // ONLINE
            </span>
          </div>

          {/* 3D Primary Left Sphere (Matte Spider Crimson) */}
          <div
            style={{
              transform: `translate(${mousePos.x * -18}px, ${mousePos.y * -18}px)`,
              transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
            className="absolute left-[8%] sm:left-[16%] md:left-[20%] top-1/2 -translate-y-1/2 w-36 sm:w-52 md:w-64 h-36 sm:h-52 md:h-64 rounded-full bg-gradient-to-tr from-red-950 via-rose-700 to-red-600 shadow-2xl shadow-black/90 z-10 animate-float pointer-events-none"
          >
            {/* Specular Highlight */}
            <div className="absolute top-4 left-6 w-12 sm:w-16 h-8 sm:h-12 rounded-full bg-white/20 blur-sm transform -rotate-45" />
          </div>

          {/* 3D Secondary Right Sphere (Matte Web Cobalt) */}
          <div
            style={{
              transform: `translate(${mousePos.x * 18}px, ${mousePos.y * 18}px)`,
              transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)',
              animationDelay: '1.5s'
            }}
            className="absolute right-[8%] sm:right-[16%] md:right-[20%] bottom-6 sm:bottom-10 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 rounded-full bg-gradient-to-tr from-slate-950 via-blue-900 to-blue-600 shadow-2xl shadow-black/90 z-10 animate-float pointer-events-none"
          >
            <div className="absolute top-2 left-4 w-8 sm:w-12 h-5 sm:h-8 rounded-full bg-white/20 blur-sm transform -rotate-45" />
          </div>

          {/* Giant Impact Typography ("STUD / OS") - Clean, High-Contrast, Non-Neon */}
          <div
            style={{
              transform: `perspective(1000px) rotateX(${mousePos.y * -6}deg) rotateY(${mousePos.x * 6}deg)`,
              transition: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
            className="relative z-30 flex flex-col items-center justify-center select-none pointer-events-none"
          >
            {/* STUD - Pure Platinum White */}
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-none text-white drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              STUD
            </h1>
            {/* OS - Matte Spider Crimson to Web Cobalt */}
            <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-500 to-blue-500 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              OS
            </h1>
          </div>

        </div>

        {/* Subtitle & Mission Statement */}
        <p className="mt-4 text-xs sm:text-sm font-mono text-slate-400 uppercase tracking-widest max-w-md">
          Student Operating System // Spider Core
        </p>

        {/* Hero CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 z-40 relative">
          <Link
            href="/opportunities"
            className="btn-pill-white shadow-lg shadow-black/40 hover:scale-[1.02] transition-transform flex items-center gap-2"
          >
            <span>Explore Opportunities</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/ideas/submit"
            className="btn-pill-glass hover:border-white/20 transition-colors"
          >
            <span>Submit an Idea</span>
          </Link>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: NUMBERS SPEAK FOR US (Translucent with visible background animation)
          ========================================================================= */}
      <section className="py-20 relative border-t border-white/5 bg-[#06080F]/45 backdrop-blur-[2px]">
        <div className="container-s text-center">

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mb-3">
            Numbers Speak for Us
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-14 leading-relaxed font-normal">
            We design attention-grabbing, user-friendly resources and pathways that help engineering students achieve their career goals.
          </p>

          {/* 4 Stat Glass Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className="card-stat-glass p-8 flex flex-col items-center justify-center group"
              >
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 group-hover:scale-105 transition-transform duration-300">
                  {item.number}
                </span>

                {/* Thin Vertical Divider */}
                <div className="w-px h-8 bg-white/20 mb-4 group-hover:bg-red-500 transition-colors" />

                <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: OUR PROCESS / 3 STEP SPHERES (Replicating Screenshot 3)
          ========================================================================= */}
      <section id="process" className="py-24 relative border-t border-white/5 bg-transparent">
        <div className="container-s text-center">

          <h2 className="heading-gold text-2xl sm:text-4xl tracking-wider uppercase mb-3">
            Our Process
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-16 leading-relaxed">
            We are guided by clear and simple cooperation for student builders. Here's how you can start leveling up:
          </p>

          {/* 3 Step Spheres Grid (Screenshot 3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14 mb-16">
            {processSteps.map((step) => (
              <Link
                key={step.num}
                href={step.href}
                className="group flex flex-col items-center text-center transition-all"
              >
                {/* Glowing Numbered Sphere Container */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 mb-6 flex items-center justify-center">

                  {/* Outer Dust Burst Background */}
                  <div className={`absolute inset-0 rounded-full ${step.dustColor} blur-xl group-hover:scale-110 transition-transform duration-500`} />

                  {/* Main 3D Sphere */}
                  <div className={`relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr ${step.color} ${step.glow} shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>

                    {/* Top Specular Highlight */}
                    <div className="absolute top-2 left-4 w-12 h-6 rounded-full bg-white/40 blur-xs transform -rotate-45" />

                    {/* Big Step Number */}
                    <span className="text-6xl sm:text-7xl font-black text-white select-none drop-shadow-md">
                      {step.num}
                    </span>
                  </div>

                </div>

                <h3 className="heading-gold text-xl font-bold mb-2 group-hover:text-white transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xs leading-relaxed">
                  {step.desc}
                </p>
              </Link>
            ))}
          </div>

          {/* Process Bottom CTA Pills (Screenshot 3) */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/career" className="btn-pill-glass">
              <span>Learn More</span>
            </Link>
            <Link href="/ideas" className="btn-pill-white">
              <span>Join a Squad</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: 4-YEAR JOURNEY & TIMELINE (Translucent with visible background animation)
          ========================================================================= */}
      <section className="py-24 relative border-t border-white/5 bg-[#06080F]/50 backdrop-blur-[2px]">

        {/* Cosmic Mountain Landscape Atmosphere */}
        <div className="container-s">

          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-indigo-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2">
              We are sure that your college career has just started,
            </p>
            <h2 className="heading-gold text-2xl sm:text-4xl tracking-wider uppercase mb-3">
              4-Year Engineering Journey
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Your most prominent achievements are still ahead. Follow the curated milestones across your degree:
            </p>
          </div>

          {/* Concentric Timeline Rows (Screenshot 4) */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="card-cosmic p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group hover:border-pink-500/40"
              >
                {/* Left Concentric Circle Ring (Screenshot 4) */}
                <div className="flex items-center gap-5 shrink-0">
                  <div className="concentric-ring shrink-0">
                    <span className="text-xs font-extrabold text-white tracking-wide">
                      {m.year}
                    </span>
                  </div>

                  {/* Milestone Title */}
                  <div className="md:w-44">
                    <h3 className="heading-gold text-base sm:text-lg font-bold">
                      {m.title}
                    </h3>
                  </div>
                </div>

                {/* Milestone Description */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {m.desc}
                  </p>
                </div>

                {/* Milestone Tag / Location */}
                <div className="shrink-0 text-left md:text-right">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-pink-300">
                    {m.location}
                  </span>
                </div>

              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/roadmap" className="btn-pill-white">
              <span>View Full Interactive Roadmap</span>
              <ArrowRight size={15} />
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FEATURED INNOVATIONS & PROJECTS SHOWCASE (REFERENCE IMAGE)
          ========================================================================= */}
      <ProjectShowcase />

      {/* =========================================================================
          SECTION 6: LIVE OPPORTUNITIES & RESOURCES PREVIEW
          ========================================================================= */}
      <section className="py-20 border-t border-white/5 bg-transparent">
        <div className="container-s">

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="heading-gold text-xs uppercase tracking-widest block mb-1">
                Verified Portal
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Active Student Opportunities
              </h2>
            </div>
            <Link href="/opportunities" className="btn-secondary text-xs">
              <span>Browse All 150+ Listings</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Opportunities Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {recentOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="card-cosmic p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      {opp.type}
                    </span>
                    <span className="text-xs font-semibold text-amber-300">
                      {opp.deadline}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-pink-400 transition-colors mb-1.5">
                    {opp.title}
                  </h3>
                  <p className="text-xs text-slate-400 mb-4">
                    {opp.organization} · {opp.mode}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {opp.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-white/5 text-slate-300 border border-white/10">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-bold text-cyan-400">
                    {opp.reward}
                  </span>
                  <Link href="/opportunities" className="text-white font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Details</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Floating Back to Top Button (Matching Screenshot) */}
      <BackToTop />

    </div>
  );
}