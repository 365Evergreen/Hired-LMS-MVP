# HiRed Learning Hub — LMS Platform UI (MVP)

A modern, accessible Learning Management System UI that uses WordPress as the content source for the MVP.

Experience qualities
- Empowering — clear progress, intuitive navigation
- Professional — clean, modern UI
- Accessible — inclusive design; keyboard & screen-reader friendly

Tech (MVP)
- Next.js (App Router) + TypeScript
- Tailwind CSS for styling
- WordPress REST API as content source
- Local persistence (localStorage) for enrollment & progress; optional backend sync later
- html-to-image or html2canvas for certificate PNG export

Quick start
1. Install dependencies
   - npm install
2. Run dev
   - npm run dev
3. Build
   - npm run build
4. Start
   - npm start

MVP routes
- / (landing) — public marketing homepage
- /dashboard — student dashboard (requires auth for real app; demo uses client-side "session")
- /catalog — course catalog (search & filter)
- /course/[slug] — course player (lesson nav, progress)
- /profile — student profile & certificates

Checklist (MVP)
- Landing page with video modal and demo/contact forms
- Dashboard with active/completed courses and certificates
- Catalog with search/filter and enroll button
- Course player with lesson list, completion, and progress tracking
- Enrollment persistence across sessions
- Automatic certificate generation at 100% progress
- Profile page with certificate grid, download & share

Accessibility & Edge Cases
- Empty states: friendly illustrations & CTA
- Search no results: clear messaging & link to browse
- Already enrolled: "Continue Learning" state
- Progress clamped 0–100%
- Certificate only visible on completion
- Download failures show toast + retry

Next steps
- Connect to real WordPress instance and map endpoints
- Implement authentication flow (e.g., JWT or OAuth)
- Persist enrollments to backend (optional)
- Implement certificate signing/ID persistence

License: MIT
