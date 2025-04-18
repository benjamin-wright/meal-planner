import { Box, Card, IconButton, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { IngredientQuantity } from "../../../../models/recipies";
import { NumericInlineInput } from "../../../components/numeric-inline-input";
import { Ingredient } from "../../../../models/ingredients";
import { IconLink } from "../../../components/icon-link";
import { Add, Delete } from "@mui/icons-material";
import { magnitude, Unit, unit, UnitType } from "../../../../models/units";
import { useEffect, useState } from "react";

interface IngredientControlProps {
  index: number;
  ingredients: Ingredient[];
  units: unit[];
  value: IngredientQuantity;
  onChange: (value: IngredientQuantity) => void;
  onDelete: () => void;
  onNewIngredient: () => void;
}

export function IngredientControl({index, ingredients, units, value, onChange, onDelete, onNewIngredient}: IngredientControlProps) {
  const selected = ingredients.find((ingredient) => ingredient.id === value.id);
  let selectedName = selected?.name || "";
  if (selectedName === "" && ingredients.length > 0) {
    selectedName = ingredients[0].name;
  }
  
  const unit = units.find((unit) => unit.id === selected?.unit);
  const [magnitude, setMagnitude] = useState<magnitude>(unit?.magnitudes[0] || { singular: "", plural: "", abbrev: "", multiplier: 1 });
  const [adjustedQuantity, setAdjustedQuantity] = useState<number>(value.quantity / magnitude.multiplier);

  useEffect(() => {
    if (!unit) {
      return;
    }

    const nearestMagnitude = Unit.magnitude(unit, value.quantity);
    if (!nearestMagnitude) {
      return
    }

    updateMagnitude(nearestMagnitude);
  }, [unit])

  function magnitudeChanged(newMagnitudeName: string) {
    const newMagnitude = unit?.magnitudes.find((magnitude) => {
      return magnitude.abbrev === newMagnitudeName}
    ) || magnitude;
    
    updateMagnitude(newMagnitude);
  }

  function updateMagnitude(newMagnitude: magnitude) {
    setAdjustedQuantity(adjustedQuantity / newMagnitude.multiplier * magnitude.multiplier);
    setMagnitude(newMagnitude);
  }

  function quantityChanged(newQuantity: number) {
    setAdjustedQuantity(newQuantity);
    onChange({ ...value, quantity: newQuantity * magnitude.multiplier });
  }

  function ingredientSelected(ingredient: string) {
    const selected = ingredients.find((i) => i.name === ingredient);
    if (selected === undefined) {
      return;
    }

    onChange({ ...value, id: selected.id });
  }

  console.info(value);
  console.info(selected);
  console.info(unit);

  return <Card sx={{
    padding: "0.25em",
    paddingLeft: "1em",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}>
    <Box padding="0" margin="0">
      <IconButton size="small" sx={{ fontSize: "0.75em"}} color="success" onClick={() => onNewIngredient()}>
        <Add />
      </IconButton>
      <Select
        id={`ingredient-${index}`}
        variant="standard"
        value={selectedName}
        onChange={(e: SelectChangeEvent<string>) => ingredientSelected(e.target.value)}
      >
        {ingredients.map((ingredient) => <MenuItem key={ingredient.id} value={ingredient.name}>{ingredient.name}</MenuItem>)}
      </Select>
      :&nbsp;
      <NumericInlineInput value={adjustedQuantity} onChange={quantityChanged} />
      &nbsp;
      { unit && unit.type === UnitType.Count && <span>{Unit.abbr(unit, value.quantity)}</span> }
      { unit && unit.type !== UnitType.Count && 
      <Select
        id={`unit-${index}`}
        variant="standard"
        value={magnitude.abbrev}
        onChange={(e: SelectChangeEvent<string>) => magnitudeChanged(e.target.value)}
      >
        {unit?.magnitudes.map((magnitude) => <MenuItem key={magnitude.abbrev} value={magnitude.abbrev}>{magnitude.abbrev}</MenuItem>)}
      </Select>
    }
      
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