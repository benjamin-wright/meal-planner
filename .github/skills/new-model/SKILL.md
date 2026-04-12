---
name: new-model
description: 'Use when adding or creating a new data model, type, or entity to src/models/. Covers: TypeScript type definition, sanitize() function, validate() function, optional empty() factory, persistence interface contract (IStore), IndexedDB implementation, db.ts migration entry, and co-located Vitest unit tests. Also use when asked to add a new store, entity, or data type to the app.'
---

# Skill: New Model

Use this skill when adding a new data model to `src/models/`.

## Before you start

Read `docs/architecture.md` § Component Responsibility Model to confirm where this model fits in the layer stack.

## Step 1 — Create the model file

Create `src/models/<name>.ts`. Structure it in this order:

```ts
// 1. Primary type
export type MyModel = {
  id: number;
  // ... fields
};

// 2. empty() — only if edit forms need a blank starting value
export function empty(): MyModel {
  return { id: 0, /* safe defaults */ };
}

// 3. sanitize() — coerce untrusted data at system boundaries
export function sanitize(data: unknown): MyModel {
  // cast to Record, extract with fallbacks
}

// 4. validate() — gate persistence
export function validate(model: MyModel): boolean {
  // return false if required fields are missing or invalid
}
```

**Dependency rule:** import nothing from the app — only `src/utils/` is permitted.

## Step 2 — Persistence interface

If this model needs storage, create `src/persistence/interfaces/I<Name>Store.ts`:

```ts
import type { MyModel } from "../../models/<name>";

export interface I<Name>Store {
  get(id: number): Promise<MyModel | undefined>;
  getAll(): Promise<MyModel[]>;
  add(value: Omit<MyModel, "id">): Promise<number>;
  put(value: MyModel): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
```

## Step 3 — IndexedDB implementation

Create `src/persistence/IndexedDB/<Name>Store.ts` implementing the interface. Register the object store in `db.ts` via a new migration entry — never modify existing migrations.

## Step 4 — Unit tests

Co-locate `src/models/<name>.test.ts`. Test `sanitize` with unknown/malformed input and `validate` with valid and invalid model values.

## Verify

```
npm run lint
npm run test:unit -- --run
```
