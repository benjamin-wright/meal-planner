import { LoaderFunction } from "react-router-dom";
import { Unit } from "../../../models/units";
import { UnitStore } from "../../../persistence/interfaces/units";
import { DB } from "../../../persistence/IndexedDB/db";
import { Units } from "../../../persistence/IndexedDB/units";

export interface UnitsLoaderResult {
  units: Unit[];
  store: UnitStore;
}

export function unitsLoader({
  database,
}: {
  database: Promise<DB>;
}): LoaderFunction<UnitsLoaderResult> {
  return async () => {
    const db = await database;
    const store = new Units(db);
    const units = await store.getAll();
    
    return { units, store };
  };
}
