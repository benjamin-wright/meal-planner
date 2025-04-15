import { Misc } from "../../models/misc";

export interface MiscStore {
  get(id: number): Promise<Misc>;
  getAll(): Promise<Misc[]>;
  add(name: string, order: number): Promise<number>;
  put(value: Misc): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}