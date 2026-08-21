import { NextResponse } from 'next/server';
import { careerService } from '@/server/services/career.service';

export async function GET(request: Request) {
  const careerId = new URL(request.url).searchParams.get('careerId') ?? undefined;
  return NextResponse.json({ items: await careerService.getProjects(careerId) });
}
