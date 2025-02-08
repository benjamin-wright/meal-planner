import Typography from "@mui/material/Typography";
import { Meal } from "../../../../models/plan-item";
import { NewItemButton } from "../../../components/new-item-button";
import Box from "@mui/material/Box";
import { Recipie } from "../../../../models/recipies";
import { MealItem } from "./meal-item";

interface MealListProps {
  kind: string;
  meals: Meal[];
  recipies: Recipie[];
  onChange: (meals: Meal[]) => void;
}

export function MealList({ kind, meals, recipies, onChange }: MealListProps) {

  function onMealsChanged(index: number, meal: Meal) {
    meals[index] = meal;
    onChange([...meals]);
  }

  return <Box display="flex" flexDirection="column" gap="0.5em">
    <Typography variant="h6" textTransform="capitalize">{kind}</Typography>
    {
      meals.map((meal, index) => <MealItem key={index} id={`${kind}-${index}`} meal={meal} recipies={recipies} onChange={(meal) => onMealsChanged(index, meal)}/>)
    }
    <NewItemButton onClick={() => {
      onChange([...meals, {
        recipieId: 0,
        servings: 1
      }])
    }}/>
  </Box>;
}
