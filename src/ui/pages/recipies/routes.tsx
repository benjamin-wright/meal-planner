import { Recipies } from "./recipies";
import { RecipiesEdit } from "./recipies-edit";
import { RecipiesIngredients } from "./recipies-ingredients";

export const routes = [
  {
    path: "recipies",
    element: <Recipies />,
  },
  {
    path: "recipies/new",
    element: <RecipiesEdit />,
  },
  {
    path: "recipies/:recipie",
    element: <RecipiesEdit />,
  },
  {
    path: "recipies/:recipie/ingredients/new",
    element: <RecipiesIngredients />,
  },
  {
    path: "recipies/:recipie/ingredients/:ingredient",
    element: <RecipiesIngredients />,
  },
];