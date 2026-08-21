import { NextResponse } from 'next/server';
import { RoadmapService } from '@/server/services/roadmap.service';

export async function GET() {
  try {
    const experience = await RoadmapService.getExperience();
    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experience goals' }, { status: 500 });
  }
}
