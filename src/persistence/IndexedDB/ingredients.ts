import { Ingredient } from "../../models/ingredients";
import { IngredientStore } from "../interfaces/ingredients";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "ingredients";

export function ingredientsV1(db: IDBDatabase) {
  const store = db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: true });
  store.createIndex("category", "category");
  store.createIndex("unit", "unit");
}

export class Ingredients implements IngredientStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(id: number): Promise<Ingredient> {
    return this.db.get<Ingredient>(TABLE_NAME, id);
  }

  async getByCategory(category: number): Promise<Ingredient[]> {
    return this.db.getByIndex<Ingredient, "category">(TABLE_NAME, "category", category);
  }

  async getByUnit(unit: number): Promise<Ingredient[]> {
    return this.db.getByIndex<Ingredient, "unit">(TABLE_NAME, "unit", unit);
  }

  async getAll(): Promise<Ingredient[]> {
    return this.db.getAll<Ingredient>(TABLE_NAME);
  }

  async add(name: string, category: number, unit: number): Promise<number> {
    return this.db.add(TABLE_NAME, { name, category, unit });
  }

  async put(value: Ingredient): Promise<void> {
    return this.db.put(TABLE_NAME, value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete(TABLE_NAME, id);
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
