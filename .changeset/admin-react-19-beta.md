---
"@paljs/admin": major
---

Major update: React 19 support and dependency upgrades

- **BREAKING**: Updated React to version 19.1.0
- **BREAKING**: Replaced `react-beautiful-dnd` with `@dnd-kit/sortable` for drag-and-drop functionality
- **BREAKING**: Migrated from `react-table` v7 to `@tanstack/react-table` v8
- Updated Tailwind CSS to version 4.1.11 with new @tailwindcss/cli package
- Improved TypeScript types throughout the package, removing all `any` types
- Added peer dependencies for React 18/19 compatibility
- Added accessibility attributes to drag-and-drop interfaces
- Added error boundaries for better error handling in drag-and-drop operations
- Fixed tsconfig.build.json configuration

This is a beta release for testing React 19 compatibility. Please test thoroughly before using in production.