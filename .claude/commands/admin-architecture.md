# Admin Architecture Documentation

This command loads the comprehensive admin tool architecture documentation for the Prisma Admin rewrite project.

## Architecture Overview

The admin tool is a Next.js 15 application with:
- React Server Components and Server Actions
- Direct Prisma database access (no GraphQL)
- TypeScript with full type safety
- Settings-driven dynamic UI generation
- Tailwind CSS + shadcn/ui components

## Key Files to Read

The architecture documentation is organized into the following files:

1. **Main Index** - `docs/architecture/ADMIN_ARCHITECTURE.md`
   - Overview and quick start guide
   - Documentation structure
   - Key concepts

2. **Core Library** - `docs/architecture/ADMIN_ARCHITECTURE_CORE.md`
   - Type definitions (AdminSettings, AdminModel, AdminField)
   - Settings management functions
   - Schema to settings generator
   - Custom renderer system

3. **CRUD Actions** - `docs/architecture/ADMIN_ARCHITECTURE_ACTIONS_CRUD.md`
   - getModelData() - List with pagination/filtering
   - createModelRecord() - Create from FormData
   - updateModelRecord() - Update existing
   - deleteModelRecord() - Single/bulk delete
   - exportRecords() - CSV/JSON export

4. **Other Actions** - `docs/architecture/ADMIN_ARCHITECTURE_ACTIONS_OTHER.md`
   - Settings persistence actions
   - CSV import functionality
   - Filter helpers
   - Form data preparation

5. **Table Components** - `docs/architecture/ADMIN_ARCHITECTURE_COMPONENTS_TABLE.md`
   - DataTable with sorting, pagination, search
   - Bulk actions (delete, export)
   - Model header actions (create, import/export)

6. **Form Components** - `docs/architecture/ADMIN_ARCHITECTURE_COMPONENTS_FORM.md`
   - FormGenerator - Dynamic form builder
   - FormField - Field type routing
   - RelationSelect/Connect - Relation management
   - JsonEditor, ArrayField - Complex field types

7. **Filter System** - `docs/architecture/ADMIN_ARCHITECTURE_COMPONENTS_FILTERS.md`
   - Filter types and operators
   - FilterPanel - Main UI
   - FilterBuilder - Prisma where clause generation
   - Advanced filtering (relations, JSON)

8. **Advanced Components** - `docs/architecture/ADMIN_ARCHITECTURE_COMPONENTS_ADVANCED.md`
   - RichTextEditor (TipTap)
   - FileUpload interface
   - CSVImport dialog
   - Settings UI components

9. **Pages & Routing** - `docs/architecture/ADMIN_ARCHITECTURE_PAGES.md`
   - Dynamic [model] routes
   - CRUD page implementations
   - Settings pages structure
   - Layout and navigation

## Important Implementation Details

### Settings-Driven Architecture
Everything is configured through `adminSettings.json`:
- Model permissions (create, update, delete)
- Field visibility and permissions
- Display labels and sort order
- Custom renderers

### Generic Implementation
- Single route pattern handles all models: `/admin/[model]`
- Generic CRUD actions work with any Prisma model
- Components are model-agnostic

### Type Safety
- No `any` types in the codebase
- Full TypeScript coverage
- Prisma-generated types used throughout

### Server-First Design
- All data fetching in Server Components
- Mutations via Server Actions
- No client-side state management
- Progressive enhancement

## Current Status
- 95% complete - All core features implemented
- Remaining: i18n support and performance optimizations

## File Locations
- Core library: `src/lib/admin/`
- Server actions: `src/lib/actions/`
- UI components: `src/app/admin/_components/`
- Pages: `src/app/admin/`
- Settings: `adminSettings.json`