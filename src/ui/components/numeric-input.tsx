import { Info } from "@mui/icons-material";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Tooltip,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface NumericInputProps {
  id?: string;
  label: string;
  value: number;
  required?: boolean;
  info?: string;
  onChange: (value: number) => void;
}

export function NumericInput({
  id,
  value,
  label,
  required,
  info,
  onChange,
}: NumericInputProps) {
  const [text, setText] = useState("");
  const theme = useTheme();

  useEffect(() => {
    setText(value.toString());
  }, [value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
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
        onBlur={handleChange}
        label={label}
        endAdornment={info ?
          <Tooltip title={info} enterTouchDelay={0} leaveTouchDelay={2000} onContextMenu={(e) => e.preventDefault()}>
            <Info />
          </Tooltip> : undefined
        }
      />
    </FormControl>
  );
}
