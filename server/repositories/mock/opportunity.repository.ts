import { opportunities } from '@/data/opportunities';
import type { Opportunity, OpportunityQuery } from '@/types/opportunity';
import type { OpportunityRepository } from '../interfaces/opportunity.repository';

const now = Date.now();
const dLeft = (deadline: string) => Math.ceil((Date.parse(deadline) - now) / 86400000);

function matchesFilters(o: Opportunity, q: OpportunityQuery): boolean {
  if (q.q) {
    const needle = q.q.toLowerCase();
    const haystack = [
      o.title,
      o.organization,
      o.category,
      o.location,
      ...o.skills,
    ]
      .join(' ')
      .toLowerCase();
    if (!haystack.includes(needle)) return false;
  }

  // Multi-select filters (comma-separated)
  if (q.category && q.category !== 'All') {
    const cats = q.category.split(',').map(c => c.toLowerCase());
    if (!cats.includes(o.category.toLowerCase())) return false;
  }
  if (q.branch && q.branch !== 'Any Branch') {
    const branches = q.branch.split(',').map(b => b.toUpperCase());
    const hasMatch = o.branches.some(b => branches.includes(b.toUpperCase()) || branches.includes('ANY BRANCH'));
    if (!hasMatch) return false;
  }
  if (q.year && q.year !== 'Any Year') {
    const map: Record<string, string[]> = {
      'First Year': ['1'],
      'Second Year': ['2'],
      'Third Year': ['3'],
      'Final Year': ['4'],
      'Any Year': ['1', '2', '3', '4'],
    };
    const years = q.year.split(',');
    const wanted = years.flatMap(y => map[y] ?? []);
    if (wanted.length > 0 && !o.years.some((y) => wanted.includes(y))) return false;
  }
  if (q.mode && q.mode !== 'All') {
    const modes = q.mode.split(',');
    if (!modes.includes(o.mode)) return false;
  }
  if (q.location && q.location !== 'All') {
    const locs = q.location.split(',').map(l => l.toLowerCase());
    const hay = o.location.toLowerCase();
    const hasMatch = locs.some(loc => {
      if (loc === 'india') {
        return hay.includes('india') || (o.mode !== 'Online' && !hay.includes('remote'));
      }
      if (loc === 'remote') {
        return o.mode === 'Online' || hay.includes('remote');
      }
      return hay.includes(loc);
    });
    if (!hasMatch) return false;
  }
  if (q.skill && q.skill !== 'Any') {
    const skills = q.skill.split(',').map(s => s.toLowerCase().replace(/[^a-z0-9 ]/g, ''));
    const ok = o.skills.some(
      (s) => skills.some(want => s.toLowerCase().replace(/[^a-z0-9 ]/g, '').includes(want) || want.includes(s.toLowerCase().split('/')[0].trim()))
    );
    if (!ok) return false;
  }
  if (q.deadline && q.deadline !== 'All') {
    const dl = o.daysLeft;
    const deadlines = q.deadline.split(',');
    const hasMatch = deadlines.some(d => {
      switch (d) {
        case 'Next 3 days':
          return dl <= 3;
        case 'Next 7 days':
          return dl <= 7;
        case 'Next 30 days':
          return dl <= 30;
        default:
          return false;
      }
    });
    if (!hasMatch) return false;
  }
  return true;
}

function sortItems(items: Opportunity[], sort?: string): Opportunity[] {
  const arr = [...items];
  switch (sort) {
    case 'deadline':
      return arr.sort((a, b) => Date.parse(a.deadline) - Date.parse(b.deadline));
    case 'newest':
      return arr.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    case 'updated':
      return arr.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
    case 'recommended':
    default:
      // Featured first, then soonest deadline
      return arr.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return Date.parse(a.deadline) - Date.parse(b.deadline);
      });
  }
}

export class MockOpportunityRepository implements OpportunityRepository {
  private store: Opportunity[] = opportunities.map((o) => ({
    ...o,
    daysLeft: o.daysLeft >= 0 ? o.daysLeft : dLeft(o.deadline),
  }));

  async list(query: OpportunityQuery): Promise<{ items: Opportunity[]; total: number }> {
    // Simulate realistic async latency
    await new Promise((r) => setTimeout(r, 120));
    const filtered = this.store.filter((o) => matchesFilters(o, query));
    const sorted = sortItems(filtered, query.sort);
    const page = query.page ?? 1;
    const pageSize = query.pageSize ?? 8;
    const start = (page - 1) * pageSize;
    return {
      items: sorted.slice(start, start + pageSize),
      total: sorted.length,
    };
  }

  async getById(id: string): Promise<Opportunity | null> {
    await new Promise((r) => setTimeout(r, 40));
    return this.store.find((o) => o.id === id) ?? null;
  }
}