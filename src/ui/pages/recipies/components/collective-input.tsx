import { Box, MenuItem, Select, Typography } from "@mui/material";
import { Collective, Unit } from "../../../../models/units";
import { NumericInput } from "../../../components/numeric-input";
import { useEffect, useState } from "react";

interface CollectiveInputProps {
  id: string;
  label: string;
  unit?: Unit;
  value: number;
  onChange: (value: number) => void;
}

export function CollectiveInput({id, label, unit, value, onChange}: CollectiveInputProps) {
  if (!unit) {
    return (<Typography variant="body2" color="text.secondary">Wrong unit type</Typography>);
  }

  const [ selectedCollective, setSelectedCollective ] = useState<Collective | undefined>();

  useEffect(() => {
    setSelectedCollective(unit.pickCollective(value));
  },[unit.collectives])

  return <Box display="flex" flexDirection="row" alignItems="space-between" gap="1em">
    <NumericInput
      id={id}
      label={label}
      value={value / (selectedCollective?.multiplier ?? 1)}
      onChange={(value) => onChange(value * (selectedCollective?.multiplier ?? 1))}
    />
    { 
      unit.collectives.length > 1 && 
      <Select
        size="small"
        value={selectedCollective?.singular || ""} 
        onChange={selected => {
          const collective = unit.collectives.find(c => c.singular === selected.target.value);
          if (collective) {
            setSelectedCollective(collective);
          }
        }}
        variant="standard"
        sx={{
          background: "none"
        }}
      >
        {
          unit.collectives.map((collective) => 
            <MenuItem key={collective.singular} value={collective.singular}>
              { value / (collective.multiplier || 1) === 1 ? collective.singular : collective.plural }
            </MenuItem>
          )
        }
      </Select>
    }
  </Box>
}