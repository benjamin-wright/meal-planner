# Refactoring Plan for settings.tsx

## 1. Remove Material-UI dependencies
- Replace all `@mui/material` and `@mui/icons-material` components with semantic HTML and custom components. The following custom components are necessary:
	- `Button`: Replace with a custom `<Button>` component or semantic `<button>` element styled via CSS.
	- `Stack`: Replace with a custom `Stack` or use CSS flexbox utilities for layout.
	- `Dialog`, `DialogTitle`, `DialogContent`: Create a custom `Dialog` component using the native `<dialog>` element or a semantic modal pattern, with accessible title/content structure.
	- `Accordion`, `AccordionSummary`, `AccordionDetails`: Create a custom `Accordion` component using `<details>` and `<summary>` or a custom implementation for collapsible sections.
	- `Typography`: Replace with semantic HTML tags (`<h1>`, `<h2>`, `<p>`, etc.) and CSS classes for styling.
	- `ExpandMore` icon: Replace with an inline SVG or a custom icon component for expand/collapse indication.
- Ensure all styles for these components are migrated to CSS modules or local CSS files for maintainability.

## 2. Use semantic HTML and native elements
- Refactor UI to use semantic tags (e.g., <section>, <header>, <main>, <form>, <button>, <dialog>, <details>, <summary>, etc.)
- Replace non-semantic wrappers with appropriate HTML5 elements.

## 3. Accessibility improvements
- Add appropriate `aria-*` attributes to interactive and significant elements.
- Ensure dialogs, accordions, and forms are accessible (focus management, keyboard navigation, etc.).

## 4. Add test IDs for Playwright
- Add `data-testid` attributes to key elements and controls for reliable Playwright testing.

## 5. Component structure and organization
- Move each logical/visual component into its own folder under `components/` with `.tsx` and `.css` files.
- For example: `CheckDialog`, `DescriptionButton`, `SelectID`, etc.
- Ensure imports are updated to reflect new locations.

## 6. Storybook for complex components
- For visually or logically complex components (e.g., dialogs, accordions), create corresponding `.stories.tsx` files for Storybook.

## 7. Remove unused code and props
- Remove any props, state, or logic that is no longer needed after refactoring.
- Clean up legacy code and comments.

## 8. Manual and automated testing
- Verify all functionality manually after refactor.
- Ensure Playwright and unit tests pass.
- Update or add new tests as needed for refactored components.

## 9. Documentation
- Update README and any relevant docs to reflect changes in usage, structure, and dependencies.

---

Refer to [docs/RefactoringRules.md](../../../docs/RefactoringRules.md) for further details and priorities.
