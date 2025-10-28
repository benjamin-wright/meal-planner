import { Magnitude, Unit, UnitType } from "../../../../../../models/units";
import { Drawer } from "../../../../../components/containers/accordion/drawer";
import Pencil from "../../../../../components/icons/pencil";
import Trash from "../../../../../components/icons/trash";
import { IconButton } from "../../../../../components/inputs/icon-button/icon-button";
import "./unit-list-item.css";

type Props = {
  unit: Unit
  onEdit: () => void;
  onDelete: () => void;
}

export function UnitListItem({ unit, onEdit, onDelete }: Props) {
  return <Drawer id={`unit-${unit.id}`} testId="unit" title={unit.name} size="small">
    <div className="unit-list-item">
      <table>
        <thead>
          <tr>
            {unit.type !== UnitType.Count && <th>Abbr.</th>}
            <th>Singular</th>
            <th>Plural</th>
            {unit.magnitudes.length > 1 && <th>Multiplier</th>}
          </tr>
        </thead>
        <tbody>
          {unit.magnitudes.map((m: Magnitude) => (
            <tr key={m.abbrev}>
              {unit.type !== UnitType.Count && <td>{m.abbrev}</td>}
              <td>{m.singular || "N/A"}</td>
              <td>{m.plural || "N/A"}</td>
              {unit.magnitudes.length > 1 && <td>{m.multiplier}</td>}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="unit-list-item-actions">
        <IconButton id="edit-button" icon={<Pencil />} label="Edit unit" circular onClick={onEdit} />
        <IconButton id="delete-button" icon={<Trash />} label="Delete unit" circular kind="error" onClick={onDelete} />
      </div>
    </div>
  </Drawer>;
}
