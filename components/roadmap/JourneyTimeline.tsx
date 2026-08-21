import React from 'react';
import { RoadmapStage } from '@/types/roadmap';

interface JourneyTimelineProps {
  stages: RoadmapStage[];
}

export function JourneyTimeline({ stages }: JourneyTimelineProps) {
  return (
    <div className="py-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your journey</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">See your progression through college.</p>
      </div>

      <div className="relative">
        {/* Desktop Line */}
        <div className="hidden md:block absolute top-8 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 -z-10 rounded-full"></div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-4 relative z-0">
          {stages.map((stage, index) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';

            return (
              <div key={stage.id} className="flex-1 flex md:block relative">
                {/* Mobile Line */}
                {index !== stages.length - 1 && (
                  <div className="md:hidden absolute top-8 left-4 w-1 h-full bg-gray-200 dark:bg-gray-800 -z-10"></div>
                )}

                <div className="mr-6 md:mr-0 md:mb-4 relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mx-auto md:mx-0
                      ${isCompleted ? 'bg-indigo-600 border-indigo-600 text-white' :
                        isCurrent ? 'bg-white dark:bg-gray-950 border-indigo-600' :
                        'bg-white dark:bg-gray-950 border-gray-300 dark:border-gray-700'}
                    `}
                  >
                    {isCompleted && (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    {isCurrent && <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>}
                  </div>
                </div>

                <div className={`p-5 rounded-xl border ${isCurrent ? 'border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-900/10 shadow-sm' : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950'} flex-1`}>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{stage.year}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`text-lg font-bold ${isCurrent ? 'text-indigo-900 dark:text-indigo-100' : 'text-gray-900 dark:text-white'}`}>
                      {stage.title}
                    </h3>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {stage.description}
                  </p>

                  {isCurrent && stage.milestones.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                      <p className="text-xs font-medium text-gray-500 mb-3">CURRENT MILESTONES</p>
                      <ul className="space-y-2">
                        {stage.milestones.slice(0, 3).map(m => (
                          <li key={m.id} className="text-sm flex items-start gap-2">
                            <span className="text-indigo-500 mt-0.5">•</span>
                            <span className="text-gray-700 dark:text-gray-300">{m.title}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{stage.milestones.filter(m => m.status === 'completed').length} / {stage.milestones.length}</span>
                        </div>
                        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-600 rounded-full"
                            style={{ width: `${(stage.milestones.filter(m => m.status === 'completed').length / stage.milestones.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {!isCurrent && (
                    <button className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 mt-2">
                      View stage →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
