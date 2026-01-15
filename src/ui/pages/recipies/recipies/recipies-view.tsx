import { useState } from "react";
import Breakfast from "../../../components/icons/breakfast";
import Pot from "../../../components/icons/pot";
import Sandwich from "../../../components/icons/sandwich";
import { IconFilter } from "../../../components/inputs/icon-filter/icon-filter";
import { Page } from "../../../components/layout/page/page";
import "./recipies-view.css"

const icons = {
  dinner: <Pot />,
  lunch: <Sandwich />,
  breakfast: <Breakfast />
}

export function RecipiesView() {
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
    <p>Hi</p>
  </Page>;
}
