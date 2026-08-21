import React from 'react';
import Link from 'next/link';
import { Resource } from '@/types/resource';

interface RecentResourcesProps {
  resources: Resource[];
}

export function RecentResources({ resources }: RecentResourcesProps) {
  if (!resources || resources.length === 0) return null;

  return (
    <div className="py-8 border-t border-gray-200 dark:border-gray-800">
       <div className="mb-6 flex justify-between items-end">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recently added</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">Across all subjects</span>
      </div>

      <div className="flex flex-col gap-3">
        {resources.map(resource => (
          <Link key={resource.id} href={`/resources/${resource.subjectId}`} className="group block">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-100 dark:border-gray-800/60 rounded-lg bg-gray-50/50 dark:bg-gray-900/30 hover:bg-white dark:hover:bg-gray-900 hover:border-indigo-200 dark:hover:border-indigo-800/50 transition-colors">
              <div className="flex items-center gap-4 mb-2 sm:mb-0">
                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0 text-gray-500">
                  {resource.format === 'PDF' ? (
                     <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                     </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">{resource.title}</h4>
                  <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 mt-1 gap-2">
                    <span className="bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-700 dark:text-gray-300">{resource.type}</span>
                    <span>•</span>
                    <span>{resource.branch} {resource.year}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end gap-4 text-xs text-gray-500 dark:text-gray-400 pl-14 sm:pl-0">
                 <span>Updated {new Date(resource.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                 <span className="font-medium text-indigo-600 dark:text-indigo-400 group-hover:underline">View</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
