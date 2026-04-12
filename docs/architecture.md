# Architecture

Technology decisions, system design, and design constraints for meal-planner. For coding conventions, see [standards.md](standards.md). For project overview and quick-start, see the [README](../README.md).

---

## 1. Design Constraints

These are hard, permanent constraints. Every decision below follows from them.

- **Client-only.** No server, no network calls, no accounts. All data lives on the user's device. This is a privacy and simplicity decision, not a temporary limitation.
- **Mobile-only.** The UI is designed and tested for a single mobile viewport (~393×659). Desktop is not a target.
- **Offline-capable PWA.** Because all data is local, the app works without a network connection after the initial install. Service worker uses `autoUpdate` strategy.

---

## 2. Key Technology Decisions

### React + TypeScript

React's component model maps cleanly to the page/view split described below. TypeScript with `strict: true` provides compile-time safety across the data flow from IndexedDB to UI.

### Vite

Fast HMR via SWC, first-class PWA support via `vite-plugin-pwa`, and zero-config Storybook/Vitest integration.

### IndexedDB

The only browser storage API with enough capacity and structure for a full relational data set (units, items, categories, recipes, meals, shopping lists). The app programs against **storage interfaces** (`src/persistence/interfaces/`), not the IndexedDB implementation directly. This decouples all application code from the storage engine — useful for testing and leaves the door open to swap backends without touching services, hooks, or UI.

### React Router

Flat route structure. Each top-level concern (units, categories, items, recipes, settings, etc.) owns a `routes.tsx` that maps paths to page components. All routes are children of a single root route in `src/main.tsx`.

### MUI (legacy — removing)

MUI is used for theming (color schemes, some component overrides). **Do not introduce new MUI usage.** New components should use plain CSS with CSS custom properties from `public/styles/variables.css`. Existing MUI usage will be removed over time.

---

## 3. System Design

### Data Flow

```
IndexedDB
  → persistence interfaces (async, Promise-based)
    → hooks (load data, expose mutators)
      → page components (hooks + navigation + presentation)
```

**Services** (`src/services/`) contain cross-store business logic (e.g. compiling a shopping list from meals + recipes + extras). Services accept store interfaces as parameters — they never import implementations.

### Component Responsibility Model

| Layer | Knows about | Does not know about |
|---|---|---|
| **Models** (`src/models/`) | Own data shape, validation, sanitization | Storage, UI, React |
| **Persistence interfaces** (`src/persistence/interfaces/`) | Model types | IndexedDB, UI, React |
| **IndexedDB implementations** (`src/persistence/IndexedDB/`) | Interfaces, `TypedDB` wrapper | UI, React |
| **Services** (`src/services/`) | Models, persistence interfaces | IndexedDB, UI, React |
| **Hooks** (`src/ui/hooks/`) | Models, persistence interfaces (via `DBContext`) | IndexedDB implementations, page components |
| **Pages** (`src/ui/pages/*/`) | Hooks, navigation, reusable components | IndexedDB, persistence details |
| **Reusable components** (`src/ui/components/`) | Own props | Everything above |

Dependencies flow **downward only**. A lower layer never imports from a higher one.

### Page Components

Each page component (`<name>.tsx`) combines data loading and presentation in one file:

- Hooks and navigation at the top.
- JSX returned directly — no intermediate view component.
- May hold local UI state (dialog open/closed, toggle states).
- Must not contain business logic — delegate to hooks and services.
- Complex UI sections are extracted into sub-components in a `components/` subdirectory.

### Hook Patterns

There are two distinct hook shapes:

**Collection hooks** (`useUnits`, `useItems`, `useCategories`): fetch a list on mount, return the list plus optimistic mutators. Mutations update local state immediately and enqueue the DB write via `ActionQueue`. The UI is always ahead of the database — a failed write means temporary drift (with planned future work to detect and correct this).

**Entity hooks** (`useItem`, `useRecipe`): load or create a single entity for an edit form. Hooks whose edit pages support **cross-page navigation** (e.g. "go create a new category, then come back") use `useSavedState` to persist the draft to `localStorage` and `useIdCache` to receive one-shot data (like the ID of the just-created category). Hooks at the bottom of the model hierarchy (`useUnit`, `useCategory`) use plain `useState` because their edit pages have no dependent-type creation flows.

### Persistence Layer

All store interfaces follow a common shape: `get(id)`, `getAll()`, `add(…) → id`, `put(value)`, `delete(id)`, `clear()`. The IndexedDB implementation uses `TypedDB` — a thin typed wrapper around raw `IDBDatabase` transactions — and a versioned migration system (`migrations[]` in `db.ts`).

**Storage rule:** persist flat, typed values (strings, numbers, booleans). No JSON blob columns.

### Providers

- **`DBProvider`** — creates the IndexedDB instance, exposes store interfaces via `DBContext`. All hooks access stores through this context.
- **`AlertProvider`** — manages a timed alert queue, rendered as toast-style notifications.
- **`FormProvider`** — (legacy, see `docs/todo.md`) localStorage-backed form stack for cross-page navigation. Being replaced by the `useSavedState`/`useIdCache` pattern in entity hooks.
