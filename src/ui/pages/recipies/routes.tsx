import { DB } from "../../../persistence/IndexedDB/db";
import { FormState } from "../../state/form-state";
import { Recipies } from "./recipies";
import { RecipiesEdit } from "./recipies-edit";
import { recipiesEditLoader } from "./recipies-edit-loader";
import { recipiesLoader } from "./recipies-loader";

export const routes = function(db: Promise<DB>, forms: FormState) {
  return [
    {
      path: "recipies",
      loader: recipiesLoader({ database: db }),
      element: <Recipies />,
    },
    {
      path: "recipies/new",
      loader: recipiesEditLoader({ database: db, forms }),
      element: <RecipiesEdit />,
    },
    {
      path: "recipies/:recipie",
      loader: recipiesEditLoader({ database: db, forms }),
      element: <RecipiesEdit />,
    }
  ];
}