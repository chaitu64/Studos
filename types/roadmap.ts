export interface Roadmap {
  id: string;
  careerPath: string;
  studentContext: {
    branch: string;
    year: string;
    goal: string;
  };
  overallProgress: number;
  stages: RoadmapStage[];
  currentStageId: string;
  fourYearPlan: YearlyPlan[];
}

export interface RoadmapStage {
  id: string;
  year: string;
  title: string;
  description: string;
  progress: number; // percentage
  status: "completed" | "current" | "upcoming";
  milestones: RoadmapMilestone[];
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  category: "skill" | "project" | "experience" | "career";
  description?: string;
  recommendedYear: string;
  status: "not_started" | "in_progress" | "completed";
  relatedSkill?: string;
  relatedOpportunity?: string;
}

export interface SkillRecommendation {
  id: string;
  name: string;
  category: "core" | "important" | "next";
  importance: "high" | "medium" | "low";
  currentLevel: "beginner" | "intermediate" | "advanced" | "none";
  targetLevel: "beginner" | "intermediate" | "advanced";
  status: "not_started" | "learning" | "completed";
  whyItMatters: string;
}

export interface ProjectRecommendation {
  id: string;
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  skills: string[];
  estimatedTime: string;
  careerRelevance: string;
  whyBuildIt: string;
}

export interface ExperienceGoal {
  id: string;
  title: string;
  whyItMatters: string;
  suggestedYear: string;
  status: "not_started" | "in_progress" | "completed";
}

export interface ResumeRequirement {
  id: string;
  title: string;
  status: "completed" | "missing";
  category: "education" | "skills" | "projects" | "experience" | "portfolio" | "placement";
}

export interface YearlyPlan {
  year: string;
  focus: string;
  learn: string[];
  build: string[];
  do: string[];
  prepare: string[];
}
