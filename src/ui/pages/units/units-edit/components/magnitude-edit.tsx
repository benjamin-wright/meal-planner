import { Magnitude } from "../../../../../models/units"
import { NumericInput } from "../../../../components/inputs/numeric-input/numeric-input";
import { StringInput } from "../../../../components/inputs/string-input/string-input";
import "./magnitude-edit.css";

type Props = {
  id: string;
  magnitude: Magnitude;
  onChange: (magnitude: Magnitude) => void;
  onDelete: () => void;
}

export function MagnitudeEdit({ id, magnitude, onChange, onDelete }: Props) {
  return (
    <div className="edit-control">
      <StringInput
        id={id}
        label="abbreviation"
        value={magnitude.abbrev}
        onChange={(value) => onChange({ ...magnitude, abbrev: value })}
      />
      <NumericInput
        id={`${id}-multiplier`}
        label="multiplier"
        value={magnitude.multiplier}
        onChange={(value) => onChange({ ...magnitude, multiplier: value })}
      />
      <StringInput
        id={`${id}-singular`}
        label="singular"
        value={magnitude.singular}
        onChange={(value) => onChange({ ...magnitude, singular: value })}
      />
      <StringInput
        id={`${id}-plural`}
        label="plural"
        value={magnitude.plural}
        onChange={(value) => onChange({ ...magnitude, plural: value })}
      />
    </div>
  );
}
