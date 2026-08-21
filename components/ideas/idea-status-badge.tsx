import type { IdeaStatus } from '@/types/idea';
import { ideaStatusTone } from '@/types/idea';

export function IdeaStatusBadge({ status }: { status: IdeaStatus }) {
  const tone = ideaStatusTone(status);
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${tone.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} aria-hidden />
      {status}
    </span>
  );
}
