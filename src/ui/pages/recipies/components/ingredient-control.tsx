import { IngredientQuantity } from "../../../../models/recipies";

interface IngredientControlProps {
  ingredients: Record<number, string>;
  ingredient: IngredientQuantity;
}

export function IngredientControl({ingredients, ingredient}: IngredientControlProps) {
  return <p>
    {ingredients[ingredient.id] || "Unknown"}
  </p>
}