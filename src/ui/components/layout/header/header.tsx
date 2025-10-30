import { useState } from "react";
import Back from "../../icons/back";
import House from "../../icons/house";
import { Button } from "../../inputs/button/button";
import { IconButton } from "../../inputs/icon-button/icon-button";
import "./header.css";

type Props = {
  title: string;
  onNav?: () => void;
  onEdit?: (editing: boolean) => void;
}

export function Header({ title, onNav, onEdit }: Props) {
  const icon = onNav ? <IconButton onClick={onNav} icon={<Back />} label="Nav back" /> : <House />;
  const [editing, setEditing] = useState(false);

  return (
    <div className="header glazing">
      {icon}
      <h1>{title}</h1>
      { onEdit && <Button
        onClick={() => {
          setEditing(!editing);
          onEdit(!editing);
        }}
        label="Edit button"
        id="header-edit-button"
        content={editing ? "Done" : "Edit"}
        kind={editing ? "success" : undefined}
        small
      />}
    </div>
  );
}