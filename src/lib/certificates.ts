// https://github.com/365Evergreen/Hired-LMS-MVP/blob/main/src/lib/certificates.ts
import { toPng } from 'html-to-image';

const CERT_KEY = 'hr_certificates';

export async function getCertificatePNGDataUrl({
  name,
  courseTitle,
}: {
  name: string;
  courseTitle: string;
}) {
  // Try to find a preview element; if none exists, create a temporary node and render to PNG.
  const node = typeof document !== 'undefined' ? document.getElementById('certificate-preview') : null;
  if (!node && typeof document !== 'undefined') {
    const temp = document.createElement('div');
    temp.style.width = '1200px';
    temp.style.height = '675px';
    temp.style.padding = '40px';
    temp.style.display = 'flex';
    temp.style.flexDirection = 'column';
    temp.style.justifyContent = 'center';
    temp.style.alignItems = 'center';
    temp.style.background = '#fff';
    temp.innerHTML = `<div style="font-size:24px;font-weight:700">${courseTitle}</div><div style="margin-top:16px">${name}</div>`;
    document.body.appendChild(temp);
    try {
      const dataUrl = await toPng(temp);
      document.body.removeChild(temp);
      return dataUrl;
    } catch (err) {
      document.body.removeChild(temp);
      throw err;
    }
  }
  if (!node) {
    throw new Error('No certificate node available to render');
  }
  return toPng(node);
}

export function saveCertificate(payload: { id?: string; name: string; courseTitle: string }) {
  const certs = getCertificates();
  const id = payload.id || `${Date.now()}`;
  certs.push({ id, ...payload, issuedAt: new Date().toISOString() });
  try {
    localStorage.setItem(CERT_KEY, JSON.stringify(certs));
  } catch {
    // ignore storage errors in restricted environments
  }
}

export function getCertificates() {
  try {
    return JSON.parse(localStorage.getItem(CERT_KEY) || '[]');
  } catch {
    return [];
  }
}
