import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IconLink } from "./icon-link";
import Add from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Clear from "@mui/icons-material/Clear";

interface ISelectIDProps<T> {
  value: number;
  items: T[];
  id: string;
  label: string;
  link: string;
  required?: boolean;
  filter?: boolean;
  toLabel: (item: T) => string;
  onChange: (value: number) => void;
  onNav: () => void;
}

export function SelectID<T extends {id: number}>({value, items, id, label, link, required, filter, toLabel, onChange, onNav}: ISelectIDProps<T>) {
  const navigate = useNavigate();

  return (
    <Box display="flex" alignItems="center">
      {
        filter || items.length > 10 ? (
          <Autocomplete
            id={id}
            disablePortal
            options={items}
            getOptionLabel={toLabel}
            renderInput={(params) => <TextField {...params} required={required} label={label} />}
            value={items.find((item) => item.id === value) || null}
            onChange={(_, value) => onChange(value?.id || 0)}
            clearIcon={<Clear sx={{fontSize: "1em"}} />}
            sx={{
              flexGrow: 1,
            }}
          />
        ) : (
          <FormControl sx={{flexGrow: 1}} required={required}>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
              labelId={`${id}-label`}
              label={label}
              value={value}
              onChange={(event: SelectChangeEvent<number>) => onChange(event.target.value as number)}
            >
              {
                items.map((item) => 
                  <MenuItem key={item.id} value={item.id}>
                    {toLabel(item)}
                  </MenuItem>
                )
              }
            </Select>
          </FormControl>
        )
      }
      
      <IconLink color="success" onClick={() => {
        onNav();
        navigate(link);
      }}>
        <Add />
      </IconLink>
    </Box>
  )
}