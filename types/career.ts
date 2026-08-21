export type CareerCategory =
  | 'software'
  | 'ai-ml'
  | 'data'
  | 'security'
  | 'cloud'
  | 'mobile'
  | 'design'
  | 'devops'
  | 'robotics'
  | 'research';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export type Year = '1' | '2' | '3' | '4';

export type Branch =
  | 'CSE'
  | 'AIML'
  | 'ECE'
  | 'EEE'
  | 'Mechanical'
  | 'Civil'
  | 'IT'
  | 'Other';

export type Interest =
  | 'AI / ML'
  | 'Web Development'
  | 'App Development'
  | 'Data'
  | 'Cybersecurity'
  | 'Cloud'
  | 'IoT'
  | 'Robotics'
  | 'Design'
  | 'Research';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type Goal =
  | 'Internship'
  | 'Placement'
  | 'Hackathons'
  | 'Research'
  | 'Higher Studies'
  | 'Startup'
  | 'Freelancing';

export interface Career {
  id: string;
  title: string;
  description: string;
  category: CareerCategory;
  coreSkills: string[];
  typicalProjects: string[];
  roadmap: CareerRoadmapPhase[];
  learningResources: LearningResource[];
  relatedOpportunities: string[];
  icon: string;
}

export interface CareerRoadmapPhase {
  phase: string;
  order: number;
  skills: CareerSkill[];
}

export interface CareerSkill {
  id: string;
  name: string;
  description: string;
  level: SkillLevel;
  estimatedHours: number;
  prerequisites: string[];
  resources: string[];
}

export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  platform: string;
  topic: string;
  level: SkillLevel;
  duration: string;
  url: string;
  isFree: boolean;
  tags: string[];
}

export interface CareerProject {
  id: string;
  title: string;
  description: string;
  difficulty: SkillLevel;
  skillsLearned: string[];
  suggestedTech: string[];
  careerRelevance: string[];
  estimatedHours: number;
}

export interface CareerOpportunity {
  id: string;
  title: string;
  type: string;
  description: string;
  relevantCareers: string[];
  skills: string[];
}

export interface StudentCareerProfile {
  year: Year;
  branch: Branch;
  interests: Interest[];
  currentSkills: string[];
  experience: ExperienceLevel;
  goal: Goal;
  careerInterests: string[];
}

export interface CareerRecommendation {
  career: Career;
  currentStage: string;
  basedOn: string[];
  nextSkills: CareerSkill[];
  recommendedResources: LearningResource[];
  recommendedProjects: CareerProject[];
  recommendedOpportunities: CareerOpportunity[];
  progress: CareerProgressStep[];
}

export interface CareerProgressStep {
  skill: string;
  status: 'complete' | 'in-progress' | 'locked';
  progress: number;
}

export const CAREER_CATEGORIES: { value: CareerCategory; label: string; icon: string }[] = [
  { value: 'software', label: 'Software Engineering', icon: 'code' },
  { value: 'ai-ml', label: 'AI / ML Engineering', icon: 'brain' },
  { value: 'data', label: 'Data Science & Analytics', icon: 'database' },
  { value: 'security', label: 'Cybersecurity', icon: 'shield' },
  { value: 'cloud', label: 'Cloud Engineering', icon: 'cloud' },
  { value: 'mobile', label: 'Mobile Development', icon: 'smartphone' },
  { value: 'design', label: 'UI/UX Design', icon: 'palette' },
  { value: 'devops', label: 'DevOps', icon: 'server' },
  { value: 'robotics', label: 'Robotics', icon: 'cpu' },
  { value: 'research', label: 'Research', icon: 'book-open' },
];

export const YEAR_OPTIONS: { value: Year; label: string }[] = [
  { value: '1', label: '1st Year' },
  { value: '2', label: '2nd Year' },
  { value: '3', label: '3rd Year' },
  { value: '4', label: '4th Year' },
];

export const BRANCH_OPTIONS: { value: Branch; label: string }[] = [
  { value: 'CSE', label: 'Computer Science' },
  { value: 'AIML', label: 'AI & ML' },
  { value: 'ECE', label: 'Electronics & Communication' },
  { value: 'EEE', label: 'Electrical & Electronics' },
  { value: 'Mechanical', label: 'Mechanical Engineering' },
  { value: 'Civil', label: 'Civil Engineering' },
  { value: 'IT', label: 'Information Technology' },
  { value: 'Other', label: 'Other' },
];

export const INTEREST_OPTIONS: { value: Interest; label: string }[] = [
  { value: 'AI / ML', label: 'AI / Machine Learning' },
  { value: 'Web Development', label: 'Web Development' },
  { value: 'App Development', label: 'Mobile App Development' },
  { value: 'Data', label: 'Data Science / Analytics' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'Cloud', label: 'Cloud Computing' },
  { value: 'IoT', label: 'IoT / Embedded' },
  { value: 'Robotics', label: 'Robotics' },
  { value: 'Design', label: 'UI/UX Design' },
  { value: 'Research', label: 'Research' },
];

export const SKILL_OPTIONS: string[] = [
  'Python',
  'Java',
  'C++',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'SQL',
  'PostgreSQL',
  'MongoDB',
  'Git',
  'Docker',
  'AWS',
  'Machine Learning',
  'Deep Learning',
  'NLP',
  'Computer Vision',
  'Data Structures',
  'Algorithms',
  'Statistics',
  'Linear Algebra',
  'Figma',
  'UI/UX',
  'REST APIs',
  'GraphQL',
  'Redis',
  'Kubernetes',
  'Linux',
  'C',
  'Go',
  'Rust',
];

export const EXPERIENCE_OPTIONS: { value: ExperienceLevel; label: string }[] = [
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
];

export const GOAL_OPTIONS: { value: Goal; label: string }[] = [
  { value: 'Internship', label: 'Internship' },
  { value: 'Placement', label: 'Full-time Placement' },
  { value: 'Hackathons', label: 'Hackathons' },
  { value: 'Research', label: 'Research' },
  { value: 'Higher Studies', label: 'Higher Studies' },
  { value: 'Startup', label: 'Startup' },
  { value: 'Freelancing', label: 'Freelancing' },
];

export const CAREER_INTEREST_OPTIONS: string[] = [
  'Software Engineer',
  'AI / ML Engineer',
  'Data Scientist',
  'Data Analyst',
  'Cybersecurity Engineer',
  'Cloud Engineer',
  'Full Stack Developer',
  'Mobile Developer',
  'UI/UX Designer',
  'DevOps Engineer',
  'Robotics Engineer',
  'Researcher',
];