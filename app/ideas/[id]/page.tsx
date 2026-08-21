// @ts-nocheck
'use client';

import { useParams } from 'next/navigation';

export default function IdeaDetailPage() {
  const { id } = useParams();

  return (
    <main className="container mx-auto p-4">
      <nav className="mb-4">
        <a href="/ideas" className="text-sm text-indigo-600 hover-underline">Ideas</a>
        <span>/</span>
        <span className="text-sm">Idea Detail</span>
      </nav>
      <article className="prose max-w-xl">
        <h1 className="text-2xl font-bold">Project Titanium</h1>
        <p className="text-gray-500 mb-4">
          An AI-powered tutoring platform connecting students with peer mentors.
        </p>
        <p className="text-sm text-gray-500 mb-6">Creator: Alex</p>
        <section>
          <h2 className="font-medium mb-2">Problem</h2>
          <p>Students struggle to find accessible peer tutoring...</p>
        </section>
        <section>
          <h2 className="font-medium mb-2">Solution</h2>
          <p>Our platform matches learners with vetted peer mentors...</p>
        </section>
        <section>
          <h2 className="font-medium mb-2">Technologies</h2>
          <p>React, Node.js, PostgreSQL, WebSockets</p>
        </section>
        <section>
          <h2 className="font-medium mb-2">Team</h2>
          <p>Alex (Lead), Jamie (Design), Priya (Backend)</p>
        </section>
        <section>
          <h2 className="font-medium mb-2">Funding & Mentorship</h2>
          <p>Seeking $10K seed funding and a mentor with EdTech experience.</p>
        </section>
        <div className="mt-6">
          <button className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition-colors">
            Join project
          </button>
          <button className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 transition-colors ml-2">
            Request collaboration
          </button>
        </div>
      </article>
    </main>
  );
}