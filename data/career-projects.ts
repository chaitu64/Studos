import { careers } from './careers';
import type { CareerProject } from '../types/career';

export const careerProjects: CareerProject[] = careers.flatMap((career) =>
	career.typicalProjects.map((title, index) => ({
		id: `${career.id}-project-${index + 1}`,
		title,
		description: `A portfolio project that builds evidence for a ${career.title} path.`,
		difficulty: index === 0 ? 'beginner' : index === 1 ? 'intermediate' : 'advanced',
		skillsLearned: career.coreSkills.slice(0, 3),
		suggestedTech: career.coreSkills.slice(0, 3),
		careerRelevance: [career.title],
		estimatedHours: index === 0 ? 12 : index === 1 ? 24 : 40,
	}))
);
