import React from 'react';
import { ProjectRecommendation } from '@/types/roadmap';

interface ProjectGroupProps {
  projects: ProjectRecommendation[];
}

export function ProjectGroup({ projects }: ProjectGroupProps) {
  return (
    <div className="py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects worth building</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Projects that demonstrate the skills employers look for.</p>
        </div>
        <a href="/ideas" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
          Explore project ideas →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="flex flex-col border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-950">
            <div className="p-5 border-b border-gray-100 dark:border-gray-900">
              <span className={`text-xs font-bold uppercase tracking-wider mb-2 inline-block
                ${project.difficulty === 'beginner' ? 'text-green-600 dark:text-green-400' :
                  project.difficulty === 'intermediate' ? 'text-blue-600 dark:text-blue-400' :
                  'text-purple-600 dark:text-purple-400'}
              `}>
                {project.difficulty}
              </span>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.skills.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs rounded-md">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between bg-gray-50/50 dark:bg-gray-900/20">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Why build it</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{project.whyBuildIt}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mt-auto">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">{project.estimatedTime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Relevance</p>
                  <p className="font-medium text-gray-900 dark:text-white">{project.careerRelevance}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
