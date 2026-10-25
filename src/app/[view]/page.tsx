import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import type { Metadata } from 'next';
import Workspace from '@/components/Workspace';
import { WorkspaceView } from '@/types/studos';

const VALID_VIEWS: WorkspaceView[] = [
  'opportunities',
  'ideas',
  'teams',
  'projects',
  'resources'
];

export function generateStaticParams() {
  return VALID_VIEWS.map((view) => ({
    view
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ view: string }>;
}): Promise<Metadata> {
  const { view: rawView } = await params;
  const view = rawView as WorkspaceView;

  if (!VALID_VIEWS.includes(view)) {
    return {
      title: 'Not Found — StudOs'
    };
  }

  const formatted = view.charAt(0).toUpperCase() + view.slice(1);
  return {
    title: `${formatted} — StudOs`,
    description: `Explore ${view} on StudOs, the Student Operating System.`
  };
}

export default async function WorkspacePage({
  params
}: {
  params: Promise<{ view: string }>;
}) {
  const { view: rawView } = await params;
  const view = rawView as WorkspaceView;

  if (!VALID_VIEWS.includes(view)) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="workspace"><p>Loading workspace…</p></div>}>
      <Workspace view={view} />
    </Suspense>
  );
}
