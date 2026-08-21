import {
  Roadmap,
  SkillRecommendation,
  ProjectRecommendation,
  ExperienceGoal,
  ResumeRequirement,
  YearlyPlan
} from "../types/roadmap";

export const mockRoadmap: Roadmap = {
  id: "rd_123",
  careerPath: "AI / ML Engineer",
  studentContext: {
    branch: "AIML",
    year: "2nd Year",
    goal: "AI / ML Engineer"
  },
  overallProgress: 42,
  currentStageId: "st_year2",
  stages: [
    {
      id: "st_year1",
      year: "YEAR 1",
      title: "Foundation",
      description: "Building the core programming and mathematical foundations.",
      progress: 100,
      status: "completed",
      milestones: []
    },
    {
      id: "st_year2",
      year: "YEAR 2",
      title: "Skill Building",
      description: "You're here. Focus on core domain skills and initial projects.",
      progress: 42,
      status: "current",
      milestones: [
        { id: "m1", title: "Master Python", category: "skill", recommendedYear: "2nd Year", status: "completed" },
        { id: "m2", title: "Learn Data Structures", category: "skill", recommendedYear: "2nd Year", status: "in_progress" },
        { id: "m3", title: "Build 2 ML Projects", category: "project", recommendedYear: "2nd Year", status: "in_progress" },
        { id: "m4", title: "Participate in a Hackathon", category: "experience", recommendedYear: "2nd Year", status: "not_started" }
      ]
    },
    {
      id: "st_year3",
      year: "YEAR 3",
      title: "Experience",
      description: "Apply your skills in internships, research, and hackathons.",
      progress: 0,
      status: "upcoming",
      milestones: []
    },
    {
      id: "st_year4",
      year: "YEAR 4",
      title: "Career Ready",
      description: "Prepare for placements, higher studies, or startups.",
      progress: 0,
      status: "upcoming",
      milestones: []
    }
  ],
  fourYearPlan: [
    {
      year: "1ST YEAR",
      focus: "Building Foundations",
      learn: ["Programming fundamentals", "Git", "Problem solving"],
      build: ["2 small projects"],
      do: ["Join clubs", "Attend workshops"],
      prepare: []
    },
    {
      year: "2ND YEAR",
      focus: "Skill Building",
      learn: ["DSA", "Core domain skills", "Statistics"],
      build: ["2 medium projects"],
      do: ["Hackathons", "Competitions"],
      prepare: ["GitHub profile", "LinkedIn"]
    },
    {
      year: "3RD YEAR",
      focus: "Experience",
      learn: ["Advanced domain skills", "System Design basics"],
      build: ["1–2 strong portfolio projects"],
      do: ["Internship", "Research", "Hackathons"],
      prepare: ["Resume", "Interview prep"]
    },
    {
      year: "4TH YEAR",
      focus: "Placement & Launch",
      learn: ["Domain specialization"],
      build: ["Final year project"],
      do: [],
      prepare: ["Resume", "Interviews", "Portfolio", "Placement/Higher studies"]
    }
  ]
};

export const mockSkills: SkillRecommendation[] = [
  {
    id: "sk_1",
    name: "Python",
    category: "core",
    importance: "high",
    currentLevel: "intermediate",
    targetLevel: "advanced",
    status: "learning",
    whyItMatters: "The primary language for AI and Machine Learning."
  },
  {
    id: "sk_2",
    name: "Git",
    category: "core",
    importance: "high",
    currentLevel: "beginner",
    targetLevel: "intermediate",
    status: "completed",
    whyItMatters: "Essential for version control and collaboration."
  },
  {
    id: "sk_3",
    name: "Data Structures",
    category: "core",
    importance: "high",
    currentLevel: "beginner",
    targetLevel: "intermediate",
    status: "learning",
    whyItMatters: "Crucial for technical interviews and efficient algorithms."
  },
  {
    id: "sk_4",
    name: "Statistics",
    category: "important",
    importance: "high",
    currentLevel: "none",
    targetLevel: "intermediate",
    status: "not_started",
    whyItMatters: "The mathematical foundation of Machine Learning."
  },
  {
    id: "sk_5",
    name: "Machine Learning",
    category: "important",
    importance: "high",
    currentLevel: "none",
    targetLevel: "intermediate",
    status: "not_started",
    whyItMatters: "Core skill for your target career."
  },
  {
    id: "sk_6",
    name: "Deep Learning",
    category: "next",
    importance: "medium",
    currentLevel: "none",
    targetLevel: "intermediate",
    status: "not_started",
    whyItMatters: "Advanced techniques for complex AI problems."
  }
];

export const mockProjects: ProjectRecommendation[] = [
  {
    id: "pr_1",
    title: "House Price Prediction",
    difficulty: "beginner",
    skills: ["Python", "Pandas", "Scikit-learn"],
    estimatedTime: "1-2 weeks",
    careerRelevance: "High",
    whyBuildIt: "Learn regression, data preprocessing, and basic model evaluation."
  },
  {
    id: "pr_2",
    title: "Customer Churn Prediction",
    difficulty: "intermediate",
    skills: ["Python", "ML", "SQL", "Data Viz"],
    estimatedTime: "2-3 weeks",
    careerRelevance: "High",
    whyBuildIt: "Handle imbalanced datasets, feature engineering, and classification."
  },
  {
    id: "pr_3",
    title: "End-to-End Recommendation System",
    difficulty: "advanced",
    skills: ["Python", "ML", "APIs", "Deployment"],
    estimatedTime: "4-6 weeks",
    careerRelevance: "Very High",
    whyBuildIt: "Build a complete ML pipeline from data to deployed API."
  }
];

export const mockExperience: ExperienceGoal[] = [
  {
    id: "ex_1",
    title: "Participate in a hackathon",
    whyItMatters: "Learn to build fast, work in a team, and solve real problems.",
    suggestedYear: "2nd–3rd Year",
    status: "not_started"
  },
  {
    id: "ex_2",
    title: "Complete an internship",
    whyItMatters: "Real-world experience is the most important factor for placements.",
    suggestedYear: "3rd Year",
    status: "not_started"
  },
  {
    id: "ex_3",
    title: "Contribute to an open-source project",
    whyItMatters: "Demonstrates ability to work with large, existing codebases.",
    suggestedYear: "2nd–4th Year",
    status: "not_started"
  },
  {
    id: "ex_4",
    title: "Participate in research",
    whyItMatters: "Especially valuable for AI/ML careers and higher studies.",
    suggestedYear: "3rd Year",
    status: "not_started"
  }
];

export const mockResume: ResumeRequirement[] = [
  { id: "rs_1", title: "Education", status: "completed", category: "education" },
  { id: "rs_2", title: "Technical Skills", status: "completed", category: "skills" },
  { id: "rs_3", title: "3–5 Strong Projects", status: "missing", category: "projects" },
  { id: "rs_4", title: "Internship", status: "missing", category: "experience" },
  { id: "rs_5", title: "Hackathon achievements", status: "missing", category: "experience" },
  { id: "rs_6", title: "GitHub portfolio", status: "completed", category: "portfolio" }
];
