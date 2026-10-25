'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Users,
  CheckCircle2,
  Sparkles,
  Share2,
  Code2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Calendar,
  GraduationCap
} from 'lucide-react';
import { ideas } from '../../../data/ideas';
import type { Idea } from '../../../types/idea';

const PROJECT_VISUAL_MAP: Record<string, { imageUrl: string; tag: string; track: string }> = {
  'smart-campus-energy': {
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    tag: 'IoT System',
    track: 'IOT',
  },
  'ai-resume-analyzer': {
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    tag: 'Web Platform',
    track: 'WEB',
  },
  'sign-language-translator': {
    imageUrl: 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?q=80&w=800&auto=format&fit=crop',
    tag: 'AI Vision App',
    track: 'APP',
  },
  'smart-agriculture-monitor': {
    imageUrl: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=800&auto=format&fit=crop',
    tag: 'Smart Hardware',
    track: 'IOT',
  },
  'campus-safety-assistant': {
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    tag: 'Security Dashboard',
    track: 'WEB',
  },
  'campus-navigation-assistant': {
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop',
    tag: 'Mobile App',
    track: 'APP',
  },
  'project-titanium': {
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    tag: 'UI/UX Design',
    track: 'DESIGN',
  },
  'ecotrack': {
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    tag: 'Mobile App',
    track: 'APP',
  },
  'campusconnect': {
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    tag: 'Web Platform',
    track: 'WEB',
  },
  'hostel-mess-waste-tracker': {
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tag: 'Telemetry Web App',
    track: 'WEB',
  },
  'exam-slot-swapper': {
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    tag: 'Web App',
    track: 'WEB',
  },
  '3d-campus-virtual-tour': {
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    tag: 'Creative Suite',
    track: 'DESIGN',
  },
  'mental-health-pulse': {
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    tag: 'Mobile App',
    track: 'APP',
  },
  'alumni-connect-network': {
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop',
    tag: 'Web Platform',
    track: 'WEB',
  },
};

