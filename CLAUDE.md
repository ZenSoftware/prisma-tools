# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Available Slash Commands

- `/admin-architecture` - Loads comprehensive admin tool architecture documentation from `examples/admin-nextjs15/docs/architecture/`

## Project Overview

PalJS is a comprehensive toolkit for building NodeJS, Prisma, GraphQL, and React applications. It's organized as a monorepo using pnpm workspaces, providing code generation, admin interfaces, query optimization, and project scaffolding tools.

## Commands

### Development Commands

```bash
# Install dependencies (using pnpm)
pnpm install

# Add new packages (use pnpm add, not npm or yarn)
pnpm add [package-name]
pnpm add -D [dev-package-name]

# Add packages to specific workspace
pnpm add [package-name] --filter @paljs/[workspace-name]

# Build all packages in dependency order
pnpm build

# Run tests with coverage
pnpm test

# Lint code (must pass with 0 warnings)
pnpm lint

# Format code
pnpm format

# Check formatting (used in CI)
pnpm format:ci

# Generate documentation
pnpm docs:gen
```

### Package-Specific Build

Individual packages can be built using:
```bash
pnpm run --filter @paljs/[package-name] build
```

### Testing

- Run all tests: `pnpm test`
- Tests use Jest with TypeScript support
- Test files follow the pattern `*.test.ts`
- Snapshots are used extensively for generator output validation

## Code Architecture

### Monorepo Structure

The project uses pnpm workspaces with packages in `/packages` directory:

1. **Core Development Tools**
   - `cli` - Command-line interface for project management
   - `generator` - Code generation engine for GraphQL schemas, resolvers, and types
   - `create` - Project scaffolding with templates

2. **GraphQL Integration**
   - `nexus` - Nexus plugin for Prisma integration
   - `plugins` - GraphQL plugins for query optimization and SDL generation

3. **UI Components**
   - `admin` - React admin UI components with Tailwind CSS

4. **Schema & Utilities**
   - `schema` - Prisma schema manipulation and TypeScript generation
   - `utils` - Common utilities for DMMF processing
   - `types` - TypeScript type definitions
   - `display` - Styled console output utilities

### Key Architectural Patterns

1. **Generator Architecture** (`packages/generator`)
   - Separate generators for Nexus, SDL, GraphQL Modules, and Admin
   - Template-based code generation using TypeScript template literals
   - DMMF (Data Model Meta Format) processing for Prisma schema analysis

2. **Plugin System** (`packages/plugins`)
   - Field selection optimization for GraphQL queries
   - SDL input generation
   - Extensible plugin architecture

3. **CLI Architecture** (`packages/cli`)
   - Command pattern with separate files for each command
   - Configuration file support (`pal.config.js`)
   - Integration with all generator types

4. **Admin UI** (`packages/admin`)
   - React components with TypeScript
   - Tailwind CSS for styling
   - GraphQL integration for CRUD operations
   - Form generation based on Prisma schema
   - Use `npx shadcn add [component-name]` to add shadcn components

### Build Configuration

- TypeScript configurations:
  - `tsconfig.json` - Base configuration
  - `tsconfig.build.bundle.json` - Bundle builds
  - `tsconfig.build.regular.json` - Regular builds
  - Individual `tsconfig.build.json` in each package

- Each package has its own build process defined in `package.json`
- Build order is managed through pnpm workspace dependencies

### Code Style

- ESLint with TypeScript support (`eslint.config.js`)
- Prettier for formatting
- Husky for pre-commit hooks
- Lint-staged for running checks on staged files

### Testing Strategy

- Unit tests for generators with snapshot testing
- Integration tests for CLI commands
- Test utilities in `tests/helpers`
- Mock Prisma schemas in test directories

## Development Workflow

1. Create feature branch from main
2. Make changes in appropriate package(s)
3. Run tests: `pnpm test`
4. Format code: `pnpm format`
5. Ensure linting passes: `pnpm lint`
6. Add changeset if needed (for versioning)
7. Create pull request to main branch

## Important Notes

- Never push directly to main branch
- Fix all lint errors and warnings before committing
- Use snapshot testing for generator output validation
- Maintain backward compatibility in public APIs
- Follow existing code patterns and conventions
- MDC templates in `/mdc-templates` provide AI-compatible instructions for code generation