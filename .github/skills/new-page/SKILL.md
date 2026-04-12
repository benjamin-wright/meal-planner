---
name: new-page
description: 'Use when adding or creating a new page, route, or screen to the app. Covers: page directory structure, co-located CSS, React component authoring (useParams, useNavigate, useSearchParams), custom React hook creation, React Router route registration in routes.tsx, E2E page object in e2e/pages/, and Playwright spec. Also use when asked to add a new view, screen, section, or navigation destination.'
---

# Skill: New Page

Use this skill when adding a new top-level page to the app.

## Before you start

1. Read `docs/architecture.md` § Page Components and § Hook Patterns.
2. Check an existing page (e.g. `src/ui/pages/items/`) for the established structure before creating anything new.

## Step 1 — Create the page directory

```
src/ui/pages/<name>/
  <name>.tsx       # page component
  <name>.css       # co-located styles (omit if not needed)
  components/      # sub-components used only by this page (create when needed)
```

## Step 2 — Create the hook (if needed)

If the page loads data from IndexedDB, create `src/ui/hooks/use<Name>.ts`.

- Access stores via `DBContext` — never import from `src/persistence/IndexedDB/` directly.
- Return the data and any mutators the page needs.
- Collection hooks: fetch on mount, return list + optimistic mutators via `ActionQueue`.
- Entity hooks (edit forms): load or initialise a single entity; use `useSavedState` if the page supports cross-page navigation.

## Step 3 — Write the page component

Structure in this order:

1. Route params and query strings (`useParams`, `useSearchParams`).
2. Hook calls to load data.
3. Navigation setup (`useNavigate`).
4. Local UI state (`useState` for dialogs, toggles).
5. JSX returned directly — no intermediate view component.

The page must not contain business logic — delegate to hooks and services.

## Step 4 — Register the route

Add the route to the relevant `routes.tsx` for this concern. All routes are children of the root route in `src/main.tsx`. Check the existing route files before adding a new one to the wrong place.

## Step 5 — E2E page object

Create `e2e/pages/<name>.ts` with locators and actions for the new page. Then add or extend the spec in `e2e/<name>.spec.ts`. Tests must use the page object — no raw locators in specs.

## Verify

```
npm run lint
npm run build
npm run test:e2e
```
