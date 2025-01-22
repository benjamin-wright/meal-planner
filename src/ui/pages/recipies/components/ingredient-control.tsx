import { Box, Card, MenuItem, Select, SelectChangeEvent, unstable_useEnhancedEffect } from "@mui/material";
import { IngredientQuantity } from "../../../../models/recipies";
import { NumericInlineInput } from "../../../components/numeric-inline-input";
import { Ingredient } from "../../../../models/ingredients";
import { IconLink } from "../../../components/icon-link";
import { Delete } from "@mui/icons-material";

interface IngredientControlProps {
  ingredients: Ingredient[];
  value: IngredientQuantity;
  onChange: (value: IngredientQuantity) => void;
  onDelete: () => void;
}

export function IngredientControl({ingredients, value, onChange, onDelete}: IngredientControlProps) {
  const selected = ingredients.find((ingredient) => ingredient.id === value.id);
  let selectedName = selected?.name || "";
  if (selectedName === "" && ingredients.length > 0) {
    selectedName = ingredients[0].name;
  }

  function ingredientSelected(ingredient: string) {
    const selected = ingredients.find((i) => i.name === ingredient);
    if (selected === undefined) {
      return;
    }

    onChange({ ...value, id: selected.id });
  }

  return <Card sx={{
    padding: "0.25em",
    paddingLeft: "1em",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}>
    <Box padding="0" margin="0">
      <Select
        variant="standard"
        value={selectedName}
        onChange={(e: SelectChangeEvent<string>) => ingredientSelected(e.target.value)}
      >
        {ingredients.map((ingredient) => <MenuItem key={ingredient.id} value={ingredient.name}>{ingredient.name}</MenuItem>)}
      </Select>
      :&nbsp;
      <NumericInlineInput value={value.quantity} size={15} onChange={(quantity: number) => onChange({...value, quantity: quantity })} /> 
      &nbsp;
      ml
    </Box>
    <Box margin="0" padding="0">
      <IconLink 
        color="error"
        sx={{ minWidth: "0" }}
        onClick={onDelete}>
        <Delete />
      </IconLink>
    </Box>
  </Card>
}