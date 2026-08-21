export default function SubmitIdeaPage() {
  return (
    <main className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Submit an Idea</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Project Name</label>
          <input type="text" className="rounded w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Problem</label>
          <textarea rows={3} className="rounded w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Solution</label>
          <textarea rows={3} className="rounded w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Technology</label>
          <input type="text" placeholder="e.g. React, Node.js, Python" className="rounded w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" />
        </div>
        <button type="submit" className="w-full rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition-colors">
          Submit
        </button>
      </form>
    </main>
  );
}