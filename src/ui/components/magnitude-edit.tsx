import Box from "@mui/material/Box";
import { Magnitude } from "../../database/schemas/units";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { NumericInput } from "./numeric-input";
import Button from "@mui/material/Button";
import Delete from "@mui/icons-material/Delete";

interface MagnitudeEditProps {
  magnitude: Magnitude;
  onChange?: (magnitude: Magnitude) => void;
  onRemove?: () => void;
}

export function MagnitudeEdit({
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
        <TextField
          size="small"
          variant="outlined"
          label="abbreviation"
          value={magnitude.abbrev}
          onChange={(e) => {
            magnitude.abbrev = e.target.value;
            onChange?.(magnitude);
          }}
        />

        <Box display="flex" gap="0.5em">
          <TextField
            size="small"
            variant="outlined"
            label="singular"
            value={magnitude.singular}
            onChange={(e) => {
              magnitude.singular = e.target.value;
              onChange?.(magnitude);
            }}
          />

          <TextField
            size="small"
            variant="outlined"
            label="plural"
            value={magnitude.plural}
            onChange={(e) => {
              magnitude.plural = e.target.value;
              onChange?.(magnitude);
            }}
          />
        </Box>

        <NumericInput
          label="multiplier"
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