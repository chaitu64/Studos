"use client";

import React from 'react';

interface AcademicSelectorProps {
  year: string;
  setYear: (y: string) => void;
  branch: string;
  setBranch: (b: string) => void;
  semester: string;
  setSemester: (s: string) => void;
}

export function AcademicSelector({ year, setYear, branch, setBranch, semester, setSemester }: AcademicSelectorProps) {
  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const branches = ['AIML', 'CSE', 'ECE', 'EEE', 'Mechanical', 'Civil'];
  const semesters = year === '4th Year' ? ['Semester 1'] : ['Semester 1', 'Semester 2'];

  return (
    <div className="bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-4 flex flex-col md:flex-row gap-4 md:items-center justify-between">
            {/* Year Tabs */}
            <div className="flex overflow-x-auto scrollbar-hide space-x-1 p-1 bg-gray-100 dark:bg-gray-900 rounded-xl">
                {years.map(y => (
                    <button
                        key={y}
                        onClick={() => setYear(y)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${
                            year === y
                            ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                        }`}
                    >
                        {y}
                    </button>
                ))}
            </div>

            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                 {/* Branch Selector */}
                 <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Branch:</span>
                    <select
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2"
                    >
                        {branches.map(b => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>
                </div>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-700 hidden md:block"></div>

                {/* Semester Tabs */}
                <div className="flex space-x-1">
                    {semesters.map(s => (
                        <button
                            key={s}
                            onClick={() => setSemester(s)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors border ${
                                semester === s
                                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800'
                                : 'bg-transparent text-gray-600 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}
