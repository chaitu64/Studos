export default function ClassroomsPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Classrooms</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Room A101</h3>
          <p className="text-gray-500 text-sm">Building: Innovation Center</p>
          <p className="text-gray-400 text-sm">Department: Computer Science</p>
          <p className="text-gray-500 text-sm">Current class: Web Development</p>
          <p className="text-gray-400 text-sm">Next class: Database Systems</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Room B205</h3>
          <p className="text-gray-500 text-sm">Building: Block A</p>
          <p className="text-gray-400 text-sm">Department: Electrical Engineering</p>
          <p className="text-gray-500 text-sm">Current class: Circuit Theory</p>
          <p className="text-gray-400 text-sm">Next class: Power Electronics</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Room C130</h3>
          <p className="text-gray-500 text-sm">Building: Library</p>
          <p className="text-gray-400 text-sm">Department: Mathematics</p>
          <p className="text-gray-500 text-sm">Current class: Calculus</p>
          <p className="text-gray-400 text-sm">Next class: Linear Algebra</p>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-2">Room D210</h3>
          <p className="text-gray-500 text-sm">Building: Student Center</p>
          <p className="text-gray-400 text-sm">Department: Physics</p>
          <p className="text-gray-500 text-sm">Current class: Quantum Mechanics</p>
          <p className="text-gray-400 text-sm">Next class: Relativity</p>
        </div>
      </div>
    </main>
  );
}