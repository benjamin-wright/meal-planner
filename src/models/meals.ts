export type MealType = "breakfast" | "lunch" | "dinner";
export type MealDay = "saturday" | "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday";

export const MealTypes = ["breakfast", "lunch", "dinner"] as MealType[];
export const MealDays = ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"] as MealDay[];

export type Meal = {
  id: number;
  recipieId: number;
  servings: number;
  meal: MealType;
  days: MealDay[];
};
