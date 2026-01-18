import React from 'react';

export type Certificate = {
  id: string;
  name: string;
  courseTitle: string;
  issuedAt: string;
};

export default function CertificateCard({ cert }: { cert: Certificate }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-semibold">{cert.courseTitle}</h3>
      <p className="text-sm text-gray-600">{cert.name}</p>
      <p className="text-xs text-gray-500">Issued: {new Date(cert.issuedAt).toLocaleDateString()}</p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={() => {
            // Placeholder: in a full implementation this will re-generate the PNG and trigger download
            window.alert('Download flow (implement): generate PNG and download');
          }}
          className="btn-primary"
          aria-label={`Download certificate for ${cert.courseTitle}`}
        >
          Download
        </button>
      </div>
    </div>
  );
}