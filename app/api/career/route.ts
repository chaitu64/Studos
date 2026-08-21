import { NextResponse } from 'next/server';
import { careerService } from '@/server/services/career.service';

export async function GET(request: Request) {
  const category = new URL(request.url).searchParams.get('category') ?? undefined;
  return NextResponse.json({ items: await careerService.listCareers(category) });
}
