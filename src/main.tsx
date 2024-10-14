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
import "./index.css";

import { Database, IndexedDBDatabase } from "./database";
import { migrate } from "./migrations";
const db = new Database(new IndexedDBDatabase(indexedDB));
migrate(db);

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
    <RouterProvider router={router} />
  </StrictMode>
);
