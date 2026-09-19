'use client';

import React, { useState } from 'react';
import { Briefcase, Trophy, GraduationCap, ArrowRight } from 'lucide-react';

interface HeroNetworkProps {
  onSelectCategory: (category: string) => void;
}

export function HeroNetwork({ onSelectCategory }: HeroNetworkProps) {
  const [hoveredPanel, setHoveredPanel] = useState<'internship' | 'hackathon' | 'scholarship' | null>(null);

  const handleCategoryClick = (category: string) => {
    onSelectCategory(category);
    const target = document.getElementById('explore-opportunities');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto pt-2 pb-12 px-2 sm:px-4 select-none overflow-hidden">

      {/* ── TOP CENTER TAGLINE ── */}
      <div className="flex items-center justify-center mb-6 sm:mb-8">
        <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.35em] text-slate-400/90 uppercase">
          EXPLORE &nbsp;•&nbsp; BUILD &nbsp;•&nbsp; GROW
        </span>
      </div>

      {/* ── AMBIENT BACKGROUND BOKEH & GLOWS ── */}
      <div className="absolute -left-20 top-1/3 w-64 h-64 rounded-full bg-pink-600/15 blur-3xl pointer-events-none" />
      <div className="absolute -right-20 top-1/4 w-72 h-72 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* ── AMBIENT TYPOGRAPHY & WATERMARKS (Reference Image) ── */}
      {/* Left Ambient Side Copy */}
      <div className="hidden xl:flex flex-col items-start absolute left-2 top-[38%] text-[10px] font-mono tracking-[0.25em] text-slate-500/80 leading-loose pointer-events-none z-0">
        <span className="w-6 h-[1.5px] bg-pink-500/60 mb-3" />
        <p>BETTER</p>
        <p>OPPORTUNITIES</p>
        <p>BRIGHTER</p>
        <p>TOMORROW</p>
      </div>

      {/* Right Ambient Side Copy */}
      <div className="hidden xl:flex flex-col items-end absolute right-2 top-[38%] text-[10px] font-mono tracking-[0.25em] text-slate-500/80 leading-loose pointer-events-none z-0 text-right">
        <span className="w-6 h-[1.5px] bg-purple-500/60 mb-3" />
        <p>LEARN</p>
        <p>COMPETE</p>
        <p>RESEARCH</p>
        <p>GROW</p>
      </div>

      {/* ── MAIN TRIANGULAR NETWORK GRID ── */}
      <div className="relative w-full min-h-[700px] lg:h-[680px]">

        {/* ── SVG CONNECTING CONDUITS & ORBITAL RINGS ── */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block"
          viewBox="0 0 1200 680"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Pink Conduit Gradient */}
            <linearGradient id="pinkConduit" x1="600" y1="280" x2="380" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EC4899" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
            </linearGradient>
            {/* Purple Conduit Gradient */}
            <linearGradient id="purpleConduit" x1="600" y1="280" x2="820" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0.2" />
            </linearGradient>
            {/* Amber Conduit Gradient */}
            <linearGradient id="amberConduit" x1="600" y1="280" x2="600" y2="440" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
            </linearGradient>

            {/* Glowing filter for nodes */}
            <filter id="glowPink" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowPurple" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="glowAmber" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Faint Orbital Circles around center (600, 275) */}
          <circle cx="600" cy="275" r="150" stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="600" cy="275" r="185" stroke="#ffffff" strokeOpacity="0.03" strokeWidth="1" />
          <circle cx="600" cy="275" r="230" stroke="#ffffff" strokeOpacity="0.02" strokeWidth="1" strokeDasharray="6 6" />

          {/* Conduit 1: Center -> Top Left Panel */}
          <path
            d="M 520 235 Q 440 190 380 180"
            stroke="url(#pinkConduit)"
            strokeWidth={hoveredPanel === 'internship' ? '3' : '2'}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
          {/* Conduit 2: Center -> Top Right Panel */}
          <path
            d="M 680 235 Q 760 190 820 180"
            stroke="url(#purpleConduit)"
            strokeWidth={hoveredPanel === 'hackathon' ? '3' : '2'}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
          {/* Conduit 3: Center -> Bottom Center Panel */}
          <path
            d="M 600 375 L 600 440"
            stroke="url(#amberConduit)"
            strokeWidth={hoveredPanel === 'scholarship' ? '3' : '2'}
            strokeLinecap="round"
            className="transition-all duration-300"
          />

          {/* Junction Node Pink (Top Left Connection) */}
          <g filter="url(#glowPink)">
            <circle cx="475" cy="205" r="8" fill="#EC4899" />
            <circle cx="475" cy="205" r="12" fill="#EC4899" fillOpacity="0.25" className="animate-ping" style={{ animationDuration: '3s' }} />
            <circle cx="475" cy="205" r="3.5" fill="#FFFFFF" />
          </g>

          {/* Junction Node Purple (Top Right Connection) */}
          <g filter="url(#glowPurple)">
            <circle cx="725" cy="205" r="8" fill="#A855F7" />
            <circle cx="725" cy="205" r="12" fill="#A855F7" fillOpacity="0.25" className="animate-ping" style={{ animationDuration: '3.4s' }} />
            <circle cx="725" cy="205" r="3.5" fill="#FFFFFF" />
          </g>

          {/* Junction Node Amber (Bottom Connection) */}
          <g filter="url(#glowAmber)">
            <circle cx="600" cy="405" r="8" fill="#F59E0B" />
            <circle cx="600" cy="405" r="12" fill="#F59E0B" fillOpacity="0.25" className="animate-ping" style={{ animationDuration: '3.2s' }} />
            <circle cx="600" cy="405" r="3.5" fill="#FFFFFF" />
          </g>
        </svg>

        {/* ── 1. TOP-LEFT PANEL: INTERNSHIPS (01) ── */}
        <div
          onMouseEnter={() => setHoveredPanel('internship')}
          onMouseLeave={() => setHoveredPanel(null)}
          onClick={() => handleCategoryClick('Internship')}
          className={`
            lg:absolute lg:top-0 lg:left-4 xl:left-8 w-full lg:w-[460px]
            rounded-3xl p-6 sm:p-7 backdrop-blur-xl cursor-pointer transition-all duration-300 group
            bg-[#13081A]/80 border cyber-hud-card
            ${hoveredPanel === 'internship'
              ? 'border-pink-500/60 shadow-[0_0_30px_rgba(236,72,153,0.25)] -translate-y-1 scale-[1.01]'
              : 'border-white/10 hover:border-white/20 shadow-none'}
            mb-6 lg:mb-0 z-20 overflow-hidden
          `}
        >
          {/* Holographic Laser Sweep Line */}
          <div className="holo-scanner-sweep" />

          {/* Subtle Ambient Top-Left Highlight */}
          <div className="absolute -top-12 -left-12 w-36 h-36 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Header Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.25)] group-hover:scale-105 transition-transform">
              <Briefcase size={20} />
            </div>
            <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 font-mono text-xs font-bold">
              01
            </span>
          </div>

          {/* Body Content & 3D Illustration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Left Content */}
            <div className="sm:col-span-7">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-pink-100 transition-colors">
                Internships
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                Gain real-world experience with curated internships from top companies and startups.
              </p>

              {/* Button */}
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-pink-500/40 bg-pink-500/10 hover:bg-pink-500/25 text-white text-xs font-semibold transition-all group-hover:border-pink-400"
              >
                <span>Explore Internships</span>
                <ArrowRight size={13} className="text-pink-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Right 3D Stepped Briefcase Illustration */}
            <div className="sm:col-span-5 flex items-center justify-center pt-2 sm:pt-0">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* 3D Isometric Stepped Staircase with Glowing Briefcase */}
                <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_10px_20px_rgba(236,72,153,0.3)]">
                  {/* Step 1 (Bottom) */}
                  <path d="M 30 115 L 70 135 L 110 115 L 70 95 Z" fill="#2E0E32" stroke="#EC4899" strokeWidth="1" strokeOpacity="0.4" />
                  <path d="M 30 115 L 30 125 L 70 145 L 70 135 Z" fill="#1C0920" />
                  <path d="M 70 135 L 70 145 L 110 125 L 110 115 Z" fill="#240B27" />

                  {/* Step 2 (Middle) */}
                  <path d="M 50 95 L 85 112 L 120 95 L 85 78 Z" fill="#421447" stroke="#EC4899" strokeWidth="1" strokeOpacity="0.6" />
                  <path d="M 50 95 L 50 105 L 85 122 L 85 112 Z" fill="#2C0C30" />
                  <path d="M 85 112 L 85 122 L 120 105 L 120 95 Z" fill="#360E3B" />

                  {/* 3D Glowing Briefcase on top */}
                  <g className="group-hover:-translate-y-1 transition-transform duration-300">
                    <rect x="70" y="55" width="46" height="34" rx="5" fill="url(#pinkBagGrad)" stroke="#F472B6" strokeWidth="1.5" />
                    {/* Handle */}
                    <path d="M 85 55 L 85 47 Q 93 43 101 47 L 101 55" fill="none" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />
                    {/* Center lock / latch */}
                    <circle cx="93" cy="72" r="3" fill="#FFFFFF" />
                    <line x1="70" y1="68" x2="116" y2="68" stroke="#F472B6" strokeWidth="1" strokeOpacity="0.5" />
                  </g>

                  {/* Floating "INTERN" Tag Pill */}
                  <g className="animate-bounce" style={{ animationDuration: '4s' }}>
                    <rect x="90" y="24" width="50" height="18" rx="9" fill="#1E0724" stroke="#EC4899" strokeWidth="1.2" />
                    <text x="115" y="36" fill="#F472B6" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                      INTERN
                    </text>
                  </g>

                  <defs>
                    <linearGradient id="pinkBagGrad" x1="70" y1="55" x2="116" y2="89" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#F43F5E" />
                      <stop offset="100%" stopColor="#9D174D" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Supporting Tags */}
          <div className="mt-5 pt-3 border-t border-white/5 flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium">
              Industry Exposure
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium">
              Skill Growth
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium">
              Career Ready
            </span>
          </div>
        </div>

        {/* ── 2. TOP-RIGHT PANEL: HACKATHONS & COMPETITIONS (02) ── */}
        <div
          onMouseEnter={() => setHoveredPanel('hackathon')}
          onMouseLeave={() => setHoveredPanel(null)}
          onClick={() => handleCategoryClick('Hackathon')}
          className={`
            lg:absolute lg:top-0 lg:right-4 xl:right-8 w-full lg:w-[460px]
            rounded-3xl p-6 sm:p-7 backdrop-blur-xl cursor-pointer transition-all duration-300 group
            bg-[#0F0820]/80 border cyber-hud-card
            ${hoveredPanel === 'hackathon'
              ? 'border-purple-500/60 shadow-[0_0_30px_rgba(168,85,247,0.25)] -translate-y-1 scale-[1.01]'
              : 'border-white/10 hover:border-white/20 shadow-none'}
            mb-6 lg:mb-0 z-20 overflow-hidden
          `}
        >
          {/* Holographic Laser Sweep Line */}
          <div className="holo-scanner-sweep" />

          {/* Subtle Ambient Top-Right Highlight */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Header Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.25)] group-hover:scale-105 transition-transform">
              <Trophy size={20} />
            </div>
            <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-xs font-bold">
              02
            </span>
          </div>

          {/* Body Content & 3D Illustration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Left Content */}
            <div className="sm:col-span-7">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-purple-100 transition-colors">
                Hackathons and Competitions
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                Participate in hackathons, coding contests and innovation challenges to showcase your skills.
              </p>

              {/* Button */}
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/25 text-white text-xs font-semibold transition-all group-hover:border-purple-400"
              >
                <span>Explore Events</span>
                <ArrowRight size={13} className="text-purple-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Right 3D Trophy Podium Illustration */}
            <div className="sm:col-span-5 flex items-center justify-center pt-2 sm:pt-0">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* 3D Isometric Trophy & Code Symbol */}
                <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_10px_20px_rgba(168,85,247,0.3)]">
                  {/* Podium Base Block */}
                  <path d="M 45 110 L 80 128 L 115 110 L 80 92 Z" fill="#2A1448" stroke="#A855F7" strokeWidth="1" strokeOpacity="0.4" />
                  <path d="M 45 110 L 45 132 L 80 150 L 80 128 Z" fill="#180A2C" />
                  <path d="M 80 128 L 80 150 L 115 132 L 115 110 Z" fill="#200E3A" />

                  {/* Embossed "</>" on podium face */}
                  <text x="80" y="143" fill="#C084FC" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    &lt;/&gt;
                  </text>

                  {/* 3D Glowing Purple Trophy */}
                  <g className="group-hover:-translate-y-1 transition-transform duration-300">
                    {/* Cup Base & Stem */}
                    <path d="M 72 90 L 88 90 L 84 76 L 76 76 Z" fill="#7E22CE" />
                    <rect x="70" y="89" width="20" height="3.5" rx="1.5" fill="#A855F7" />
                    {/* Trophy Cup */}
                    <path d="M 64 52 Q 64 74 80 76 Q 96 74 96 52 Z" fill="url(#purpleCupGrad)" stroke="#C084FC" strokeWidth="1.2" />
                    {/* Handles */}
                    <path d="M 64 56 C 54 56 54 68 66 69" fill="none" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" />
                    <path d="M 96 56 C 106 56 106 68 94 69" fill="none" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" />
                    {/* Star in cup */}
                    <polygon points="80,57 82,62 87,62 83,65 85,70 80,67 75,70 77,65 73,62 78,62" fill="#FFFFFF" />
                  </g>

                  {/* Floating Badges: IDEAS, PEOPLE, IMPACT */}
                  <g className="animate-pulse" style={{ animationDuration: '3.5s' }}>
                    <rect x="96" y="24" width="46" height="15" rx="7.5" fill="#1C0D34" stroke="#A855F7" strokeWidth="1" />
                    <text x="119" y="34" fill="#C084FC" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                      IDEAS
                    </text>
                    <rect x="98" y="42" width="48" height="15" rx="7.5" fill="#1C0D34" stroke="#A855F7" strokeWidth="1" />
                    <text x="122" y="52" fill="#C084FC" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                      PEOPLE
                    </text>
                    <rect x="94" y="60" width="52" height="15" rx="7.5" fill="#1C0D34" stroke="#A855F7" strokeWidth="1" />
                    <text x="120" y="70" fill="#C084FC" fontSize="7" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                      IMPACT
                    </text>
                  </g>

                  <defs>
                    <linearGradient id="purpleCupGrad" x1="64" y1="52" x2="96" y2="76" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#A855F7" />
                      <stop offset="100%" stopColor="#6B21A8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Supporting Tags */}
          <div className="mt-5 pt-3 border-t border-white/5 flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium">
              Build Solutions
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium">
              Win Recognition
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium">
              Network
            </span>
          </div>
        </div>

        {/* ── 3. CENTRAL CIRCLE: "OPPORTUNITIES FOR YOU" WITH 3D GYRO RINGS ── */}
        <div className="relative my-8 lg:my-0 lg:absolute lg:top-[140px] lg:left-1/2 lg:-translate-x-1/2 z-30 flex items-center justify-center perspective-1000">

          {/* 3D Gyro Orbit 1 (Cyan) */}
          <div className="absolute w-72 h-72 sm:w-84 sm:h-84 rounded-full border border-cyan-400/30 border-dashed gyro-ring-1 pointer-events-none" />

          {/* 3D Gyro Orbit 2 (Purple) */}
          <div className="absolute w-64 h-64 sm:w-76 sm:h-76 rounded-full border border-purple-500/30 gyro-ring-2 pointer-events-none" />

          {/* Outer Multi-Color Atmospheric Rim Glow */}
          <div className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-amber-500/20 via-purple-600/30 to-pink-500/30 blur-xl pointer-events-none animate-pulse-glow" />

          {/* Central Sphere Orb */}
          <div
            className={`
              relative w-56 h-56 sm:w-68 sm:h-68 rounded-full
              bg-[radial-gradient(circle_at_40%_35%,_#1C1434_0%,_#0E0A1E_50%,_#070512_100%)]
              border border-white/15
              shadow-[inset_0_2px_20px_rgba(255,255,255,0.1),_0_0_40px_rgba(0,0,0,0.8)]
              flex flex-col items-center justify-center text-center p-6
              transition-all duration-500 hover:scale-105 cursor-pointer
              ${hoveredPanel === 'internship' ? 'ring-2 ring-pink-500/60 shadow-[0_0_35px_rgba(236,72,153,0.4)]' : ''}
              ${hoveredPanel === 'hackathon' ? 'ring-2 ring-purple-500/60 shadow-[0_0_35px_rgba(168,85,247,0.4)]' : ''}
              ${hoveredPanel === 'scholarship' ? 'ring-2 ring-amber-500/60 shadow-[0_0_35px_rgba(245,158,11,0.4)]' : ''}
            `}
          >
            {/* Ambient Center Rim Highlights */}
            <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />

            {/* Opportunities For You */}
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
              Opportunities
            </h2>
            <div className="text-xl sm:text-2xl font-bold tracking-tight mb-3">
              <span className="text-[#F59E0B]">for </span>
              <span className="text-[#C084FC]">You</span>
            </div>

            {/* Subtle Divider Line */}
            <div className="w-10 h-[1px] bg-white/20 mb-3" />

            {/* Secondary Copy */}
            <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.22em] text-cyan-300 uppercase">
              EXPLORE TODAY
            </p>
            <p className="text-[9px] sm:text-[10px] font-mono tracking-[0.22em] text-purple-300 uppercase">
              BUILD TOMORROW
            </p>
          </div>
        </div>

        {/* ── 4. BOTTOM-CENTER PANEL: SCHOLARSHIPS & RESEARCH (03) ── */}
        <div
          onMouseEnter={() => setHoveredPanel('scholarship')}
          onMouseLeave={() => setHoveredPanel(null)}
          onClick={() => handleCategoryClick('Scholarship')}
          className={`
            lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 w-full lg:w-[500px]
            rounded-3xl p-6 sm:p-7 backdrop-blur-xl cursor-pointer transition-all duration-300 group
            bg-[#170E04]/80 border cyber-hud-card
            ${hoveredPanel === 'scholarship'
              ? 'border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.25)] -translate-y-1 scale-[1.01]'
              : 'border-white/10 hover:border-white/20 shadow-none'}
            z-20 overflow-hidden
          `}
        >
          {/* Holographic Laser Sweep Line */}
          <div className="holo-scanner-sweep" />

          {/* Subtle Ambient Bottom Highlight */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

          {/* Header Row */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] group-hover:scale-105 transition-transform">
              <GraduationCap size={20} />
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-xs font-bold">
              03
            </span>
          </div>

          {/* Body Content & 3D Illustration Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Left Content */}
            <div className="sm:col-span-7">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-amber-100 transition-colors">
                Scholarships and Research
              </h3>
              <p className="mt-2 text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                Discover scholarships and research opportunities to support your academic and innovation journey.
              </p>

              {/* Button */}
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/25 text-white text-xs font-semibold transition-all group-hover:border-amber-400"
              >
                <span>Explore Opportunities</span>
                <ArrowRight size={13} className="text-amber-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Right 3D Books & Magnifying Glass Illustration */}
            <div className="sm:col-span-5 flex items-center justify-center pt-2 sm:pt-0">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* 3D Academic Books & Magnifier */}
                <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_10px_20px_rgba(245,158,11,0.3)]">
                  {/* Book 1 (Bottom Book) */}
                  <path d="M 30 115 L 75 130 L 120 115 L 75 100 Z" fill="#582C0E" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.4" />
                  <path d="M 30 115 L 30 125 L 75 140 L 75 130 Z" fill="#2E1708" />
                  <path d="M 75 130 L 75 140 L 120 125 L 120 115 Z" fill="#42200A" />

                  {/* Book 2 (Top Book) */}
                  <path d="M 32 100 L 75 115 L 118 100 L 75 85 Z" fill="#78350F" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.6" />
                  <path d="M 32 100 L 32 110 L 75 125 L 75 115 Z" fill="#3D1A04" />
                  <path d="M 75 115 L 75 125 L 118 110 L 118 100 Z" fill="#522406" />

                  {/* 3D Glowing Magnifying Glass */}
                  <g className="group-hover:-translate-y-1 transition-transform duration-300">
                    {/* Handle */}
                    <line x1="95" y1="95" x2="115" y2="115" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
                    {/* Glass rim */}
                    <circle cx="85" cy="85" r="16" fill="#F59E0B" fillOpacity="0.2" stroke="#FCD34D" strokeWidth="2.5" />
                    {/* Lens reflection */}
                    <path d="M 76 80 A 10 10 0 0 1 88 74" fill="none" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                  </g>

                  {/* Research Certificate / Document with "RESEARCH LEARN INNOVATE" */}
                  <g className="animate-pulse" style={{ animationDuration: '4s' }}>
                    <rect x="85" y="24" width="55" height="42" rx="4" fill="#241407" stroke="#F59E0B" strokeWidth="1.2" />
                    <line x1="92" y1="32" x2="132" y2="32" stroke="#FCD34D" strokeWidth="1.5" />
                    <line x1="92" y1="38" x2="124" y2="38" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.7" />
                    <line x1="92" y1="44" x2="130" y2="44" stroke="#F59E0B" strokeWidth="1" strokeOpacity="0.7" />
                    {/* Tiny badge inside document */}
                    <circle cx="125" cy="55" r="5" fill="#F59E0B" />
                    <polygon points="125,52 126,55 129,55 127,57 128,60 125,58 122,60 123,57 121,55 124,55" fill="#241407" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Supporting Tags */}
          <div className="mt-5 pt-3 border-t border-white/5 flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium">
              Fund Your Dreams
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium">
              Work with Experts
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-slate-300 font-medium">
              Make an Impact
            </span>
          </div>
        </div>

      </div>

      {/* ── BOTTOM WATERMARKS (Reference Image) ── */}
      <div className="mt-8 pt-4 flex items-center justify-between text-[10px] font-mono tracking-widest text-slate-500/80 px-2">
        <div className="flex items-center gap-2">
          {/* StudOS 4-petal glyph */}
          <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5 opacity-60">
            <span className="w-1.5 h-1.5 rounded-sm bg-slate-400" />
            <span className="w-1.5 h-1.5 rounded-sm bg-pink-400" />
            <span className="w-1.5 h-1.5 rounded-sm bg-purple-400" />
            <span className="w-1.5 h-1.5 rounded-sm bg-amber-400" />
          </div>
          <span>STUDOS &nbsp;/&nbsp; FOR A BRIGHTER TOMORROW</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="w-8 h-[1px] bg-slate-700" />
          <span>ALL OPPORTUNITIES. ONE PLATFORM.</span>
        </div>
      </div>

    </section>
  );
}
