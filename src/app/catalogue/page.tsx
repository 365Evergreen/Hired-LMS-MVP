import { fetchCourses, fetchMedia } from '@/lib/wp-client';

export default async function Catalog() {
  const courses = await fetchCourses();

  // Fetch media URLs for all courses
  const coursesWithImages = await Promise.all(
    courses.map(async (course) => {
      let imageUrl: string | null = null;
      if (course.imageUrl) {
        try {
          const mediaIdMatch = course.imageUrl.match(/\/media\/(\d+)/);
          if (mediaIdMatch) {
            const media = await fetchMedia(parseInt(mediaIdMatch[1]));
            imageUrl = media?.source_url || null;
          }
        } catch (error) {
          console.error('Failed to fetch course image:', error);
        }
      }
      return { ...course, imageUrl };
    })
  );

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Course Catalog</h1>
      <p className="text-gray-600 mb-8">Explore our collection of courses designed to help you learn new skills.</p>

      {coursesWithImages.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-600">No courses available at the moment. Please check back soon!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesWithImages.map((course) => (
            <div key={course.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {course.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={course.imageUrl} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="bg-gradient-to-br from-red-100 to-gray-100 h-48 flex items-center justify-center">
                  <span className="text-gray-500 text-3xl">📚</span>
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                <a 
                  href={`/course/${course.slug}`} 
                  className="inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm transition-colors"
                >
                  View Course
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
