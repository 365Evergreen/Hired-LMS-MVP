// WordPress REST API Client
// Fetches courses, pages, and posts from the WordPress site

const WP_SITE_URL = 'https://thn.chh.mybluehost.me/website_8a441532';
const WP_API_URL = `${WP_SITE_URL}/wp-json/wp/v2`;

// Type definitions for WordPress responses
export interface WordPressCourse {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  date: string;
  link: string;
  type: string;
}

export interface WordPressPage {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  date: string;
  link: string;
  type: string;
}

export interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  featured_media: number;
  date: string;
  link: string;
  type: string;
  categories?: number[];
}

export interface WordPressMedia {
  id: number;
  guid: {
    rendered: string;
  };
  media_details?: {
    width: number;
    height: number;
    file: string;
  };
  source_url: string;
  alt_text: string;
}

// Course data structure for frontend
export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl?: string;
  date: string;
}

// Fetch courses from WordPress custom post type
export async function fetchCourses(): Promise<Course[]> {
  try {
    const response = await fetch(`${WP_API_URL}/course?per_page=100`);
    if (!response.ok) {
      throw new Error(`Failed to fetch courses: ${response.status}`);
    }
    const courses: WordPressCourse[] = await response.json();
    
    // Transform WordPress courses to our Course interface
    return courses.map((course) => ({
      id: course.id,
      title: course.title.rendered,
      slug: course.slug,
      description: stripHtml(course.excerpt.rendered) || stripHtml(course.content.rendered).substring(0, 150) + '...',
      content: course.content.rendered,
      date: course.date,
      imageUrl: course.featured_media ? `${WP_SITE_URL}/wp-json/wp/v2/media/${course.featured_media}` : undefined,
    }));
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
}

// Fetch a single course by slug
export async function fetchCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const response = await fetch(`${WP_API_URL}/course?slug=${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch course: ${response.status}`);
    }
    const courses: WordPressCourse[] = await response.json();
    if (courses.length === 0) return null;
    
    const course = courses[0];
    return {
      id: course.id,
      title: course.title.rendered,
      slug: course.slug,
      description: stripHtml(course.excerpt.rendered),
      content: course.content.rendered,
      date: course.date,
      imageUrl: course.featured_media ? `${WP_SITE_URL}/wp-json/wp/v2/media/${course.featured_media}` : undefined,
    };
  } catch (error) {
    console.error('Error fetching course:', error);
    return null;
  }
}

// Fetch pages from WordPress
export async function fetchPages(): Promise<WordPressPage[]> {
  try {
    const response = await fetch(`${WP_API_URL}/pages?per_page=100`);
    if (!response.ok) {
      throw new Error(`Failed to fetch pages: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

// Fetch a single page by slug
export async function fetchPageBySlug(slug: string): Promise<WordPressPage | null> {
  try {
    const response = await fetch(`${WP_API_URL}/pages?slug=${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status}`);
    }
    const pages: WordPressPage[] = await response.json();
    return pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

// Fetch posts from WordPress
export async function fetchPosts(limit = 10): Promise<WordPressPost[]> {
  try {
    const response = await fetch(`${WP_API_URL}/posts?per_page=${limit}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

// Fetch media by ID
export async function fetchMedia(mediaId: number): Promise<WordPressMedia | null> {
  try {
    const response = await fetch(`${WP_API_URL}/media/${mediaId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}

// Helper function to strip HTML tags
function stripHtml(html: string): string {
  if (typeof document === 'undefined') {
    // Server-side: use regex
    return html.replace(/<[^>]*>/g, '').trim();
  }
  // Client-side: use DOM parser
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || '').trim();
}

// Helper to get featured image URL
export async function getFeaturedImageUrl(mediaId: number): Promise<string | null> {
  if (!mediaId) return null;
  const media = await fetchMedia(mediaId);
  return media?.source_url || null;
}
