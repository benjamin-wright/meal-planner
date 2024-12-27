import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IconLink } from "./icon-link";
import Add from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

interface ISelectIDProps<T> {
  value: number;
  items: T[];
  id: string;
  label: string;
  link: string;
  toLabel: (item: T) => string;
  onChange: (value: number) => void;
  onNav: () => void;
}

export function SelectID<T extends {id: number}>({value, items, id, label, link, toLabel, onChange, onNav}: ISelectIDProps<T>) {
  const navigate = useNavigate();

  return (
    <Box display="flex" alignItems="center">
      <FormControl variant="outlined" sx={{
        flexGrow: 1,
      }} >
        <InputLabel id={id + "-label"}>{label}</InputLabel>
        <Select
          id={id}
          labelId={id + '-label'}
          label={label}
          value={value}
          onChange={(e: SelectChangeEvent<number>) => onChange(e.target.value as number)}
        >
          {items.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}>
              {toLabel(item)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <IconLink color="success" onClick={() => {
        onNav();
        navigate(link);
      }}>
        <Add />
      </IconLink>
    </Box>
  )
}