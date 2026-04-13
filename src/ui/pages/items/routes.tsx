import { Items } from "../items/items/items";
import { ItemsEdit } from "../items/items-edit/items-edit";

export const routes = [
  {
    path: "items",
    element: <Items />,
  },
  {
    path: "items/new",
    element: <ItemsEdit />,
  },
  {
    path: "items/:id",
    element: <ItemsEdit />,
  }
];
