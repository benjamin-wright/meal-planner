import { LoaderFunction } from "react-router-dom";
import { Unit } from "../../../models/units";
import { DB } from "../../../persistence/IndexedDB/db";
import { Units } from "../../../persistence/IndexedDB/units";
import { UnitStore } from "../../../persistence/interfaces/units";

export interface UnitsEditLoaderResult {
  object?: Unit;
  units: Unit[];
  store: UnitStore;
}

export function unitsEditLoader({
  database,
}: {
  database: Promise<DB>;
}): LoaderFunction<UnitsEditLoaderResult> {
  return async ({ params }) => {
    const db = await database;
    const store = new Units(db);
    const units = await store.getAll();

    if (params.unit) {
      const object = await store.get(Number.parseInt(params.unit, 10));
      return { object, units, store };
    }

    return { units, store };
  };
}
