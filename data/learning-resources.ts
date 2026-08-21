import type { LearningResource } from '../types/career';

export const learningResources: LearningResource[] = [
  { id: 'python-foundations', title: 'Python Foundations', provider: 'StudOS curated', platform: 'YouTube', topic: 'Python', level: 'beginner', duration: '12 hours', url: 'https://example.com/studos/python-foundations', isFree: true, tags: ['python', 'foundation'] },
  { id: 'data-structures', title: 'Data Structures and Algorithms', provider: 'StudOS curated', platform: 'YouTube', topic: 'Data Structures', level: 'intermediate', duration: '18 hours', url: 'https://example.com/studos/data-structures', isFree: true, tags: ['dsa', 'interviews'] },
  { id: 'ml-full-course', title: 'Machine Learning Full Course', provider: 'StudOS curated', platform: 'YouTube', topic: 'Machine Learning', level: 'intermediate', duration: '14 hours', url: 'https://example.com/studos/machine-learning', isFree: true, tags: ['machine-learning', 'models'] },
  { id: 'sql-for-analysis', title: 'SQL for Data Analysis', provider: 'StudOS curated', platform: 'YouTube', topic: 'SQL', level: 'beginner', duration: '8 hours', url: 'https://example.com/studos/sql-analysis', isFree: true, tags: ['sql', 'data'] },
  { id: 'web-development', title: 'Modern Web Development', provider: 'StudOS curated', platform: 'YouTube', topic: 'Web Development', level: 'beginner', duration: '16 hours', url: 'https://example.com/studos/web-development', isFree: true, tags: ['web', 'frontend'] },
  { id: 'linux-security', title: 'Linux and Security Basics', provider: 'StudOS curated', platform: 'YouTube', topic: 'Cybersecurity', level: 'beginner', duration: '10 hours', url: 'https://example.com/studos/linux-security', isFree: true, tags: ['linux', 'security'] },
];
