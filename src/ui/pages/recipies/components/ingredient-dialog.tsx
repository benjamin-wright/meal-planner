import { Box, Dialog, Paper } from "@mui/material";
import { Ingredient } from "../../../../models/ingredients";
import { IngredientQuantity } from "../../../../models/recipies";
import { Unit, UnitType } from "../../../../models/units";
import { CollectiveInput } from "./collective-input";
import { MagnitudeInput } from "./magnitude-input";
import { SelectID } from "../../../components/select-id";
import { SelectObject } from "../../../components/select-object";
import { useEffect, useState } from "react";

interface IngredientDialogProps {
  open: boolean;
  onClose: () => void;
  ingredient: IngredientQuantity;
  ingredients: Ingredient[];
  onChange: (ingredient: IngredientQuantity) => void;
  units: Unit[];
}

export function IngredientDialog({ open, ingredient, ingredients, units, onChange, onClose }: IngredientDialogProps) {
  const [ unitType, setUnitType ] = useState<UnitType>(UnitType.Count);
  const [ unit, setUnit ] = useState<Unit>(units[0]);

  function handleUnitTypeChange(type: UnitType) {
    setUnitType(type);

    const unit = units.find(u => u.type === type);
    if (!unit) {
      return;
    }

    onChange({...ingredient, unit: unit.id});
  }

  useEffect(() => {
    const unit = units.find(u => u.id === ingredient.unit);
    if (unit) {
      setUnit(unit);
      setUnitType(unit.type);
    }
  }, [ingredient.unit])

  return (
    <Dialog open={open} onClose={onClose}>
      <Paper sx={{padding: "1em", display: "flex", flexDirection: "column", gap: "1em"}}>
        <SelectID
          id="ingredient"
          label="ingredient"
          link="/ingredients/new"
          toLabel={i => i.name}
          items={ingredients}
          value={ingredient.id}
          required
          onChange={id => onChange({...ingredient, id})}
          onNav={() => {}}
        />

        <Box sx={{ display: "flex", flexDirection: "row", gap: "1em", justifyContent: "space-between" }}>
          <SelectObject
            id="unit-type"
            label="unit type"
            items={[UnitType.Count, UnitType.Weight, UnitType.Volume]}
            value={unitType}
            toLabel={t => t.toString()}
            onChange={handleUnitTypeChange}
            sx={{ flexGrow: 1 }}
          />

          <SelectID
            id="unit"
            label="unit"
            link="/units/new"
            toLabel={u => u.name}
            items={units.filter(u => u.type === unitType)}
            value={ingredient.unit}
            required
            onChange={id => onChange({...ingredient, unit: id})}
            onNav={() => {}}
            sx={{ flexGrow: 1 }}
          />
        </Box>

        {unit.type === UnitType.Count ? (
          <CollectiveInput
            id="quantity"
            label="quantity"
            value={ingredient.quantity}
            unit={unit}
            onChange={value => onChange({...ingredient, quantity: value})}
          />
        ) : (
          <MagnitudeInput
            id="quantity"
            label="quantity"
            value={ingredient.quantity}
            unit={unit}
            onChange={value => onChange({...ingredient, quantity: value})}
          />
        )}
      </Paper>
    </Dialog>
  );
}