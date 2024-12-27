import { DB } from "../../../persistence/IndexedDB/db";
import { FormState } from "../../state/form-state";
import { Ingredients } from "./ingredients";
import { IngredientsEdit } from "./ingredients-edit";
import { ingredientsEditLoader } from "./ingredients-edit-loader";
import { ingredientsLoader } from "./ingredients-loader";

export const routes = function(db: Promise<DB>, forms: FormState) {
  return [
    {
      path: "ingredients",
      loader: ingredientsLoader({ database: db }),
      element: <Ingredients />,
    },
    {
      path: "ingredients/new",
      loader: ingredientsEditLoader({ database: db, forms }),
      element: <IngredientsEdit />,
    },
    {
      path: "ingredients/:ingredient",
      loader: ingredientsEditLoader({ database: db, forms }),
      element: <IngredientsEdit />,
    },
  ];
}