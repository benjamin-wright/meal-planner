import { defaultArray, defaultNumber, defaultString, defaultType, isObject } from "../utils/typing";

export enum MealType {
  Breakfast = "breakfast",
  Lunch = "lunch",
  Dinner = "dinner"
}

export enum MealDay {
  Saturday = "saturday",
  Sunday = "sunday",
  Monday = "monday",
  Tuesday = "tuesday",
  Wednesday = "wednesday",
  Thursday = "thursday",
  Friday = "friday"
}

export type MealProps = {
  id: number;
  recipieId: number;
  servings: number;
  meal: MealType;
  days: MealDay[];
}

export type Meal = {
  id: number;
  recipieId: number;
  servings: number;
  meal: MealType;
  days: MealDay[];
}

export function validate(meal: Meal): boolean {
  if (meal.recipieId <= 0) {
    return false;
  }

  if (meal.servings <= 0) {
    return false;
  }

  if (meal.meal === MealType.Dinner && meal.days.length === 0) {
    return false;
  }

  return true;
}

export function sanitize(value: unknown): Meal {
  if (!isObject(value)) {
    return { id: 0, recipieId: 0, servings: 0, meal: MealType.Dinner, days: [] };
  }

  return {
    id: defaultNumber(value.id, 0),
    recipieId: defaultNumber(value.recipieId, 0),
    servings: defaultNumber(value.servings, 0),
    meal: defaultType<MealType>(value.meal, MealType.Dinner),
    days: defaultArray<MealDay>(value.days, day => defaultString(day, MealDay.Saturday) as MealDay),
  }
}
