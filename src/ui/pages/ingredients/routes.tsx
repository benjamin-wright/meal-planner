import { Ingredients } from "./ingredients";
import { IngredientsEdit } from "./ingredients-edit";

export const routes = [
  {
    path: "ingredients",
    element: <Ingredients />,
  },
  {
    path: "ingredients/new",
    element: <IngredientsEdit />,
  },
  {
    path: "ingredients/:ingredient",
    element: <IngredientsEdit />,
  },
];