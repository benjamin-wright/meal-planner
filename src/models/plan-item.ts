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

const DAYS = ["saturday", "sunday", "monday", "tuesday", "wednesday", "thursday", "friday"];
export function getDayReadable(day: number): string {
  return DAYS[day];
}

export function makePlanItem(id: number, order: number): PlanItem {
  return {
    id: id,
    order: order,
    breakfast: [],
    lunch: [],
    dinner: []
  }
}
