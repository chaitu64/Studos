import { NextResponse } from 'next/server';
import { RoadmapService } from '@/server/services/roadmap.service';

export async function GET() {
  try {
    const resume = await RoadmapService.getResume();
    return NextResponse.json(resume);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch resume readiness' }, { status: 500 });
  }
}
