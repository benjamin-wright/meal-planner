import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { NumericInput } from "../../../components/numeric-input";
import Button from "@mui/material/Button";
import Delete from "@mui/icons-material/Delete";
import { magnitude } from "../../../../models/units";
import { TextInput } from "../../../components/text-input";

interface MagnitudeEditProps {
  index: number;
  magnitude: magnitude;
  onChange?: (magnitude: magnitude) => void;
  onRemove?: () => void;
}

export function MagnitudeEdit({
  index,
  magnitude,
  onChange,
  onRemove,
}: MagnitudeEditProps) {
  return (
    <Box
      display="flex"
      component={Card}
      overflow="unset"
      alignItems="stretch"
    >
      <Box
        padding="0.75em"
        display="flex"
        flexWrap="wrap"
        gap="0.5em"
        overflow="unset"
      >
        <TextInput
          size="small"
          id={`magnitude-${index}-abbrev`}
          variant="outlined"
          label="abbreviation"
          required
          value={magnitude.abbrev}
          onChange={(value) => onChange?.({...magnitude, abbrev: value})}
        />

        <Box display="flex" gap="0.5em">
          <TextInput
            size="small"
            id={`magnitude-${index}-singular`}
            variant="outlined"
            label="singular"
            required
            lowercase
            value={magnitude.singular}
            onChange={(value) => onChange?.({...magnitude, singular: value})}
          />

          <TextInput
            size="small"
            id={`magnitude-${index}-plural`}
            variant="outlined"
            label="plural"
            required
            lowercase
            value={magnitude.plural}
            onChange={(value) => onChange?.({...magnitude, plural: value})}
          />
        </Box>

        <NumericInput
          label="multiplier"
          required
          value={magnitude.multiplier}
          onChange={(value) => {
            magnitude.multiplier = value;
            onChange?.(magnitude);
          }}
        />
      </Box>
      <Button
        color="error"
        size="small"
        sx={{ flexShrink: 1, minWidth: "unset", padding: "0.5em" }}
        onClick={() => {
          onRemove?.();
        }}
      >
        <Delete />
      </Button>
    </Box>
  );
}