'use client';

import { Lightbulb, Users, Wrench, Rocket } from 'lucide-react';

const STAGES = [
  { icon: <Lightbulb size={15} />, label: 'IDEA', caption: 'Submit what you want to build' },
  { icon: <Users size={15} />, label: 'TEAM', caption: 'Find the people you need' },
  { icon: <Wrench size={15} />, label: 'BUILD', caption: 'Ship it with mentor support' },
  { icon: <Rocket size={15} />, label: 'SHOWCASE', caption: 'Present to the community' },
];

/**
 * Product-style pipeline visual for the intro split. Reads like part of
 * StudOS — a framed panel with a live idea pipeline, not decoration.
 */
export function IdeaWorkflow({
  stats,
}: {
  stats?: { ideas: number; building: number };
}) {
  return (
    <div className="surface overflow-hidden">
      {/* panel header */}
      <div className="flex items-center justify-between border-b border-borderline px-4 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-mut">
          idea-pipeline
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
          live
        </span>
      </div>

      {/* stages */}
      <ol className="relative px-5 py-5">
        {/* connecting rail */}
        <span
          aria-hidden
          className="absolute bottom-7 left-[34px] top-7 w-px bg-borderline"
        />
        {STAGES.map((s, i) => (
          <li key={s.label} className={`relative flex items-center gap-4 ${i > 0 ? 'mt-6' : ''}`}>
            <span className="z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-accent/40 bg-surface-2 text-accent">
              {s.icon}
            </span>
            <div className="min-w-0 flex-1 rounded-lg border border-borderline bg-surface-2/60 px-3 py-2">
              <p className="font-mono text-[11px] font-medium tracking-[0.14em] text-fg">
                {s.label}
              </p>
              <p className="truncate text-xs text-mut">{s.caption}</p>
            </div>
          </li>
        ))}
      </ol>

      {/* panel footer */}
      {stats && (
        <div className="flex items-center justify-between border-t border-borderline px-4 py-2.5 text-[11px] text-mut">
          <span>
            <span className="font-medium text-fg/90">{stats.ideas}</span> ideas submitted
          </span>
          <span>
            <span className="font-medium text-fg/90">{stats.building}</span> building now
          </span>
        </div>
      )}
    </div>
  );
}
