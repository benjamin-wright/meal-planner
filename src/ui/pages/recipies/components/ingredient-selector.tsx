import { Ingredient } from "../../../../models/ingredients";
import { IngredientQuantity } from "../../../../models/recipies";

interface IngredientSelectorProps {
  ingredients: Ingredient[];
  selected: IngredientQuantity[];
}

export function IngredientSelector({ingredients, selected}: IngredientSelectorProps) {
  return (<>
    <p>hi</p>
  </>)
}