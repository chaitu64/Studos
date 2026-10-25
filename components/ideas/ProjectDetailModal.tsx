import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  X,
  Users,
  CheckCircle2,
  Share2,
  ExternalLink,
  Code2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Calendar,
  GraduationCap
} from 'lucide-react';
import type { Idea } from '@/types/idea';

interface ProjectDetailModalProps {
  project: Idea | null;
  isOpen: boolean;
  onClose: () => void;
  meta: {
    imageUrl: string;
    tag: string;
    category: string;
    track: string;
  };
}

export function ProjectDetailModal({
  project,
  isOpen,
  onClose,
  meta
}: ProjectDetailModalProps) {
  const [joinState, setJoinState] = useState<'idle' | 'transmitting' | 'joined'>('idle');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !project) return null;

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(`${window.location.origin}/ideas/${project.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleJoinSquad = () => {
    setJoinState('transmitting');
    setTimeout(() => {
      setJoinState('joined');
    }, 850);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
      {/* Click outside backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Solid Detail Card with Cyber HUD corners & Scale-in animation */}
      <div className="cyber-hud-card group relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#090D24] border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] z-10 scrollbar-none flex flex-col animate-scale-in">
        
        {/* Top Floating Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white/20 hover:scale-110 flex items-center justify-center backdrop-blur-md transition-all shadow-lg"
        >
          <X size={18} />
        </button>

        {/* Hero Visual Header with Laser Sweep */}
        <div className="relative w-full h-56 sm:h-72 overflow-hidden shrink-0 bg-slate-950">
          <Image
            src={meta.imageUrl}
            alt={project.title}
            fill
            className="object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Hologram Laser Scanner Sweep */}
          <div className="holo-scanner-sweep opacity-100" />

          {/* Multi-stop gradient for readable overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090D24] via-[#090D24]/40 to-transparent flex flex-col justify-end p-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                {meta.tag}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-sm shadow-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {project.status || 'Active Project'}
              </span>
              <span className="ml-auto text-[11px] font-mono uppercase tracking-widest text-cyan-300 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/30 backdrop-blur-md hidden sm:inline">
                {meta.track}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          
          {/* Creator & Academic Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                {project.creator.charAt(0)}
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{project.creator}</span>
                  <span className="text-xs font-normal text-slate-400">· Project Lead</span>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                  <span className="text-purple-300 font-semibold">{project.branch}</span>
                  <span>•</span>
                  <span>Year {project.year}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30 px-3.5 py-1.5 rounded-xl">
              <Users size={14} className="text-blue-400" />
              <span>Squad: {project.teamSize}/{project.teamTarget} Members</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2 flex items-center gap-1.5">
              <Sparkles size={13} />
              <span>PROJECT BRIEF & OVERVIEW</span>
            </h4>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technologies Stack */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Code2 size={13} className="text-cyan-400" />
              <span>TECHNOLOGY STACK</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-white/[0.05] border border-white/10 text-slate-200 hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all hover:scale-105"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Team Roster & Open Roles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Team Roster */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5 hover:border-white/20 transition-colors">
              <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>ACTIVE TEAM</span>
                <span className="text-xs text-slate-400 font-mono">{project.teamMembers.length} listed</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300">
                {project.teamMembers.map((m, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span className="font-semibold text-white">{m.name}</span>
                    <span className="text-slate-400 text-[11px] bg-white/5 px-2 py-0.5 rounded-md">
                      {m.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Open Roles */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5 hover:border-purple-500/30 transition-colors">
              <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                <Sparkles size={12} />
                <span>RECRUITING TALENT</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {project.lookingFor.length > 0 ? (
                  project.lookingFor.map((role) => (
                    <span
                      key={role}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:scale-105 transition-transform"
                    >
                      {role}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-400">Team is fully staffed.</span>
                )}
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="cyber-btn-interactive px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
              >
                <Share2 size={14} className={copied ? 'text-emerald-400' : ''} />
                <span className={copied ? 'text-emerald-300 font-bold animate-pop-burst' : ''}>
                  {copied ? 'Link Copied! ✓' : 'Share'}
                </span>
              </button>

              <Link
                href={`/ideas/${project.id}`}
                className="cyber-btn-interactive px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5 group"
              >
                <span>Full Spec Page</span>
                <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Primary Join Action with Interactive Feedback */}
            {joinState === 'joined' ? (
              <div className="animate-pop-burst px-5 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 size={16} className="text-emerald-400 animate-bounce" />
                <span>Squad Request Dispatched to {project.creator} ✓</span>
              </div>
            ) : joinState === 'transmitting' ? (
              <div className="px-6 py-2.5 rounded-xl bg-cyan-600/30 border border-cyan-400 text-cyan-200 text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/30 laser-progress-bar">
                <span className="w-3.5 h-3.5 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin" />
                <span>Connecting to Squad Network...</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleJoinSquad}
                className="cyber-btn-interactive px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-blue-500/30 flex items-center gap-2"
              >
                <Users size={15} />
                <span>Join Project Squad</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
