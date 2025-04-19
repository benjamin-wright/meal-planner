import { Card, CardActionArea, Typography } from "@mui/material";
import { Unit } from "../../../../models/units";
import { OutlinedContainer } from "../../../components/outlined-container";
import { useState } from "react";
import { NewItemButton } from "../../../components/new-item-button";

export type IngredientData = {
  id: number;
  name: string;
  amount: number;
  unit: Unit;
}

interface IngredientsViewProps {
  ingredients: IngredientData[];
  disabled?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onAdd: () => void;
}

export function IngredientsView({ ingredients, disabled, onEdit, onDelete, onAdd }: IngredientsViewProps) {
  const [selected, setSelected] = useState<number | undefined>(undefined);
  function select(index: number) {
    if (selected === index) {
      setSelected(undefined);
    } else {
      setSelected(index);
    }
  }

  return <OutlinedContainer label="ingredients">
    {ingredients.map((ingredient, index) =>
      <Card key={index} sx={{ display: "flex", flexDirection: "row", overflowX: "hidden" }}>
        <CardActionArea onClick={() => select(index)} sx={{ width: "min-content", padding: "0.5em 1em" }}>
          <Typography variant="body1">
            {ingredient.name}: {ingredient.amount}{ ingredient.unit.getAbbr(ingredient.amount) }
          </Typography>
        </CardActionArea>
      </Card>
    )}
    <NewItemButton small onClick={onAdd} disabled={disabled} />
  </OutlinedContainer>
}