import { DB } from "../../../persistence/IndexedDB/db";
import { UnitStore } from "../../../persistence/interfaces/units";
import { Units } from "./units";
import { UnitsEdit } from "./units-edit";
import { unitsEditLoader } from "./units-edit-loader";
import { unitsLoader } from "./units-loader";

export function routes(db: Promise<DB>) {
  return [
    {
      path: "units",
      loader: unitsLoader({ database: db }),
      element: <Units />,
    },
    {
      path: "units/new",
      loader: unitsEditLoader({ database: db }),
      element: <UnitsEdit />,
    },
    {
      path: "units/:unit",
      loader: unitsEditLoader({ database: db }),
      element: <UnitsEdit />,
    },
  ];
}