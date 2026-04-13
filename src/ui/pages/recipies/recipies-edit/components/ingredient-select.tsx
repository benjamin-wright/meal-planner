import { useState } from "react";
import { Item } from "../../../../../models/items";
import { AddButton } from "../../../../components/inputs/add-button/add-button";
import { Popup } from "../../../../components/containers/popup/popup";
import { IconFilter } from "../../../../components/inputs/icon-filter/icon-filter";

import "./ingredient-select.css";

type Props = {
  title: string;
  isOpen: boolean;
  selected: number;
  ingredients: Item[];
  onNewIngredient: () => void;
  onChange: (ingredientId?: number) => void;
}

export function IngredientSelect({ isOpen, ...rest }: Props) {
  if (!isOpen) return null;
  return <IngredientSelectContent {...rest} />;
}

function IngredientSelectContent({ title, selected, ingredients, onNewIngredient, onChange }: Omit<Props, 'isOpen'>) {
  const [search, setSearch] = useState("");
  const [temporarySelected, setTemporarySelected] = useState(selected);

  return (
    <Popup title={ title } isOpen={true} onClose={accepted => {
      if (accepted) {
        onChange(temporarySelected);
      } else {
        onChange();
      }
    }}>
      <div className="ingredient-select__content">
      <IconFilter search={search} onSearch={setSearch} />
      <ul className="ingredient-select__list">
        {
          ingredients.filter(ingredient => {
            if (!search) {
              return true;
            }

            return ingredient.name.toLowerCase().includes(search.toLowerCase());
          }).map((ingredient, index) => (
            <li key={index}>
              <input
                id={`ingredient-${index}`}
                value={ingredient.id}
                onChange={() => {
                  setTemporarySelected(ingredient.id);
                }}
                type="checkbox"
                checked={ingredient.id === temporarySelected}
              />
              <label htmlFor={`ingredient-${index}`}>{ingredient.name}</label>
            </li>
          ))
        }
      </ul>
      <AddButton id="add-ingredient-button" onClick={onNewIngredient} />
      </div>
    </Popup>
  )
}

