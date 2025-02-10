import { Ingredient } from "../../../../models/ingredients";
import { IngredientQuantity } from "../../../../models/recipies";
import { Unit } from "../../../../models/units";
import { NewItemButton } from "../../../components/new-item-button";
import { IngredientControl } from "./ingredient-control";

interface IngredientsListProps {
  ingredients: Ingredient[];
  units: Unit[];
  selected: IngredientQuantity[];
  changed: (selected: IngredientQuantity[]) => void;
  onNewIngredient: (index: number) => void;
}

export function IngredientsList({ingredients, units, selected, changed, onNewIngredient}: IngredientsListProps) {
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
                                            units={units}
                                            value={ingredient}
                                            onDelete={() => onDelete(index)}
                                            onChange={(newIngredient) => onChange(index, newIngredient)}
                                            onNewIngredient={() => onNewIngredient(index)}
                                          />
      )
    }
    <NewItemButton onClick={() => {changed([...selected, {id: ingredients[0].id, quantity: 1}])}} />
  </>
}