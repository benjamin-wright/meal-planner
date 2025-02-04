import Typography from "@mui/material/Typography";
import { Meal } from "../../../../models/plan-item";

interface MealListProps {
  kind: string;
  meals: Meal[];
}

export function MealList({ kind, meals }: MealListProps) {
  return <>
    <Typography variant="h6" textTransform="capitalize">{kind}</Typography>
    {
      meals.map((meal, index) =>
        <div key={index}>
          meal {meal.recipieId} {meal.servings}
        </div>
      )
    }
    <div>Meal List</div>
  </>;
}
