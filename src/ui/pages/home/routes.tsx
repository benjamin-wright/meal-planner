import { Home } from "./home";

export const routes = [
  ...["", "home"].map((name) => ({
      path: name,
      element: <Home />,
    })),

  {
    path: "/",
    element: <Home />,
  },
];
