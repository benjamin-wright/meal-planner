---
applyTo: "e2e/**"
---

## Structure

- Tests live in `e2e/*.spec.ts`, one file per feature area.
- Locators and actions live in page objects under `e2e/pages/`. Tests must not contain raw locators — use the page object.
- Shared utilities live in `e2e/utils/`.

## Target

Mobile Chrome only: **393×659 viewport, touch enabled, dark colour scheme**. This matches the app's mobile-only constraint. Do not add desktop or other browser targets.

## Style

Tests read like user stories — describe user actions, not implementation details. Prefer `page.getByRole` and `page.getByLabel` locators over CSS selectors or test IDs.

## Commands

```
npm run test:e2e          # headless
npm run test:e2e:ui       # interactive UI
npm run test:e2e:debug    # debug mode
```

Before writing a new spec, check whether an existing page object in `e2e/pages/` covers the feature. Extend it rather than duplicating locators.
