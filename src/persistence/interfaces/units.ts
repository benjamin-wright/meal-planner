import { Magnitude, Unit } from "../../models/units";

export interface UnitStore {
  get(id: number): Promise<Unit>;
  getAll(): Promise<Unit[]>;
  put(value: Unit): Promise<void>;
  delete(id: number): Promise<void>;
  add(name: string, short: string, magnitudes: Magnitude[]): Promise<number>;
}