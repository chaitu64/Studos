import React from 'react';

export function ResourceHeader() {
  return (
    <div className="py-12 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-950/50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-3">
            Academic Resources
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            Everything you need for your semester.
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed mb-8">
            Find notes, previous papers, syllabi, lab material and other academic resources in one place.
          </p>

          <div className="relative max-w-2xl">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search subjects, notes, question papers..."
              className="block w-full pl-10 pr-3 py-4 border border-gray-300 dark:border-gray-700 rounded-xl leading-5 bg-white dark:bg-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400 py-1.5 mr-2">Quick Access:</span>
            {['My Semester', 'Previous Papers', 'Syllabus', 'Notes', 'Lab Manuals', 'Important Questions'].map(tag => (
                <button key={tag} className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    {tag}
                </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
