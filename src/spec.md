# Specification

## Summary
**Goal:** Build the HOSPO TALENT multi-page marketing site plus a real jobs marketplace with Internet Identity authentication, role-based dashboards, and a Motoko backend supporting jobs, applications, profiles, and settings.

**Planned changes:**
- Add strict brand tokens via CSS variables and apply a premium, neutral-first theme with restrained purple accents, consistent typography, spacing, shadows, and accessible focus/contrast.
- Create a reusable component system (navbar, CTAs, glass cards, feature cards, process timeline tabs, testimonials grid, FAQ accordion, validated form inputs, empty states, loading skeletons).
- Implement client-side routed public marketing pages with per-route metadata: `/`, `/about`, `/employers`, `/candidates`, `/success-stories`, `/faq`, `/contact`, plus Home page sections including the animated UK map hero.
- Build public jobs pages backed by real data: `/jobs` (filters + listing) and `/jobs/:slug` (detail + Apply CTA + JobPosting schema-ready block).
- Integrate Internet Identity auth; create and persist app-level profiles on first login with roles (candidate/employer/admin) and guard/redirect dashboard routes.
- Implement protected dashboard routes/pages (candidate, employer, settings, admin placeholder) with real data flows (CV upload placeholder, job CRUD, applications, status updates).
- Implement a single Motoko actor with typed models and CRUD APIs for Profile, CandidateProfile, EmployerProfile, Job, Application, Settings; enforce constraints (unique slug, unique application per job+candidate, statuses, timestamps) and role/ownership authorization rules.
- Wire all frontend data flows with React Query (loading, empty, error states) and ensure performance/accessibility refinements (lazy media, modern image formats where used, SVG-only animations, keyboard navigation).

**User-visible outcome:** Users can browse polished marketing pages and published jobs, sign in with Internet Identity, apply to jobs as a candidate, and manage jobs/applications via role-based dashboards with real backend data and guarded access.
