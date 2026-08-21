import { NextResponse } from 'next/server';
import { careerService } from '@/server/services/career.service';

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const career = await careerService.getCareer(id);
  return career ? NextResponse.json(career) : NextResponse.json({ error: 'Career not found.' }, { status: 404 });
}
