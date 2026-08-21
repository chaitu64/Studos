export interface Subject {
  id: string;
  name: string;
  code: string;
  branch: string;
  year: string;
  semester: string;
  description: string;
  resourceCount: number;
}

export type ResourceType =
  | 'Syllabus'
  | 'Notes'
  | 'Previous Papers'
  | 'Important Questions'
  | 'Lab Manuals'
  | 'Assignments'
  | 'Reference Books'
  | 'Question Banks'
  | 'Practical/Viva'
  | 'Other';

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  subjectId: string;
  branch: string;
  year: string;
  semester: string;
  unit?: string;
  academicYear?: string;
  examType?: string; // Mid 1, Mid 2, Semester End, Supply
  format: string; // PDF, Link, Document
  url: string;
  updatedAt: string;
  views?: number;
}

export interface ResourceCategory {
  id: string;
  name: ResourceType;
  icon?: string;
}

export interface AcademicStructure {
  year: string;
  branch: string;
  semesters: string[];
  subjects: Subject[];
}
