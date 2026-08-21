'use client';

/**
 * Idea-Hub-specific section header. Intentionally local to /ideas so the
 * shared home-page SectionHeader is never affected.
 */
export function IdeaSectionHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-fg md:text-xl">{title}</h2>
        <p className="mt-1 text-sm text-mut">{subtitle}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
