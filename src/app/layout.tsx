import '@/styles/globals.css';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body className="flex flex-col min-h-screen bg-white">
        <Header />
        <main id="main" className="flex-1 max-w-6xl mx-auto px-4 w-full py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
