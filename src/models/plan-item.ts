export type Meal = {
  recipieId: number;
  servings: number;
}

export type PlanItem = {
  id: number;
  order: number;
  breakfast: Meal[];
  lunch: Meal[];
  dinner: Meal[];
}
