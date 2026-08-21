import { opportunitiesQueryDefaults } from '@/data/opportunities';
import type { Opportunity } from '@/types/opportunity';
import { MockOpportunityRepository } from '../repositories/mock/opportunity.repository';
import type { OpportunityRepository } from '../repositories/interfaces/opportunity.repository';

/**
 * Business logic for opportunities. Route handlers call this service;
 * the service talks to a repository interface. No route imports the
 * mock repository directly.
 */
export class OpportunityService {
  constructor(private repo: OpportunityRepository = new MockOpportunityRepository()) {}

  async list(query: Record<string, string | string[] | undefined>) {
    const str = (k: string) => {
      const v = query[k];
      return Array.isArray(v) ? v[0] : v;
    };

    const page = Math.max(1, Number(str('page') ?? opportunitiesQueryDefaults.page));
    const pageSize = Math.min(
      50,
      Math.max(1, Number(str('pageSize') ?? opportunitiesQueryDefaults.pageSize))
    );

    const { items, total } = await this.repo.list({
      q: str('q'),
      category: str('category'),
      branch: str('branch'),
      year: str('year'),
      mode: str('mode'),
      location: str('location'),
      skill: str('skill'),
      deadline: str('deadline'),
      sort: str('sort') as OpportunityQuerySort,
      page,
      pageSize,
    });

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    };
  }

  async getById(id: string): Promise<Opportunity | null> {
    return this.repo.getById(id);
  }
}

type OpportunityQuerySort = 'recommended' | 'deadline' | 'newest' | 'updated';

export const opportunityService = new OpportunityService();