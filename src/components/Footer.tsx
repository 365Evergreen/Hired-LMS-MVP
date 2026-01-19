import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">HiRed Learning</h3>
            <p className="text-sm text-gray-400">
              Empowering learners with accessible, modern education.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalogue" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded px-1 py-1">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded px-1 py-1">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded px-1 py-1">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning */}
          <div>
            <h4 className="text-white font-semibold mb-4">Learning</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded px-1 py-1">
                  About Courses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded px-1 py-1">
                  For Instructors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded px-1 py-1">
                  Certificates
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded px-1 py-1">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded px-1 py-1">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 rounded px-1 py-1">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 HiRed Learning Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
