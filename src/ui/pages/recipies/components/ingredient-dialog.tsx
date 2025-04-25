import { Box, Dialog, IconButton, Paper, Typography } from "@mui/material";
import { Ingredient } from "../../../../models/ingredients";
import { IngredientQuantity } from "../../../../models/recipies";
import { Unit, UnitType } from "../../../../models/units";
import { SelectID } from "../../../components/select-id";
import { SelectObject } from "../../../components/select-object";
import { useEffect, useState } from "react";
import { Check, Delete } from "@mui/icons-material";
import { CollectiveInput } from "../../../components/units/collective-input";
import { MagnitudeInput } from "../../../components/units/magnitude-input";

interface IngredientDialogProps {
  index: number;
  open: boolean;
  ingredient: IngredientQuantity;
  ingredients: Ingredient[];
  units: Unit[];
  onChange: (ingredient: IngredientQuantity) => void;
  onClose: () => void;
  onDelete: () => void;
  onNewIngredient: () => void;
  onNewUnit: () => void;
}

export function IngredientDialog({ index, open, ingredient, ingredients, units, onChange, onClose, onDelete, onNewIngredient, onNewUnit }: IngredientDialogProps) {
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
    <Dialog open={open}>
      <Paper sx={{padding: "1em", display: "flex", flexDirection: "column", gap: "1em", minWidth: "20rem"}}>
        <Typography variant="h6" sx={{marginBottom: "1em"}}>Ingredient {index+1}</Typography>

        <SelectID
          id="ingredient"
          label="ingredient"
          link="/ingredients/new"
          toLabel={i => i.name}
          items={ingredients}
          value={ingredient.id}
          required
          onChange={id => onChange({...ingredient, id})}
          onNav={onNewIngredient}
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
            link={`/units/new?type=${unitType}`}
            toLabel={u => u.name}
            items={units.filter(u => u.type === unitType)}
            value={ingredient.unit}
            required
            onChange={id => onChange({...ingredient, unit: id})}
            onNav={onNewUnit}
            sx={{ flexGrow: 1 }}
          />
        </Box>
        {unit && unit.type === UnitType.Count && (
          <CollectiveInput
            id="quantity"
            label="quantity"
            value={ingredient.quantity}
            unit={unit}
            onChange={value => onChange({...ingredient, quantity: value})}
          />
        )}
        {unit && unit.type !== UnitType.Count && (
          <MagnitudeInput
            id="quantity"
            label="quantity"
            value={ingredient.quantity}
            unit={unit}
            onChange={value => {
              onChange({...ingredient, quantity: value});
              console.info(`Quantity changed to ${value}`);
            }}
          />
        )}

        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="0.5em">
          <IconButton size="small" color="success" onClick={onClose}>
            <Check />
          </IconButton>
          <IconButton size="small" color="error" onClick={onDelete}>
            <Delete />
          </IconButton>
        </Box>
      </Paper>
    </Dialog>
  );
}