---
applyTo: "src/models/**"
---

Every model module must export:

- **A primary type** (e.g. `Unit`, `Item`) — the canonical shape used throughout the app.
- **`sanitize(data: unknown): T`** — coerce untrusted input (from IndexedDB, JSON imports) into the type with safe defaults. Called at system boundaries.
- **`validate(model: T): boolean`** — return whether the model is valid for persistence. Used by edit forms to gate submission.
- **`empty(): T`** — optional; provide when edit forms need a blank starting value and the defaults aren't obvious.

**Dependency rule:** models import nothing from the app — only `src/utils/` is permitted.

Never import from `src/persistence/`, `src/services/`, `src/ui/`, or React.
