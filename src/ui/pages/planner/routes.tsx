import { Planner } from "./planner";
import { MealsEdit } from "./meals-edit";
import { ExtrasEdit } from "./extras-edit";

export const routes = [
  {
    path: "planner",
    element: <Planner />,
  },
  {
    path: "planner/meals/new",
    element: <MealsEdit />,
  },
  {
    path: "planner/meals/:meal",
    element: <MealsEdit />,
  },
  {
    path: "planner/extras/new",
    element: <ExtrasEdit />
  },
  {
    path: "planner/extras/:id",
    element: <ExtrasEdit />
  }
];
