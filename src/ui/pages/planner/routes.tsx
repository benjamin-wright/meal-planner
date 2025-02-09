import { Planner } from "./planner";
import { PlannerEdit } from "./planner-edit";

export const routes = [
  {
    path: "planner",
    element: <Planner />,
  },
  {
    path: "planner/new",
    element: <PlannerEdit />,
  }
];
