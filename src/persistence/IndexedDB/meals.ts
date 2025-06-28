import { Meal, MealDay, MealProps, MealRecipieType, MealType } from "../../models/meals";
import { MealStore } from "../interfaces/meals";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "meals";

export function mealsV1(db: IDBDatabase) {
  const store = db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
  store.createIndex("day", "day");
}

export function mealsV2(_db: IDBDatabase, transaction: IDBTransaction) {
  const store = transaction.objectStore(TABLE_NAME);
  const request = store.openCursor();
  request.onsuccess = function (event) {
    const cursor = (event.target as IDBRequest<IDBCursorWithValue>).result;
    if (cursor) {
      const value = cursor.value;
      if (!value.recipieType) {
        // Default to Recipie if recipieType is not set
        value.recipieType = MealRecipieType.Recipie;
      }
      cursor.update(value);
      cursor.continue();
    }
  }
}

export class Meals implements MealStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(id: number): Promise<Meal> {
    return this.db.get<MealProps>(TABLE_NAME, id);
  }

  async getAll(): Promise<Meal[]> {
    return this.db.getAll<Meal>(TABLE_NAME);
  }

  async add(recipieId: number, recipieType: MealRecipieType, servings: number, meal: MealType, days: MealDay[]): Promise<number> {
    return this.db.add(TABLE_NAME, { recipieId, recipieType, servings, meal, days });
  }

  async put(value: MealProps): Promise<void> {
    return this.db.put(TABLE_NAME, value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete(TABLE_NAME, id);
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
