import { useState } from "react";
import { Item } from "../../../../../models/items";
import { Popup } from "../../../../components/containers/popup/popup";
import { IconFilter } from "../../../../components/inputs/icon-filter/icon-filter";

type Props = {
  title: string;
  isOpen: boolean;
  selected: number;
  ingredients: Item[];
}

export function IngredientSelect({ title, isOpen, selected, ingredients }: Props) {
  const selectedIngredient = ingredients[selected];
  const [search, setSearch] = useState("");
  
  return (
    <Popup title={ title } isOpen={isOpen} onClose={() => {}}>
      <IconFilter search={search} onSearch={setSearch} />
      <ul>
        {
          ingredients.filter(ingredient => {
            if (!search) {
              return true;
            }

            return ingredient.name.toLowerCase().includes(search.toLowerCase());
          }).map((ingredient, index) => (
            <li key={index}>
              <button onClick={(event) => {event.preventDefault()}}>{ingredient.name}</button>
            </li>
          ))
        }
      </ul>
    </Popup>
  )
}