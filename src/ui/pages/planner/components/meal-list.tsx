import { NoFood } from "@mui/icons-material";
import { SortableMeal } from "./sortable-meal";

export type MealItem = {
  id: number;
  recipie: string;
  servings: number;
}

interface MealListProps {
  kind: string;
  meals: MealItem[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export function MealList({ kind, meals, onEdit, onDelete }: MealListProps) {
  return meals.length > 0
    ?
    meals.map((meal, index) => <SortableMeal meal={meal} kind={kind} onEdit={(meal) => onEdit(meal.id)} onDelete={(meal) => onDelete(meal.id)} key={index} />)
    :
    <NoFood color="disabled" />
}
