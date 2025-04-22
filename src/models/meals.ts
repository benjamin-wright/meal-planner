export type MealType = "breakfast" | "lunch" | "dinner";
export type MealDay = "saturday" | "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday";

export const MealTypes = ["breakfast", "lunch", "dinner"] as MealType[];
export const MealDays = ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"] as MealDay[];

export type MealProps = {
  id: number;
  recipieId: number;
  servings: number;
  meal: MealType;
  days: MealDay[];
}

export class Meal {
  id: number;
  recipieId: number;
  servings: number;
  meal: MealType;
  days: MealDay[];

  constructor(id: number, recipieId: number, servings: number, meal: MealType, days: MealDay[]) {
    this.id = id;
    this.recipieId = recipieId;
    this.servings = servings;
    this.meal = meal;
    this.days = days;
  }

  static from({
    id,
    recipieId,
    servings,
    meal,
    days,
  }: MealProps): Meal {
    return new Meal(id, recipieId, servings, meal, days);
  }

  validate(): boolean {
    if (this.recipieId <= 0) {
      return false;
    }

    if (this.servings <= 0) {
      return false;
    }

    if (!MealTypes.includes(this.meal)) {
      return false;
    }

    if (this.meal === "dinner" && this.days.length === 0) {
      return false;
    }

    return true;
  }
};
