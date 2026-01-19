import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default function Header() {
  return (
    <header className="bg-white border-b">
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to content
      </a>

      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-red-500 rounded">
            <Image src="/logo-red.png" alt="HiRed Learning Hub" width={120} height={40} priority />
          </Link>

          <nav aria-label="Primary" className="hidden sm:flex gap-4 items-center text-sm">
            <Link href="/catalogue" className="hover:underline focus:outline-none focus:ring-2 focus:ring-red-300 rounded px-1 py-1">
              Catalogue
            </Link>
            <Link href="/dashboard" className="hover:underline focus:outline-none focus:ring-2 focus:ring-red-300 rounded px-1 py-1">
              Dashboard
            </Link>
            <Link href="/profile" className="hover:underline focus:outline-none focus:ring-2 focus:ring-red-300 rounded px-1 py-1">
              Profile
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/catalogue" className="btn-outline">
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
