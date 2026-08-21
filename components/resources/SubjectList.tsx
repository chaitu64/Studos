import React from 'react';
import Link from 'next/link';
import { Subject } from '@/types/resource';

interface SubjectListProps {
  subjects: Subject[];
  year: string;
  branch: string;
  semester: string;
}

export function SubjectList({ subjects, year, branch, semester }: SubjectListProps) {
  return (
    <div className="py-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your subjects</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider font-semibold">
          {year} &middot; {branch} &middot; {semester}
        </p>
      </div>

      {subjects.length === 0 ? (
        <div className="text-center py-16 border border-gray-200 dark:border-gray-800 border-dashed rounded-xl bg-gray-50 dark:bg-gray-900/50">
          <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No resources available yet.</h3>
          <p className="text-gray-500 dark:text-gray-400">We're still building this section for {year} {branch} {semester}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subjects.map(subject => (
            <Link key={subject.id} href={`/resources/${subject.id}`} className="group block">
              <div className="p-5 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-950 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors h-full flex flex-col">
                <div className="flex justify-between items-start mb-3">
                   <span className="text-xs font-bold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded">
                      {subject.code}
                   </span>
                   <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 rounded-full">
                      {subject.resourceCount} resources
                   </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {subject.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow line-clamp-2">
                  {subject.description}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-900 flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                  Open subject
                  <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
