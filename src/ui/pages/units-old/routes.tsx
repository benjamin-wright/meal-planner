import { Units } from "./units";
import { UnitsEdit } from "./units-edit";

export const routes = [
  {
    path: "units",
    element: <Units />,
  },
  {
    path: "units/new",
    element: <UnitsEdit />,
  },
  {
    path: "units/:unit",
    element: <UnitsEdit />,
  },
];
