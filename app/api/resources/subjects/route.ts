import { NextResponse } from 'next/server';
import { ResourceService } from '@/server/services/resource.service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const branch = searchParams.get('branch') || 'AIML';
  const year = searchParams.get('year') || '3rd Year';
  const semester = searchParams.get('semester') || 'Semester 1';

  try {
    const subjects = await ResourceService.getSubjects(branch, year, semester);
    return NextResponse.json(subjects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subjects' }, { status: 500 });
  }
}
