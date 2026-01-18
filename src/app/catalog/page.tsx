import CourseCard from '@/components/CourseCard';

export default function Catalog() {
  // Mock courses data - will be replaced with WordPress API
  const mockCourses = [
    { id: 1, slug: 'web-development', title: 'Web Development Fundamentals', description: 'Learn HTML, CSS, and JavaScript basics.' },
    { id: 2, slug: 'react-basics', title: 'React for Beginners', description: 'Build interactive UIs with React.' },
    { id: 3, slug: 'typescript', title: 'TypeScript Essentials', description: 'Master type-safe JavaScript development.' },
  ];

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Course Catalog</h1>
      <p className="text-gray-600 mb-8">Explore our collection of courses designed to help you learn new skills.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {mockCourses.map((course) => (
          <div key={course.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 h-40 rounded-md mb-4 flex items-center justify-center">
              <span className="text-gray-500">Course Image</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
            <p className="text-gray-600 text-sm mb-4">{course.description}</p>
            <a 
              href={`/course/${course.slug}`} 
              className="inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            >
              View Course
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
