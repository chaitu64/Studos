/** Relative date label for idea submissions — "Today", "Yesterday", "3d ago". */
export function formatIdeaDate(iso: string): string {
  const now = Date.now();
  const diffDays = Math.floor((now - Date.parse(iso)) / 86400000);
  if (diffDays <= 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}
