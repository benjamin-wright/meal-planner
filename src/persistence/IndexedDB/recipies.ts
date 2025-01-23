import { IngredientQuantity, Recipie } from "../../models/recipies";
import { RecipieStore } from "../interfaces/recipies";
import { DB } from "./db";

export function recipiesV1(db: IDBDatabase) {
  const store = db.createObjectStore("recipies", { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: true });
}

export class Recipies implements RecipieStore {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  async get(id: number): Promise<Recipie> {
    return this.db.get<Recipie>("recipies", id);
  }

  async getAll(): Promise<Recipie[]> {
    return this.db.getAll<Recipie>("recipies");
  }

  async add(name: string, description: string, serves: number, time: number, ingredients: IngredientQuantity[], steps: string[]): Promise<number> {
    return this.db.add("recipies", { name, description, serves, time, ingredients, steps });
  }

  async put(value: Recipie): Promise<void> {
    return this.db.put("recipies", value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete("recipies", id);
  }

  async clear(): Promise<void> {
    return this.db.clear("recipies");
  }
}