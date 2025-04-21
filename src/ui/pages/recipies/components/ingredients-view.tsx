import { Card, CardActionArea, Typography } from "@mui/material";
import { Unit } from "../../../../models/units";
import { OutlinedContainer } from "../../../components/outlined-container";
import { NewItemButton } from "../../../components/new-item-button";
import { IngredientQuantity } from "../../../../models/recipies";
import { Ingredient } from "../../../../models/ingredients";

interface IngredientsViewProps {
  ingredients: Ingredient[];
  units: Unit[];
  quantities: IngredientQuantity[];
  disabled?: boolean;
  onEdit: (index: number) => void;
  onAdd: () => void;
}

export function IngredientsView({ ingredients, units, quantities, disabled, onEdit, onAdd }: IngredientsViewProps) {
  return <OutlinedContainer label="ingredients">
    {quantities.map(quantity => {
      const ingredient = ingredients.find(i => i.id === quantity.id);
      const unit = units.find(u => u.id === quantity.unit);
      if (!ingredient || !unit) {
        return { name: "unknown", amount: 1, unit: undefined };
      }

      const amount = quantity.quantity * unit.multiplier(quantity.quantity);
      return { name: ingredient.name, amount, unit };
    }).map((quantity, index) =>
      <Card key={index} sx={{ display: "flex", flexDirection: "row", overflowX: "hidden" }}>
        <CardActionArea onClick={() => onEdit(index)} sx={{ width: "min-content", padding: "0.5em 1em" }}>
          <Typography variant="body1">
            {quantity.name}: {quantity.amount}{ quantity.unit?.getAbbr(quantity.amount) || "" }
          </Typography>
        </CardActionArea>
      </Card>
    )}
    <NewItemButton small onClick={onAdd} disabled={disabled} />
  </OutlinedContainer>
}