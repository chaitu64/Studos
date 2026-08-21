import React from 'react';
import { Roadmap } from '@/types/roadmap';

interface StudentStageProps {
  roadmap: Roadmap;
}

export function StudentStage({ roadmap }: StudentStageProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 py-4">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">Your Current Stage</p>
              <p className="font-semibold text-gray-900 dark:text-white">
                {roadmap.studentContext.branch} &middot; {roadmap.studentContext.year}
              </p>
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-700"></div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">Career Goal</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">{roadmap.careerPath}</p>
            </div>

            <div className="hidden md:block w-px h-8 bg-gray-300 dark:bg-gray-700"></div>

            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">Current Focus</p>
              <p className="font-medium text-gray-800 dark:text-gray-200">
                {roadmap.stages.find(s => s.status === 'current')?.title || "Building Foundations"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">Progress</p>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${roadmap.overallProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{roadmap.overallProgress}%</span>
              </div>
            </div>
            <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 ml-4">
              Edit roadmap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
