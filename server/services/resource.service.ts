import { Subject, Resource } from '../../types/resource';
import { mockSubjects, mockResources } from '../../data/resources';

export class ResourceService {
  static async getSubjects(branch: string, year: string, semester: string): Promise<Subject[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockSubjects.filter(
      s => s.branch === branch && s.year === year && s.semester === semester
    );
  }

  static async getSubject(id: string): Promise<Subject | null> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return mockSubjects.find(s => s.id === id) || null;
  }

  static async getResourcesForSubject(subjectId: string): Promise<Resource[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockResources.filter(r => r.subjectId === subjectId);
  }

  static async searchResources(query: string): Promise<{ subjects: Subject[], resources: Resource[] }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const lowerQuery = query.toLowerCase();

    const subjects = mockSubjects.filter(s =>
      s.name.toLowerCase().includes(lowerQuery) ||
      s.code.toLowerCase().includes(lowerQuery)
    );

    const resources = mockResources.filter(r =>
      r.title.toLowerCase().includes(lowerQuery) ||
      r.type.toLowerCase().includes(lowerQuery)
    );

    return { subjects, resources };
  }

  static async getRecentResources(): Promise<Resource[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    // Sort by updatedAt descending
    return [...mockResources].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);
  }
}
