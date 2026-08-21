'use client';

import { useState, useMemo } from 'react';
import {
  Search,
  ArrowRight,
  Box,
  Users,
  Bot,
  Sparkles,
  List,
  MapPin,
  Settings,
  Zap,
  Eye,
  GitBranch,
  Calendar,
  RefreshCcw,
} from 'lucide-react';

import { ideas } from '../../data/ideas';
import type { Idea, IdeaFilters, IdeaVisual } from '../../types/idea';
import { ideaStatusTone } from '../../types/idea';

const ITEM_PER_PAGE = 12;

// Helper to filter and sort ideas
function filterIdeas(
  allIdeas: Idea[],
  filters: IdeaFilters
): Idea[] {
  return allIdeas.filter((idea) => {
    if (filters.q) {
      const q = filters.q.toLowerCase();
      const matches =
        idea.title.toLowerCase().includes(q) ||
        idea.description.toLowerCase().includes(q) ||
        idea.creator.toLowerCase().includes(q) ||
        idea.technologies.some((t) => t.toLowerCase().includes(q)) ||
        idea.lookingFor.some((l) => l.toLowerCase().includes(q));
      if (!matches) return false;
    }
    if (filters.tab) {
      switch (filters.tab) {
        case 'featured':
          if (!idea.featured) return false;
          break;
        case 'recent':
          // recent is handled by sort, not filter
          break;
        case 'team':
          if (!idea.lookingFor.includes('Team') && !idea.supportNeeded.includes('Team')) return false;
          break;
        case 'mentorship':
          if (!idea.lookingFor.includes('Mentorship') && !idea.supportNeeded.includes('Mentorship')) return false;
          break;
        case 'funding':
          if (!idea.lookingFor.includes('Funding') && !idea.supportNeeded.includes('Funding')) return false;
          break;
        default:
          break;
      }
    }
    if (filters.status && idea.status !== filters.status) return false;
    if (filters.tech && !idea.technologies.includes(filters.tech)) return false;
    if (filters.branch && idea.branch !== filters.branch) return false;
    if (filters.year && idea.year !== filters.year) return false;
    if (filters.support && !idea.supportNeeded.includes(filters.support as any)) return false;
    return true;
  });
}

// Component: Eyebrow
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow mb-3">
      {children}
    </p>
  );
}

// Component: Section Header
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

