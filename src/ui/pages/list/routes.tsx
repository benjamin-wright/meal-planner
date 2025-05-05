import { List } from "./list";
import { NewItem } from "./new-item";

export const routes = [
  {
    path: "list",
    element: <List />,
  },
  {
    path: "list/new",
    element: <NewItem />,
  },
  {
    path: "list/:id",
    element: <NewItem />,
  }
];
