import { useState } from "react";
import Breakfast from "../../../components/icons/breakfast";
import Pot from "../../../components/icons/pot";
import Sandwich from "../../../components/icons/sandwich";
import { IconFilter } from "../../../components/inputs/icon-filter/icon-filter";
import { Page } from "../../../components/layout/page/page";
import { Recipe } from "../../../../models/recipies";
import { SlideOutGroup } from "../../../components/containers/slide-out-controls/slide-out-group";
import { SlideOutControl } from "../../../components/containers/slide-out-controls/slide-out-control";
import { AddButton } from "../../../components/inputs/add-button/add-button";
import { CourseType } from "../../../../models/meals";
import { Dialog } from "../../../components/containers/dialog/dialog";

const icons = {
  dinner: <Pot />,
  lunch: <Sandwich />,
  breakfast: <Breakfast />
}

type Props = {
  recipies: Recipe[];
  onDelete: (recipe: Recipe) => void;
  onEdit: (recipe: Recipe) => void;
  onNew: () => void;
}

export function RecipiesView({ recipies, onDelete, onEdit, onNew }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    breakfast: false,
    lunch: false,
    dinner: false
  });
  const [toDelete, setToDelete] = useState<Recipe | undefined>(undefined);

  return <Page title="Recipies">
    <IconFilter
      icons={icons}
      search={search}
      filter={filter}
      onChange={(newFilter, newSearch) => { setFilter(newFilter); setSearch(newSearch); }}
    />
    <SlideOutGroup>
      {
        recipies.filter(
          recipe => {
            if (filter.breakfast || filter.lunch || filter.dinner) {
              if (!filter.breakfast && recipe.course === CourseType.Breakfast) return false;
              if (!filter.lunch && recipe.course === CourseType.Lunch) return false;
              if (!filter.dinner && recipe.course === CourseType.Dinner) return false;
            }

            if (!search) return true;

            return recipe.name.toLowerCase().includes(search.toLowerCase())
          }
        ).map(recipe => (
          <SlideOutControl
            key={recipe.id}
            groupId={recipe.name}
            label={`Recipe list item for ${recipe.name}`}
            onDelete={() => setToDelete(recipe)}
            onEdit={() => onEdit(recipe)}
          >
            <p>{recipe.name}</p>
          </SlideOutControl>
        ))
      }
    </SlideOutGroup>
    <AddButton id="add-recipe-button" onClick={() => onNew()} />
    <Dialog
      prompt={`Delete recipe ${toDelete ? toDelete.name : ""}?`}
      warning="This action cannot be undone."
      isOpen={!!toDelete}
      onClose={(accept: boolean) => {
        if (accept && toDelete) onDelete(toDelete);
        
        setToDelete(undefined)
      }}
    />
   </Page>;
}
