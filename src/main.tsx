import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Units,
  Settings,
  Categories,
  Ingredients,
  Recipies,
  Planner,
} from "./pages";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
// import "./index.css";

const theme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#393e46",
        },
        secondary: {
          main: "#222831",
        },
        background: {
          default: "#eeeeee",
          paper: "#393e46",
        },
        text: {
          primary: "#222831",
          secondary: "#222831",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#393e46",
        },
        secondary: {
          main: "#222831",
        },
        background: {
          default: "#222831",
          paper: "#393e46",
        },
        text: {
          primary: "#eeeeee",
          secondary: "#eeeeee",
        },
        error: {
          main: "#990000",
        },
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        :root,
        body,
        #root {
          height: 100%;
          width: 100%;
        }

        :root {
          --background-image: url("dark-background.jpg");
        }

        @media (prefers-color-scheme: light) {
          :root {
            --background-image: url("light-background.webp");
          }
        }

        body {
          background-image: var(--background-image);
          background-size: cover;
          background-position: center;
          backdrop-filter: blur(0.3em);
          -webkit-backdrop-filter: blur(0.3em);
          margin: 0;
        }
      `,
    },
  },
});

import { Database, IndexedDBDatabase } from "./database";
const db = new Database(new IndexedDBDatabase(indexedDB));

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>404 Not Found</div>,
    children: [
      ...["", "home"].map((name) => ({
        path: name,
        element: <Home />,
      })),
      {
        path: "units",
        element: <Units database={db} />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "ingredients",
        element: <Ingredients />,
      },
      {
        path: "recipies",
        element: <Recipies />,
      },
      {
        path: "planner",
        element: <Planner />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
