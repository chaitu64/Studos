export function OpportunitySkeletonRow() {
  return (
    <div className="rounded-xl border border-borderline bg-surface p-4" aria-hidden>
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 shrink-0 animate-pulse rounded-lg bg-surface-2" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/5 animate-pulse rounded bg-surface-2" />
          <div className="h-3 w-2/5 animate-pulse rounded bg-surface-2" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-surface-2" />
        </div>
        <div className="hidden w-28 shrink-0 space-y-2 sm:block">
          <div className="h-3 w-full animate-pulse rounded bg-surface-2" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-surface-2" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-surface-2" />
        </div>
      </div>
    </div>
  );
}

export function OpportunitySkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div className="space-y-3" role="status" aria-label="Loading opportunities">
      {Array.from({ length: rows }).map((_, i) => (
        <OpportunitySkeletonRow key={i} />
      ))}
      <span className="sr-only">Loading opportunities…</span>
    </div>
  );
}