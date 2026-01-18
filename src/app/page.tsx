import React from 'react';
import { getCertificates } from '@/lib/certificates';
import CertificateCard from '@/components/Certificate';

export default function ProfilePage() {
  const certs = getCertificates();

  return (
    <section>
      <h1 className="text-2xl font-semibold">My Profile</h1>

      <div className="mt-6">
        <h2 className="text-lg font-medium">Certificates</h2>
        <div className="mt-4 grid md:grid-cols-3 gap-4">
          {certs.length === 0 ? (
            <div className="p-6 bg-white rounded shadow">
              <p>No certificates yet — complete a course to earn one.</p>
            </div>
          ) : (
            certs.map((c) => <CertificateCard key={c.id} cert={c} />)
          )}
        </div>
      </div>
    </section>
  );
}
