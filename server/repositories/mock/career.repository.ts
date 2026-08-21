import { careerProjects } from '../../../data/career-projects';
import { careers, getCareerById } from '../../../data/careers';
import { learningResources } from '../../../data/learning-resources';
import type {
  Career,
  CareerOpportunity,
  CareerProject,
  CareerRecommendation,
  LearningResource,
  StudentCareerProfile,
} from '../../../types/career';
import type { CareerRepository } from '../interfaces/career.repository';

const fallbackResources = learningResources;

function opportunitiesFor(career: Career): CareerOpportunity[] {
  return career.relatedOpportunities.map((id, index) => ({
    id,
    title: id.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
    type: index === 0 ? 'Hackathon' : index === 1 ? 'Internship' : 'Research',
    description: `Look for ${career.title.toLowerCase()} experiences that build ${career.coreSkills.slice(0, 2).join(' and ')}.`,
    relevantCareers: [career.title],
    skills: career.coreSkills.slice(0, 3),
  }));
}

export class MockCareerRepository implements CareerRepository {
  async getAllCareers(): Promise<Career[]> {
    return careers;
  }

  async getCareerById(id: string): Promise<Career | null> {
    return getCareerById(id) ?? null;
  }

  async getCareersByCategory(category: string): Promise<Career[]> {
    return careers.filter((career) => career.category === category);
  }

  async getLearningResources(careerId?: string): Promise<LearningResource[]> {
    if (!careerId) return fallbackResources;
    const career = getCareerById(careerId);
    return career?.learningResources.length ? career.learningResources : fallbackResources;
  }

  async getCareerProjects(careerId?: string): Promise<CareerProject[]> {
    if (!careerId) return careerProjects;
    return careerProjects.filter((project) => project.careerRelevance.includes(getCareerById(careerId)?.title ?? ''));
  }

  async getCareerOpportunities(careerId?: string): Promise<CareerOpportunity[]> {
    const selected = careerId ? getCareerById(careerId) : undefined;
    return selected ? opportunitiesFor(selected) : careers.flatMap(opportunitiesFor);
  }

  async getRecommendation(profile: StudentCareerProfile): Promise<CareerRecommendation | null> {
    const career = chooseCareer(profile);
    if (!career) return null;
    const resources = await this.getLearningResources(career.id);
    const projects = await this.getCareerProjects(career.id);
    const opportunities = await this.getCareerOpportunities(career.id);
    const completedSkills = new Set(profile.currentSkills.map((skill) => skill.toLowerCase()));
    const nextSkills = career.roadmap
      .flatMap((phase) => phase.skills)
      .filter((skill) => !completedSkills.has(skill.name.toLowerCase()))
      .slice(0, 5);

    return {
      career,
      currentStage: `${profile.year} ${profile.branch}`,
      basedOn: [profile.branch, `${profile.year} year`, ...profile.interests.slice(0, 1), profile.goal],
      nextSkills,
      recommendedResources: resources.slice(0, 5),
      recommendedProjects: projects.slice(0, 3),
      recommendedOpportunities: opportunities.slice(0, 3),
      progress: nextSkills.map((skill, index) => ({
        skill: skill.name,
        status: index === 0 ? 'in-progress' : index < 2 ? 'locked' : 'locked',
        progress: index === 0 ? 60 : 0,
      })),
    };
  }
}

function chooseCareer(profile: StudentCareerProfile): Career | null {
  const requested = profile.careerInterests.map((value) => value.toLowerCase());
  const interests = profile.interests.map((value) => value.toLowerCase());
  const branchBoost = profile.branch === 'AIML' ? 'ai-ml' : profile.branch === 'CSE' || profile.branch === 'IT' ? 'software' : undefined;
  const scored = careers.map((career) => {
    const title = career.title.toLowerCase();
    const score =
      (requested.some((interest) => title.includes(interest) || interest.includes(title)) ? 8 : 0) +
      career.coreSkills.reduce((total, skill) => total + (profile.currentSkills.some((current) => skill.toLowerCase().includes(current.toLowerCase())) ? 1 : 0), 0) +
      (interests.some((interest) => career.category === 'ai-ml' && interest.includes('ai') || career.category === 'software' && interest.includes('web') || career.category === 'data' && interest.includes('data') || career.category === 'security' && interest.includes('security')) ? 5 : 0) +
      (career.category === branchBoost ? 2 : 0);
    return { career, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored[0]?.career ?? null;
}
