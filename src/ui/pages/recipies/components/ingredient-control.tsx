import { Card, MenuItem, Select } from "@mui/material";
import { IngredientQuantity } from "../../../../models/recipies";
import { NumericInlineInput } from "../../../components/numeric-inline-input";
import { Ingredient } from "../../../../models/ingredients";

interface IngredientControlProps {
  ingredients: Ingredient[];
  value: IngredientQuantity;
}

export function IngredientControl({ingredients, value}: IngredientControlProps) {
  const ingredientKeys = ingredients.map((ingredient) => ingredient.id);
  const selected = ingredients.find((ingredient) => ingredient.id === value.id);

  return <Card sx={{
    padding: "1em"
  }}>
    <Select variant="standard" value={selected?.name}>
      {ingredients.map((ingredient) => <MenuItem key={ingredient.id} value={ingredient.name}>{ingredient.name}</MenuItem>)}
    </Select>
    :&nbsp;
    <NumericInlineInput value={value.quantity} size={15} onChange={() => {}} /> 
    &nbsp;
    ml
  </Card>
}