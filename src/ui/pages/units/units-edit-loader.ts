import { LoaderFunction } from "react-router-dom";
import { Unit } from "../../../models/units";
import { DB } from "../../../persistence/IndexedDB/db";
import { Units } from "../../../persistence/IndexedDB/units";
import { UnitStore } from "../../../persistence/interfaces/units";

export interface UnitsEditLoaderResult {
  unit: Unit;
  isNew: boolean;
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
      const unit = await store.get(Number.parseInt(params.unit, 10));
      return { unit, isNew: false, units, store };
    }

    return { unit: { id: 0, name: "", magnitudes: [] }, isNew: true, units, store };
  };
}
