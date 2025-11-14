import { useState } from "react";
import Egg from "../../../../components/icons/egg";
import FastFood from "../../../../components/icons/fast-food";
import Search from "../../../../components/icons/search";
import Shopping from "../../../../components/icons/shopping";
import Cancel from "../../../../components/icons/cross";
import { IconButton } from "../../../../components/inputs/icon-button/icon-button";

import "./item-filter.css"

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
  const [ showSearch, setShowSearch ] =  useState(false);

  return (
    <div className={`item-filter glazing${showSearch ? " expanded" : ""}`}>
      <div className="item-filter__search">
        <input placeholder="search" disabled={ !showSearch } />
        <IconButton
          icon={showSearch ? <Cancel /> : <Search />}
          circular
          onClick={() => setShowSearch(!showSearch)}
          kind={showSearch ? "selected" : undefined}
        />
      </div>
      <IconButton
        icon={<Egg />}
        circular
        kind={filter.ingredients ? "selected" : undefined}
        onClick={() => onFilterChange({...filter, ingredients: !filter.ingredients})}
      />
      <IconButton
        icon={<FastFood />}
        circular
        kind={filter.readymeals ? "selected" : undefined}
        onClick={() => onFilterChange({...filter, readymeals: !filter.readymeals})}
      />
      <IconButton
        icon={<Shopping />}
        circular
        kind={filter.misc ? "selected" : undefined}
        onClick={() => onFilterChange({...filter, misc: !filter.misc})}
      />
    </div>
  )
}