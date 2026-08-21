'use client';

const KEY = 'studos:saved-ideas';

export function getSavedIdeas(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function setSavedIdeas(ids: string[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    // storage unavailable — ignore
  }
}

export function toggleSavedIdea(id: string): boolean {
  const cur = getSavedIdeas();
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
  setSavedIdeas(next);
  return next.includes(id);
}
