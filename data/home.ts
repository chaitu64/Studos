export type DeadlineStatus = 'plenty' | 'approaching' | 'urgent';

export interface Opportunity {
  id: string;
  org: string;
  title: string;
  type: string;
  location: string;
  skills: string[];
  deadline: string;
  deadlineDate: string;
  daysLeft: number;
  status: DeadlineStatus;
}

export const STATUS_STYLES: Record<DeadlineStatus, string> = {
  plenty: 'text-green-500',
  approaching: 'text-amber-500',
  urgent: 'text-red-500',
};

export const opportunities: Opportunity[] = [
  {
    id: 'ai-hackathon',
    org: 'TechNova',
    title: 'AI Innovation Hackathon',
    type: 'Hackathon',
    location: 'Hyderabad / Online',
    skills: ['Python', 'AI', 'Machine Learning'],
    deadline: '28 Aug 2026',
    deadlineDate: '28 Aug 2026',
    daysLeft: 6,
    status: 'approaching',
  },
  {
    id: 'summer-internship',
    org: 'DataFlow Labs',
    title: 'Summer Internship — Backend Engineering',
    type: 'Internship',
    location: 'Bengaluru',
    skills: ['Node.js', 'PostgreSQL', 'System Design'],
    deadline: '15 Aug 2026',
    deadlineDate: '15 Aug 2026',
    daysLeft: 3,
    status: 'urgent',
  },
  {
    id: 'robotics-challenge',
    org: 'India Robotics Alliance',
    title: 'National Robotics Challenge',
    type: 'Competition',
    location: 'Remote + Chennai',
    skills: ['ROS', 'C++', 'Embedded'],
    deadline: '12 Sep 2026',
    deadlineDate: '12 Sep 2026',
    daysLeft: 12,
    status: 'plenty',
  },
  {
    id: 'ml-research-fellowship',
    org: 'AIM Research',
    title: 'ML Research Fellowship',
    type: 'Fellowship',
    location: 'Remote',
    skills: ['PyTorch', 'NLP', 'Research'],
    deadline: '20 Sep 2026',
    deadlineDate: '20 Sep 2026',
    daysLeft: 18,
    status: 'plenty',
  },
  {
    id: 'ui-ux-workshop',
    org: 'Design Circle',
    title: 'UI/UX Design Workshop',
    type: 'Workshop',
    location: 'Online',
    skills: ['Figma', 'Design Systems', 'Prototyping'],
    deadline: '5 Sep 2026',
    deadlineDate: '5 Sep 2026',
    daysLeft: 9,
    status: 'approaching',
  },
];

export const categories = [
  { id: 'hackathons', name: 'Hackathons', count: 24 },
  { id: 'internships', name: 'Internships', count: 18 },
  { id: 'competitions', name: 'Competitions', count: 12 },
  { id: 'fellowships', name: 'Fellowships', count: 9 },
  { id: 'research', name: 'Research', count: 15 },
  { id: 'workshops', name: 'Workshops', count: 21 },
];

export const heroFeed = [
  {
    tag: 'FOR STUDENTS',
    title: 'AI Innovation Hackathon',
    meta: '6 days left',
    skills: 'AI · Python · ML',
  },
  {
    tag: 'LOOKING FOR',
    title: 'Smart Campus Project',
    meta: 'IoT Developer',
    skills: 'Join a team of 3',
  },
  {
    tag: 'ON CAMPUS',
    title: 'Innovation Meetup',
    meta: 'Tomorrow · 4:00 PM',
    skills: 'Innovation Center · Room 204',
  },
];

export const hotEvents = [
  {
    day: '21',
    month: 'AUG',
    title: 'AI Workshop',
    location: 'AI & ML Lab',
    time: '4:00 PM',
  },
  {
    day: '23',
    month: 'AUG',
    title: 'IIC Innovation Meetup',
    location: 'Innovation Center',
    time: '10:30 AM',
  },
  {
    day: '25',
    month: 'AUG',
    title: 'Robotics Club Session',
    location: 'Block A · Room 112',
    time: '6:00 PM',
  },
];

export const deadlines = [
  { title: 'AI Hackathon', daysLeft: 6, status: 'approaching' as DeadlineStatus },
  { title: 'Internship Application', daysLeft: 3, status: 'urgent' as DeadlineStatus },
  { title: 'Robotics Challenge', daysLeft: 12, status: 'plenty' as DeadlineStatus },
];

export const featuredProject = {
  id: 'smart-agriculture',
  name: 'Smart Agriculture',
  tech: ['AI', 'IoT', 'Computer Vision'],
  desc: 'An intelligent irrigation system designed to reduce water consumption.',
  team: 4,
};

export const secondaryProjects = [
  {
    id: 'ai-traffic-vision',
    name: 'AI Traffic Vision',
    tech: ['Computer Vision', 'YOLO'],
  },
  {
    id: 'campus-navigation',
    name: 'Campus Navigation',
    tech: ['React Native', 'Mapping'],
  },
];

export const activeIdeas = [
  {
    id: 'campus-energy-monitor',
    title: 'Smart Campus Energy Monitor',
    lookingFor: ['IoT', 'Frontend'],
    support: 'Mentorship',
  },
  {
    id: 'ai-resume-analyzer',
    title: 'AI Resume Analyzer',
    lookingFor: ['ML Developer'],
    support: 'Team',
  },
  {
    id: 'peer-study-match',
    title: 'Peer Study Match',
    lookingFor: ['Backend', 'Product'],
    support: 'Funding',
  },
];

export const students = [
  {
    name: 'Aarav Sharma',
    branch: 'AIML',
    year: '3rd Year',
    skills: ['Python', 'Machine Learning', 'Computer Vision'],
    lookingFor: ['Hardware', 'IoT'],
  },
  {
    name: 'Priya Reddy',
    branch: 'CSE',
    year: '2nd Year',
    skills: ['UI/UX', 'Figma', 'React'],
    lookingFor: ['AI', 'ML'],
  },
  {
    name: 'Kabir Mehta',
    branch: 'ECE',
    year: '3rd Year',
    skills: ['Embedded', 'C++', 'ROS'],
    lookingFor: ['Backend'],
  },
  {
    name: 'Sana Khan',
    branch: 'IT',
    year: 'Final Year',
    skills: ['Node.js', 'Cloud', 'DevOps'],
    lookingFor: ['Mobile'],
  },
];

export const campusBuildings = [
  { id: 'block-a', name: 'Block A', type: 'Lecture' },
  { id: 'innovation', name: 'Innovation Center', type: 'Startups' },
  { id: 'ai-lab', name: 'AI Lab', type: 'Research' },
  { id: 'library', name: 'Library', type: 'Study' },
  { id: 'seminar', name: 'Seminar Hall', type: 'Events' },
];

export const campusHighlights = [
  { title: 'AI Workshop', when: '4:00 PM' },
  { title: 'IIC Meetup', when: 'Tomorrow' },
  { title: 'Robotics Club', when: 'Saturday' },
];

export const years = ['First Year', 'Second Year', 'Third Year', 'Final Year'];

export const personalization = {
  aiMlOpportunities: 3,
  hackathons: 2,
  projectsLooking: 4,
};