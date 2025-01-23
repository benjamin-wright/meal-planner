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
  function onChange(index: number, ingredient: IngredientQuantity) {
    selected[index] = ingredient;
    changed([...selected]);
  }

  function onDelete(index: number) {
    const newSelected = selected.slice(0, index).concat(selected.slice(index + 1));
    changed(newSelected);
  }

  return <>
    { 
      selected.map((ingredient, index) => <IngredientControl
                                            index={index}
                                            key={index}
                                            ingredients={ingredients}
                                            value={ingredient}
                                            onDelete={() => onDelete(index)}
                                            onChange={(newIngredient) => onChange(index, newIngredient)} 
                                          />
      )
    }
    <NewIngredient onNewIngredient={() => {changed([...selected, {id: ingredients[0].id, quantity: 1}])}} />
  </>
}