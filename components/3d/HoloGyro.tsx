"use client";

import React, { useState } from 'react';
import { Orbit, Cpu, Sparkles, Activity } from 'lucide-react';

interface HoloGyroProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
}

export function HoloGyro({ size = 'md', className = '', label = 'NEURAL ENGINE' }: HoloGyroProps) {
  const [hovered, setHovered] = useState(false);

  const dimensions = {
    sm: 'w-48 h-48',
    md: 'w-72 h-72',
    lg: 'w-96 h-96',
  }[size];

  const ringSizes = {
    sm: ['w-44 h-44', 'w-36 h-36', 'w-28 h-28'],
    md: ['w-64 h-64', 'w-52 h-52', 'w-40 h-40'],
    lg: ['w-88 h-88', 'w-72 h-72', 'w-56 h-56'],
  }[size];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative flex items-center justify-center ${dimensions} perspective-1000 group cursor-pointer ${className}`}
    >
      {/* 3D Gyro Rig */}
      <div
        className={`relative w-full h-full flex items-center justify-center preserve-3d transition-transform duration-700 ${hovered ? 'scale-110' : 'scale-100'
          }`}
      >
        {/* Ring 1 - Outer Cyan Orbit */}
        <div
          className={`absolute ${ringSizes[0]} rounded-full border border-cyan-400/40 border-dashed gyro-ring-1 transition-colors group-hover:border-cyan-400 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]`}
        >
          {/* Micro satellite node on Ring 1 */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] animate-ping" />
        </div>

        {/* Ring 2 - Middle Magenta/Purple Orbit */}
        <div
          className={`absolute ${ringSizes[1]} rounded-full border border-purple-500/40 gyro-ring-2 transition-colors group-hover:border-purple-400 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]`}
        >
          {/* Micro satellite node on Ring 2 */}
          <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-pink-400 shadow-[0_0_10px_#f472b6]" />
        </div>

        {/* Ring 3 - Inner Pink Orbit */}
        <div
          className={`absolute ${ringSizes[2]} rounded-full border border-pink-400/30 border-dotted gyro-ring-3 transition-colors group-hover:border-pink-400`}
        />

        {/* Core Luminous Energy Sphere */}
        <div className="relative z-20 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 via-purple-600 to-cyan-400 p-0.5 shadow-[0_0_35px_rgba(139,92,246,0.6)] animate-pulse-glow">
            <div className="w-full h-full rounded-full bg-[#070A1E]/80 backdrop-blur-md flex items-center justify-center text-white">
              <Cpu size={24} className="text-cyan-300 animate-spin-slow" />
            </div>
          </div>

          {/* Hologram Telemetry Tag */}
          <div className="mt-3 text-center">
            <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest uppercase bg-white/10 text-cyan-300 border border-cyan-400/30 shadow-[0_0_12px_rgba(6,182,212,0.2)]">
              {label}
            </span>
          </div>
        </div>

        {/* Cyber Reticle Targets (Four Corners) */}
        <div className="absolute inset-2 border border-white/5 rounded-2xl pointer-events-none">
          <div className="absolute top-1 left-1 text-[8px] font-mono text-slate-500">SYS.CAL_99%</div>
          <div className="absolute bottom-1 right-1 text-[8px] font-mono text-cyan-400/70 flex items-center gap-1">
            <Activity size={10} className="animate-pulse" /> 60 FPS
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoloGyro;
