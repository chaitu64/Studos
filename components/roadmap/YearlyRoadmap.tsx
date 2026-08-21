"use client";

import React, { useState } from 'react';
import { YearlyPlan } from '@/types/roadmap';

interface YearlyRoadmapProps {
  plans: YearlyPlan[];
}

export function YearlyRoadmap({ plans }: YearlyRoadmapProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your 4-year plan</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">A high-level view of what to focus on each year.</p>
      </div>

      <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-950">
        <div className="flex overflow-x-auto border-b border-gray-200 dark:border-gray-800 scrollbar-hide">
          {plans.map((plan, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex-1 min-w-[120px] py-4 px-4 text-sm font-bold uppercase tracking-wider text-center border-b-2 transition-colors
                ${activeTab === idx
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-900/10'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'}
              `}
            >
              {plan.year}
            </button>
          ))}
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-6">
            <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">Main Focus</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plans[activeTab].focus}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center">
                <span className="w-6 h-6 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-2">📚</span>
                Learn
              </h4>
              <ul className="space-y-2">
                {plans[activeTab].learn.map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-blue-500 mr-2">•</span> {item}
                  </li>
                ))}
                {plans[activeTab].learn.length === 0 && <li className="text-sm text-gray-500 italic">No specific learning goals defined.</li>}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center">
                <span className="w-6 h-6 rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mr-2">🛠️</span>
                Build
              </h4>
              <ul className="space-y-2">
                {plans[activeTab].build.map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-emerald-500 mr-2">•</span> {item}
                  </li>
                ))}
                {plans[activeTab].build.length === 0 && <li className="text-sm text-gray-500 italic">No specific building goals defined.</li>}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center">
                <span className="w-6 h-6 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center mr-2">🏃</span>
                Do
              </h4>
              <ul className="space-y-2">
                {plans[activeTab].do.map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-amber-500 mr-2">•</span> {item}
                  </li>
                ))}
                {plans[activeTab].do.length === 0 && <li className="text-sm text-gray-500 italic">No specific experience goals defined.</li>}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4 flex items-center">
                <span className="w-6 h-6 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-2">🎯</span>
                Prepare
              </h4>
              <ul className="space-y-2">
                {plans[activeTab].prepare.map((item, i) => (
                  <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-purple-500 mr-2">•</span> {item}
                  </li>
                ))}
                {plans[activeTab].prepare.length === 0 && <li className="text-sm text-gray-500 italic">No specific preparation goals defined.</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
