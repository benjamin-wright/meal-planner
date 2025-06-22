import { ReadyMeal } from "../../models/readymeals";
import { MealType } from "../../models/meals";
import { ReadyMealStore } from "../interfaces/readymeals";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "readymeals";

export function readymealsV1(db: IDBDatabase) {
  const store = db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: true });
}

export class ReadyMeals implements ReadyMealStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(id: number): Promise<ReadyMeal> {
    return this.db.get<ReadyMeal>(TABLE_NAME, id);
  }

  async getAll(): Promise<ReadyMeal[]> {
    return this.db.getAll<ReadyMeal>(TABLE_NAME);
  }

  async add(name: string, serves: number, time: number, meal: MealType): Promise<number> {
    return this.db.add(TABLE_NAME, { name, serves, time, meal });
  }

  async put(value: ReadyMeal): Promise<void> {
    return this.db.put(TABLE_NAME, value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete(TABLE_NAME, id);
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
