import { Database } from "../../database";
import { Unit } from "../../database/schemas";
import { LoaderFunction } from "react-router-dom";

export interface UnitsLoaderResult {
  units: Unit[];
}

export function unitsLoader({
  database,
}: {
  database: Database;
}): LoaderFunction<UnitsLoaderResult> {
  return async () => {
    const units = await database.units.getAll();
    return { units };
  };
}
