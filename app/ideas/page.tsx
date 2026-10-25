'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  ArrowRight,
  Lightbulb,
  Users,
  Layers,
  Sparkles,
  Zap,
  Code2,
  Cpu,
  Globe,
  Database,
  Bot,
  HeartHandshake,
  CheckCircle2,
  GraduationCap,
  Leaf,
  X,
  ChevronRight,
  Radio,
  Share2,
  UserPlus,
  Rocket
} from 'lucide-react';
import { ideas } from '../../data/ideas';
import type { Idea } from '../../types/idea';
import { ProjectDetailModal } from '../../components/ideas/ProjectDetailModal';
import { Card3D } from '../../components/ui/Card3D';

const CATEGORIES = ['All', 'Web', 'App', 'Design'];

interface ProjectMeta {
  imageUrl: string;
  tag: string;
  category: 'Web' | 'App' | 'Design';
  track: string;
}

const PROJECT_VISUAL_MAP: Record<string, Partial<ProjectMeta>> = {
  'smart-campus-energy': {
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    tag: 'IoT System',
    category: 'App',
    track: 'IOT',
  },
  'ai-resume-analyzer': {
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    tag: 'Web Platform',
    category: 'Web',
    track: 'WEB',
  },
  'sign-language-translator': {
    imageUrl: 'https://images.unsplash.com/photo-1534972195531-a756b1126f24?q=80&w=800&auto=format&fit=crop',
    tag: 'AI Vision App',
    category: 'App',
    track: 'APP',
  },
  'smart-agriculture-monitor': {
    imageUrl: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=800&auto=format&fit=crop',
    tag: 'Smart Hardware',
    category: 'App',
    track: 'IOT',
  },
  'campus-safety-assistant': {
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
    tag: 'Security Dashboard',
    category: 'Web',
    track: 'WEB',
  },
  'campus-navigation-assistant': {
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop',
    tag: 'Mobile App',
    category: 'App',
    track: 'APP',
  },
  'project-titanium': {
    imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
    tag: 'UI/UX Design',
    category: 'Design',
    track: 'DESIGN',
  },
  'ecotrack': {
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    tag: 'Mobile App',
    category: 'App',
    track: 'APP',
  },
  'campusconnect': {
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
    tag: 'Web Platform',
    category: 'Web',
    track: 'WEB',
  },
  'hostel-mess-waste-tracker': {
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tag: 'Telemetry Web App',
    category: 'Web',
    track: 'WEB',
  },
  'exam-slot-swapper': {
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop',
    tag: 'Web App',
    category: 'Web',
    track: 'WEB',
  },
  '3d-campus-virtual-tour': {
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    tag: 'Creative Suite',
    category: 'Design',
    track: 'DESIGN',
  },
  'mental-health-pulse': {
    imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop',
    tag: 'Mobile App',
    category: 'App',
    track: 'APP',
  },
  'alumni-connect-network': {
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop',
    tag: 'Web Platform',
    category: 'Web',
    track: 'WEB',
  },
};

function getProjectMeta(item: Idea): ProjectMeta {
  const mapped = PROJECT_VISUAL_MAP[item.id];
  if (mapped && mapped.imageUrl) {
    return {
      imageUrl: mapped.imageUrl,
      tag: mapped.tag || 'Student Innovation',
      category: mapped.category || 'Web',
      track: mapped.track || 'WEB',
    };
  }

  const isApp = item.technologies.some(t => ['React Native', 'Flutter', 'Mobile', 'ARKit', 'iOS', 'Android'].includes(t)) || item.visual === 'campus';
  const isDesign = item.technologies.some(t => ['UI/UX', 'Design', 'Figma', 'CSS', 'Tailwind', '3D'].includes(t));

  if (isApp) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop',
      tag: 'Mobile App',
      category: 'App',
      track: 'APP',
    };
  }

  if (isDesign) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop',
      tag: 'UI/UX Design',
      category: 'Design',
      track: 'DESIGN',
    };
  }

  return {
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    tag: 'Web Platform',
    category: 'Web',
    track: 'WEB',
  };
}

