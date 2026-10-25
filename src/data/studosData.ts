import { Opportunity, Idea, Resource } from '../types/studos';

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: '01',
    title: 'Build for a better campus',
    category: 'Hackathons',
    organizer: 'Illustrative campus innovation club',
    description: 'A 48-hour challenge to prototype a practical solution to a campus problem.',
    eligibility: 'Example: teams of 2–4 college students',
    location: 'Example campus venue',
    format: 'In person',
    deadline: 'Illustrative — no active deadline',
    skills: ['Prototyping', 'Problem solving', 'Pitching'],
    applicationUrl: null,
    sourceUrl: null,
    isDemo: true,
    duration: '48 hours',
    outcomes: 'Practice teamwork under constraints and leave with a demonstrable prototype.',
    prepare: 'Choose a problem, form a team, prepare a repository and a two-minute problem statement.',
    after: 'Document your contribution, test with users and reflect on what did not work.'
  },
  {
    id: '02',
    title: 'Frontend engineering intern',
    category: 'Internships',
    organizer: 'Example product studio',
    description: 'An illustrative role working on accessible web interfaces with a small product team.',
    eligibility: 'Example: undergraduate with two documented web projects',
    location: 'Remote',
    format: 'Online',
    deadline: 'Illustrative — no active deadline',
    skills: ['React', 'TypeScript', 'Accessibility'],
    applicationUrl: null,
    sourceUrl: null,
    isDemo: true,
    duration: '8–12 weeks',
    outcomes: 'Learn code review, collaboration, professional expectations and product delivery.',
    prepare: 'Prepare a concise CV, project evidence and a clear explanation of your work.',
    after: 'Request feedback, document permitted work and evaluate whether this career path fits.'
  },
  {
    id: '03',
    title: 'A question worth investigating',
    category: 'Research',
    organizer: 'Example university laboratory',
    description: 'A sample research brief investigating bias in a small public dataset.',
    eligibility: 'Example: students comfortable with basic Python and statistics',
    location: 'Hybrid',
    format: 'Hybrid',
    deadline: 'Illustrative — no active deadline',
    skills: ['Python', 'Data analysis', 'Experimental methods'],
    applicationUrl: null,
    sourceUrl: null,
    isDemo: true,
    duration: '6 weeks',
    outcomes: 'Practice experimental design, evidence gathering and careful validation.',
    prepare: 'Read relevant literature, articulate a question and identify a suitable mentor.',
    after: 'Share methods and limitations. Publishing a paper is optional; careful inquiry matters.'
  },
  {
    id: '04',
    title: 'From prototype to first conversation',
    category: 'Workshops',
    organizer: 'Example student maker collective',
    description: 'An illustrative workshop on user interviews, rapid prototypes and meaningful feedback.',
    eligibility: 'Example: open to students from any discipline',
    location: 'Online',
    format: 'Online',
    deadline: 'Illustrative — no active deadline',
    skills: ['User interviews', 'Product design'],
    applicationUrl: null,
    sourceUrl: null,
    isDemo: true,
    duration: '3 hours',
    outcomes: 'Design better questions, practice a short demo and meet potential collaborators.',
    prepare: 'Bring one problem and a sketch of your proposed solution.',
    after: 'Interview three potential users and document what changed your mind.'
  },
  {
    id: '05',
    title: 'Student innovation exchange',
    category: 'Summits',
    organizer: 'Example university innovation council',
    description: 'An illustrative meeting of student builders, researchers and practitioners.',
    eligibility: 'Example: current college students',
    location: 'Example university auditorium',
    format: 'In person',
    deadline: 'Illustrative — no active deadline',
    skills: ['Communication', 'Presentation', 'Collaboration'],
    applicationUrl: null,
    sourceUrl: null,
    isDemo: true,
    duration: '1 day',
    outcomes: 'Explore industry challenges, ask questions and discover complementary skills.',
    prepare: 'Prepare a concise project introduction and two thoughtful questions.',
    after: 'Follow up with people who consent to staying in touch; exchange useful resources.'
  },
  {
    id: '06',
    title: 'Test the problem before the pitch',
    category: 'Startup competitions',
    organizer: 'Example campus incubator',
    description: 'An illustrative validation challenge for early student product ideas.',
    eligibility: 'Example: teams with an initial problem statement',
    location: 'Hybrid',
    format: 'Hybrid',
    deadline: 'Illustrative — no active deadline',
    skills: ['Validation', 'MVP', 'Storytelling'],
    applicationUrl: null,
    sourceUrl: null,
    isDemo: true,
    duration: '4 weeks',
    outcomes: 'Test assumptions and communicate evidence without inflating traction.',
    prepare: 'Bring interview notes, an initial prototype and your most uncertain assumption.',
    after: 'Decide whether to iterate, change direction or stop based on evidence.'
  }
];

