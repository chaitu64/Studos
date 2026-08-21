import React from 'react';
import { SkillRecommendation } from '@/types/roadmap';

interface SkillGroupProps {
  skills: SkillRecommendation[];
}

export function SkillGroup({ skills }: SkillGroupProps) {
  const core = skills.filter(s => s.category === 'core');
  const important = skills.filter(s => s.category === 'important');
  const next = skills.filter(s => s.category === 'next');

  const SkillItem = ({ skill }: { skill: SkillRecommendation }) => (
    <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors group">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-gray-900 dark:text-white">{skill.name}</h4>
        <span className={`text-xs px-2 py-1 rounded-md font-medium capitalize
          ${skill.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
            skill.status === 'learning' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' :
            'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}
        `}>
          {skill.status.replace('_', ' ')}
        </span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 h-10 line-clamp-2">
        {skill.whyItMatters}
      </p>

      <div className="flex items-center justify-between text-xs mb-1">
        <span className="text-gray-500 font-medium uppercase tracking-wider">Level</span>
        <span className="text-gray-900 dark:text-gray-300 capitalize">{skill.currentLevel === 'none' ? 'Not started' : skill.currentLevel} → {skill.targetLevel}</span>
      </div>

      <div className="flex gap-1 h-1.5 mb-4">
        <div className={`flex-1 rounded-l-full ${skill.currentLevel !== 'none' ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-800'}`}></div>
        <div className={`flex-1 ${['intermediate', 'advanced'].includes(skill.currentLevel) ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-800'}`}></div>
        <div className={`flex-1 rounded-r-full ${skill.currentLevel === 'advanced' ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-800'}`}></div>
      </div>

      <button className="w-full text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-900/10 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 py-2 rounded-md transition-colors">
        {skill.status === 'completed' ? 'Review' : skill.status === 'learning' ? 'Continue' : 'Start learning'}
      </button>
    </div>
  );

  return (
    <div className="py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills to develop</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Build the foundation your target career expects.</p>
      </div>

      <div className="space-y-8">
        {core.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Core Foundation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {core.map(s => <SkillItem key={s.id} skill={s} />)}
            </div>
          </div>
        )}

        {important.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Important Next</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {important.map(s => <SkillItem key={s.id} skill={s} />)}
            </div>
          </div>
        )}

        {next.length > 0 && (
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-200 dark:border-gray-800 pb-2">Advanced / Specialization</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {next.map(s => <SkillItem key={s.id} skill={s} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
