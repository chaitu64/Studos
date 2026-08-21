import { NextResponse } from 'next/server';
import { RoadmapService } from '@/server/services/roadmap.service';

export async function GET() {
  try {
    const roadmap = await RoadmapService.getRoadmap();
    return NextResponse.json(roadmap);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch roadmap' }, { status: 500 });
  }
}
