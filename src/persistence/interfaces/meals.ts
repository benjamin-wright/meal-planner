import { Meal, CourseType, Day, Dish } from "../../models/meals";

export interface MealStore {
  get(id: number): Promise<Meal>;
  getAll(): Promise<Meal[]>;
  add(servings: number, course: CourseType, dishes: Dish[], days: Day[]): Promise<number>;
  put(value: Meal): Promise<void>;
  delete(id: number): Promise<void>;
  clear(): Promise<void>;
}
