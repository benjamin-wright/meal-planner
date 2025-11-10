import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes as home } from "./ui/pages/home/routes";
import { routes as settings } from "./ui/pages/settings/routes";
import { routes as data } from "./ui/pages/data/routes";
import { routes as units } from "./ui/pages/units/routes";
import { routes as categories } from "./ui/pages/categories/routes";
import { routes as items } from "./ui/pages/items/routes";

import { DBProvider } from "./ui/providers/database";
import { FormProvider } from "./ui/providers/forms/forms";
import { IndexedDB } from "./persistence/IndexedDB/db";
import { initData } from "./persistence/exporter";
import { DBFlags } from "./persistence/db-flags";
import { AlertProvider } from "./ui/providers/alerts";
import { NotFound } from "./ui/pages/not-found/not-found";

const dbName = "meal-planner";

const db = IndexedDB.create({
  dbName: dbName,
  reset: DBFlags.getReset(dbName),
  initFunc: async (db) => {
    await initData(db);
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>Something went wrong...</div>,
    children: [
      ...home,
      ...settings,
      ...data,
      ...units,
      ...categories,
      ...items,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlertProvider>
      <DBProvider database={db} dbName={dbName}>
        <FormProvider>
          <RouterProvider router={router} />
        </FormProvider>
      </DBProvider>
    </AlertProvider>
  </StrictMode>
);
