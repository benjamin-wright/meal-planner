# Project Guidelines

## Documentation Map

- [README.md](../README.md) — project overview and quick orientation. Begin here.
- [docs/architecture.md](../docs/architecture.md) — technology decisions, system design, and design constraints. Read before making design-level changes.
- [docs/standards.md](../docs/standards.md) — coding conventions, testing strategy, and project-wide rules. Read before writing or reviewing code.
- [docs/contributions.md](../docs/contributions.md) — development setup, npm scripts, and project layout. Read before making changes.
- [docs/todo.md](../docs/todo.md) — the active implementation plan. All planned work lives here. Read before starting any implementation task.

## Navigation

- Data model types live under `src/models/`.
- Storage interfaces live under `src/persistence/interfaces/`; IndexedDB implementations live under `src/persistence/IndexedDB/`.
- Business logic lives under `src/services/`.
- UI pages (one directory per concern) live under `src/ui/pages/`.
- Reusable components live under `src/ui/components/`.
- React context providers live under `src/ui/providers/`.
- Custom hooks live under `src/ui/hooks/`.
- End-to-end tests live under `e2e/`; page objects live under `e2e/pages/`.

## Agent Posture

**Gather context freely. Reason proactively. Decide nothing without approval.**

- Read broadly — search the codebase, read documentation, run tests. Never guess when you can look.
- When you identify multiple valid approaches, present them with trade-offs and a recommendation. Do not pick one silently.
- Question directives that conflict with existing code, standards, or architecture — cite the specific conflict and ask for resolution.
- Never make design decisions, deviate from `docs/todo.md`, or take irreversible actions without explicit approval.

## Build & Validate Commands

| Command | Purpose |
|---|---|
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run test:unit -- --run` | Vitest unit tests (co-located `*.test.ts`) |
| `npm run test:e2e` | Playwright E2E tests (mobile Chrome, 393×659) |
| `npm run build` | tsc + vite production build |
| `npm run dev` | Vite dev server at `http://localhost:5173` |
| `npm run storybook` | Storybook dev server on port 6006 |

Node version: see `.nvmrc`. Run `npm ci` before any build or test step in a fresh environment.

## Tool Usage

Use the right tool for the job — do not grep source files or `node_modules` to discover API syntax or configuration options.

| Need | Use |
|---|---|
| API syntax, config options, library behaviour | `context7` — fetch current docs for the library |
| Exact string in project files | `grep_search` |
| File by name or path pattern | `file_search` |
| Conceptual search across codebase | `semantic_search` |
| Understanding a file | `read_file` (large range, not grep) |
| Running build/test/lint | `run_in_terminal` |

When a library question comes up mid-task (e.g. correct Playwright locator syntax, Vitest mock API, React Router hook arguments), call `context7` before writing code. Grepping `node_modules` reveals implementation details, not public API guarantees, and wastes context on noise.

## Context Before Action

Before changing code, read the relevant sources.

| Change type | Required reading |
|---|---|
| Any implementation | `docs/todo.md`, `docs/standards.md` |
| Design or structural | `docs/architecture.md` |
| Build, setup, or workflow | `docs/contributions.md` |
| Persistence layer | `src/persistence/interfaces/` for the relevant interface |
| UI page or component | `src/ui/pages/<name>/` or `src/ui/components/<name>/` for sibling patterns |
