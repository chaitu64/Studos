import { careers } from '@/data/careers';
import type { CareerRepository } from '@/server/repositories/interfaces/career.repository';
import { MockCareerRepository } from '@/server/repositories/mock/career.repository';
import type { StudentCareerProfile } from '@/types/career';

export class CareerService {
  constructor(private readonly repo: CareerRepository = new MockCareerRepository()) {}

  async listCareers(category?: string) {
    return category && category !== 'all' ? this.repo.getCareersByCategory(category as never) : this.repo.getAllCareers();
  }

  async getCareer(id: string) {
    return this.repo.getCareerById(id);
  }

  async getResources(careerId?: string) {
    return this.repo.getLearningResources(careerId);
  }

  async getProjects(careerId?: string) {
    return this.repo.getCareerProjects(careerId);
  }

  async getOpportunities(careerId?: string) {
    return this.repo.getCareerOpportunities(careerId);
  }

  async recommend(profile: StudentCareerProfile) {
    return this.repo.getRecommendation(profile);
  }
}

export const careerService = new CareerService();
export { careers };
