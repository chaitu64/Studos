export function OpportunitySkeletonRow() {
  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_1px_4px_rgba(28,25,23,0.06)]" aria-hidden>
      <div className="flex items-start gap-4">
        <div className="h-11 w-11 shrink-0 rounded-xl skeleton" />
        <div className="flex-1 space-y-2.5">
          <div className="h-4 w-3/5 skeleton" />
          <div className="h-3 w-2/5 skeleton" />
          <div className="h-3 w-4/5 skeleton" />
          <div className="flex gap-2">
            <div className="h-5 w-16 skeleton rounded-full" />
            <div className="h-5 w-12 skeleton rounded-full" />
          </div>
        </div>
        <div className="hidden w-28 shrink-0 space-y-2 sm:block">
          <div className="h-3 w-full skeleton" />
          <div className="h-4 w-2/3 skeleton" />
          <div className="h-5 w-1/2 skeleton rounded-full" />
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