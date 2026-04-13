import { useEffect, useRef, useState } from "react";
import Search from "../../icons/search";
import Cancel from "../../icons/cross";
import { IconButton } from "../icon-button/icon-button";

import "./icon-filter.css"
import { IconCheckbox } from "../icon-checkbox/icon-checkbox";

type Props<T extends Record<string, boolean>, K extends Record<keyof T, React.ReactNode>> = {
  search: string;
  filter?: T;
  icons?: K;
  onFilter?: (filter: T) => void;
  onSearch: (search: string) => void;
};

export function IconFilter<T extends Record<string, boolean>, K extends Record<keyof T, React.ReactNode>>({ filter, search, icons, onFilter, onSearch }: Props<T, K>) {
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const keys = Object.keys(icons || {});
  const hasFilter = !!(icons && filter && onFilter);

  function toggleSearch() {
    if (!hasFilter) {
      return;
    }

    if (showSearch) {
      onSearch("");
    }

    setShowSearch(!showSearch);
  }

  useEffect(() => {
    if (showSearch) {
      inputRef.current?.focus();
    }
  }, [showSearch])

  const classNames = ["item-filter", "glazing"];
  if (showSearch) {
    classNames.push("expanded")
  }

  if (!hasFilter) {
    classNames.push("no-filters");
  }

  return (
    <div className={classNames.join(" ")}>
      <div className="item-filter__search">
        <input
          ref={inputRef}
          placeholder="search"
          disabled={!showSearch && hasFilter}
          value={search}
          onChange={e => onSearch(e.target.value)}
        />
        <IconButton
          id="toggle-search"
          label="Toggle Search"
          icon={showSearch ? <Cancel /> : <Search />}
          circular
          onClick={toggleSearch}
          kind={showSearch ? "selected" : undefined}
        />
      </div>
      {
        hasFilter &&
          keys.map(key => (
            <IconCheckbox
              key={key}
              id={`filter-${key}`}
              label={`Filter ${key}`}
              icon={icons[key]}
              selected={filter[key]}
              onChange={(selected) => onFilter({ ...filter, [key]: selected })}
            />
          ))
      }
    </div>
  )
}
