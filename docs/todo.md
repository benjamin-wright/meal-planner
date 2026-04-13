# TODO

Active implementation plan for the meal-planner project.

---

## Backlog

### Remove Legacy MUI Dependency

Replace remaining MUI theming and component overrides with plain CSS and CSS custom properties, then remove `@mui/icons-material` from `package.json`.

### Remove Legacy FormProvider

The `FormProvider` (`src/ui/providers/forms/`) is superseded by the `useSavedState`/`useIdCache` pattern in entity hooks. Remove the provider, its context, and the `useForms` hook. Verify no remaining consumers.

### Shopping Item Model

#### Tasks

- [ ] Remove `unitType` from `ShoppingItem` and make `unit` non-optional, since unit models have been unified

### Clean Up Dead Code in Shopping Service

`src/services/shopping.ts` imports `SettingsStore`, `IngredientStore`, `ReadyMealStore`, and `MealRecipieType` which do not exist in the current persistence interfaces. Audit and align with the actual interface contracts.

### Add Missing Model Validation

Add `validate()` functions to models that currently lack them: `items`, `recipies`, `extras`.

### Deduplicate Category Types

`src/models/categories.ts` defines both `CategoryProps` (interface) and `Category` (type) with identical shapes. Consolidate to `Category` only, update `CategoryStore.put()` signature.

### Units — E2E Test Coverage

#### Tasks

- [ ] Validation errors when creating/editing units
- [ ] Validation errors when creating/editing magnitudes
- [ ] Preventing navigation with unsaved changes

### Optimistic Mutation Error Recovery

Collection hooks (`useUnits`, `useItems`, `useCategories`) apply mutations optimistically via `ActionQueue`. Add failure detection and local-state refresh to correct drift when a DB write fails.
