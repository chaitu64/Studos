'use client';

import { CalendarClock } from 'lucide-react';
import { deadlineTone, type DeadlineTone } from '@/types/opportunity';

const TONE: Record<DeadlineTone, { label: string; text: string; dot: string }> = {
  normal: { label: 'normal', text: 'text-success', dot: 'bg-success' },
  warning: { label: 'warning', text: 'text-warning', dot: 'bg-warning' },
  urgency: { label: 'urgency', text: 'text-amber-400', dot: 'bg-amber-400' },
  critical: { label: 'critical', text: 'text-error', dot: 'bg-error' },
  expired: { label: 'expired', text: 'text-mut line-through', dot: 'bg-mut' },
};

export function OpportunityDeadline({ daysLeft }: { daysLeft: number }) {
  const tone = deadlineTone(daysLeft);
  const t = TONE[tone];

  let label: string;
  if (daysLeft < 0) label = 'Expired';
  else if (daysLeft === 0) label = 'Today';
  else if (daysLeft === 1) label = 'Tomorrow';
  else label = `${daysLeft} days left`;

  return (
    <div className="flex items-center gap-1.5" title={`Deadline in ${label}`}>
      <CalendarClock size={13} className={t.text} aria-hidden />
      <span className={`text-xs font-medium ${t.text}`}>
        {label}
      </span>
    </div>
  );
}