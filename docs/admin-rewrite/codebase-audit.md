# Codebase Audit: `packages/admin`

> Snapshot: commit on 2025-07-10 (main)

The existing `@paljs/admin` package delivers a **runtime-generated** admin UI powered by React, Apollo GraphQL, and Tailwind/Headless UI. Below is a functional breakdown—useful for gap analysis and planning the rewrite.

---

## 1. High-Level Architecture

```
Browser ──▶ React Components (PrismaTable, Form, EditRecord)
             │
             └──▶ Apollo Client ──▶ GraphQL API (custom resolvers)
```

* **Dynamic Schema Fetch** – `GET_SCHEMA` query retrieves model/field metadata at runtime.
* **Context Provider** – `TableContext` injects schema + settings into all sub-components.

## 2. Major Features

| Area | File(s) | Details |
|------|---------|---------|
| **Data Grid** | `PrismaTable/Table` | Uses TanStack Table. Supports sorting, multi-column filters, pagination (manual). Bulk row selection, custom actions. |
| **Filtering UI** | `Table/Filters.tsx` | Operator-aware inputs; generates Prisma-style `where` filter object. |
| **Form Generation** | `PrismaTable/Form` | Maps Prisma field metadata → React Hook Form inputs (default, enum, date, upload, rich-text, nested object). Create & Update modes, validation errors. |
| **Modal & Edit Pages** | `Modal.tsx`, `EditRecord.tsx` | Create dialogs; separate edit/view page with tabbed relation lists. |
| **Relations Handling** | `dynamicTable.tsx` | `ListConnect` component to connect/disconnect relations; parent/child reference support. |
| **Schema-Aware Column Factory** | `Table/Columns.tsx` | Maps scalar / enum / object / list to column definitions; relation cell links. |
| **Language & I18N** | `PrismaTable/language.ts`, merge with user overrides; RTL support. |
| **Settings Panel** | `Settings/` | UI for per-model permissions & column config (stored client-side). |
| **Permission Flags** | Per field flags (`read`, `update`, `create`, `filter`, `sort`, etc.) drive UI rendering & allowed actions. |

## 3. Configurable Props / Hooks

* `pageSize`, `pageSizeOptions`, `pagesPath` routing helper.
* Custom `formInputs` and `tableColumns` overrides.
* Global `actions` override to force-enable/disable CRUD.

## 4. Tech & Dependencies

* **React 18** (CSR) – no Server Component support.
* **Apollo Client** & generated raw GraphQL documents.
* **@tanstack/react-table** (v8).
* **Headless UI**, **Tailwind CSS**, **Heroicons**.
* **React Hook Form** for forms.

## 5. Pain Points / Observations

1. **GraphQL Hard-dependency** – All data flows through Apollo; cannot use Prisma directly.
2. **Runtime Introspection** – Dynamic schema fetch adds extra network call; hinders tree-shaking & type-safety.
3. **Bundle Size** – Ships all components even if only a subset is used.
4. **Design System** – Tailwind + Headless UI is good, but styling not fully aligned with modern Shadcn tokens.
5. **Server Rendering** – Components assume browser environment (`window.confirm`, `localStorage`, etc.).
6. **Code Complexity** – Generic runtime transformations (e.g., building `where` objects) make code dense and harder to type-check.

---

This audit confirms that the current implementation is **feature-rich** but tightly coupled to GraphQL, client-side rendering, and dynamic introspection—contrary to the new vision of **static, copy-pastable RSC components interacting directly with Prisma Client**. 