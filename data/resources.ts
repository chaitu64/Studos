import { Subject, Resource } from '../types/resource';

export const mockSubjects: Subject[] = [
  // 1st Year (Common/Basic)
  { id: 'subj_101', name: 'Engineering Mathematics', code: 'MATH101', branch: 'AIML', year: '1st Year', semester: 'Semester 1', description: 'Calculus, Linear Algebra, and basics.', resourceCount: 12 },
  { id: 'subj_102', name: 'Programming for Problem Solving', code: 'CS101', branch: 'AIML', year: '1st Year', semester: 'Semester 1', description: 'Introduction to C programming.', resourceCount: 20 },
  { id: 'subj_103', name: 'Engineering Physics', code: 'PHY101', branch: 'AIML', year: '1st Year', semester: 'Semester 1', description: 'Basic physics principles.', resourceCount: 8 },

  // 2nd Year
  { id: 'subj_201', name: 'Data Structures', code: 'CS201', branch: 'AIML', year: '2nd Year', semester: 'Semester 1', description: 'Arrays, Linked Lists, Trees, Graphs.', resourceCount: 35 },
  { id: 'subj_202', name: 'Database Management Systems', code: 'CS202', branch: 'AIML', year: '2nd Year', semester: 'Semester 1', description: 'SQL, Normalization, Transactions.', resourceCount: 28 },
  { id: 'subj_203', name: 'Computer Organization', code: 'CS203', branch: 'AIML', year: '2nd Year', semester: 'Semester 2', description: 'CPU, Memory architecture.', resourceCount: 15 },

  // 3rd Year AIML
  { id: 'subj_301', name: 'Machine Learning', code: 'AIML301', branch: 'AIML', year: '3rd Year', semester: 'Semester 1', description: 'Supervised and unsupervised learning techniques.', resourceCount: 42 },
  { id: 'subj_302', name: 'Data Mining', code: 'AIML302', branch: 'AIML', year: '3rd Year', semester: 'Semester 1', description: 'Knowledge discovery in databases.', resourceCount: 18 },
  { id: 'subj_303', name: 'Computer Networks', code: 'CS303', branch: 'AIML', year: '3rd Year', semester: 'Semester 1', description: 'OSI Model, TCP/IP, Routing.', resourceCount: 24 },
  { id: 'subj_304', name: 'Deep Learning', code: 'AIML304', branch: 'AIML', year: '3rd Year', semester: 'Semester 2', description: 'Neural Networks, CNNs, RNNs.', resourceCount: 30 },
  { id: 'subj_305', name: 'Natural Language Processing', code: 'AIML305', branch: 'AIML', year: '3rd Year', semester: 'Semester 2', description: 'Text processing, word embeddings, LLMs.', resourceCount: 22 },

  // 4th Year AIML
  { id: 'subj_401', name: 'Capstone Project', code: 'PRJ401', branch: 'AIML', year: '4th Year', semester: 'Semester 1', description: 'Final year project guidelines and templates.', resourceCount: 5 },
  { id: 'subj_402', name: 'Professional Ethics', code: 'ETH401', branch: 'AIML', year: '4th Year', semester: 'Semester 1', description: 'Engineering ethics and standards.', resourceCount: 8 },
];

export const mockResources: Resource[] = [
  { id: 'res_1', title: 'Machine Learning Official Syllabus', type: 'Syllabus', subjectId: 'subj_301', branch: 'AIML', year: '3rd Year', semester: 'Semester 1', format: 'PDF', url: '#', updatedAt: '2025-08-01', views: 340 },
  { id: 'res_2', title: 'Machine Learning — Unit 1 Notes', type: 'Notes', subjectId: 'subj_301', branch: 'AIML', year: '3rd Year', semester: 'Semester 1', unit: 'Unit 1', format: 'PDF', url: '#', updatedAt: '2026-07-15', views: 890 },
  { id: 'res_3', title: 'Machine Learning — Unit 2 Notes', type: 'Notes', subjectId: 'subj_301', branch: 'AIML', year: '3rd Year', semester: 'Semester 1', unit: 'Unit 2', format: 'PDF', url: '#', updatedAt: '2026-07-20', views: 750 },
  { id: 'res_4', title: 'Machine Learning — Unit 3 Notes', type: 'Notes', subjectId: 'subj_301', branch: 'AIML', year: '3rd Year', semester: 'Semester 1', unit: 'Unit 3', format: 'PDF', url: '#', updatedAt: '2026-08-05', views: 620 },
  { id: 'res_5', title: 'Machine Learning End Semester Question Paper', type: 'Previous Papers', subjectId: 'subj_301', branch: 'AIML', year: '3rd Year', semester: 'Semester 1', academicYear: '2025-26', examType: 'Semester End', format: 'PDF', url: '#', updatedAt: '2026-05-10', views: 1200 },
  { id: 'res_6', title: 'Machine Learning Mid 1 Question Paper', type: 'Previous Papers', subjectId: 'subj_301', branch: 'AIML', year: '3rd Year', semester: 'Semester 1', academicYear: '2025-26', examType: 'Mid 1', format: 'PDF', url: '#', updatedAt: '2025-10-15', views: 950 },
  { id: 'res_7', title: 'Unit-wise Important Questions', type: 'Important Questions', subjectId: 'subj_301', branch: 'AIML', year: '3rd Year', semester: 'Semester 1', format: 'PDF', url: '#', updatedAt: '2026-08-10', views: 1500 },
  { id: 'res_8', title: 'ML Lab Manual', type: 'Lab Manuals', subjectId: 'subj_301', branch: 'AIML', year: '3rd Year', semester: 'Semester 1', format: 'PDF', url: '#', updatedAt: '2026-01-12', views: 430 },
  { id: 'res_9', title: 'Pattern Recognition and Machine Learning (Bishop)', type: 'Reference Books', subjectId: 'subj_301', branch: 'AIML', year: '3rd Year', semester: 'Semester 1', format: 'Link', url: '#', updatedAt: '2024-06-01', views: 210 },

  // Data Structures
  { id: 'res_10', title: 'Data Structures Unit 1 Notes', type: 'Notes', subjectId: 'subj_201', branch: 'AIML', year: '2nd Year', semester: 'Semester 1', unit: 'Unit 1', format: 'PDF', url: '#', updatedAt: '2026-08-18', views: 200 }, // Recent
  { id: 'res_11', title: 'DSA Previous Paper 2024', type: 'Previous Papers', subjectId: 'subj_201', branch: 'AIML', year: '2nd Year', semester: 'Semester 1', academicYear: '2024-25', examType: 'Semester End', format: 'PDF', url: '#', updatedAt: '2025-05-10', views: 3000 },
  { id: 'res_12', title: 'DSA Lab Programs', type: 'Practical/Viva', subjectId: 'subj_201', branch: 'AIML', year: '2nd Year', semester: 'Semester 1', format: 'PDF', url: '#', updatedAt: '2026-08-20', views: 150 }, // Very Recent
];
