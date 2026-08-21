export type OpportunityCategory =
  | 'Hackathon'
  | 'Internship'
  | 'Competition'
  | 'Fellowship'
  | 'Research'
  | 'Workshop'
  | 'Scholarship';

export type OpportunityMode = 'Online' | 'Offline' | 'Hybrid';

export type DeadlineTone = 'normal' | 'warning' | 'urgency' | 'critical' | 'expired';

export type SortKey = 'recommended' | 'deadline' | 'newest' | 'updated';

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  organizationLogo: string;
  description: string;
  category: OpportunityCategory;
  location: string;
  mode: OpportunityMode;
  deadline: string; // ISO date e.g. 2026-08-28
  daysLeft: number;
  skills: string[];
  eligibility: string[];
  branches: string[];
  years: string[];
  prize: string;
  stipend: string;
  featured: boolean;
  verified: boolean;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface OpportunityFilters {
  q?: string;
  category?: string;
  branch?: string;
  year?: string;
  mode?: string;
  location?: string;
  skill?: string;
  deadline?: string;
  stipend?: string;
}

export interface OpportunityQuery {
  q?: string;
  category?: string;
  branch?: string;
  year?: string;
  mode?: string;
  location?: string;
  skill?: string;
  deadline?: string;
  stipend?: string;
  sort?: SortKey;
  page?: number;
  pageSize?: number;
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const CATEGORY_LIST: OpportunityCategory[] = [
  'Hackathon',
  'Internship',
  'Competition',
  'Fellowship',
  'Research',
  'Workshop',
  'Scholarship',
];

export const ELIGIBILITY_OPTIONS = ['First Year', 'Second Year', 'Third Year', 'Final Year', 'Any Year'];
export const BRANCH_OPTIONS = ['CSE', 'AIML', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Any Branch'];
export const MODE_OPTIONS: OpportunityMode[] = ['Online', 'Offline', 'Hybrid'];
export const LOCATION_OPTIONS = ['India', 'Andhra Pradesh', 'Hyderabad', 'Bangalore', 'Chennai', 'Remote'];
export const SKILL_OPTIONS = [
  'AI / ML',
  'Python',
  'Web Development',
  'App Development',
  'Cloud',
  'Cybersecurity',
  'IoT',
  'Robotics',
  'UI/UX',
  'Research',
];
export const DEADLINE_OPTIONS = ['Next 3 days', 'Next 7 days', 'Next 30 days', 'Later'];

export function deadlineTone(daysLeft: number): DeadlineTone {
  if (daysLeft < 0) return 'expired';
  if (daysLeft <= 2) return 'critical';
  if (daysLeft <= 6) return 'urgency';
  if (daysLeft <= 14) return 'warning';
  return 'normal';
}