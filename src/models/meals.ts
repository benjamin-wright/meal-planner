import { defaultArray, defaultNumber, defaultType, isObject } from "../utils/typing";

export enum CourseType {
  Breakfast = "breakfast",
  Lunch = "lunch",
  Dinner = "dinner"
}

export function courseTypeToString(course: CourseType): string {
  switch (course) {
    case CourseType.Breakfast:
      return "Breakfast";
    case CourseType.Lunch:
      return "Lunch";
    case CourseType.Dinner:
      return "Dinner";
    default:
      return "Unknown";
  }
}

export enum DishType {
  Starter = "starter",
  Main = "main",
  Side = "side",
  Dessert = "dessert"
}

export function dishTypeToString(dish: DishType): string {
  switch (dish) {
    case DishType.Starter:
      return "Starter";
    case DishType.Main:
      return "Main";
    case DishType.Side:
      return "Side";
    case DishType.Dessert:
      return "Dessert";
    default:
      return "Unknown";
  }
}

export enum Day {
  Saturday = "saturday",
  Sunday = "sunday",
  Monday = "monday",
  Tuesday = "tuesday",
  Wednesday = "wednesday",
  Thursday = "thursday",
  Friday = "friday"
}

export type Dish = {
  kind: "readymeal" | "recipe";
  id: number;
}

export type Meal = {
  id: number;
  servings: number;
  course: CourseType;
  dishes: Dish[];
  days: Day[];
}

export function validate(meal: Meal): boolean {
  if (meal.id <= 0) {
    return false;
  }

  if (meal.servings <= 0) {
    return false;
  }

  if (meal.course === CourseType.Dinner && meal.days.length === 0) {
    return false;
  }

  if (meal.dishes.length === 0) {
    return false;
  }

  return true;
}

export function sanitize(value: unknown): Meal {
  if (!isObject(value)) {
    return {
      id: 0,
      servings: 0,
      course: CourseType.Dinner,
      dishes: [],
      days: []
    };
  }

  return {
    id: defaultNumber(value.id, 0),
    servings: defaultNumber(value.servings, 0),
    course: defaultType<CourseType>(value.course, CourseType.Dinner),
    dishes: defaultArray<Dish>(value.dishes, (item) => {
      if (!isObject(item)) {
        return { id: 0, kind: "readymeal" };
      }

      return {
        kind: defaultType<"readymeal" | "recipe">(item.kind, "readymeal"),
        id: defaultNumber(item.id, 0),
      };
    }),
    days: defaultArray<Day>(value.days, (item) => defaultType<Day>(item, Day.Monday)),
  }
}
