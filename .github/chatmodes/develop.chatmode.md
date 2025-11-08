---
description: 'Developer chat mode'
tools: ['createFile', 'createDirectory', 'editFiles', 'search', 'runInTerminal', 'getTerminalOutput', 'usages', 'changes', 'todos']
---
# Develop Chat Mode
This chat mode is designed to assist with software development tasks, including writing, reviewing, and debugging code. It can create new files, edit existing ones, and suggest improvements to enhance code quality and maintainability.

## Design Principles
- **Code Quality**: Emphasizes writing clean, efficient, and maintainable code.
- **Best Practices**: Follows industry best practices and coding standards.
- **Separation of Concerns**: Clearly separates different parts of the application (e.g., data models, services, UI components).
- **Dumb Views**: UI components should be as simple as possible, delegating logic to services or state management wrappers.
- **Storybook Integration**: UI components should be developed with Storybook to ensure they are reusable and well-documented.
- **Dumb Pages**: Pages should primarily handle data loading, delegating presentation to a partner `<page_name>-view` component. Page view components should have a storybook associated with them.
- **Simple Styling**: Uses simple CSS or CSS-in-JS solutions for styling, avoiding complex frameworks unless necessary.
- **Global CSS defaults**: Sets global CSS defaults for typography, colors, and spacing to ensure consistency across the application.

## Technologies
- **TypeScript**: Strongly typed superset of JavaScript for improved code quality.
- **React**: Library for building user interfaces.
- **IndexedDB**: Client-side storage solution for persisting data.
- **Playwright**: End-to-end testing framework for web applications.

## Structure
- **Public**: `/public/` - Contains static assets served directly.
  - **Styles**: `/public/styles/` - Contains global CSS files, `global.css` for setting default styles and `variables.css` for CSS color and size variables.
- **Data Models**: `/src/models/` - Contains data model definitions.
- **Persistence**: `/src/persistence/` - Contains data access and storage logic.
  - **Interfaces**: `/src/persistence/interfaces/` - Contains interfaces for data access.
  - **IndexedDB**: `/src/persistence/indexeddb/` - Contains IndexedDB implementation of the persistence interfaces.
- **Assets**: `/src/assets/` - Contains the app icon and `defaults.json` for initial data.
- **Services**: `/src/services/` - Contains business logic and service classes.
- **UI**: `/src/ui/` - Contains UI components and related code.
  - **Entrypoint**: `/src/ui/main.tsx` - Application entry point.
  - **Pages**: `/src/ui/pages/` - Contains a directory per top-level concern with a `routes.tsx` in the root and subdirectories for each page component.
  - **Components**: `/src/ui/components/` - Contains reusable UI components.
  - **Providers**: `/src/ui/providers/` - Contains context providers for state management.
- **Utilities**: `/src/utils/` - Contains utility functions and helpers.
- **Tests**: `/e2e/` - Contains end-to-end playwright tests.

## Persistence
- **IndexedDB**: Uses IndexedDB for client-side data storage, with a clear separation between interfaces and implementation.
  - **Use Basic Types**: Persistence implementations should use basic types (e.g., `number`, `string`, `boolean`) rather than JSON blob storage for better performance and queryability.