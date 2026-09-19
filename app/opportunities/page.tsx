'use client';

import { useEffect, useRef, useState } from 'react';
import { SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';
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

import { HeroNetwork } from '../../components/opportunities/hero-network';

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
    <div className="min-h-screen bg-transparent text-white pb-24 relative overflow-hidden selection:bg-purple-600 selection:text-white">

      {/* ── TOP HERO NETWORK: 3-PANEL CONNECTED COMPOSITION (EXACT REFERENCE MATCH) ── */}
      <div className="pt-6 pb-2">
        <HeroNetwork onSelectCategory={(cat) => setFilter('category', cat)} />
      </div>

      <div className="container-s py-4 relative z-10">

        {/* =========================================================================
            EXPLORE OPPORTUNITIES: DISCOVERY SECTION HEADER & CONTROLS (SCREENSHOT MATCH)
            ========================================================================= */}
        <div id="explore-opportunities" className="scroll-mt-24 mb-6">

          {/* Section Title & Right Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-slate-500 uppercase block mb-1">
                STUDOS / OPPORTUNITIES
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Explore Opportunities
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Find the right opportunities to learn, build and grow.
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs text-slate-400 font-medium">
                Opportunities for a brighter tomorrow.
              </span>
              <div className="w-12 h-0.5 bg-pink-500 rounded-full mt-1.5 ml-auto" />
            </div>
          </div>

          {/* Search & Sort Controls Bar */}
          <div id="browse-results" className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
            <div className="flex-1">
              <OpportunitySearch
                value={filters.q ?? ''}
                onChange={(v) => setFilter('q', v)}
              />
            </div>
            <OpportunitySort value={sort} onChange={setSort} />
          </div>
        </div>

        <div className="mt-2 flex items-start gap-8">
          {/* Left Sidebar Filters */}
          <aside className="sticky top-24 hidden w-64 shrink-0 lg:block">
            <div className="rounded-2xl border border-white/10 bg-[#0B0820]/80 p-5 backdrop-blur-md">
              <FiltersPanel
                filters={filters}
                onFilter={setFilter}
                onClear={clearFilters}
              />
            </div>
          </aside>

          {/* Results List */}
          <div className="min-w-0 flex-1">

            {/* Results body */}
            {state === 'loading' && <OpportunitySkeleton rows={6} />}

            {state === 'error' && (
              <div className="card-cosmic p-10 text-center border-rose-500/30 bg-rose-500/10">
                <h3 className="text-sm font-bold text-rose-300">Couldn&apos;t load opportunities.</h3>
                <p className="mt-1 text-xs text-rose-400">
                  Please try again in a moment.
                </p>
                <button onClick={() => setPage((p) => p)} className="btn-pill-white mt-4 text-xs">
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
                  <div className="pt-6 text-center">
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      className="btn-pill-glass text-xs px-6 py-2.5"
                    >
                      Load more ({total - items.length} remaining)
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
        <p className="mt-10 flex items-center gap-1.5 text-xs text-slate-500">
          <RotateCcw size={12} aria-hidden />
          Verified listings curated for student career advancement.
        </p>
      </div>
    </div>
  );
}
