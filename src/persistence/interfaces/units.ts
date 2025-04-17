import { Collective, Magnitude, Unit, UnitType } from "../../models/units";

export interface UnitStore {
  get(id: number): Promise<Unit>;
  getAll(): Promise<Unit[]>;
  add(name: string, type: UnitType, magnitudes: Magnitude[], collectives: Collective[], base?: number): Promise<number>;
  put(value: Unit): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
