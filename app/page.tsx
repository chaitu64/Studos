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
  BookOpen,
  Calendar,
  Timer,
  Brain,
  Code2,
  Box,
  Trophy,
  Briefcase,
  GraduationCap,
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
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-mut">{subtitle}</p>}
      </div>
      {href && linkLabel && (
        <a
          href={href}
          className="shrink-0 flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-accent-strong"
        >
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
    <section className="relative py-16 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-surface via-surface/90 to-surface/95">
      <div className="absolute inset-0 pointer-events-none">
        <div className="h-full w-full opacity-20 -rotate-6 origin-top-left" />
        <div className="h-full w-full opacity-10 -rotate-6 origin-bottom-right" />
      </div>
      <div className="container-s relative">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] max-w-2xl">
          <div>
            <p className="eyebrow mb-3 tracking-wider text-indigo-400">Student operating system</p>
            <h1 className="max-w-xl text-5xl font-semibold leading-[1.1] tracking-tight md:text-6xl lg:text-[3.5rem] text-indigo-900">
              Discover. Connect. Build.
            </h1>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-indigo-400 md:text-xl">
              Find opportunities, meet the right people, and turn your ideas into projects that matter.
            </p>

            <form
              className="mt-6 flex items-center gap-2 max-w-md"
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/opportunities?q=${encodeURIComponent(q)}`);
              }}
            >
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-indigo-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search opportunities, skills, projects..."
                  className="input-search w-full py-3 px-4 rounded-lg border border-borderline bg-surface/50 text-indigo-400 placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button type="submit" className="btn-primary py-3 px-6 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors">
                <Search size={16} className="md:hidden" />
                <span className="hidden md:inline">Search</span>
              </button>
            </form>

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <span className="text-xs font-medium text-indigo-400 uppercase tracking-wider">Popular:</span>
              {['Hackathons', 'Internships', 'AI/ML', 'Web Development', 'Robotics'].map((tag) => (
                <a key={tag} href={`/opportunities?q=${encodeURIComponent(tag)}`} className="text-indigo-400 hover:text-indigo-300 transition-colors px-2 py-1 rounded bg-indigo-500/5 text-xs font-medium">
                  {tag}
                </a>
              ))}
            </div>

            <div className="mt-4 flex gap-3">
              <a href="/opportunities" className="btn-primary">
                Explore Opportunities
              </a>
              <a href="/ideas/submit" className="btn-subtle">
                Submit an Idea
              </a>
            </div>
          </div>

          <div className="surface p-4 rounded-lg animate-fade-up">
            <p className="eyebrow mb-3 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
              For you
              <span className="ml-auto text-[10px] uppercase tracking-normal text-indigo-400">Live feed</span>
            </p>
            <div className="space-y-3">
              {heroFeed.map((item, i) => (
                <a
                  key={i}
                  href={i === 0 ? '/opportunities/ai-hackathon' : '/opportunities'}
                  className="block rounded-lg border border-borderline bg-surface-2/60 px-3 py-2.5 transition-colors hover:border-accent/50 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-mut">{item.tag}</span>
                    <span className="text-[11px] text-warning">{item.meta}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium transition-colors group-hover:text-accent">{item.title}</p>
                  <p className="mt-0.5 text-xs text-mut">{item.skills}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const QUICK_ACTIONS = [
  { icon: Compass, label: 'Explore Opportunities', href: '/opportunities' },
  { icon: Lightbulb, label: 'Submit an Idea', href: '/ideas/submit' },
  { icon: Users, label: 'Find Teammates', href: '/opportunities' },
  { icon: Rocket, label: 'Showcase Project', href: '/projects' },
  { icon: BookOpen, label: 'Academic Resources', href: '/resources' },
];

function QuickActions() {
  return (
    <section className="container-s pb-10 bg-surface/50">
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {QUICK_ACTIONS.map(({ icon: Icon, label, href }) => (
          <a
            key={href}
            href={href}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-borderline bg-surface px-3.5 py-2 text-sm text-indigo-400 transition-colors hover:border-indigo-600/50"
          >
            <Icon size={16} className="text-indigo-400" />
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
    <section className="container-s py-8 bg-surface/50">
      <SectionHeader
        title="Opportunities worth your attention"
        subtitle="Deadlines coming up and opportunities worth exploring."
        href="/opportunities"
        linkLabel="View all"
      />
      <div className="surface divide-y divide-border rounded-lg">
        {opportunities.map((o) => (
          <a
            key={o.id}
            href={`/opportunities/${o.id}`}
            className="group flex flex-col gap-3 px-4 py-4 rounded-md transition-colors hover:bg-indigo-500/10 md:flex-row md:items-center"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wide text-indigo-400">{o.org}</p>
              <p className="mt-0.5 font-medium group-hover:text-indigo-400 transition-colors">{o.title}</p>
              <p className="mt-1 text-xs text-mut">
                {o.type} · {o.location}
              </p>
              <p className="mt-1 text-xs text-mut">{o.skills.join(' · ')}</p>
            </div>
            <div className="flex items-center gap-3 md:flex-col md:items-end">
              <div>
                <p className="text-xs uppercase tracking-wide text-mut">Deadline</p>
                <p className="text-sm font-medium">{o.deadline}</p>
                <DeadlineBadge status={o.status} label={`${o.daysLeft} days left`} />
              </div>
              <span className="flex items-center gap-1 rounded-md bg-indigo-500/10 px-2.5 py-0.5 text-xs text-indigo-400 font-medium md:hidden group-hover:text-indigo-300">
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
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c) => {
          const Icon = CATEGORY_ICONS[c.id] ?? Compass;
          return (
            <a
              key={c.id}
              href={`/opportunities?type=${c.name.toLowerCase()}`}
              className="rounded-lg border border-borderline bg-surface px-3 py-2.5 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center gap-2">
                <Icon size={15} className="text-mut" />
                <span className="text-sm font-medium">{c.name}</span>
              </div>
              <p className="mt-1 pl-[22px] text-xs text-mut">{c.count} opportunities</p>
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
      <div className="grid gap-4 md:grid-cols-2">
        <div className="surface p-4">
          <p className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Calendar size={15} className="text-accent" /> Upcoming campus events
          </p>
          <div className="space-y-3">
            {hotEvents.map((ev, i) => (
              <a key={i} href="/opportunities" className="group flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg border border-borderline bg-surface-2">
                  <span className="text-sm font-bold leading-none">{ev.day}</span>
                  <span className="text-[10px] uppercase text-mut">{ev.month}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium transition-colors group-hover:text-accent">{ev.title}</p>
                  <p className="text-xs text-mut">{ev.location}</p>
                </div>
                <span className="shrink-0 text-xs text-mut">{ev.time}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="surface p-4">
          <p className="mb-3 flex items-center gap-2 text-sm font-medium">
            <Timer size={15} className="text-warning" /> Important deadlines
          </p>
          <div className="space-y-3">
            {deadlines.map((d) => (
              <div key={d.title} className="flex items-center justify-between gap-3">
                <a href="/opportunities" className="text-sm transition-colors hover:text-accent">
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
      <div className="grid gap-4 md:grid-cols-2">
        <a href={`/projects/${featuredProject.id}`} className="group surface overflow-hidden p-0">
          <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-surface-2 to-borderline">
            <Box size={56} className="text-mut/40 transition-colors group-hover:text-accent/50" />
            <span className="absolute left-3 top-3 rounded border border-borderline bg-bg/80 px-2 py-1 text-[10px] uppercase tracking-wider text-mut">
              Featured
            </span>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">{featuredProject.name}</h3>
            <p className="mt-1 text-xs text-mut">{featuredProject.tech.join(' · ')}</p>
            <p className="mt-2 text-sm leading-relaxed text-mut">{featuredProject.desc}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-mut">Team of {featuredProject.team}</span>
              <span className="flex items-center gap-1 text-sm text-accent">
                View Project <ArrowRight size={14} />
              </span>
            </div>
          </div>
        </a>

        <div className="flex flex-col gap-4">
          {secondaryProjects.map((p) => (
            <a key={p.id} href={`/projects/${p.id}`} className="group surface flex flex-1 items-center gap-3 p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-borderline bg-surface-2">
                <Rocket size={20} className="text-mut" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-medium transition-colors group-hover:text-accent">{p.name}</h4>
                <p className="text-xs text-mut">{p.tech.join(' · ')}</p>
              </div>
              <ArrowRight size={16} className="shrink-0 text-mut" />
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
      <div className="grid items-start gap-4 md:grid-cols-2">
        <div className="surface p-5">
          <p className="eyebrow mb-4">How StudOS works</p>
          <div>
            {WORKFLOW.map((step, i) => (
              <div key={step}>
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-accent/40 text-xs font-semibold text-accent">
                    {i + 1}
                  </span>
                  <span className="font-medium">{step}</span>
                </div>
                {i < WORKFLOW.length - 1 && <div className="ml-[13px] h-5 w-px bg-borderline" />}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {activeIdeas.map((idea) => (
            <a
              key={idea.id}
              href={`/ideas/${idea.id}`}
              className="group surface flex items-center justify-between gap-3 p-4 transition-colors hover:border-accent/50"
            >
              <div className="min-w-0">
                <p className="font-medium transition-colors group-hover:text-accent">{idea.title}</p>
                <p className="mt-1 text-xs text-mut">
                  Looking for: <span className="text-fg">{idea.lookingFor.join(', ')}</span>
                </p>
                <p className="text-xs text-mut">
                  Support: <span className="text-accent">{idea.support}</span>
                </p>
              </div>
              <ArrowRight size={16} className="shrink-0 text-mut" />
            </a>
          ))}
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
      <div className="grid items-start gap-4 md:grid-cols-2">
        <div className="grid grid-cols-2 gap-2">
          {years.map((y) => (
            <a
              key={y}
              href="/resources"
              className="rounded-lg border border-borderline bg-surface px-3 py-3 transition-colors hover:border-accent/50"
            >
              <p className="text-sm font-medium">{y}</p>
              <p className="text-xs text-mut">View resources</p>
            </a>
          ))}
        </div>
        <div className="surface flex items-center justify-between p-4">
          <p className="text-xs text-mut">Navigate by</p>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="rounded-md border border-borderline bg-surface-2 px-2 py-1">Year</span>
            <ArrowRight size={12} className="text-mut" />
            <span className="rounded-md border border-borderline bg-surface-2 px-2 py-1">Branch</span>
            <ArrowRight size={12} className="text-mut" />
            <span className="rounded-md border border-borderline bg-surface-2 px-2 py-1">Semester</span>
            <ArrowRight size={12} className="text-mut" />
            <span className="rounded-md border border-accent/40 bg-accent/20 px-2 py-1 text-accent">Subject</span>
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
          <div className="flex flex-wrap gap-3">
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
      <div className="surface p-8 text-center md:p-10">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Your next opportunity could start here.
        </h2>
        <a href="/opportunities" className="btn-primary mt-5 inline-flex items-center gap-2">
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
    <footer className="mt-8 border-t border-borderline">
      <div className="container-s grid gap-8 py-10 md:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent text-sm font-bold text-white">
              S
            </span>
            <span className="text-lg font-semibold tracking-tight">StudOS</span>
          </div>
          <p className="mt-2 text-sm text-mut">Discover. Connect. Build.</p>
          <p className="mt-1 text-xs text-mut">
            The student operating system for opportunities, teams, projects, and campus.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p className="mb-2 text-xs uppercase tracking-wide text-mut">{col.heading}</p>
              <ul className="space-y-1.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-fg/80 transition-colors hover:text-accent">
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
        <div className="container-s flex flex-wrap items-center justify-between gap-2 py-4">
          <p className="text-xs text-mut">© {new Date().getFullYear()} StudOS. Demo prototype.</p>
          <p className="text-xs text-mut">Made by students, for students.</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <Hero />
      <QuickActions />
      <OpportunitiesSection />
      <CategoriesSection />
      <HappeningNow />
      <StudentInnovation />
      <IdeaHubPreview />
      <ResourcesPreview />
      <Personalization />
      <FinalCta />
      <Footer />
    </div>
  );
}