'use client';

const KEY = 'studos:saved';

export function getSaved(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function setSaved(ids: string[]) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    // storage unavailable — ignore
  }
}

export function toggleSaved(id: string): boolean {
  const cur = getSaved();
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
  setSaved(next);
  return next.includes(id);
}