# StudOs — The Student Operating System

StudOs is a modern, high-craft web application designed to empower students beyond their traditional syllabus. It connects students to high-impact hackathons, internships, research questions, workshops, idea validation frameworks, complementary team matchmaking, and portfolio showcases.

## 🚀 Built with Modern Next.js

Converted from compiled bundle assets into a clean, modular, and idiomatic **Next.js (App Router)** codebase:

- **Framework**: Next.js 15 (App Router with Server Components & React 19)
- **Language**: TypeScript
- **Styling**: Tailored Design System with curated typography (`Barlow Condensed` + `DM Sans`), micro-animations, interactive constellation view, responsive breakpoints, and dark mode palette.
- **Icons**: Lucide React
- **Storage**: Client-side resilient `localStorage` for private team briefs, bookmarked opportunities, and portfolio drafts.

---

## 📁 Project Structure

```
StuDos/
├── public/
│   └── favicon.svg           # Brand logo and favicon
├── src/
│   ├── app/
│   │   ├── globals.css       # Complete StudOs styling & animation system
│   │   ├── layout.tsx        # Root layout with metadata and fonts
│   │   ├── page.tsx          # Interactive home page experience
│   │   └── [view]/
│   │       └── page.tsx      # Dynamic routes for workspace modules
│   ├── components/
│   │   ├── Header.tsx        # Navigation header with mobile menu
│   │   ├── Footer.tsx        # Footer with brand & links
│   │   ├── Action.tsx        # Primary/secondary action links with arrow
│   │   ├── TitleLine.tsx     # Typography line splitter with staggered reveals
│   │   ├── ChapterTransition.tsx # Editorial chapter cut markers
│   │   ├── Workspace.tsx     # Full interactive workspace logic
│   │   └── HomeExperience.tsx# Complete multi-chapter scroll story
│   ├── data/
│   │   └── studosData.ts     # Curated opportunities, ideas, resources & copy
│   └── types/
│       └── studos.ts         # TypeScript definitions
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🛠️ Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
npm run start
```

---

## ✨ Features

1. **Editorial Scroll Experience**:
   - Scroll-linked reading progress indicator.
   - Chapter transitions with kinetic typography.
   - Dynamic 8-chapter narrative walkthrough covering Time, Hackathons, Internships, Research, Startups, Workshops, Projects, and Teams.
   - Interactive Constellation Map displaying multi-disciplinary roles (Researcher, Developer, Hardware Builder, Designer, Customer Thinker).
   - Accordion FAQ and closing call-to-action.

2. **Opportunity Explorer (`/opportunities`)**:
   - Search filter by title, description, and required skills.
   - Category filtering (Hackathons, Internships, Research, Workshops, Summits, Startup Competitions).
   - Bookmark system with live count and offline device persistence.
   - Full modal brief inspector with eligibility, duration, outcomes, and preparation advice.

3. **Idea Hub (`/ideas`)**:
   - Curated problem/solution briefs with target user breakdowns.
   - Three structured milestones and prototype budgets.
   - Quick navigation into project documentation and team planning.

4. **Team Finder (`/teams`)**:
   - Interactive role selection.
   - Live team brief generator.
   - One-click `.txt` team brief export for sharing with campus groups and labs.

5. **Portfolio Showcase (`/projects`)**:
   - Builder form to document problems, contributions, tech stack, and lessons learned.
   - Instant live preview and deletion with device storage persistence.

6. **Curated Resources (`/resources`)**:
   - Verified official external links to Y Combinator, MIT OpenCourseWare, and NASA research pathways.
