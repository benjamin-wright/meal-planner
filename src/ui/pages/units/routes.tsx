import { Units } from "./units/units";
import { UnitsEdit } from "./units-edit/units-edit";

export const routes = [
  {
    path: "units",
    element: <Units />,
  },
  {
    path: "units/:id",
    element: <UnitsEdit />,
  },
];
