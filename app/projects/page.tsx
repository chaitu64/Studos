export default function ProjectsPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Built by students.</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article className="border rounded-lg p-4 hover:border-indigo-500 transition-colors">
          <h3 className="font-medium">Project Everest</h3>
          <p className="text-sm text-gray-500">An AI-powered study planner</p>
          <p className="text-xs text-gray-400">React, TypeScript, Node.js</p>
        </article>
        <article className="border rounded-lg p-4 hover:border-indigo-500 transition-colors">
          <h3 className="font-medium">StudySync</h3>
          <p className="text-sm text-gray-500">Collaborative note-taking app</p>
          <p className="text-xs text-gray-400">Next.js, Tailwind, Prisma</p>
        </article>
        <article className="border rounded-lg p-4 hover:border-indigo-500 transition-colors">
          <h3 className="font-medium">CampusMate</h3>
          <p className="text-sm text-gray-500">Campus navigation assistant</p>
          <p className="text-xs text-gray-400">Flutter, Firebase</p>
        </article>
      </div>
    </main>
  );
}