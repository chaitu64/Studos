export type WorkspaceView = 'opportunities' | 'ideas' | 'teams' | 'projects' | 'resources';

export interface Opportunity {
  id: string;
  title: string;
  category: 'Hackathons' | 'Internships' | 'Research' | 'Workshops' | 'Summits' | 'Startup competitions';
  organizer: string;
  description: string;
  eligibility: string;
  location: string;
  format: string;
  deadline: string;
  skills: string[];
  applicationUrl: string | null;
  sourceUrl: string | null;
  isDemo: boolean;
  duration: string;
  outcomes: string;
  prepare: string;
  after: string;
}

export interface Idea {
  name: string;
  problem: string;
  solution: string;
  user: string;
  type: string;
  tech: string;
  budget: string;
  milestones: string[];
  validation: string;
}

export interface Resource {
  name: string;
  title: string;
  text: string;
  url: string;
}

export interface SavedProject {
  name: string;
  problem: string;
  contribution: string;
  tech: string;
  url: string;
  results: string;
}

export interface TeamPlan {
  name: string;
  roles: string[];
}
