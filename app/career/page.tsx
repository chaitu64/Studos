'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  Compass,
  ExternalLink,
  GitBranch,
  Layers3,
  Lock,
  Map,
  Sparkles,
  Target,
  Trophy,
} from 'lucide-react';
import type { Career, CareerRecommendation, LearningResource } from '../../types/career';
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

const fallbackProfile: CareerForm = {
  year: '2',
  branch: 'AIML',
  interests: ['AI / ML'],
  currentSkills: ['Python'],
  experience: 'Beginner',
  goal: 'Internship',
  careerInterests: ['AI / ML Engineer'],
};

const navItems = [
  ['overview', 'Overview'],
  ['explore', 'Explore careers'],
  ['path', 'My path'],
  ['learning', 'Learning'],
  ['projects', 'Projects'],
  ['opportunities', 'Opportunities'],
] as const;

export default function CareerPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [careerState, setCareerState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [recommendation, setRecommendation] = useState<CareerRecommendation | null>(null);
  const [recommendationState, setRecommendationState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState<Record<string, number>>({});

  const form = useForm<CareerForm>({
    resolver: zodResolver(careerSchema),
    defaultValues: fallbackProfile,
  });

  useEffect(() => {
    fetch('/api/career')
      .then((response) => {
        if (!response.ok) throw new Error('Careers unavailable');
        return response.json();
      })
      .then((data: { items: Career[] }) => {
        setCareers(data.items);
        setSelectedCareer(data.items[0] ?? null);
        setCareerState('ready');
      })
      .catch(() => setCareerState('error'));

    const stored = window.localStorage.getItem('studos-career-progress');
    if (stored) setProgress(JSON.parse(stored));
  }, []);

  const filteredCareers = useMemo(
    () => activeCategory === 'all' ? careers : careers.filter((career) => career.category === activeCategory),
    [activeCategory, careers]
  );

  function updateProgress(skill: string, value: number) {
    setProgress((current) => {
      const next = { ...current, [skill]: value };
      window.localStorage.setItem('studos-career-progress', JSON.stringify(next));
      return next;
    });
  }

  async function onSubmit(profile: CareerForm) {
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
      setTimeout(() => document.getElementById('path')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    } catch (error) {
      setRecommendationState('error');
      setErrorMessage(error instanceof Error ? error.message : 'We could not build your path.');
    }
  }

  return (
    <div className="container-s py-8 md:py-10">
      <section id="overview" className="border-b border-borderline pb-8">
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Career</p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">Know where you&apos;re going. Know what to learn.</h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-mut">Tell StudOS where you are today and we&apos;ll help you understand what to learn next.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#build-path" className="btn-primary inline-flex items-center gap-2">Build my career path <ArrowRight size={16} /></a>
            <a href="#explore" className="btn-subtle inline-flex items-center gap-2">Explore careers <Compass size={16} /></a>
          </div>
        </div>
        <div className="mt-10 grid gap-3 border-t border-borderline pt-5 text-sm sm:grid-cols-3">
          <div><p className="text-mut">01</p><p className="mt-1 font-medium">Find a direction</p></div>
          <div><p className="text-mut">02</p><p className="mt-1 font-medium">Learn with intention</p></div>
          <div><p className="text-mut">03</p><p className="mt-1 font-medium">Build proof</p></div>
        </div>
      </section>

      <nav className="sticky top-16 z-20 -mx-5 overflow-x-auto border-b border-borderline bg-bg/95 px-5 backdrop-blur" aria-label="Career sections">
        <div className="flex min-w-max gap-6 py-3 text-sm">
          {navItems.map(([href, label]) => <a key={href} href={`#${href}`} className="text-mut transition-colors hover:text-fg">{label}</a>)}
        </div>
      </nav>

      <section id="explore" className="scroll-mt-28 py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow mb-2">Explore careers</p><h2 className="text-2xl font-semibold tracking-tight">A direction, not a job title.</h2><p className="mt-1 text-sm text-mut">See what different technology careers look like and what they require.</p></div>
          <div className="flex items-center gap-2 text-sm text-mut"><Layers3 size={16} /> {careers.length} paths to explore</div>
        </div>
        <div className="flex gap-2 overflow-x-auto border-b border-borderline pb-3">
          {CAREER_CATEGORIES.slice(0, 5).map((category) => <button key={category.value} onClick={() => setActiveCategory(category.value)} className={`whitespace-nowrap px-3 py-1.5 text-sm transition-colors ${activeCategory === category.value ? 'border-b-2 border-accent text-fg' : 'text-mut hover:text-fg'}`}>{category.label}</button>)}
        </div>
        {careerState === 'loading' && <CareerDirectorySkeleton />}
        {careerState === 'error' && <InlineError message="Careers aren't available right now." onRetry={() => window.location.reload()} />}
        {careerState === 'ready' && (
          <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="divide-y divide-borderline border-y border-borderline">
              {filteredCareers.map((career) => <button key={career.id} onClick={() => setSelectedCareer(career)} className={`flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:bg-surface/50 ${selectedCareer?.id === career.id ? 'text-fg' : 'text-mut'}`}><span><span className="block font-medium">{career.title}</span><span className="mt-1 block max-w-xl text-sm leading-6">{career.description}</span></span><ChevronRight size={18} className="mt-1 shrink-0 text-accent" /></button>)}
            </div>
            {selectedCareer && <CareerSpotlight career={selectedCareer} />}
          </div>
        )}
      </section>

      <section id="build-path" className="scroll-mt-28 border-t border-borderline py-12">
        <div className="mb-7 max-w-2xl"><p className="eyebrow mb-2">Build your career path</p><h2 className="text-2xl font-semibold tracking-tight">Start with where you are.</h2><p className="mt-1 text-sm leading-6 text-mut">Your answers shape the order of the roadmap. Nothing here locks you into one career.</p></div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="border-l-2 border-accent pl-5"><p className="text-sm font-medium">A useful path is specific enough to act on.</p><p className="mt-3 text-sm leading-6 text-mut">Tell us your stage, your curiosity and the kind of opportunity you want to become ready for.</p><div className="mt-8 space-y-4 text-sm text-mut"><p className="flex gap-2"><Check size={16} className="text-success" /> Rule-based prototype today</p><p className="flex gap-2"><Check size={16} className="text-success" /> AI recommendations can plug in later</p><p className="flex gap-2"><Check size={16} className="text-success" /> Saved locally while you explore</p></div></div>
          <div className="surface p-5 md:p-7">
            <div className="grid gap-5 md:grid-cols-2">
              <FormSelect label="Current year" error={form.formState.errors.year?.message} {...form.register('year')} options={YEAR_OPTIONS.map((item) => ({ value: item.value, label: item.label }))} />
              <FormSelect label="Branch" error={form.formState.errors.branch?.message} {...form.register('branch')} options={BRANCH_OPTIONS.map((item) => ({ value: item.value, label: item.label }))} />
              <FormSelect label="Experience" {...form.register('experience')} options={EXPERIENCE_OPTIONS} />
              <FormSelect label="Primary goal" {...form.register('goal')} options={GOAL_OPTIONS} />
            </div>
            <CheckboxGroup label="Interests" options={INTEREST_OPTIONS.map((item) => item.value)} registration={form.register('interests')} />
            <CheckboxGroup label="Current skills" options={SKILL_OPTIONS} registration={form.register('currentSkills')} compact />
            <CheckboxGroup label="Career direction" options={CAREER_INTEREST_OPTIONS} registration={form.register('careerInterests')} />
            {(form.formState.errors.interests || form.formState.errors.careerInterests) && <p className="mb-4 text-sm text-error">{form.formState.errors.interests?.message ?? form.formState.errors.careerInterests?.message}</p>}
            <button type="submit" disabled={recommendationState === 'loading'} className="btn-primary inline-flex items-center gap-2 disabled:cursor-wait disabled:opacity-60">{recommendationState === 'loading' ? 'Building your path...' : 'Generate my path'} <ArrowRight size={16} /></button>
            {recommendationState === 'error' && <p className="mt-3 text-sm text-error">{errorMessage}</p>}
          </div>
        </form>
      </section>

      <section id="path" className="scroll-mt-28 border-t border-borderline py-12">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow mb-2">Your career path</p><h2 className="text-2xl font-semibold tracking-tight">What should happen next?</h2></div>{recommendation && <p className="text-sm text-mut">Based on {recommendation.basedOn.join(' · ')}</p>}</div>
        {recommendation ? <RecommendationPanel recommendation={recommendation} progress={progress} onProgress={updateProgress} /> : <div className="surface flex flex-col items-start gap-3 p-7"><Sparkles size={20} className="text-accent" /><p className="font-medium">Tell us a little more about your interests.</p><p className="max-w-xl text-sm leading-6 text-mut">Your first recommendation will appear here as a visual sequence of skills, projects and opportunities.</p><a href="#build-path" className="mt-2 inline-flex items-center gap-2 text-sm text-accent">Build my path <ArrowRight size={15} /></a></div>}
      </section>

      {recommendation && <>
        <section id="learning" className="scroll-mt-28 border-t border-borderline py-12"><SectionHeading eyebrow="Learn next" title="The next useful skill beats the biggest course list." subtitle="A short sequence based on your current stage and target." /><div className="mt-6 grid gap-3 md:grid-cols-3">{recommendation.nextSkills.slice(0, 3).map((skill, index) => <NextSkill key={skill.id} index={index} skill={skill} resources={recommendation.recommendedResources} />)}</div><div className="mt-8 border-t border-borderline pt-6"><ResourceList resources={recommendation.recommendedResources} /></div></section>
        <section id="projects" className="scroll-mt-28 border-t border-borderline py-12"><SectionHeading eyebrow="What should you build?" title="Learning becomes real when something exists." subtitle="Choose a project that gives your next skill a visible shape." /><div className="mt-6 grid gap-4 lg:grid-cols-3">{recommendation.recommendedProjects.map((project) => <ProjectPreview key={project.id} project={project} />)}</div><a href="/projects" className="mt-6 inline-flex items-center gap-2 text-sm text-accent">Explore Projects <ArrowRight size={15} /></a></section>
        <section id="opportunities" className="scroll-mt-28 border-t border-borderline py-12"><SectionHeading eyebrow="For this career" title="Where to put your preparation to work." subtitle="These are directions to look for, not promises of availability." /><div className="mt-6 divide-y divide-borderline border-y border-borderline">{recommendation.recommendedOpportunities.map((opportunity) => <a key={opportunity.id} href="/opportunities" className="flex flex-wrap items-center justify-between gap-4 py-5 hover:bg-surface/40"><span><span className="text-xs uppercase tracking-[0.16em] text-accent">{opportunity.type}</span><span className="mt-1 block font-medium">{opportunity.title}</span><span className="mt-1 block text-sm text-mut">{opportunity.description}</span></span><ArrowRight size={17} className="text-accent" /></a>)}</div><a href="/opportunities" className="mt-6 inline-flex items-center gap-2 text-sm text-accent">Explore Opportunities <ArrowRight size={15} /></a></section>
        <ProgressSection recommendation={recommendation} progress={progress} onProgress={updateProgress} />
      </>}

      <section className="border-t border-borderline py-12"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow mb-2">Keep moving</p><h2 className="text-2xl font-semibold tracking-tight">Become ready for the opportunity.</h2><p className="mt-2 max-w-xl text-sm leading-6 text-mut">A career path is a working document. Revisit it when your interests, skills or goals change.</p></div><a href="#build-path" className="btn-primary inline-flex w-fit items-center gap-2">Update my path <ArrowRight size={16} /></a></div></section>
    </div>
  );
}

function FormSelect({ label, options, error, ...props }: { label: string; options: { value: string; label: string }[]; error?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <label className="block text-sm"><span className="mb-2 block font-medium">{label}</span><select {...props} className="input-search w-full">{options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{error && <span className="mt-1 block text-xs text-error">{error}</span>}</label>;
}

function CheckboxGroup({ label, options, registration, compact = false }: { label: string; options: string[]; registration: ReturnType<ReturnType<typeof useForm<CareerForm>>['register']>; compact?: boolean }) {
  return <fieldset className="mt-6"><legend className="mb-3 text-sm font-medium">{label}</legend><div className={`grid gap-2 ${compact ? 'grid-cols-2 sm:grid-cols-3' : 'grid-cols-2 sm:grid-cols-3'}`}>{options.map((option) => <label key={option} className="flex cursor-pointer items-start gap-2 rounded-md border border-borderline px-3 py-2 text-xs text-mut transition-colors hover:border-accent/60 hover:text-fg"><input type="checkbox" value={option} {...registration} className="mt-0.5 accent-[var(--accent)]" /><span>{option}</span></label>)}</div></fieldset>;
}

function CareerSpotlight({ career }: { career: Career }) {
  return <aside className="surface p-6"><div className="flex items-start justify-between gap-4"><div><p className="eyebrow mb-2">Featured direction</p><h3 className="text-2xl font-semibold">{career.title}</h3></div><span className="rounded-full border border-accent/40 px-3 py-1 text-xs text-accent">{career.category}</span></div><p className="mt-4 text-sm leading-6 text-mut">{career.description}</p><div className="mt-6"><p className="text-xs uppercase tracking-[0.16em] text-mut">Core skills</p><div className="mt-3 flex flex-wrap gap-2">{career.coreSkills.slice(0, 6).map((skill) => <span key={skill} className="rounded-md bg-surface-2 px-2.5 py-1 text-xs">{skill}</span>)}</div></div><div className="mt-7 border-t border-borderline pt-5"><p className="text-xs uppercase tracking-[0.16em] text-mut">Typical projects</p><ul className="mt-3 space-y-2 text-sm">{career.typicalProjects.slice(0, 3).map((project) => <li key={project} className="flex gap-2"><GitBranch size={15} className="mt-0.5 text-accent" />{project}</li>)}</ul></div><a href="#build-path" className="mt-6 inline-flex items-center gap-2 text-sm text-accent">Use this direction <ArrowRight size={15} /></a></aside>;
}

function RecommendationPanel({ recommendation, progress, onProgress }: { recommendation: CareerRecommendation; progress: Record<string, number>; onProgress: (skill: string, value: number) => void }) {
  const steps = recommendation.nextSkills;
  return <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]"><div className="border-l-2 border-accent pl-5"><p className="eyebrow mb-2">Career target</p><h3 className="text-3xl font-semibold">{recommendation.career.title}</h3><p className="mt-3 text-sm leading-6 text-mut">{recommendation.career.description}</p><div className="mt-8 space-y-4 text-sm"><p><span className="text-mut">You are here</span><br /><span className="font-medium">{recommendation.currentStage}</span></p><p><span className="text-mut">Current signal</span><br /><span className="font-medium">{recommendation.basedOn.slice(-2).join(' + ')}</span></p></div></div><div className="relative space-y-3 before:absolute before:bottom-4 before:left-[13px] before:top-4 before:w-px before:bg-borderline">{steps.map((skill, index) => { const value = progress[skill.name] ?? (index === 0 ? 60 : 0); return <div key={skill.id} className="relative flex items-start gap-4"><div className={`z-10 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${value === 100 ? 'border-success bg-success text-bg' : index === 0 ? 'border-accent bg-accent text-white' : 'border-borderline bg-bg text-mut'}`}>{value === 100 ? <Check size={14} /> : index === 0 ? <Sparkles size={13} /> : <span className="text-xs">{index + 1}</span>}</div><div className="min-w-0 flex-1 border-b border-borderline pb-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-medium">{skill.name}</p><span className="text-xs text-mut">{index === 0 ? 'NEXT' : index < 3 ? 'THEN' : 'BUILD TOWARD'}</span></div><p className="mt-1 text-sm text-mut">{skill.description}</p><div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2"><div className="h-full bg-accent transition-all" style={{ width: `${value}%` }} /></div><div className="mt-2 flex gap-2"><button type="button" onClick={() => onProgress(skill.name, value === 100 ? 0 : 100)} className="text-xs text-accent">{value === 100 ? 'Mark incomplete' : 'Mark complete'}</button><span className="text-xs text-mut">{skill.estimatedHours} hours</span></div></div></div> })}</div></div>;
}

