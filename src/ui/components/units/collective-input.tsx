import { Box, MenuItem, Select, Typography } from "@mui/material";
import { Collective, Unit, pickCollective, toCollective, fromCollective } from "../../../models/units";
import { NumericInput } from "../numeric-input";
import { useEffect, useState } from "react";

interface CollectiveInputProps {
  id: string;
  label: string;
  unit: Unit;
  value: number;
  onChange: (value: number) => void;
}

export function CollectiveInput({id, label, unit, value, onChange}: CollectiveInputProps) {
  const [ selectedCollective, setSelectedCollective ] = useState<Collective>(pickCollective(unit, value));

  useEffect(() => {
    const selectedCollective = pickCollective(unit, value); 
    setSelectedCollective(selectedCollective);
  }, [unit]);
  
  if (!unit) {
    return (<Typography variant="body2" color="text.secondary">Wrong unit type</Typography>);
  }

  return <Box display="flex" flexDirection="row" alignItems="space-between" gap="1em">
    <NumericInput
      id={id}
      label={label}
      value={toCollective(unit, value, selectedCollective)}
      onChange={(value) => onChange(fromCollective(unit, value, selectedCollective))}
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
              { toCollective(unit, value, collective) === 1 ? collective.singular : collective.plural }
            </MenuItem>
          )
        }
      </Select>
    }
  </Box>
}