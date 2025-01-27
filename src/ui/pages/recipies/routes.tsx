import { Recipies } from "./recipies";
import { RecipiesIngredients } from "./recipies-ingredients";
import { RecipiesMetadata } from "./recipies-metadata";
import { RecipiesSteps } from "./recipies-steps";

export const routes = [
  {
    path: "recipies",
    element: <Recipies />,
  },
  {
    path: "recipies/new/metadata",
    element: <RecipiesMetadata />,
  },
  {
    path: "recipies/:recipie/metadata",
    element: <RecipiesMetadata />,
  },
  {
    path: "recipies/:recipie/ingredients",
    element: <RecipiesIngredients />,
  },
  {
    path: "recipies/:recipie/steps",
    element: <RecipiesSteps />,
  }
];