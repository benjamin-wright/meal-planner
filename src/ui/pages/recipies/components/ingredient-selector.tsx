import { Ingredient } from "../../../../models/ingredients";
import { IngredientQuantity } from "../../../../models/recipies";
import { IngredientControl } from "./ingredient-control";
import { NewIngredient } from "./new-ingredient";

interface IngredientSelectorProps {
  ingredients: Ingredient[];
  selected: IngredientQuantity[];
  changed: (selected: IngredientQuantity[]) => void;
}

export function IngredientSelector({ingredients, selected, changed}: IngredientSelectorProps) {
  return <>
    { selected.map((ingredient) => <IngredientControl ingredients={ingredients} value={ingredient} />) }
    <NewIngredient onNewIngredient={() => {changed([...selected, {id: 2, quantity: 1}])}} />
  </>
}