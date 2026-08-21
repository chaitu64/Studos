import type { Opportunity, OpportunityQuery } from '@/types/opportunity';

/**
 * Opportunity repository contract.
 * The frontend + service layer never import a concrete repository.
 * Swap MockOpportunityRepository for a future PostgresOpportunityRepository
 * without touching callers.
 */
export interface OpportunityRepository {
  list(query: OpportunityQuery): Promise<{ items: Opportunity[]; total: number }>;
  getById(id: string): Promise<Opportunity | null>;
}