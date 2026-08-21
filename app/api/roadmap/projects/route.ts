import { NextResponse } from 'next/server';
import { RoadmapService } from '@/server/services/roadmap.service';

export async function GET() {
  try {
    const projects = await RoadmapService.getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}
