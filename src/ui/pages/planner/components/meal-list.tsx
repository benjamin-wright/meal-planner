import Typography from "@mui/material/Typography";
import { Meal } from "../../../../models/plan-item";
import { NewItemButton } from "../../../components/new-item-button";
import Box from "@mui/material/Box";
import { MenuItem, Select } from "@mui/material";
import { Recipie } from "../../../../models/recipies";

interface MealListProps {
  kind: string;
  meals: Meal[];
  recipies: Recipie[];
  onMealsChanged: (meals: Meal[]) => void;
}

export function MealList({ kind, meals, recipies, onMealsChanged }: MealListProps) {
  return <Box display="flex" flexDirection="column" gap="0.5em">
    <Typography variant="h6" textTransform="capitalize">{kind}</Typography>
    {
      meals.map((meal, index) =>
        <Select key={index} value={meal.recipieId} onChange={(event) => {
          switch (typeof event.target.value) {
            case "number": {
              meals[index].recipieId = event.target.value;
              break;
            }
            case "string": {
              meals[index].recipieId = Number.parseInt(event.target.value);
              break;
            } 
          }

          onMealsChanged([...meals])
        }}>
          {
            recipies.map((recipie, index) => 
              <MenuItem key={index} value={recipie.id}>{ recipie.name }</MenuItem>
            )
          }
        </Select>
      )
    }
    <NewItemButton onClick={() => {
      onMealsChanged([...meals, {
        recipieId: 0,
        servings: 1
      }])
    }}/>
  </Box>;
}