const FEATURED_PROJECTS = [
  {
    id: 'smart-campus-energy',
    title: 'Smart Campus Energy',
    category: 'IoT & Sustainability',
    tag: 'IoT Platform',
    track: 'IOT',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop',
    badge: 'Open',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    description: 'Monitor and optimize energy consumption across campus classrooms and hostels.',
    technologies: ['IoT', 'Python', 'Data Analytics'],
    teamRatio: '2/5',
    rolesOpen: '2 roles open',
  },
  {
    id: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer',
    category: 'AI / Machine Learning',
    tag: 'AI / Machine Learning',
    track: 'AI/ML',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    badge: 'Open',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    description: 'Instant resume analysis with tailored skill recommendations for student career paths.',
    technologies: ['Python', 'NLP', 'React'],
    teamRatio: '3/4',
    rolesOpen: '1 role open',
  },
  {
    id: 'campus-navigation-assistant',
    title: 'Campus Navigation Assistant',
    category: 'Web & Mobile',
    tag: 'Mobile App',
    track: 'APP',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&auto=format&fit=crop',
    badge: 'In Progress',
    badgeClass: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    description: 'Turn-by-turn indoor navigation app connecting students to halls and lab blocks.',
    technologies: ['React Native', 'Maps', 'UI/UX'],
    teamRatio: '4/5',
    rolesOpen: '1 role open',
  },
  {
    id: 'smart-agriculture-monitor',
    title: 'Smart Agriculture Monitor',
    category: 'Social Impact',
    tag: 'Smart Hardware',
    track: 'IOT',
    imageUrl: 'https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=800&auto=format&fit=crop',
    badge: 'Open',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    description: 'Low-cost sensor nodes for soil moisture and crop monitoring to help local growers.',
    technologies: ['IoT', 'ML', 'Cloud'],
    teamRatio: '1/4',
    rolesOpen: '3 roles open',
  },
];

const TALENT_ROLES = [
  {
    title: 'Frontend Developer',
    skills: 'React · Next.js · UI/UX',
    avatars: ['👩‍💻', '👨‍💻', '👩‍🎨'],
    extraCount: '+3',
    status: 'Available for Projects',
    statusDot: 'bg-emerald-400',
    statusText: 'text-emerald-300',
    icon: Code2,
  },
  {
    title: 'Backend Developer',
    skills: 'Node.js · PostgreSQL · APIs',
    avatars: ['👨‍💻', '🧑‍💻'],
    extraCount: '+2',
    status: 'Available for Projects',
    statusDot: 'bg-emerald-400',
    statusText: 'text-emerald-300',
    icon: Database,
  },
  {
    title: 'AI/ML Engineer',
    skills: 'Python · PyTorch · NLP',
    avatars: ['🧑‍🔬', '👩‍💻', '👨‍💼'],
    extraCount: '+4',
    status: 'Looking for Team',
    statusDot: 'bg-amber-400',
    statusText: 'text-amber-300',
    icon: Bot,
  },
  {
    title: 'IoT Developer',
    skills: 'Arduino · ESP32 · Sensors',
    avatars: ['👨‍🔧', '👩‍💻'],
    extraCount: '+1',
    status: 'Available for Projects',
    statusDot: 'bg-emerald-400',
    statusText: 'text-emerald-300',
    icon: Cpu,
  },
];

