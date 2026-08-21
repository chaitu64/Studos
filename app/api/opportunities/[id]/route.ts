import { NextResponse } from 'next/server';
import { opportunityService } from '@/server/services/opportunity.service';

// GET /api/opportunities/[id]
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await opportunityService.getById(id);
    if (!item) {
      return NextResponse.json({ error: 'Opportunity not found.' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    console.error(`GET /api/opportunities/${(await params).id} failed`, error);
    return NextResponse.json(
      { error: 'Something went wrong. We could not load this opportunity right now.' },
      { status: 500 }
    );
  }
}