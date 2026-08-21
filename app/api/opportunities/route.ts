import { NextResponse } from 'next/server';
import { opportunityService } from '@/server/services/opportunity.service';

// GET /api/opportunities
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = Object.fromEntries(url.searchParams.entries());
    const data = await opportunityService.list(query);
    return NextResponse.json(data);
  } catch (error) {
    console.error('GET /api/opportunities failed', error);
    return NextResponse.json(
      { error: 'Something went wrong. We could not load opportunities right now.' },
      { status: 500 }
    );
  }
}