# Project Standards

Coding conventions, testing strategy, and project-wide rules. For technology decisions and system design, see [architecture.md](architecture.md). For development setup, see [contributions.md](contributions.md).

---

## Documentation

Each documentation file has a single responsibility. Content must live in exactly one place.

| File | Responsibility |
|------|----------------|
| `README.md` | Project summary and quick orientation. |
| `docs/architecture.md` | Technology decisions, system design, and design constraints. Read before making design-level changes. |
| `docs/standards.md` | Coding conventions, testing strategy, and project-wide rules. Read before writing or reviewing code. |
| `docs/contributions.md` | Development setup, npm scripts, project layout, and workflow. Read before making changes. |
| `docs/todo.md` | Active implementation plan. All planned work lives here. |
| `.github/copilot-instructions.md` | Navigation guide for AI agents. |

---

## General

### Code Clarity

- Name things for what they represent, not how they're used. Prefer descriptive names over short ones.
- Comments explain **why**, not **what**. If code needs a "what" comment, rename or restructure instead.
- No dead code. Remove unused imports, functions, and variables — git history is sufficient.

### TypeScript Conventions

- `strict: true` is enforced. Do not weaken it with `any` or non-null assertions unless truly unavoidable.
- Use `type` for data shapes (models, props, return types). Use `interface` for contracts that an implementation fulfils (store interfaces, context shapes).
- Prefer union types and enums over stringly-typed values.

### Dependency Direction

Dependencies flow downward through the layer stack defined in `architecture.md`. A lower layer never imports from a higher one. Specifically:

- Models import nothing from the app (only `src/utils/`).
- Persistence interfaces import models only.
- Services import models and persistence interfaces only.
- Hooks import models and access persistence interfaces via `DBContext`.
- Pages import hooks and reusable components.

---

## Model Standards

Every model module in `src/models/` must export:

- **A primary type** (e.g. `Unit`, `Item`, `Category`) — the canonical shape used throughout the app.
- **`sanitize(data: unknown): T`** — coerce untrusted data (from IndexedDB, JSON imports, etc.) into the model type with safe defaults. Used at system boundaries.
- **`validate(model: T): boolean`** — return whether the model is valid for persistence. Used by edit forms to gate submission.

**`empty(): T`** is optional — provide it when edit forms need a blank starting value and the defaults aren't obvious.

---

## Component Standards

### Page Components

A page component (`<name>.tsx`) combines data loading and presentation:

1. Reads route params and query strings.
2. Calls hooks to load data and get mutators.
3. Handles navigation (`useNavigate`).
4. Returns JSX directly — no intermediate view component.
5. May hold local UI state (dialog open/closed, toggle states).

Pages must not contain business logic — delegate to hooks and services.

### File Layout

Each page directory follows this structure:

```
<name>/
  <name>.tsx              # page component
  <name>.css              # co-located styles (if needed)
  components/             # sub-components used only by this page
```

### Reusable Components

Components in `src/ui/components/` are pure presentation. They must not depend on hooks, providers, or services. Organise by role: `containers/`, `inputs/`, `layout/`, `icons/`.

### Providers

Each provider lives in its own directory under `src/ui/providers/` and consists of:

- A **context file** defining the context type and `createContext` call.
- A **provider component** that manages state and renders `Context.Provider`.

The `DBProvider` exposes **persistence interfaces only** — never the raw `IDBDatabase` or implementation classes.

---

## Persistence Standards

- Always program against `src/persistence/interfaces/`. No file outside `src/persistence/IndexedDB/` may import from that directory.
- Store interfaces follow a common shape: `get(id)`, `getAll()`, `add(…) → Promise<number>`, `put(value)`, `delete(id)`, `clear()`.
- Store values in flat, typed columns (strings, numbers, booleans). No JSON blob storage.
- Schema changes go through the versioned migration array in `src/persistence/IndexedDB/db.ts`.

---

## Styling

- **CSS custom properties** are defined in `public/styles/variables.css` (colours, glazing, shadows) using `prefers-color-scheme` media queries for light/dark mode.
- **Global resets** live in `public/styles/global.css` (box-sizing, font, margin/padding resets, form defaults).
- **Component styles** are co-located `.css` files imported by the component that uses them.
- **No new MUI usage.** MUI is legacy and being removed. Use plain CSS with custom properties for all new work.

---

## Testing

### Unit Tests (Vitest)

- Co-located as `*.test.ts` beside the module under test.
- Focus on model logic (`sanitize`, `validate`, formatting) and utility functions.
- Run with `npm run test:unit`.

### End-to-End Tests (Playwright)

The primary coverage tool for user-facing behaviour.

- Tests live in `e2e/`, one file per feature area.
- Use the **page object model**: page objects in `e2e/pages/` encapsulate locators and actions. Tests read like user stories.
- Target: mobile Chrome only (393×659 viewport, touch, dark colour scheme) — matching the app's mobile-only constraint.
- Run with `npm run test:e2e`. Use `test:e2e:ui` or `test:e2e:debug` for interactive debugging.

### Storybook

Use Storybook for **reusable components** (`src/ui/components/`) and **page sub-components** (`src/ui/pages/*/components/`) — particularly those with multiple visual states or animations where rapid feedback is valuable.

Stories are **not used** for page components. Pages are covered by e2e tests and ad-hoc manual testing against the dev server.

When writing stories:

- Use `MemoryRouter` as a decorator if the component uses `Link` or route-aware elements.
- Provide realistic mock data that exercises the component's visual states.

### Definition of Done

A task is complete when:

1. Implementation follows the standards in this document and the architecture in `architecture.md`.
2. Models have `sanitize()` and `validate()` functions.
3. Unit tests cover new model/utility logic.
4. E2E tests cover new or changed user-facing workflows.
5. `npm run lint` and `npm run build` pass cleanly.
