import { Card, MenuItem, Select } from "@mui/material";
import { IngredientQuantity } from "../../../../models/recipies";
import { NumericInlineInput } from "../../../components/numeric-inline-input";

interface IngredientControlProps {
  ingredientNames: Record<number, string>;
  ingredient: IngredientQuantity;
}

function getKeys(object: Record<number, string>): number[] {
  return Object.keys(object).map((key) => Number.parseInt(key));
}

export function IngredientControl({ingredientNames, ingredient}: IngredientControlProps) {
  const ingredientKeys = getKeys(ingredientNames);

  return <Card sx={{
    padding: "1em"
  }}>
    <Select variant="standard" value={ingredientNames[ingredient.id]}>
      {ingredientKeys.map((key: number) => <MenuItem key={key} value={key}>{ingredientNames[key]}</MenuItem>)}
    </Select>
    :&nbsp;
    <NumericInlineInput value={ingredient.quantity} size={15} onChange={() => {}} /> 
    &nbsp;
    ml
  </Card>
}