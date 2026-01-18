import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header className="bg-white border-b">
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 rounded">
            HiRed
          </Link>

          <nav aria-label="Primary" className="hidden sm:flex gap-4 items-center text-sm">
            <Link href="/catalog" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-1 py-1">
              Catalog
            </Link>
            <Link href="/dashboard" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-1 py-1">
              Dashboard
            </Link>
            <Link href="/profile" className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-1 py-1">
              Profile
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/catalog" className="btn-outline">
            Browse Courses
          </Link>
          <Link href="/dashboard" className="btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
