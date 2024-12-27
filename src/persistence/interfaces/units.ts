import { Magnitude, Unit } from "../../models/units";

export interface UnitStore {
  get(id: number): Promise<Unit>;
  getAll(): Promise<Unit[]>;
  add(name: string, magnitudes: Magnitude[], singular?: string, plural?: string): Promise<number>;
  put(value: Unit): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}