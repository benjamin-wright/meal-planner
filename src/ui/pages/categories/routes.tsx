import { DB } from "../../../persistence/IndexedDB/db";
import { FormState } from "../../state/form-state";
import { Categories } from "./categories";
import { CategoriesEdit } from "./categories-edit";
import { categoriesEditLoader } from "./categories-edit-loader";
import { categoriesLoader } from "./categories-loader";

export const routes = function(db: Promise<DB>, forms: FormState) {
  return [
    {
      path: "categories",
      loader: categoriesLoader({ database: db }),
      element: <Categories />,
    },
    {
      path: "categories/new",
      loader: categoriesEditLoader({ database: db, forms }),
      element: <CategoriesEdit />,
    },
    {
      path: "categories/:category",
      loader: categoriesEditLoader({ database: db, forms }),
      element: <CategoriesEdit />,
    },
  ];
}