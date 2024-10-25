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
} from "./ui/pages";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { theme } from "./ui/theme";

import { Database, IndexedDBDatabase } from "./database";
import { AlertProvider } from "./ui/components/alerts";
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
        element: <Settings database={db} />,
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
      <AlertProvider>
        <CssBaseline enableColorScheme />
        <RouterProvider router={router} />
      </AlertProvider>
    </ThemeProvider>
  </StrictMode>
);
