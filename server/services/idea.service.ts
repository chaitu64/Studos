import type { Idea, IdeaCreateInput, SupportNeeded } from '@/types/idea';
import { MockIdeaRepository } from '../repositories/mock/idea.repository';
import type { IdeaRepository } from '../repositories/interfaces/idea.repository';

const IDEA_QUERY_DEFAULTS = { page: 1, pageSize: 50 };

/**
 * Business logic for ideas. Route handlers call this service;
 * the service talks to a repository interface. No route imports the
 * mock repository directly.
 */
export class IdeaService {
  constructor(private repo: IdeaRepository = new MockIdeaRepository()) {}

  async list(query: Record<string, string | string[] | undefined>) {
    const str = (k: string) => {
      const v = query[k];
      return Array.isArray(v) ? v[0] : v;
    };

    const page = Math.max(1, Number(str('page') ?? IDEA_QUERY_DEFAULTS.page));
    const pageSize = Math.min(
      50,
      Math.max(1, Number(str('pageSize') ?? IDEA_QUERY_DEFAULTS.pageSize))
    );

    const { items, total } = await this.repo.list({
      q: str('q'),
      tab: str('tab'),
      status: str('status'),
      tech: str('tech'),
      branch: str('branch'),
      year: str('year'),
      support: str('support'),
      sort: (str('sort') as 'newest' | 'oldest') ?? undefined,
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

  async getById(id: string): Promise<Idea | null> {
    return this.repo.getById(id);
  }

  async create(input: Partial<IdeaCreateInput>): Promise<Idea> {
    if (!input.title || !input.description) {
      throw new Error('Title and description are required.');
    }
    return this.repo.create({
      title: input.title,
      description: input.description,
      creator: input.creator,
      branch: input.branch,
      year: input.year,
      technologies: input.technologies,
      lookingFor: input.lookingFor,
      supportNeeded: (input.supportNeeded ?? []) as SupportNeeded[],
    });
  }
}

export const ideaService = new IdeaService();