function NextSkill({ index, skill, resources }: { index: number; skill: CareerRecommendation['nextSkills'][number]; resources: LearningResource[] }) {
  const resource = resources.find((item) => skill.resources.includes(item.id));
  return <article className="border-t-2 border-accent pt-4"><p className="text-xs text-mut">{String(index + 1).padStart(2, '0')}</p><h3 className="mt-3 font-medium">{skill.name}</h3><p className="mt-2 text-sm leading-6 text-mut">{skill.description}</p><div className="mt-4 flex flex-wrap gap-3 text-xs text-mut"><span>{skill.level}</span><span>{skill.estimatedHours} hours</span></div>{resource && <a href={resource.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs text-accent">Free resource <ExternalLink size={12} /></a>}</article>;
}

function ResourceList({ resources }: { resources: LearningResource[] }) {
  return <div><div className="mb-4 flex items-center justify-between"><h3 className="font-medium">Free learning resources</h3><span className="text-xs text-mut">Curated links · demo URLs</span></div><div className="divide-y divide-borderline border-y border-borderline">{resources.slice(0, 5).map((resource) => <a key={resource.id} href={resource.url} target="_blank" rel="noreferrer" className="flex flex-wrap items-center justify-between gap-3 py-4 hover:bg-surface/40"><span><span className="block font-medium">{resource.title}</span><span className="mt-1 block text-xs text-mut">{resource.provider} · {resource.platform} · {resource.level}</span></span><span className="flex items-center gap-3 text-xs text-mut"><span className="flex items-center gap-1"><Clock3 size={13} />{resource.duration}</span><ExternalLink size={14} className="text-accent" /></span></a>)}</div></div>;
}

function ProjectPreview({ project }: { project: CareerRecommendation['recommendedProjects'][number] }) {
  return <article className="surface p-5"><div className="flex items-center justify-between gap-3"><span className="text-xs uppercase tracking-[0.14em] text-accent">{project.difficulty}</span><GitBranch size={16} className="text-mut" /></div><h3 className="mt-4 font-medium">{project.title}</h3><p className="mt-2 text-sm leading-6 text-mut">{project.description}</p><div className="mt-4 flex flex-wrap gap-1.5">{project.suggestedTech.slice(0, 4).map((tech) => <span key={tech} className="rounded bg-surface-2 px-2 py-1 text-[11px] text-mut">{tech}</span>)}</div><p className="mt-4 border-t border-borderline pt-3 text-xs leading-5 text-mut">{project.careerRelevance.join(' · ')}</p></article>;
}

function ProgressSection({ recommendation, progress, onProgress }: { recommendation: CareerRecommendation; progress: Record<string, number>; onProgress: (skill: string, value: number) => void }) {
  const items = recommendation.nextSkills.slice(0, 6);
  return <section className="border-t border-borderline py-12"><SectionHeading eyebrow="Your progress" title="Keep a small promise to yourself." subtitle="Progress is stored on this device for now. It can become part of your student account later." /><div className="mt-6 grid gap-3 md:grid-cols-2">{items.map((skill, index) => { const value = progress[skill.name] ?? (index === 0 ? 60 : 0); const locked = index > 2 && value === 0; return <button key={skill.id} type="button" onClick={() => !locked && onProgress(skill.name, value === 100 ? 0 : 100)} className={`flex items-center gap-4 border-b border-borderline py-4 text-left ${locked ? 'cursor-not-allowed opacity-50' : 'hover:text-accent'}`}><span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-borderline">{locked ? <Lock size={14} /> : value === 100 ? <Check size={15} className="text-success" /> : <span className="text-xs">{value}%</span>}</span><span><span className="block text-sm font-medium">{skill.name}</span><span className="block text-xs text-mut">{locked ? 'Locked' : value === 100 ? 'Complete' : value ? 'In progress' : 'Not started'}</span></span></button> })}</div></section>;
}

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return <div><p className="eyebrow mb-2">{eyebrow}</p><h2 className="text-2xl font-semibold tracking-tight">{title}</h2><p className="mt-1 text-sm text-mut">{subtitle}</p></div>;
}

function CareerDirectorySkeleton() {
  return <div className="mt-6 grid gap-3 md:grid-cols-2">{[1, 2, 3, 4].map((item) => <div key={item} className="h-24 animate-pulse border-y border-borderline bg-surface/50" />)}</div>;
}

function InlineError({ message, onRetry }: { message: string; onRetry: () => void }) {
  return <div className="mt-6 border border-error/40 p-5"><p className="text-sm text-error">{message}</p><button type="button" onClick={onRetry} className="mt-3 text-sm text-accent">Try again</button></div>;
}
