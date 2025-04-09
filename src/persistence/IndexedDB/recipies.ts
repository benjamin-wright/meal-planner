import { IngredientQuantity, Recipie } from "../../models/recipies";
import { RecipieStore } from "../interfaces/recipies";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "recipies";

export function recipiesV1(db: IDBDatabase) {
  const store = db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: true });
}

export class Recipies implements RecipieStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(id: number): Promise<Recipie> {
    return this.db.get<Recipie>(TABLE_NAME, id);
  }

  async getAll(): Promise<Recipie[]> {
    return this.db.getAll<Recipie>(TABLE_NAME);
  }

  async add(name: string, description: string, serves: number, time: number, ingredients: IngredientQuantity[], steps: string[]): Promise<number> {
    return this.db.add(TABLE_NAME, { name, description, serves, time, ingredients, steps });
  }

  async put(value: Recipie): Promise<void> {
    return this.db.put(TABLE_NAME, value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete(TABLE_NAME, id);
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
