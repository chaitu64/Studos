import { NextResponse } from 'next/server';
import { RoadmapService } from '@/server/services/roadmap.service';

export async function GET() {
  try {
    const skills = await RoadmapService.getSkills();
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}
