import { NextResponse } from 'next/server';
import { z } from 'zod';
import { careerService } from '@/server/services/career.service';

const profileSchema = z.object({
  year: z.enum(['1', '2', '3', '4']),
  branch: z.enum(['CSE', 'AIML', 'ECE', 'EEE', 'Mechanical', 'Civil', 'IT', 'Other']),
  interests: z.array(z.enum(['AI / ML', 'Web Development', 'App Development', 'Data', 'Cybersecurity', 'Cloud', 'IoT', 'Robotics', 'Design', 'Research'])).min(1),
  currentSkills: z.array(z.string()),
  experience: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  goal: z.enum(['Internship', 'Placement', 'Hackathons', 'Research', 'Higher Studies', 'Startup', 'Freelancing']),
  careerInterests: z.array(z.string()).min(1),
});

export async function POST(request: Request) {
  try {
    const profile = profileSchema.parse(await request.json());
    const recommendation = await careerService.recommend(profile);
    if (!recommendation) return NextResponse.json({ error: 'Tell us a little more about your interests.' }, { status: 404 });
    return NextResponse.json(recommendation);
  } catch (error) {
    console.error('API /api/career/recommend error:', error);
    if (error instanceof z.ZodError) return NextResponse.json({ error: error.issues.map(i => i.message).join(', ') || 'Complete the required profile fields.' }, { status: 400 });
    return NextResponse.json({ error: error instanceof Error ? error.message : 'We could not build your path right now.' }, { status: 500 });
  }
}
