import { NextResponse } from 'next/server';
import { ResourceService } from '@/server/services/resource.service';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const resources = await ResourceService.getResourcesForSubject(id);
    return NextResponse.json(resources);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
  }
}
