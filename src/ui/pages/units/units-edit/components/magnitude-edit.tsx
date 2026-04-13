import { Magnitude } from "../../../../../models/units"
import { DeleteOverlay } from "../../../../components/inputs/delete-overlay/delete-overlay";
import { NumericInput } from "../../../../components/inputs/numeric-input/numeric-input";
import { StringInput } from "../../../../components/inputs/string-input/string-input";
import "./magnitude-edit.css";

type Props = {
  id: string;
  magnitude: Magnitude;
  deleting: boolean;
  hideAbbrev?: boolean;
  hideMultiplier?: boolean;
  onChange: (magnitude: Magnitude) => void;
  onDelete: () => void;
}

export function MagnitudeEdit({ id, magnitude, deleting, hideAbbrev, hideMultiplier, onChange, onDelete }: Props) {
  const hideTopRow = hideAbbrev && hideMultiplier;

  return (
    <div className="edit-control" aria-label={id}>
      {!hideTopRow && (<>
        {hideAbbrev ? <br /> :
          <StringInput
            id={`${id}-abbreviation`}
            label="abbreviation"
            value={magnitude.abbrev}
            onChange={(value) => onChange({ ...magnitude, abbrev: value })}
            disabled={deleting}
          />
        }
        {hideMultiplier ? <br /> :
          <NumericInput
            id={`${id}-multiplier`}
            label="multiplier"
            value={magnitude.multiplier}
            onChange={(value) => onChange({ ...magnitude, multiplier: value })}
            disabled={deleting}
          />
        }
      </>)}
      <StringInput
        id={`${id}-singular`}
        label="singular"
        value={magnitude.singular}
        onChange={(value) => onChange({ ...magnitude, singular: value })}
        disabled={deleting}
      />
      <StringInput
        id={`${id}-plural`}
        label="plural"
        value={magnitude.plural}
        onChange={(value) => onChange({ ...magnitude, plural: value })}
        disabled={deleting}
      />
      <DeleteOverlay
        id={`${id}-delete-overlay`}
        deleting={deleting}
        onClick={onDelete}
      />
    </div>
  );
}
