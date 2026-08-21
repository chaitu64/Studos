import { ideas } from '@/data/ideas';
import type { Idea, IdeaCreateInput, IdeaQuery, IdeaStatus, SupportNeeded } from '@/types/idea';
import { IDEA_STATUS_LIST } from '@/types/idea';
import type { IdeaRepository } from '../interfaces/idea.repository';

function matchesFilters(idea: Idea, q: IdeaQuery): boolean {
  // Free-text search across title, description, technology, creator and
  // skills needed.
  if (q.q) {
    const needle = q.q.toLowerCase();
    const haystack = [
      idea.title,
      idea.description,
      idea.creator,
      idea.branch,
      ...idea.technologies,
      ...idea.lookingFor,
    ]
      .join(' ')
      .toLowerCase();
    if (!haystack.includes(needle)) return false;
  }

  // Discovery tabs
  switch (q.tab) {
    case 'featured':
      if (!idea.featured) return false;
      break;
    case 'team':
      if (idea.status !== 'Looking for team') return false;
      break;
    case 'mentorship':
      if (idea.status !== 'Looking for mentorship') return false;
      break;
    case 'funding':
      if (idea.status !== 'Looking for funding') return false;
      break;
    case 'recent':
    case 'all':
    case undefined:
      break;
    default:
      break;
  }

  if (q.status && q.status !== 'All') {
    const wanted = q.status.split(',').map((s) => s.toLowerCase());
    if (!wanted.includes(idea.status.toLowerCase())) return false;
  }

  if (q.tech) {
    const wanted = q.tech.split(',').map((t) => t.toLowerCase());
    const ok = idea.technologies.some((t) => wanted.includes(t.toLowerCase()));
    if (!ok) return false;
  }

  if (q.branch && q.branch !== 'Any Branch') {
    const wanted = q.branch.split(',').map((b) => b.toUpperCase());
    if (!wanted.includes(idea.branch.toUpperCase())) return false;
  }

  if (q.year && q.year !== 'Any Year') {
    const wanted = q.year.split(',');
    if (!wanted.includes(idea.year)) return false;
  }

  if (q.support && q.support !== 'All') {
    const wanted = q.support.split(',').map((s) => s.toLowerCase());
    const ok = idea.supportNeeded.some((s) => wanted.includes(s.toLowerCase()));
    if (!ok) return false;
  }

  return true;
}

function sortItems(items: Idea[], sort?: string): Idea[] {
  const arr = [...items];
  switch (sort) {
    case 'oldest':
      return arr.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    case 'newest':
    default:
      return arr.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }
}

export class MockIdeaRepository implements IdeaRepository {
  private store: Idea[] = [...ideas];

  async list(query: IdeaQuery): Promise<{ items: Idea[]; total: number }> {
    await new Promise((r) => setTimeout(r, 120));
    const filtered = this.store.filter((i) => matchesFilters(i, query));
    const sorted = sortItems(filtered, query.tab === 'featured' ? undefined : query.sort);
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 50;
    const start = (page - 1) * pageSize;
    return {
      items: sorted.slice(start, start + pageSize),
      total: sorted.length,
    };
  }

  async getById(id: string): Promise<Idea | null> {
    await new Promise((r) => setTimeout(r, 40));
    return this.store.find((i) => i.id === id) ?? null;
  }

  async create(input: IdeaCreateInput): Promise<Idea> {
    await new Promise((r) => setTimeout(r, 150));
    const slug =
      input.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'idea';
    const id = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
    const idea: Idea = {
      id,
      title: input.title,
      description: input.description,
      creator: input.creator ?? 'You',
      branch: input.branch ?? 'CSE',
      year: input.year ?? '2',
      technologies: input.technologies ?? [],
      teamSize: 1,
      teamTarget: Math.max(1, (input.lookingFor?.length ?? 0) + 1),
      teamMembers: [{ name: input.creator ?? 'You', role: 'Lead' }],
      lookingFor: input.lookingFor ?? [],
      supportNeeded: input.supportNeeded ?? [],
      status: pickStatus(input.supportNeeded ?? []),
      featured: false,
      visual: 'web',
      createdAt: new Date().toISOString(),
    };
    this.store.unshift(idea);
    return idea;
  }
}

function pickStatus(support: SupportNeeded[]): IdeaStatus {
  if (support.includes('Team')) return 'Looking for team';
  if (support.includes('Mentorship')) return 'Looking for mentorship';
  if (support.includes('Funding') || support.includes('Hardware')) return 'Looking for funding';
  return IDEA_STATUS_LIST[1]; // Building
}
