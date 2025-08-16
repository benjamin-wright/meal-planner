import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes as home } from "./ui/pages/home/routes";
import { routes as settings } from "./ui/pages/settings/routes";

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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DBProvider database={db} dbName={dbName}>
      <FormProvider>
        <RouterProvider router={router} />
      </FormProvider>
    </DBProvider>
  </StrictMode>
);
