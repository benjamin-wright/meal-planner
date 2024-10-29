import { Database } from "../../database";
import { Unit } from "../../database/schemas";
import { LoaderFunction } from "react-router-dom";

export interface UnitsEditLoaderResult {
  object?: Unit;
  units: Unit[];
}

export function unitsEditLoader({
  database,
}: {
  database: Database;
}): LoaderFunction<UnitsEditLoaderResult> {
  return async ({ params }) => {
    const units = await database.units.getAll();

    if (params.unit) {
      const object = await database.units.get(Number.parseInt(params.unit, 10));
      return { object, units };
    }

    return { units };
  };
}
