import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./ui/pages/home";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { theme } from "./ui/theme";

import { routes as categories } from "./ui/pages/categories/routes";
import { routes as units } from "./ui/pages/units/routes";
import { routes as ingredients } from "./ui/pages/ingredients/routes";
import { routes as settings } from "./ui/pages/settings/routes";
import { routes as readymeals } from "./ui/pages/readymeals/routes";
import { routes as recipies } from "./ui/pages/recipies/routes";
import { routes as planner } from "./ui/pages/planner/routes";
import { routes as list } from "./ui/pages/list/routes";
import { routes as data } from "./ui/pages/data/routes";
import { routes as misc } from "./ui/pages/misc/routes";
import { AlertProvider } from "./ui/providers/alerts";
import { DBProvider } from "./ui/providers/database";
import { FormProvider } from "./ui/providers/forms";
import { IndexedDB } from "./persistence/IndexedDB/db";
import { initData } from "./persistence/exporter";
import { DBFlags } from "./persistence/db-flags";

const dbName = "meal-planner";

const db = IndexedDB.create({
  dbName: dbName,
  reset: DBFlags.getReset(dbName),
  initFunc: async (db) => {
    console.info("New database, loading initial data...");
    await initData(db);
  },
});

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
      ...readymeals,
      ...recipies,
      ...misc,
      ...data,
      ...planner,
      ...list
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AlertProvider>
        <DBProvider database={db} dbName={dbName}>
          <FormProvider>
            <CssBaseline enableColorScheme />
            <RouterProvider router={router} />
          </FormProvider>
        </DBProvider>
      </AlertProvider>
    </ThemeProvider>
  </StrictMode>
);
