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

const icons = {
  dinner: <Pot />,
  lunch: <Sandwich />,
  breakfast: <Breakfast />
}

type Props = {
  recipies: Recipie[];
}

export function RecipiesView({ recipies }: Props) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    ingredients: false,
    readymeals: false,
    misc: false
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
        recipies.map(recipie => (
          <SlideOutControl
            key={recipie.id}
            groupId={recipie.name}
            label={`Recipie list item for ${recipie.name}`}
          >
            <p>{recipie.name}</p>
          </SlideOutControl>
        ))
      }
    </SlideOutGroup>
    <AddButton id="add-recipie-button" onClick={() => {}} />
  </Page>;
}
