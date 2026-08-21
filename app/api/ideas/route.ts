import { NextResponse } from 'next/server';
import { ideaService } from '@/server/services/idea.service';

// GET /api/ideas
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());
    const data = await ideaService.list(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error('GET /api/ideas failed', error);
    return NextResponse.json(
      { error: 'Something went wrong. We could not load ideas right now.' },
      { status: 500 }
    );
  }
}

// POST /api/ideas
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const idea = await ideaService.create(body);
    return NextResponse.json(idea, { status: 201 });
  } catch (error) {
    console.error('POST /api/ideas failed', error);
    const message =
      error instanceof Error && error.message === 'Title and description are required.'
        ? error.message
        : 'Something went wrong. We could not submit your idea right now.';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
