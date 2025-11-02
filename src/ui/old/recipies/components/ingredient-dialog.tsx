import { Box, Dialog, IconButton, Paper, Typography } from "@mui/material";
import { Ingredient } from "../../../../models/ingredients";
import { IngredientQuantity } from "../../../../models/recipies";
import { Unit } from "../../../../models/units";
import { SelectID } from "../../../components/select-id";
import { Check, Delete } from "@mui/icons-material";
import { UnitQuantityControl } from "../../../components/units/unit-quantity-control";

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
  return (
    <Dialog open={open}>
      <Paper sx={{ padding: "1em", display: "flex", flexDirection: "column", gap: "1em", minWidth: "20rem" }}>
        <Typography variant="h6" sx={{ marginBottom: "1em" }}>Ingredient {index + 1}</Typography>

        <SelectID
          id="ingredient"
          label="ingredient"
          link="/ingredients/new"
          toLabel={i => i.name}
          items={ingredients}
          value={ingredient.id}
          required
          onChange={id => onChange({ ...ingredient, id })}
          onNav={onNewIngredient}
        />

        <UnitQuantityControl
          unitId={ingredient.unit}
          quantity={ingredient.quantity}
          units={units}
          onChange={(unit, quantity) => {
            onChange({
              ...ingredient,
              unit,
              quantity
            });
          }}
          onNewUnit={onNewUnit}
        />

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