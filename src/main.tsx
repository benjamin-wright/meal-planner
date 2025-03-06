import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./ui/pages/home";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { theme } from "./ui/theme";

import { AlertProvider } from "./ui/providers/alerts";
import { createDB } from "./persistence/IndexedDB/db";
import { routes as categories } from "./ui/pages/categories/routes";
import { routes as units } from "./ui/pages/units/routes";
import { routes as ingredients } from "./ui/pages/ingredients/routes";
import { routes as settings } from "./ui/pages/settings/routes";
import { routes as recipies } from "./ui/pages/recipies/routes";
import { routes as planner } from "./ui/pages/planner/routes";
import { routes as list } from "./ui/pages/list/routes";
import { DBProvider } from "./ui/providers/database";
import { FormProvider } from "./ui/providers/forms";

const db = createDB();

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>Something went wrong...</div>,
    children: [
      ...["", "home"].map((name) => ({
        path: name,
        element: <Home />,
      })),
      ...settings,
      ...categories,
      ...units,
      ...ingredients,
      ...recipies,
      ...planner,
      ...list
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <DBProvider database={db}>
          <FormProvider>
            <CssBaseline enableColorScheme />
            <RouterProvider router={router} />
          </FormProvider>
        </DBProvider>
      </AlertProvider>
    </ThemeProvider>
  </StrictMode>
);
