import { Ingredient } from "../../models/ingredients";
import { IngredientStore } from "../interfaces/ingredients";
import { DB } from "./db";

export function ingredientsV1(db: IDBDatabase) {
  const store = db.createObjectStore("ingredients", { keyPath: "id" });
  store.createIndex("name", "name", { unique: true });
  store.createIndex("category", "category");
  store.createIndex("unit", "unit");
}

export class Ingredients implements IngredientStore {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  async get(id: number): Promise<Ingredient> {
    return this.db.get<Ingredient>("ingredients", id);
  }

  async getByCategory(category: number): Promise<Ingredient[]> {
    return this.db.getByIndex<Ingredient, "category">("ingredients", "category", category);
  }

  async getByUnit(unit: number): Promise<Ingredient[]> {
    return this.db.getByIndex<Ingredient, "unit">("ingredients", "unit", unit);
  }

  async getAll(): Promise<Ingredient[]> {
    return this.db.getAll<Ingredient>("ingredients");
  }

  async add(name: string, category: number, unit: number): Promise<number> {
    return this.db.add("ingredients", { name, category, unit });
  }

  async put(value: Ingredient): Promise<void> {
    return this.db.put("ingredients", value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete("ingredients", id);
  }
}