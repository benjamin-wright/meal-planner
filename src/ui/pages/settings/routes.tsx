import { Settings } from "./settings";
import { version } from "../../../../package.json";

export const routes = [
  {
    path: "settings",
    element: <Settings version={version} />,
  },
];
