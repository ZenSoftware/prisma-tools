# Gap Analysis

> Comparing the **current implementation** (`packages/admin`) with the **desired vision** (copy-pastable Shadcn/Tailwind components running in React Server Components with direct Prisma access).

| Category | Current State | Target State | Gap |
|----------|---------------|--------------|-----|
| **Data Layer** | Apollo Client → GraphQL CRUD API | Direct `PrismaClient` calls inside **Server Actions / RSC** (optional GraphQL adapter) | Remove GraphQL dependency; expose typed server helpers |
| **Rendering Model** | 100 % Client-Side React | Hybrid: RSC for data fetching & serialization, thin client wrappers for interactivity | Re-architect components to support async/`use` calls; strip browser-only code |
| **Component Delivery** | Packaged NPM component library; runtime schema introspection | **Copy-paste source** via CLI (`pnpm pal admin scaffold`) with full Tailwind/Shadcn markup | Build code-gen pipeline; no runtime `GET_SCHEMA` |
| **Design System** | Tailwind + Headless UI (custom) | Tailwind **Shadcn/UI tokens** (radix primitives) | Restyle existing components or rebuild via Shadcn recipes |
| **Type Safety** | Dynamic `any` models; field flags in JSON | **Static Types** derived from `prisma/schema.prisma` (via zod & TS types) | Add code-gen step to emit `<Model>TableProps` etc. |
| **Auth / RBAC** | Not addressed (delegated to backend) | Optional wrapper hooks (`useCurrentUser()`) and row-level guards | Provide extension points; leave implementation to host app |
| **Extensibility** | `formInputs`, `tableColumns` overrides via context | Component-level override slots + hook-based data transforms | Redesign API surface |
| **Bundle Size** | All features shipped even if unused | Tree-shakable; dev copies only required components | Export per-component modules |
| **Testing** | Unit tests with Jest on runtime logic | Unit + generated type tests; play-ground storybook | Expand coverage |

### Key Workstreams

1. **Data-layer rewrite** – Replace GraphQL queries/mutations with server-action helpers (`/lib/prisma`) returning serialisable DTOs.
2. **Static code-gen** – Parse Prisma schema → emit `model-table.tsx`, `model-form.tsx` using templates (like shadcn’s CLI).
3. **UI restyle** – Adopt Shadcn primitive components: `Button`, `Dialog`, `DataTable`, `FormField`.
4. **RSC compliance** – Ensure no browser APIs used in server components; move interactive pieces behind `"use client"`.
5. **Optional plugin layer** – GraphQL adapter that re-exposes the generated actions via Nexus/Envelop for legacy users.

These gaps and workstreams feed directly into the rewrite roadmap. 