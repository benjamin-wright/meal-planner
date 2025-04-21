import { Box, MenuItem, Select, Typography } from "@mui/material";
import { Magnitude, Unit } from "../../../../models/units";
import { NumericInput } from "../../../components/numeric-input";
import { useEffect, useState } from "react";

interface MagnitudeInputProps {
  id: string;
  label: string;
  unit?: Unit;
  value: number;
  onChange: (value: number) => void;
}

export function MagnitudeInput({ id, label, unit, value, onChange }: MagnitudeInputProps) {
  if (!unit) {
    return (
      <Typography variant="body2" color="text.secondary">Wrong unit type</Typography>
    );
  }

  const [selectedMagnitude, setSelectedMagnitude] = useState<Magnitude | undefined>();

  useEffect(() => {
    setSelectedMagnitude(unit.pickMagnitude(value));
  }, [unit.magnitudes]);

  return (
    <Box display="flex" flexDirection="row" alignItems="space-between" gap="1em">
      <NumericInput
        id={id}
        label={label}
        value={value / (selectedMagnitude?.multiplier ?? 1)}
        onChange={(value) => onChange(value * (selectedMagnitude?.multiplier ?? 1))}
      />
      {unit.magnitudes.length > 1 && (
        <Select
          size="small"
          value={selectedMagnitude?.singular || ""}
          onChange={(selected) => {
            const magnitude = unit.magnitudes.find((m) => m.singular === selected.target.value);
            if (magnitude) {
              setSelectedMagnitude(magnitude);
            }
          }}
          variant="standard"
          sx={{
            background: "none",
          }}
        >
          {unit.magnitudes.map((magnitude) => (
            <MenuItem key={magnitude.singular} value={magnitude.singular}>
              {value / (magnitude.multiplier || 1) === 1 ? magnitude.singular : magnitude.plural}
            </MenuItem>
          ))}
        </Select>
      )}
    </Box>
  );
}
