import { Category } from "../../models/categories";
import { CategoryStore } from "../interfaces/categories";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "categories";

export function categoriesV1(db: IDBDatabase) {
  const store = db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: true });
}

export class Categories implements CategoryStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(id: number): Promise<Category> {
    return this.db.get<Category>(TABLE_NAME, id);
  }

  async getAll(): Promise<Category[]> {
    return this.db.getAll<Category>(TABLE_NAME);
  }

  async add(name: string, order: number): Promise<number> {
    return this.db.add(TABLE_NAME, { name, order });
  }

  async put(value: Category): Promise<void> {
    return this.db.put(TABLE_NAME, value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete(TABLE_NAME, id);
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
