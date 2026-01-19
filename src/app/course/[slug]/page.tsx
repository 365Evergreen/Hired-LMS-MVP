import { fetchCourseBySlug, fetchMedia } from '@/lib/wp-client';
import { notFound } from 'next/navigation';

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await fetchCourseBySlug(slug);
  
  if (!course) {
    notFound();
  }

  // Fetch featured image
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

  return (
    <section>
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{course.title}</h1>
        <p className="text-gray-600 text-lg">{course.description}</p>
        <p className="text-gray-500 text-sm mt-2">
          Published: {new Date(course.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Course Header Image */}
      {imageUrl && (
        <div className="mb-8 rounded-lg overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={imageUrl} 
            alt={course.title}
            className="w-full h-96 object-cover"
          />
        </div>
      )}

      {/* Course Content */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="prose prose-sm max-w-none">
              {/* Safe HTML rendering with basic sanitization */}
              <div 
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(course.content) }}
                className="text-gray-700 leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Sidebar - Course Info */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Course Details</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Status</h3>
              <p className="text-gray-900">In Progress</p>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">Enrollment</h3>
              <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors">
                Enroll in Course
              </button>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Lessons</h3>
              <p className="text-gray-900 text-lg font-semibold">Module-based Learning</p>
              <p className="text-gray-600 text-sm mt-1">Lessons included in this course</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Sanitize HTML to prevent XSS while allowing basic formatting
function sanitizeHtml(html: string): string {
  // Remove script tags and event handlers
  return html
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/on\w+\s*=\s*[^\s>]*/gi, '');
}
