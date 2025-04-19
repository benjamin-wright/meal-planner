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
  onEdit: () => void;
  onDelete: () => void;
}

export function IngredientsView({ ingredients, onEdit, onDelete }: IngredientsViewProps) {
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
      <Card key={index} sx={{ padding: "0.25em 0.75em", display: "flex", flexDirection: "row", overflowX: "hidden" }}>
        <CardActionArea onClick={() => select(index)} sx={{ width: "min-content" }}>
          <Typography variant="body1">
            {ingredient.name}: {ingredient.amount}{ ingredient.unit.getAbbr(ingredient.amount) }
          </Typography>
        </CardActionArea>
      </Card>
    )}
    <NewItemButton small onClick={() => {}} />
  </OutlinedContainer>
}