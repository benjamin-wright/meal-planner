import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Home,
  Planner,
} from "./ui/pages";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { theme } from "./ui/theme";

import { AlertProvider } from "./ui/components/alerts";
import { createDB } from "./persistence/IndexedDB/db";
import { routes as categories } from "./ui/pages/categories/routes";
import { routes as units } from "./ui/pages/units/routes";
import { routes as ingredients } from "./ui/pages/ingredients/routes";
import { routes as settings } from "./ui/pages/settings/routes";
import { routes as recipies } from "./ui/pages/recipies/routes";
import { FormState } from "./ui/state/form-state";

const db = createDB();
const forms = new FormState();

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>404 Not Found</div>,
    children: [
      ...["", "home"].map((name) => ({
        path: name,
        element: <Home />,
      })),
      ...settings(db),
      ...categories(db, forms),
      ...units(db, forms),
      ...ingredients(db, forms),
      ...recipies(db, forms),
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
