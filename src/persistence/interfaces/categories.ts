import { Category, CategoryProps } from "../../models/categories";

export interface CategoryStore {
  get(id: number): Promise<Category>;
  getAll(): Promise<Category[]>;
  add(name: string, order: number): Promise<number>;
  put(value: CategoryProps): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}