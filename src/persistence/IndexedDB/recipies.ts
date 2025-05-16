import { IngredientQuantity, Recipie } from "../../models/recipies";
import { MealType } from "../../models/meals";
import { RecipieStore } from "../interfaces/recipies";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "recipies";

export function recipiesV1(db: IDBDatabase) {
  const store = db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: true });
}

export function recipiesV2(_db: IDBDatabase, transaction: IDBTransaction) {
  // Use the object store from the upgrade transaction
  const store = transaction.objectStore(TABLE_NAME);
  const request = store.openCursor();
  request.onsuccess = function (event) {
    const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
    if (cursor) {
      const value = cursor.value;
      if (!value.meal) {
        value.meal = "dinner";
        cursor.update(value);
      }
      cursor.continue();
    }
  };
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

  async add(name: string, description: string, serves: number, time: number, ingredients: IngredientQuantity[], steps: string[], meal: MealType): Promise<number> {
    return this.db.add(TABLE_NAME, { name, description, serves, time, ingredients, steps, meal });
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
