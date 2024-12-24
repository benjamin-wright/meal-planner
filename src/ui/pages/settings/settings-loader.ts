import { LoaderFunction } from "react-router-dom";
import { DB } from "../../../persistence/IndexedDB/db";

export interface SettingsLoaderResult {
  db: DB;
}

export function settingsLoader({
  database,
}: {
  database: Promise<DB>;
}): LoaderFunction<SettingsLoaderResult> {
  return async () => {
    const db = await database;
    
    return { db };
  };
}
