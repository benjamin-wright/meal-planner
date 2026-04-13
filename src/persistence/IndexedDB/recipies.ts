import { IngredientQuantity, Recipe } from "../../models/recipies";
import { CourseType, DishType } from "../../models/meals";
import { RecipieStore } from "../interfaces/recipies";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "recipies";

export function recipiesV1(db: IDBDatabase) {
  db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
}

export class Recipies implements RecipieStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(id: number): Promise<Recipe> {
    return this.db.get<Recipe>(TABLE_NAME, id);
  }

  async getAll(): Promise<Recipe[]> {
    return this.db.getAll<Recipe>(TABLE_NAME);
  }

  async add(name: string, description: string, serves: number, time: number, ingredients: IngredientQuantity[], steps: string[], course: CourseType, dish: DishType): Promise<number> {
    return this.db.add(TABLE_NAME, { kind: "recipe", name, description, serves, time, ingredients, steps, course, dish });
  }

  async put(value: Recipe): Promise<void> {
    return this.db.put(TABLE_NAME, value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete(TABLE_NAME, id);
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
