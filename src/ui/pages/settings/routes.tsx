import { DB } from "../../../persistence/IndexedDB/db";
import { Settings } from "./settings";
import { settingsLoader } from "./settings-loader";

export const routes = function(db: Promise<DB>) {
  return [
   {
      path: "settings",
      loader: settingsLoader({ database: db }),
      element: <Settings />,
    },
  ];
}