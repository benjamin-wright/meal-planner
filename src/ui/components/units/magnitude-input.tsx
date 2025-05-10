import { Box, MenuItem, Select, Typography } from "@mui/material";
import { Magnitude, Unit } from "../../../models/units";
import { NumericInput } from "../numeric-input";
import { useEffect, useState } from "react";

interface MagnitudeInputProps {
  id: string;
  label: string;
  unit: Unit;
  value: number;
  onChange: (value: number) => void;
}

export function MagnitudeInput({ id, label, unit, value, onChange }: MagnitudeInputProps) {
  const [selectedMagnitude, setSelectedMagnitude] = useState<Magnitude>(unit.pickMagnitude(value));
  
  useEffect(() => {
    const selectedMagnitude = unit.pickMagnitude(value); 
    setSelectedMagnitude(selectedMagnitude);
  }, [unit]);

  if (!unit) {
    return (
      <Typography variant="body2" color="text.secondary">Wrong unit type</Typography>
    );
  }

  return (
    <Box display="flex" flexDirection="row" alignItems="space-between" gap="1em">
      <NumericInput
        id={id}
        label={label}
        value={unit.toMagnitude(value, selectedMagnitude)}
        onChange={(value) => onChange(unit.fromMagnitude(value, selectedMagnitude))}
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
              {unit.toMagnitude(value, magnitude) === 1 ? magnitude.singular : magnitude.plural}
            </MenuItem>
          ))}
        </Select>
      )}
    </Box>
  );
}
