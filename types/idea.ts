export type IdeaStatus =
  | 'Looking for team'
  | 'Building'
  | 'Looking for mentorship'
  | 'Looking for funding'
  | 'Ready to showcase';

export type SupportNeeded = 'Team' | 'Mentorship' | 'Funding' | 'Hardware';

/** Deterministic abstract visual motif rendered for each idea (no stock photos). */
export type IdeaVisual =
  | 'ai'
  | 'iot'
  | 'agriculture'
  | 'campus'
  | 'web'
  | 'accessibility'
  | 'ar';

export interface Idea {
  id: string;
  title: string;
  description: string;
  creator: string;
  branch: string; // CSE, AIML, ECE ...
  year: string; // '1' | '2' | '3' | '4'
  technologies: string[];
  teamSize: number; // current members
  teamTarget: number; // target size
  teamMembers: { name: string; role: string }[];
  lookingFor: string[]; // roles / skills needed
  supportNeeded: SupportNeeded[];
  status: IdeaStatus;
  featured: boolean;
  visual: IdeaVisual;
  createdAt: string; // ISO date
}

export interface IdeaFilters {
  q?: string;
  tab?: string; // all | featured | recent | team | mentorship | funding
  status?: string;
  tech?: string;
  branch?: string;
  year?: string;
  support?: string;
}

export interface IdeaQuery extends IdeaFilters {
  sort?: 'newest' | 'oldest';
  page?: number;
  pageSize?: number;
}

export interface IdeaCreateInput {
  title: string;
  description: string;
  creator?: string;
  branch?: string;
  year?: string;
  technologies?: string[];
  lookingFor?: string[];
  supportNeeded?: SupportNeeded[];
}

export const IDEA_STATUS_LIST: IdeaStatus[] = [
  'Looking for team',
  'Building',
  'Looking for mentorship',
  'Looking for funding',
  'Ready to showcase',
];

export const SUPPORT_LIST: SupportNeeded[] = ['Team', 'Mentorship', 'Funding', 'Hardware'];

export const IDEA_BRANCH_OPTIONS = ['CSE', 'AIML', 'ECE', 'EEE', 'Mechanical', 'Civil'];

export const IDEA_YEAR_OPTIONS = [
  { value: '1', label: 'First Year' },
  { value: '2', label: 'Second Year' },
  { value: '3', label: 'Third Year' },
  { value: '4', label: 'Final Year' },
];

export function ideaYearLabel(year: string): string {
  return IDEA_YEAR_OPTIONS.find((y) => y.value === year)?.label ?? year;
}

/** Subtle per-status color tokens (dot + text, never loud pills). */
export function ideaStatusTone(status: IdeaStatus): {
  dot: string;
  text: string;
} {
  switch (status) {
    case 'Looking for team':
      return { dot: 'bg-info', text: 'text-info' };
    case 'Building':
      return { dot: 'bg-accent', text: 'text-accent' };
    case 'Looking for mentorship':
      return { dot: 'bg-warning', text: 'text-warning' };
    case 'Looking for funding':
      return { dot: 'bg-success', text: 'text-success' };
    case 'Ready to showcase':
      return { dot: 'bg-fg', text: 'text-fg' };
  }
}
