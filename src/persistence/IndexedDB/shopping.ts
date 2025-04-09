import { Shopping as ShoppingObj } from "../../models/shopping";
import { ShoppingStore } from "../interfaces/shopping";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "shopping";

export function shoppingV1(db: IDBDatabase) {
  const store = db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: true });
}

export class Shopping implements ShoppingStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(id: number): Promise<ShoppingObj> {
    return this.db.get<ShoppingObj>(TABLE_NAME, id);
  }

  async getAll(): Promise<ShoppingObj[]> {
    return this.db.getAll<ShoppingObj>(TABLE_NAME);
  }

  async add(name: string, category: number, unit: number | undefined, quantity: number | undefined, got: boolean): Promise<number> {
    return this.db.add(TABLE_NAME, { name, category, unit, quantity, got });
  }

  async put(value: ShoppingObj): Promise<void> {
    return this.db.put(TABLE_NAME, value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete(TABLE_NAME, id);
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
