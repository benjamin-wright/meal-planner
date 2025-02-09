import { Meal, MealDay, MealType } from "../../models/meals";
import { MealStore } from "../interfaces/meals";
import { DB } from "./db";

export function mealsV1(db: IDBDatabase) {
  const store = db.createObjectStore("meals", { keyPath: "id", autoIncrement: true });
  store.createIndex("day", "day");
}

export class Meals implements MealStore {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  async get(id: number): Promise<Meal> {
    return this.db.get<Meal>("meals", id);
  }

  async getAll(): Promise<Meal[]> {
    return this.db.getAll<Meal>("meals");
  }

  async getByDay(day: MealDay): Promise<Meal[]> {
    return this.db.getByIndex<Meal, "day">("meals", "day", day);
  }

  async add(recipieId: number, servings: number, meal: MealType, day: MealDay): Promise<number> {
    return this.db.add("meals", { recipieId, servings, meal, day });
  }

  async put(value: Meal): Promise<void> {
    return this.db.put("meals", value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete("meals", id);
  }

  async clear(): Promise<void> {
    return this.db.clear("meals");
  }
}
