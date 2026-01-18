import React from 'react';
import { getCertificates } from '@/lib/certificates';
import CertificateCard from '@/components/CertificateCard';

type Certificate = {
  id: string;
  name: string;
  courseTitle: string;
  issuedAt: string;
};

export default function ProfilePage() {
  // getCertificates reads localStorage (client only). Guard for SSR.
  const certs: Certificate[] = typeof window !== 'undefined' ? (getCertificates() as Certificate[]) : [];

  return (
    <section>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">My Certificates</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {certs.length === 0 ? (
          <div className="col-span-full p-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-lg text-gray-700">No certificates yet — complete a course to earn one.</p>
            <a href="/catalog" className="text-red-600 hover:underline mt-4 inline-block focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-1 py-1">
              Browse Courses →
            </a>
          </div>
        ) : (
          certs.map((c: Certificate) => <CertificateCard key={c.id} cert={c} />)
        )}
      </div>
    </section>
  );
}
