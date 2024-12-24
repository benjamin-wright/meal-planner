import { Magnitude, Unit } from "../../models/units";
import { UnitStore } from "../interfaces/units";
import { DB } from "./db";

export function unitsV1(db: IDBDatabase) {
  const store = db.createObjectStore("units", { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: true });
}

export class Units implements UnitStore {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  async get(id: number): Promise<Unit> {
    return this.db.get<Unit>("units", id);
  }

  async getAll(): Promise<Unit[]> {
    return this.db.getAll<Unit>("units");
  }

  async add(name: string, magnitudes: Magnitude[]): Promise<number> {
    return this.db.add("units", { name, magnitudes });
  }

  async put(value: Unit): Promise<void> {
    return this.db.put("units", value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete("units", id);
  }

  async clear(): Promise<void> {
    return this.db.clear("units");
  }
}