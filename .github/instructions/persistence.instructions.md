---
applyTo: "src/persistence/**"
---

## Interfaces (`src/persistence/interfaces/`)

- Import model types only — nothing from `IndexedDB/`.
- Define store contracts with the common shape: `get(id)`, `getAll()`, `add(…) → Promise<number>`, `put(value)`, `delete(id)`, `clear()`.
- No file outside `src/persistence/IndexedDB/` may import from `src/persistence/IndexedDB/`.

## IndexedDB implementations (`src/persistence/IndexedDB/`)

- Implement the interfaces from `src/persistence/interfaces/`.
- Use the `TypedDB` wrapper — do not touch raw `IDBDatabase` transactions directly.
- Store flat, typed values (strings, numbers, booleans). No JSON blob columns.
- Schema changes go through the versioned `migrations[]` array in `db.ts` — never mutate an existing migration.

## What to read before editing

Read the relevant interface in `src/persistence/interfaces/` before touching any IndexedDB implementation. The interface is the contract; the implementation must not widen or narrow it.
