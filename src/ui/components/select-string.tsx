import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface SelectStringProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  capitalise?: boolean;
}

export function SelectString({id, label, value, options, onChange, capitalise}: SelectStringProps) {
  return <FormControl>
    <InputLabel id={`${id}-label`}>{label}</InputLabel>
    <Select
      labelId={`${id}-label`}
      label={label}
      sx={{
        textTransform: capitalise ? "capitalize" : "none",
      }}
      value={value}
      onChange={(event) => onChange(event.target.value as string)}
    >
      {
        options.map((option) => 
          <MenuItem
            key={option}
            value={option}
            sx={{
              textTransform: capitalise ? "capitalize" : "none",
            }}>
              {option}
          </MenuItem>
        )
      }
    </Select>
  </FormControl>
}