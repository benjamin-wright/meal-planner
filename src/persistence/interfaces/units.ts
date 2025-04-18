import { collective, magnitude, unit, UnitType } from "../../models/units";

export interface UnitStore {
  get(id: number): Promise<unit>;
  getAll(): Promise<unit[]>;
  getAllByType(type: UnitType): Promise<unit[]>;
  add(name: string, type: UnitType, magnitudes: magnitude[], collectives: collective[], base?: number): Promise<number>;
  put(value: unit): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
