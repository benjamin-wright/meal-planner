import { Extra } from "../../models/extras";
import { ExtraStore } from "../interfaces/extras";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "extra";

export function extraV1(db: IDBDatabase) {
  db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
}

export class Extras implements ExtraStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(id: number): Promise<Extra> {
    return this.db.get<Extra>(TABLE_NAME, id);
  }

  async getAll(): Promise<Extra[]> {
    return this.db.getAll<Extra>(TABLE_NAME);
  }

  async add(ingredient: number, unit: number, quantity: number): Promise<number> {
    return this.db.add(TABLE_NAME, { ingredient, unit, quantity });
  }

  async put(value: Extra): Promise<void> {
    return this.db.put(TABLE_NAME, value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete(TABLE_NAME, id);
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
