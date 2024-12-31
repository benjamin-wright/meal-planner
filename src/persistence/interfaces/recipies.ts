import { Recipie } from "../../models/recipies";

export interface RecipieStore {
  get(id: number): Promise<Recipie>;
  getAll(): Promise<Recipie[]>;
  add(name: string, order: number): Promise<number>;
  put(value: Recipie): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}