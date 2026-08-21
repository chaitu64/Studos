import type { Idea, IdeaCreateInput, IdeaQuery } from '@/types/idea';

/**
 * Idea repository contract.
 * The frontend + service layer never import a concrete repository.
 * Swap MockIdeaRepository for a future PostgresIdeaRepository
 * without touching callers.
 */
export interface IdeaRepository {
  list(query: IdeaQuery): Promise<{ items: Idea[]; total: number }>;
  getById(id: string): Promise<Idea | null>;
  create(input: IdeaCreateInput): Promise<Idea>;
}
