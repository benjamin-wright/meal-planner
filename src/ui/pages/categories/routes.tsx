import { CategoriesEdit } from "./categories-edit/categories-edit";
import { Categories } from "./categories/categories";

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
    path: "categories/:id",
    element: <CategoriesEdit />,
  },
];
