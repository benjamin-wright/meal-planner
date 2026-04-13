import { Fragment } from "react/jsx-runtime";
import { Item } from "../../../../../models/items";
import { IngredientQuantity } from "../../../../../models/recipies";
import { format, Unit } from "../../../../../models/units";
import { AddButton } from "../../../../components/inputs/add-button/add-button";
import { Fieldset } from "../../../../components/inputs/fieldset/fieldset";
import './ingredients-list.css';
import { useState } from "react";
import { IngredientSelect } from "./ingredient-select";
import { QuantitySelect } from "./quantity-select";

type Props = {
  ingredients: IngredientQuantity[];
  items: Item[];
  units: Unit[];
  newIngredient: () => void;
  newItem: () => void;
  newUnit: () => void;
  onChange: (index: number, ingredient: IngredientQuantity) => void;
}

export function IngredientsList({ ingredients, items, units, newIngredient, newItem, newUnit, onChange }: Props) {
  const [selectedIngredientIndex, setSelectedIngredientIndex] = useState<number | null>(null);
  const [selectedQuantityIndex, setSelectedQuantityIndex] = useState<number | null>(null);

  const activeIngredient = selectedIngredientIndex !== null ? ingredients[selectedIngredientIndex] : null;
  const selectableIngredients = items.filter(item =>
    ingredients.every(ingredient => ingredient.id !== item.id) || (activeIngredient && item.id === activeIngredient.id)
  );

  return <Fieldset id="ingredients-list" label="Ingredients">
    <div className="ingredients-list">
    {
      ingredients.map((ingredient, index) => {
        const ingredientItem = items.find(item => item.id === ingredient.id);
        const unit = units.find(unit => unit.id === ingredient.unit);
        return (
          <Fragment key={index}>
            <button className="ingredient-name-button" type="button" onClick={() => setSelectedIngredientIndex(index)}>
              {ingredientItem ? ingredientItem.name : "Unknown"}
            </button>
            <span>:</span>
            <button className="ingredient-quantity" type="button" onClick={() => setSelectedQuantityIndex(index)}>
              {unit ? format(unit, ingredient.quantity) : "Unknown"}
            </button>
          </Fragment>
        )
      })
    }
    </div>
    <AddButton id="add-ingredient-button" onClick={() => {
      newIngredient();
      setSelectedIngredientIndex(ingredients.length);
    }} />
    <IngredientSelect
      title={`Ingredient ${selectedIngredientIndex !== null ? selectedIngredientIndex + 1 : ''}`}
      isOpen={selectedIngredientIndex !== null}
      selected={selectedIngredientIndex !== null ? ingredients[selectedIngredientIndex].id : 0}
      ingredients={selectableIngredients}
      onNewIngredient={newItem}
      onChange={id => {
        if (id === undefined) {
          setSelectedIngredientIndex(null);
          return;
        }
        if (selectedIngredientIndex === null) return;
        onChange(selectedIngredientIndex, { ...ingredients[selectedIngredientIndex], id });
        setSelectedIngredientIndex(null);
      }}
    />
    <QuantitySelect
      title={`Quantity ${selectedQuantityIndex !== null ? selectedQuantityIndex + 1 : ''}`}
      isOpen={selectedQuantityIndex !== null}
      quantity={selectedQuantityIndex !== null ? ingredients[selectedQuantityIndex].quantity : 0}
      unitId={selectedQuantityIndex !== null ? ingredients[selectedQuantityIndex].unit : (units[0]?.id ?? 0)}
      units={units}
      onNewUnit={newUnit}
      onChange={result => {
        if (result === undefined) {
          setSelectedQuantityIndex(null);
          return;
        }
        if (selectedQuantityIndex === null) return;
        onChange(selectedQuantityIndex, { ...ingredients[selectedQuantityIndex], quantity: result.quantity, unit: result.unitId });
        setSelectedQuantityIndex(null);
      }}
    />
  </Fieldset>;
}
