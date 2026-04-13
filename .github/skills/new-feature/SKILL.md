---
name: new-feature
description: 'Use when implementing, building, or adding any user-facing feature end-to-end. Covers the full layer stack: TypeScript model (sanitize, validate), IndexedDB persistence interface, IndexedDB implementation, migration, service, React hook, React page component, Vitest unit tests, Playwright E2E tests. Enforces layer-by-layer lint discipline and the project Definition of Done. Also use when asked to complete a task from docs/todo.md or when unsure what order to implement layers in.'
---

# Skill: New Feature

Use this skill when implementing any user-facing feature from `docs/todo.md`.

## Before you start

1. Read `docs/todo.md` — confirm the task is the next planned item and understand its scope.
2. Read `docs/standards.md` — review the Definition of Done.
3. If this touches persistence or introduces a new model, read `docs/architecture.md` § System Design.

## Implementation order

Work down the layer stack. Do not skip ahead to UI until the layers below are solid.

1. **Model** (`src/models/`) — define or update the type; ensure `sanitize`, `validate`, and (if needed) `empty` are exported.
2. **Persistence interface** (`src/persistence/interfaces/`) — add or update the store contract if the model is new.
3. **IndexedDB implementation** (`src/persistence/IndexedDB/`) — implement the interface; add a migration if the schema changes.
4. **Service** (`src/services/`) — add cross-store business logic only if required; accept interfaces as parameters.
5. **Hook** (`src/ui/hooks/`) — load data and expose mutators; access stores via `DBContext`.
6. **Page / Component** (`src/ui/pages/` or `src/ui/components/`) — pure presentation and navigation; delegate all logic to the hook.

## After each layer

Run `npm run lint` and fix any errors before moving to the next layer. Catching issues layer-by-layer is faster than debugging a fully-assembled stack.

## Verify

After all layers are implemented:

```
npm run lint
npm run build
npm run test:unit -- --run
npm run test:e2e
```

All four must pass cleanly.

## Definition of Done

1. Implementation follows `docs/standards.md` and `docs/architecture.md`.
2. New models export `sanitize()` and `validate()`.
3. Unit tests cover new model/utility logic.
4. E2E tests cover new or changed user-facing workflows.
5. `npm run lint` and `npm run build` pass cleanly.
6. `docs/todo.md` is updated — completed task removed, durable decisions migrated to `architecture.md` or `standards.md` as appropriate.
