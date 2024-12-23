import { DB } from "../../../persistence/IndexedDB/db";
import { Categories } from "./categories";
import { CategoriesEdit } from "./categories-edit";
import { categoriesEditLoader } from "./categories-edit-loader";
import { categoriesLoader } from "./categories-loader";

export const routes = function(db: Promise<DB>) {
  return [
    {
      path: "categories",
      loader: categoriesLoader({ database: db }),
      element: <Categories />,
    },
    {
      path: "categories/new",
      loader: categoriesEditLoader({ database: db }),
      element: <CategoriesEdit />,
    },
    {
      path: "categories/:category",
      loader: categoriesEditLoader({ database: db }),
      element: <CategoriesEdit />,
    },
  ];
}