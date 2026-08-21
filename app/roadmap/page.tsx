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
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      <RoadmapHeader />
      <StudentStage roadmap={roadmap} />

      <main className="container mx-auto max-w-7xl px-4 md:px-6 pb-24">
        <JourneyTimeline stages={roadmap.stages} />

        <div className="py-12 border-t border-gray-200 dark:border-gray-800">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">What you should do this year</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Your actionable checklist for {roadmap.studentContext.year}.</p>
          </div>

          <SkillGroup skills={skills} />
          <ProjectGroup projects={projects} />
          <ExperienceChecklist experiences={experience} />
          <ResumeReadiness resume={resume} />
        </div>

        <YearlyRoadmap plans={roadmap.fourYearPlan} />

        <div className="py-16 mt-8 border-t border-gray-200 dark:border-gray-800 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Make this roadmap yours.</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Tell StudOS your branch, year and career goal to get a roadmap built around you.
          </p>
          <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
            Customize my roadmap →
          </button>
        </div>
      </main>
    </div>
  );
}
