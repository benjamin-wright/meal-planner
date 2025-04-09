import { Inedible } from "../../models/inedible";
import { InedibleStore } from "../interfaces/inedibles";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "inedibles";

export function inediblesV1(db: IDBDatabase) {
  db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
}

export class Inedibles implements InedibleStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(id: number): Promise<Inedible> {
    return this.db.get<Inedible>(TABLE_NAME, id);
  }

  async getAll(): Promise<Inedible[]> {
    return this.db.getAll<Inedible>(TABLE_NAME);
  }

  async add(name: string, ingredientId: number, quantity: number): Promise<number> {
    return this.db.add(TABLE_NAME, { name, ingredientId, quantity });
  }

  async put(value: Inedible): Promise<void> {
    return this.db.put(TABLE_NAME, value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete(TABLE_NAME, id);
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
