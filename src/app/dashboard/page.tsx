export default function Dashboard() {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">My Courses</h1>
      <p className="text-gray-600 mb-8">Track your enrolled courses and progress here.</p>
      
      <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
        <p className="text-gray-700 mb-4">No courses yet — head to the catalog to find your first course.</p>
        <a href="/catalog" className="inline-block bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
          Browse Courses
        </a>
      </div>
    </section>
  );
}
