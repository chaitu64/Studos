import { mockRoadmap, mockSkills, mockProjects, mockExperience, mockResume } from "../../data/roadmap";

export class RoadmapService {
  static async getRoadmap() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockRoadmap;
  }

  static async getSkills() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockSkills;
  }

  static async getProjects() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProjects;
  }

  static async getExperience() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockExperience;
  }

  static async getResume() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockResume;
  }
}
