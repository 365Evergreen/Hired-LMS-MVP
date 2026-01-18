'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Learn at Your Pace, Empower Your Future
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Modern, accessible learning management system designed to help you master new skills with clear progress tracking and professional certificates.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/catalog" className="btn-primary text-base py-3">
              Browse Courses
            </Link>
            <button
              onClick={() => setVideoOpen(true)}
              className="btn-outline text-base py-3"
              aria-label="Watch demo video"
            >
              ▶ Watch Demo
            </button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <p className="text-xl font-medium">Course Dashboard Preview</p>
              <p className="text-sm mt-2">Showcase image goes here</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose HiRed Learning Hub?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-red-50 rounded-lg">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Crystal Clear Progress
              </h3>
              <p className="text-gray-600">
                Real-time progress tracking shows exactly where you stand in each course. No guesswork.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-gray-100 rounded-lg">
              <div className="text-4xl mb-4">♿</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Fully Accessible
              </h3>
              <p className="text-gray-600">
                WCAG compliant design ensures everyone can learn, including keyboard navigation and screen readers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-red-100 rounded-lg">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Professional Certificates
              </h3>
              <p className="text-gray-600">
                Earn downloadable certificates upon course completion to showcase your achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-red-600 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Learning Today
          </h2>
          <p className="text-lg mb-8 text-red-100">
            Explore our curated course catalog and begin your learning journey right now.
          </p>

          <Link href="/catalog" className="inline-block bg-white text-red-600 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-600">
            View All Courses
          </Link>
        </div>
      </section>

      {/* Video Modal */}
      {videoOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Video demo modal"
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">HiRed Learning Hub Demo</h2>
              <button
                onClick={() => setVideoOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl focus:outline-none focus:ring-2 focus:ring-red-500 rounded p-1"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Video Placeholder */}
            <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <div className="text-white text-6xl mb-4">▶</div>
                <p className="text-gray-400">Embedded video player placeholder</p>
                <p className="text-gray-500 text-sm mt-2">YouTube or Vimeo embed goes here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}