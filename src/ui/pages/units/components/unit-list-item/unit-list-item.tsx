import { Collective, Magnitude, Unit } from "../../../../../models/units";
import { Drawer } from "../../../../components/containers/accordion/drawer";
import { ButtonRow } from "../../../../components/containers/button-row/button-row";
import Pencil from "../../../../components/icons/pencil";
import Trash from "../../../../components/icons/trash";
import { IconButton } from "../../../../components/inputs/icon-button/icon-button";
import "./unit-list-item.css";

type Props = {
  unit: Unit
}


function MagnitudeView({ magnitudes }: { magnitudes: Magnitude[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Abbr.</th>
          <th>Singular</th>
          <th>Plural</th>
          <th>Multiplier</th>
        </tr>
      </thead>
      <tbody>
        {magnitudes.map((m: Magnitude) => (
          <tr key={m.abbrev}>
            <td>{m.abbrev}</td>
            <td>{m.singular}</td>
            <td>{m.plural}</td>
            <td>{m.multiplier}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function CountView({ collectives }: { collectives: Collective[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Singular</th>
          <th>Plural</th>
          {collectives.length > 1 && (
            <th>Multiplier</th>
          )}
        </tr>
      </thead>
      <tbody>
        {collectives.map((c: Collective, index: number) => (
          <tr key={index}>
            <td>{c.singular || "N/A"}</td>
            <td>{c.plural || "N/A"}</td>
            {collectives.length > 1 && (
              <td>{c.multiplier}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function UnitListItem({ unit }: Props) {
  return <Drawer id={`unit-${unit.id}`} title={unit.name}>
    <div className="unit-list-item">
      {unit.type === "volume" && <MagnitudeView magnitudes={unit.magnitudes} />}
      {unit.type === "weight" && <MagnitudeView magnitudes={unit.magnitudes} />}
      {unit.type === "count" && <CountView collectives={unit.collectives} />}
      <ButtonRow kind="spaced">
        <IconButton id="edit-button" icon={<Pencil />} onClick={() => console.log('Edit clicked')} />
        <IconButton id="delete-button" icon={<Trash />} kind="error" onClick={() => console.log('Delete clicked')} />
      </ButtonRow>
    </div>
  </Drawer>;
}
