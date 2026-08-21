import { NextResponse } from 'next/server';
import { ResourceService } from '@/server/services/resource.service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ subjects: [], resources: [] });
  }

  try {
    const results = await ResourceService.searchResources(query);
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to search resources' }, { status: 500 });
  }
}
