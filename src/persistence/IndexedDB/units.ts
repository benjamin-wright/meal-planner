import { Collective, UnitProps, Magnitude, Unit, UnitType } from "../../models/units";
import { UnitStore } from "../interfaces/units";
import { TypedDB } from "./typed-db";

const TABLE_NAME = "units";

export function unitsV1(db: IDBDatabase) {
  const store = db.createObjectStore(TABLE_NAME, { keyPath: "id", autoIncrement: true });
  store.createIndex("name", "name", { unique: true });
  store.createIndex("type", "type", {});
}

export class Units implements UnitStore {
  private db: TypedDB;

  constructor(db: TypedDB) {
    this.db = db;
  }

  async get(id: number): Promise<Unit> {
    const data = await this.db.get<UnitProps>(TABLE_NAME, id);
    return Unit.from(data);
  }

  async getAll(): Promise<Unit[]> {
    const data = await this.db.getAll<UnitProps>(TABLE_NAME);
    return data.map((item) => Unit.from(item));
  }

  async getAllByType(type: UnitType): Promise<Unit[]> {
    const data = await this.db.getByIndex<UnitProps, "type">(TABLE_NAME, "type", type);
    return data.map((item) => Unit.from(item));
  }

  async add(name: string, type: UnitType, magnitudes?: Magnitude[], collectives?: Collective[], base?: number): Promise<number> {
    if (magnitudes) {
      magnitudes.sort((a, b) => a.multiplier - b.multiplier);
    }
    return this.db.add(TABLE_NAME, { name, type, magnitudes, collectives, base });
  }

  async put(value: Unit): Promise<void> {
    if (value.magnitudes) {
      value.magnitudes.sort((a, b) => a.multiplier - b.multiplier);
    }
    return this.db.put(TABLE_NAME, value);
  }

  async delete(id: number): Promise<void> {
    return this.db.delete(TABLE_NAME, id);
  }

  async clear(): Promise<void> {
    return this.db.clear(TABLE_NAME);
  }
}
