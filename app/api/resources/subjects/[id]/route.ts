import { NextResponse } from 'next/server';
import { ResourceService } from '@/server/services/resource.service';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const subject = await ResourceService.getSubject(id);
    if (!subject) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
    }
    return NextResponse.json(subject);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subject' }, { status: 500 });
  }
}
