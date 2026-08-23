import React from 'react';
import { RoadmapHeader } from '@/components/roadmap/RoadmapHeader';
import { StudentStage } from '@/components/roadmap/StudentStage';
import { JourneyTimeline } from '@/components/roadmap/JourneyTimeline';
import { SkillGroup } from '@/components/roadmap/SkillGroup';
import { ProjectGroup } from '@/components/roadmap/ProjectGroup';
import { ExperienceChecklist } from '@/components/roadmap/ExperienceChecklist';
import { ResumeReadiness } from '@/components/roadmap/ResumeReadiness';
import { YearlyRoadmap } from '@/components/roadmap/YearlyRoadmap';

import { RoadmapService } from '@/server/services/roadmap.service';

export default async function RoadmapPage() {
  const roadmap = await RoadmapService.getRoadmap();
  const skills = await RoadmapService.getSkills();
  const projects = await RoadmapService.getProjects();
  const experience = await RoadmapService.getExperience();
  const resume = await RoadmapService.getResume();

  return (
    <div className="min-h-screen bg-bg text-fg">
      <RoadmapHeader />
      <StudentStage roadmap={roadmap} />

      <main className="container-s pb-24">
        <JourneyTimeline stages={roadmap.stages} />

        <div className="py-12 border-t border-borderline">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold tracking-tight">What you should do this year</h2>
            <p className="text-mut mt-2">Your actionable checklist for {roadmap.studentContext.year}.</p>
          </div>

          <SkillGroup skills={skills} />
          <ProjectGroup projects={projects} />
          <ExperienceChecklist experiences={experience} />
          <ResumeReadiness resume={resume} />
        </div>

        <YearlyRoadmap plans={roadmap.fourYearPlan} />

        <div className="py-16 mt-8 border-t border-borderline text-center">
          <h2 className="text-3xl font-semibold tracking-tight mb-4">Make this roadmap yours.</h2>
          <p className="text-lg text-mut mb-8 max-w-2xl mx-auto">
            Tell StudOS your branch, year and career goal to get a roadmap built around you.
          </p>
          <button className="btn-primary inline-flex items-center justify-center px-8 py-4">
            Customize my roadmap
          </button>
        </div>
      </main>
    </div>
  );
}
