---
applyTo: "**/*.css"
---

- All colour, shadow, and spacing tokens come from CSS custom properties defined in `public/styles/variables.css`. Do not declare new `--` custom properties outside that file.
- Global resets live in `public/styles/global.css`. Do not duplicate resets in component styles.
- Component styles are co-located `.css` files imported by the component that uses them.
- No new MUI usage. MUI is legacy and being removed. Use plain CSS with custom properties for all new work.
- The app targets mobile only (393×659). Do not add desktop breakpoints.
- Use `prefers-color-scheme` media queries for light/dark variants — the pattern is already established in `variables.css`.
