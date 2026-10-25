import React from 'react';
import { RoadmapInteractiveView } from '@/components/roadmap/roadmap-interactive-view';
import { RoadmapService } from '@/server/services/roadmap.service';

export default async function RoadmapPage() {
  const roadmap = await RoadmapService.getRoadmap();
  const skills = await RoadmapService.getSkills();
  const projects = await RoadmapService.getProjects();
  const experience = await RoadmapService.getExperience();
  const resume = await RoadmapService.getResume();

  return (
    <RoadmapInteractiveView
      roadmap={roadmap}
      skills={skills}
      projects={projects}
      experience={experience}
      resume={resume}
    />
  );
}
