import { SxProps } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SelectObjectProps<T> {
  value: T;
  items: T[];
  id: string;
  label: string;
  required?: boolean;
  sx?: SxProps;
  toLabel: (item: T) => string;
  onChange: (value: T) => void;
}

export function SelectObject<T>({value, items, id, label, required, sx, toLabel, onChange}: SelectObjectProps<T>) {
  return (
    <FormControl required={required} sx={sx}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        label={label}
        value={value}
        onChange={(event: SelectChangeEvent<T>) => onChange(event.target.value as T)}
      >
        {
          items.map(item => 
            <MenuItem key={toLabel(item)} value={toLabel(item)}>
              {toLabel(item)}
            </MenuItem>
          )
        }
      </Select>
    </FormControl>
  )
}