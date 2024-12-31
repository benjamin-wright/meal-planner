import { LoaderFunction } from "react-router-dom";
import { DB } from "../../../persistence/IndexedDB/db";
import { Recipie } from "../../../models/recipies";
import { Recipies } from "../../../persistence/IndexedDB/recipies";
import { RecipieStore } from "../../../persistence/interfaces/recipies";

export interface RecipiesLoaderResult {
  recipies: Recipie[];
  store: RecipieStore;
}

export function recipiesLoader({
  database,
}: {
  database: Promise<DB>;
}): LoaderFunction<RecipiesLoaderResult> {
  return async () => {
    const db = await database;
    const store = new Recipies(db);
    const recipies = await store.getAll();
    
    return { recipies, store };
  };
}