export default function IdeasPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<Idea | null>(null);

  // Dynamic filter for the project catalog
  const filteredProjects = useMemo(() => {
    return ideas.filter((item) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === '' ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.creator.toLowerCase().includes(q) ||
        item.technologies.some((t) => t.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (selectedCategory === 'All') return true;

      const meta = getProjectMeta(item);
      if (selectedCategory === 'Web') {
        return (
          meta.category === 'Web' ||
          item.technologies.some((t) =>
            ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Prisma', 'Web'].includes(t)
          ) ||
          item.visual === 'web'
        );
      }
      if (selectedCategory === 'App') {
        return (
          meta.category === 'App' ||
          item.technologies.some((t) =>
            ['React Native', 'Flutter', 'Mobile', 'ARKit', 'iOS', 'Android', 'IoT', 'ESP32'].includes(t)
          ) ||
          item.visual === 'campus' ||
          item.visual === 'iot'
        );
      }
      if (selectedCategory === 'Design') {
        return (
          meta.category === 'Design' ||
          item.technologies.some((t) =>
            ['UI/UX', 'Design', 'Figma', 'CSS', 'Tailwind', '3D'].includes(t)
          )
        );
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-transparent text-white selection:bg-purple-600 selection:text-white relative overflow-hidden">

      {/* Background Ambient Cosmic Glows (matching homepage) */}
      <div className="cosmic-glow-pink -top-24 -left-24 opacity-25 pointer-events-none" />
      <div className="cosmic-glow-blue top-1/3 -right-24 opacity-25 pointer-events-none" />
      <div className="cosmic-glow-purple bottom-10 left-1/4 opacity-25 pointer-events-none" />

      <main className="container-s pt-8 sm:pt-12 pb-24 space-y-16 sm:space-y-20 relative z-10">

        {/* ── 1. HERO SECTION ── */}
        <section className="pt-2 sm:pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

            {/* Left Column: Heading, Subtitle & Actions */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>STUDOS / IDEA HUB</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08]">
                Where Ideas <br className="hidden sm:inline" />
                Become <span className="text-amber-400">Projects.</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg max-w-lg leading-relaxed">
                Discover ideas, build teams, and turn student concepts into real-world projects.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/ideas/submit"
                  className="btn-pill-white text-sm py-3 px-7 shadow-lg shadow-white/10 flex items-center gap-2"
                >
                  <span>Submit an Idea</span>
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="#explore-projects"
                  className="btn-pill-glass text-sm py-3 px-7"
                >
                  <span>Explore Projects</span>
                </a>
              </div>
            </div>

            {/* Right Column: Clean Conceptual Graphic with Nodes */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md h-[340px] flex items-center justify-center p-4">

                {/* Central Soft Glow */}
                <div className="absolute inset-0 bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

                {/* 3D Gyroscopic Orbits around Bulb */}
                <div className="absolute w-56 h-56 rounded-full border border-amber-400/30 border-dashed gyro-ring-1 pointer-events-none" />
                <div className="absolute w-48 h-48 rounded-full border border-purple-400/30 gyro-ring-2 pointer-events-none" />

                {/* Central Bulb & Cap Graphic */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
                    <svg viewBox="0 0 120 120" className="w-full h-full text-amber-400 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]" fill="none">
                      {/* Cap */}
                      <path d="M 60 18 L 92 30 L 60 42 L 28 30 Z" fill="rgba(11, 15, 43, 0.95)" stroke="#F59E0B" strokeWidth="2" />
                      <path d="M 44 36 L 44 46 C 44 52 76 52 76 46 L 76 36" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
                      <line x1="90" y1="31" x2="90" y2="48" stroke="#F59E0B" strokeWidth="1.5" />
                      <circle cx="90" cy="49" r="2" fill="#F59E0B" />
                      {/* Bulb */}
                      <path d="M 40 50 C 32 60 32 72 40 82 C 46 90 52 94 52 100 L 68 100 C 68 94 74 90 80 82 C 88 72 88 60 80 50" stroke="#F59E0B" strokeWidth="2" fill="rgba(245, 158, 11, 0.08)" />
                      <path d="M 52 72 L 56 60 L 64 60 L 68 72" stroke="#FFFFFF" strokeWidth="1.5" />
                      <line x1="54" y1="104" x2="66" y2="104" stroke="#F59E0B" strokeWidth="2" />
                      <line x1="56" y1="108" x2="64" y2="108" stroke="#F59E0B" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-amber-300 mt-2">
                    Ideas today · A better tomorrow
                  </span>
                </div>

                {/* Outer Badges */}
                {/* AI */}
                <div className="absolute top-2 left-2 p-2.5 rounded-xl bg-[#0B0F2B]/90 border border-white/10 shadow-lg flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400">
                    <Bot size={14} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">AI</div>
                    <div className="text-[10px] text-slate-400">Solve smarter</div>
                  </div>
                </div>

                {/* ROBOTICS */}
                <div className="absolute top-2 right-2 p-2.5 rounded-xl bg-[#0B0F2B]/90 border border-white/10 shadow-lg flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-pink-500/15 text-pink-400">
                    <Cpu size={14} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">ROBOTICS</div>
                    <div className="text-[10px] text-slate-400">Automate ideas</div>
                  </div>
                </div>

                {/* WEB */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 p-2.5 rounded-xl bg-[#0B0F2B]/90 border border-white/10 shadow-lg flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-400">
                    <Code2 size={14} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">WEB</div>
                    <div className="text-[10px] text-slate-400">Build for impact</div>
                  </div>
                </div>

                {/* IoT */}
                <div className="absolute top-1/2 -translate-y-1/2 right-0 p-2.5 rounded-xl bg-[#0B0F2B]/90 border border-white/10 shadow-lg flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400">
                    <Radio size={14} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">IoT</div>
                    <div className="text-[10px] text-slate-400">Connect the world</div>
                  </div>
                </div>

                {/* DATA */}
                <div className="absolute bottom-2 left-2 p-2.5 rounded-xl bg-[#0B0F2B]/90 border border-white/10 shadow-lg flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400">
                    <Database size={14} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">DATA</div>
                    <div className="text-[10px] text-slate-400">Turn data to solutions</div>
                  </div>
                </div>

                {/* SOCIAL IMPACT */}
                <div className="absolute bottom-2 right-2 p-2.5 rounded-xl bg-[#0B0F2B]/90 border border-white/10 shadow-lg flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-pink-500/15 text-pink-400">
                    <HeartHandshake size={14} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">SOCIAL IMPACT</div>
                    <div className="text-[10px] text-slate-400">Create change</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ── 2. QUICK ACTIONS (3 Clean, User-Friendly Cards) ── */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Card 1: Submit an Idea */}
            <Link
              href="/ideas/submit"
              className="card-cosmic p-6 rounded-2xl group flex items-center justify-between hover:border-amber-400/40 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Lightbulb size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    Submit an Idea
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Post your project or startup concept.
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-amber-300 group-hover:border-amber-400/40 transition-colors shrink-0 ml-2">
                <ChevronRight size={16} />
              </div>
            </Link>

            {/* Card 2: Find a Team */}
            <a
              href="#team-matching"
              className="card-cosmic p-6 rounded-2xl group flex items-center justify-between hover:border-purple-400/40 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Users size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors">
                    Find a Team
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Discover students with matching skills.
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-purple-300 group-hover:border-purple-400/40 transition-colors shrink-0 ml-2">
                <ChevronRight size={16} />
              </div>
            </a>

            {/* Card 3: Explore Projects */}
            <a
              href="#explore-projects"
              className="card-cosmic p-6 rounded-2xl group flex items-center justify-between hover:border-pink-400/40 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 shrink-0 group-hover:scale-105 transition-transform">
                  <Layers size={22} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-pink-300 transition-colors">
                    Explore Projects
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Browse active campus innovations.
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-pink-300 group-hover:border-pink-400/40 transition-colors shrink-0 ml-2">
                <ChevronRight size={16} />
              </div>
            </a>

          </div>
        </section>

        {/* ── 3. FEATURED IDEAS (Clean, High-Readability 4-Column Cards) ── */}
        {/* ── 3. FEATURED IDEAS (Converted to Reference Image Cards) ── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                <Sparkles size={13} />
                <span>FEATURED CAMPUS IDEAS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Interesting problems students are trying to solve.
              </h2>
            </div>
            <a
              href="#explore-projects"
              className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1 shrink-0"
            >
              <span>View All Projects</span>
              <ArrowRight size={13} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_PROJECTS.map((project, idx) => (
              <Card3D key={project.id} maxTilt={8} scale={1.02} glare={true} className="h-full">
                <div
                  className="group relative h-[290px] sm:h-[330px] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-xl transition-all duration-500 hover:border-blue-500/60 cyber-hud-card"
                >
                  {/* Hologram Laser Sweep */}
                  <div className="holo-scanner-sweep" />

                  {/* Background Image */}
                  <div className="absolute inset-0 w-full h-full">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out brightness-[0.85] group-hover:brightness-95"
                    />
                  </div>

                  {/* Dark Gradient Overlay */}
                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent
                      flex flex-col justify-end p-5 sm:p-6 transition-opacity duration-300
                      ${idx === 0 ? 'opacity-95' : 'opacity-85 group-hover:opacity-100'}
                    `}
                  >
                    {/* Category Pill Tag */}
                    <div className="mb-2 translate-z-20">
                      <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0D6EFD]/80 text-white backdrop-blur-md shadow-sm">
                        {project.tag}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors line-clamp-1 translate-z-10">
                      {project.title}
                    </h3>

                    {/* Subtitle / Description */}
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-1">
                      {project.description}
                    </p>

                    {/* "View Details →" Action Link */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between translate-z-30">
                      <button
                        type="button"
                        onClick={() => {
                          const found = ideas.find((i) => i.id === project.id);
                          if (found) {
                            setSelectedProject(found);
                          } else {
                            setSelectedProject({
                              id: project.id,
                              title: project.title,
                              description: project.description,
                              creator: 'Campus Lead',
                              branch: 'CSE',
                              year: '3',
                              technologies: project.technologies,
                              teamSize: 2,
                              teamTarget: 5,
                              teamMembers: [{ name: 'Lead Contributor', role: 'Architecture' }],
                              lookingFor: ['Developer', 'Designer'],
                              supportNeeded: ['Team'],
                              status: 'Looking for team',
                              featured: true,
                              visual: 'web',
                              createdAt: new Date().toISOString(),
                            });
                          }
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-blue-300 transition-colors group-hover:translate-x-1 duration-200 cursor-pointer"
                      >
                        <span>View Details</span>
                        <ArrowRight size={13} />
                      </button>

                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                        {project.track}
                      </span>
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </section>

        {/* ── 4. TEAM MATCHING ("Your Next Teammate Might Be Here.") ── */}
        <section id="team-matching" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Column: Heading & CTA */}
            <div className="lg:col-span-4 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 uppercase tracking-wider">
                <Users size={14} />
                <span>TEAM RECRUITMENT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Your <span className="text-amber-400">Next Teammate</span> <br />
                Might Be Here.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm">
                Find students with the exact skills your project needs to launch.
              </p>
              <div className="pt-1">
                <Link
                  href="/ideas/submit"
                  className="btn-pill-white text-xs sm:text-sm py-2.5 px-6 inline-flex items-center gap-2 shadow-lg shadow-white/10"
                >
                  <span>Find Teammates</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right Column: 4 Clean Role Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {TALENT_ROLES.map((role) => (
                <div
                  key={role.title}
                  className="card-cosmic p-4 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
                        <role.icon size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{role.title}</h4>
                        <div className="text-xs text-slate-400">{role.skills}</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    {/* Avatars Cluster */}
                    <div className="flex items-center">
                      <div className="flex -space-x-1.5 text-base">
                        {role.avatars.map((av, i) => (
                          <span key={i} className="inline-block p-0.5 rounded-full bg-[#0B0F2B]">
                            {av}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-slate-400 font-bold ml-2">
                        {role.extraCount}
                      </span>
                    </div>

                    {/* Status Dot */}
                    <span className={`text-xs font-semibold ${role.statusText} flex items-center gap-1.5`}>
                      <span className={`w-2 h-2 rounded-full ${role.statusDot}`} />
                      {role.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── 5. BROWSE BY CATEGORY & ALL PROJECTS (Converted to Reference Cards) ── */}
        <section id="explore-projects" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
                <Sparkles size={14} />
                <span>STUDENT INNOVATION PORTFOLIO</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                Explore All Student Projects
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-1">
                Discover real-world applications, interactive systems, and design projects crafted by students.
              </p>
            </div>

            {/* Search Input */}
            <div className="w-full sm:w-80 relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search stacks, titles..."
                className="input-cosmic w-full pl-9 pr-8 text-xs sm:text-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills (Exact Match to Reference Screenshot) */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 py-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`
                    px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300
                    ${isActive
                      ? 'bg-[#1E74FD] text-white shadow-lg shadow-blue-500/30 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
                    }
                  `}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* 3-Column Portfolio Grid (Matching Reference Screenshot) */}
          {filteredProjects.length === 0 ? (
            <div className="card-cosmic p-12 rounded-2xl text-center space-y-3">
              <Lightbulb size={36} className="text-slate-400 mx-auto" />
              <div className="text-base font-bold text-white">No projects found in this category</div>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Try selecting a different category or clearing your search keywords.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="btn-pill-white text-xs py-2 px-5 mt-2"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((item, idx) => {
                const meta = getProjectMeta(item);
                return (
                  <Card3D key={item.id} maxTilt={7} scale={1.02} glare={true} className="h-full">
                    <div
                      className="group relative h-[280px] sm:h-[320px] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-xl transition-all duration-500 hover:border-blue-500/60 cyber-hud-card"
                    >
                      {/* Hologram Laser Sweep */}
                      <div className="holo-scanner-sweep" />

                      {/* Background Project Image */}
                      <div className="absolute inset-0 w-full h-full">
                        <Image
                          src={meta.imageUrl}
                          alt={item.title}
                          fill
                          className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out brightness-[0.85] group-hover:brightness-95"
                        />
                      </div>

                      {/* Dark Gradient Overlay for Readability */}
                      <div
                        className={`
                          absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent
                          flex flex-col justify-end p-6 transition-opacity duration-300
                          ${idx === 1 ? 'opacity-95' : 'opacity-85 group-hover:opacity-100'}
                        `}
                      >
                        {/* Category Pill Tag */}
                        <div className="mb-2.5 translate-z-20">
                          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0D6EFD]/80 text-white backdrop-blur-md shadow-sm">
                            {meta.tag}
                          </span>
                        </div>

                        {/* Project Title */}
                        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-300 transition-colors translate-z-10">
                          {item.title}
                        </h3>

                        {/* Subtitle / Description */}
                        <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-1">
                          {item.description}
                        </p>

                        {/* "View Details →" Action Link */}
                        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between translate-z-30">
                          <button
                            type="button"
                            onClick={() => setSelectedProject(item)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B82F6] hover:text-blue-300 transition-colors group-hover:translate-x-1 duration-200 cursor-pointer"
                          >
                            <span>View Details</span>
                            <ArrowRight size={13} />
                          </button>

                          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                            {meta.track}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card3D>
                );
              })}
            </div>
          )}

          {/* Interactive Project Detail Modal */}
          {selectedProject && (
            <ProjectDetailModal
              project={selectedProject}
              isOpen={!!selectedProject}
              onClose={() => setSelectedProject(null)}
              meta={getProjectMeta(selectedProject)}
            />
          )}
        </section>

        {/* ── 6. MOTIVATIONAL FINAL CTA (Clean, Concise & Colorful) ── */}
        <section className="pt-2">
          <div className="relative rounded-3xl p-8 sm:p-12 text-center overflow-hidden border border-purple-500/30 bg-gradient-to-br from-[#120D2C] via-[#0B0F2B] to-[#1A0B2E] shadow-2xl shadow-purple-950/30">

            {/* Ambient Background Glows */}
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl mx-auto space-y-4 relative z-10">

              {/* Motivational Eyebrow */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-bold text-pink-300">
                <Sparkles size={13} className="text-amber-400" />
                <span>DON'T STOP AT JUST AN IDEA</span>
              </div>

              {/* Punchy Headline */}
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                Don't leave it in your notes. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-amber-400">
                  Build it with people who make it real.
                </span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
                Turn your concept into a working prototype with student engineers across campus.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
                <Link
                  href="/ideas/submit"
                  className="btn-pill-white text-xs sm:text-sm py-3 px-7 shadow-lg shadow-pink-500/20 hover:scale-105 transition-all flex items-center gap-2"
                >
                  <span>Submit Your Idea</span>
                  <ArrowRight size={15} />
                </Link>
                <a
                  href="#explore-projects"
                  className="btn-pill-glass text-xs sm:text-sm py-3 px-7"
                >
                  <span>Browse Existing Projects</span>
                </a>
              </div>

            </div>
          </div>
        </section>

      </main>
    </div>
  );
}