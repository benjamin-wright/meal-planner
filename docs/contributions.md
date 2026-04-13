# Contributing

Development setup, npm scripts, and project layout for meal-planner. For coding conventions, see [standards.md](standards.md). For project overview, see the [README](../README.md).

---

## Prerequisites

- Node.js (LTS)
- npm

## Running Locally

```sh
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## npm Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run format` | Run Prettier across the project |
| `npm run test:unit` | Run Vitest unit tests |
| `npm run test:e2e` | Run Playwright end-to-end tests |
| `npm run test:e2e:ui` | Run Playwright tests with the interactive UI |
| `npm run test:e2e:headed` | Run Playwright tests in a headed browser |
| `npm run test:e2e:debug` | Run Playwright tests in debug mode |
| `npm run storybook` | Start the Storybook dev server on port 6006 |
| `npm run build-storybook` | Build Storybook for static hosting |

## Project Layout

```
├── e2e/                        # Playwright end-to-end tests
│   ├── pages/                  # Page object model classes
│   └── utils/                  # Shared test utilities
├── public/
│   ├── images/                 # Static image assets
│   └── styles/
│       ├── global.css          # Global default styles
│       └── variables.css       # CSS custom properties (colours, spacing)
├── src/
│   ├── assets/
│   │   └── defaults.json       # Seed data loaded on first run
│   ├── models/                 # Data model type definitions
│   ├── persistence/
│   │   ├── interfaces/         # Storage interface contracts
│   │   └── IndexedDB/          # IndexedDB implementations
│   ├── services/               # Business logic
│   ├── ui/
│   │   ├── components/         # Reusable UI components
│   │   ├── hooks/              # Custom React hooks
│   │   ├── pages/              # Page components (one directory per concern)
│   │   ├── providers/          # React context providers
│   │   └── theme/              # MUI theme configuration
│   └── utils/                  # Shared utility functions
├── docs/                       # Project documentation
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite configuration
├── playwright.config.ts        # Playwright configuration
└── package.json
```
