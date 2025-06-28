import { ReadyMeals } from "./readymeals";
import { ReadyMealsEdit } from "./readymeals-edit";

export const routes = [
  {
    path: "readymeals",
    element: <ReadyMeals />,
  },
  {
    path: "readymeals/new",
    element: <ReadyMealsEdit />,
  },
  {
    path: "readymeals/:readymeal",
    element: <ReadyMealsEdit />,
  }
];