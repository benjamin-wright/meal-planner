import { Category } from "../../models/categories";
import { CategoryStore } from "../interfaces/categories";
import { DB } from "./db";

export function categoriesV1(db: IDBDatabase) {
  const store = db.createObjectStore("categories", { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: true });
}

export class Categories implements CategoryStore {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  async get(id: number): Promise<Category> {
    return this.db.get<Category>("categories", id);
  }

  async getAll(): Promise<Category[]> {
    return this.db.getAll<Category>("categories");
  }

  async add(name: string, order: number): Promise<number> {
    return this.db.add("categories", { name, order });
  }

  async put(value: Category): Promise<void> {
    return this.db.put("categories", value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete("categories", id);
  }

  async clear(): Promise<void> {
    return this.db.clear("categories");
  }
}