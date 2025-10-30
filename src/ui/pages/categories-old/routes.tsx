import { Categories } from "./categories";
import { CategoriesEdit } from "./categories-edit";

export const routes = [
  {
    path: "categories",
    element: <Categories />,
  },
  {
    path: "categories/new",
    element: <CategoriesEdit />,
  },
  {
    path: "categories/:category",
    element: <CategoriesEdit />,
  },
];