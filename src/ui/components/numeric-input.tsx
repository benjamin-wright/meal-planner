import {
  FormControl,
  Input,
  InputLabel,
  OutlinedInput,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";

interface NumericInputProps {
  id?: string;
  label: string;
  value: number;
  required?: boolean;
  onChange: (value: number) => void;
}

export function NumericInput({
  id,
  value,
  label,
  required,
  onChange,
}: NumericInputProps) {
  const [text, setText] = useState("");
  const theme = useTheme();

  useEffect(() => {
    setText(value.toString());
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const firstDecimal = e.target.value.indexOf(".");
    const secondDecimal = e.target.value.indexOf(".", firstDecimal + 1);
    if (secondDecimal !== -1) {
      return;
    }

    setText(e.target.value.replace(/[^0-9.]/g, ""));

    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    }
  }

  return (
    <FormControl
      sx={{
        backgroundColor: theme.palette.background.paper,
      }}
      required={required}
    >
      <InputLabel htmlFor={id} sx={{
        padding: "0 0",
      }}>{label}</InputLabel> 
      <OutlinedInput
        id={id}
        size="small"
        type="text"
        inputProps={{ inputMode: "decimal", pattern: "[0-9.]*" }}
        value={text}
        onChange={handleChange}
        label={label}
      />
    </FormControl>
  );
}
