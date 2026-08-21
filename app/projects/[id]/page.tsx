// @ts-nocheck
'use client';

import { useParams } from 'next/navigation';

export default function ProjectDetailPage() {
  const { id } = useParams();

  return (
    <main className="container mx-auto p-4">
      <article className="prose max-w-2xl">
        <h1 className="text-3xl font-bold">Project Everest</h1>
        <p className="text-gray-500 mb-6">
          An AI-powered study planner that adapts to your learning style.
        </p>
        <section>
          <h2 className="font-medium mb-2">The Problem</h2>
          <p>Students often struggle to find effective study strategies...</p>
        </section>
        <section>
          <h2 className="font-medium mb-2">The Solution</h2>
          <p>Our AI analyzes your learning patterns and recommends...</p>
        </section>
        <section>
          <h2 className="font-medium mb-2">Architecture</h2>
          <p>Frontend: React + TypeScript • Backend: Node.js + PostgreSQL • Database: Prisma ORM</p>
        </section>
        <section>
          <h2 className="font-medium mb-2">Results</h2>
          <p>85% of users report improved study efficiency within 2 weeks.</p>
        </section>
        <section>
          <h2 className="font-medium mb-2">Achievements</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Winner, National Hackathon 2024</li>
            <li>Featured on TechCrunch</li>
            <li>1,200+ active users</li>
          </ul>
        </section>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <a href="https://github.com/team/everest" className="rounded bg-indigo-600 px-3 py-1.5 text-sm text-white hover:bg-indigo-700 transition-colors" target="_blank" rel="noopener">
            GitHub
          </a>
          <a href="https://app.example.com/everest" className="rounded bg-gray-200 px-3 py-1.5 text-gray-800 hover:bg-gray-300 transition-colors" target="_blank" rel="noopener">
            Demo
          </a>
        </div>
      </article>
    </main>
  );
}