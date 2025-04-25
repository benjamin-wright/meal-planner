
export type MealItem = {
  id?: number;
  index: number;
  recipie: string;
  servings: number;
  day: string;
}

export type ExtraItem = {
  id?: number;
  index: number;
  name: string;
  quantity: string;
}

export const Days = ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"] as const;
