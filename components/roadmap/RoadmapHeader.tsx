import React from 'react';
import Link from 'next/link';

export function RoadmapHeader() {
  return (
    <div className="py-12 border-b border-gray-200/50 dark:border-gray-800/50 bg-white/50 dark:bg-gray-950/50">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-3">
            Your Roadmap
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
            Build your path before you build your career.
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl leading-relaxed">
            Know what to learn, what to build, and what to accomplish at every stage of college.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition-colors">
              Customize my roadmap
            </button>
            <Link
              href="/career"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Explore careers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
