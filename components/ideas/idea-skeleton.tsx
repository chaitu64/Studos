export function IdeaSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="divide-y divide-borderline" aria-hidden>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-start justify-between gap-6 py-4">
          <div className="min-w-0 flex-1">
            <div className="h-4 w-1/3 animate-pulse rounded bg-surface-2" />
            <div className="mt-2 h-3 w-3/4 animate-pulse rounded bg-surface-2" />
            <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-surface-2" />
          </div>
          <div className="h-8 w-24 animate-pulse rounded-lg bg-surface-2" />
        </div>
      ))}
    </div>
  );
}
