---
applyTo: "src/ui/components/**"
---

Reusable components are **pure presentation**. They must not:

- Call custom hooks (beyond built-in React hooks like `useState`, `useRef`)
- Import from providers, services, or persistence
- Contain business logic

Organise by role: `containers/`, `inputs/`, `layout/`, `icons/`.

Every component should have a companion Storybook story, particularly those with multiple visual states or animations.

**Styling:** use CSS custom properties from `public/styles/variables.css`. Do not introduce new MUI usage — MUI is legacy and being removed.

Check sibling components in the same subdirectory before introducing a new pattern.
