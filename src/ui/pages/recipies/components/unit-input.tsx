import { Box, MenuItem, Select } from "@mui/material";
import { Collective, Magnitude, Unit, UnitType } from "../../../../models/units";
import { NumericInput } from "../../../components/numeric-input";
import { useEffect, useState } from "react";

interface UnitInputProps {
  id: string;
  label: string;
  unit?: Unit;
  value: number;
  onChange: (value: number) => void;
}

export function UnitInput({ id, label, unit, value, onChange }: UnitInputProps) {
  if (!unit) {
    return <NumericInput
      id={id}
      label={label}
      value={value}
      onChange={(value) => {
        setActualValue(value);
        onChange(value);
      }}
    />
  }

  const [ actualValue, setActualValue ] = useState(0);
  const [ magnitude, setMagnitude ] = useState<Magnitude | undefined>();
  const [ collective, setCollective ] = useState<Collective | undefined>();

  return (<Box>
    { unit.type === UnitType.Count && <CollectiveInput id={id} label={label} collectives={unit.collectives} value={value} onChange={onChange} /> }
  </Box>)
}

interface CollectiveInputProps {
  id: string;
  label: string;
  collectives: Collective[];
  value: number;
  onChange: (value: number) => void;
}

function CollectiveInput({id, label, collectives, value, onChange}: CollectiveInputProps) {
  const [ selectedCollective, setSelectedCollective ] = useState<Collective>(collectives[0]);

  useEffect(() => {
    setSelectedCollective(collectives[0]);
  },[collectives])

  return <Box display="flex" flexDirection="row" alignItems="space-between" gap="1em">
    <NumericInput
      id={id}
      label={label}
      value={value / (selectedCollective.multiplier ?? 1)}
      onChange={(value) => onChange(value * (selectedCollective.multiplier ?? 1))}
    />
    { 
      collectives.length > 1 && 
      <Select
        size="small"
        value={selectedCollective?.singular || ""} 
        onChange={selected => {
          const collective = collectives.find(c => c.singular === selected.target.value);
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
          collectives.map((collective) => 
            <MenuItem key={collective.singular} value={collective.singular}>
              { value / (collective.multiplier || 1) === 1 ? collective.singular : collective.plural }
            </MenuItem>
          )
        }
      </Select>
    }
  </Box>
}