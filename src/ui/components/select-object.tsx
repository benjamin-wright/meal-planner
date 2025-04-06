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
  toLabel: (item: T) => string;
  onChange: (value: T) => void;
}

export function SelectObject<T>({value, items, id, label, required, toLabel, onChange}: SelectObjectProps<T>) {
  return (
    <FormControl required={required}>
      <InputLabel id={`${id}-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        label={label}
        value={value}
        onChange={(event: SelectChangeEvent<T>) => onChange(event.target.value as T)}
      >
        {
          items.map((item, index) => 
            <MenuItem key={toLabel(item)} value={toLabel(item)}>
              {toLabel(item)}
            </MenuItem>
          )
        }
      </Select>
    </FormControl>
  )
}