export const IDEAS: Idea[] = [
  {
    name: 'Campus Loop',
    problem: 'Usable items are discarded when students move out.',
    solution: 'A campus-only exchange for borrowing and reusing everyday items.',
    user: 'Students moving between hostels and semesters',
    type: 'Software',
    tech: 'Next.js · SQLite · accessible forms',
    budget: '₹0–₹2,000, illustrative hosting budget',
    milestones: [
      'Interview 5 students',
      'Prototype a listing and request flow',
      'Test a small moderated exchange'
    ],
    validation: 'Ask students to list real items, observe completed exchanges and investigate abandoned requests.'
  },
  {
    name: 'Quiet Current',
    problem: 'Students cannot easily identify wasteful energy use in shared rooms.',
    solution: 'A low-voltage sensor prototype that visualizes usage patterns.',
    user: 'Student sustainability clubs and lab teams',
    type: 'Hardware + software',
    tech: 'ESP32 · current sensor · Python',
    budget: '₹1,500–₹4,000, illustrative parts estimate',
    milestones: [
      'Interview facilities staff',
      'Build a safe low-voltage test rig',
      'Compare readings with a reference'
    ],
    validation: 'Test accuracy and usefulness with a supervisor. Do not connect experimental equipment to mains power.'
  }
];

export const RESOURCES: Resource[] = [
  {
    name: 'Y Combinator',
    title: 'How to plan an MVP',
    text: 'A practical starting point for scoping a first product.',
    url: 'https://www.ycombinator.com/library/6f-how-to-plan-an-mvp'
  },
  {
    name: 'MIT OpenCourseWare',
    title: 'Learn beyond the classroom',
    text: 'Explore openly available course materials across disciplines.',
    url: 'https://ocw.mit.edu/'
  },
  {
    name: 'NASA',
    title: 'Explore research pathways',
    text: 'Read official program requirements. Eligibility varies, including citizenship restrictions.',
    url: 'https://www.nasa.gov/learning-resources/internship-programs/'
  }
];

export const WORKSPACE_TITLES: Record<string, [string, string]> = {
  opportunities: ['FIND YOUR', 'NEXT CHAPTER.'],
  ideas: ['SMALL IDEAS.', 'REAL POSSIBILITIES.'],
  teams: ['DIFFERENT SKILLS.', 'SHARED DIRECTION.'],
  projects: ['LET YOUR', 'WORK SPEAK.'],
  resources: ['FOLLOW YOUR', 'CURIOSITY.']
};

export const WORKSPACE_DESCRIPTIONS: Record<string, string> = {
  opportunities: 'Explore a direction. Understand the work. Take one useful next step.',
  ideas: 'A starting point for experimentation. Real demand still needs to be validated.',
  teams: 'Map the skills your project needs. Start with people who care about the same problem.',
  projects: 'Document the problem, your contribution and what you learned. Evidence makes the difference.',
  resources: 'Good questions deserve good sources. Start with these official resources.'
};
