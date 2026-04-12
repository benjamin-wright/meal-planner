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

## Context Before Action

Before changing code, read the relevant sources.

| Change type | Required reading |
|---|---|
| Any implementation | `docs/todo.md`, `docs/standards.md` |
| Design or structural | `docs/architecture.md` |
| Build, setup, or workflow | `docs/contributions.md` |
| Persistence layer | `src/persistence/interfaces/` for the relevant interface |
| UI page or component | `src/ui/pages/<name>/` or `src/ui/components/<name>/` for sibling patterns |
