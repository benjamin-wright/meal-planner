
export type MealItem = {
  id: number;
  recipie: string;
  servings: number;
  day: string;
}

export const Days = ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"] as const;