// Component: Idea Card (small version for lists)
function IdeaCardSmall({ idea }: { idea: Idea }) {
  const { dot, text } = ideaStatusTone(idea.status);
  return (
    <a
      href={`/ideas/${idea.id}`}
      className="group surface flex items-center justify-between gap-3 p-4 hover:border-accent/50 transition-colors"
    >
      <div className="min-w-0">
        <h3 className="font-medium group-hover:text-accent transition-colors">{idea.title}</h3>
        <p className="mt-1 text-xs text-mut">
          {idea.creator} · {idea.branch} · {idea.year}
        </p>
        <p className="mt-1 text-xs text-mut line-clamp-2">{idea.description}</p>
        <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
          {idea.technologies.map((tech) => (
            <span key={tech} className="rounded-md bg-surface-2 border border-borderline px-2 py-0.5 text-[11px] text-mut">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
          <span className={text}>{idea.status}</span>
        </div>
      </div>
      <ArrowRight size={16} className="text-mut shrink-0" />
    </a>
  );
}

// Component: Featured Idea (large)
function FeaturedIdea({ idea }: { idea: Idea }) {
  const { dot, text } = ideaStatusTone(idea.status);
  // Determine visual based on idea.visual
  const visualClass = `h-48 w-full rounded-lg bg-surface-2/50 ${idea.visual}-visual`;
  return (
    <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] items-start">
      {/* Left: Large featured idea */}
      <div className="surface p-6">
        <div className={visualClass} aria-label={`Visual for ${idea.title}`}>
          {/* Abstract visual - we'll use a placeholder with icon */}
          <div className="flex h-full w-full items-center justify-center text-mut/40">
            {/* In a real app, this would be a generated visual based on idea.visual */}
            <span className="text-6xl">
              {idea.visual === 'ai' && <Sparkles size={24} />}
              {idea.visual === 'iot' && <Zap size={24} />}
              {idea.visual === 'agriculture' && <MapPin size={24} />}
              {idea.visual === 'campus' && <Users size={24} />}
              {idea.visual === 'web' && <GitBranch size={24} />}
              {idea.visual === 'accessibility' && <Eye size={24} />}
              {idea.visual === 'ar' && <Box size={24} />}
            </span>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-xl font-semibold group-hover:text-accent transition-colors">{idea.title}</h2>
          <p className="mt-2 text-sm text-mut line-clamp-3">{idea.description}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            {idea.technologies.map((tech) => (
              <span key={tech} className="rounded-md bg-surface-2 border border-borderline px-2 py-0.5 text-[11px] text-mut">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3 text-sm">
            <span className="text-mut">Creator:</span>
            <span className="text-fg">{idea.creator}</span>
            <span className="mx-3 text-mut">·</span>
            <span className="text-mut">{idea.branch} · {idea.year}</span>
          </div>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="text-mut">Looking for:</span>
            <span className="text-fg">{idea.lookingFor.join(', ')}</span>
          </div>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="text-mut">Support needed:</span>
            <span className="text-fg">{idea.supportNeeded.join(', ')}</span>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs">
            <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
            <span className={text}>{idea.status}</span>
          </div>
          <a
            href={`/ideas/${idea.id}`}
            className="mt-5 inline-flex items-center gap-2 text-sm text-accent hover:text-accent-strong transition-colors"
          >
            View idea <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Right: Two smaller ideas */}
      <div className="space-y-6">
        {/* We'll pass the two smaller ideas as children */}
      </div>
    </div>
  );
}

// Component: Support Pathway
function SupportPathway({
  icon: Icon,
  title,
  description,
  actionText,
  href,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
  actionText: string;
  href: string;
}) {
  return (
    <a href={href} className="surface p-5 flex flex-col items-start gap-3 hover:border-accent/50 transition-colors group">
      <div className="flex items-center gap-3">
        <Icon size={20} className="text-accent" />
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="mt-1 text-sm text-mut">{description}</p>
        </div>
      </div>
      <div className="self-end">
        <ArrowRight size={14} className="text-accent" />
        <span className="text-sm text-accent">{actionText}</span>
      </div>
    </a>
  );
}

// Component: How It Works Step
function HowItWorksStep({ step, title, description }: { step: number; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0">
        <div className="h-9 w-9 rounded-full border border-accent/40 text-accent flex items-center justify-center text-xs font-semibold">
          {step.toString().padStart(2, '0')}
        </div>
      </div>
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="mt-1 text-sm text-mut">{description}</p>
      </div>
    </div>
  );
}

// Component: Innovation Workflow (for the innovation introduction)
function InnovationWorkflow() {
  return (
    <div className="surface p-6">
      <div className="flex items-center gap-4 text-sm text-mut">
        <div className="h-8 w-8 rounded-full border border-accent/40 text-accent flex items-center justify-center text-xs font-semibold">
          1
        </div>
        <span>IDEA</span>
      </div>
      <div className="h-1 w-px bg-borderline mx-4 my-2" />
      <div className="flex items-center gap-4 text-sm text-mut">
        <div className="h-8 w-8 rounded-full border border-accent/40 text-accent flex items-center justify-center text-xs font-semibold">
          2
        </div>
        <span>TEAM</span>
      </div>
      <div className="h-1 w-px bg-borderline mx-4 my-2" />
      <div className="flex items-center gap-4 text-sm text-mut">
        <div className="h-8 w-8 rounded-full border border-accent/40 text-accent flex items-center justify-center text-xs font-semibold">
          3
        </div>
        <span>BUILD</span>
      </div>
      <div className="h-1 w-px bg-borderline mx-4 my-2" />
      <div className="flex items-center gap-4 text-sm text-mut">
        <div className="h-8 w-8 rounded-full border border-accent/40 text-accent flex items-center justify-center text-xs font-semibold">
          4
        </div>
        <span>SHOWCASE</span>
      </div>
    </div>
  );
}

export default function IdeasPage() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<string>('all');
  const [filters, setFilters] = useState<IdeaFilters>({
    q: '',
    tab: 'all',
  });

  // Update filters when query or tab changes
  // We'll use useEffect but for simplicity, we'll update on change and then re-filter
  // We'll handle search and tab changes in the handlers

  // Filtered ideas
  const filteredIdeas = useMemo(() => {
    return filterIdeas(ideas, { q: query, tab: tab === 'all' ? undefined : tab });
  }, [ideas, query, tab]);

  // Sort by newest first (default)
  const sortedIdeas = useMemo(() => {
    return [...filteredIdeas].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [filteredIdeas]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(sortedIdeas.length / ITEM_PER_PAGE));
  const paginatedIdeas = useMemo(() => {
    const start = (currentPage - 1) * ITEM_PER_PAGE;
    return sortedIdeas.slice(start, start + ITEM_PER_PAGE);
  }, [sortedIdeas, currentPage]);

  // Get featured ideas (featured: true)
  const featuredIdeas = useMemo(() => {
    return ideas.filter((idea) => idea.featured);
  }, [ideas]);

  // Get ideas looking for team (for the team-seeking section)
  const teamSeekingIdeas = useMemo(() => {
    return ideas.filter(
      (idea) =>
        idea.lookingFor.includes('Team') ||
        idea.supportNeeded.includes('Team')
    );
  }, [ideas]);

  // Get recently submitted ideas (sorted by date, take 6)
  const recentIdeas = useMemo(() => {
    return [...ideas]
      .sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 6);
  }, [ideas]);

  // Handlers
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(new FormData(e.currentTarget).get('q')?.toString() ?? '');
    setCurrentPage(1); // reset to first page on search
  };

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
    setCurrentPage(1); // reset to first page when changing tab
  };

  return (
    <main className="container mx-auto p-4">
      {/* 1. PAGE HEADER (below navbar, already in layout via outlet) */}
      {/* We'll add the header content here */}
      <div className="mb-8">
        <Eyebrow>IDEA HUB</Eyebrow>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Turn ideas into something real.
        </h1>
        <p className="text-sm text-mut max-w-xl">
          Share what you're building, find the people you need, and get the support to take your idea further.
        </p>
      </div>

      {/* 2. INNOVATION INTRODUCTION */}
      <section className="mb-12">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr] items-start">
          {/* LEFT */}
          <div>
            <h2 className="text-xl font-semibold mb-3">
              Turn an idea into a project.
            </h2>
            <p className="text-sm text-mut mb-4">
              StudOS Idea Hub is where student ideas gain traction. Submit your concept,
              find collaborators, access mentorship, and secure resources to build
              and showcase your work.
            </p>
          </div>
          {/* RIGHT: Visual workflow */}
          <InnovationWorkflow />
        </div>
      </section>

      {/* 3. SUBMIT IDEA CTA */}
      <section className="mb-12">
        <div className="surface p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">
            Have an idea?
          </h2>
          <p className="text-base text-mut mb-6 max-w-2xl mx-auto">
            Don't wait until it's perfect. Submit it and let us help you find the
            people and support to build it.
          </p>
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <a
              href="/ideas/submit"
              className="btn-primary px-6 py-3 text-base"
            >
              Submit your idea →
            </a>
            <p className="text-xs text-mut">
              Takes about 2 minutes
            </p>
          </div>
        </div>
      </section>

      {/* 4. IDEA DISCOVERY NAVIGATION */}
      <section className="mb-12">
        <div className="surface p-6">
          {/* Search */}
          <form onSubmit={handleSearch} className="mb-6 flex items-center gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-mut" />
              <input
                type="text"
                name="q"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ideas, technologies, problems..."
                className="input-search pl-10 w-full"
              />
            </div>
            <button type="submit" className="btn-primary">
              <Search size={16} className="md:hidden" />
              <span className="hidden md:inline">Search</span>
            </button>
          </form>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'All ideas', value: 'all' },
              { label: 'Featured', value: 'featured' },
              { label: 'Recent', value: 'recent' },
              { label: 'Looking for team', value: 'team' },
              { label: 'Looking for mentorship', value: 'mentorship' },
              { label: 'Looking for funding', value: 'funding' },
            ].map((tabItem) => {
              const isActive = tab === tabItem.value;
              return (
                <button
                  key={tabItem.value}
                  onClick={() => handleTabChange(tabItem.value)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent text-white hover:bg-accent/90'
                      : 'bg-surface-2 text-fg hover:bg-surface hover:text-fg'
                  }`}
                >
                  {tabItem.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FEATURED IDEAS */}
      {featuredIdeas.length > 0 && (
        <section className="mb-14">
          <SectionHeader
            title="Ideas worth building"
            subtitle="Explore what students are thinking about and building."
          />
          {/* We'll show the first featured idea as large, and the next two as small */}
          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] items-start">
            {/* Large featured idea */}
            <FeaturedIdea idea={featuredIdeas[0]} />
            {/* Two smaller ideas */}
            <div className="space-y-6">
              {featuredIdeas.slice(1, 3).map((idea) => (
                <IdeaCardSmall key={idea.id} idea={idea} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. IDEAS LOOKING FOR TEAMMATES */}
      {teamSeekingIdeas.length > 0 && (
        <section className="mb-14">
          <SectionHeader
            title="Good ideas need good teams."
            subtitle="Find ideas that need the skills you already have."
          />
          <div className="surface p-6">
            {/* Horizontal scrollable list */}
            <div className="overflow-x-auto space-x-4">
              <div className="flex min-w-[600px] space-x-4">
                {teamSeekingIdeas.map((idea) => (
                  <a
                    key={idea.id}
                    href={`/ideas/${idea.id}`}
                    className="flex-shrink-0 surface p-5 flex flex-col items-start gap-3 w-64 hover:border-accent/50 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full border border-accent/40 text-accent flex items-center justify-center text-xs font-semibold">
                        {idea.teamSize}/{idea.teamTarget}
                      </div>
                      <div>
                        <h3 className="font-medium">{idea.title}</h3>
                        <p className="mt-1 text-xs text-mut line-clamp-2">{idea.description}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5 text-xs">
                      {idea.technologies.map((tech) => (
                        <span key={tech} className="rounded-md bg-surface-2 border border-borderline px-2 py-0.5 text-[11px] text-mut">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <span className={`h-1.5 w-1.5 rounded-full ${ideaStatusTone(idea.status).dot}`} />
                      <span className={ideaStatusTone(idea.status).text}>
                        {idea.status}
                      </span>
                    </div>
                    <div className="mt-4 self-end">
                      <ArrowRight size={14} className="text-accent" />
                      <span className="text-sm text-accent">[View idea]</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-6 text-center">
              <a
                href="/ideas?tab=team"
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-strong transition-colors"
              >
                Find a project to join → <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 7. SUPPORT / FUNDING SECTION */}
      <section className="mb-14">
        <SectionHeader
          title="More than teammates."
          subtitle="Some ideas need mentorship, infrastructure or funding to move forward."
        />
        <div className="surface p-8 grid gap-6 md:grid-cols-3">
          <SupportPathway
            icon={Users}
            title="TEAM"
            description="Need people with specific skills?"
            actionText="Find collaborators"
            href="/ideas?tab=team"
          />
          <SupportPathway
            icon={Bot}
            title="MENTORSHIP"
            description="Need someone experienced to guide the project?"
            actionText="Request mentorship"
            href="/ideas?tab=mentorship"
          />
          <SupportPathway
            icon={Zap}
            title="FUNDING"
            description="Need resources to build the prototype?"
            actionText="Explore funding support"
            href="/ideas?tab=funding"
          />
        </div>
      </section>

      {/* 8. RECENT IDEAS */}
      {recentIdeas.length > 0 && (
        <section className="mb-14">
          <SectionHeader
            title="Recently submitted"
          />
          <div className="space-y-4">
            {recentIdeas.map((idea) => (
              <IdeaCardSmall key={idea.id} idea={idea} />
            ))}
          </div>
        </section>
      )}

      {/* 9. HOW IT WORKS */}
      <section className="mb-14">
        <SectionHeader
          title="From idea to impact."
        />
        <div className="surface p-8">
          <div className="space-y-6">
            <HowItWorksStep
              step={1}
              title="SUBMIT"
              description="Tell us what you're building."
            />
            <HowItWorksStep
              step={2}
              title="REVIEW"
              description="The StudOS web team reviews your idea."
            />
            <HowItWorksStep
              step={3}
              title="CONNECT"
              description="We help you find teammates, mentors or resources."
            />
            <HowItWorksStep
              step={4}
              title="BUILD"
              description="Turn the idea into a working project."
            />
            <HowItWorksStep
              step={5}
              title="SHOWCASE"
              description="Present your project to the student community and beyond."
            />
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="mb-12">
        <div className="surface p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">
            Have something worth building?
          </h2>
          <p className="text-base text-mut mb-6 max-w-2xl mx-auto">
            Your idea doesn't need to be perfect. It just needs a place to start.
          </p>
          <a
            href="/ideas/submit"
            className="btn-primary px-6 py-3 text-base"
          >
            Submit your idea →
          </a>
        </div>
      </section>
    </main>
  );
}