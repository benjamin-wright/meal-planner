import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { Meal } from "../../../../models/plan-item";
import { Recipie } from "../../../../models/recipies";
import MenuItem from "@mui/material/MenuItem";
import { NumericInput } from "../../../components/numeric-input";
import Box from "@mui/material/Box";
import { IntegerInput } from "../../../components/integer-input";

interface MealItemProps {
  id: string;
  meal: Meal;
  recipies: Recipie[];
  onChange: (meal: Meal) => void;
}

export function MealItem({id, meal, recipies, onChange}: MealItemProps) {
  return <Box display="flex" flexDirection="row" gap="0.5em" alignItems="center" justifyContent="space-between">
    <FormControl sx={{flexGrow: 1}}>
      <InputLabel id={`${id}-meal-item`}>recipie</InputLabel>
      <Select label="recipie" labelId={`${id}-meal-item`} value={meal.recipieId} onChange={(event) => {
        switch (typeof event.target.value) {
          case "number": {
            meal.recipieId = event.target.value;
            break;
          }
          case "string": {
            meal.recipieId = Number.parseInt(event.target.value);
            break;
          } 
        }

        onChange(meal);
      }}>
        {
          recipies.map((recipie, index) => 
            <MenuItem key={index} value={recipie.id}>{ recipie.name }</MenuItem>
          )
        }
      </Select>
    </FormControl>
    <IntegerInput value={meal.servings} min={1} onChange={(value) => {
      meal.servings = value;
      onChange(meal);
    }} />
  </Box>;
}