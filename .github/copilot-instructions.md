# HiRed LMS MVP — AI Coding Agent Instructions

## Project Overview
**HiRed Learning Hub** is a modern Learning Management System UI built with Next.js 16 (App Router) + TypeScript. The MVP uses WordPress REST API as the content source and localStorage for client-side persistence of enrollments and progress.

**Key purpose:** Provide an accessible, empowering learning experience with course enrollment, lesson progress tracking, and automatic certificate generation at 100% completion.

---

## Architecture & Data Flows

### Component Hierarchy
```
src/app/layout.tsx (root layout, imports global styles)
├── Header (navigation, skip-to-content for a11y)
├── Routes:
│   ├── / (landing page)
│   ├── /catalogue (course catalogue)
│   ├── /course/[slug] (course player with lessons)
│   ├── /dashboard (enrolled courses + progress)
│   └── /profile (certificates grid)
└── Footer
```

### Local Persistence Model
All user data is stored in **localStorage** with versioned keys:
- `hr_progress_v1`: Lesson completion per course → `{ [courseId]: { completedLessons: string[] } }`
- `hr_certificates`: Array of issued certificates → `{ id, name, courseTitle, issuedAt }`
- Enrollment state (if needed): Store with similar pattern

**Pattern:** Use `typeof window !== 'undefined'` to guard localStorage access in SSR contexts (see `src/app/profile/page.tsx` line 10).

### State Library Functions (src/lib/)
- **`progress.ts`**: `markLessonComplete(courseId, lessonId)`, `getProgress(courseId, totalLessons)` → returns clamped 0–100%
- **`certificates.ts`**: `getCertificatePNGDataUrl({name, courseTitle})` (uses html-to-image), `saveCertificate(payload)`, `getCertificates()`
- **`enrollment.ts`**: (stub) Reserve for enroll/unenroll logic
- **`wp-client.ts`**: (stub) Reserve for WordPress REST client methods

---

## Critical Developer Workflows

### Build & Start
```bash
npm install           # Install deps (includes @tailwindcss/postcss v4)
npm run dev           # Start dev server on http://localhost:3000 (Turbopack)
npm run build         # Production build (Next.js 16 with Turbopack)
npm start             # Run production build locally
```

**Known issues resolved:**
- Removed deprecated `experimental.appDir` from `next.config.js` (default in Next.js 13+)
- Tailwind CSS v4 requires `@import "tailwindcss"` (not old `@tailwind` directives)
- PostCSS config uses `@tailwindcss/postcss` plugin (not `tailwindcss` directly)
- Path alias `@/` requires `baseUrl` and `paths` in `tsconfig.json`

---

## Project-Specific Conventions

### Styling
- **Tailwind CSS v4** with `@apply` for custom components (`.btn-primary`, `.btn-outline`, `.sr-only`)
- No CSS modules; all styles in `src/styles/globals.css` or inline Tailwind classes
- Use `@apply` to compose reusable utility classes (e.g., `@apply inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md`)

### Accessibility (A11y)
- **Skip-to-content link** in Header (`.sr-only focus:not-sr-only`)
- **Focus rings:** `focus:outline-none focus:ring-2 focus:ring-blue-500` (consistent across buttons/links)
- **ARIA labels:** `aria-label="Primary"` for navigation
- **Semantic HTML:** Use `<header>`, `<nav>`, `<section>`, `<main id="main">`
- Prefer `Link` from `next/link` for client-side navigation

### TypeScript
- All components are **functional components** (TSX) with default exports
- **Type declarations:** Define inline types or extract to top of file
- Guard SSR: Check `typeof window !== 'undefined'` before accessing localStorage/DOM
- Props are typed; example: `{ children: ReactNode }` in layout

### Naming & File Organization
- Components: `src/components/ComponentName.tsx` (PascalCase)
- Pages: `src/app/[route]/page.tsx` (Next.js App Router convention)
- Utils/state: `src/lib/featureName.ts` (camelCase, no React)
- Styles: `src/styles/globals.css` (single global file)

---

## Integration Points & External Dependencies

### WordPress REST API
- **Currently stubbed** in `src/lib/wp-client.ts`
- Implement methods to fetch: courses, lessons, course metadata
- Plan: Map endpoints to course data structure

### Certificate Generation
- **Library:** `html-to-image` (already installed)
- **Pattern:** `getCertificatePNGDataUrl()` renders a `#certificate-preview` DOM element or creates a temp div
- Falls back to on-demand rendering if preview element missing

### Progress & Enrollment Persistence
- **Current:** Client-side localStorage only (no backend sync)
- **Next step:** Connect to backend API for enrolled courses and progress sync

---

## Key Files & Their Roles
| File | Purpose |
|------|---------|
| `tsconfig.json` | Path aliases (`@/`), TypeScript config |
| `next.config.js` | Next.js config (removed deprecated appDir) |
| `postcss.config.js` | Tailwind v4 with `@tailwindcss/postcss` plugin |
| `tailwind.config.js` | Content paths for template files |
| `src/app/layout.tsx` | Root layout; imports `@/styles/globals.css` |
| `src/styles/globals.css` | Global Tailwind imports + custom `.btn-*` classes |
| `src/lib/*.ts` | State management (progress, certs, enrollment, WP client) |
| `src/components/Header.tsx` | Nav bar + skip-to-content; focus ring patterns |

---

## Common Patterns to Follow

1. **SSR-safe localStorage:** Always check `typeof window !== 'undefined'` before reading state
2. **Client-side state initialization:** Use exported functions from `src/lib/` (not React hooks yet—keep it simple for MVP)
3. **Tailwind utility composition:** Use `.btn-primary`, `.btn-outline` classes; avoid magic spacing/colors
4. **Focus management:** Add `focus:outline-none focus:ring-2 focus:ring-blue-500` to interactive elements
5. **Empty states:** Provide friendly messaging when no data (see certificate/enrollment empty states)

---

## What NOT to Do
- ❌ Don't use `<button className="px-4">` without focus ring styles
- ❌ Don't access localStorage outside `typeof window` guards
- ❌ Don't import old Tailwind directives (`@tailwind`) in new files
- ❌ Don't create new CSS files; keep styles in globals.css or inline
- ❌ Don't commit build artifacts (`.next/`, `node_modules/`)
