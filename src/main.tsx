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
import { UnitsEdit } from "./ui/pages/units-edit";
import { unitsEditLoader } from "./ui/pages/units-edit-loader";
import { CategoriesEdit } from "./ui/pages/categories-edit";
import { categoriesEditLoader } from "./ui/pages/categories-edit-loader";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { theme } from "./ui/theme";

import { Database, IndexedDBDatabase } from "./database";
import { AlertProvider } from "./ui/components/alerts";
import { unitsLoader } from "./ui/pages/units-loader";
import { categoriesLoader } from "./ui/pages/categories-loader";
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
        loader: unitsLoader({ database: db }),
        element: <Units database={db} />,
      },
      {
        path: "units/new",
        loader: unitsEditLoader({ database: db }),
        element: <UnitsEdit database={db} />,
      },
      {
        path: "units/:unit",
        loader: unitsEditLoader({ database: db }),
        element: <UnitsEdit database={db} />,
      },
      {
        path: "settings",
        element: <Settings database={db} />,
      },
      {
        path: "categories",
        loader: categoriesLoader({ database: db }),
        element: <Categories database={db} />,
      },
      {
        path: "categories/new",
        loader: categoriesEditLoader({ database: db }),
        element: <CategoriesEdit database={db} />,
      },
      {
        path: "categories/:category",
        loader: categoriesEditLoader({ database: db }),
        element: <CategoriesEdit database={db} />,
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
