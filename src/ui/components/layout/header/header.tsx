import { useState } from "react";
import Back from "../../icons/back";
import House from "../../icons/house";
import { Button } from "../../inputs/button/button";
import { IconButton } from "../../inputs/icon-button/icon-button";
import "./header.css";

type Props = {
  title: string;
  onNav?: () => void;
  onSorting?: (sorting: boolean) => void;
}

export function Header({ title, onNav, onSorting }: Props) {
  const icon = onNav ? <IconButton onClick={onNav} icon={<Back />} label="Nav back" /> : <House />;
  const [sorting, setSorting] = useState(false);

  return (
    <div className="header glazing">
      {icon}
      <h1>{title}</h1>
      { onSorting && <Button
        onClick={() => {
          setSorting(!sorting);
          onSorting && onSorting(!sorting);
        }}
        label="Sort button"
        id="header-sort-button"
        content={sorting ? "Done" : "Sort"}
        kind={sorting ? "success" : undefined}
        small
      />}
    </div>
  );
}