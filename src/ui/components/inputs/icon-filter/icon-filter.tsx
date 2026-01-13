import { useEffect, useRef, useState } from "react";
import Search from "../../icons/search";
import Cancel from "../../icons/cross";
import { IconButton } from "../icon-button/icon-button";

import "./icon-filter.css"
import { IconCheckbox } from "../icon-checkbox/icon-checkbox";

type Props = {
  search: string;
  filter: Record<string, boolean>;
  icons: Record<string, React.ReactNode>;
  onChange: (
    filter: Record<string, boolean>,
    search: string
  ) => void;
};

export function ItemFilter({ filter, search, icons, onChange }: Props) {
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const keys = Object.keys(icons);

  function toggleSearch() {
    if (showSearch) {
      onChange({ ...filter }, "");
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
          value={search}
          onChange={e => onChange({ ...filter }, e.target.value)}
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
        keys.map(key => (
          <IconCheckbox
            key={key}
            id={`filter-${key}`}
            label={`Filter ${key}`}
            icon={icons[key]}
            selected={filter[key]}
            onChange={(selected) => onChange({ ...filter, [key]: selected }, search)}
          />
        ))
      }
    </div>
  )
}
