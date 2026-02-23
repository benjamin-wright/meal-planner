import { Fragment } from "react/jsx-runtime";
import { Item } from "../../../../../models/items";
import { IngredientQuantity } from "../../../../../models/recipies";
import { format, Unit } from "../../../../../models/units";
import { AddButton } from "../../../../components/inputs/add-button/add-button";
import { Fieldset } from "../../../../components/inputs/fieldset/fieldset";
import './ingredients-list.css';
import { Popup } from "../../../../components/containers/popup/popup";
import { useState } from "react";
import { IconFilter } from "../../../../components/inputs/icon-filter/icon-filter";
import { IngredientSelect } from "./ingredient-select";

type Props = {
  ingredients: IngredientQuantity[];
  items: Item[];
  units: Unit[];
  newIngredient: () => void;
}

export function IngredientsList({ ingredients, items, units, newIngredient }: Props) {
  const [ selected, setSelected ] = useState<number | null>(null);

  return <Fieldset id="ingredients-list" label="Ingredients">
    <div className="ingredients-list">
    {
      ingredients.map((ingredient, index) => {
        const ingredientItem = items.find(item => item.id === ingredient.id);
        const unit = units.find(unit => unit.id === ingredient.unit);
        return (
          <Fragment key={index}>
            <button className="ingredient-name-button" type="button" onClick={() => setSelected(index)}>
              {ingredientItem ? ingredientItem.name : "Unknown"}
            </button>
            <span>:</span>
            <button className="ingredient-quantity" type="button" onClick={() => setSelected(index)}>{unit ? format(unit, ingredient.quantity) : "Unknown"}</button>
          </Fragment>
        )
      })
    }
    </div>
    <AddButton id="add-ingredient-button" onClick={() => {
      newIngredient();
      setSelected(ingredients.length);
    }} />
    <IngredientSelect title={`Ingredient ${selected !== null ? selected + 1 : ''}`} isOpen={selected !== null} selected={selected ?? 0} ingredients={items} />
  </Fieldset>;
}