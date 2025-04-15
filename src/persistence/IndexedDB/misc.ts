import { Misc as model } from "../../models/misc";
import { MiscStore } from "../interfaces/misc";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "misc";

export function miscV1(db: IDBDatabase) {
  const store = db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: true });
}

export class Misc implements MiscStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(id: number): Promise<model> {
    return this.db.get<model>(TABLE_NAME, id);
  }

  async getAll(): Promise<model[]> {
    return this.db.getAll<model>(TABLE_NAME);
  }

  async add(name: string, category: number): Promise<number> {
    return this.db.add(TABLE_NAME, { name, category });
  }

  async put(value: model): Promise<void> {
    return this.db.put(TABLE_NAME, value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete(TABLE_NAME, id);
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
