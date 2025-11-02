import { Recipies } from "./recipies";
import { RecipiesEdit } from "./recipies-edit";

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
  }
];