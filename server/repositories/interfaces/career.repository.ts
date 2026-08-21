import type { Career, CareerRecommendation, StudentCareerProfile, LearningResource, CareerProject, CareerOpportunity } from '../../../types/career';

export interface CareerRepository {
  getAllCareers(): Promise<Career[]>;
  getCareerById(id: string): Promise<Career | null>;
  getCareersByCategory(category: string): Promise<Career[]>;
  getLearningResources(careerId?: string): Promise<LearningResource[]>;
  getCareerProjects(careerId?: string): Promise<CareerProject[]>;
  getCareerOpportunities(careerId?: string): Promise<CareerOpportunity[]>;
  getRecommendation(profile: StudentCareerProfile): Promise<CareerRecommendation | null>;
}