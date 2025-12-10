import { useEffect, useRef, useState } from "react";
import Egg from "../../../../components/icons/egg";
import FastFood from "../../../../components/icons/fast-food";
import Search from "../../../../components/icons/search";
import Shopping from "../../../../components/icons/shopping";
import Cancel from "../../../../components/icons/cross";
import { IconButton } from "../../../../components/inputs/icon-button/icon-button";

import "./item-filter.css"
import { IconCheckbox } from "../../../../components/inputs/icon-checkbox/icon-checkbox";

export type FilterState = {
  ingredients: boolean;
  readymeals: boolean;
  misc: boolean;
  search: string;
}

type Props = {
  filter: FilterState;
  onFilterChange: (
    filter: FilterState
  ) => void;
};

export function ItemFilter({ filter, onFilterChange }: Props) {
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function toggleSearch() {
    if (showSearch) {
      onFilterChange({ ...filter, search: "" });
    }

    setShowSearch(!showSearch);
  }

  useEffect(() => {
    if (showSearch) {
      inputRef.current?.focus();
    }
  }, [showSearch])

  return (
    <div className={`item-filter glazing${showSearch ? " expanded" : ""}`}>
      <div className="item-filter__search">
        <input
          ref={inputRef}
          placeholder="search"
          disabled={!showSearch}
          value={filter.search}
          onChange={e => onFilterChange({ ...filter, search: e.target.value })}
        />
        <IconButton
          icon={showSearch ? <Cancel /> : <Search />}
          circular
          onClick={toggleSearch}
          kind={showSearch ? "selected" : undefined}
        />
      </div>
      <IconCheckbox
        id="filter-ingredients"
        label="Filter Ingredients"
        icon={<Egg />}
        selected={filter.ingredients}
        onChange={(selected) => onFilterChange({ ...filter, ingredients: selected })}
      />
      <IconCheckbox
        id="filter-readymeals"
        label="Filter Ready Meals"
        icon={<FastFood />}
        selected={filter.readymeals}
        onChange={(selected) => onFilterChange({ ...filter, readymeals: selected })}
      />
      <IconCheckbox
        id="filter-misc"
        label="Filter Miscellaneous Items"
        icon={<Shopping />}
        selected={filter.misc}
        onChange={(selected) => onFilterChange({ ...filter, misc: selected })}
      />
    </div>
  )
}
