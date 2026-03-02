import { useEffect, useState } from "react";
import { Item } from "../../../../../models/items";
import { Popup } from "../../../../components/containers/popup/popup";
import { IconFilter } from "../../../../components/inputs/icon-filter/icon-filter";

import "./ingredient-select.css";

type Props = {
  title: string;
  isOpen: boolean;
  selected: number;
  ingredients: Item[];
  onChange: (ingredientId?: number) => void;
}

export function IngredientSelect({ title, isOpen, selected, ingredients, onChange }: Props) {
  const [search, setSearch] = useState("");
  const [temporarySelected, setTemporarySelected] = useState(selected);

  useEffect(() => {
    setTemporarySelected(selected);
  }, [isOpen, selected]);

  return (
    <Popup title={ title } isOpen={isOpen} onClose={accepted => {
      if (accepted) {
        onChange(temporarySelected);
      } else {
        onChange();
      }
    }}>
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
    </Popup>
  )
}
