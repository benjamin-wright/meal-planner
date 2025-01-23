import {
  FormControl,
  Input,
  useTheme,
} from "@mui/material";
import { useState } from "react";

interface NumericInlineInputProps {
  id?: string;
  value: number;
  required?: boolean;
  onChange: (value: number) => void;
}

export function NumericInlineInput({
  id,
  value,
  required,
  onChange,
}: NumericInlineInputProps) {
  const [text, setText] = useState(value.toString());
  const theme = useTheme();

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
        marginTop: "0.2em"
      }}
      required={required}
      variant="standard"
    >
      <Input
        id={id}
        size="small"
        type="text"
        inputProps={{ inputMode: "decimal", pattern: "[0-9.]*", size: text.length * 1.5 }}
        value={text}
        onChange={handleChange}
      />
    </FormControl>
  );
}
