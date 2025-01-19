import { IngredientQuantity } from "../../../../models/recipies";
import { IngredientControl } from "./ingredient-control";
import { NewIngredient } from "./new-ingredient";

interface IngredientSelectorProps {
  ingredients: Record<number, string>;
  selected: IngredientQuantity[];
  changed: (selected: IngredientQuantity[]) => void;
}

export function IngredientSelector({ingredients, selected, changed}: IngredientSelectorProps) {
  return <>
    { selected.map((ingredient) => <IngredientControl ingredientNames={ingredients} ingredient={ingredient} />) }
    <NewIngredient onNewIngredient={() => {changed([...selected, {id: 1, quantity: 1}])}} />
  </>
}