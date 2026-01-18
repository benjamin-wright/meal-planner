import { useState } from "react";
import Breakfast from "../../../components/icons/breakfast";
import Pot from "../../../components/icons/pot";
import Sandwich from "../../../components/icons/sandwich";
import { IconFilter } from "../../../components/inputs/icon-filter/icon-filter";
import { Page } from "../../../components/layout/page/page";
import { Recipie } from "../../../../models/recipies";
import { SlideOutGroup } from "../../../components/containers/slide-out-controls/slide-out-group";
import { SlideOutControl } from "../../../components/containers/slide-out-controls/slide-out-control";
import { AddButton } from "../../../components/inputs/add-button/add-button";
import { CourseType } from "../../../../models/meals";

const icons = {
  dinner: <Pot />,
  lunch: <Sandwich />,
  breakfast: <Breakfast />
}

type Props = {
  recipies: Recipie[];
  onDelete: (recipie: Recipie) => void;
  onEdit: (recipie: Recipie) => void;
  onNew: () => void;
}

export function RecipiesView({ recipies, onDelete, onEdit, onNew }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    breakfast: false,
    lunch: false,
    dinner: false
  });

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
          recipie => {
            if (filter.breakfast || filter.lunch || filter.dinner) {
              if (!filter.breakfast && recipie.course === CourseType.Breakfast) return false;
              if (!filter.lunch && recipie.course === CourseType.Lunch) return false;
              if (!filter.dinner && recipie.course === CourseType.Dinner) return false;
            }

            if (!search) return true;

            return recipie.name.toLowerCase().includes(search.toLowerCase())
          }
        ).map(recipie => (
          <SlideOutControl
            key={recipie.id}
            groupId={recipie.name}
            label={`Recipie list item for ${recipie.name}`}
            onDelete={() => onDelete(recipie)}
            onEdit={() => onEdit(recipie)}
          >
            <p>{recipie.name}</p>
          </SlideOutControl>
        ))
      }
    </SlideOutGroup>
    <AddButton id="add-recipie-button" onClick={() => onNew()} />
  </Page>;
}
