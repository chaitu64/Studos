'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Compass,
  ExternalLink,
  Layers,
  Sparkles,
  Target,
  Trophy,
  TrendingUp,
  Cpu,
  Globe,
  Shield,
  Palette,
  Cloud,
  ChevronRight,
  GraduationCap,
  Briefcase,
  Code2,
  Rocket,
  Search,
  Check,
  BarChart3,
  Clock,
  Zap,
  X,
  SlidersHorizontal,
  Award,
  Smartphone,
  Server
} from 'lucide-react';
import type { Career, CareerRecommendation, LearningResource, CareerRoadmapPhase } from '../../types/career';
import { Card3D } from '../../components/ui/Card3D';
import { HoloGyro } from '../../components/3d/HoloGyro';
import {
  BRANCH_OPTIONS,
  CAREER_CATEGORIES,
  CAREER_INTEREST_OPTIONS,
  EXPERIENCE_OPTIONS,
  GOAL_OPTIONS,
  INTEREST_OPTIONS,
  SKILL_OPTIONS,
  YEAR_OPTIONS,
} from '../../types/career';

type CareerForm = {
  year: '1' | '2' | '3' | '4';
  branch: string;
  interests: string[];
  currentSkills: string[];
  experience: 'Beginner' | 'Intermediate' | 'Advanced';
  goal: 'Internship' | 'Placement' | 'Hackathons' | 'Research' | 'Higher Studies' | 'Startup' | 'Freelancing';
  careerInterests: string[];
};

const careerSchema = z.object({
  year: z.enum(['1', '2', '3', '4']),
  branch: z.string().min(1, 'Choose your branch.'),
  interests: z.array(z.string()).min(1, 'Choose at least one interest.'),
  currentSkills: z.array(z.string()),
  experience: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  goal: z.enum(['Internship', 'Placement', 'Hackathons', 'Research', 'Higher Studies', 'Startup', 'Freelancing']),
  careerInterests: z.array(z.string()).min(1, 'Choose a career direction.'),
});

const defaultProfile: CareerForm = {
  year: '3',
  branch: 'AIML',
  interests: ['AI / ML', 'Data'],
  currentSkills: ['Python', 'Machine Learning'],
  experience: 'Intermediate',
  goal: 'Placement',
  careerInterests: ['AI / ML Engineer'],
};

// Year Context Descriptions for Element Placement Theory
const YEAR_METADATA: Record<string, { subtitle: string; tag: string }> = {
  '1': { subtitle: 'Core Foundations & Programming Basics', tag: 'Foundational' },
  '2': { subtitle: 'Data Structures, Algorithms & Dev Stacks', tag: 'Skill Sprint' },
  '3': { subtitle: 'System Specialization & Tech Internships', tag: 'Prime Pivot' },
  '4': { subtitle: 'Tier-1 Placements, Capstones & Off-Campus', tag: 'Target Lock' },
};

// Goal Metadata
const GOAL_METADATA: Record<string, { label: string; desc: string; icon: any; color: string }> = {
  'Placement': {
    label: 'Tier-1 Placement',
    desc: 'Top-tier tech MNCs & high-growth unicorns',
    icon: Briefcase,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  },
  'Internship': {
    label: 'High-Stipend Internship',
    desc: 'Summer & winter industrial tech internships',
    icon: Rocket,
    color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
  },
  'Hackathons': {
    label: 'Hackathon Domination',
    desc: 'National competitions & prize-winning builds',
    icon: Trophy,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  },
  'Research': {
    label: 'Research & MS Prep',
    desc: 'Paper publications & global fellowships',
    icon: BookOpen,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  },
  'Startup': {
    label: 'Startup & Incubation',
    desc: 'Build MVP, venture capital & incubator pitch',
    icon: Zap,
    color: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
  },
};

