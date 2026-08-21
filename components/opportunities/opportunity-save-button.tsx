'use client';

import { Bookmark } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSaved, toggleSaved } from '../../lib/utils/save';

export function OpportunitySaveButton({ id, label = 'Save' }: { id: string; label?: string }) {
  const [saved, setSavedState] = useState(false);

  useEffect(() => {
    setSavedState(getSaved().includes(id));
  }, [id]);

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? 'Saved' : 'Save opportunity'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const next = toggleSaved(id);
        setSavedState(next);
      }}
      className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors ${
        saved
          ? 'border-accent/50 bg-accent/10 text-accent'
          : 'border-borderline text-mut hover:text-fg hover:border-accent/40'
      }`}
    >
      <Bookmark size={13} fill={saved ? 'currentColor' : 'none'} aria-hidden />
      <span className="hidden sm:inline">{saved ? 'Saved' : label}</span>
    </button>
  );
}