import { Recipies } from "./recipies";
import { RecipiesIngredients } from "./recipies-ingredients";

export const routes = [
  {
    path: "recipies",
    element: <Recipies />,
  },
  {
    path: "recipies/new/ingredients",
    element: <RecipiesIngredients />,
  },
  {
    path: "recipies/:recipie/ingredients",
    element: <RecipiesIngredients />,
  }
];