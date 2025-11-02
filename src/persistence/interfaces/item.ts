import { Item } from "../../models/items";
import { CourseType, DishType } from "../../models/meals";

export interface ItemStore {
  get(id: number): Promise<Item>;
  getEdible(): Promise<Item[]>;
  getInedible(): Promise<Item[]>;
  getAll(): Promise<Item[]>;
  addItem(name: string, category: number, edible: boolean): Promise<number>;
  addReadyMeal(name: string, category: number, course: CourseType, dish: DishType, serves: number, time: number): Promise<number>;
  put(value: Item): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