// Domain aesthetics and metadata helper
function getDomainMeta(category: string) {
  switch (category) {
    case 'ai-ml':
    case 'AI / Data':
      return {
        icon: <Cpu size={16} className="text-purple-400" />,
        border: 'border-purple-500/40 hover:border-purple-400',
        glow: 'shadow-[0_0_25px_rgba(168,85,247,0.15)]',
        badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
        accentColor: '#A855F7',
        salaryTier: '₹14 - 32 LPA',
      };
    case 'software':
      return {
        icon: <Globe size={16} className="text-cyan-400" />,
        border: 'border-cyan-500/40 hover:border-cyan-400',
        glow: 'shadow-[0_0_25px_rgba(6,182,212,0.15)]',
        badgeBg: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
        accentColor: '#06B6D4',
        salaryTier: '₹12 - 28 LPA',
      };
    case 'security':
      return {
        icon: <Shield size={16} className="text-emerald-400" />,
        border: 'border-emerald-500/40 hover:border-emerald-400',
        glow: 'shadow-[0_0_25px_rgba(16,185,129,0.15)]',
        badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        accentColor: '#10B981',
        salaryTier: '₹12 - 26 LPA',
      };
    case 'design':
      return {
        icon: <Palette size={16} className="text-pink-400" />,
        border: 'border-pink-500/40 hover:border-pink-400',
        glow: 'shadow-[0_0_25px_rgba(236,72,153,0.15)]',
        badgeBg: 'bg-pink-500/15 text-pink-300 border-pink-500/30',
        accentColor: '#EC4899',
        salaryTier: '₹10 - 24 LPA',
      };
    case 'cloud':
    case 'devops':
      return {
        icon: <Cloud size={16} className="text-amber-400" />,
        border: 'border-amber-500/40 hover:border-amber-400',
        glow: 'shadow-[0_0_25px_rgba(245,158,11,0.15)]',
        badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        accentColor: '#F59E0B',
        salaryTier: '₹12 - 30 LPA',
      };
    case 'data':
      return {
        icon: <BarChart3 size={16} className="text-indigo-400" />,
        border: 'border-indigo-500/40 hover:border-indigo-400',
        glow: 'shadow-[0_0_25px_rgba(99,102,241,0.15)]',
        badgeBg: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
        accentColor: '#6366F1',
        salaryTier: '₹11 - 25 LPA',
      };
    case 'mobile':
      return {
        icon: <Smartphone size={16} className="text-blue-400" />,
        border: 'border-blue-500/40 hover:border-blue-400',
        glow: 'shadow-[0_0_25px_rgba(59,130,246,0.15)]',
        badgeBg: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
        accentColor: '#3B82F6',
        salaryTier: '₹10 - 22 LPA',
      };
    default:
      return {
        icon: <Sparkles size={16} className="text-purple-400" />,
        border: 'border-purple-500/40 hover:border-purple-400',
        glow: 'shadow-[0_0_25px_rgba(168,85,247,0.15)]',
        badgeBg: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
        accentColor: '#A855F7',
        salaryTier: '₹12 - 25 LPA',
      };
  }
}

