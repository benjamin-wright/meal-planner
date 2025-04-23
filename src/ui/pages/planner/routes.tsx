import { Planner } from "./planner";
import { MealsEdit } from "./meals-edit";
import { MiscEdit } from "./misc-edit";

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
    path: "planner/misc/new",
    element: <MiscEdit />
  },
  {
    path: "planner/misc/:id",
    element: <MiscEdit />
  }
];
