import React from 'react';
import { ResumeRequirement } from '@/types/roadmap';

interface ResumeReadinessProps {
  resume: ResumeRequirement[];
}

export function ResumeReadiness({ resume }: ResumeReadinessProps) {
  const completed = resume.filter(r => r.status === 'completed').length;
  const total = resume.length;
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Build your resume</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">What a strong student profile for your target career looks like.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 border border-gray-200 dark:border-gray-800 rounded-xl p-6 bg-white dark:bg-gray-950">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Your resume should include</h3>
          <ul className="space-y-3">
            {resume.map(item => (
              <li key={item.id} className="flex items-center text-sm">
                <span className={`mr-3 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center border
                  ${item.status === 'completed' ? 'bg-green-100 border-green-200 text-green-600 dark:bg-green-900/30 dark:border-green-800 dark:text-green-500' : 'bg-gray-50 border-gray-200 text-gray-400 dark:bg-gray-800/50 dark:border-gray-700'}
                `}>
                  {item.status === 'completed' ? (
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                  )}
                </span>
                <span className={`${item.status === 'completed' ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-72 flex flex-col justify-center items-center p-6 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Resume Readiness</p>
          <div className="relative w-32 h-32 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50" cy="50" r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-gray-200 dark:text-gray-800"
              />
              <circle
                cx="50" cy="50" r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - percentage / 100)}`}
                className="text-indigo-600 dark:text-indigo-500"
              />
            </svg>
            <span className="absolute text-3xl font-bold text-gray-900 dark:text-white">{percentage}%</span>
          </div>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            {percentage < 50 ? "You're missing experience and project depth." :
             percentage < 80 ? "Good progress, but needs more real-world experience." :
             "Strong profile! Ready for top applications."}
          </p>
        </div>
      </div>
    </div>
  );
}
