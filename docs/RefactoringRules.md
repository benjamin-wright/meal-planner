# Priorities while refactoring react components

- Remove references to material-ui
- favor correct use of semantic HTML tags and native html elements where possible
- include appropriate aria attributes on all significant elements
- include test ids where it will provide value for playwright testing
- each component lives in its own folder, with .css and .tsx files
- visually or logically complicated components should have their own .stories.tsx storybook file