import { Unit } from "../../../../../../models/units";
import { Drawer } from "../../../../../components/containers/accordion/drawer";
import Pencil from "../../../../../components/icons/pencil";
import Trash from "../../../../../components/icons/trash";
import { IconButton } from "../../../../../components/inputs/icon-button/icon-button";
import { CountView } from "./count-view";
import { MagnitudeView } from "./mangitude-view";
import "./unit-list-item.css";

type Props = {
  unit: Unit
  onEdit: () => void;
  onDelete: () => void;
}

export function UnitListItem({ unit, onEdit, onDelete }: Props) {
  return <Drawer id={`unit-${unit.id}`} testId="unit" title={unit.name} size="small">
    <div className="unit-list-item">
      {unit.type === "volume" && <MagnitudeView magnitudes={unit.magnitudes} />}
      {unit.type === "weight" && <MagnitudeView magnitudes={unit.magnitudes} />}
      {unit.type === "count" && <CountView collectives={unit.collectives} />}
      <div className="unit-list-item-actions">
        <IconButton id="edit-button" icon={<Pencil />} circular onClick={onEdit} />
        <IconButton id="delete-button" icon={<Trash />} circular kind="error" onClick={onDelete} />
      </div>
    </div>
  </Drawer>;
}
