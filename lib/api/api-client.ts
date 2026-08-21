'use client';

import type { Opportunity, OpportunityQuery, Paginated } from '@/types/opportunity';
import type { Idea, IdeaCreateInput, IdeaQuery } from '@/types/idea';

/**
 * Typed client for StudOS API routes.
 * Simple fetch wrapper — no external HTTP library.
 */
async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

async function postJson<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { error?: string }).error ?? `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export function buildOpportunityQuery(q: OpportunityQuery): string {
  const params = new URLSearchParams();
  const parts: [string, string | undefined][] = [
    ['q', q.q],
    ['category', q.category],
    ['branch', q.branch],
    ['year', q.year],
    ['mode', q.mode],
    ['location', q.location],
    ['skill', q.skill],
    ['deadline', q.deadline],
    ['stipend', q.stipend],
  ];
  for (const [k, v] of parts) if (v && v !== 'All' && v !== 'Any') params.set(k, v);
  if (q.sort) params.set('sort', q.sort);
  if (q.page) params.set('page', String(q.page));
  if (q.pageSize) params.set('pageSize', String(q.pageSize));
  const s = params.toString();
  return s ? `/api/opportunities?${s}` : '/api/opportunities';
}

export function buildIdeaQuery(q: IdeaQuery): string {
  const params = new URLSearchParams();
  const parts: [string, string | undefined][] = [
    ['q', q.q],
    ['tab', q.tab],
    ['status', q.status],
    ['tech', q.tech],
    ['branch', q.branch],
    ['year', q.year],
    ['support', q.support],
  ];
  for (const [k, v] of parts) if (v && v !== 'All' && v !== 'Any' && v !== 'Any Branch') params.set(k, v);
  if (q.sort) params.set('sort', q.sort);
  if (q.page) params.set('page', String(q.page));
  if (q.pageSize) params.set('pageSize', String(q.pageSize));
  const s = params.toString();
  return s ? `/api/ideas?${s}` : '/api/ideas';
}

export const api = {
  listOpportunities: (q: OpportunityQuery, signal?: AbortSignal) =>
    getJson<Paginated<Opportunity>>(buildOpportunityQuery(q), signal),
  getOpportunity: (id: string, signal?: AbortSignal) =>
    getJson<Opportunity>(`/api/opportunities/${id}`, signal),
  listIdeas: (q: IdeaQuery, signal?: AbortSignal) =>
    getJson<Paginated<Idea>>(buildIdeaQuery(q), signal),
  getIdea: (id: string, signal?: AbortSignal) =>
    getJson<Idea>(`/api/ideas/${id}`, signal),
  createIdea: (input: IdeaCreateInput) => postJson<Idea>('/api/ideas', input),
};