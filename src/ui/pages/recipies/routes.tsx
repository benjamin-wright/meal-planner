import RecipiesEdit from "./recipies-edit/recipies-edit";
import { Recipies } from "./recipies/recipies";

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
    path: "recipies/:id",
    element: <RecipiesEdit />,
  },
];
