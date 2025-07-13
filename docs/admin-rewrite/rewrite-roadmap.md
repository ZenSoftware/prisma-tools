# Rewrite Roadmap

> **Objective:** Deliver a *copy-pastable* set of Shadcn/Tailwind React components + code-gen CLI that lets developers embed a full-featured Prisma Admin UI directly in their dashboards—with no GraphQL requirement—by **Q4 2025**.

---

## Phase 0 – Project Bootstrap (Week 0-1)

1. **Create new package** `@paljs/admin-rsc` in monorepo.
2. Set up Vite + Next.js example workspace for rapid iteration.
3. Integrate Shadcn/UI generator & Tailwind config baseline.
4. Scaffold Jest + Playwright + Storybook.

## Phase 1 – Data Access Layer (Week 1-3)

| Task | Owner | Notes |
|------|-------|-------|
| Build `/lib/db.ts` singleton PrismaClient with edge-safe pooling | @core | RSC safe (no global for edge) |
| Implement *server actions* helpers: `list<Model>()`, `create<Model>()`, etc. | @core | Returns serialisable DTOs |
| Generate Zod schemas from Prisma via `prisma-zod-generator` | @codegen | Used for server validation and client TS types |

## Phase 2 – Core Components v1 (Week 3-6)

1. **DataTable** (RSC wrapper + `"use client"` interactive head).
   * Features: pagination, column sorting, filters.
2. **ModelForm** – Generated form per model (create/update modes).
3. **RelationField** component for nested lists / connects.
4. **Modal / Dialog** wrapper.

Deliverables: `users-table.tsx`, `users-form.tsx` generated in example app.

## Phase 3 – Code-Gen CLI (Week 6-8)

1. Extend `@paljs/cli` ⇒ new command `pal admin scaffold`.
2. Inputs: `schema.prisma` path, output dir.
3. Outputs:
   * `components/<model>-table.tsx`
   * `components/<model>-form.tsx`
   * `routes/dashboard/<model>/page.tsx` (optional Next.js pages)
4. Write template files using EJS or Handlebars.

## Phase 4 – Styling & UX Polish (Week 8-10)

* Replace bespoke Tailwind classes with Shadcn variants.
* Add dark-mode support.
* Ensure a11y via Radix primitives.
* Polish mobile responsiveness.

## Phase 5 – Optional GraphQL Adapter (Week 10-12)

* Provide Nexus generator that wraps server actions into CRUD GraphQL operations.
* Publish as `@paljs/admin-graphql-adapter`.

## Phase 6 – Docs, Examples & Migration Guide (Week 12-14)

| Doc | Location |
|-----|----------|
| Quick Start | `README.md` + docs site |
| Conceptual Guides | `docs/admin-rewrite/*` |
| `v2` Migration | `MIGRATE_V2.md` |
| Live Demos | Vercel deploy links |

## Phase 7 – Beta & Feedback (Week 14-16)

1. Publish **beta** versions on npm under `next` tag.
2. Announce & collect feedback (GitHub Discussions, Twitter).
3. Fix critical issues.

## Phase 8 – Stable v2 Release (Week 17)

* Cut stable version `@paljs/admin@2.0.0`.
* Deprecate `v1` in README; maintain security patches only.

---

### Success Metrics

* < 5 min to scaffold & view first table from fresh Next.js project.
* Bundle size ≤ 40 kB gzip per model (client components only).
* 90 %+ unit test coverage on shared utilities.
* Positive feedback from first 5 pilot projects.

### Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Prisma Client not yet RSC-friendly on edge runtimes | Medium | Begin with Node runtime; monitor official Prisma edge roadmap |
| Shadcn API surface changes | Low | Pin commit hash in generator; provide upgrade script |
| Code-gen complexity for exotic Prisma schemas | High | Start with 80 % coverage; allow manual overrides; add e2e tests with sample schemas |

---

> **Next Action**: Kick-off Phase 0 – create new package & CI pipeline. 