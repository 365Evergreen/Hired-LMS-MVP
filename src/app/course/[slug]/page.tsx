import CoursePlayer from '@/components/CoursePlayer';

export default function CoursePage({ params }: { params: { slug: string } }) {
  // Mock course data - will be replaced with WordPress API
  const courseData = {
    id: 1,
    slug: params.slug,
    title: 'Course Title',
    description: 'This is a sample course. Content will be loaded from WordPress.',
    lessons: [
      { id: '1', title: 'Lesson 1: Introduction', duration: '15 min' },
      { id: '2', title: 'Lesson 2: Getting Started', duration: '20 min' },
      { id: '3', title: 'Lesson 3: Advanced Concepts', duration: '25 min' },
    ],
  };

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{courseData.title}</h1>
        <p className="text-gray-600 text-lg">{courseData.description}</p>
      </div>

      {/* Course Player */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
          <div className="text-center">
            <div className="text-white text-6xl mb-4">▶</div>
            <p className="text-gray-400">Video player placeholder</p>
            <p className="text-gray-500 text-sm mt-2">Course content will be displayed here</p>
          </div>
        </div>

        {/* Sidebar - Lessons */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Contents</h2>
          <ul className="space-y-3">
            {courseData.lessons.map((lesson, idx) => (
              <li key={lesson.id} className="pb-3 border-b border-gray-200 last:border-b-0">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-5 h-5 rounded border-gray-300 focus:ring-2 focus:ring-red-500"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{lesson.title}</p>
                    <p className="text-sm text-gray-500">{lesson.duration}</p>
                  </div>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
