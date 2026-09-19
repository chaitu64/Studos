'use client';

import { CalendarClock } from 'lucide-react';
import { deadlineTone, type DeadlineTone } from '@/types/opportunity';

const TONE: Record<DeadlineTone, { label: string; text: string; bg: string; dot: string }> = {
  normal:     { label: 'normal',   text: 'text-emerald-300', bg: 'bg-emerald-500/15 border-emerald-500/30', dot: 'bg-emerald-400' },
  warning:    { label: 'warning',  text: 'text-amber-300',   bg: 'bg-amber-500/15 border-amber-500/30',     dot: 'bg-amber-400' },
  urgency:    { label: 'urgency',  text: 'text-orange-300',  bg: 'bg-orange-500/15 border-orange-500/30',   dot: 'bg-orange-400' },
  critical:   { label: 'critical', text: 'text-rose-300',    bg: 'bg-rose-500/15 border-rose-500/30',       dot: 'bg-rose-400' },
  expired:    { label: 'expired',  text: 'text-slate-400 line-through', bg: 'bg-white/5 border-white/10', dot: 'bg-slate-500' },
};

export function OpportunityDeadline({ daysLeft }: { daysLeft: number }) {
  const tone = deadlineTone(daysLeft);
  const t = TONE[tone];

  let label: string;
  if (daysLeft < 0)      label = 'Expired';
  else if (daysLeft === 0) label = 'Today';
  else if (daysLeft === 1) label = 'Tomorrow';
  else                     label = `${daysLeft}d left`;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${t.text} ${t.bg}`} title={`Deadline in ${label}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} aria-hidden />
      {label}
    </span>
  );
}