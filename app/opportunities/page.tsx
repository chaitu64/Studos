'use client';

import { useEffect, useRef, useState } from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import type { Opportunity, OpportunityFilters, SortKey } from '../../types/opportunity';
import { api } from '../../lib/api/api-client';
import { OpportunitySearch } from '../../components/opportunities/opportunity-search';
import { OpportunityCategoryTabs } from '../../components/opportunities/opportunity-category-tabs';
import { OpportunityFilters as FiltersPanel } from '../../components/opportunities/opportunity-filters';
import { OpportunityFilterDrawer } from '../../components/opportunities/opportunity-filter-drawer';
import { OpportunitySort } from '../../components/opportunities/opportunity-sort';
import { ActiveFilters } from '../../components/opportunities/active-filters';
import { FeaturedOpportunity } from '../../components/opportunities/featured-opportunity';
import { OpportunityListItem } from '../../components/opportunities/opportunity-list-item';
import { OpportunityEmptyState } from '../../components/opportunities/opportunity-empty-state';
import { OpportunitySkeleton } from '../../components/opportunities/opportunity-skeleton';

type LoadState = 'loading' | 'ready' | 'error';

const EMPTY_FILTERS: OpportunityFilters = {
  q: '',
  category: 'All',
  branch: 'Any Branch',
  year: 'Any Year',
  mode: 'All',
  location: 'All',
  skill: 'Any',
  deadline: 'All',
  stipend: 'All',
};

const PAGE_SIZE = 8;

export default function OpportunitiesPage() {
  const [filters, setFilters] = useState<OpportunityFilters>(EMPTY_FILTERS);
  const [sort, setSort] = useState<SortKey>('recommended');
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Opportunity[]>([]);
  const [total, setTotal] = useState(0);
  const [state, setState] = useState<LoadState>('loading');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [featured, setFeatured] = useState<Opportunity | null>(null);

  const requestId = useRef(0);

  const activeCount = Object.entries(filters).filter(
    ([k, v]) =>
      k !== 'q' &&
      v &&
      v !== 'All' &&
      v !== 'Any' &&
      v !== 'Any Branch' &&
      v !== 'Any Year' &&
      v !== ''
  ).length;

  useEffect(() => {
    const id = ++requestId.current;
    setState('loading');
    const controller = new AbortController();

    api
      .listOpportunities({ ...filters, sort, page, pageSize: PAGE_SIZE }, controller.signal)
      .then((data) => {
        if (id !== requestId.current) return;
        setItems(data.items);
        setTotal(data.total);
        setState('ready');
        if (page === 1) {
          const f = data.items.find((o) => o.featured);
          setFeatured(f ?? null);
        }
      })
      .catch((err) => {
        if (id !== requestId.current) return;
        if ((err as Error).name === 'AbortError') return;
        setState('error');
      });

    return () => controller.abort();
  }, [filters, sort, page]);

  function setFilter(key: keyof OpportunityFilters, value: string) {
    setFilters((f) => ({ ...f, [key]: value }));
    setPage(1);
  }

  function clearFilters() {
    setFilters(EMPTY_FILTERS);
    setPage(1);
  }

  function removeFilter(key: keyof OpportunityFilters) {
    setFilters((f) => ({ ...f, [key]: EMPTY_FILTERS[key] }));
    setPage(1);
  }

  const canLoadMore = items.length < total;

  return (
    <div className="container-s py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Find your next opportunity.
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] text-mut">
          Explore hackathons, internships, competitions, fellowships and research opportunities for students.
        </p>
      </div>

      {/* Large Search Bar */}
      <div className="mb-4">
        <OpportunitySearch
          value={filters.q ?? ''}
          onChange={(v) => setFilter('q', v)}
        />
      </div>

      {/* Category Tabs */}
      <div className="mb-6">
        <OpportunityCategoryTabs
          value={filters.category ?? 'All'}
          onChange={(v) => setFilter('category', v)}
        />
      </div>

      {/* Featured opportunity */}
      {page === 1 && state === 'ready' && featured && (
        <div className="mb-6">
          <FeaturedOpportunity opportunity={featured} />
        </div>
      )}

      <div className="mt-2 flex items-start gap-6">
        {/* Sidebar (desktop) */}
        <aside className="sticky top-20 hidden w-72 shrink-0 lg:block">
          <FiltersPanel
            filters={filters}
            onFilter={setFilter}
            onClear={clearFilters}
          />
        </aside>

        {/* Results */}
        <div className="min-w-0 flex-1">
          {/* Results header */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-borderline pb-4">
            <div>
              <p className="text-sm text-mut">
                <span className="font-semibold text-fg">{total}</span> opportunity
                {total === 1 ? '' : 's'}
              </p>
              <ActiveFilters
                filters={filters}
                onRemove={removeFilter}
                onClear={clearFilters}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDrawerOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-borderline bg-surface px-3 py-2 text-sm text-fg transition-colors hover:border-accent/40 lg:hidden"
              >
                <SlidersHorizontal size={15} className="text-mut" />
                Filters
                {activeCount > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white">
                    {activeCount}
                  </span>
                )}
              </button>
              <OpportunitySort value={sort} onChange={setSort} />
            </div>
          </div>

          {/* Results body */}
          {state === 'loading' && <OpportunitySkeleton rows={6} />}

          {state === 'error' && (
            <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-borderline bg-surface px-6 py-16 text-center">
              <h3 className="text-lg font-semibold text-fg">Couldn&apos;t load opportunities.</h3>
              <p className="max-w-sm text-sm text-mut">
                Please try again in a moment.
              </p>
              <button onClick={() => setPage((p) => p)} className="btn-primary mt-2 text-sm">
                Try again
              </button>
            </div>
          )}

          {state === 'ready' && items.length === 0 && (
            <OpportunityEmptyState onClear={clearFilters} />
          )}

          {state === 'ready' && items.length > 0 && (
            <div className="space-y-3">
              {items.filter((o) => o.id !== featured?.id).map((o) => (
                <OpportunityListItem key={o.id} opportunity={o} />
              ))}

              {canLoadMore && (
                <div className="pt-2 text-center">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="inline-flex items-center gap-2 rounded-lg border border-borderline bg-surface px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    Load more
                    <span className="text-xs text-mut">
                      ({total - items.length} remaining)
                    </span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <OpportunityFilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        filters={filters}
        onFilter={setFilter}
        onClear={clearFilters}
      />

      {/* Demo notice */}
      <p className="mt-8 flex items-center gap-1.5 text-xs text-mut">
        <RotateCcw size={12} aria-hidden />
        Demo data — these are fictional listings for prototype testing.
      </p>
    </div>
  );
}
