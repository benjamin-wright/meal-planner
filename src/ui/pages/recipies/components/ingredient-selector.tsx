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
  function onDelete(index: number) {
    console.info(`Deleting ingredient at index ${index}`);
    console.debug(`Selected: ${JSON.stringify(selected)}`);
    const newSelected = selected.slice(0, index).concat(selected.slice(index + 1));
    changed(newSelected);
    console.debug(`New selected: ${JSON.stringify(newSelected)}`);
  }

  return <>
    { selected.map((ingredient, index) => <IngredientControl key={index} ingredients={ingredients} value={ingredient} onDelete={() => onDelete(index)} onChange={(ingredient) => selected[index] = ingredient } />) }
    <NewIngredient onNewIngredient={() => {changed([...selected, {id: 1, quantity: 1}])}} />
  </>
}