export default function CareerPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [careerState, setCareerState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalCareer, setModalCareer] = useState<Career | null>(null);
  const [recommendation, setRecommendation] = useState<CareerRecommendation | null>(null);
  const [recommendationState, setRecommendationState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState<Record<string, number>>({});

  const configuratorRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const form = useForm<CareerForm>({
    resolver: zodResolver(careerSchema),
    defaultValues: defaultProfile,
  });

  const selectedYear = form.watch('year');
  const selectedBranch = form.watch('branch');
  const selectedExperience = form.watch('experience');
  const selectedGoal = form.watch('goal');
  const selectedCareerInterest = form.watch('careerInterests')?.[0] || 'AI / ML Engineer';

  useEffect(() => {
    fetch('/api/career')
      .then((res) => {
        if (!res.ok) throw new Error('Careers unavailable');
        return res.json();
      })
      .then((data: { items: Career[] }) => {
        setCareers(data.items);
        setCareerState('ready');
      })
      .catch(() => setCareerState('error'));

    const stored = window.localStorage.getItem('studos-career-progress');
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse progress', e);
      }
    }
  }, []);

  // Filtered Careers
  const filteredCareers = useMemo(() => {
    return careers.filter((c) => {
      const matchesCategory =
        activeCategory === 'all'
          ? true
          : activeCategory === 'ai-ml'
            ? c.category === 'ai-ml' || c.category === 'data'
            : activeCategory === 'software'
              ? c.category === 'software' || c.category === 'mobile'
              : activeCategory === 'cloud'
                ? c.category === 'cloud' || c.category === 'devops'
                : c.category === activeCategory;

      const matchesSearch =
        searchQuery.trim() === '' ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.coreSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, careers]);

  // Handle skill progress checkbox toggle
  function toggleSkillProgress(skillName: string) {
    setProgress((prev) => {
      const currentVal = prev[skillName] ?? 0;
      const nextVal = currentVal >= 100 ? 0 : 100;
      const nextState = { ...prev, [skillName]: nextVal };
      window.localStorage.setItem('studos-career-progress', JSON.stringify(nextState));
      return nextState;
    });
  }

  // Handle generating recommendation
  async function handleGenerate(profile: CareerForm) {
    setRecommendationState('loading');
    setErrorMessage('');
    try {
      const response = await fetch('/api/career/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'We could not build your path.');
      setRecommendation(data);
      setRecommendationState('idle');
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (error) {
      setRecommendationState('error');
      setErrorMessage(error instanceof Error ? error.message : 'Could not generate path.');
    }
  }

  // Quick Action: Select role and jump to bottom selection section
  const selectRoleAndConfigure = (career: Career) => {
    form.setValue('careerInterests', [career.title]);
    if (career.category === 'ai-ml' || career.category === 'data') {
      form.setValue('interests', ['AI / ML', 'Data']);
    } else if (career.category === 'security') {
      form.setValue('interests', ['Cybersecurity']);
    } else if (career.category === 'cloud' || career.category === 'devops') {
      form.setValue('interests', ['Cloud']);
    } else if (career.category === 'design') {
      form.setValue('interests', ['Design']);
    } else {
      form.setValue('interests', ['Web Development']);
    }
    configuratorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-purple-600 selection:text-white relative overflow-x-hidden">

      {/* Background Lighting Meshes */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed top-1/3 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="fixed bottom-10 left-1/3 w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* ── 1. COSMIC HERO & TELEMETRY RADAR (ELEMENT PLACEMENT: BALANCED 2-COLUMN) ── */}
      <section className="relative pt-12 pb-16 border-b border-white/5">
        <div className="container-s">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left Column: Vision & Primary Actions */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 font-mono text-xs font-semibold tracking-wider uppercase mb-5">
                <Sparkles size={13} className="text-purple-400" />
                <span>ENGINEERING CAREER TELEMETRY & BLUEPRINTS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] mb-5">
                Navigate From Classroom to{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  High-Impact Tech Roles
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                Explore real-world engineering roles, benchmark against Tier-1 placement standards, and configure a tailored semester-by-semester roadmap calibrated for your academic branch.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 mb-10">
                <button
                  onClick={() => configuratorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="btn-pill-white text-xs sm:text-sm py-3 px-6 inline-flex items-center gap-2 font-bold shadow-xl shadow-purple-500/20 hover:scale-[1.02] transition-transform cursor-pointer"
                >
                  <SlidersHorizontal size={15} />
                  <span>Configure My Pathway</span>
                  <ArrowRight size={14} />
                </button>
                <a
                  href="#role-directory"
                  className="btn-pill-glass text-xs sm:text-sm py-3 px-5 inline-flex items-center gap-2 font-semibold hover:border-cyan-500/40 transition-colors"
                >
                  <Compass size={15} className="text-cyan-400" />
                  <span>Explore 10+ Engineering Tracks</span>
                </a>
              </div>

              {/* Metric Highlights Strip */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
                <div>
                  <div className="text-xl sm:text-2xl font-black text-white">10+</div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Tech Roles</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-cyan-400">₹14-35 LPA</div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Placement Target</div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-purple-400">100%</div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">Practical Proof</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Role Radar Card */}
            <div className="lg:col-span-5 relative">
              {/* Floating HoloGyro Accent */}
              <div className="absolute -top-12 -right-8 pointer-events-none opacity-30 hidden sm:block">
                <HoloGyro size="sm" label="CAREER RADAR" />
              </div>

              <Card3D maxTilt={6} scale={1.015} glare={true} className="cyber-hud-card">
                <div className="holo-scanner-sweep" />
                <div className="relative rounded-3xl p-6 sm:p-7 bg-[#0B0820]/90 border border-purple-500/40 backdrop-blur-2xl shadow-[0_0_50px_rgba(168,85,247,0.18)] preserve-3d">

                  {/* Floating Tag */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-mono text-slate-300 font-bold uppercase tracking-wider">
                        SPOTLIGHT CAREER TRACK
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 uppercase">
                      Highest Demand
                    </span>
                  </div>

                  {/* Role Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 shrink-0 translate-z-20 transition-transform">
                      <Cpu size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white">
                        AI & Machine Learning Engineer
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        PyTorch, MLOps, LLM Fine-Tuning & Computer Vision
                      </p>
                    </div>
                  </div>

                  {/* Micro Telemetry Grid */}
                  <div className="grid grid-cols-2 gap-2.5 my-4">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Placement Bracket</span>
                      <span className="text-sm font-bold text-cyan-300">₹14 - 32 LPA Tier-1</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-[10px] font-mono text-slate-400 block uppercase">Typical Curriculum</span>
                      <span className="text-sm font-bold text-purple-300">4 Core Phases</span>
                    </div>
                  </div>

                  {/* Core Stack Pills */}
                  <div className="mb-5">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase mb-1.5">Benchmarked Stack</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Python', 'PyTorch', 'FastAPI', 'MLOps', 'Vector DBs', 'System Design'].map((stack) => (
                        <span
                          key={stack}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300"
                        >
                          {stack}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Fast Trigger to Configurator */}
                  <button
                    onClick={() => {
                      form.setValue('careerInterests', ['AI / ML Engineer']);
                      form.setValue('interests', ['AI / ML', 'Data']);
                      configuratorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25 transition-all cursor-pointer translate-z-20"
                  >
                    <span>Calibrate My Profile For This Role</span>
                    <ArrowRight size={14} />
                  </button>

                </div>
              </Card3D>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. ROLE DIRECTORY & DOMAIN EXPLORATION HUB ── */}
      <section id="role-directory" className="container-s py-16 scroll-mt-20">

        {/* Section Title & Search/Filter Toolbar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                ENGINEERING DIRECTORY
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Explore High-Growth Engineering Careers
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Compare core skills, entry salaries, and real milestone roadmaps for top tech specializations.
            </p>
          </div>

          {/* Search Box */}
          <div className="w-full md:w-72 relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search roles or skills (e.g. Docker, AI)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:bg-white/[0.08] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {[
            { id: 'all', label: 'All Roles', count: careers.length },
            { id: 'ai-ml', label: 'AI & Data Science', count: careers.filter(c => c.category === 'ai-ml' || c.category === 'data').length },
            { id: 'software', label: 'Software & Web', count: careers.filter(c => c.category === 'software' || c.category === 'mobile').length },
            { id: 'cloud', label: 'Cloud & DevOps', count: careers.filter(c => c.category === 'cloud' || c.category === 'devops').length },
            { id: 'security', label: 'Cybersecurity', count: careers.filter(c => c.category === 'security').length },
            { id: 'design', label: 'UI/UX & Product', count: careers.filter(c => c.category === 'design').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${activeCategory === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg shadow-purple-500/25 border border-white/20'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeCategory === tab.id ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Roles Grid (Structured 3-Column Uniform Cards) */}
        {careerState === 'loading' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 rounded-3xl bg-white/[0.02] border border-white/10 animate-pulse" />
            ))}
          </div>
        )}

        {careerState === 'ready' && filteredCareers.length === 0 && (
          <div className="p-12 text-center rounded-3xl bg-white/[0.02] border border-white/10 max-w-md mx-auto">
            <Compass size={32} className="text-slate-500 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">No careers found</h4>
            <p className="text-xs text-slate-400 mb-4">Try clearing your search filters or browse all tracks.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
              className="btn-pill-white text-xs py-2 px-5 font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {careerState === 'ready' && filteredCareers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career) => {
              const meta = getDomainMeta(career.category);
              const isSelectedInForm = selectedCareerInterest === career.title;

              return (
                <Card3D key={career.id} maxTilt={6} scale={1.015} glare={true} className="cyber-hud-card h-full">
                  <div className="holo-scanner-sweep" />
                  <div
                    className={`
                      p-6 rounded-3xl bg-[#0A071E]/95 border backdrop-blur-xl transition-all duration-300
                      flex flex-col justify-between group h-full relative overflow-hidden preserve-3d
                      ${meta.border} ${meta.glow}
                      ${isSelectedInForm ? 'ring-2 ring-cyan-400/80 bg-[#0F0B29]' : ''}
                    `}
                  >
                    {/* Top Ambient Glow Pill */}
                    <div
                      className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none"
                      style={{ backgroundColor: meta.accentColor }}
                    />

                    <div>
                      {/* Header Row: Domain Icon + Badges */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="p-2.5 rounded-xl bg-white/5 border border-white/10 translate-z-20 transition-transform">
                            {meta.icon}
                          </span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase tracking-wider ${meta.badgeBg}`}>
                            {career.category}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                          {meta.salaryTier}
                        </span>
                      </div>

                      {/* Role Title */}
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {career.title}
                      </h3>

                      {/* Role Description */}
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {career.description}
                      </p>

                      {/* Benchmarked Core Skills */}
                      <div className="mt-4 pt-3 border-t border-white/5">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">
                          Core Competencies
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {career.coreSkills.slice(0, 4).map((s) => (
                            <span
                              key={s}
                              className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-slate-300 group-hover:border-white/20 transition-colors"
                            >
                              {s}
                            </span>
                          ))}
                          {career.coreSkills.length > 4 && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-slate-400 bg-white/5">
                              +{career.coreSkills.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Deck */}
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-2 translate-z-20">
                      <button
                        onClick={() => setModalCareer(career)}
                        className="text-xs text-slate-300 hover:text-white font-medium inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <BookOpen size={13} className="text-purple-400" />
                        <span>Roadmap</span>
                      </button>

                      <button
                        onClick={() => selectRoleAndConfigure(career)}
                        className="text-xs font-bold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all cursor-pointer group-hover:translate-x-0.5"
                      >
                        <span>Build Pathway</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>

                  </div>
                </Card3D>
              );
            })}
          </div>
        )}
      </section>

      {/* ── 3. RE-ENGINEERED BOTTOM SELECTION SECTION (ELEMENT PLACING THEORY & MASTER-DETAIL STUDIO) ── */}
      <section
        ref={configuratorRef}
        id="build-path"
        className="container-s py-16 scroll-mt-20 border-t border-white/10"
      >

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 font-mono text-xs font-semibold tracking-wider uppercase mb-3">
            <SlidersHorizontal size={13} className="text-cyan-400" />
            <span>INTERACTIVE PATHWAY STUDIO</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Configure Your Custom Engineering Blueprint
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Structured around Element Placement Theory: select your standing, discipline, and ambition to generate a precision roadmap.
          </p>
        </div>

        {/* Master-Detail Layout (7 Columns Config Deck + 5 Columns Live Telemetry Blueprint) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Interactive Form Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <form onSubmit={form.handleSubmit(handleGenerate)} className="space-y-6">

              {/* STEP 1: Academic Standing & Experience */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#0B0820]/90 border border-purple-500/30 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-md shadow-purple-500/40">
                      1
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Academic Standing & Experience
                      </h3>
                      <p className="text-[11px] text-slate-400">Calibrates difficulty and timeline</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                    Step 1 of 3
                  </span>
                </div>

                {/* 4 Year Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-5">
                  {YEAR_OPTIONS.map((item) => {
                    const isSelected = selectedYear === item.value;
                    const meta = YEAR_METADATA[item.value];
                    return (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() => form.setValue('year', item.value as any)}
                        className={`
                          p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between h-24
                          ${isSelected
                            ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/30 ring-2 ring-purple-400/50'
                            : 'bg-white/[0.03] text-slate-300 border-white/10 hover:border-white/25 hover:bg-white/[0.06]'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{item.label}</span>
                          {isSelected && <CheckCircle2 size={13} className="text-white" />}
                        </div>
                        <span className={`text-[10px] line-clamp-2 leading-snug ${isSelected ? 'text-purple-100' : 'text-slate-400'}`}>
                          {meta?.subtitle}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Experience Level Selector */}
                <div>
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Current Skill Maturity
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {EXPERIENCE_OPTIONS.map((exp) => {
                      const isSelected = selectedExperience === exp.value;
                      return (
                        <button
                          type="button"
                          key={exp.value}
                          onClick={() => form.setValue('experience', exp.value)}
                          className={`
                            py-2 px-3 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer
                            ${isSelected
                              ? 'bg-white text-[#070A1E] border-white shadow-md'
                              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
                            }
                          `}
                        >
                          {exp.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* STEP 2: Engineering Discipline (Branch) */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#0B0820]/90 border border-cyan-500/30 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-cyan-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-md shadow-cyan-500/40">
                      2
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Engineering Discipline
                      </h3>
                      <p className="text-[11px] text-slate-400">Select your undergraduate department</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                    Step 2 of 3
                  </span>
                </div>

                {/* 8 Branch Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BRANCH_OPTIONS.map((item) => {
                    const isSelected = selectedBranch === item.value;
                    return (
                      <button
                        type="button"
                        key={item.value}
                        onClick={() => form.setValue('branch', item.value)}
                        className={`
                          py-2.5 px-3 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer flex items-center justify-center gap-1.5
                          ${isSelected
                            ? 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-500/30'
                            : 'bg-white/[0.03] text-slate-300 border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                          }
                        `}
                      >
                        <span>{item.value}</span>
                        {isSelected && <Check size={12} className="text-white" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* STEP 3: Target Role & Ambition */}
              <div className="p-6 sm:p-7 rounded-3xl bg-[#0B0820]/90 border border-pink-500/30 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-pink-600 text-white font-mono text-xs font-bold flex items-center justify-center shadow-md shadow-pink-500/40">
                      3
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                        Target Role & Primary Ambition
                      </h3>
                      <p className="text-[11px] text-slate-400">Align your goal with verified career tracks</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded-full border border-pink-500/20">
                    Step 3 of 3
                  </span>
                </div>

                {/* Career Role Selection Dropdown / Pill */}
                <div className="mb-4">
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
                    Selected Career Direction
                  </label>
                  <select
                    value={selectedCareerInterest}
                    onChange={(e) => form.setValue('careerInterests', [e.target.value])}
                    aria-label="Selected Career Direction"
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#140F2E] border border-pink-500/30 text-white text-xs font-semibold focus:outline-none focus:border-pink-400 cursor-pointer"
                  >
                    {CAREER_INTEREST_OPTIONS.map((role) => (
                      <option key={role} value={role} className="bg-[#0B0820] text-white">
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ambition / Goal Cards */}
                <div>
                  <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    What is your immediate 6-12 month ambition?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      'Placement',
                      'Internship',
                      'Hackathons',
                      'Research',
                      'Startup',
                    ].map((key) => {
                      const item = GOAL_METADATA[key];
                      if (!item) return null;
                      const Icon = item.icon;
                      const isSelected = selectedGoal === key;

                      return (
                        <button
                          type="button"
                          key={key}
                          onClick={() => form.setValue('goal', key as any)}
                          className={`
                            p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-3
                            ${isSelected
                              ? 'bg-gradient-to-r from-pink-600/40 to-purple-600/40 border-pink-400 text-white shadow-lg shadow-pink-500/20 ring-1 ring-pink-400'
                              : 'bg-white/[0.03] text-slate-300 border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                            }
                          `}
                        >
                          <div className={`p-2 rounded-xl shrink-0 ${item.color}`}>
                            <Icon size={16} />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span>{item.label}</span>
                              {isSelected && <CheckCircle2 size={12} className="text-pink-400" />}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                              {item.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

            </form>
          </div>

          {/* Right Column: Live Telemetry Blueprint HUD (Sticky 5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <Card3D maxTilt={4} scale={1.01} glare={true} className="cyber-hud-card">
              <div className="holo-scanner-sweep" />
              <div className="p-6 sm:p-7 rounded-3xl bg-[#0E0926]/95 border border-cyan-500/40 backdrop-blur-2xl shadow-[0_0_40px_rgba(6,182,212,0.15)] relative overflow-hidden preserve-3d">

                {/* Top Ambient Glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                      LIVE BLUEPRINT TELEMETRY
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                    REAL-TIME SYNC
                  </span>
                </div>

                {/* Dynamic Specs Table */}
                <div className="space-y-3.5 mb-6">

                  {/* Target Role */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 translate-z-20">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Selected Direction</span>
                    <div className="text-base font-extrabold text-white mt-0.5 flex items-center gap-2">
                      <Target size={15} className="text-cyan-400" />
                      <span>{selectedCareerInterest}</span>
                    </div>
                  </div>

                  {/* Standing & Branch */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Standing</span>
                      <span className="text-xs font-bold text-purple-300">
                        Year {selectedYear} ({selectedExperience})
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Branch</span>
                      <span className="text-xs font-bold text-cyan-300">{selectedBranch} Engineering</span>
                    </div>
                  </div>

                  {/* Target Ambition */}
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Primary Ambition</span>
                    <span className="text-xs font-bold text-pink-300">
                      {GOAL_METADATA[selectedGoal]?.label || selectedGoal}
                    </span>
                  </div>

                  {/* Estimated Prep & Calibration */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Est. Prep Time</span>
                      <span className="text-xs font-bold text-emerald-300 flex items-center gap-1 mt-0.5">
                        <Clock size={12} />
                        <span>~140 - 180 Hrs</span>
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">Rubric Match</span>
                      <span className="text-xs font-bold text-amber-300 flex items-center gap-1 mt-0.5">
                        <Award size={12} />
                        <span>Tier-1 Calibrated</span>
                      </span>
                    </div>
                  </div>

                </div>

                {/* Big Primary Generation Button */}
                <button
                  type="button"
                  onClick={form.handleSubmit(handleGenerate)}
                  disabled={recommendationState === 'loading'}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-2xl shadow-purple-500/30 transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed translate-z-30"
                >
                  {recommendationState === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Synthesizing Blueprint...</span>
                    </>
                  ) : (
                    <>
                      <Zap size={16} />
                      <span>Generate Custom Career Roadmap</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                {recommendationState === 'error' && (
                  <div className="mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs text-center">
                    {errorMessage}
                  </div>
                )}

                <p className="text-[11px] text-slate-400 text-center mt-3">
                  Calculates required skills, capstone projects, and real internship benchmarks.
                </p>

              </div>
            </Card3D>
          </div>

        </div>

      </section>

      {/* ── 4. CUSTOM PATHWAY RESULTS (DISPLAYED AFTER GENERATION) ── */}
      {recommendation && (
        <section
          ref={resultsRef}
          id="custom-pathway"
          className="container-s py-16 scroll-mt-20 border-t border-white/10 space-y-12"
        >

          {/* Mission Control Overview Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0D0929] border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.18)] relative overflow-hidden">

            {/* Ambient Lighting Orbs */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">

              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] font-bold uppercase tracking-wider mb-3">
                  <Sparkles size={12} />
                  <span>CALIBRATED FOR {recommendation.currentStage}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                  Target Blueprint: {recommendation.career.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                  {recommendation.career.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {recommendation.basedOn.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Match Gauge & Fast Retune */}
              <div className="flex sm:flex-row lg:flex-col items-center gap-4 shrink-0">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10 text-center min-w-[160px]">
                  <span className="text-3xl font-black text-cyan-400">94%</span>
                  <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider mt-0.5">
                    Profile Match
                  </span>
                </div>

                <button
                  onClick={() => configuratorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="btn-pill-glass text-xs py-2 px-4 font-semibold text-slate-300 hover:text-white"
                >
                  Adjust Parameters ↺
                </button>
              </div>

            </div>
          </div>

          {/* 1. Next High-Leverage Skills (Interactive Mark-as-Done) */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-purple-400 uppercase block mb-1">
                  STAGE 1: COMPETENCIES
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Priority Skills to Master</h3>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                Tap checkbox to track progress
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recommendation.nextSkills.map((skill, index) => {
                const isCompleted = (progress[skill.name] ?? 0) >= 100;
                return (
                  <div
                    key={skill.id}
                    className={`
                      p-5 rounded-2xl border backdrop-blur-md transition-all duration-200 flex flex-col justify-between
                      ${isCompleted
                        ? 'bg-emerald-950/20 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                        : 'bg-[#0E0B22] border-purple-500/30 hover:border-purple-400'
                      }
                    `}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 uppercase">
                          Priority {index + 1}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock size={12} />
                          <span>{skill.estimatedHours} hrs</span>
                        </span>
                      </div>

                      <h4 className={`text-base font-bold transition-colors ${isCompleted ? 'text-emerald-300 line-through' : 'text-white'}`}>
                        {skill.name}
                      </h4>

                      <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-500 capitalize">
                        {skill.level} impact
                      </span>
                      <button
                        onClick={() => toggleSkillProgress(skill.name)}
                        className={`
                          text-xs font-bold py-1 px-3 rounded-full border transition-all cursor-pointer inline-flex items-center gap-1.5
                          ${isCompleted
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                          }
                        `}
                      >
                        {isCompleted ? (
                          <>
                            <Check size={12} />
                            <span>Completed</span>
                          </>
                        ) : (
                          <span>Mark Done</span>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Recommended Capstone Projects (Proof of Work) */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-pink-400 uppercase block mb-1">
                  STAGE 2: PROOF OF WORK
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Recommended Capstone Projects</h3>
              </div>
              <Link
                href="/ideas"
                className="text-xs text-pink-400 hover:text-pink-300 font-semibold inline-flex items-center gap-1"
              >
                <span>Browse Student Idea Hub</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {recommendation.recommendedProjects.map((proj) => (
                <div
                  key={proj.id}
                  className="p-6 rounded-3xl bg-[#0D0922] border border-pink-500/30 hover:border-pink-400 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-pink-500/15 text-pink-300 border border-pink-500/25">
                        {proj.difficulty}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {proj.estimatedHours ? `${proj.estimatedHours}h sprint` : 'Practical'}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">
                      {proj.title}
                    </h4>

                    <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">Portfolio Proof</span>
                    <Link
                      href={`/ideas/submit?title=${encodeURIComponent(proj.title)}`}
                      className="text-xs font-bold text-pink-400 hover:text-pink-300 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Build & Submit</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Free Curated Learning Resources */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase block mb-1">
                  STAGE 3: CURATED RESOURCES
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Free Verified Learning Courses</h3>
              </div>
              <Link
                href="/resources"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
              >
                <span>All Subject Vaults</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendation.recommendedResources.map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-5 rounded-2xl bg-[#090C22] border border-cyan-500/20 hover:border-cyan-400 hover:bg-[#0E1338] transition-all flex items-start justify-between gap-3 group"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.2 rounded-full bg-cyan-500/15 text-cyan-300">
                        {res.provider}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {res.duration}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {res.title}
                    </h4>
                  </div>
                  <ExternalLink size={15} className="text-slate-400 group-hover:text-cyan-400 shrink-0 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* 4. Active Matched Opportunities */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase block mb-1">
                  STAGE 4: OPPORTUNITY RADAR
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">Matched Internships & Hackathons</h3>
              </div>
              <Link
                href="/opportunities"
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center gap-1"
              >
                <span>Browse Directory</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendation.recommendedOpportunities.map((opp) => (
                <Link
                  key={opp.id}
                  href="/opportunities"
                  className="p-5 rounded-2xl bg-[#140F08] border border-amber-500/30 hover:border-amber-400 hover:bg-[#1C140A] transition-all flex items-center justify-between gap-4 group"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      {opp.type}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1.5 group-hover:text-amber-200 transition-colors">
                      {opp.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{opp.description}</p>
                  </div>
                  <ArrowRight size={16} className="text-amber-400 group-hover:translate-x-1 transition-transform shrink-0" />
                </Link>
              ))}
            </div>
          </div>

        </section>
      )}

      {/* ── 5. CAREER DETAIL / ROADMAP MODAL ── */}
      {modalCareer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="cyber-hud-card relative w-full max-w-2xl rounded-3xl bg-[#0B0820]/95 backdrop-blur-xl border border-purple-500/40 p-6 sm:p-8 shadow-2xl shadow-purple-950/40 my-8 animate-scale-in">

            {/* Close Button */}
            <button
              onClick={() => setModalCareer(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3.5 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-300 shrink-0 shadow-md shadow-purple-500/20">
                {getDomainMeta(modalCareer.category).icon}
              </div>
              <div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 uppercase">
                  {modalCareer.category}
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  {modalCareer.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  {modalCareer.description}
                </p>
              </div>
            </div>

            {/* Roadmap Phases */}
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1">
              <span className="text-xs font-mono font-bold uppercase text-purple-400 tracking-wider block mb-2">
                Curriculum Blueprint Phases
              </span>
              {modalCareer.roadmap.map((phase) => (
                <div key={phase.phase} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-600 text-[10px] font-mono font-bold flex items-center justify-center text-white shadow-sm shadow-purple-500/40">
                        {phase.order}
                      </span>
                      <span>{phase.phase}</span>
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">
                      {phase.skills.length} competencies
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {phase.skills.map((s) => (
                      <div key={s.id} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/20 transition-colors">
                        <span className="text-xs font-semibold text-slate-200 block">{s.name}</span>
                        <span className="text-[10px] text-slate-400 line-clamp-1">{s.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Bottom CTA */}
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                onClick={() => setModalCareer(null)}
                className="cyber-btn-interactive text-xs font-semibold text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const c = modalCareer;
                  setModalCareer(null);
                  selectRoleAndConfigure(c);
                }}
                className="cyber-btn-interactive btn-pill-white text-xs py-2.5 px-5 font-bold inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-500/20"
              >
                <span>Calibrate My Profile For This Role</span>
                <ArrowRight size={13} />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
