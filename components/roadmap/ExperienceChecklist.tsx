import React from 'react';
import { ExperienceGoal } from '@/types/roadmap';

interface ExperienceChecklistProps {
  experiences: ExperienceGoal[];
}

export function ExperienceChecklist({ experiences }: ExperienceChecklistProps) {
  return (
    <div className="py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Experience matters too</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Get outside the classroom. Real-world experience sets you apart.</p>
        </div>
        <a href="/opportunities" className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
          Explore opportunities →
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {experiences.map(exp => (
          <div key={exp.id} className="flex p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950">
            <div className="mr-4 mt-0.5">
              <div className={`w-5 h-5 rounded flex items-center justify-center border
                ${exp.status === 'completed' ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300 dark:border-gray-600'}
              `}>
                {exp.status === 'completed' && (
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">{exp.title}</h4>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded">
                  {exp.suggestedYear}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{exp.whyItMatters}</p>

              {exp.status !== 'completed' && (
                <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                  Find {exp.title.toLowerCase().includes('hackathon') ? 'hackathons' : exp.title.toLowerCase().includes('internship') ? 'internships' : 'opportunities'} →
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
