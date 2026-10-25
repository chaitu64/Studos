import { NextResponse } from 'next/server';
import { ideaService } from '@/server/services/idea.service';

// GET /api/ideas/[id]
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await ideaService.getById(id);
    if (!item) {
      return NextResponse.json({ error: 'Idea not found.' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error('GET /api/ideas/[id] failed', error);
    return NextResponse.json(
      { error: 'Something went wrong. We could not load this idea right now.' },
      { status: 500 }
    );
  }
}
