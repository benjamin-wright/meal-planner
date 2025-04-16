import { Misc } from "./misc";
import { MiscEdit } from "./misc-edit";

export const routes = [
  {
    path: "misc",
    element: <Misc />,
  },
  {
    path: "misc/new",
    element: <MiscEdit />,
  },
  {
    path: "misc/:misc",
    element: <MiscEdit />,
  }
];
