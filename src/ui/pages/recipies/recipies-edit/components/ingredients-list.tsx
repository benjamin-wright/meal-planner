import { Fragment } from "react/jsx-runtime";
import { Item } from "../../../../../models/items";
import { IngredientQuantity } from "../../../../../models/recipies";
import { format, Unit } from "../../../../../models/units";
import { AddButton } from "../../../../components/inputs/add-button/add-button";
import { Fieldset } from "../../../../components/inputs/fieldset/fieldset";
import './ingredients-list.css';

type Props = {
  ingredients: IngredientQuantity[];
  items: Item[];
  units: Unit[];
  newIngredient: () => void;
}

export function IngredientsList({ ingredients, items, units, newIngredient }: Props) {
  return <Fieldset id="ingredients-list" label="Ingredients">
    <div className="ingredients-list">
    {
      ingredients.map((ingredient, index) => {
        const ingredientItem = items.find(item => item.id === ingredient.id);
        const unit = units.find(unit => unit.id === ingredient.unit);
        return (
          <Fragment key={index}>
            <button className="ingredient-name-button" type="button" onClick={() => {}}>
              {ingredientItem ? ingredientItem.name : "Unknown"}
            </button>
            <span>:</span>
            <button className="ingredient-quantity" type="button" onClick={() => {}}>{unit ? format(unit, ingredient.quantity) : "Unknown"}</button>
          </Fragment>
        )
      })
    }
    </div>
    <AddButton id="add-ingredient-button" onClick={newIngredient} />
  </Fieldset>;
}