export default function IdeaDetailPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const [joinState, setJoinState] = useState<'idle' | 'transmitting' | 'joined'>('idle');
  const [copied, setCopied] = useState(false);

  const project: Idea = useMemo(() => {
    return ideas.find((item) => item.id === id) || {
      id: id || 'custom-idea',
      title: 'Student Innovation Project',
      description: 'An active student technical initiative building novel solutions on campus.',
      creator: 'Campus Student',
      branch: 'CSE',
      year: '3',
      technologies: ['Next.js', 'Python', 'TypeScript', 'FastAPI'],
      teamSize: 2,
      teamTarget: 4,
      teamMembers: [
        { name: 'Lead Contributor', role: 'System Architecture' },
      ],
      lookingFor: ['Frontend Developer', 'Backend Developer'],
      supportNeeded: ['Team'],
      status: 'Looking for team',
      featured: true,
      visual: 'web',
      createdAt: new Date().toISOString(),
    };
  }, [id]);

  const meta = useMemo(() => {
    const mapped = PROJECT_VISUAL_MAP[project.id];
    if (mapped) return mapped;
    return {
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      tag: 'Student Innovation',
      track: 'PROJECT',
    };
  }, [project.id]);

  const handleCopy = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
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
    <main className="min-h-screen bg-transparent text-white py-8 sm:py-12 selection:bg-purple-600 selection:text-white relative overflow-hidden">
      
      {/* Background Ambient Cosmic Glows */}
      <div className="absolute top-10 left-1/4 w-[600px] h-[400px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="container-s max-w-4xl relative z-10 animate-fade-in">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/ideas"
            className="cyber-btn-interactive inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-all bg-white/[0.04] hover:bg-white/10 border border-white/10 px-4 py-2 rounded-full"
          >
            <ArrowLeft size={14} className="text-blue-400" />
            <span>Back to Idea Hub</span>
          </Link>
          <div className="text-xs text-cyan-400 font-mono flex items-center gap-1.5 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full backdrop-blur-md">
            <Sparkles size={13} />
            <span>STUDOS // VERIFIED PROJECT SPEC</span>
          </div>
        </div>

        {/* Main Solid Surface Project Card with Cyber HUD & Scale-in */}
        <div className="cyber-hud-card group rounded-3xl bg-[#090D24]/95 backdrop-blur-xl border border-cyan-500/30 overflow-hidden shadow-2xl shadow-cyan-950/30 animate-scale-in">
          
          {/* Large Hero Mockup Visual Header with Laser Sweep */}
          <div className="relative w-full h-64 sm:h-96 overflow-hidden bg-slate-950">
            <Image
              src={meta.imageUrl}
              alt={project.title}
              fill
              className="object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-700 ease-out"
              priority
            />

            {/* Hologram Laser Sweep */}
            <div className="holo-scanner-sweep opacity-100" />

            {/* Multi-stop gradient overlay for crisp readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D24] via-[#090D24]/40 to-transparent flex flex-col justify-end p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-2.5 mb-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                  {meta.tag}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {project.status || 'Active Project'}
                </span>
                <span className="ml-auto text-xs font-mono uppercase tracking-widest text-slate-300 bg-black/40 px-3 py-1 rounded-md border border-white/10 backdrop-blur-md hidden sm:inline">
                  {meta.track}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-lg">
                {project.title}
              </h1>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-10 space-y-8">
            
            {/* Creator & Academic Metadata Strip */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white font-black text-base shadow-md">
                  {project.creator.charAt(0)}
                </div>
                <div>
                  <div className="text-base font-bold text-white flex items-center gap-2">
                    <span>{project.creator}</span>
                    <span className="text-xs font-normal text-slate-400 bg-white/5 px-2 py-0.5 rounded-md">
                      Project Lead
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                    <span className="text-purple-300 font-semibold">{project.branch}</span>
                    <span>•</span>
                    <span>Year {project.year}</span>
                    <span>•</span>
                    <span className="text-slate-500">{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30 px-4 py-2 rounded-xl">
                <Users size={16} className="text-blue-400" />
                <span>Squad Capacity: {project.teamSize}/{project.teamTarget} Members</span>
              </div>
            </div>

            {/* Description / Problem Statement */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-2.5 flex items-center gap-1.5">
                <Sparkles size={13} />
                <span>PROJECT BRIEF & PROBLEM STATEMENT</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Badges */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Code2 size={14} className="text-blue-400" />
                <span>TECHNOLOGIES USED</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white/[0.05] border border-white/10 text-slate-200 hover:border-blue-400/40 transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Team Structure & Recruiting Roles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Team Roster */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>ACTIVE TEAM MEMBERS</span>
                  <span className="text-xs text-slate-400 font-mono">{project.teamMembers.length} active</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {project.teamMembers.map((m, idx) => (
                    <li key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white/[0.02]">
                      <span className="font-semibold text-white">{m.name}</span>
                      <span className="text-slate-400 text-[11px] bg-white/5 px-2.5 py-1 rounded-md">
                        {m.role}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recruiting Roles */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="text-xs font-bold text-purple-300">
                  RECRUITING FOR ROLES
                </div>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  {project.lookingFor.length > 0 ? (
                    project.lookingFor.map((r) => (
                      <span
                        key={r}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-500/15 border border-purple-500/30 text-purple-300"
                      >
                        {r}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">Team is currently fully staffed.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="cyber-btn-interactive px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-2"
                >
                  <Share2 size={14} className={copied ? 'text-emerald-400' : ''} />
                  <span className={copied ? 'text-emerald-300 font-bold animate-pop-burst' : ''}>
                    {copied ? 'Link Copied! ✓' : 'Share Project'}
                  </span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                {joinState === 'joined' ? (
                  <div className="animate-pop-burst px-6 py-3 rounded-xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 size={18} className="text-emerald-400 animate-bounce" />
                    <span>Collaboration Request Dispatched to {project.creator} ✓</span>
                  </div>
                ) : joinState === 'transmitting' ? (
                  <div className="px-7 py-3 rounded-xl bg-cyan-600/30 border border-cyan-400 text-cyan-200 text-xs sm:text-sm font-bold flex items-center gap-2.5 shadow-lg shadow-cyan-500/30 laser-progress-bar">
                    <span className="w-4 h-4 border-2 border-cyan-300 border-t-transparent rounded-full animate-spin" />
                    <span>Transmitting Credentials to Squad Network...</span>
                  </div>
                ) : (
                  <button
                    onClick={handleJoinSquad}
                    className="cyber-btn-interactive px-7 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-500/30 flex items-center gap-2"
                  >
                    <Users size={16} />
                    <span>Join Project Squad</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}