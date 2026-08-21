'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowRight,
  Search,
  Compass,
  Lightbulb,
  Users,
  Rocket,
  MapPin,
  BookOpen,
  Calendar,
  Timer,
  Brain,
  CircuitBoard,
  Eye,
  GraduationCap,
  Code2,
  Box,
  Bot,
  Briefcase,
  Trophy,
} from 'lucide-react';
import {
  opportunities,
  categories,
  heroFeed,
  hotEvents,
  deadlines,
  featuredProject,
  secondaryProjects,
  activeIdeas,
  students,
  campusBuildings,
  campusHighlights,
  years,
  personalization,
  STATUS_STYLES,
  type DeadlineStatus,
} from '../data/home';

function SectionHeader({
  title,
  subtitle,
  href,
  linkLabel,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-mut">{subtitle}</p>}
      </div>
      {href && linkLabel && (
        <a href={href} className="flex items-center gap-1.5 text-sm text-accent hover:text-accent-strong transition-colors shrink-0">
          {linkLabel} <ArrowRight size={15} />
        </a>
      )}
    </div>
  );
}

function Hero() {
  const router = useRouter();
  const [q, setQ] = useState('');

  return (
    <section className="container-s pt-8 pb-5">
      <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr]">
        {/* Left */}
        <div>
          <p className="eyebrow mb-3">Student operating system</p>
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl lg:text-[3.5rem]">
            Discover. Connect. Build.
          </h1>
          <p className="mt-4 text-base md:text-lg text-mut max-w-md leading-relaxed">
            Find opportunities, meet the right people, and turn your ideas into projects.
          </p>

          {/* Search */}
          <form
            className="mt-6 flex items-center gap-2 max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/opportunities?q=${encodeURIComponent(q)}`);
            }}
          >
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mut" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search opportunities, skills, projects..."
                className="input-search pl-10 w-full"
              />
            </div>
            <button type="submit" className="btn-primary" aria-label="Search">
              <Search size={16} className="md:hidden" />
              <span className="hidden md:inline">Search</span>
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-mut">
            <span>Popular:</span>
            {['Hackathons', 'Internships', 'AI/ML', 'Web Development', 'Robotics'].map((tag) => (
              <a key={tag} href={`/opportunities?q=${encodeURIComponent(tag)}`} className="text-fg/80 hover:text-accent">
                {tag}
              </a>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-3">
            <a href="/opportunities" className="btn-primary">
              Explore Opportunities
            </a>
            <a href="/ideas/submit" className="btn-subtle">
              Submit an Idea
            </a>
          </div>
        </div>

        {/* Right: activity panel */}
        <div className="surface p-4 animate-fade-up">
          <p className="eyebrow mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            For you
            <span className="ml-auto normal-case tracking-normal text-[10px] text-success">Live feed</span>
          </p>
          <div className="space-y-3">
            {heroFeed.map((item, i) => (
              <a
                key={i}
                href={i === 0 ? '/opportunities/ai-hackathon' : '/campus/events'}
                className="block rounded-lg border border-borderline bg-surface-2/60 px-3 py-2.5 hover:border-accent/50 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium tracking-wider text-mut uppercase">{item.tag}</span>
                  <span className="text-[11px] text-warning">{item.meta}</span>
                </div>
                <p className="mt-1 text-sm font-medium group-hover:text-accent transition-colors">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs text-mut">{item.skills}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const QUICK_ACTIONS = [
  { icon: Compass, label: 'Explore Opportunities', href: '/opportunities' },
  { icon: Lightbulb, label: 'Submit an Idea', href: '/ideas/submit' },
  { icon: Users, label: 'Find Teammates', href: '/teams' },
  { icon: Rocket, label: 'Showcase Project', href: '/projects' },
  { icon: MapPin, label: 'Explore Campus', href: '/campus' },
  { icon: BookOpen, label: 'Academic Resources', href: '/resources' },
];

function QuickActions() {
  return (
    <section className="container-s pb-10">
      <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {QUICK_ACTIONS.map(({ icon: Icon, label, href }) => (
          <a
            key={href}
            href={href}
            className="flex items-center gap-2 shrink-0 rounded-lg border border-borderline bg-surface px-3.5 py-2 text-sm text-fg hover:border-accent/50 transition-colors"
          >
            <Icon size={16} className="text-mut" />
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}

function DeadlineBadge({ status, label }: { status: DeadlineStatus; label: string }) {
  const dot = status === 'plenty' ? 'bg-success' : status === 'approaching' ? 'bg-warning' : 'bg-error';
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${STATUS_STYLES[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function OpportunitiesSection() {
  return (
    <section className="container-s py-8">
      <SectionHeader
        title="Opportunities worth your attention"
        subtitle="Deadlines coming up and opportunities worth exploring."
        href="/opportunities"
        linkLabel="View all"
      />
      <div className="surface divide-y divide-borderline">
        {opportunities.map((o) => (
          <a
            key={o.id}
            href={`/opportunities/${o.id}`}
            className="group flex flex-col md:flex-row md:items-center gap-3 px-4 py-4 hover:bg-surface-2/50 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs text-mut uppercase tracking-wide">{o.org}</p>
              <p className="mt-0.5 font-medium group-hover:text-accent transition-colors">{o.title}</p>
              <p className="mt-1 text-xs text-mut">
                {o.type} · {o.location}
              </p>
              <p className="mt-1 text-xs text-mut">{o.skills.join(' · ')}</p>
            </div>
            <div className="flex items-center gap-4 md:flex-col md:items-end shrink-0">
              <div className="text-right">
                <p className="text-[10px] text-mut uppercase tracking-wide">Deadline</p>
                <p className="text-sm font-medium">{o.deadline}</p>
                <DeadlineBadge status={o.status} label={`${o.daysLeft} days left`} />
              </div>
              <span className="flex items-center gap-1 text-sm text-accent md:hidden group-hover:text-accent-strong">
                View <ArrowRight size={14} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

const CATEGORY_ICONS: Record<string, typeof Compass> = {
  hackathons: Code2,
  internships: Briefcase,
  competitions: Trophy,
  fellowships: GraduationCap,
  research: Brain,
  workshops: Users,
};

function CategoriesSection() {
  return (
    <section className="container-s py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {categories.map((c) => {
          const Icon = CATEGORY_ICONS[c.id] ?? Compass;
          return (
            <a
              key={c.id}
              href={`/opportunities?type=${c.name.toLowerCase()}`}
              className="rounded-lg border border-borderline bg-surface px-3 py-2.5 hover:border-accent/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Icon size={15} className="text-mut" />
                <span className="text-sm font-medium">{c.name}</span>
              </div>
              <p className="mt-1 text-xs text-mut pl-[22px]">{c.count} opportunities</p>
            </a>
          );
        })}
      </div>
    </section>
  );
}

function HappeningNow() {
  return (
    <section className="container-s py-8">
      <SectionHeader title="What's happening now" />
      <div className="grid md:grid-cols-2 gap-4">
        {/* Events */}
        <div className="surface p-4">
          <p className="flex items-center gap-2 text-sm font-medium mb-3">
            <Calendar size={15} className="text-accent" /> Upcoming campus events
          </p>
          <div className="space-y-3">
            {hotEvents.map((ev, i) => (
              <a key={i} href="/campus/events" className="flex items-center gap-3 group">
                <div className="flex flex-col items-center justify-center h-11 w-11 rounded-lg border border-borderline bg-surface-2 shrink-0">
                  <span className="text-sm font-bold leading-none">{ev.day}</span>
                  <span className="text-[10px] text-mut uppercase">{ev.month}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium group-hover:text-accent transition-colors">{ev.title}</p>
                  <p className="text-xs text-mut">{ev.location}</p>
                </div>
                <span className="text-xs text-mut shrink-0">{ev.time}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Deadlines */}
        <div className="surface p-4">
          <p className="flex items-center gap-2 text-sm font-medium mb-3">
            <Timer size={15} className="text-warning" /> Important deadlines
          </p>
          <div className="space-y-3">
            {deadlines.map((d) => (
              <div key={d.title} className="flex items-center justify-between">
                <a href="/opportunities" className="text-sm group-hover:text-accent hover:text-accent transition-colors">
                  {d.title}
                </a>
                <DeadlineBadge status={d.status} label={`${d.daysLeft} days left`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StudentInnovation() {
  return (
    <section className="container-s py-8">
      <SectionHeader
        title="What students are building"
        subtitle="Discover projects and ideas being built by students."
        href="/projects"
        linkLabel="View all projects"
      />
      <div className="grid md:grid-cols-2 gap-4">
        {/* Featured project */}
        <a
          href={`/projects/${featuredProject.id}`}
          className="group surface p-0 overflow-hidden"
        >
          <div className="h-44 bg-gradient-to-br from-surface-2 to-borderline flex items-center justify-center relative">
            <Box size={56} className="text-mut/40 group-hover:text-accent/50 transition-colors" />
            <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded bg-bg/80 border border-borderline text-mut">
              Featured
            </span>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold group-hover:text-accent transition-colors">{featuredProject.name}</h3>
            <p className="mt-1 text-xs text-mut">{featuredProject.tech.join(' · ')}</p>
            <p className="mt-2 text-sm text-mut leading-relaxed">{featuredProject.desc}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-mut">Team of {featuredProject.team}</span>
              <span className="flex items-center gap-1 text-sm text-accent">
                View Project <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </a>

        {/* Two smaller projects */}
        <div className="flex flex-col gap-4">
          {secondaryProjects.map((p) => (
            <a key={p.id} href={`/projects/${p.id}`} className="group surface flex items-center gap-3 p-4 flex-1">
              <div className="h-12 w-12 rounded-lg bg-surface-2 border border-borderline flex items-center justify-center shrink-0">
                <Rocket size={20} className="text-mut" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium group-hover:text-accent transition-colors">{p.name}</h4>
                <p className="text-xs text-mut">{p.tech.join(' · ')}</p>
              </div>
              <ArrowRight size={16} className="text-mut shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

const WORKFLOW = ['Idea', 'Team', 'Build', 'Showcase'];

function IdeaHubPreview() {
  return (
    <section className="container-s py-8">
      <SectionHeader
        title="Have an idea?"
        subtitle="Don't build it alone. Find the people, skills and support you need."
        href="/ideas"
        linkLabel="Explore Idea Hub"
      />
      <div className="grid md:grid-cols-2 gap-4 items-start">
        {/* Workflow */}
        <div className="surface p-5">
          <p className="eyebrow mb-4">How StudOS works</p>
          <div className="space-y-0">
            {WORKFLOW.map((step, i) => (
              <div key={step}>
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-full border border-accent/40 text-accent flex items-center justify-center text-xs font-semibold">
                    {i + 1}
                  </span>
                  <span className="font-medium">{step}</span>
                </div>
                {i < WORKFLOW.length - 1 && (
                  <div className="ml-[13px] h-5 w-px bg-borderline" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active ideas */}
        <div className="space-y-3">
          {activeIdeas.map((idea) => (
            <a
              key={idea.id}
              href={`/ideas/${idea.id}`}
              className="group surface flex items-center justify-between gap-3 p-4 hover:border-accent/50 transition-colors"
            >
              <div className="min-w-0">
                <p className="font-medium group-hover:text-accent transition-colors">{idea.title}</p>
                <p className="mt-1 text-xs text-mut">
                  Looking for: <span className="text-fg">{idea.lookingFor.join(', ')}</span>
                </p>
                <p className="text-xs text-mut">
                  Support: <span className="text-accent">{idea.support}</span>
                </p>
              </div>
              <ArrowRight size={16} className="text-mut shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="container-s py-8">
      <SectionHeader
        title="Find the people you need"
        subtitle="Have the idea but missing a skill?"
        href="/teams"
        linkLabel="Find Teammates"
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {students.map((s) => (
          <a key={s.name} href="/teams" className="group surface p-4 hover:border-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-surface-2 border border-borderline flex items-center justify-center text-sm font-semibold text-accent shrink-0">
                {s.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium group-hover:text-accent transition-colors">{s.name}</p>
                <p className="text-xs text-mut">{s.branch} · {s.year}</p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {s.skills.map((sk) => (
                <span key={sk} className="rounded-md bg-surface-2 border border-borderline px-2 py-0.5 text-[11px] text-mut">
                  {sk}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-mut">
              Looking for: <span className="text-fg">{s.lookingFor.join(' / ')}</span>
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}

function CampusPreview() {
  return (
    <section className="container-s py-8">
      <SectionHeader
        title="Everything happening on campus"
        href="/campus"
        linkLabel="Explore Campus"
      />
      <div className="grid md:grid-cols-2 gap-4">
        {/* Stylized campus map */}
        <div className="surface p-4">
          <div className="rounded-lg border border-borderline bg-bg p-4 min-h-[220px] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            {campusBuildings.map((b, i) => {
              const positions = [
                { top: '18%', left: '15%' },
                { top: '30%', left: '55%' },
                { top: '55%', left: '20%' },
                { top: '62%', left: '62%' },
                { top: '20%', left: '80%' },
              ];
              return (
                <div
                  key={b.id}
                  className="absolute group cursor-pointer"
                  style={positions[i]}
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-accent group-hover:scale-125 transition-transform" />
                  <p className="mt-1 text-[10px] text-mut group-hover:text-fg transition-colors">{b.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Today's highlights */}
        <div className="surface p-4">
          <p className="eyebrow mb-3">Today's highlights</p>
          <div className="space-y-3">
            {campusHighlights.map((h) => (
              <div key={h.title} className="flex items-center justify-between border-b border-borderline pb-3 last:border-0 last:pb-0">
                <span className="text-sm">{h.title}</span>
                <span className="text-xs text-mut">{h.when}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourcesPreview() {
  return (
    <section className="container-s py-8">
      <SectionHeader
        title="Need to study?"
        subtitle="Find previous papers, notes, syllabi and academic resources."
        href="/resources"
        linkLabel="Explore Resources"
      />
      <div className="grid md:grid-cols-2 gap-4 items-start">
        <div className="grid grid-cols-2 gap-2">
          {years.map((y) => (
            <a
              key={y}
              href="/resources"
              className="rounded-lg border border-borderline bg-surface px-3 py-3 hover:border-accent/50 transition-colors"
            >
              <p className="text-sm font-medium">{y}</p>
              <p className="text-xs text-mut">View resources</p>
            </a>
          ))}
        </div>
        <div className="surface p-4 flex items-center justify-between">
          <p className="text-xs text-mut">Navigate by</p>
          <div className="flex items-center gap-1.5 text-xs">
            <span className="rounded-md bg-surface-2 border border-borderline px-2 py-1">Year</span>
            <ArrowRight size={12} className="text-mut" />
            <span className="rounded-md bg-surface-2 border border-borderline px-2 py-1">Branch</span>
            <ArrowRight size={12} className="text-mut" />
            <span className="rounded-md bg-surface-2 border border-borderline px-2 py-1">Semester</span>
            <ArrowRight size={12} className="text-mut" />
            <span className="rounded-md bg-accent/20 border border-accent/40 px-2 py-1 text-accent">Subject</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Personalization() {
  return (
    <section className="container-s py-8">
      <div className="surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="eyebrow mb-1">Demo preview</p>
            <h2 className="text-xl font-semibold tracking-tight">Built around you</h2>
            <p className="mt-1 text-sm text-mut">Based on your interests:</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <div className="rounded-lg border border-borderline bg-surface-2 px-3 py-2">
              <p className="text-lg font-semibold">{personalization.aiMlOpportunities}</p>
              <p className="text-xs text-mut">AI/ML opportunities</p>
            </div>
            <div className="rounded-lg border border-borderline bg-surface-2 px-3 py-2">
              <p className="text-lg font-semibold">{personalization.hackathons}</p>
              <p className="text-xs text-mut">Hackathons</p>
            </div>
            <div className="rounded-lg border border-borderline bg-surface-2 px-3 py-2">
              <p className="text-lg font-semibold">{personalization.projectsLooking}</p>
              <p className="text-xs text-mut">Projects looking for teammates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="container-s py-12">
      <div className="surface p-8 md:p-10 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Your next opportunity could start here.
        </h2>
        <a href="/opportunities" className="btn-primary inline-flex items-center gap-2 mt-5">
          Explore StudOS <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}

const FOOTER_COLS = [
  {
    heading: 'Product',
    links: [
      { label: 'Opportunities', href: '/opportunities' },
      { label: 'Ideas', href: '/ideas' },
      { label: 'Teams', href: '/teams' },
      { label: 'Projects', href: '/projects' },
    ],
  },
  {
    heading: 'Campus',
    links: [
      { label: 'Campus', href: '/campus' },
      { label: 'Classrooms', href: '/campus/classrooms' },
      { label: 'Events', href: '/campus/events' },
    ],
  },
  {
    heading: 'Resources',
    links: [{ label: 'Academic Resources', href: '/resources' }],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
];

function Footer() {
  return (
    <footer className="border-t border-borderline mt-8">
      <div className="container-s py-10 grid md:grid-cols-[1.5fr_1fr] gap-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-md bg-accent flex items-center justify-center text-white text-sm font-bold">S</span>
            <span className="text-lg font-semibold tracking-tight">StudOS</span>
          </div>
          <p className="mt-2 text-sm text-mut">Discover. Connect. Build.</p>
          <p className="mt-1 text-xs text-mut">
            The student operating system for opportunities, teams, projects, and campus.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p className="text-xs uppercase tracking-wide text-mut mb-2">{col.heading}</p>
              <ul className="space-y-1.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-fg/80 hover:text-accent transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-borderline">
        <div className="container-s py-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-mut">© {new Date().getFullYear()} StudOS. Demo prototype.</p>
          <p className="text-xs text-mut">Made by students, for students.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
      <div className="min-h-screen">
        <Hero />
        <QuickActions />
        <OpportunitiesSection />
      <CategoriesSection />
      <HappeningNow />
      <StudentInnovation />
      <IdeaHubPreview />
      <TeamSection />
      <CampusPreview />
      <ResourcesPreview />
      <Personalization />
      <FinalCta />
        <Footer />
      </div>
  );
}